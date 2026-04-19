import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

export default function ChartOfAccountForm({ id }) {
  const navigate = useNavigate();
  const {
    data: allAccounts,
    loading,
    error: fetchError,
    create,
    update,
  } = useAPI("/api/accounts/chartofaccount/");

  const { data: accountNatures } = useAPI("/api/accounts/accountnature/");
  const { data: accountGroups } = useAPI("/api/accounts/accountgroup/");
  const { data: parentAccounts } = useAPI("/api/accounts/chartofaccount/");

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [parentAccountId, setParentAccountId] = useState("");
  const [accountNatureId, setAccountNatureId] = useState("");
  const [accountGroupId, setAccountGroupId] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingItem =
    id && allAccounts
      ? allAccounts.find((item) => item.id === parseInt(id))
      : null;

  useEffect(() => {
    if (editingItem) {
      setCode(editingItem.code);
      setName(editingItem.name);
      setParentAccountId(editingItem.parent_account || "");
      setAccountNatureId(editingItem.account_nature || "");
      setAccountGroupId(editingItem.account_group || "");
      setOpeningBalance(editingItem.opening_balance || "");
      setStatus(editingItem.status === "Active");
    } else {
      // Generate next code
      if (allAccounts && allAccounts.length > 0) {
        const lastCode = allAccounts[allAccounts.length - 1]?.code;
        if (lastCode && lastCode.includes("-")) {
          const num = parseInt(lastCode.split("-")[1], 10) + 1;
          setCode(`COA-${num.toString().padStart(4, "0")}`);
        } else {
          setCode("COA-0001");
        }
      } else {
        setCode("COA-0001");
      }
    }
  }, [id, allAccounts, editingItem]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!code || !name || !accountNatureId || !accountGroupId) {
      setError("Please fill all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        code,
        name,
        parent_account: parentAccountId || null,
        account_nature: parseInt(accountNatureId),
        account_group: parseInt(accountGroupId),
        opening_balance: parseFloat(openingBalance) || 0,
        status: status ? "Active" : "Inactive",
      };

      if (editingItem) {
        await update(editingItem.id, payload);
      } else {
        await create(payload);
      }
      navigate("/chart-of-account");
    } catch (err) {
      setError(err.message || "Failed to save account");
      console.error("Save error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }

  return (
    <>
      <h3 className="mb-4">
        {id ? "Edit Chart of Account" : "Create New Chart of Account"}
      </h3>
      <form onSubmit={handleSave}>
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
            <label className="form-label fw-semibold">Parent Account</label>
            <select
              className="form-control"
              value={parentAccountId}
              onChange={(e) => setParentAccountId(e.target.value)}
            >
              <option value="">-- Select Parent Account --</option>
              {parentAccounts &&
                parentAccounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.code} - {acc.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Account Nature*</label>
            <select
              className="form-control"
              value={accountNatureId}
              onChange={(e) => setAccountNatureId(e.target.value)}
              required
            >
              <option value="">-- Select Account Nature --</option>
              {accountNatures &&
                accountNatures.map((nature) => (
                  <option key={nature.id} value={nature.id}>
                    {nature.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
            <label className="form-label fw-semibold">Account Group*</label>
            <select
              className="form-control"
              value={accountGroupId}
              onChange={(e) => setAccountGroupId(e.target.value)}
              required
            >
              <option value="">-- Select Account Group --</option>
              {accountGroups &&
                accountGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Opening Balance</label>
            <input
              type="number"
              step="0.01"
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
