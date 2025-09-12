import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AssetTypeForm({ id }) {
  const navigate = useNavigate();
  const LOCAL_KEY = "asset_types";
  const storedAssetTypes = localStorage.getItem(LOCAL_KEY);
  const initialAssetTypes = storedAssetTypes
    ? JSON.parse(storedAssetTypes)
    : [];

  const [code, setCode] = useState("");
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
      const assetType = items.find((a) => a.code === id);
      if (assetType) {
        setCode(assetType.code || "");
        setTypeName(assetType.typeName || "");
        setDescription(assetType.description || "");
        setStatus(assetType.status === "Active");
      }
    } else {
      if (!items.length) {
        setCode("ATC-0001");
      } else {
        const last = items[items.length - 1]?.code;
        if (last) {
          const num = parseInt(last.split("-")[1]) + 1;
          setCode(`ATC-${num.toString().padStart(4, "0")}`);
        } else {
          setCode("ATC-0001");
        }
      }
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!code || !typeName || !description) {
      setError("Please fill all required fields");
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      code,
      typeName,
      description,
      status: status ? "Active" : "Inactive",
    };
    let updatedItems;
    if (id) {
      updatedItems = items.map((a) => (a.code === id ? newItem : a));
    } else {
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate("/assettype");
  };

  return (
    <>
      <h3 className="mb-4">
        {id ? "Edit Asset Type" : "Create New Asset Type"}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Code*</label>
            <input
              type="text"
              className="form-control"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={!!id}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Type Name*</label>
            <input
              type="text"
              className="form-control"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
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
