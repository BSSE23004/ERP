import AssetLocation from "../../pages/Assets/AssetLocation";
import ProtectedRoute from "../../components/ProtectedRoute";
import AddAssetData from "../../pages/Assets/AddAssetData";

export const AssetLocationRoutes = [
  {
    path: "/assetlocation",
    element: (
      <ProtectedRoute>
        <AssetLocation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addassetlocation",
    element: (
      <ProtectedRoute>
        <AddAssetData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editassetlocation/:id",
    element: (
      <ProtectedRoute>
        <AddAssetData />
      </ProtectedRoute>
    ),
  },
];
