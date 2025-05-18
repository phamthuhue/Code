// routes/UserRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ResetPassword } from "../pages/ResetPassword";
import { Tours } from "../pages/Tours";
import { TourDetails } from "../pages/TourDetails";
import { SearchResultList } from "../pages/SearchResultList";

export const UserRoutes = () => (
  <>
    <Route index element={<Home />} />
    <Route path="home" element={<Home />} />
    <Route path="tours" element={<Tours />} />
    <Route path="tours/:id" element={<TourDetails />} />
    <Route path="tours/search" element={<SearchResultList />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password/:token" element={<ResetPassword />} />
  </>
);
