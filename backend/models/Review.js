import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    name: { type: String, required: true },
    
    ratingTour: { type: Number, required: true, min: 0, max: 5 },
    reviewText: { type: String, required: true },
    
  },
  { timestamps: true } // Thêm createdAt, updatedAt tự động
);

export default mongoose.model("Review", reviewSchema, "reviews");
