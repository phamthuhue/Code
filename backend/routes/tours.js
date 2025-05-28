import express from "express";
import {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getTourBySearch,
  getTourCount,
} from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Route cụ thể đặt trước
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getTourCount", getTourCount);

// Route chung
router.get("/", getAllTours);
router.get("/:id", getSingleTour);

// Route cần quyền admin
router.post("/", createTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

export default router;
