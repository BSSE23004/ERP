import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import DataHeader from "../components/DataHeader";
import DataControls from "../components/DataControls";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function AssetStatus() {
  const navigate = useNavigate();
  const LOCAL_KEY = "asset_status";
  const storedAssetStatus = localStorage.getItem(LOCAL_KEY);
  const initialAssetStatus = storedAssetStatus
    ? JSON.parse(storedAssetStatus)
    : [];
  const [assetStatus, setAssetStatus] = useState(initialAssetStatus);
  const [showModal, setShowModal] = useState(false);
  const [statusToDelete, setStatusToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(assetStatus));
  }, [assetStatus]);

  const filtered = assetStatus.filter(
    (s) =>
      (s.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addassetstatus");
  };
  const handleEdit = (item) => {
    if (!item.code) {
      console.error(
        "Asset status code is undefined. Cannot navigate to edit page."
      );
      return;
    }
    navigate(`/editassetstatus/${item.code}`);
  };
  const handleDelete = (item) => {
    setStatusToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (statusToDelete && statusToDelete.code !== undefined) {
      const updated = assetStatus.filter((s) => s.code !== statusToDelete.code);
      setAssetStatus(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setStatusToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setStatusToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
    { field: "description", header: "Description", sortable: true },
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
            title="Asset Status List"
            subtitle="Manage Your Asset Status"
            onAdd={handleAdd}
            buttonText="Add New Asset Status"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Asset Status"
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
        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
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
                  Are you sure you want to delete this asset status?
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
        )}
      </div>
    </div>
  );
}
