import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";

export default function CashVoucherList({ type = "cash_payment" }) {
  // Conditional config based on type
  const isReceipt = type === "cash_receipt";
  const LOCAL_KEY = isReceipt
    ? "cash_receipt_vouchers"
    : "cash_payment_vouchers";
  const headerTitle = isReceipt
    ? "Cash Receipt Voucher List"
    : "Cash Payment Voucher List";
  const headerSubtitle = isReceipt
    ? "Manage Your Cash Receipt Voucher"
    : "Manage Your Cash Payment Voucher";
  const addButtonText = isReceipt
    ? "Add New Cash Receipt Voucher"
    : "Add New Cash Payment Voucher";
  const addPath = isReceipt
    ? "/addcashreceiptvoucher"
    : "/addcashpaymentvoucher";
  const editPath = isReceipt
    ? "/editcashreceiptvoucher/"
    : "/editcashpaymentvoucher/";
  const deleteMsg = isReceipt
    ? "Are you sure you want to delete this cash receipt voucher?"
    : "Are you sure you want to delete this cash payment voucher?";

  const navigate = useNavigate();
  const storedVouchers = localStorage.getItem(LOCAL_KEY);
  const initialVouchers = storedVouchers ? JSON.parse(storedVouchers) : [];
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [showModal, setShowModal] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(vouchers));
  }, [vouchers, LOCAL_KEY]);

  // Filtering logic
  const filtered = vouchers.filter(
    (v) =>
      (v.bookingDate || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.voucherNo || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.documentNo || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.totalAmount || "").toString().includes(search) ||
      (v.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate(addPath);
  };
  const handleEdit = (item) => {
    navigate(`${editPath}${item.id}`);
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
            title={headerTitle}
            subtitle={headerSubtitle}
            onAdd={handleAdd}
            buttonText={addButtonText}
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title={headerTitle}
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
                <div className="modal-body">{deleteMsg}</div>
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
