import AssetSubType from "../../pages/Assets/AssetSubType";
import ProtectedRoute from "../../components/ProtectedRoute";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import Sidebar from "../../components/PagesTemplate/Sidebar";
import AddAssetData from "../../pages/Assets/AddAssetData";

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
