import express from "express";
import {
    createReview,
    getAllReviews,
    getReviewsByTour,
    getReviewsByGuide,
    getReviewsByUser,
    updateReview,
    deleteReview
  } from '../controllers/reviewController.js';

const router = express.Router();

router.post("/", createReview)
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.get("/", getAllReviews);
router.get("/tour/:tourId", getReviewsByTour);
router.get('/user/:userId', getReviewsByUser);
router.get('/guide/:guideId', getReviewsByGuide);


export default router;