import CustomerPayment from "../../pages/Accounts/CustomerPayment";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const customerPaymentRoutes = [
  {
    path: "/customer-payment",
    element: (
      <ProtectedRoute>
        <CustomerPayment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addcustomerpayment",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editcustomerpayment/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
