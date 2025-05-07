import express from "express";
import {
    createReview,
    updateReview,
    deleteReview,
    getReview,
    getAllReviews,
    getReviewsByTour} from "../controllers/reviewController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyUser, createReview)
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.get("/:id", getReview);
router.get("/", getAllReviews);
router.get("/tour/:tourId", getReviewsByTour);

export default router;