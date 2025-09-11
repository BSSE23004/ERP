import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LedgerEntryForm({ id }) {
  const navigate = useNavigate();
  const [documentNo, setDocumentNo] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [totalDebit, setTotalDebit] = useState("");
  const [totalCredit, setTotalCredit] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const LOCAL_KEY = "ledger_entries";

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
      const entry = items.find((e) => e.id === id);
      if (entry) {
        setDocumentNo(entry.documentNo || "");
        setBookingDate(entry.bookingDate || "");
        setTotalDebit(entry.totalDebit || "");
        setTotalCredit(entry.totalCredit || "");
        setStatus(entry.status === "Active");
      }
    } else {
      setDocumentNo("");
      setBookingDate("");
      setTotalDebit("");
      setTotalCredit("");
      setStatus(true);
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!documentNo || !bookingDate || !totalDebit || !totalCredit) {
      setError("Please fill all required fields");
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      id: id || Date.now().toString(),
      documentNo,
      bookingDate,
      totalDebit,
      totalCredit,
      status: status ? "Active" : "Inactive",
    };
    let updatedItems;
    if (id) {
      updatedItems = items.map((e) => (e.id === id ? newItem : e));
    } else {
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate("/ledger-entries");
  };

  return (
    <>
      <h3 className="mb-4">
        {id ? "Edit Ledger Entry" : "Create New Ledger Entry"}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
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
            <label className="form-label fw-semibold">Total Debit*</label>
            <input
              type="number"
              className="form-control"
              value={totalDebit}
              onChange={(e) => setTotalDebit(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Total Credit*</label>
            <input
              type="number"
              className="form-control"
              value={totalCredit}
              onChange={(e) => setTotalCredit(e.target.value)}
              required
            />
          </div>
        </div>
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
