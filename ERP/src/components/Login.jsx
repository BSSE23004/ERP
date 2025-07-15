import React from "react";
import "./Login.css";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("testUser") || "{}");
    if (username === saved.userName && password === saved.password) {
      localStorage.setItem("isAuthenticated", "true");
      login();
      navigate("/home", { replace: true });
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <div className="right-panel flex-fill bg-white d-flex flex-column align-items-center justify-content-center p-5">
      <div className="logo mb-3">
        <img
          src="https://demo.algosofttech.com/admin/assets/img/login-logo.png"
          alt="ALGO ERP"
          className="img-fluid"
          style={{ height: 80 }}
        />
      </div>
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="text-danger"></span>
        </div>
        <div className="mb-3">
          <label htmlFor="userpassword" className="form-label">
            Password
          </label>
          <div className="input-group" id="show_hide_password">
            <input
              type="password"
              className="form-control border-end-0"
              id="userpassword"
              name="userpassword"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input-group-text bg-transparent">
              <i className="bx bx-hide"></i>
            </span>
          </div>
          <span className="text-danger"></span>
        </div>
        <div className="form-check form-switch mb-3">
          <input
            className="remember-me-check form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
            name="remember_me"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Remember Me
          </label>
        </div>
        <div className="d-grid pt-3">
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#ff6600", color: "#fff" }}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
