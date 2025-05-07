import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    city: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    maxGroupSize: { type: Number, required: true },
    desc: { type: String, required: true },
    photo: { type: String },
    featured: { type: Boolean, default: false },

    // Tham chiếu đến bảng Review
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],


    // Trường lưu trung bình đánh giá (cập nhật mỗi khi có review mới)
    avgRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
