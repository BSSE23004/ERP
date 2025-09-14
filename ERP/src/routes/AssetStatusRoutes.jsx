import AssetStatus from "../pages/AssetStatus";
import ProtectedRoute from "../components/ProtectedRoute";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddAssetData from "../pages/AddAssetData";

const AssetStatusRoutes = [
  {
    path: "/assetstatus",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AssetStatus />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addassetstatus",
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
    path: "/editassetstatus/:code",
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

export default AssetStatusRoutes;
