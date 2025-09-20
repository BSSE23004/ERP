import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const bankOptions = ["Habib Bank", "Meezan Bank", "UBL", "MCB"];
const branchOptions = ["Ibrahim Sattar", "Main Branch", "North Branch"];

export default function CashBankVoucherForm({
  id,
  isCashPayment,
  isCashReceipt,
  isBankPayment,
  isBankReceipt,
}) {
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const LOCAL_KEY = isCashPayment
    ? "cash_payment_vouchers"
    : isCashReceipt
    ? "cash_receipt_vouchers"
    : isBankPayment
    ? "bank_payment_vouchers"
    : isBankReceipt
    ? "bank_receipt_vouchers"
    : "";

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
      const voucher = items.find((v) => v.id === id);
      if (voucher) {
        setBookingDate(voucher.bookingDate || "");
        setVoucherNo(voucher.voucherNo || "");
        setDocumentNo(voucher.documentNo || "");
        setTotalAmount(voucher.totalAmount || "");
        setBank(voucher.bank || "");
        setBranch(voucher.branch || "");
        setStatus(voucher.status === "Active");
      }
    } else {
      setBookingDate("");
      setVoucherNo("");
      setDocumentNo("");
      setTotalAmount("");
      setBank("");
      setBranch("");
      setStatus(true);
    }
  }, [id, LOCAL_KEY]);

  const handleSave = (e) => {
    e.preventDefault();
    if (
      !bookingDate ||
      !voucherNo ||
      !documentNo ||
      !totalAmount ||
      ((isBankPayment || isBankReceipt) && (!bank || !branch))
    ) {
      setError("Please fill all required fields");
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      id: id || Date.now().toString(),
      bookingDate,
      voucherNo,
      documentNo,
      totalAmount,
      bank: isBankPayment || isBankReceipt ? bank : undefined,
      branch: isBankPayment || isBankReceipt ? branch : undefined,
      status: status ? "Active" : "Inactive",
    };
    let updatedItems;
    if (id) {
      updatedItems = items.map((v) => (v.id === id ? newItem : v));
    } else {
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate(
      isCashPayment
        ? "/cash-payment-voucher"
        : isCashReceipt
        ? "/cash-receipt-voucher"
        : isBankPayment
        ? "/bank-payment-voucher"
        : "/bank-receipt-voucher"
    );
  };

  return (
    <>
      <h3 className="mb-4">
        {isCashPayment
          ? id
            ? "Edit Cash Payment Voucher"
            : "Create New Cash Payment Voucher"
          : isCashReceipt
          ? id
            ? "Edit Cash Receipt Voucher"
            : "Create New Cash Receipt Voucher"
          : isBankPayment
          ? id
            ? "Edit Bank Payment Voucher"
            : "Create New Bank Payment Voucher"
          : isBankReceipt
          ? id
            ? "Edit Bank Receipt Voucher"
            : "Create New Bank Receipt Voucher"
          : ""}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Booking Date*</label>
            <input
              type="date"
              className="form-control"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Voucher No.*</label>
            <input
              type="text"
              className="form-control"
              value={voucherNo}
              onChange={(e) => setVoucherNo(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Document No*</label>
            <input
              type="text"
              className="form-control"
              value={documentNo}
              onChange={(e) => setDocumentNo(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Total Amount*</label>
            <input
              type="number"
              className="form-control"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
            />
          </div>
        </div>
        {(isBankPayment || isBankReceipt) && (
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Bank*</label>
              <input
                className="form-control"
                list="bank-list"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                placeholder="Select or type Bank"
                required
              />
              <datalist id="bank-list">
                {bankOptions.map((opt) => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Branch*</label>
              <input
                className="form-control"
                list="branch-list"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Select or type Branch"
                required
              />
              <datalist id="branch-list">
                {branchOptions.map((opt) => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
            </div>
          </div>
        )}
        <div className="row mb-3">
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
