import VendorPayment from "../../pages/Accounts/VendorPayment";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const vendorPaymentRoutes = [
  {
    path: "/vendor-payment",
    element: (
      <ProtectedRoute>
        <VendorPayment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addvendorpayment",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editvendorpayment/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
