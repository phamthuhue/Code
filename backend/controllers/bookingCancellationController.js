// controllers/bookingCancellationController.js
import BookingCancellation from '../models/BookingCancellation.js';

export const createBookingCancellation = async (req, res) => {
    try {
        const {
            bookingId,
            cancelReason,
            refundMethod,
            refundAccountName,
            refundAccountNumber,
            refundBankName,
            refundWalletProvider,
            refundWalletPhone,
        } = req.body;

        // Kiểm tra thông tin phương thức hoàn tiền
        if (refundMethod === 'Ví điện tử') {
            if (!refundWalletPhone || !refundWalletProvider) {
                return res.status(400).json({ error: 'Vui lòng cung cấp thông tin ví điện tử.' });
            }
        }

        if (refundMethod === 'Chuyển khoản') {
            if (!refundAccountName || !refundAccountNumber || !refundBankName) {
                return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin tài khoản ngân hàng.' });
            }
        }

        const cancellation = new BookingCancellation({
            bookingId,
            userId: req.user._id, // lấy từ middleware xác thực đăng nhập
            cancelReason,
            refundMethod,
            refundAccountName,
            refundAccountNumber,
            refundBankName,
            refundWalletProvider,
            refundWalletPhone,
        });

        await cancellation.save();

        res.status(201).json({ message: 'Yêu cầu hủy tour đã được gửi.', cancellation });
    } catch (error) {
        console.error('Lỗi khi tạo yêu cầu hủy:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xử lý yêu cầu.' });
    }
};
