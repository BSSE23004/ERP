import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function AccountNature() {
  const navigate = useNavigate();
  const {
    data: natures,
    loading,
    error,
    delete: deleteItem,
  } = useAPI("/api/accounts/accountnature/");
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [natureToDelete, setNatureToDelete] = useState(null);

  // Filtering logic
  const filtered = natures.filter(
    (n) =>
      n.name?.toLowerCase().includes(search.toLowerCase()) ||
      n.description?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    navigate("/addaccountnature");
  };

  const handleEdit = (item) => {
    navigate(`/editaccountnature/${item.id}`);
  };

  const handleDelete = (item) => {
    setNatureToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (natureToDelete && natureToDelete.id !== undefined) {
      try {
        await deleteItem(natureToDelete.id);
        setShowModal(false);
        setNatureToDelete(null);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNatureToDelete(null);
  };

  const columns = [
    { field: "name", header: "Name", sortable: true },
    { field: "description", header: "Description" },
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
            <div className="alert alert-info">Loading account natures...</div>
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
            <div className="alert alert-danger">Error: {error}</div>
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
            title="Account Nature List"
            subtitle="Manage Your Account Natures"
            onAdd={handleAdd}
            buttonText="Add New Account Nature"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Account Natures"
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
                    Are you sure want to delete?
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
