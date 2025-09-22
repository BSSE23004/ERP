import Narration from "../../pages/Accounts/Narration";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const narrationRoutes = [
  {
    path: "/narration",
    element: (
      <ProtectedRoute>
        <Narration />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addnarration",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editnarration/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
