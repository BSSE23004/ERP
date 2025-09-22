import AssetStatus from "../../pages/Assets/AssetStatus";
import ProtectedRoute from "../../components/ProtectedRoute";
import AddAssetData from "../../pages/Assets/AddAssetData";

const AssetStatusRoutes = [
  {
    path: "/assetstatus",
    element: (
      <ProtectedRoute>
        <AssetStatus />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addassetstatus",
    element: (
      <ProtectedRoute>
        <AddAssetData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editassetstatus/:id",
    element: (
      <ProtectedRoute>
        <AddAssetData />
      </ProtectedRoute>
    ),
  },
];

export default AssetStatusRoutes;
