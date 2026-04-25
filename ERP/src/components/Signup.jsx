import React, { useState } from "react";
import "./Login.css";
import { authAPI } from "../services/api";

const Signup = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    // Username validation
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Register the user via API
      const response = await authAPI.register(
        formData.username,
        formData.password,
        formData.email,
        formData.firstName,
        formData.lastName,
      );

      setSuccess("Account created successfully! Redirecting to login...");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
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
      <h3 className="mb-4 text-center">Create Account</h3>
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 400 }}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="signup-username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="signup-username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="signup-email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="signup-email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="signup-password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control border-end-0"
              id="signup-password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
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

        <div className="mb-3">
          <label htmlFor="signup-confirm-password" className="form-label">
            Confirm Password
          </label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control border-end-0"
              id="signup-confirm-password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <span
              className="input-group-text bg-transparent"
              style={{ cursor: "pointer" }}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              <i
                className={`bx ${showConfirmPassword ? "bx-show" : "bx-hide"}`}
              ></i>
            </span>
          </div>
        </div>

        <div className="d-grid pt-3 mb-3">
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#ff6600", color: "#fff" }}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>

        <div className="text-center">
          <span className="text-muted">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="btn-link-custom"
            style={{
              background: "none",
              border: "none",
              color: "#ff6600",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "1rem",
              padding: 0,
            }}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
