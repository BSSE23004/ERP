import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";

export default function EmployeePayment() {
  const navigate = useNavigate();
  const LOCAL_KEY = "employee_payments";
  const storedPayments = localStorage.getItem(LOCAL_KEY);
  const initialPayments = storedPayments ? JSON.parse(storedPayments) : [];
  const [payments, setPayments] = useState(initialPayments);
  const [showModal, setShowModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(payments));
  }, [payments]);

  // Filtering logic
  const filtered = payments.filter(
    (p) =>
      (p.employee || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.paymentType || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.bank || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.branch || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.amount || "").toString().includes(search) ||
      (p.status || "").toLowerCase().includes(search.toLowerCase())
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
  const confirmDelete = () => {
    if (paymentToDelete && paymentToDelete.id !== undefined) {
      const updated = payments.filter((p) => p.id !== paymentToDelete.id);
      setPayments(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setPaymentToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setPaymentToDelete(null);
  };

  const columns = [
    { field: "employee", header: "Employee", sortable: true },
    { field: "paymentType", header: "Payment Type", sortable: true },
    { field: "paymentDate", header: "Payment Date", sortable: true },
    { field: "bank", header: "Bank" },
    { field: "branch", header: "Branch" },
    { field: "amount", header: "Amount", sortable: true },
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
            title="Employee Payment List"
            subtitle="Manage Your Employee Payment"
            onAdd={handleAdd}
            buttonText="Add New Employee Payment"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Employee Payments"
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
                  Are you sure you want to delete this employee payment?
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
