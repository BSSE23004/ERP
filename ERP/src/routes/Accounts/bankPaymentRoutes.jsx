import BankPaymentVoucher from "../../pages/Accounts/BankPaymentVoucher";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const bankPaymentRoutes = [
  {
    path: "/bank-payment-voucher",
    element: (
      <ProtectedRoute>
        <BankPaymentVoucher />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addbankpaymentvoucher",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editbankpaymentvoucher/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
