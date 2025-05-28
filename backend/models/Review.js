import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratingTour: { type: Number, required: true, min: 0, max: 5 },
    commentTour: { type: String, default: '' },
    ratingGuide: { type: Number, required: true, min: 0, max: 5 },
    commentGuide: { type: String, default: '' },

    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    guideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true },
    bookingId: { type: mongoose.Schema.ObjectId, ref: 'Booking' , required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
