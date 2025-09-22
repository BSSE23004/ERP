import AccountNature from "../../pages/Accounts/AccountNature";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const accountNatureRoutes = [
  {
    path: "/account-nature",
    element: (
      <ProtectedRoute>
        <AccountNature />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addaccountnature",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editaccountnature/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
