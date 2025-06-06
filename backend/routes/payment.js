import express from "express";
import {
  createPaymentUrl,
  vnpayIpnHandler,
} from "../controllers/paymentController.js";

const router = express.Router();

// Tạo URL thanh toán VNPAY
router.post("/create-payment", createPaymentUrl);

export default router;
