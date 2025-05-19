// utils/RequireAdmin.jsx
import { AuthContext } from "context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

export const RequireAdmin = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log("user: ", user);

  if (!user || user.role.name !== "admin") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
