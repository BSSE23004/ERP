import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";

const paymentTypeOptions = [
  "CASH",
  "CREDIT",
  "RETURN",
  "BANK TRANSFER",
  "ONLINE BANK TRANSFER",
  "CHEQUE",
  "ADVANCE PAYMENT",
];

export default function AddAccountsData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const LOCAL_KEY = "customer_payments";
  const [code, setCode] = useState("");
  const [customer, setCustomer] = useState("");
  const [paymentType, setPaymentType] = useState(paymentTypeOptions[0]);
  const [paymentDate, setPaymentDate] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [chequeCashDate, setChequeCashDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");

  // Load payment for edit or generate next code for add
  React.useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
      // Edit mode
      const payment = items.find((p) => p.code === id);
      if (payment) {
        setCode(payment.code);
        setCustomer(payment.customer);
        setPaymentType(payment.paymentType);
        setPaymentDate(payment.paymentDate);
        setBank(payment.bank);
        setBranch(payment.branch);
        setChequeNo(payment.chequeNo);
        setChequeDate(payment.chequeDate);
        setChequeCashDate(payment.chequeCashDate);
        setAmount(payment.amount);
        setPaymentNote(payment.paymentNote);
        setStatus(payment.status === "Active");
      }
    } else {
      // Add mode
      if (items.length === 0) {
        setCode("CP-0001");
      } else {
        const last = items[items.length - 1].code;
        const num = parseInt(last.split("-")[1], 10) + 1;
        setCode(`CP-${num.toString().padStart(4, "0")}`);
      }
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!customer || !paymentType || !paymentDate || !amount) {
      setError("Please fill all required fields");
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      code,
      customer,
      paymentType,
      paymentDate,
      bank,
      branch,
      chequeNo,
      chequeDate,
      chequeCashDate,
      amount,
      paymentNote,
      status: status ? "Active" : "Inactive",
    };
    let updatedItems;
    if (id) {
      // Edit mode: update existing
      updatedItems = items.map((p) => (p.code === id ? newItem : p));
    } else {
      // Add mode: add new
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate("/customer-payment");
  };

  return (
    <div className="d-flex flex-row justify-content-start vw-100">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar />
        <div style={{ flex: 1, padding: "2rem 2rem 0 2rem", marginTop: 50 }}>
          <div className="bg-white rounded shadow-sm p-4">
            <h3 className="mb-4">
              {id ? "Edit" : "Create New"} Customer Payment
            </h3>
            <form onSubmit={handleSave}>
              <div className="row mb-3">
                <div className="col-md-3 mb-3 mb-md-0">
                  <label className="form-label fw-semibold">
                    Bill/Invoice No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={code}
                    disabled
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Customer*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    Payment Type*
                  </label>
                  <select
                    className="form-select"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    required
                  >
                    {paymentTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    Payment Date*
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3 mb-3 mb-md-0">
                  <label className="form-label fw-semibold">Bank</label>
                  <input
                    type="text"
                    className="form-control"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Branch</label>
                  <input
                    type="text"
                    className="form-control"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Cheque NO</label>
                  <input
                    type="text"
                    className="form-control"
                    value={chequeNo}
                    onChange={(e) => setChequeNo(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Cheque Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={chequeDate}
                    onChange={(e) => setChequeDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3 mb-3 mb-md-0">
                  <label className="form-label fw-semibold">
                    Cheque Cash Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={chequeCashDate}
                    onChange={(e) => setChequeCashDate(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Amount*</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Status</label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                  />
                  <span className="ms-2">{status ? "Active" : "Inactive"}</span>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Payment Note</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                />
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn text-white px-4"
                  style={{ backgroundColor: "#ff6600" }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-dark px-4"
                  onClick={() => navigate("/customer-payment")}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
