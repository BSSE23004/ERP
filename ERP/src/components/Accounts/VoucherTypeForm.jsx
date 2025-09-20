import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VoucherTypeForm({ id }) {
  const navigate = useNavigate();
  const [vtCode, setVtCode] = useState("");
  const [vtName, setVtName] = useState("");
  const [vtStatus, setVtStatus] = useState(true);
  const [error, setError] = useState("");
  const LOCAL_KEY = "voucher_types";

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
      const vt = items.find((v) => v.id === id);
      if (vt) {
        setVtCode(vt.code || "");
        setVtName(vt.name || "");
        setVtStatus(vt.status === "Active");
      }
    } else {
      if (!items.length) {
        setVtCode("VT-0001");
      } else {
        const last = items[items.length - 1]?.code;
        if (last) {
          const num = parseInt(last.split("-")[1]) + 1;
          setVtCode(`VT-${num.toString().padStart(4, "0")}`);
        } else {
          setVtCode("VT-0001");
        }
      }
      setVtName("");
      setVtStatus(true);
    }
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!vtCode || !vtName) {
      setError("Please fill all required fields");
      return;
    }
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    const newItem = {
      id: id || Date.now().toString(),
      code: vtCode,
      name: vtName,
      status: vtStatus ? "Active" : "Inactive",
    };
    let updatedItems;
    if (id) {
      updatedItems = items.map((v) => (v.id === id ? newItem : v));
    } else {
      updatedItems = [...items, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
    navigate("/voucher-type");
  };

  return (
    <>
      <h3 className="mb-4">
        {id ? "Edit Voucher Type" : "Create New Voucher Type"}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Code*</label>
            <input
              type="text"
              className="form-control"
              value={vtCode}
              onChange={(e) => setVtCode(e.target.value)}
              required
              disabled={!!id}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Name*</label>
            <input
              type="text"
              className="form-control"
              value={vtName}
              onChange={(e) => setVtName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Status</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={vtStatus}
              onChange={(e) => setVtStatus(e.target.checked)}
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
