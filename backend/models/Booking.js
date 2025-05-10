import mongoose from 'mongoose';

// Tạo schema cho Booking
const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Người đặt
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },  // Tour được đặt
    numberOfPeople: { type: Number, required: true },  // Số lượng người
    totalPrice: { type: Number, required: true },  // Tổng giá
    status: { type: String, enum: ['Đang xử lý', 'Xác nhận', 'Hủy'], default: 'Đang xử lý' },  // Trạng thái booking
  },
  { timestamps: true }  // Tạo tự động các trường createdAt, updatedAt
);

// Tạo model từ schema
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
