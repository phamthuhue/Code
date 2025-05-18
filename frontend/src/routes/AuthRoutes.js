// routes/AdminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import { Login } from "pages/auth/Login";
import { Register } from "pages/Register";
import { ForgotPassword } from "pages/auth/ForgotPassword";
import { ResetPassword } from "pages/auth/ResetPassword";
export const AuthRoutes = () => (
  // Các route auth bên dưới là các route không cần bảo vệ
  // luôn bắt đầu bằng /auth
  // ví dụ /auth/login
  <>
    <Route index element={<Login />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password/:token" element={<ResetPassword />} />
  </>
);
