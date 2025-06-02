import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserLayout } from "@components/Layout/UserLayout";
import { UserRoutes } from "./UserRoutes";
import { AdminLayout } from "@components/Layout/AdminLayout";
import { AdminRoutes } from "./AdminRoutes";

import { NotFound } from "pages/NotFound";
import { RequireAdmin } from "@utils/RequireAdmin";
import { AuthRoutes } from "./AuthRoutes";
import { PaymentLayout } from "@components/Layout/PaymentLayout";
import { PaymentRoutes } from "./PaymentRoutes";

export const Routers = () => {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/auth" element={<UserLayout />}>
        {AuthRoutes()}
      </Route>

      {/* USER */}
      <Route path="/" element={<UserLayout />}>
        {UserRoutes()}
      </Route>
      {/* PAYMENT CUSTOM  */}
      <Route path="/" element={<PaymentLayout />}>
        {PaymentRoutes()}
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
