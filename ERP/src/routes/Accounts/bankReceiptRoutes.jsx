import BankReceiptVoucher from "../../pages/Accounts/BankReceiptVoucher";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const bankReceiptRoutes = [
  {
    path: "/bank-receipt-voucher",
    element: (
      <ProtectedRoute>
        <BankReceiptVoucher />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addbankreceiptvoucher",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editbankreceiptvoucher/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
