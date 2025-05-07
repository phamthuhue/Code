// models/GuideReview.js
import mongoose from "mongoose";

const guideReviewSchema = new mongoose.Schema({
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: "tourGuides", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("GuideReview", guideReviewSchema);
