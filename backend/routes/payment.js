import express from "express";
import { createPaymentUrl } from "../controllers/paymentController.js";

const router = express.Router();

// Tạo URL thanh toán VNPAY
router.post("/create-payment", createPaymentUrl);

// Xử lý khi VNPAY redirect về (sau khi thanh toán)
// router.get("/vnpay-return", vnpayReturnHandler); // returnUrl trong VNPAY sẽ gọi vào đây

export default router;
