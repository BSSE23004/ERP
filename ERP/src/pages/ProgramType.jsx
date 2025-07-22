import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import DataHeader from "../components/DataHeader";
import DataControls from "../components/DataControls";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function ProgramType() {
  const navigate = useNavigate();
  const LOCAL_KEY = "program_types";
  // Load from localStorage
  const storedTypes = localStorage.getItem(LOCAL_KEY);
  const initialTypes = storedTypes ? JSON.parse(storedTypes) : [];
  const [types, setTypes] = useState(initialTypes);
  const [showModal, setShowModal] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(types));
  }, [types]);

  // Filtering logic
  const filtered = types.filter(
    (t) =>
      t.code?.toLowerCase().includes(search.toLowerCase()) ||
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addprogramtype");
  };
  const handleEdit = (type) => {
    navigate(`/editprogramtype/${type.code}`);
  };
  const handleDelete = (type) => {
    setTypeToDelete(type);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (typeToDelete) {
      const updated = types.filter((t) => t.code !== typeToDelete.code);
      setTypes(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      setShowModal(false);
      setTypeToDelete(null);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setTypeToDelete(null);
  };

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
            onAdd={handleAdd}
            title="Program Type List"
            subtitle="Manage Your Program Type"
            buttonText="Add New Program Type"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Program Types"
          />
          <DataTable
            data={filtered}
            showCount={showCount}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        {/* Modal for Delete Confirmation */}
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
