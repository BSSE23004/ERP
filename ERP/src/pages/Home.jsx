import React, { useEffect, useState } from "react";
import AppNavbar from "../components/PagesTemplate/Navbar";
import Sidebar from "../components/PagesTemplate/Sidebar";
import { Link } from "react-router-dom";
import DashboardCards from "../components/HomePage/DashboardCards";
import LivePreviewCard from "../components/HomePage/LivePreviewCard";
import DataTable from "../components/PagesTemplate/DataTable";
import dashboardCardsData from "../utils/dashboardCards.json";
import previewConfig from "../utils/previewConfig.json";
import api from "../services/api";

// Mapping of preview config keys to API endpoints
const apiEndpointMap = {
  // Academics
  "Academic Subject": "/api/academics/subjects/",
  "Program Type": "/api/academics/program-types/",
  "Academic Program": "/api/academics/programs/",
  Class: "/api/academics/classes/",
  Section: "/api/academics/sections/",
  // Assets
  "Asset Type": "/api/assets/assettype/",
  "Asset Sub Type": "/api/assets/assetsubtype/",
  "Asset Status": "/api/assets/assetstatus/",
  "Asset Location": "/api/assets/assetlocation/",
  // Accounts
  "Account Group": "/api/accounts/accountgroup/",
  "Account Nature": "/api/accounts/accountnature/",
  "Voucher Type": "/api/accounts/vouchertype/",
  "Chart of Account": "/api/accounts/chartofaccount/",
  "Journal Voucher": "/api/accounts/journalvoucher/",
  "Ledger Entries": "/api/accounts/ledgerentry/",
  Narration: "/api/accounts/narration/",
  // Vouchers - Cash/Bank
  "Cash Receipt Voucher":
    "/api/accounts/cashbankvoucher/?voucher_type=CASH_RECEIPT",
  "Cash Payment Voucher":
    "/api/accounts/cashbankvoucher/?voucher_type=CASH_PAYMENT",
  "Bank Receipt Voucher":
    "/api/accounts/cashbankvoucher/?voucher_type=BANK_RECEIPT",
  "Bank Payment Voucher":
    "/api/accounts/cashbankvoucher/?voucher_type=BANK_PAYMENT",
  // Payments - by category
  "Employee Payment": "/api/accounts/payment/?payment_category=EMPLOYEE",
  "Customer Payment": "/api/accounts/payment/?payment_category=CUSTOMER",
  "Vendor Payment": "/api/accounts/payment/?payment_category=VENDOR",
};

// Field mapping for API responses
const fieldMappingMap = {
  // Academics
  "Program Type": { name: "name", code: "code" },
  "Academic Program": {
    name: "name",
    code: "code",
    programType: "program_type",
    status: "status",
  },
  "Academic Subject": { name: "name", code: "code" },
  Class: { name: "name", code: "code" },
  Section: { name: "name", code: "code" },
  // Assets
  "Asset Type": { typeName: "type_name", code: "code" },
  "Asset Sub Type": {
    code: "code",
    assetTypeName: "asset_type_name",
    subTypeName: "sub_type_name",
  },
  "Asset Status": { code: "code", name: "name" },
  "Asset Location": { code: "code", name: "name" },
  // Accounts
  "Account Group": {
    name: "name",
    description: "description",
    status: "status",
  },
  "Account Nature": { code: "code", name: "name", status: "status" },
  "Voucher Type": { code: "code", name: "name", status: "status" },
  "Chart of Account": {
    code: "code",
    name: "name",
    parentAccount: "parent_account",
    accountNature: "account_nature",
    accountGroup: "account_group",
    openingBalance: "opening_balance",
    status: "status",
  },
  "Journal Voucher": {
    bookingDate: "booking_date",
    voucherNo: "voucher_no",
    documentNo: "document_no",
    status: "status",
  },
  "Ledger Entries": {
    documentNo: "document_no",
    bookingDate: "booking_date",
    totalDebit: "total_debit",
    totalCredit: "total_credit",
    status: "status",
  },
  Narration: { narration: "narration", status: "status" },
  // Vouchers - Cash/Bank
  "Cash Receipt Voucher": {
    bookingDate: "booking_date",
    voucherNo: "voucher_no",
    documentNo: "document_no",
    totalAmount: "total_amount",
    status: "status",
  },
  "Cash Payment Voucher": {
    bookingDate: "booking_date",
    voucherNo: "voucher_no",
    documentNo: "document_no",
    totalAmount: "total_amount",
    status: "status",
  },
  "Bank Receipt Voucher": {
    bookingDate: "booking_date",
    voucherNo: "voucher_no",
    documentNo: "document_no",
    bank: "bank",
    branch: "branch",
    totalAmount: "total_amount",
    status: "status",
  },
  "Bank Payment Voucher": {
    bookingDate: "booking_date",
    voucherNo: "voucher_no",
    documentNo: "document_no",
    bank: "bank",
    branch: "branch",
    totalAmount: "total_amount",
    status: "status",
  },
  // Payments
  "Employee Payment": {
    employee: "employee",
    paymentType: "payment_type",
    paymentDate: "payment_date",
    amount: "amount",
    status: "status",
  },
  "Customer Payment": {
    customer: "customer",
    paymentType: "payment_type",
    paymentDate: "payment_date",
    bank: "bank",
    branch: "branch",
    amount: "amount",
    status: "status",
  },
  "Vendor Payment": {
    vendor: "vendor",
    paymentType: "payment_type",
    paymentDate: "payment_date",
    bank: "bank",
    branch: "branch",
    amount: "amount",
    status: "status",
  },
};

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [previewData, setPreviewData] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [errorStates, setErrorStates] = useState({});

  const handleSearch = (val) => {
    setSearchTerm(val.trim().toLowerCase());
  };

  // Fetch data from API for each preview card
  useEffect(() => {
    dashboardCardsData.forEach((card) => {
      const endpoint = apiEndpointMap[card.label];
      if (endpoint) {
        setLoadingStates((prev) => ({ ...prev, [card.label]: true }));
        api
          .get(endpoint)
          .then((response) => {
            const rawData = Array.isArray(response.data) ? response.data : [];
            // Transform field names based on the mapping
            const fieldMapping = fieldMappingMap[card.label] || {};
            const transformedData = rawData.map((item) => {
              const transformed = { ...item };
              Object.keys(fieldMapping).forEach((displayField) => {
                const apiField = fieldMapping[displayField];
                if (apiField in item) {
                  transformed[displayField] = item[apiField];
                }
              });
              return transformed;
            });
            setPreviewData((prev) => ({
              ...prev,
              [card.label]: transformedData,
            }));
            setLoadingStates((prev) => ({ ...prev, [card.label]: false }));
            setErrorStates((prev) => ({ ...prev, [card.label]: null }));
          })
          .catch((err) => {
            setLoadingStates((prev) => ({ ...prev, [card.label]: false }));
            setErrorStates((prev) => ({
              ...prev,
              [card.label]: err.message || "Failed to load data",
            }));
            console.error(`Error fetching ${card.label}:`, err);
          });
      }
    });
  }, []);

  return (
    <div className="d-flex flex-row justify-content-start vw-100 ">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar onSearch={handleSearch} />
        <div style={{ marginTop: 50 }}>
          <DashboardCards />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem 2.5rem",
            margin: "3rem 4% 2rem 4%",
            justifyContent: "flex-start",
          }}
        >
          {dashboardCardsData.map((card) => {
            const preview = previewConfig[card.label];
            let data = previewData[card.label] || [];
            let loading = loadingStates[card.label] || false;
            let error = errorStates[card.label] || null;

            let filteredData = data;
            // If searchTerm is empty, show all data for all cards
            if (searchTerm && preview && data.length > 0) {
              filteredData = data.filter((row) =>
                preview.columns.some((col) => {
                  const val = row[col.field];
                  return (
                    (typeof val === "string" &&
                      val.toLowerCase().includes(searchTerm)) ||
                    (typeof val === "number" &&
                      val.toString().includes(searchTerm))
                  );
                }),
              );
            }

            return (
              <LivePreviewCard
                key={card.label}
                title={card.label}
                color={card.color}
                style={{ minWidth: 420, maxWidth: 520, flex: "1 1 420px" }}
              >
                {loading ? (
                  <div
                    style={{
                      minHeight: 180,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ fontSize: 16, color: "#888" }}>
                      Loading <b>{card.label}</b>...
                    </div>
                  </div>
                ) : error ? (
                  <div
                    style={{
                      minHeight: 180,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 16,
                        color: "#d32f2f",
                        marginBottom: 12,
                      }}
                    >
                      Error loading <b>{card.label}</b>
                    </div>
                    <Link
                      to={card.path}
                      style={{
                        background: card.color,
                        color: "#211d5a",
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: "8px 22px",
                        textDecoration: "none",
                        fontSize: 16,
                        boxShadow: "0 1px 6px #211d5a11",
                      }}
                    >
                      Go to {card.label}
                    </Link>
                  </div>
                ) : preview ? (
                  data && data.length > 0 ? (
                    <DataTable
                      data={filteredData}
                      columns={preview.columns}
                      showCount={5}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      readOnly={true}
                    />
                  ) : (
                    <div
                      style={{
                        minHeight: 180,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 16,
                          color: "#888",
                          marginBottom: 12,
                        }}
                      >
                        No data available for <b>{card.label}</b>
                      </div>
                      <Link
                        to={card.path}
                        style={{
                          background: card.color,
                          color: "#211d5a",
                          fontWeight: 600,
                          borderRadius: 8,
                          padding: "8px 22px",
                          textDecoration: "none",
                          fontSize: 16,
                          boxShadow: "0 1px 6px #211d5a11",
                        }}
                      >
                        Go to {card.label}
                      </Link>
                    </div>
                  )
                ) : (
                  <div
                    style={{
                      minHeight: 180,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 48,
                        color: "#bdbdbd",
                        marginBottom: 16,
                      }}
                    >
                      <i className={card.icon}></i>
                    </span>
                    <div
                      style={{ fontSize: 18, color: "#888", marginBottom: 12 }}
                    >
                      Live preview of <b>{card.label}</b> page
                    </div>
                    <Link
                      to={card.path}
                      style={{
                        background: card.color,
                        color: "#211d5a",
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: "8px 22px",
                        textDecoration: "none",
                        fontSize: 16,
                        boxShadow: "0 1px 6px #211d5a11",
                      }}
                    >
                      Go to {card.label}
                    </Link>
                  </div>
                )}
              </LivePreviewCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Home;
