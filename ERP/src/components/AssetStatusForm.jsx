import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AssetStatusForm({ code }) {
  const navigate = useNavigate();
  const LOCAL_KEY = "asset_status";
  const storedAssetStatus = localStorage.getItem(LOCAL_KEY);
  const initialAssetStatus = storedAssetStatus
    ? JSON.parse(storedAssetStatus)
    : [];

  const [statusCode, setStatusCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (code) {
      const assetStatus = items.find((s) => s.code === code);
      if (assetStatus) {
        setStatusCode(assetStatus.code || "");
        setName(assetStatus.name || "");
        setDescription(assetStatus.description || "");
        setStatus(assetStatus.status === "Active");
      }
    } else {
      if (!items.length) {
        setStatusCode("ASC-000001");
      } else {
        const last = items[items.length - 1]?.code;
        if (last) {
          const num = parseInt(last.split("-")[1]) + 1;
          setStatusCode(`ASC-${num.toString().padStart(6, "0")}`);
        } else {
          setStatusCode("ASC-000001");
        }
      }
    }
  }, [code]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!statusCode || !name || !description) {
      setError("Please fill all required fields");
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      code: statusCode,
      name,
      description,
      status: status ? "Active" : "Inactive",
    };
    let updatedItems;
    if (code) {
      updatedItems = items.map((s) => (s.code === code ? newItem : s));
    } else {
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate("/assetstatus");
  };

  return (
    <>
      <h3 className="mb-4">
        {code ? "Edit Asset Status" : "Create New Asset Status"}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Code*</label>
            <input
              type="text"
              className="form-control"
              value={statusCode}
              onChange={(e) => setStatusCode(e.target.value)}
              required
              disabled={!!code}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Name*</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Description*</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            ></textarea>
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
