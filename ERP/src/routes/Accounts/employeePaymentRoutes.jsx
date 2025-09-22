import EmployeePayment from "../../pages/Accounts/EmployeePayment";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";

export const employeePaymentRoutes = [
  {
    path: "/employee-payment",
    element: (
      <ProtectedRoute>
        <EmployeePayment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addemployeepayment",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editemployeepayment/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];
