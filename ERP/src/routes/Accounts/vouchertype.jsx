import React from "react";

import AddAccountsData from "../../pages/Accounts/AddAccountsData";
import VoucherType from "../../pages/Accounts/VoucherType";
import ProtectedRoute from "../../components/ProtectedRoute";

const voucherTypeRoutes = [
  {
    path: "/voucher-type",
    element: (
      <ProtectedRoute>
        <VoucherType />
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
