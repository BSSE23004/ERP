import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function JournalVoucherForm({ id }) {
  const navigate = useNavigate();
  const {
    data: allVouchers,
    loading,
    error: fetchError,
    create,
    update,
  } = useAPI("/api/accounts/journalvoucher/");

  const [bookingDate, setBookingDate] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingItem =
    id && allVouchers
      ? allVouchers.find((item) => item.id === parseInt(id))
      : null;

  useEffect(() => {
    if (editingItem) {
      setBookingDate(editingItem.booking_date);
      setVoucherNo(editingItem.voucher_no);
      setDocumentNo(editingItem.document_no);
      setStatus(editingItem.status === "Active");
    } else {
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
      setBookingDate(today.toISOString().slice(0, 10));
      const count = (allVouchers?.length || 0) + 1;
      setVoucherNo(`JV-${dateStr}-${count}`);
      setDocumentNo(`JV-${dateStr}-${count}`);
    }
  }, [id, allVouchers, editingItem]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!bookingDate || !voucherNo || !documentNo) {
      setError("Please fill all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        booking_date: bookingDate,
        voucher_no: voucherNo,
        document_no: documentNo,
        status: status ? "Active" : "Inactive",
      };

      if (editingItem) {
        await update(editingItem.id, payload);
      } else {
        await create(payload);
      }
      navigate("/journal-voucher");
    } catch (err) {
      setError(err.message || "Failed to save voucher");
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
