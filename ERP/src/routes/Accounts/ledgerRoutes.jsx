import LedgerEntries from "../../pages/Accounts/LedgerEntries";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import Sidebar from "../../components/PagesTemplate/Sidebar";

export const ledgerRoutes = [
  {
    path: "/ledger-entries",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <LedgerEntries />
            </div>
          </div>
        </div>
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
