import ChartOfAccount from "../pages/ChartOfAccount";
import AddAccountsData from "../pages/AddAccountsData";
import ProtectedRoute from "../components/ProtectedRoute";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const chartOfAccountRoutes = [
  {
    path: "/chart-of-account",
    element: (
      <ProtectedRoute>
        <ChartOfAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addchartofaccount",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editchartofaccount/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
