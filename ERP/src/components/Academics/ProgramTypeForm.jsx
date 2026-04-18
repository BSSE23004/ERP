import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAPI } from "../../hooks/useAPI";
import api from "../../services/api";

export default function ProgramTypeForm({ id }) {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const formId = id || routeId;

  // Fetch all program types to get editing item if needed
  const { data: programTypes, loading: loadingProgramTypes } = useAPI(
    "/api/academics/program-types/",
  );
  const editingItem = formId
    ? programTypes.find((item) => item.id == formId)
    : null;

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingItem) {
      setCode(editingItem.code);
      setName(editingItem.name);
      setDescription(editingItem.description || "");
      setStatus(editingItem.status === "Active");
    }
  }, [editingItem]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!code.trim()) {
      setError("Code is required");
      return;
    }

    const formData = {
      code: code.trim(),
      name: name.trim(),
      description: description.trim(),
      status: status ? "Active" : "Inactive",
    };

    try {
      setIsSubmitting(true);

      if (editingItem) {
        // Update existing program type
        await api.put(
          `/api/academics/program-types/${editingItem.id}/`,
          formData,
        );
      } else {
        // Create new program type
        await api.post("/api/academics/program-types/", formData);
      }

      // Success - navigate back to list
      navigate("/program-type");
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.data?.non_field_errors?.[0] ||
        err.message ||
        "Failed to save program type";
      setError(errorMsg);
      console.error("Save error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (loadingProgramTypes && formId) {
    return (
      <>
        <h3 className="mb-4">Loading...</h3>
        <div className="alert alert-info">Fetching program type details...</div>
      </>
    );
  }

  return (
    <>
      <h3 className="mb-4">
        {editingItem ? "Edit Program Type" : "Create New Program Type"}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Code*</label>
            <input
              type="text"
              className="form-control"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isSubmitting || loadingProgramTypes}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Name*</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting || loadingProgramTypes}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting || loadingProgramTypes}
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold me-3">Status</label>
          <input
            type="checkbox"
            className="form-check-input"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            disabled={isSubmitting || loadingProgramTypes}
          />
          <span className="ms-2">{status ? "Active" : "Inactive"}</span>
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn text-white px-4"
            style={{ backgroundColor: "#ff6600" }}
            disabled={isSubmitting || loadingProgramTypes}
          >
            {isSubmitting
              ? editingItem
                ? "Updating..."
                : "Saving..."
              : editingItem
                ? "Update"
                : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-dark px-4"
            onClick={() => navigate("/program-type")}
            disabled={isSubmitting}
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
}
