import AssetType from "../pages/AssetType";
import AddAssetData from "../pages/AddAssetData";
import ProtectedRoute from "../components/ProtectedRoute";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const AssetTypeRoutes = [
  {
    path: "/assettype",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AssetType />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addassettype",
    element: (
      <ProtectedRoute>
        <AddAssetData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editassettype/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAssetData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
];
