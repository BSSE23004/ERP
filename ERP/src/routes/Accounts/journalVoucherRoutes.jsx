import JournalVoucher from "../../pages/Accounts/JournalVoucher";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const journalVoucherRoutes = [
  {
    path: "/journal-voucher",
    element: (
      <ProtectedRoute>
        <JournalVoucher />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addjournalvoucher",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editjournalvoucher/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
