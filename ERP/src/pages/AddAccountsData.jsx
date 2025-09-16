import AccountGroupForm from "../components/AccountGroupForm";
import AccountNatureForm from "../components/AccountNatureForm";

import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import VoucherTypeForm from "../components/VoucherTypeForm";
import ChartOfAccountForm from "../components/ChartOfAccountForm";
import JournalVoucherForm from "../components/JournalVoucherForm";
import LedgerEntryForm from "../components/LedgerEntryForm";
import CashBankVoucherForm from "../components/CashBankVoucherForm";
import PaymentForm from "../components/PaymentForm";
import NarrationForm from "../components/NarrationForm";

export default function AddAccountsData() {
  const { id } = useParams();
  const location = useLocation();
  const isAccountGroup = location.pathname.includes("accountgroup");
  const isAccountNature = location.pathname.includes("accountnature");
  const isBankPayment = location.pathname.includes("bankpaymentvoucher");
  const isBankReceipt = location.pathname.includes("bankreceiptvoucher");
  const isVendor = location.pathname.includes("vendor");
  const isCustomer = location.pathname.includes("customer");
  const isEmployee = location.pathname.includes("employee");
  const isChart =
    location.pathname.includes("addchartofaccount") ||
    location.pathname.includes("editchartofaccount");
  const isJournal =
    location.pathname.includes("addjournalvoucher") ||
    location.pathname.includes("editjournalvoucher");
  const isLedger = location.pathname.includes("ledgerentry");
  const isCashPayment = location.pathname.includes("cashpaymentvoucher");
  const isCashReceipt = location.pathname.includes("cashreceiptvoucher");
  const isNarration = location.pathname.includes("narration");
  const isVoucherType =
    location.pathname.includes("addvouchertype") ||
    location.pathname.includes("editvouchertype");

  let formComponent = null;
  if (isAccountNature) {
    formComponent = <AccountNatureForm id={id} />;
  } else if (isAccountGroup) {
    formComponent = <AccountGroupForm id={id} />;
  } else if (isVoucherType) {
    formComponent = <VoucherTypeForm id={id} />;
  } else if (isChart) {
    formComponent = <ChartOfAccountForm id={id} />;
  } else if (isJournal) {
    formComponent = <JournalVoucherForm id={id} />;
  } else if (isLedger) {
    formComponent = <LedgerEntryForm id={id} />;
  } else if (isCashPayment || isCashReceipt || isBankPayment || isBankReceipt) {
    formComponent = (
      <CashBankVoucherForm
        id={id}
        isCashPayment={isCashPayment}
        isCashReceipt={isCashReceipt}
        isBankPayment={isBankPayment}
        isBankReceipt={isBankReceipt}
      />
    );
  } else if (isVendor || isCustomer || isEmployee) {
    formComponent = (
      <PaymentForm
        id={id}
        isVendor={isVendor}
        isCustomer={isCustomer}
        isEmployee={isEmployee}
      />
    );
  } else if (isNarration) {
    formComponent = <NarrationForm id={id} />;
  }

  return (
    <div className="d-flex flex-row justify-content-start vw-100">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar />
        <div style={{ flex: 1, padding: "2rem 2rem 0 2rem", marginTop: 50 }}>
          <div className="bg-white rounded shadow-sm p-4">{formComponent}</div>
        </div>
      </div>
    </div>
  );
}
