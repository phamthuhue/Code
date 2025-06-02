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
import PaymentSuccess from "pages/user/payment/PaymentSuccess";
import PaymentFailed from "pages/user/payment/PaymentFailed";

export const UserRoutes = () => (
  <>
    <Route index element={<Home />} />
    <Route path="home" element={<Home />} />
    <Route path="tours" element={<Tours />} />
    <Route path="tours/:id" element={<TourDetails />} />
    <Route path="tours/search" element={<SearchResultList />} />
    <Route path="history" element={<History />} />
    <Route path="group-tour-request" element={<GroupTourRequest />} />
    <Route path="payment" element={<Payment />} />
    <Route path="payment-success" element={<PaymentSuccess />} />
    <Route path="payment-failed" element={<PaymentFailed />} />
  </>
);
