import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AppNavbar from "../components/Navbar";
import DataHeader from "../components/DataHeader";
import DataControls from "../components/DataControls";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function ChartOfAccount() {
  const navigate = useNavigate();
  const LOCAL_KEY = "chart_of_account";
  const storedAccounts = localStorage.getItem(LOCAL_KEY);
  const initialAccounts = storedAccounts ? JSON.parse(storedAccounts) : [];
  const [accounts, setAccounts] = useState(initialAccounts);
  const [showModal, setShowModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(accounts));
  }, [accounts]);

  // Filtering logic
  const filtered = accounts.filter(
    (a) =>
      (a.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.parentAccount || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.accountNature || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.accountGroup || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.openingBalance || "").toString().includes(search) ||
      (a.status || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/addchartofaccount");
  };
  const handleEdit = (item) => {
    navigate(`/editchartofaccount/${item.code}`);
  };
  const handleDelete = (item) => {
    setAccountToDelete(item);
    setShowModal(true);
  };
  const confirmDelete = () => {
    if (accountToDelete && accountToDelete.code !== undefined) {
      const updated = accounts.filter((a) => a.code !== accountToDelete.code);
      setAccounts(updated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    }
    setShowModal(false);
    setAccountToDelete(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setAccountToDelete(null);
  };

  const columns = [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
    { field: "parentAccount", header: "Parent Account", sortable: true },
    { field: "accountNature", header: "Account Nature", sortable: true },
    { field: "accountGroup", header: "Account Group", sortable: true },
    { field: "openingBalance", header: "Opening Balance", sortable: true },
    { field: "status", header: "Status", sortable: true },
  ];

  return (
    <div className="d-flex flex-row justify-content-start vw-100">
      <Sidebar />
      <div
        className="flex-fill d-flex flex-column width-100"
        style={{ minHeight: "100vh", background: "#fafbfc", marginLeft: 260 }}
      >
        <AppNavbar />
        <div style={{ marginTop: 50, padding: "2rem" }}>
          <DataHeader
            title="Chart of Account List"
            subtitle="Manage Your Chart of Account"
            onAdd={handleAdd}
            buttonText="Add New Chart of Account"
          />
          <DataControls
            showCount={showCount}
            setShowCount={setShowCount}
            search={search}
            setSearch={setSearch}
            data={filtered}
            columns={columns}
          />
          <DataTable
            data={filtered}
            columns={columns}
            showCount={showCount}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete this chart of account?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
