import express from "express";
import {
  createGuide,
  getAllGuides,
  getGuideById,
  createGuideReview,
  getGuideReviews
} from "../controllers/guideController.js";
import { verifyUser} from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", createGuide);
router.get("/", getAllGuides);
router.get("/:id", getGuideById);

// Đánh giá guide (cần đăng nhập)
router.post("/review", verifyUser, createGuideReview);

// Lấy đánh giá theo guide
router.get("/:guideId/reviews", getGuideReviews);

export default router;
