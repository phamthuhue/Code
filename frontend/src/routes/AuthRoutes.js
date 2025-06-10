// routes/AdminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import { Login } from "pages/auth/Login";

import { ForgotPassword } from "pages/auth/ForgotPassword";
import { ResetPassword } from "pages/auth/ResetPassword";
import { Register } from "pages/auth/Register";
import { ChangePassword } from "pages/auth/ChangePassword";

export const AuthRoutes = () => (
  // Các route auth bên dưới là các route không cần bảo vệ
  // luôn bắt đầu bằng /auth
  // ví dụ /auth/login
  <>
    <Route index element={<Login />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="change-password" element={<ChangePassword />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password/:token" element={<ResetPassword />} />
  </>
);
