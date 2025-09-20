import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";

export default function LedgerEntries() {
  const navigate = useNavigate();
  const LOCAL_KEY = "ledger_entries";
  const storedEntries = localStorage.getItem(LOCAL_KEY);
  const initialEntries = storedEntries ? JSON.parse(storedEntries) : [];
  const [entries, setEntries] = useState(initialEntries);
  const [showModal, setShowModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
  }, [entries]);

  // Filtering logic
  const filtered = entries.filter(
    (e) =>
      (e.documentNo || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.bookingDate || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.totalDebit || "").toString().includes(search) ||
      (e.totalCredit || "").toString().includes(search) ||
      (e.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addledgerentry");
  };
  const handleEdit = (item) => {
    navigate(`/editledgerentry/${item.id}`);
  };
  const handleDelete = (item) => {
    setEntryToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (entryToDelete && entryToDelete.id !== undefined) {
      const updated = entries.filter((e) => e.id !== entryToDelete.id);
      setEntries(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setEntryToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setEntryToDelete(null);
  };

  const columns = [
    { field: "documentNo", header: "Document No", sortable: true },
    { field: "bookingDate", header: "Booking Date", sortable: true },
    { field: "totalDebit", header: "Total Debit", sortable: true },
    { field: "totalCredit", header: "Total Credit", sortable: true },
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
            title="Ledger Entries List"
            subtitle="Manage Your Ledger Entries"
            onAdd={handleAdd}
            buttonText="Add New Ledger Entries"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Ledger Entries"
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
                  Are you sure you want to delete this ledger entry?
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
