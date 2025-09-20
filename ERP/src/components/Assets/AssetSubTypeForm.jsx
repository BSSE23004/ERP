import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AssetSubTypeForm({ id }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [assetTypeName, setAssetTypeName] = useState("");
  const [subTypeName, setSubTypeName] = useState("");
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const LOCAL_KEY = "asset_sub_types";
  const ASSET_TYPE_KEY = "asset_types";
  const [assetTypes, setAssetTypes] = useState([]);

  useEffect(() => {
    // Load asset types for dropdown
    const storedTypes = localStorage.getItem(ASSET_TYPE_KEY);
    setAssetTypes(storedTypes ? JSON.parse(storedTypes) : []);
    // Load subtypes for edit
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
      const subType = items.find((v) => v.code === id);
      if (subType) {
        setCode(subType.code || "");
        setAssetTypeName(subType.assetTypeName || "");
        setSubTypeName(subType.subTypeName || "");
        setStatus(subType.status === "Active");
        setDescription(subType.description || "");
      }
    } else {
      // Generate next code
      if (!items.length) {
        setCode("ASTC-0000001");
      } else {
        const last = items[items.length - 1]?.code;
        if (last) {
          const num = parseInt(last.split("-")[1]) + 1;
          setCode(`ASTC-${num.toString().padStart(7, "0")}`);
        } else {
          setCode("ASTC-0000001");
        }
      }
      setAssetTypeName("");
      setSubTypeName("");
      setStatus(true);
      setDescription("");
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!code || !assetTypeName || !subTypeName) {
      setError("Please fill all required fields");
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      code,
      assetTypeName,
      subTypeName,
      status: status ? "Active" : "Inactive",
      description,
    };
    let updatedItems;
    if (id) {
      updatedItems = items.map((v) => (v.code === id ? newItem : v));
    } else {
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate("/asset-sub-type");
  };

  return (
    <>
      <h3 className="mb-4">
        {id ? "Edit Asset Sub Type" : "Create New Asset Sub Type"}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Code*</label>
            <input
              type="text"
              className="form-control"
              id="assetSubTypeCode"
              name="assetSubTypeCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={!!id}
              autoComplete="off"
            />
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Asset Type Name*</label>
            <input
              type="text"
              className="form-control"
              id="assetTypeName"
              name="assetTypeName"
              value={assetTypeName}
              onChange={(e) => setAssetTypeName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Sub Type Name*</label>
            <input
              type="text"
              className="form-control"
              id="subTypeName"
              name="subTypeName"
              value={subTypeName}
              onChange={(e) => setSubTypeName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="col-md-2 mb-3 mb-md-0 d-flex align-items-center">
            <div>
              <label className="form-label fw-semibold">Status</label>
              <input
                type="checkbox"
                className="form-check-input ms-2"
                id="assetSubTypeStatus"
                name="assetSubTypeStatus"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            id="assetSubTypeDescription"
            name="assetSubTypeDescription"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
          />
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
