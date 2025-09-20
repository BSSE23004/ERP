import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";

export default function AssetType() {
  const navigate = useNavigate();
  const LOCAL_KEY = "asset_types";
  const storedAssetTypes = localStorage.getItem(LOCAL_KEY);
  const initialAssetTypes = storedAssetTypes
    ? JSON.parse(storedAssetTypes)
    : [];
  const [assetTypes, setAssetTypes] = useState(initialAssetTypes);
  const [showModal, setShowModal] = useState(false);
  const [assetTypeToDelete, setAssetTypeToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(assetTypes));
  }, [assetTypes]);

  // Filtering logic
  const filtered = assetTypes.filter(
    (a) =>
      (a.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.typeName || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addassettype");
  };
  const handleEdit = (item) => {
    if (!item.code) {
      console.error(
        "Asset type code is undefined. Cannot navigate to edit page."
      );
      return;
    }
    navigate(`/editassettype/${item.code}`);
  };
  const handleDelete = (item) => {
    setAssetTypeToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (assetTypeToDelete && assetTypeToDelete.code !== undefined) {
      const updated = assetTypes.filter(
        (a) => a.code !== assetTypeToDelete.code
      );
      setAssetTypes(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setAssetTypeToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setAssetTypeToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "typeName", header: "Type Name", sortable: true },
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
