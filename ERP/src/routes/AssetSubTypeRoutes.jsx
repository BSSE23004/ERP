import AssetSubType from "../pages/AssetSubType";
import ProtectedRoute from "../components/ProtectedRoute";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddAssetData from "../pages/AddAssetData";

export const assetSubTypeRoutes = [
  {
    path: "/asset-sub-type",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AssetSubType />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addassetsubtype",
    element: (
      <ProtectedRoute>
        <AddAssetData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editassetsubtype/:id",
    element: (
      <ProtectedRoute>
        <AddAssetData />
      </ProtectedRoute>
    ),
  },
];
