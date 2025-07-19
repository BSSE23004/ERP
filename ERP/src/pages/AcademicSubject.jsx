import subjectsData from "../utils/subjects.json";
import { useState, useEffect } from "react";
import AcademicSubjectHeader from "../components/AcademicSubjectHeader";
import { useNavigate } from "react-router-dom";
import AcademicSubjectControls from "../components/AcademicSubjectControls";
import AcademicSubjectTable from "../components/AcademicSubjectTable";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
function AcademicSubject() {
  const navigate = useNavigate();
  const LOCAL_KEY = "academic_subjects";
  // Load from localStorage if available, otherwise use subjectsData
  const storedSubjects = localStorage.getItem(LOCAL_KEY);
  const initialSubjects = storedSubjects
    ? JSON.parse(storedSubjects)
    : subjectsData;
  const [subjects, setSubjects] = useState(initialSubjects);
  const [showModal, setShowModal] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(subjects));
  }, [subjects]);

  // Filtering logic
  const filtered = subjects.filter(
    (s) =>
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addacademicsubject");
  };
  const handleEdit = (subject) => {
    navigate(`/editacademicsubject/${subject.code}`);
  };
  const handleDelete = (subject) => {
    setSubjectToDelete(subject);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (subjectToDelete) {
      const updated = subjects.filter((s) => s.code !== subjectToDelete.code);
      setSubjects(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      setShowModal(false);
      setSubjectToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubjectToDelete(null);
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-start vw-100">
        <Sidebar />
        <div
          className="flex-fill d-flex flex-column width-100"
          style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
        >
          <AppNavbar />
          <div style={{ marginTop: 50, padding: "2rem" }}>
            <AcademicSubjectHeader onAdd={handleAdd} />
            <AcademicSubjectControls
              showCount={showCount}
              setShowCount={setShowCount}
              search={search}
              setSearch={setSearch}
              subjects={filtered}
            />
            <AcademicSubjectTable
              subjects={filtered}
              showCount={showCount}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for Delete Confirmation */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", background: "rgba(0,0,0,0.3)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ background: "#f50031" }}>
                <h5 className="modal-title text-white">
                  Are you sure want to delete?
                </h5>
              </div>
              <div className="modal-footer d-flex justify-content-center gap-3">
                <button className="btn btn-dark px-4" onClick={closeModal}>
                  Close
                </button>
                <button
                  className="btn btn-warning text-white px-4"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AcademicSubject;
