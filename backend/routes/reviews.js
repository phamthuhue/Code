import express from "express";
import {
    createReview,
    getAllReviews,
    getReviewsByTour,
    getReviewsByGuide,
    updateReview,
    deleteReview
  } from '../controllers/reviewController.js';
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyUser, createReview)
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.get("/", getAllReviews);
router.get("/tour/:tourId", getReviewsByTour);
router.get('/guide/:guideId', getReviewsByGuide);


export default router;