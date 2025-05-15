import mongoose from 'mongoose';

const BookingCancellationSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
        unique: true, // Một booking chỉ được hủy 1 lần
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cancelReason: {
        type: String,
        default: '',
    },
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice', // Tham chiếu đến hóa đơn hoàn tiền
        required: false, // Có thể chưa tạo hóa đơn ngay
    },
    status: {
        type: String,
        enum: ['Đang xử lý', 'Xác nhận', 'Hủy'],
        default: 'Đang xử lý',
        },
    },
    { timestamps: true }
);

export default mongoose.model('BookingCancellation', BookingCancellationSchema);
