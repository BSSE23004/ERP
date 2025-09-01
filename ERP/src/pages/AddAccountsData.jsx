import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";

const paymentTypeOptions = [
  "CASH",
  "CREDIT",
  "RETURN",
  "BANK TRANSFER",
  "ONLINE BANK TRANSFER",
  "CHEQUE",
  "ADVANCE PAYMENT",
];
const grnOptions = ["GRN-001", "GRN-002", "GRN-003"];
const billOptions = ["CP-0001", "CP-0002", "CP-0003"];
const customerOptions = ["Customer A", "Customer B", "Customer C"];
const vendorOptions = ["ABC Suppliers", "N STARS", "test vendor smart pos"];
const bankOptions = ["Habib Bank", "Meezan Bank", "UBL", "MCB"];
const branchOptions = ["Ibrahim Sattar", "Main Branch", "North Branch"];

// Chart of Account datalist options from localStorage
const getAccountNatureOptions = () => {
  const stored = localStorage.getItem("account_nature");
  return stored ? JSON.parse(stored).map((n) => n.name) : [];
};
const getAccountGroupOptions = () => {
  const stored = localStorage.getItem("account_groups");
  return stored ? JSON.parse(stored).map((g) => g.name) : [];
};
const getParentAccountOptions = () => {
  const stored = localStorage.getItem("chart_of_account");
  return stored ? JSON.parse(stored).map((a) => a.name) : [];
};

export default function AddAccountsData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isVendor = location.pathname.includes("vendor");
  const isCustomer = location.pathname.includes("customer");
  const isChart =
    location.pathname.includes("addchartofaccount") ||
    location.pathname.includes("editchartofaccount");
  const LOCAL_KEY = isChart
    ? "chart_of_account"
    : isVendor
    ? "vendor_payments"
    : "customer_payments";
  // Vendor Payment fields
  const [grn, setGrn] = useState("");
  const [vendor, setVendor] = useState("");
  // Customer Payment fields
  const [bill, setBill] = useState("");
  const [customer, setCustomer] = useState("");
  // Chart of Account fields
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [parentAccount, setParentAccount] = useState("");
  const [accountNature, setAccountNature] = useState("");
  const [accountGroup, setAccountGroup] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  // Shared fields
  const [paymentType, setPaymentType] = useState(paymentTypeOptions[3]);
  const [paymentDate, setPaymentDate] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [chequeCashDate, setChequeCashDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");

  // Load payment for edit or generate next code for add
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
      if (isChart) {
        const account = items.find((a) => a.code === id);
        if (account) {
          setCode(account.code || "");
          setName(account.name || "");
          setParentAccount(account.parentAccount || "");
          setAccountNature(account.accountNature || "");
          setAccountGroup(account.accountGroup || "");
          setOpeningBalance(account.openingBalance || "");
          setStatus(account.status === "Active");
        }
      } else {
        // Payment logic
        const payment = items.find((p) => p.code === id);
        if (payment) {
          if (isVendor) {
            setGrn(payment.grn || "");
            setVendor(payment.vendor || "");
          } else {
            setBill(payment.bill || "");
            setCustomer(payment.customer || "");
          }
          setPaymentType(payment.paymentType || paymentTypeOptions[3]);
          setPaymentDate(payment.paymentDate || "");
          setBank(payment.bank || "");
          setBranch(payment.branch || "");
          setChequeNo(payment.chequeNo || "");
          setChequeDate(payment.chequeDate || "");
          setChequeCashDate(payment.chequeCashDate || "");
          setAmount(payment.amount || "");
          setPaymentNote(payment.paymentNote || "");
          setStatus(payment.status === "Active");
        }
      }
    } else if (isChart) {
      // Generate next code for Chart of Account
      if (!items.length) {
        setCode("COA-0001");
      } else {
        const last = items[items.length - 1]?.code;
        if (last) {
          const num = parseInt(last.split("-")[1]) + 1;
          setCode(`COA-${num.toString().padStart(4, "0")}`);
        } else {
          setCode("COA-0001");
        }
      }
    }
  }, [id, isChart]);

  const handleSave = (e) => {
    e.preventDefault();
    if (isChart) {
      if (!code || !name || !accountNature || !accountGroup) {
        setError("Please fill all required fields");
        return;
      }
      const stored = localStorage.getItem(LOCAL_KEY);
      const items = stored ? JSON.parse(stored) : [];
      const newItem = {
        code,
        name,
        parentAccount,
        accountNature,
        accountGroup,
        openingBalance,
        status: status ? "Active" : "Inactive",
      };
      let updatedItems;
      if (id) {
        updatedItems = items.map((a) => (a.code === id ? newItem : a));
      } else {
        updatedItems = [...items, newItem];
      }
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
      navigate("/chart-of-account");
    } else {
      // Payment logic
      if (isVendor) {
        if (!vendor || !paymentType || !paymentDate || !amount) {
          setError("Please fill all required fields");
          return;
        }
      } else {
        if (!customer || !paymentType || !paymentDate || !amount) {
          setError("Please fill all required fields");
          return;
        }
      }
      const stored = localStorage.getItem(LOCAL_KEY);
      const items = stored ? JSON.parse(stored) : [];
      const newItem = {
        id: id || Date.now().toString(),
        paymentType,
        paymentDate,
        bank,
        branch,
        chequeNo,
        chequeDate,
        chequeCashDate,
        amount,
        paymentNote,
        status: status ? "Active" : "Inactive",
        ...(isVendor ? { grn, vendor } : { bill, customer }),
      };
      let updatedItems;
      if (id) {
        updatedItems = items.map((p) => (p.id === id ? newItem : p));
      } else {
        updatedItems = [...items, newItem];
      }
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedItems));
      navigate(isVendor ? "/vendor-payment" : "/customer-payment");
    }
  };

  return (
    <div className="d-flex flex-row justify-content-start vw-100">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar />
        <div style={{ flex: 1, padding: "2rem 2rem 0 2rem", marginTop: 50 }}>
          <div className="bg-white rounded shadow-sm p-4">
            <h3 className="mb-4">
              {isChart
                ? id
                  ? "Edit Chart of Account"
                  : "Create New Chart of Account"
                : id
                ? isVendor
                  ? "Edit Vendor Payment"
                  : "Edit Customer Payment"
                : isVendor
                ? "Create New Vendor Payment"
                : "Create New Customer Payment"}
            </h3>
            <form onSubmit={handleSave}>
              {isChart ? (
                <>
                  <div className="row mb-3">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <label className="form-label fw-semibold">Code*</label>
                      <input
                        type="text"
                        className="form-control"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        disabled={!!id}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">
                        Parent Account
                      </label>
                      <input
                        className="form-control"
                        list="parent-account-list"
                        value={parentAccount}
                        onChange={(e) => setParentAccount(e.target.value)}
                        placeholder="Select or type Parent Account"
                      />
                      <datalist id="parent-account-list">
                        {getParentAccountOptions().map((opt) => (
                          <option key={opt} value={opt} />
                        ))}
                      </datalist>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">
                        Account Nature*
                      </label>
                      <input
                        className="form-control"
                        list="account-nature-list"
                        value={accountNature}
                        onChange={(e) => setAccountNature(e.target.value)}
                        placeholder="Select or type Account Nature"
                        required
                      />
                      <datalist id="account-nature-list">
                        {getAccountNatureOptions().map((opt) => (
                          <option key={opt} value={opt} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <label className="form-label fw-semibold">
                        Account Group*
                      </label>
                      <input
                        className="form-control"
                        list="account-group-list"
                        value={accountGroup}
                        onChange={(e) => setAccountGroup(e.target.value)}
                        placeholder="Select or type Account Group"
                        required
                      />
                      <datalist id="account-group-list">
                        {getAccountGroupOptions().map((opt) => (
                          <option key={opt} value={opt} />
                        ))}
                      </datalist>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">
                        Opening Balance
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={openingBalance}
                        onChange={(e) => setOpeningBalance(e.target.value)}
                        placeholder="Enter Opening Balance"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Status</label>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row mb-3">
                    {isVendor ? (
                      <>
                        <div className="col-md-3 mb-3 mb-md-0">
                          <label className="form-label fw-semibold">GRN</label>
                          <input
                            className="form-control"
                            list="grn-list"
                            value={grn}
                            onChange={(e) => setGrn(e.target.value)}
                            placeholder="Select or type GRN"
                          />
                          <datalist id="grn-list">
                            {grnOptions.map((opt) => (
                              <option key={opt} value={opt} />
                            ))}
                          </datalist>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label fw-semibold">
                            Vendor*
                          </label>
                          <input
                            className="form-control"
                            list="vendor-list"
                            value={vendor}
                            onChange={(e) => setVendor(e.target.value)}
                            placeholder="Select or type Vendor"
                            required
                          />
                          <datalist id="vendor-list">
                            {vendorOptions.map((opt) => (
                              <option key={opt} value={opt} />
                            ))}
                          </datalist>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-md-3 mb-3 mb-md-0">
                          <label className="form-label fw-semibold">
                            Bill/Invoice No
                          </label>
                          <input
                            className="form-control"
                            list="bill-list"
                            value={bill}
                            onChange={(e) => setBill(e.target.value)}
                            placeholder="Select or type Bill/Invoice No"
                          />
                          <datalist id="bill-list">
                            {billOptions.map((opt) => (
                              <option key={opt} value={opt} />
                            ))}
                          </datalist>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label fw-semibold">
                            Customer*
                          </label>
                          <input
                            className="form-control"
                            list="customer-list"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            placeholder="Select or type Customer"
                            required
                          />
                          <datalist id="customer-list">
                            {customerOptions.map((opt) => (
                              <option key={opt} value={opt} />
                            ))}
                          </datalist>
                        </div>
                      </>
                    )}
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">
                        Payment Type*
                      </label>
                      <input
                        className="form-control"
                        list="payment-type-list"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                        placeholder="Select or type Payment Type"
                        required
                      />
                      <datalist id="payment-type-list">
                        {paymentTypeOptions.map((opt) => (
                          <option key={opt} value={opt} />
                        ))}
                      </datalist>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">
                        Payment Date*
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <label className="form-label fw-semibold">Bank</label>
                      <input
                        className="form-control"
                        list="bank-list"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                        placeholder="Select or type Bank"
                      />
                      <datalist id="bank-list">
                        {bankOptions.map((opt) => (
                          <option key={opt} value={opt} />
                        ))}
                      </datalist>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Branch</label>
                      <input
                        className="form-control"
                        list="branch-list"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="Select or type Branch"
                      />
                      <datalist id="branch-list">
                        {branchOptions.map((opt) => (
                          <option key={opt} value={opt} />
                        ))}
                      </datalist>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">
                        Cheque NO
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={chequeNo}
                        onChange={(e) => setChequeNo(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">
                        Cheque Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={chequeDate}
                        onChange={(e) => setChequeDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <label className="form-label fw-semibold">
                        Cheque Cash Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={chequeCashDate}
                        onChange={(e) => setChequeCashDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Amount*</label>
                      <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Status</label>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Payment Note
                    </label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={paymentNote}
                      onChange={(e) => setPaymentNote(e.target.value)}
                    />
                  </div>
                </>
              )}
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn text-white px-4"
                  style={{ backgroundColor: "#ff6600" }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-dark px-4"
                  onClick={() =>
                    isChart
                      ? navigate("/chart-of-account")
                      : navigate(
                          isVendor ? "/vendor-payment" : "/customer-payment"
                        )
                  }
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
