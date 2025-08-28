import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import DataHeader from "../components/DataHeader";
import DataControls from "../components/DataControls";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function AcademicSection() {
  const navigate = useNavigate();
  const LOCAL_KEY = "academic_sections";
  // Load from localStorage
  const storedSections = localStorage.getItem(LOCAL_KEY);
  const initialSections = storedSections ? JSON.parse(storedSections) : [];
  const [sections, setSections] = useState(initialSections);
  const [showModal, setShowModal] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(sections));
  }, [sections]);

  // Filtering logic
  const filtered = sections.filter(
    (s) =>
      s.code?.toLowerCase().includes(search.toLowerCase()) ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addacademicsection");
  };
  const handleEdit = (item) => {
    navigate(`/editacademicsection/${item.code}`);
  };
  const handleDelete = (item) => {
    setSectionToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (sectionToDelete) {
      const updated = sections.filter((s) => s.code !== sectionToDelete.code);
      setSections(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      setShowModal(false);
      setSectionToDelete(null);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setSectionToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
    { field: "description", header: "Description" },
    { field: "status", header: "Status", sortable: true },
  ];

  return (
    <div className="d-flex flex-row justify-content-start vw-100">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar />
        <div style={{ marginTop: 50, padding: "2rem" }}>
          <DataHeader
            title="Academic Section List"
            subtitle="Manage Your Academic Section"
            onAdd={handleAdd}
            buttonText="Add New Academic Section"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Academic Sections"
            columns={columns}
          />
          <DataTable
            data={filtered}
            columns={columns}
            showCount={showCount}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        {/* Delete Confirmation Modal */}
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
      </div>
    </div>
  );
}
