import AccountGroup from "../pages/AccountGroup";
import ProtectedRoute from "../components/ProtectedRoute";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddAcademicsData from "../pages/AddAcademicsData";

export const accountGroupRoutes = [
  {
    path: "/account-group",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AccountGroup />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addaccountgroup",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAcademicsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editaccountgroup/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAcademicsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
];
