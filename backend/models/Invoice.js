import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema(
  {
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
      required: false, // Có thể không có khuyến mãi
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true, // Tổng tiền trước khi giảm
    },
    discountAmount: {
      type: Number,
      default: 0, // Số tiền giảm nếu có khuyến mãi
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
  { timestamps: true }
);

// Thiết lập virtual để populate dữ liệu BookingDetail (thay thế cho InvoiceDetail)
InvoiceSchema.virtual('bookingDetails', {
  ref: 'BookingDetail',
  localField: 'bookingId',
  foreignField: 'bookingId',
  justOne: false,
});

// Bật virtuals khi chuyển sang JSON/object
InvoiceSchema.set('toObject', { virtuals: true });
InvoiceSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Invoice', InvoiceSchema);