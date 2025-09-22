import CashPaymentVoucher from "../../pages/Accounts/CashPaymentVoucher";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const cashPaymentRoutes = [
  {
    path: "/cash-payment-voucher",
    element: (
      <ProtectedRoute>
        <CashPaymentVoucher />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addcashpaymentvoucher",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editcashpaymentvoucher/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
