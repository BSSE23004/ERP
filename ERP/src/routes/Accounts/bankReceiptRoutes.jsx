import BankReceiptVoucher from "../../pages/Accounts/BankReceiptVoucher";
import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import ProtectedRoute from "../../components/ProtectedRoute";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import Sidebar from "../../components/PagesTemplate/Sidebar";

export const bankReceiptRoutes = [
  {
    path: "/bank-receipt-voucher",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <BankReceiptVoucher />
            </div>
          </div>
        </div>
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
