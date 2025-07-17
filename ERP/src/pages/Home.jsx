import React, { useEffect, useState } from "react";
import AppNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DashboardCards from "../components/DashboardCards";
function Home() {
  const handleSearch = (val) => {
    // Navigate or filter based on `val`
    console.log("Search:", val);
  };
  useEffect(() => {
    const setFavicon = (url) => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = url;
    };
    setFavicon("https://demo.algosofttech.com/admin/assets/img/fav-icon.png");
    return () => {
      setFavicon(
        "https://demo.algosofttech.com/admin/assets/img/logo-small.png"
      );
    };
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
      </div>
    </div>
  );
}
export default Home;
