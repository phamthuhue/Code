import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
export const UserLayout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register" ||
    location.pathname === "/auth/forgot-password" ||
    location.pathname.startsWith("/auth/reset-password");

  return (
    <>
      {!isAuthPage && <Header />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </>
  );
};
