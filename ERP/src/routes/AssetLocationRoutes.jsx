import AssetLocation from "../pages/AssetLocation";
import ProtectedRoute from "../components/ProtectedRoute";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddAssetData from "../pages/AddAssetData";

export const AssetLocationRoutes = [
  {
    path: "/assetlocation",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AssetLocation />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addassetlocation",
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
  {
    path: "/editassetlocation/:id",
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
