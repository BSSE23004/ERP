import React from "react";
import Login from "../components/Login";
import "./UserLogin.css";

const UserLogin = () => {
  return (
    <div className="login-container d-flex flex-column flex-md-row border border-light rounded shadow overflow-hidden border-0 border-md">
      <div className="left-panel flex-fill position-relative text-white d-flex flex-column justify-content-center p-5 ">
        <h1 className="mb-0 ps-md-4 text-center text-md-start">
          Welcome to <br />
          <span className="algo-text display-2 fw-bold">ALGO ERP</span>
        </h1>
      </div>
      <Login />
    </div>
  );
};

export default UserLogin;
