import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AssetStatusForm({ code, isAssetLocation }) {
  const navigate = useNavigate();
  const LOCAL_KEY = isAssetLocation ? "asset_location" : "asset_status";
  const storedData = localStorage.getItem(LOCAL_KEY);
  const initialData = storedData ? JSON.parse(storedData) : [];

  const [statusCode, setStatusCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (code) {
      const dataItem = items.find((s) => s.code === code);
      if (dataItem) {
        setStatusCode(dataItem.code || "");
        setName(dataItem.name || "");
        setDescription(dataItem.description || "");
        setStatus(dataItem.status === "Active");
      }
    } else {
      if (!items.length) {
        setStatusCode(isAssetLocation ? "ALC-000001" : "ASC-000001");
      } else {
        const last = items[items.length - 1]?.code;
        if (last) {
          const num = parseInt(last.split("-")[1]) + 1;
          setStatusCode(
            `${isAssetLocation ? "ALC" : "ASC"}-${num
              .toString()
              .padStart(6, "0")}`
          );
        } else {
          setStatusCode(isAssetLocation ? "ALC-000001" : "ASC-000001");
        }
      }
    }
  }, [code, isAssetLocation]);

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
    navigate(isAssetLocation ? "/assetlocation" : "/assetstatus");
  };

  return (
    <>
      <h3 className="mb-4">
        {code
          ? isAssetLocation
            ? "Edit Asset Location"
            : "Edit Asset Status"
          : isAssetLocation
          ? "Create New Asset Location"
          : "Create New Asset Status"}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
            <label htmlFor="statusCode" className="form-label fw-semibold">
              Code*
            </label>
            <input
              type="text"
              id="statusCode"
              name="statusCode"
              className="form-control"
              value={statusCode}
              onChange={(e) => setStatusCode(e.target.value)}
              required
              disabled={!!code}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="description" className="form-label fw-semibold">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              autoComplete="off"
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
