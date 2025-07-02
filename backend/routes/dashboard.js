import express from "express";
import {
  getDashboardCount,
  getTop5MostBookedTours,
  getTop5BookedServices,
  getTop5LeastBookedServices,
  getTop5LeastBookedTours ,
  getTopCustomersByRevenue
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get("/count", getDashboardCount);
router.get('/top-5-tours', getTop5MostBookedTours)
router.get('/top-5-services', getTop5BookedServices)
router.get('/least-5-tours', getTop5LeastBookedTours)
router.get('/least-5-services', getTop5LeastBookedServices)
router.get('/top-customers', getTopCustomersByRevenue)

export default router;