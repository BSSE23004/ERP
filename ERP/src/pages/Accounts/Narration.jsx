import React, { useState } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function Narration() {
  const navigate = useNavigate();
  const {
    data: narrations,
    loading,
    error,
    delete: deleteItem,
  } = useAPI("/api/accounts/narration/");
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [narrationToDelete, setNarrationToDelete] = useState(null);

  const filtered =
    narrations?.filter(
      (n) =>
        (n.narration || "").toLowerCase().includes(search.toLowerCase()) ||
        (n.status || "").toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const handleAdd = () => {
    navigate("/addnarration");
  };

  const handleEdit = (item) => {
    navigate(`/editnarration/${item.id}`);
  };

  const handleDelete = (item) => {
    setNarrationToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (narrationToDelete && narrationToDelete.id !== undefined) {
      try {
        await deleteItem(narrationToDelete.id);
        setShowModal(false);
        setNarrationToDelete(null);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNarrationToDelete(null);
  };

  const columns = [
    { field: "narration", header: "Narration", sortable: true },
    { field: "status", header: "Status", sortable: true },
  ];

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
            <div className="alert alert-info">Loading narrations...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-row justify-content-start vw-100">
        <Sidebar />
        <div
          className="flex-fill d-flex flex-column width-100"
          style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
        >
          <AppNavbar />
          <div style={{ marginTop: 50, padding: "2rem" }}>
            <div className="alert alert-danger">Error loading narrations</div>
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
          <DataHeader
            title="Narrations"
            subtitle="Manage Your Narrations"
            onAdd={handleAdd}
            buttonText="Add New Narration"
          />
          <DataControls
            onAdd={handleAdd}
            searchValue={search}
            onSearchChange={setSearch}
            showCountValue={showCount}
            onShowCountChange={setShowCount}
            totalCount={filtered.length}
          />
          <DataTable
            columns={columns}
            data={filtered}
            showCount={showCount}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
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
                <p>Are you sure you want to delete this narration?</p>
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
      )}
    </div>
  );
}
