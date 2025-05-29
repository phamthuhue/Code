import mongoose from 'mongoose';

const BookingCancellationSchema = new mongoose.Schema({
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
    cancelReason: {
        type: String,
        default: '',
    },
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: false,
    },
    status: {
        type: String,
        enum: ['Đang xử lý', 'Đã hoàn', 'Hủy'],
        default: 'Đang xử lý',
    },
    refundMethod: {
        type: String,
        enum: ['Chuyển khoản', 'Ví điện tử'],
        required: true,
    },

    // Dành cho chuyển khoản
    refundAccountName: {
        type: String,
    },
    refundAccountNumber: {
        type: String,
    },
    refundBankName: {
        type: String,
    },

    // Dành cho ví điện tử
    refundWalletProvider: {
        type: String, // VD: MoMo, ZaloPay, ViettelPay
    },
    refundWalletPhone: {
        type: String, // SĐT đăng ký ví
    }
}, {
    timestamps: true
});

export default mongoose.model('BookingCancellation', BookingCancellationSchema);