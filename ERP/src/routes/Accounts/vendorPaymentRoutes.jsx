import VendorPayment from "../../pages/Accounts/VendorPayment";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import Sidebar from "../../components/PagesTemplate/Sidebar";

export const vendorPaymentRoutes = [
  {
    path: "/vendor-payment",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <VendorPayment />
            </div>
          </div>
        </div>
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
