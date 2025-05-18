import React from "react";
import { Routes, Route } from "react-router-dom";

import { UserLayout } from "@components/Layout/UserLayout";
import { UserRoutes } from "./UserRoutes";
import { AdminLayout } from "@components/Layout/AdminLayout";
import { AdminRoutes } from "./AdminRoutes";
import { NotFound } from "pages/NotFound";
import { RequireAdmin } from "@utils/RequireAdmin";

export const Routers = () => {
  return (
    <Routes>
      {/* USER */}
      <Route path="/" element={<UserLayout />}>
        {UserRoutes()}
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        {AdminRoutes()}
      </Route>

      {/* NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
