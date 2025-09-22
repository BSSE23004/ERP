import CashReceiptVoucher from "../../pages/Accounts/CashReceiptVoucher";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const cashReceiptRoutes = [
  {
    path: "/cash-receipt-voucher",
    element: (
      <ProtectedRoute>
        <CashReceiptVoucher />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addcashreceiptvoucher",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editcashreceiptvoucher/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
