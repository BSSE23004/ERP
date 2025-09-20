import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { seedTestUser } from "./utils/seedUser.js";
import { narrationRoutes } from "./routes/Accounts/narrationRoutes.jsx";
import { ledgerRoutes } from "./routes/Accounts/ledgerRoutes.jsx";
import { bankPaymentRoutes } from "./routes/Accounts/bankPaymentRoutes.jsx";
import { bankReceiptRoutes } from "./routes/Accounts/bankReceiptRoutes.jsx";
import { cashPaymentRoutes } from "./routes/Accounts/cashPaymentRoutes.jsx";
import { cashReceiptRoutes } from "./routes/Accounts/cashReceiptRoutes.jsx";
import { journalVoucherRoutes } from "./routes/Accounts/journalVoucherRoutes.jsx";
import { vendorPaymentRoutes } from "./routes/Accounts/vendorPaymentRoutes.jsx";
import { customerPaymentRoutes } from "./routes/Accounts/customerPaymentRoutes.jsx";
import { employeePaymentRoutes } from "./routes/Accounts/employeePaymentRoutes.jsx";
import { chartOfAccountRoutes } from "./routes/Accounts/chartOfAccountRoutes.jsx";
import { accountGroupRoutes } from "./routes/Accounts/accountGroupRoutes.jsx";
import { accountNatureRoutes } from "./routes/Accounts/accountNatureRoutes.jsx";
import { homeRoutes } from "./routes/homeRoutes.jsx";
import { academicRoutes } from "./routes/Academics/academicRoutes.jsx";
import voucherTypeRoutes from "./routes/Accounts/vouchertype.jsx";
import UserLogin from "./pages/UserLogin";
import { AssetTypeRoutes } from "./routes/Assets/AssetTypeRoutes";
import AssetStatusRoutes from "./routes/Assets/AssetStatusRoutes";
import { AssetLocationRoutes } from "./routes/Assets/AssetLocationRoutes";
import { assetSubTypeRoutes } from "./routes/Assets/AssetSubTypeRoutes";
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
  ...AssetStatusRoutes,
  ...AssetLocationRoutes,
  ...assetSubTypeRoutes,
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
