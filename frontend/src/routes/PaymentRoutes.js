// routes/UserRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";

import PaymentSuccess from "pages/user/payment/PaymentSuccess";
import PaymentFailed from "pages/user/payment/PaymentFailed";

export const PaymentRoutes = () => (
  <>
    <Route index element={<PaymentSuccess />} />
    <Route path="payment-success" element={<PaymentSuccess />} />
    <Route path="payment-failed" element={<PaymentFailed />} />
  </>
);
