import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import DataHeader from "../components/DataHeader";
import DataControls from "../components/DataControls";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function BankReceiptVoucher() {
  const navigate = useNavigate();
  const LOCAL_KEY = "bank_receipt_vouchers";
  const storedVouchers = localStorage.getItem(LOCAL_KEY);
  const initialVouchers = storedVouchers ? JSON.parse(storedVouchers) : [];
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [showModal, setShowModal] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(vouchers));
  }, [vouchers]);

  // Filtering logic
  const filtered = vouchers.filter(
    (v) =>
      (v.bookingDate || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.voucherNo || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.documentNo || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.bank || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.branch || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.totalAmount || "").toString().includes(search) ||
      (v.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addbankreceiptvoucher");
  };
  const handleEdit = (item) => {
    navigate(`/editbankreceiptvoucher/${item.id}`);
  };
  const handleDelete = (item) => {
    setVoucherToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (voucherToDelete && voucherToDelete.id !== undefined) {
      const updated = vouchers.filter((v) => v.id !== voucherToDelete.id);
      setVouchers(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setVoucherToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setVoucherToDelete(null);
  };

  const columns = [
    { field: "bookingDate", header: "Booking Date", sortable: true },
    { field: "voucherNo", header: "Voucher No.", sortable: true },
    { field: "documentNo", header: "Document No", sortable: true },
    { field: "bank", header: "Bank", sortable: true },
    { field: "branch", header: "Branch", sortable: true },
    { field: "totalAmount", header: "Total Amount", sortable: true },
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
            title="Bank Receipt Voucher List"
            subtitle="Manage Your Bank Receipt Voucher"
            onAdd={handleAdd}
            buttonText="Add New Bank Receipt Voucher"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Bank Receipt Vouchers"
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
                  Are you sure you want to delete this bank receipt voucher?
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
