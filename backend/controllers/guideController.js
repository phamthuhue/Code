import Guide from "../models/Guide.js";
import GuideReview from "../models/GuideReview.js";

// Tạo mới hướng dẫn viên
export const createGuide = async (req, res) => {
  try {
    const { name, photo, bio, tours } = req.body;

    const newGuide = new Guide({ name, photo, bio, tours });
    await newGuide.save();

    res.status(201).json({ success: true, message: "Guide created", data: newGuide });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create guide" });
  }
};

// Lấy danh sách tất cả hướng dẫn viên
export const getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find().populate("tours", "title");
    res.status(200).json({ success: true, data: guides });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch guides" });
  }
};

// Lấy chi tiết một hướng dẫn viên
export const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id).populate("tours", "title");
    if (!guide) {
      return res.status(404).json({ success: false, message: "Guide not found" });
    }
    res.status(200).json({ success: true, data: guide });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch guide" });
  }
};

// Gửi đánh giá cho hướng dẫn viên
export const createGuideReview = async (req, res) => {
  try {
    const { guideId, rating, comment } = req.body;
    const userId = req.user.id; // cần middleware xác thực

    const newReview = new GuideReview({ guideId, userId, rating, comment });
    await newReview.save();

    res.status(201).json({ success: true, message: "Review submitted", data: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to submit review" });
  }
};

// Lấy tất cả đánh giá theo hướng dẫn viên
export const getGuideReviews = async (req, res) => {
  try {
    const guideId = req.params.guideId;
    const reviews = await GuideReview.find({ guideId }).populate("userId", "username");

    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};
