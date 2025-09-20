import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import DataHeader from "../../components/PagesTemplate/DataHeader";
import DataControls from "../../components/PagesTemplate/DataControls";
import DataTable from "../../components/PagesTemplate/DataTable";
import { useNavigate } from "react-router-dom";

export default function AssetLocation() {
  const navigate = useNavigate();
  const LOCAL_KEY = "asset_location";
  const storedAssetLocation = localStorage.getItem(LOCAL_KEY);
  const initialAssetLocation = storedAssetLocation
    ? JSON.parse(storedAssetLocation)
    : [];
  const [assetLocation, setAssetLocation] = useState(initialAssetLocation);
  const [showModal, setShowModal] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(assetLocation));
  }, [assetLocation]);

  const filtered = assetLocation
    .map((item, index) => ({
      ...item,
      id: item.code || `generated-id-${index}`, // Ensure each item has a unique id
    }))
    .filter(
      (l) =>
        (l.code || "").toLowerCase().includes(search.toLowerCase()) ||
        (l.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (l.description || "").toLowerCase().includes(search.toLowerCase()) ||
        (l.status || "").toLowerCase().includes(search.toLowerCase())
    );

  const handleAdd = () => {
    navigate("/addassetlocation");
  };
  const handleEdit = (item) => {
    if (!item.id) {
      console.error(
        "Asset location id is undefined. Cannot navigate to edit page."
      );
      return;
    }
    navigate(`/editassetlocation/${item.id}`);
  };
  const handleDelete = (item) => {
    setLocationToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (locationToDelete && locationToDelete.code !== undefined) {
      const updated = assetLocation.filter(
        (l) => l.code !== locationToDelete.code
      );
      setAssetLocation(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setLocationToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setLocationToDelete(null);
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
            title="Asset Location List"
            subtitle="Manage Your Asset Location"
            onAdd={handleAdd}
            buttonText="Add New Asset Location"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            title="Asset Location"
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
                  Are you sure you want to delete this asset location?
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
