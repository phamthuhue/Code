import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Tours } from "../pages/Tours";
import { TourDetails } from "../pages/TourDetails";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { SearchResultList } from "../pages/SearchResultList";
import { AdminTour } from "../pages/AdminTour";
import { ForgotPassword } from "pages/ForgotPassword";
import { ResetPassword } from "pages/ResetPassword";
import { NotFound } from "pages/NotFound";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/tours" element={<AdminTour />} />


      {/* Route not found phải nằm cuối */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
