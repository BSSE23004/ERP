import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";

export const homeRoutes = [
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
];
