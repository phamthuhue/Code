import Review from "../models/Review.js"
import { updateTourAvgRating } from "../utils/updateTourAvgRating.js";

// Tạo review
export const createReview = async (req, res) => {
    try {
      const review = new Review(req.body);
      const saved = await review.save();
  
      await updateTourAvgRating(review.tour);
  
      res.status(201).json({
        success: true,
        message: "Review created",
        data: saved,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to create review" });
    }
  };
  
  // Cập nhật review
  export const updateReview = async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!review) return res.status(404).json({ success: false, message: "Review not found" });
  
      await updateTourAvgRating(review.tour);
  
      res.status(200).json({
        success: true,
        message: "Review updated",
        data: review,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to update review" });
    }
  };
  
  // Xóa review
  export const deleteReview = async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) return res.status(404).json({ success: false, message: "Review not found" });
  
      await updateTourAvgRating(review.tour);
  
      res.status(200).json({ success: true, message: "Review deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to delete review" });
    }
  };
  
  // Lấy 1 review
  export const getReview = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ success: false, message: "Review not found" });
  
      res.status(200).json({ success: true, data: review });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error fetching review" });
    }
  };
  
  // Lấy tất cả review
  export const getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find().populate("tour", "title");
      res.status(200).json({ success: true, data: reviews });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error fetching reviews" });
    }
  };

  // Lấy tất cả review theo tour
  export const getReviewsByTour = async (req, res) => {
    try {
      const { tourId } = req.params;
      const reviews = await Review.find({ tour: tourId }).sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch reviews for the tour",
      });
    }
  };
  