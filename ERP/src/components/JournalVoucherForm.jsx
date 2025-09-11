import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function JournalVoucherForm({ id }) {
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const LOCAL_KEY = "journal_vouchers";

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
      const voucher = items.find((v) => v.voucherNo === id);
      if (voucher) {
        setBookingDate(voucher.bookingDate || "");
        setVoucherNo(voucher.voucherNo || "");
        setDocumentNo(voucher.documentNo || "");
        setStatus(voucher.status === "Active");
      }
    } else {
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
      setBookingDate(today.toISOString().slice(0, 10));
      const count = items.length + 1;
      setVoucherNo(`JV-${dateStr}-${count}`);
      setDocumentNo(`JV-${dateStr}-${count}`);
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!bookingDate || !voucherNo || !documentNo) {
      setError("Please fill all required fields");
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      bookingDate,
      voucherNo,
      documentNo,
      status: status ? "Active" : "Inactive",
    };
    let updatedItems;
    if (id) {
      updatedItems = items.map((v) => (v.voucherNo === id ? newItem : v));
    } else {
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate("/journal-voucher");
  };

  return (
    <>
      <h3 className="mb-4">
        {id ? "Edit Journal Voucher" : "Create New Journal Voucher"}
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
              disabled={!!id}
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
              disabled={!!id}
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
