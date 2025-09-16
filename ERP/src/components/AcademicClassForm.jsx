import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AcademicClassForm({ id }) {
  const navigate = useNavigate();
  let LOCAL_KEY = "academic_classes";
  const storedItems = localStorage.getItem(LOCAL_KEY);
  const initialItems = storedItems ? JSON.parse(storedItems) : [];
  const editingItem = id ? initialItems.find((item) => item.code === id) : null;
  const getNextCode = () => {
    if (!initialItems.length) return "CL-0001";
    const last = initialItems[initialItems.length - 1]?.code;
    if (!last) return "CL-0001";
    const num = parseInt(last.split("-")[1], 10) + 1;
    return `CL-${num.toString().padStart(4, "0")}`;
  };
  const [code, setCode] = useState(
    editingItem ? editingItem.code : getNextCode()
  );
  const [name, setName] = useState(editingItem ? editingItem.name : "");
  const [description, setDescription] = useState(
    editingItem ? editingItem.description : ""
  );
  const [status, setStatus] = useState(
    editingItem ? editingItem.status === "Active" : true
  );
  const [error, setError] = useState("");
  useEffect(() => {
    if (editingItem) {
      setCode(editingItem.code);
      setName(editingItem.name);
      setDescription(editingItem.description);
      setStatus(editingItem.status === "Active");
    }
  }, [id]);
  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    let newItem = {
      code,
      name: name.trim(),
      description: description.trim(),
      status: status ? "Active" : "Inactive",
    };
    let updated;
    if (editingItem) {
      updated = initialItems.map((s) =>
        s.code === editingItem.code ? newItem : s
      );
    } else {
      updated = [...initialItems, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    navigate("/academic-class");
  };
  return (
    <>
      <h3 className="mb-4">
        {editingItem ? "Edit Academic Class" : "Create New Academic Class"}
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
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn text-white px-4"
            style={{ backgroundColor: "#ff6600" }}
          >
            {editingItem ? "Update" : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-dark px-4"
            onClick={() => navigate("/academic-class")}
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
}
