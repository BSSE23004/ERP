import React, { useState } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function BankPaymentVoucher() {
  const navigate = useNavigate();
  const {
    data: allVouchers,
    loading,
    error,
    delete: deleteItem,
  } = useAPI("/api/accounts/cashbankvoucher/");
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState(null);

  const vouchers =
    allVouchers?.filter((v) => v.voucher_type === "BANK_PAYMENT") || [];

  const filtered = vouchers.filter(
    (v) =>
      (v.voucher_no || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.document_no || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.booking_date || "").includes(search) ||
      (v.total_amount || "").toString().includes(search) ||
      (v.bank || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.status || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    navigate("/addbankpaymentvoucher");
  };

  const handleEdit = (item) => {
    navigate(`/editbankpaymentvoucher/${item.id}`);
  };

  const handleDelete = (item) => {
    setVoucherToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (voucherToDelete && voucherToDelete.id !== undefined) {
      try {
        await deleteItem(voucherToDelete.id);
        setShowModal(false);
        setVoucherToDelete(null);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setVoucherToDelete(null);
  };

  const columns = [
    { field: "voucher_no", header: "Voucher No", sortable: true },
    { field: "document_no", header: "Document No" },
    { field: "booking_date", header: "Booking Date", sortable: true },
    { field: "bank", header: "Bank" },
    { field: "branch", header: "Branch" },
    { field: "total_amount", header: "Total Amount" },
    { field: "status", header: "Status", sortable: true },
  ];

  const displayedData = filtered.slice(0, showCount);

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
            <div className="alert alert-info">
              Loading bank payment vouchers...
            </div>
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
            <div className="alert alert-danger">
              Error loading bank payment vouchers
            </div>
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
            title="Bank Payment Vouchers"
            subtitle="Manage Your Bank Payment Vouchers"
            onAdd={handleAdd}
            buttonText="Add New Bank Payment Voucher"
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
                <p>
                  Are you sure you want to delete this voucher{" "}
                  <strong>{voucherToDelete?.voucher_no}</strong>?
                </p>
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
