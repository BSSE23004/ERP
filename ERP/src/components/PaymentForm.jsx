import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const paymentTypeOptions = [
  "CASH",
  "CREDIT",
  "RETURN",
  "BANK TRANSFER",
  "ONLINE BANK TRANSFER",
  "CHEQUE",
  "ADVANCE PAYMENT",
];
const grnOptions = ["GRN-001", "GRN-002", "GRN-003"];
const billOptions = ["CP-0001", "CP-0002", "CP-0003"];
const customerOptions = ["Customer A", "Customer B", "Customer C"];
const vendorOptions = ["ABC Suppliers", "N STARS", "test vendor smart pos"];
const bankOptions = ["Habib Bank", "Meezan Bank", "UBL", "MCB"];
const branchOptions = ["Ibrahim Sattar", "Main Branch", "North Branch"];
const employeeOptions = ["Employee A", "Employee B", "Employee C"];

export default function PaymentForm({ id, isVendor, isCustomer, isEmployee }) {
  const navigate = useNavigate();
  const [grn, setGrn] = useState("");
  const [vendor, setVendor] = useState("");
  const [bill, setBill] = useState("");
  const [customer, setCustomer] = useState("");
  const [employee, setEmployee] = useState("");
  const [paymentType, setPaymentType] = useState(paymentTypeOptions[3]);
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
  const LOCAL_KEY = isVendor
    ? "vendor_payments"
    : isCustomer
    ? "customer_payments"
    : isEmployee
    ? "employee_payments"
    : "";

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    let payment;
    if (id) {
      if (isCustomer) {
        payment = items.find((p) => p.code === id);
      } else {
        payment = items.find((p) => p.id === id);
      }
      if (payment) {
        if (isVendor) {
          setGrn(payment.grn || "");
          setVendor(payment.vendor || "");
        } else if (isCustomer) {
          setBill(payment.bill || "");
          setCustomer(payment.customer || "");
        } else if (isEmployee) {
          setEmployee(payment.employee || "");
        }
        setPaymentType(payment.paymentType || paymentTypeOptions[3]);
        setPaymentDate(payment.paymentDate || "");
        setBank(payment.bank || "");
        setBranch(payment.branch || "");
        setChequeNo(payment.chequeNo || "");
        setChequeDate(payment.chequeDate || "");
        setChequeCashDate(payment.chequeCashDate || "");
        setAmount(payment.amount || "");
        setPaymentNote(payment.paymentNote || "");
        setStatus(payment.status === "Active");
      }
    }
  }, [id, isVendor, isCustomer, isEmployee]);

  const handleSave = (e) => {
    e.preventDefault();
    if (isVendor) {
      if (!vendor || !paymentType || !paymentDate || !amount) {
        setError("Please fill all required fields");
        return;
      }
    } else if (isCustomer) {
      if (!customer || !paymentType || !paymentDate || !amount) {
        setError("Please fill all required fields");
        return;
      }
    } else if (isEmployee) {
      if (!employee || !paymentType || !paymentDate || !amount) {
        setError("Please fill all required fields");
        return;
      }
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      id: id || Date.now().toString(),
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
      ...(isVendor
        ? { grn, vendor }
        : isCustomer
        ? { bill, customer }
        : isEmployee
        ? { employee }
        : {}),
    };
    let updatedItems;
    if (id) {
      updatedItems = items.map((p) => (p.id === id ? newItem : p));
    } else {
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate(
      isVendor
        ? "/vendor-payment"
        : isCustomer
        ? "/customer-payment"
        : isEmployee
        ? "/employee-payment"
        : "/"
    );
  };

  return (
    <>
      <h3 className="mb-4">
        {isVendor
          ? id
            ? "Edit Vendor Payment"
            : "Create New Vendor Payment"
          : isCustomer
          ? id
            ? "Edit Customer Payment"
            : "Create New Customer Payment"
          : isEmployee
          ? id
            ? "Edit Employee Payment"
            : "Create New Employee Payment"
          : ""}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          {isVendor ? (
            <>
              <div className="col-md-3 mb-3 mb-md-0">
                <label className="form-label fw-semibold">GRN</label>
                <input
                  className="form-control"
                  list="grn-list"
                  value={grn}
                  onChange={(e) => setGrn(e.target.value)}
                  placeholder="Select or type GRN"
                />
                <datalist id="grn-list">
                  {grnOptions.map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Vendor*</label>
                <input
                  className="form-control"
                  list="vendor-list"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  placeholder="Select or type Vendor"
                  required
                />
                <datalist id="vendor-list">
                  {vendorOptions.map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              </div>
            </>
          ) : isCustomer ? (
            <>
              <div className="col-md-3 mb-3 mb-md-0">
                <label className="form-label fw-semibold">
                  Bill/Invoice No
                </label>
                <input
                  className="form-control"
                  list="bill-list"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  placeholder="Select or type Bill/Invoice No"
                />
                <datalist id="bill-list">
                  {billOptions.map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Customer*</label>
                <input
                  className="form-control"
                  list="customer-list"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Select or type Customer"
                  required
                />
                <datalist id="customer-list">
                  {customerOptions.map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              </div>
            </>
          ) : isEmployee ? (
            <>
              <div className="col-md-3 mb-3 mb-md-0">
                <label className="form-label fw-semibold">Employee*</label>
                <input
                  className="form-control"
                  list="employee-list"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                  placeholder="Select or type Employee"
                  required
                />
                <datalist id="employee-list">
                  {employeeOptions.map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              </div>
            </>
          ) : null}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Payment Type*</label>
            <input
              className="form-control"
              list="payment-type-list"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              placeholder="Select or type Payment Type"
              required
            />
            <datalist id="payment-type-list">
              {paymentTypeOptions.map((opt) => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Payment Date*</label>
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
              className="form-control"
              list="bank-list"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              placeholder="Select or type Bank"
            />
            <datalist id="bank-list">
              {bankOptions.map((opt) => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Branch</label>
            <input
              className="form-control"
              list="branch-list"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Select or type Branch"
            />
            <datalist id="branch-list">
              {branchOptions.map((opt) => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
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
            <label className="form-label fw-semibold">Cheque Cash Date</label>
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
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
}
