import React from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
