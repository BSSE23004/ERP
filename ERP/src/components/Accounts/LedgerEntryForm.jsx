import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function LedgerEntryForm({ id }) {
  const navigate = useNavigate();
  const {
    data: allEntries,
    loading,
    error: fetchError,
    create,
    update,
  } = useAPI("/api/accounts/ledgerentry/");

  const [documentNo, setDocumentNo] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [totalDebit, setTotalDebit] = useState("");
  const [totalCredit, setTotalCredit] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingItem =
    id && allEntries
      ? allEntries.find((item) => item.id === parseInt(id))
      : null;

  useEffect(() => {
    if (editingItem) {
      setDocumentNo(editingItem.document_no);
      setBookingDate(editingItem.booking_date);
      setTotalDebit(editingItem.total_debit);
      setTotalCredit(editingItem.total_credit);
      setStatus(editingItem.status === "Active");
    }
  }, [id, allEntries, editingItem]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!documentNo || !bookingDate || !totalDebit || !totalCredit) {
      setError("Please fill all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        document_no: documentNo,
        booking_date: bookingDate,
        total_debit: parseFloat(totalDebit),
        total_credit: parseFloat(totalCredit),
        status: status ? "Active" : "Inactive",
      };

      if (editingItem) {
        await update(editingItem.id, payload);
      } else {
        await create(payload);
      }
      navigate("/ledger-entries");
    } catch (err) {
      setError(err.message || "Failed to save ledger entry");
      console.error("Save error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }

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
              step="0.01"
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
              step="0.01"
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-dark px-4"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
}
