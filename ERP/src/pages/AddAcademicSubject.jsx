import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import subjectsData from "../utils/subjects.json";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";

export default function AddAcademicSubject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const LOCAL_KEY = "academic_subjects";
  // Get current subjects from localStorage or JSON
  const storedSubjects = localStorage.getItem(LOCAL_KEY);
  const initialSubjects = storedSubjects
    ? JSON.parse(storedSubjects)
    : subjectsData;

  // If editing, find the subject by code (id)
  const editingSubject = id ? initialSubjects.find((s) => s.code === id) : null;

  // Generate next code for new subject
  const getNextCode = () => {
    if (!initialSubjects.length) return "AS-0000001";
    const last = initialSubjects[initialSubjects.length - 1].code;
    const num = parseInt(last.split("-")[1], 10) + 1;
    return `AS-${num.toString().padStart(7, "0")}`;
  };

  const [code, setCode] = useState(
    editingSubject ? editingSubject.code : getNextCode()
  );
  const [name, setName] = useState(editingSubject ? editingSubject.name : "");
  const [description, setDescription] = useState(
    editingSubject ? editingSubject.description : ""
  );
  const [status, setStatus] = useState(
    editingSubject ? editingSubject.status === "Active" : true
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingSubject) {
      setCode(editingSubject.code);
      setName(editingSubject.name);
      setDescription(editingSubject.description);
      setStatus(editingSubject.status === "Active");
    }
    // eslint-disable-next-line
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    const newSubject = {
      code,
      name: name.trim(),
      description: description.trim(),
      status: status ? "Active" : "Inactive",
    };
    let updated;
    if (editingSubject) {
      // Update existing
      updated = initialSubjects.map((s) =>
        s.code === editingSubject.code ? newSubject : s
      );
    } else {
      // Add new
      updated = [...initialSubjects, newSubject];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    navigate("/academic-subject");
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
              {editingSubject
                ? "Edit Academic Subject"
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
                  className="btn  text-white px-4"
                  style={{ backgroundColor: "#ff6600" }}
                >
                  {editingSubject ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  className="btn btn-dark px-4"
                  onClick={() => navigate("/academic-subject")}
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
