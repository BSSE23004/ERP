import React from "react";

import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import VoucherType from "../../pages/Accounts/VoucherType";
import ProtectedRoute from "../../components/ProtectedRoute";
import AppNavbar from "../../components/PagesTemplate/Navbar";
import Sidebar from "../../components/PagesTemplate/Sidebar";

const voucherTypeRoutes = [
  {
    path: "/voucher-type",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <VoucherType />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addvouchertype",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editvouchertype/:id",
    element: (
      <ProtectedRoute>
        <AddAccountsData />
      </ProtectedRoute>
    ),
  },
];

export default voucherTypeRoutes;
