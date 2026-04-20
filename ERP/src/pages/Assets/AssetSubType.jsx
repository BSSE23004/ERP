import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function AssetSubType() {
  const navigate = useNavigate();
  const {
    data: assetSubTypes,
    loading,
    error,
    delete: deleteItem,
  } = useAPI("/api/assets/assetsubtype/");
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [subTypeToDelete, setSubTypeToDelete] = useState(null);

  const filtered = assetSubTypes.filter(
    (item) =>
      (item.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.asset_type_name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (item.sub_type_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.status || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    navigate("/addassetsubtype");
  };
  const handleEdit = (item) => {
    if (!item.id) {
      console.error(
        "Asset sub type id is undefined. Cannot navigate to edit page.",
      );
      return;
    }
    navigate(`/editassetsubtype/${item.id}`);
  };
  const handleDelete = (item) => {
    setSubTypeToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = async () => {
    if (subTypeToDelete && subTypeToDelete.id !== undefined) {
      try {
        await deleteItem(subTypeToDelete.id);
        setShowModal(false);
        setSubTypeToDelete(null);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setSubTypeToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "asset_type_name", header: "Asset Type Name", sortable: true },
    { field: "sub_type_name", header: "Sub Type Name", sortable: true },
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
            <div className="alert alert-info">Loading asset sub types...</div>
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
            title="Asset Sub Type List"
            subtitle="Manage Your Asset Sub Type"
            onAdd={handleAdd}
            buttonText="Add New Asset Sub Type"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Asset Sub Type"
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
                  Are you sure you want to delete this asset sub type?
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
