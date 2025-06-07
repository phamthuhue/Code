// routes/vnpayIpnRoute.js
import express from "express";
import { vnpayIpnHandler } from "../controllers/paymentController.js";

const router = express.Router();

router.get("/vnpay-ipn", vnpayIpnHandler);

export default router;
