import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { seedTestUser } from "./utils/seedUser.js";
import { narrationRoutes } from "./routes/narrationRoutes.jsx";
import { ledgerRoutes } from "./routes/ledgerRoutes.jsx";
import { bankPaymentRoutes } from "./routes/bankPaymentRoutes.jsx";
import { bankReceiptRoutes } from "./routes/bankReceiptRoutes.jsx";
import { cashPaymentRoutes } from "./routes/cashPaymentRoutes.jsx";
import { cashReceiptRoutes } from "./routes/cashReceiptRoutes.jsx";
import { journalVoucherRoutes } from "./routes/journalVoucherRoutes.jsx";
import { vendorPaymentRoutes } from "./routes/vendorPaymentRoutes.jsx";
import { customerPaymentRoutes } from "./routes/customerPaymentRoutes.jsx";
import { employeePaymentRoutes } from "./routes/employeePaymentRoutes.jsx";
import { chartOfAccountRoutes } from "./routes/chartOfAccountRoutes.jsx";
import { accountGroupRoutes } from "./routes/accountGroupRoutes.jsx";
import { accountNatureRoutes } from "./routes/accountNatureRoutes.jsx";
import { homeRoutes } from "./routes/homeRoutes.jsx";
import { academicRoutes } from "./routes/academicRoutes.jsx";
import voucherTypeRoutes from "./routes/vouchertype.jsx";
import UserLogin from "./pages/UserLogin";
import { AssetTypeRoutes } from "./routes/AssetTypeRoutes";
import "./App.css";

seedTestUser();

const router = createBrowserRouter([
  ...narrationRoutes,
  ...ledgerRoutes,
  ...bankPaymentRoutes,
  ...bankReceiptRoutes,
  ...cashPaymentRoutes,
  ...cashReceiptRoutes,
  ...journalVoucherRoutes,
  ...vendorPaymentRoutes,
  ...customerPaymentRoutes,
  ...employeePaymentRoutes,
  ...chartOfAccountRoutes,
  ...accountGroupRoutes,
  ...accountNatureRoutes,
  ...homeRoutes,
  ...academicRoutes,
  ...voucherTypeRoutes,
  ...AssetTypeRoutes,
  { path: "/", element: <UserLogin /> },
  { path: "*", element: <UserLogin /> },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
