import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const homeRoutes = [
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <Home />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
];
