import Review from "../models/Review.js";
import mongoose from "mongoose";

export const seedReviews = async (tourId, guideId) => {
  await Review.deleteMany({});
  const review = await Review.create({
    userId: new mongoose.Types.ObjectId(), // tạm thời dùng ID giả
    tourId,
    guideId,
    ratingTour: 5,
    commentTour: "Tuyệt vời!",
    ratingGuide: 4,
    commentGuide: "Hướng dẫn viên rất dễ thương",
  });
  console.log("✅ Seeded Reviews");
  return review;
};
