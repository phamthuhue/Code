import express from "express";
import {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getTourBySearch,
  getTourCount,
  getToursWithoutItinerary,
  getToursWithoutService,
  getTourBySearchClient
} from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Route cụ thể đặt trước
router.get("/search/getTourBySearch", getTourBySearchClient);
router.get("/search/getTourCount", getTourCount);

// Route chung
router.get("/", getAllTours);
router.get("/without-itinerary", getToursWithoutItinerary);
router.get("/without-service", getToursWithoutService);
router.get("/:id", getSingleTour);

// Route cần quyền admin
const maxCount = 5; // Giới hạn số lượng ảnh tải lên
router.post("/", upload.array("photos", maxCount), createTour);
router.put("/:id", upload.array("photos", maxCount), updateTour);

router.delete("/:id", deleteTour);

export default router;
