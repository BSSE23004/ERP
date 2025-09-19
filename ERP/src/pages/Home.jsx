import React, { useEffect, useState } from "react";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DashboardCards from "../components/DashboardCards";
import LivePreviewCard from "../components/LivePreviewCard";
import DataTable from "../components/DataTable";
import dashboardCardsData from "../utils/dashboardCards.json";
import previewConfig from "../utils/previewConfig.json";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (val) => {
    setSearchTerm(val.trim().toLowerCase());
  };

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
            let data = [];
            if (preview) {
              try {
                data = JSON.parse(localStorage.getItem(preview.key)) || [];
              } catch {
                data = [];
              }
            }
            let filteredData = data;
            // If searchTerm is empty, show all data for all cards
            if (searchTerm && preview) {
              filteredData = data.filter((row) =>
                preview.columns.some((col) => {
                  const val = row[col.field];
                  return (
                    (typeof val === "string" &&
                      val.toLowerCase().includes(searchTerm)) ||
                    (typeof val === "number" &&
                      val.toString().includes(searchTerm))
                  );
                })
              );
            }
            return (
              <LivePreviewCard
                key={card.label}
                title={card.label}
                color={card.color}
                style={{ minWidth: 420, maxWidth: 520, flex: "1 1 420px" }}
              >
                {preview ? (
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
