import LedgerEntries from "../../pages/Accounts/LedgerEntries";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const ledgerRoutes = [
  {
    path: "/ledger-entries",
    element: (
      <ProtectedRoute>
        <LedgerEntries />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addledgerentry",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editledgerentry/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
