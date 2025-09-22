import AccountGroup from "../../pages/Accounts/AccountGroup";
import ProtectedRoute from "../../components/ProtectedRoute";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";

export const accountGroupRoutes = [
  {
    path: "/account-group",
    element: (
      <ProtectedRoute>
        <AccountGroup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addaccountgroup",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editaccountgroup/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
