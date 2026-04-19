import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function NarrationForm({ id }) {
  const navigate = useNavigate();
  const {
    data: allNarrations,
    loading,
    error: fetchError,
    create,
    update,
  } = useAPI("/api/accounts/narration/");

  const [narration, setNarration] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingItem =
    id && allNarrations
      ? allNarrations.find((item) => item.id === parseInt(id))
      : null;

  useEffect(() => {
    if (editingItem) {
      setNarration(editingItem.narration);
      setStatus(editingItem.status === "Active");
    } else {
      setNarration("");
      setStatus(true);
    }
  }, [id, allNarrations, editingItem]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!narration.trim()) {
      setError("Please enter narration");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        narration,
        status: status ? "Active" : "Inactive",
      };

      if (editingItem) {
        await update(editingItem.id, payload);
      } else {
        await create(payload);
      }
      navigate("/narration");
    } catch (err) {
      setError(err.message || "Failed to save narration");
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
      <h3 className="mb-4">{id ? "Edit Narration" : "Create New Narration"}</h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Narration*</label>
            <textarea
              className="form-control"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              rows="3"
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
