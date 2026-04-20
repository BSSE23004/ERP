import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function AssetSubTypeForm({ id }) {
  const navigate = useNavigate();
  const {
    data: allSubTypes,
    loading,
    error: fetchError,
    create,
    update,
  } = useAPI("/api/assets/assetsubtype/");

  const { data: assetTypes, loading: assetTypesLoading } = useAPI(
    "/api/assets/assettype/",
  );

  const [code, setCode] = useState("");
  const [assetTypeId, setAssetTypeId] = useState("");
  const [assetTypeName, setAssetTypeName] = useState("");
  const [subTypeName, setSubTypeName] = useState("");
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingItem =
    id && allSubTypes
      ? allSubTypes.find((item) => item.id === parseInt(id))
      : null;

  useEffect(() => {
    if (editingItem) {
      setCode(editingItem.code);
      setAssetTypeId(editingItem.asset_type);
      setAssetTypeName(editingItem.asset_type_name);
      setSubTypeName(editingItem.sub_type_name);
      setStatus(editingItem.status === "Active");
      setDescription(editingItem.description || "");
    } else {
      // Generate next code
      if (allSubTypes && allSubTypes.length > 0) {
        const lastCode = allSubTypes[allSubTypes.length - 1]?.code;
        if (lastCode && lastCode.includes("-")) {
          const num = parseInt(lastCode.split("-")[1], 10) + 1;
          setCode(`AST-${num.toString().padStart(4, "0")}`);
        } else {
          setCode("AST-0001");
        }
      } else {
        setCode("AST-0001");
      }
    }
  }, [id, allSubTypes, editingItem]);

  const handleAssetTypeChange = (e) => {
    const selectedId = e.target.value;
    setAssetTypeId(selectedId);
    const selected = assetTypes.find((t) => t.id === parseInt(selectedId));
    setAssetTypeName(selected?.type_name || "");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!assetTypeId || !subTypeName.trim() || !description.trim()) {
      setError("Asset Type, Sub Type Name, and Description are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const itemData = {
        code,
        asset_type: parseInt(assetTypeId),
        sub_type_name: subTypeName.trim(),
        description: description.trim(),
        status: status ? "Active" : "Inactive",
      };

      if (editingItem) {
        await update(editingItem.id, itemData);
      } else {
        await create(itemData);
      }
      navigate("/asset-sub-type");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save asset sub type");
      console.error("Save error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || assetTypesLoading) {
    return <div className="alert alert-info">Loading...</div>;
  }

  return (
    <>
      <h3 className="mb-4">
        {editingItem ? "Edit Asset Sub Type" : "Create New Asset Sub Type"}
      </h3>
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
          <label className="form-label fw-semibold">Asset Type*</label>
          <select
            className="form-control"
            value={assetTypeId}
            onChange={handleAssetTypeChange}
            required
          >
            <option value="">-- Select Asset Type --</option>
            {assetTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type_name} ({type.code})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Sub Type Name*</label>
          <input
            type="text"
            className="form-control"
            value={subTypeName}
            onChange={(e) => setSubTypeName(e.target.value)}
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
