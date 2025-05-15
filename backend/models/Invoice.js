import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  promotionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion',
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true, // Tổng tiền trước khi giảm
  },
  discountAmount: {
    type: Number,
    default: 0, // Số tiền được giảm nếu có mã khuyến mãi
  },
  finalAmount: {
    type: Number,
    required: true, // Tổng tiền thực trả = totalAmount - discountAmount
  },
  paymentStatus: {
    type: String,
    enum: ['Chưa thanh toán', 'Đã thanh toán', 'Đã hoàn tiền'],
    default: 'Chưa thanh toán',
  },
},
{ timestamps: true });

export default mongoose.model('Invoice', InvoiceSchema);
