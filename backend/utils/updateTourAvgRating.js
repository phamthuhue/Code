import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

export const updateTourAvgRating = async (tourId) => {
  const reviews = await Review.find({ tour: tourId });

  if (reviews.length === 0) {
    await Tour.findByIdAndUpdate(tourId, { avgRating: 0 });
    return;
  }

  const total = reviews.reduce((sum, review) => sum + review.ratingTour, 0);
  const avg = total / reviews.length;

  await Tour.findByIdAndUpdate(tourId, { avgRating: avg.toFixed(1) });
};
