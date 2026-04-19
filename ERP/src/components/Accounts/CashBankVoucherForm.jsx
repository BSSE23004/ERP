import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

const bankOptions = ["Habib Bank", "Meezan Bank", "UBL", "MCB"];
const branchOptions = ["Ibrahim Sattar", "Main Branch", "North Branch"];

export default function CashBankVoucherForm({
  id,
  isCashPayment,
  isCashReceipt,
  isBankPayment,
  isBankReceipt,
}) {
  const navigate = useNavigate();
  const {
    data: itemData,
    create: createItem,
    update: updateItem,
  } = useAPI("/api/accounts/cashbankvoucher/");

  const [bookingDate, setBookingDate] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getVoucherType = () => {
    if (isCashPayment) return "CASH_PAYMENT";
    if (isCashReceipt) return "CASH_RECEIPT";
    if (isBankPayment) return "BANK_PAYMENT";
    if (isBankReceipt) return "BANK_RECEIPT";
    return "";
  };

  const navigatePath = () => {
    if (isCashPayment) return "/cashpaymentvoucher";
    if (isCashReceipt) return "/cashreceiptvoucher";
    if (isBankPayment) return "/bankpaymentvoucher";
    if (isBankReceipt) return "/bankreceiptvoucher";
    return "/";
  };

  useEffect(() => {
    if (id && itemData) {
      const item = Array.isArray(itemData)
        ? itemData.find((v) => v.id === parseInt(id))
        : itemData;

      if (item) {
        setBookingDate(item.booking_date || "");
        setVoucherNo(item.voucher_no || "");
        setDocumentNo(item.document_no || "");
        setTotalAmount(item.total_amount ? item.total_amount.toString() : "");
        setBank(item.bank || "");
        setBranch(item.branch || "");
        setStatus(item.status !== "Inactive");
      }
    }
  }, [id, itemData]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (
      !bookingDate ||
      !voucherNo ||
      !documentNo ||
      !totalAmount ||
      ((isBankPayment || isBankReceipt) && (!bank || !branch))
    ) {
      setError("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        booking_date: bookingDate,
        voucher_no: voucherNo,
        document_no: documentNo,
        total_amount: parseFloat(totalAmount),
        voucher_type: getVoucherType(),
        bank: isBankPayment || isBankReceipt ? bank : null,
        branch: isBankPayment || isBankReceipt ? branch : null,
        status: status ? "Active" : "Inactive",
      };

      if (id) {
        await updateItem(parseInt(id), payload);
      } else {
        await createItem(payload);
      }

      navigate(navigatePath());
    } catch (err) {
      setError(err.message || "Error saving voucher");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h3 className="mb-4">
        {isCashPayment
          ? id
            ? "Edit Cash Payment Voucher"
            : "Create New Cash Payment Voucher"
          : isCashReceipt
            ? id
              ? "Edit Cash Receipt Voucher"
              : "Create New Cash Receipt Voucher"
            : isBankPayment
              ? id
                ? "Edit Bank Payment Voucher"
                : "Create New Bank Payment Voucher"
              : isBankReceipt
                ? id
                  ? "Edit Bank Receipt Voucher"
                  : "Create New Bank Receipt Voucher"
                : ""}
      </h3>
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Booking Date*</label>
            <input
              type="date"
              className="form-control"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Voucher No.*</label>
            <input
              type="text"
              className="form-control"
              value={voucherNo}
              onChange={(e) => setVoucherNo(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Document No*</label>
            <input
              type="text"
              className="form-control"
              value={documentNo}
              onChange={(e) => setDocumentNo(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Total Amount*</label>
            <input
              type="number"
              className="form-control"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
            />
          </div>
        </div>
        {(isBankPayment || isBankReceipt) && (
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Bank*</label>
              <input
                className="form-control"
                list="bank-list"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                placeholder="Select or type Bank"
                required
              />
              <datalist id="bank-list">
                {bankOptions.map((opt) => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Branch*</label>
              <input
                className="form-control"
                list="branch-list"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Select or type Branch"
                required
              />
              <datalist id="branch-list">
                {branchOptions.map((opt) => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
            </div>
          </div>
        )}
        <div className="row mb-3">
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
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn text-white px-4"
            style={{ backgroundColor: "#ff6600" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-dark px-4"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
}
