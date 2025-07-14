import React from "react";
import "./Login.css";

const Login = () => {
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
      <form
        method="POST"
        action="https://demo.algosofttech.com/loginprocess"
        className="w-100"
        style={{ maxWidth: 400 }}
      >
        <input
          type="hidden"
          name="_token"
          value="nwbVZ8u9IaJJOR3P8MJLcQBEI50TtJdPnqUbLyct"
        />
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
          <button type="submit" className="sign-in-btn btn w-100">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
