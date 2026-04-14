import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../hooks/useAPI";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";

export default function AcademicProgram() {
  const navigate = useNavigate();

  // Use custom hook to manage API data
  const {
    data: programs,
    loading,
    error,
    delete: deleteProgram,
    refetch,
  } = useAPI("/api/academics/programs/");

  const [showModal, setShowModal] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Filtering logic
  const filtered = programs.filter(
    (p) =>
      (p.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.program_type || "").toLowerCase().includes(search.toLowerCase()) ||
      String(p.program_fee || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    navigate("/addacademicprogram");
  };

  const handleEdit = (program) => {
    navigate(`/editacademicprogram/${program.id}`);
  };

  const handleDelete = (program) => {
    setProgramToDelete(program);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (programToDelete) {
      try {
        await deleteProgram(programToDelete.id);
        setSuccessMessage("Program deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
        setShowModal(false);
        setProgramToDelete(null);
      } catch (err) {
        setErrorMessage(err.message || "Failed to delete program");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setProgramToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
    { field: "program_type", header: "Program Type", sortable: true },
    { field: "program_fee", header: "Program Fee", sortable: true },
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
            <div className="alert alert-info">Loading programs...</div>
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
              Error loading programs: {error}
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
            title="Academic Program List"
            subtitle="Manage Your Academic Program"
            onAdd={handleAdd}
            buttonText="Add New Academic Program"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Academic Programs"
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
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this academic program?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
}
