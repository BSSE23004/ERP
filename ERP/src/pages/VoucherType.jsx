import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import DataHeader from "../components/DataHeader";
import DataControls from "../components/DataControls";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function VoucherType() {
  const navigate = useNavigate();
  const LOCAL_KEY = "voucher_types";
  const storedTypes = localStorage.getItem(LOCAL_KEY);
  const initialTypes = storedTypes ? JSON.parse(storedTypes) : [];
  const [voucherTypes, setVoucherTypes] = useState(initialTypes);
  const [showModal, setShowModal] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(voucherTypes));
  }, [voucherTypes]);

  // Filtering logic
  const filtered = voucherTypes.filter(
    (v) =>
      (v.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addvouchertype");
  };
  const handleEdit = (item) => {
    navigate(`/editvouchertype/${item.id}`);
  };
  const handleDelete = (item) => {
    setTypeToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (typeToDelete && typeToDelete.id !== undefined) {
      const updated = voucherTypes.filter((v) => v.id !== typeToDelete.id);
      setVoucherTypes(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setTypeToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setTypeToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
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
            title="Voucher Type List"
            subtitle="Manage Your Voucher Type"
            onAdd={handleAdd}
            buttonText="Add New Voucher Type"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Voucher Type"
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
                  Are you sure you want to delete this voucher type?
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
