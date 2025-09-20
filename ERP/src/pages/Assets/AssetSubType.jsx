import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";

export default function AssetSubType() {
  const navigate = useNavigate();
  const LOCAL_KEY = "asset_sub_types";
  const stored = localStorage.getItem(LOCAL_KEY);
  const initial = stored ? JSON.parse(stored) : [];
  const [assetSubTypes, setAssetSubTypes] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [subTypeToDelete, setSubTypeToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(assetSubTypes));
  }, [assetSubTypes]);

  const filtered = assetSubTypes.filter(
    (item) =>
      (item.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.assetTypeName || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.subTypeName || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addassetsubtype");
  };
  const handleEdit = (item) => {
    if (!item.code) {
      console.error(
        "Asset sub type code is undefined. Cannot navigate to edit page."
      );
      return;
    }
    navigate(`/editassetsubtype/${item.code}`);
  };
  const handleDelete = (item) => {
    setSubTypeToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (subTypeToDelete && subTypeToDelete.code !== undefined) {
      const updated = assetSubTypes.filter(
        (s) => s.code !== subTypeToDelete.code
      );
      setAssetSubTypes(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setSubTypeToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setSubTypeToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "assetTypeName", header: "Asset Type Name", sortable: true },
    { field: "subTypeName", header: "Sub Type Name", sortable: true },
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
