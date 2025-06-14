import Booking from "../models/Booking.js";

// Create a new booking
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({
            success: true,
            message: "Đặt tour thành công.",
            data: savedBooking,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Lỗi hệ thống khi đặt tour.",
        });
    }
};

// Controller: updateBooking
export const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, // Lấy ID từ URL (req.params)
            { $set: req.body }, // Cập nhật toàn bộ nội dung (hoặc chọn lọc)
            { new: true } // Trả về dữ liệu mới sau khi update
        );

        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy booking để cập nhật.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Cập nhật booking thành công.",
            data: updatedBooking,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Lỗi hệ thống khi cập nhật booking.",
        });
    }
};

// Controller: deleteBooking
export const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy booking để xóa.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Xóa booking thành công.",
            data: deletedBooking,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Lỗi hệ thống khi xóa booking.",
        });
    }
};

// Get single booking by ID
export const getBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Booking.findById(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy thông tin đặt tour.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Lấy thông tin đặt tour thành công.",
            data: book,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Lỗi hệ thống khi lấy thông tin đặt tour.",
        });
    }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("tourId", "title");
        res.status(200).json({
            success: true,
            message: "Lấy danh sách đặt tour thành công.",
            data: bookings,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Lỗi hệ thống khi lấy danh sách đặt tour.",
        });
    }
};

// Get all bookings by user ID
export const getBookingsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Gán mặc định nếu không có page/limit
        const page =
            parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
        const limit =
            parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 5;
        const skip = (page - 1) * limit;

        const total = await Booking.countDocuments({ userId });

        const bookings = await Booking.find({ userId })
            .skip(skip)
            .limit(limit)
            .populate("tourId", "title photos guideId")
            .populate("userId", "username");

        res.status(200).json({
            success: true,
            message: "Lấy lịch sử đặt tour theo người dùng thành công.",
            data: bookings,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (err) {
        console.error("Lỗi getBookingsByUser:", err);
        res.status(500).json({
            success: false,
            message: "Lỗi hệ thống khi lấy lịch sử đặt tour.",
        });
    }
};

export const getBookingWithDetails = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId)
            .populate({
                path: "bookingDetails",
                populate: { path: "serviceId" }, // nếu BookingDetail có serviceId
            })
            .populate("tourId") // Lấy thông tin tour
            .populate("userId", "name email"); // Lấy name và email của user

        if (!booking) {
            return res.status(404).json({ message: "Booking không tồn tại" });
        }

        return res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy booking.",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Lỗi khi lấy booking:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi server khi lấy booking.",
    });
  }
};
