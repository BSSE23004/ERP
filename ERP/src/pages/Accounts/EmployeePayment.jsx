import React, { useState } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function EmployeePayment() {
  const navigate = useNavigate();
  const {
    data: allPayments,
    loading,
    error,
    delete: deleteItem,
  } = useAPI("/api/accounts/payment/");
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  const payments =
    allPayments?.filter((p) => p.payment_category === "EMPLOYEE") || [];

  const filtered = payments.filter(
    (p) =>
      (p.employee || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.payment_type || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.payment_date || "").includes(search) ||
      (p.amount || "").toString().includes(search) ||
      (p.status || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    navigate("/addemployeepayment");
  };

  const handleEdit = (item) => {
    navigate(`/editemployeepayment/${item.id}`);
  };

  const handleDelete = (item) => {
    setPaymentToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (paymentToDelete && paymentToDelete.id !== undefined) {
      try {
        await deleteItem(paymentToDelete.id);
        setShowModal(false);
        setPaymentToDelete(null);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPaymentToDelete(null);
  };

  const columns = [
    { field: "employee", header: "Employee", sortable: true },
    { field: "payment_type", header: "Payment Type" },
    { field: "payment_date", header: "Payment Date", sortable: true },
    { field: "amount", header: "Amount" },
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
            <div className="alert alert-info">Loading employee payments...</div>
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
              Error loading employee payments
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
            title="Employee Payments"
            subtitle="Manage Your Employee Payments"
            onAdd={handleAdd}
            buttonText="Add New Employee Payment"
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
                  Are you sure you want to delete this payment for{" "}
                  <strong>{paymentToDelete?.employee}</strong>?
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
