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
    const bookings = await Booking.find();
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
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 5;
    const skip = (page - 1) * limit;

    const total = await Booking.countDocuments({ userId });

    const bookings = await Booking.find({ userId })
      .skip(skip)
      .limit(limit)
      .populate('tourId', 'title photo guideId')
      .populate('userId', 'username');

    res.status(200).json({
      success: true,
      message: "Lấy lịch sử đặt tour theo người dùng thành công.",
      data: bookings,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Lỗi getBookingsByUser:', err);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống khi lấy lịch sử đặt tour.",
    });
  }
};
