// controllers/bookingCancellationController.js
import BookingCancellation from "../models/BookingCancellation.js";
import Booking from "../models/Booking.js";
import Invoice from "../models/Invoice.js";
import mongoose from "mongoose";

export const createBookingCancellation = async (req, res) => {
  try {
    const {
      bookingId,
      userId,
      cancelReason,
      refundMethod,
      refundAccountName,
      refundAccountNumber,
      refundBankName,
      refundWalletProvider,
      refundWalletPhone,
    } = req.body;

    // Kiểm tra thông tin phương thức hoàn tiền
    if (refundMethod === "Ví điện tử") {
      if (!refundWalletPhone || !refundWalletProvider) {
        return res
          .status(400)
          .json({ error: "Vui lòng cung cấp thông tin ví điện tử." });
      }
    }

    if (refundMethod === "Chuyển khoản") {
      if (!refundAccountName || !refundAccountNumber || !refundBankName) {
        return res.status(400).json({
          error: "Vui lòng cung cấp đầy đủ thông tin tài khoản ngân hàng.",
        });
      }
    }

    const cancellation = new BookingCancellation({
      bookingId,
      userId,
      cancelReason,
      refundMethod,
      refundAccountName,
      refundAccountNumber,
      refundBankName,
      refundWalletProvider,
      refundWalletPhone,
    });

    await cancellation.save();

    // Cập nhật trạng thái booking
    await Booking.updateOne({ _id: bookingId }, { status: "Chờ hủy" });

    res
      .status(201)
      .json({ message: "Yêu cầu hủy tour đã được gửi.", cancellation });
  } catch (error) {
    console.error("Lỗi khi tạo yêu cầu hủy:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings
export const getCancellationBookings = async (req, res) => {
  try {
    const cancellationBookings = await BookingCancellation.find()
      .populate("userId", "username email")
      .populate("bookingId");
    res.status(200).json({
      success: true,
      message: "Lấy danh sách hủy đặt tour thành công.",
      data: cancellationBookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống khi lấy danh sách hủy đặt tour.",
    });
  }
};

// ✅ Hàm cập nhật yêu cầu hủy
export const updateBookingCancellation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    console.log("Dữ liệu updatedData:", updatedData);

    const cancellation = await BookingCancellation.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!cancellation) {
      return res.status(404).json({ error: "Không tìm thấy yêu cầu hủy." });
    }

    console.log("Dữ liệu sau khi cập nhật:", cancellation);

    res
      .status(200)
      .json({ message: "Cập nhật yêu cầu hủy thành công.", cancellation });
  } catch (error) {
    console.error("Lỗi khi cập nhật yêu cầu hủy:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Hàm xóa yêu cầu hủy
export const deleteBookingCancellation = async (req, res) => {
  try {
    const { id } = req.params;

    const cancellation = await BookingCancellation.findByIdAndDelete(id);

    if (!cancellation) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy yêu cầu hủy để xóa." });
    }

    // Cập nhật lại trạng thái booking nếu cần (tùy yêu cầu logic của bạn)
    // Ví dụ: nếu vẫn muốn cho phép quay lại trạng thái ban đầu:
    await Booking.updateOne(
      { _id: cancellation.bookingId },
      { status: "Chờ xác nhận" }
    );

    res.status(200).json({ message: "Xóa yêu cầu hủy thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa yêu cầu hủy:", error);
    res.status(500).json({ error: error.message });
  }
};

export const confirmMultipleBookingCancellations = async (req, res) => {
  try {
    const { bookingIds } = req.body; // Mảng bookingId được chọn
    console.log("cf_bookingIds", bookingIds);

    if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Vui lòng chọn ít nhất một phiếu hủy để xác nhận." });
    }

    // Lấy danh sách phiếu hủy theo bookingId
    const cancellations = await BookingCancellation.find({
      bookingId: { $in: bookingIds },
    });

    for (const cancellation of cancellations) {
      const bookingId = cancellation.bookingId;

      // ✅ 1. Cập nhật trạng thái phiếu hủy sang "Đã hoàn"
      await BookingCancellation.updateOne(
        { _id: cancellation._id },
        { status: "Đã hoàn" }
      );

      // ✅ 2. Cập nhật trạng thái booking sang "Đã hủy"
      await Booking.updateOne({ _id: bookingId }, { status: "Đã hủy" });

      // ✅ 3. Cập nhật hóa đơn liên quan sang "Đã hoàn tiền"
      await Invoice.updateMany(
        { bookingId: bookingId },
        { status: "Đã hoàn tiền" }
      );
    }

    res
      .status(200)
      .json({ message: "Xác nhận hoàn tiền cho các phiếu hủy thành công." });
  } catch (error) {
    console.error("Lỗi khi xác nhận phiếu hủy:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình xác nhận." });
  }
};

export const rejectMultipleBookingCancellations = async (req, res) => {
  try {
    const { ObjectId } = mongoose.Types;
    const rawIds = req.body.selectedCancellationBookingIds || [];
    console.log("rj_bookingIds", rawIds);

    if (!Array.isArray(rawIds) || rawIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Vui lòng chọn ít nhất một phiếu hủy để từ chối." });
    }
    const bookingCancellationIds = rawIds.map((id) => new ObjectId(id));

    const cancellations = await BookingCancellation.find({
      _id: { $in: bookingCancellationIds },
    });

    for (const cancellation of cancellations) {
      const bookingId = cancellation.bookingId;

      await BookingCancellation.updateOne(
        { _id: cancellation._id },
        { status: "Từ chối" }
      );

      await Booking.updateOne({ _id: bookingId }, { status: "Chờ xác nhận" });
    }

    res.status(200).json({ message: "Từ chối các phiếu hủy thành công." });
  } catch (error) {
    console.error("Lỗi khi từ chối phiếu hủy:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình từ chối." });
  }
};
