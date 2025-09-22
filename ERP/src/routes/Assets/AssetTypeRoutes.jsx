import AssetType from "../../pages/Assets/AssetType";
import AddAssetData from "../../pages/Assets/AddAssetData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const AssetTypeRoutes = [
  {
    path: "/assettype",
    element: (
      <ProtectedRoute>
        <AssetType />
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
        <AddAssetData />
      </ProtectedRoute>
    ),
  },
];
