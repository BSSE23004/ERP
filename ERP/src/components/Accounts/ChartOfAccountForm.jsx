import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export default function ChartOfAccountForm({ id }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [parentAccount, setParentAccount] = useState("");
  const [accountNature, setAccountNature] = useState("");
  const [accountGroup, setAccountGroup] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");
  const LOCAL_KEY = "chart_of_account";

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    const items = stored ? JSON.parse(stored) : [];
    if (id) {
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
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
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
  };

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
            <label className="form-label fw-semibold">Account Nature*</label>
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
            <label className="form-label fw-semibold">Account Group*</label>
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
            <label className="form-label fw-semibold">Opening Balance</label>
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
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
}
