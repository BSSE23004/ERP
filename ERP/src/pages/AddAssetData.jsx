import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import AssetTypeForm from "../components/AssetTypeForm";

export default function AddAssetData() {
  const { id } = useParams();
  const location = useLocation();

  const isAssetType =
    location.pathname.includes("addassettype") ||
    location.pathname.includes("editassettype");

  let formComponent = null;
  if (isAssetType) {
    formComponent = <AssetTypeForm id={id} />;
  }

  return (
    <div className="d-flex flex-row justify-content-start vw-100">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar />
        <div style={{ flex: 1, padding: "2rem 2rem 0 2rem", marginTop: 50 }}>
          <div className="bg-white rounded shadow-sm p-4">{formComponent}</div>
        </div>
      </div>
    </div>
  );
}
