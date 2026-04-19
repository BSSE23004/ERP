import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function VoucherTypeForm({ id }) {
  const navigate = useNavigate();
  const {
    data: allTypes,
    loading,
    error: fetchError,
    create,
    update,
  } = useAPI("/api/accounts/vouchertype/");

  const [vtCode, setVtCode] = useState("");
  const [vtName, setVtName] = useState("");
  const [vtStatus, setVtStatus] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingItem =
    id && allTypes ? allTypes.find((item) => item.id === parseInt(id)) : null;

  useEffect(() => {
    if (editingItem) {
      setVtCode(editingItem.code);
      setVtName(editingItem.name);
      setVtStatus(editingItem.status === "Active");
    } else {
      // Generate next code
      if (allTypes && allTypes.length > 0) {
        const lastCode = allTypes[allTypes.length - 1]?.code;
        if (lastCode && lastCode.includes("-")) {
          const num = parseInt(lastCode.split("-")[1], 10) + 1;
          setVtCode(`VT-${num.toString().padStart(4, "0")}`);
        } else {
          setVtCode("VT-0001");
        }
      } else {
        setVtCode("VT-0001");
      }
    }
  }, [id, allTypes, editingItem]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!vtCode || !vtName) {
      setError("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const itemData = {
        code: vtCode,
        name: vtName,
        status: vtStatus ? "Active" : "Inactive",
      };

      if (editingItem) {
        await update(editingItem.id, itemData);
      } else {
        await create(itemData);
      }
      navigate("/voucher-type");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save voucher type");
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
        {editingItem ? "Edit Voucher Type" : "Create New Voucher Type"}
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
        {(error || fetchError) && (
          <div className="alert alert-danger py-2">{error || fetchError}</div>
        )}
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
