import ChartOfAccount from "../../pages/Accounts/ChartOfAccount";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

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
