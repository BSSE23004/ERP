import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function AssetStatusForm({ id, isAssetLocation }) {
  const navigate = useNavigate();

  // Determine which API endpoint to use
  const apiEndpoint = isAssetLocation
    ? "/api/assets/assetlocation/"
    : "/api/assets/assetstatus/";

  const {
    data: allItems,
    loading,
    error: fetchError,
    create,
    update,
  } = useAPI(apiEndpoint);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingItem =
    id && allItems ? allItems.find((item) => item.id === parseInt(id)) : null;

  useEffect(() => {
    if (editingItem) {
      setCode(editingItem.code);
      setName(editingItem.name);
      setDescription(editingItem.description || "");
      setStatus(editingItem.status === "Active");
    } else {
      // Generate next code
      if (allItems && allItems.length > 0) {
        const lastCode = allItems[allItems.length - 1]?.code;
        if (lastCode && lastCode.includes("-")) {
          const num = parseInt(lastCode.split("-")[1], 10) + 1;
          const prefix = isAssetLocation ? "AL" : "AS";
          setCode(`${prefix}-${num.toString().padStart(4, "0")}`);
        } else {
          const prefix = isAssetLocation ? "AL" : "AS";
          setCode(`${prefix}-0001`);
        }
      } else {
        const prefix = isAssetLocation ? "AL" : "AS";
        setCode(`${prefix}-0001`);
      }
    }
  }, [id, allItems, editingItem, isAssetLocation]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setError("Name and Description are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const itemData = {
        code,
        name: name.trim(),
        description: description.trim(),
        status: status ? "Active" : "Inactive",
      };

      if (editingItem) {
        await update(editingItem.id, itemData);
      } else {
        await create(itemData);
      }
      const navPath = isAssetLocation ? "/assetlocation" : "/assetstatus";
      navigate(navPath);
    } catch (err) {
      const entityName = isAssetLocation ? "Asset Location" : "Asset Status";
      setError(err.response?.data?.detail || `Failed to save ${entityName}`);
      console.error("Save error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }

  const title = isAssetLocation
    ? editingItem
      ? "Edit Asset Location"
      : "Create New Asset Location"
    : editingItem
      ? "Edit Asset Status"
      : "Create New Asset Status";

  return (
    <>
      <h3 className="mb-4">{title}</h3>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Code</label>
          <input
            type="text"
            className="form-control"
            value={code}
            disabled
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Name*</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Description*</label>
          <textarea
            className="form-control"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold me-3">Status</label>
          <input
            type="checkbox"
            className="form-check-input"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <span className="ms-2">{status ? "Active" : "Inactive"}</span>
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
