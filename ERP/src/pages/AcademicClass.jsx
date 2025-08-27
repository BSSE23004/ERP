import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import DataHeader from "../components/DataHeader";
import DataControls from "../components/DataControls";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function AcademicClass() {
  const navigate = useNavigate();
  const LOCAL_KEY = "academic_classes";
  // Load from localStorage
  const storedClasses = localStorage.getItem(LOCAL_KEY);
  const initialClasses = storedClasses ? JSON.parse(storedClasses) : [];
  const [classes, setClasses] = useState(initialClasses);
  const [showModal, setShowModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(classes));
  }, [classes]);

  // Filtering logic
  const filtered = classes.filter(
    (c) =>
      c.code?.toLowerCase().includes(search.toLowerCase()) ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addacademicclass");
  };
  const handleEdit = (item) => {
    navigate(`/editacademicclass/${item.code}`);
  };
  const handleDelete = (item) => {
    setClassToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (classToDelete) {
      const updated = classes.filter((c) => c.code !== classToDelete.code);
      setClasses(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      setShowModal(false);
      setClassToDelete(null);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setClassToDelete(null);
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
            title="Academic Class List"
            subtitle="Manage Your Academic Class"
            onAdd={handleAdd}
            buttonText="Add New Academic Class"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Academic Classes"
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
