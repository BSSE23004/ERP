import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
