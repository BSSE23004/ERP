import Narration from "../../pages/Accounts/Narration";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import Sidebar from "../../components/PagesTemplate/Sidebar";

export const narrationRoutes = [
  {
    path: "/narration",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <Narration />
            </div>
          </div>
        </div>
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
