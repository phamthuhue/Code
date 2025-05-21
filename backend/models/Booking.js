import mongoose from 'mongoose';

// Tạo schema cho Booking
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Người đặt
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true, // Tour được đặt
    },
    startDate: { type: Date, required: true },
    numberOfPeople: {
      type: Number,
      required: true, // Số lượng người
    },
    totalPrice: {
      type: Number,
      required: true, // Tổng giá (tour + dịch vụ)
    },
    status: {
      type: String,
      enum: ['Đang xử lý', 'Xác nhận', 'Đã hủy'],
      default: 'Đang xử lý',
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;