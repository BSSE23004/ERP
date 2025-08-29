import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import AppNavbar from "../../components/Navbar";
import DataHeader from "../../components/DataHeader";
import DataControls from "../../components/DataControls";
import DataTable from "../../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function AcademicProgram() {
  const navigate = useNavigate();
  const LOCAL_KEY = "academic_programs";
  // Load from localStorage
  const storedPrograms = localStorage.getItem(LOCAL_KEY);
  const initialPrograms = storedPrograms ? JSON.parse(storedPrograms) : [];
  const [programs, setPrograms] = useState(initialPrograms);
  const [showModal, setShowModal] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(programs));
  }, [programs]);

  // Filtering logic
  const filtered = programs.filter(
    (p) =>
      p.code?.toLowerCase().includes(search.toLowerCase()) ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.programType?.toLowerCase().includes(search.toLowerCase()) ||
      String(p.programFee)?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addacademicprogram");
  };
  const handleEdit = (program) => {
    navigate(`/editacademicprogram/${program.code}`);
  };
  const handleDelete = (program) => {
    setProgramToDelete(program);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (programToDelete) {
      const updated = programs.filter((p) => p.code !== programToDelete.code);
      setPrograms(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      setShowModal(false);
      setProgramToDelete(null);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setProgramToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
    { field: "programType", header: "Program Type", sortable: true },
    { field: "programFee", header: "Program Fee", sortable: true },
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
            title="Academic Program List"
            subtitle="Manage Your Academic Program"
            onAdd={handleAdd}
            buttonText="Add New Academic Program"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Academic Programs"
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
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this academic program?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
}
