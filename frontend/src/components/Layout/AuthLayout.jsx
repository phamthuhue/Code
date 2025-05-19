import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Routers } from "../../routes/Routers";
import { useLocation } from "react-router-dom";

export const AuthLayout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register";

  return (
    <>
      {!isAuthPage && <Header />}
      <Routers />
    </>
  );
};
