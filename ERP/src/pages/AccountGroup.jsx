import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import DataHeader from "../components/DataHeader";
import DataControls from "../components/DataControls";
import DataTable from "../components/DataTable";
import AddData from "./AddAcademicsData";
import { useNavigate } from "react-router-dom";

export default function AccountGroup() {
  const navigate = useNavigate();
  const LOCAL_KEY = "account_groups";
  // Load from localStorage
  const storedGroups = localStorage.getItem(LOCAL_KEY);
  const initialGroups = storedGroups ? JSON.parse(storedGroups) : [];
  const [groups, setGroups] = useState(initialGroups);
  const [showModal, setShowModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(groups));
  }, [groups]);

  // Filtering logic
  const filtered = groups.filter(
    (g) =>
      g.name?.toLowerCase().includes(search.toLowerCase()) ||
      g.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addaccountgroup");
  };
  const handleEdit = (item) => {
    navigate(`/editaccountgroup/${item.code}`);
  };
  const handleDelete = (item) => {
    setGroupToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (groupToDelete && groupToDelete.code !== undefined) {
      const updated = groups.filter((g) => g.code !== groupToDelete.code);
      setGroups(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setGroupToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setGroupToDelete(null);
  };

  const columns = [
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
            title="Account Group List"
            subtitle="Manage Your Account Nature"
            onAdd={handleAdd}
            buttonText="Add New Account Group"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Account Groups"
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
