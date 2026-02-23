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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Call the login function from AuthContext which calls Django API
      await login(username, password);
      navigate("/home", { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
      setPassword(""); // Clear password on error
    } finally {
      setIsLoading(false);
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
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
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
            disabled={isLoading}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userpassword" className="form-label">
            Password
          </label>
          <div className="input-group" id="show_hide_password">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control border-end-0"
              id="userpassword"
              name="userpassword"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              autoComplete="current-password"
            />
            <span
              className="input-group-text bg-transparent"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i className={`bx ${showPassword ? "bx-show" : "bx-hide"}`}></i>
            </span>
          </div>
        </div>
        <div className="form-check form-switch mb-3">
          <input
            className="remember-me-check form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
            name="remember_me"
            defaultChecked
            disabled={isLoading}
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
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      {/* Test credentials info */}
      <div
        className="mt-4 p-3 bg-light"
        style={{ borderRadius: "5px", maxWidth: 400, fontSize: "12px" }}
      >
        <p className="mb-2 text-muted">
          <strong>Test Credentials:</strong>
        </p>
        <p className="mb-1">
          <strong>Admin:</strong> admin / admin123
        </p>
        <p>
          <strong>Demo:</strong> demo / demo123
        </p>
      </div>
    </div>
  );
};

export default Login;
