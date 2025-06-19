import express from "express";
import {
  getDashboardCount
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get("/count", getDashboardCount);

export default router;