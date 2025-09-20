import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";

export default function Narration() {
  const navigate = useNavigate();
  const LOCAL_KEY = "narrations";
  const storedNarrations = localStorage.getItem(LOCAL_KEY);
  const initialNarrations = storedNarrations
    ? JSON.parse(storedNarrations)
    : [];
  const [narrations, setNarrations] = useState(initialNarrations);
  const [showModal, setShowModal] = useState(false);
  const [narrationToDelete, setNarrationToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(narrations));
  }, [narrations]);

  // Filtering logic
  const filtered = narrations.filter(
    (n) =>
      (n.narration || "").toLowerCase().includes(search.toLowerCase()) ||
      (n.status || "").toLowerCase().includes(search.toLowerCase())
  );

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
  const confirmDelete = () => {
    if (narrationToDelete && narrationToDelete.id !== undefined) {
      const updated = narrations.filter((n) => n.id !== narrationToDelete.id);
      setNarrations(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setNarrationToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setNarrationToDelete(null);
  };

  const columns = [
    { field: "narration", header: "Narration", sortable: true },
    { field: "status", header: "Status", sortable: true },
  ];

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
            title="Narration List"
            subtitle="Manage Your Narration"
            onAdd={handleAdd}
            buttonText="Add New Narration"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Narration"
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
          <div className="modal show d-block" tabIndex="-1">
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
                  Are you sure you want to delete this narration?
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
    </div>
  );
}
