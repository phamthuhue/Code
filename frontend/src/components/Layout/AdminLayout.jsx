// layouts/AdminLayout.jsx
import { useAuthContext } from "context/AuthContext";
import { React } from "react";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  const { user } = useAuthContext();
  console.log("user: ", user);
  return (
    <div>
      <h2 style={{ background: "#333", color: "#fff", padding: "1rem" }}>
        Admin Dashboard
      </h2>
      <Outlet />
    </div>
  );
};
