import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NarrationForm({ id }) {
  const navigate = useNavigate();
  const [narration, setNarration] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const LOCAL_KEY = "narrations";

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
      const narr = items.find((n) => n.id === id);
      if (narr) {
        setNarration(narr.narration || "");
        setStatus(narr.status === "Active");
      }
    } else {
      setNarration("");
      setStatus(true);
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!narration) {
      setError("Please enter narration");
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      id: id || Date.now().toString(),
      narration,
      status: status ? "Active" : "Inactive",
    };
    let updatedItems;
    if (id) {
      updatedItems = items.map((n) => (n.id === id ? newItem : n));
    } else {
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate("/narration");
  };

  return (
    <>
      <h3 className="mb-4">{id ? "Edit Narration" : "Create New Narration"}</h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Narration*</label>
            <input
              type="text"
              className="form-control"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
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
