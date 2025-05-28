import Review from "../models/Review.js";
import Tour from "../models/Tour.js";
import Guide from "../models/Guide.js";

/**
 * Tính trung bình rating từ một danh sách review dựa trên tên field.
 * @param {Array} reviews - Danh sách các review
 * @param {string} field - Tên field cần tính trung bình (ví dụ: 'ratingTour')
 * @returns {number} - Trung bình rating
 */
const calculateAverageRating = (reviews, field) => {
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, review) => sum + (review[field] || 0), 0);
  return +(total / reviews.length).toFixed(1); // Làm tròn 1 chữ số
};

/**
 * Cập nhật trung bình rating cho Tour
 * @param {string} tourId
 */
export const updateTourAvgRating = async (tourId) => {
  try {
    const reviews = await Review.find({ tourId });
    const avg = calculateAverageRating(reviews, "ratingTour");
    await Tour.findByIdAndUpdate(tourId, { avgRating: avg });
  } catch (err) {
    console.error("Lỗi khi cập nhật rating Tour:", err);
  }
};

/**
 * Cập nhật trung bình rating cho Guide (đã bỏ countRating)
 * @param {string} guideId
 */
export const updateGuideAvgRating = async (guideId) => {
  try {
    const reviews = await Review.find({ guideId });
    // console.log("Updating guide rating for:", guideId);
    const avg = calculateAverageRating(reviews, "ratingGuide");
    await Guide.findByIdAndUpdate(guideId, { avgRating: avg });

    // const updated = await Guide.findByIdAndUpdate(guideId, { avgRating: avg });
    // console.log("Guide updated:", updated); // Nếu null thì guide không tồn tại

  } catch (err) {
    console.error("Lỗi khi cập nhật rating Guide:", err);
  }
};