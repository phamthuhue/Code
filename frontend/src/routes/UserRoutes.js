// routes/UserRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import { TourDetails } from "pages/user/TourDetails";
import { SearchResultList } from "pages/user/SearchResultList";
import { Home } from "pages/Home";
import { Tours } from "pages/user/Tours";
import { History } from "pages/user/History";
import { GroupTourRequest } from "pages/user/GroupTourRequest";
import { Payment } from "pages/user/payment/Payment";
export const UserRoutes = () => (
  <>
    <Route index element={<Home />} />
    <Route path="home" element={<Home />} />
    <Route path="tours" element={<Tours />} />
    <Route path="tours/:id" element={<TourDetails />} />
    <Route path="tours/search" element={<SearchResultList />} />
    <Route path="history" element={<History />} />
    <Route path="group-tour-request" element={<GroupTourRequest />} />
    <Route path="/payment/:bookingId?" element={<Payment />} />
  </>
);
