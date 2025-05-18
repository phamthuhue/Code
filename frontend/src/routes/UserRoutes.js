// routes/UserRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
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
  </>
);
