// src/layouts/AdminLayout.jsx
import AdminSideBar from "@components/AdminComponent/Sidebar";
import React from "react";

import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSideBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};
