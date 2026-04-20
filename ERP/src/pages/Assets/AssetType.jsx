import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function AssetType() {
  const navigate = useNavigate();
  const {
    data: assetTypes,
    loading,
    error,
    delete: deleteItem,
  } = useAPI("/api/assets/assettype/");
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [assetTypeToDelete, setAssetTypeToDelete] = useState(null);

  // Filtering logic
  const filtered = assetTypes.filter(
    (a) =>
      (a.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.type_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.status || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    navigate("/addassettype");
  };
  const handleEdit = (item) => {
    if (!item.id) {
      console.error(
        "Asset type id is undefined. Cannot navigate to edit page.",
      );
      return;
    }
    navigate(`/editassettype/${item.id}`);
  };
  const handleDelete = (item) => {
    setAssetTypeToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = async () => {
    if (assetTypeToDelete && assetTypeToDelete.id !== undefined) {
      try {
        await deleteItem(assetTypeToDelete.id);
        setShowModal(false);
        setAssetTypeToDelete(null);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setAssetTypeToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "type_name", header: "Type Name", sortable: true },
    { field: "description", header: "Description", sortable: true },
    { field: "status", header: "Status", sortable: true },
  ];

  if (loading) {
    return (
      <div className="d-flex flex-row justify-content-start vw-100">
        <Sidebar />
        <div
          className="flex-fill d-flex flex-column width-100"
          style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
        >
          <AppNavbar />
          <div style={{ marginTop: 50, padding: "2rem" }}>
            <div className="alert alert-info">Loading asset types...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-row justify-content-start vw-100">
        <Sidebar />
        <div
          className="flex-fill d-flex flex-column width-100"
          style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
        >
          <AppNavbar />
          <div style={{ marginTop: 50, padding: "2rem" }}>
            <div className="alert alert-danger">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

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
            title="Asset Type List"
            subtitle="Manage Your Asset Type"
            onAdd={handleAdd}
            buttonText="Add New Asset Type"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Asset Type"
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
                  Are you sure you want to delete this asset type?
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
