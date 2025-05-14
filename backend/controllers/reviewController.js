import Review from '../models/Review.js';

// Tạo review mới
export const createReview = async (req, res) => {
  try {
    const {
      userId,
      tourId,
      guideId,
      ratingTour,
      commentTour,
      ratingGuide,
      commentGuide,
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!tourId || !guideId || ratingTour == null || ratingGuide == null) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const newReview = new Review({
      userId,
      tourId,
      guideId,
      ratingTour,
      commentTour,
      ratingGuide,
      commentGuide,
    });

    await newReview.save();
    res.status(201).json({ success: true, message: 'Review created successfully.', data: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create review.', error: error.message });
  }
};

// Lấy tất cả review
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'username')
      .populate('tourId', 'title')
      .populate('guideId', 'name');
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.', error: error.message });
  }
};

// GET /api/reviews/tour/:tourId?page=1&limit=5
export const getReviewsByTour = async (req, res) => {
  try {
    const { tourId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalReviews = await Review.countDocuments({ tourId });
    const reviews = await Review.find({ tourId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // Mới nhất lên đầu
      .populate('userId', 'username')
      .populate('guideId', 'name');

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit),
      totalReviews,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tour reviews.',
      error: error.message,
    });
  }
};

// Lấy review theo guideId
export const getReviewsByGuide = async (req, res) => {
  try {
    const { guideId } = req.params;
    const reviews = await Review.find({ guideId })
      .populate('userId', 'username')
      .populate('tourId', 'title');
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch guide reviews.', error: error.message });
  }
};

// Sửa review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      ratingTour,
      commentTour,
      ratingGuide,
      commentGuide
    } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { ratingTour, commentTour, ratingGuide, commentGuide },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    res.status(200).json({ success: true, message: 'Review updated successfully.', data: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update review.', error: error.message });
  }
};

// Xóa review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    res.status(200).json({ success: true, message: 'Review deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete review.', error: error.message });
  }
};