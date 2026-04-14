import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../hooks/useAPI";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";

export default function AcademicClass() {
  const navigate = useNavigate();

  // Use custom hook to manage API data
  const {
    data: classes,
    loading,
    error,
    delete: deleteClass,
    refetch,
  } = useAPI("/api/academics/classes/");

  const [showModal, setShowModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Filtering logic
  const filtered = classes.filter(
    (c) =>
      (c.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.description || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    navigate("/addacademicclass");
  };
  const handleEdit = (item) => {
    navigate(`/editacademicclass/${item.id}`);
  };
  const handleDelete = (item) => {
    setClassToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = async () => {
    if (classToDelete) {
      try {
        await deleteClass(classToDelete.id);
        setSuccessMessage("Class deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
        setShowModal(false);
        setClassToDelete(null);
      } catch (err) {
        setErrorMessage(err.message || "Failed to delete class");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setClassToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
    { field: "description", header: "Description" },
    { field: "status", header: "Status", sortable: true },
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="d-flex flex-row justify-content-start vw-100">
        <Sidebar />
        <div
          className="flex-fill d-flex flex-column width-100"
          style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
        >
          <AppNavbar />
          <div style={{ marginTop: 50, padding: "2rem" }}>
            <div className="alert alert-info">Loading classes...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !successMessage) {
    return (
      <div className="d-flex flex-row justify-content-start vw-100">
        <Sidebar />
        <div
          className="flex-fill d-flex flex-column width-100"
          style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
        >
          <AppNavbar />
          <div style={{ marginTop: 50, padding: "2rem" }}>
            <div className="alert alert-danger">
              Error loading classes: {error}
            </div>
            <button className="btn btn-primary" onClick={refetch}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-row justify-content-start vw-100">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar />
        <div style={{ marginTop: 50, padding: "2rem" }}>
          {/* Success Message */}
          {successMessage && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {successMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccessMessage("")}
              ></button>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {errorMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setErrorMessage("")}
              ></button>
            </div>
          )}

          <DataHeader
            title="Academic Class List"
            subtitle="Manage Your Academic Class"
            onAdd={handleAdd}
            buttonText="Add New Academic Class"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Academic Classes"
            columns={columns}
          />
          <DataTable
            data={filtered}
            columns={columns}
            showCount={showCount}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        {/* Delete Confirmation Modal */}
        {showModal && (
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block", background: "rgba(0,0,0,0.3)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header" style={{ background: "#f50031" }}>
                  <h5 className="modal-title text-white">
                    Are you sure you want to delete?
                  </h5>
                </div>
                <div className="modal-footer d-flex justify-content-center gap-3">
                  <button className="btn btn-dark px-4" onClick={closeModal}>
                    Close
                  </button>
                  <button
                    className="btn btn-warning text-white px-4"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
