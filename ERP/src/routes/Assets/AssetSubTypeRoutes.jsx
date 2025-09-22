import AssetSubType from "../../pages/Assets/AssetSubType";
import ProtectedRoute from "../../components/ProtectedRoute";
import AddAssetData from "../../pages/Assets/AddAssetData";

export const assetSubTypeRoutes = [
  {
    path: "/asset-sub-type",
    element: (
      <ProtectedRoute>
        <AssetSubType />
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
