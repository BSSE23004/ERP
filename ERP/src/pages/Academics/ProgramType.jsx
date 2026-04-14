import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../hooks/useAPI";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";

export default function ProgramType() {
  const navigate = useNavigate();

  // Use custom hook to manage API data
  const {
    data: types,
    loading,
    error,
    delete: deleteType,
    refetch,
  } = useAPI("/api/academics/program-types/");

  const [showModal, setShowModal] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Columns for Program Type
  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
    { field: "description", header: "Description" },
    { field: "status", header: "Status", sortable: true },
  ];

  // Filtering logic
  const filtered = types.filter(
    (t) =>
      (t.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    navigate("/addprogramtype");
  };
  const handleEdit = (type) => {
    navigate(`/editprogramtype/${type.id}`);
  };
  const handleDelete = (type) => {
    setTypeToDelete(type);
    setShowModal(true);
  };
  const confirmDelete = async () => {
    if (typeToDelete) {
      try {
        await deleteType(typeToDelete.id);
        setSuccessMessage("Program type deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
        setShowModal(false);
        setTypeToDelete(null);
      } catch (err) {
        setErrorMessage(err.message || "Failed to delete program type");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTypeToDelete(null);
  };

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
            <div className="alert alert-info">Loading program types...</div>
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
              Error loading program types: {error}
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
            onAdd={handleAdd}
            title="Program Type List"
            subtitle="Manage Your Program Type"
            buttonText="Add New Program Type"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Program Types"
            columns={columns}
          />
          <DataTable
            data={filtered}
            showCount={showCount}
            onEdit={handleEdit}
            onDelete={handleDelete}
            columns={columns}
          />
        </div>
        {/* Modal for Delete Confirmation */}
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
