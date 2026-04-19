import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function AccountGroupForm({ id }) {
  const navigate = useNavigate();
  const {
    data: allGroups,
    loading,
    error: fetchError,
    create,
    update,
  } = useAPI("/api/accounts/accountgroup/");

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingItem =
    id && allGroups ? allGroups.find((item) => item.id === parseInt(id)) : null;

  useEffect(() => {
    if (editingItem) {
      setCode(editingItem.code);
      setName(editingItem.name);
      setDescription(editingItem.description || "");
      setStatus(editingItem.status === "Active");
    } else {
      // Generate next code
      if (allGroups && allGroups.length > 0) {
        const lastCode = allGroups[allGroups.length - 1]?.code;
        if (lastCode && lastCode.includes("-")) {
          const num = parseInt(lastCode.split("-")[1], 10) + 1;
          setCode(`AG-${num.toString().padStart(4, "0")}`);
        } else {
          setCode("AG-0001");
        }
      } else {
        setCode("AG-0001");
      }
    }
  }, [id, allGroups, editingItem]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
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
      navigate("/account-group");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save account group");
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
        {editingItem ? "Edit Account Group" : "Create New Account Group"}
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
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
