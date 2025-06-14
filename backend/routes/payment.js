import express from "express";
import {
    beforeCreatePaymentUrl,
    createPaymentUrl,
} from "../controllers/paymentController.js";

const router = express.Router();

// Tạo URL thanh toán VNPAY
router.post("/before-create-payment", beforeCreatePaymentUrl);
router.post("/create-payment", createPaymentUrl);

export default router;
