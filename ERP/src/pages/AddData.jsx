import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// Removed subjects.json import
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";

export default function AddData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Determine context: subject or program type
  const isProgramType = location.pathname.includes("programtype");
  const LOCAL_KEY = isProgramType ? "program_types" : "academic_subjects";

  // Get current items from localStorage only
  const storedItems = localStorage.getItem(LOCAL_KEY);
  const initialItems = storedItems ? JSON.parse(storedItems) : [];

  // If editing, find the item by code (id)
  const editingItem = id ? initialItems.find((s) => s.code === id) : null;

  // Generate next code for new item
  const getNextCode = () => {
    if (!initialItems.length) return isProgramType ? "PT-0001" : "AS-0000001";
    const last = initialItems[initialItems.length - 1].code;
    const num = parseInt(last.split("-")[1], 10) + 1;
    return isProgramType
      ? `PT-${num.toString().padStart(4, "0")}`
      : `AS-${num.toString().padStart(7, "0")}`;
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
    // eslint-disable-next-line
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    const newItem = {
      code,
      name: name.trim(),
      description: description.trim(),
      status: status ? "Active" : "Inactive",
    };
    let updated;
    if (editingItem) {
      // Update existing
      updated = initialItems.map((s) =>
        s.code === editingItem.code ? newItem : s
      );
    } else {
      // Add new
      updated = [...initialItems, newItem];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    navigate(isProgramType ? "/program-type" : "/academic-subject");
  };

  return (
    <div className="d-flex flex-row justify-content-start vw-100">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar />
        <div style={{ flex: 1, padding: "2rem 2rem 0 2rem", marginTop: 50 }}>
          <div className="bg-white rounded shadow-sm p-4">
            <h3 className="mb-4">
              {editingItem
                ? isProgramType
                  ? "Edit Program Type"
                  : "Edit Academic Subject"
                : isProgramType
                ? "Create New Program Type"
                : "Create New Academic Subject"}
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
                  {editingItem
                    ? isProgramType
                      ? "Update"
                      : "Update"
                    : isProgramType
                    ? "Save"
                    : "Save"}
                </button>
                <button
                  type="button"
                  className="btn btn-dark px-4"
                  onClick={() =>
                    navigate(
                      isProgramType ? "/program-type" : "/academic-subject"
                    )
                  }
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
