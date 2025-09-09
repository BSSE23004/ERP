import BankPaymentVoucher from "./pages/BankPaymentVoucher.jsx";
import EmployeePayment from "./pages/EmployeePayment.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import AddData from "./pages/AddData.jsx";
import AcademicSubject from "./pages/Academics/AcademicSubject.jsx";
import ProgramType from "./pages/Academics/ProgramType.jsx";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppNavbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { seedTestUser } from "./utils/seedUser.js";
import "./App.css";
import AcademicProgram from "./pages/Academics/AcademicProgram.jsx";
import AcademicClass from "./pages/Academics/AcademicClass.jsx";
import AcademicSection from "./pages/Academics/AcademicSection.jsx";
import CustomerPayment from "./pages/CustomerPayment";
import VendorPayment from "./pages/VendorPayment.jsx";
import AddAccountsData from "./pages/AddAccountsData.jsx";
import AccountGroup from "./pages/AccountGroup.jsx";
import AccountNature from "./pages/AccountNature.jsx";
import ChartOfAccount from "./pages/ChartOfAccount.jsx";
import JournalVoucher from "./pages/JournalVoucher.jsx";
import LedgerEntries from "./pages/LedgerEntries.jsx";
import CashPaymentVoucher from "./pages/CashPaymentVoucher.jsx";
import CashReceiptVoucher from "./pages/CashReceiptVoucher.jsx";
import BankReceiptVoucher from "./pages/BankReceiptVoucher.jsx";
import Narration from "./pages/Narration.jsx";

seedTestUser();

const router = createBrowserRouter([
  {
    path: "/narration",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <Narration />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addnarration",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editnarration/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
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
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editbankreceiptvoucher/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addbankpaymentvoucher",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editbankpaymentvoucher/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/bank-payment-voucher",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <BankPaymentVoucher />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addcashreceiptvoucher",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editcashreceiptvoucher/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/cash-receipt-voucher",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <CashReceiptVoucher />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee-payment",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <EmployeePayment />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addemployeepayment",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editemployeepayment/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/journal-voucher",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <JournalVoucher />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addjournalvoucher",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editjournalvoucher/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
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
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editvendorpayment/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <UserLogin />,
  },
  {
    path: "*",
    element: <UserLogin />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <Home />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/customer-payment",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <CustomerPayment />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addcustomerpayment",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editcustomerpayment/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/academic-subject",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AcademicSubject />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addacademicsubject",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editacademicsubject/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/program-type",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <ProgramType />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addprogramtype",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editprogramtype/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/academic-program",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AcademicProgram />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addacademicprogram",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editacademicprogram/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/academic-class",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AcademicClass />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addacademicclass",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editacademicclass/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/academic-section",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AcademicSection />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addacademicsection",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editacademicsection/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/account-group",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AccountGroup />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addaccountgroup",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editaccountgroup/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/account-nature",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AccountNature />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addaccountnature",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editaccountnature/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/chart-of-account",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <ChartOfAccount />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addchartofaccount",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editchartofaccount/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/ledger-entries",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <LedgerEntries />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addledgerentry",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editledgerentry/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/cash-payment-voucher",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <CashPaymentVoucher />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addcashpaymentvoucher",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/editcashpaymentvoucher/:id",
    element: (
      <ProtectedRoute>
        <div>
          <AppNavbar />
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
              <AddAccountsData />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
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
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
