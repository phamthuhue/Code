import express from "express";
import {
  getDashboardCount,
  getTop5MostBookedTours,
  getTop5BookedServices 
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get("/count", getDashboardCount);
router.get('/top-5-tours', getTop5MostBookedTours)
router.get('/top-5-services', getTop5BookedServices)

export default router;