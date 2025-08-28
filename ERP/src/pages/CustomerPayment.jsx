import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataHeader from "../components/DataHeader";
import DataControls from "../components/DataControls";
import DataTable from "../components/DataTable";

export default function CustomerPayment() {
  const navigate = useNavigate();
  const LOCAL_KEY = "customer_payments";
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
      (p.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.paymentType || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.bank || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.branch || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.amount || "").toString().includes(search) ||
      (p.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addcustomerpayment");
  };
  const handleEdit = (payment) => {
    navigate(`/editcustomerpayment/${payment.code}`);
  };
  const handleDelete = (payment) => {
    setPaymentToDelete(payment);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (paymentToDelete) {
      const updated = payments.filter((p) => p.code !== paymentToDelete.code);
      setPayments(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      setShowModal(false);
      setPaymentToDelete(null);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setPaymentToDelete(null);
  };

  const columns = [
    { field: "customer", header: "Customer", sortable: true },
    { field: "paymentType", header: "Payment Type", sortable: true },
    { field: "paymentDate", header: "Payment Date", sortable: true },
    { field: "bank", header: "Bank", sortable: true },
    { field: "branch", header: "Branch", sortable: true },
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
            title="Customer Payment List"
            subtitle="Manage Your Customer Payment"
            onAdd={handleAdd}
            buttonText="Add New Customer Payment"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
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
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
        >
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
                Are you sure you want to delete this customer payment?
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
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
}
