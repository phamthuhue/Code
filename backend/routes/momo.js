import express from 'express';
import { createMoMoPayment } from "../controllers/momoController.js";

const router = express.Router();

router.post("/create", createMoMoPayment);

export default router;
