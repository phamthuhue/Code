import Booking from "../models/Booking.js";
import BookingDetail from "../models/BookingDetail.js";
import Invoice from "../models/Invoice.js";
import Promotion from "../models/Promotion.js";
import Tour from "../models/Tour.js";
import TourService from "../models/TourService.js";
import BookingCancellation from "../models/BookingCancellation.js";
import Review from "../models/Review.js";
// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      tourId,
      userId,
      numberOfPeople,
      totalPrice,
      status,
      promotionId,
      bookingDetails,
    } = req.body;
    if (promotionId) {
      const promotion = await Promotion.findById(promotionId);
      if (!promotion) throw new Error("Promotion không tồn tại");
    }
    const tour = await Tour.findById(tourId); // lấy giá tour chính
    // 1. Tạo booking chính
    const newBooking = await Booking.create({
      name,
      phone,
      tourId,
      userId,
      numberOfPeople,
      totalPrice,
      status,
      promotionId,
      startDate: tour.startDate,
    });

    // 2. Tạo dòng BookingDetail cho chính Tour đã đặt
    const bookingDetailTour = {
      bookingId: newBooking._id,
      itemType: "Tour",
      description: tour.title,
      quantity: Number(numberOfPeople),
      unitPrice: tour.price,
      totalPrice: tour.price * Number(numberOfPeople),
    };

    // 3. Mapping các dịch vụ kèm theo (nếu có)
    const bookingDetailServices = (bookingDetails || []).map((item) => ({
      bookingId: newBooking._id,
      tourServiceId: item.tourServiceId || null,
      itemType: "Service",
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    }));

    // 4. Gộp lại và lưu BookingDetail
    await BookingDetail.insertMany([
      bookingDetailTour,
      ...bookingDetailServices,
    ]);
    const invoiceData = {
      bookingId: newBooking._id,
      userId: newBooking.userId, // Giả sử bạn đã có `userId` trong `booking`
      totalAmount: totalPrice, // Tổng tiền cần thanh toán
      promotionId: promotionId, // Giả sử chưa có khuyến mãi

      finalAmount: totalPrice, // Giá cuối cùng sau giảm giá (nếu có)
      paymentStatus: "Chưa thanh toán", // Trạng thái thanh toán ban đầu
    };
    if (promotionId) {
      const promotion = await Promotion.findById(promotionId);
      if (!promotion) throw new Error("Promotion không tồn tại");
      invoiceData.discountAmount = promotion.discountValue;
    } else {
      invoiceData.discountAmount = 0;
    }
    // Tạo Invoice cho việc thanh toán
    const invoice = new Invoice(invoiceData);

    const savedInvoice = await invoice.save();
    // Trừ số lượng trong Tour

    if (tour) {
      tour.maxGroupSize -= newBooking.numberOfPeople;
      await tour.save();
    }

    // Trừ số lượng dịch vụ trong TourService
    const tourService = await TourService.findOne({
      tourId: newBooking.tourId,
    });

    if (tourService) {
      const bookingDetailsInDB = await BookingDetail.find({
        bookingId: newBooking._id,
      });

      for (const detail of bookingDetailsInDB) {
        if (detail.itemType === "Service") {
          const service = tourService.services.find(
            (s) => s._id.toString() === detail.tourServiceId.toString()
          );
          console.log("service: ", service);
          if (service) {
            service.numberOfPeopl -= detail.quantity;
          }
        }
      }

      await tourService.save();
    }

    return res.status(201).json({
      success: true,
      message: "Đặt tour thành công!",
      bookingId: newBooking._id,
      savedInvoice,
    });
  } catch (error) {
    console.error("Lỗi khi tạo booking:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server khi tạo booking",
      error: error.message,
    });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone,
      numberOfPeople,
      status,
      promotionId,
      bookingDetails = [],
    } = req.body;

    const booking = await Booking.findById(id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking không tồn tại" });

    const tour = await Tour.findById(booking.tourId);
    const tourService = await TourService.findOne({ tourId: booking.tourId });

    if (!tour || !tourService) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Tour hoặc TourService không tồn tại",
        });
    }

    // 1. Cập nhật lại maxGroupSize nếu thay đổi số lượng người
    const deltaPeople = numberOfPeople - booking.numberOfPeople;
    tour.maxGroupSize -= deltaPeople;
    await tour.save();

    // 2. Lấy BookingDetail hiện tại từ DB
    const existingDetails = await BookingDetail.find({
      bookingId: id,
      itemType: "Service",
    });

    const existingMap = new Map(
      existingDetails.map((d) => [d._id.toString(), d])
    );

    // 3. Phân loại bookingDetails mới
    const toUpdate = [];
    const toInsert = [];
    const incomingIds = [];

    for (const detail of bookingDetails) {
      if (detail._id && existingMap.has(detail._id)) {
        // Cập nhật số lượng
        const old = existingMap.get(detail._id);
        const deltaQty = detail.quantity - old.quantity;

        const service = tourService.services.find(
          (s) => s._id.toString() === detail.tourServiceId.toString()
        );
        if (service) {
          service.numberOfPeopl -= deltaQty;
        }

        toUpdate.push({
          updateOne: {
            filter: { _id: detail._id },
            update: {
              $set: {
                quantity: detail.quantity,
                totalPrice: detail.unitPrice * detail.quantity,
              },
            },
          },
        });

        incomingIds.push(detail._id);
        existingMap.delete(detail._id);
      } else {
        // Thêm mới
        const service = tourService.services.find(
          (s) => s._id.toString() === detail.tourServiceId.toString()
        );
        if (service) {
          service.numberOfPeopl -= detail.quantity;
        }

        toInsert.push({
          bookingId: id,
          tourServiceId: detail.tourServiceId,
          itemType: "Service",
          description: detail.description,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          totalPrice: detail.unitPrice * detail.quantity,
        });
      }
    }

    // 4. Những cái còn lại trong existingMap là bị xóa
    for (const deleted of existingMap.values()) {
      const service = tourService.services.find(
        (s) => s._id.toString() === deleted.tourServiceId.toString()
      );
      if (service) {
        service.numberOfPeopl += deleted.quantity;
      }

      await BookingDetail.findByIdAndDelete(deleted._id);
    }

    // 5. Áp dụng update và insert
    if (toUpdate.length) {
      await BookingDetail.bulkWrite(toUpdate);
    }

    if (toInsert.length) {
      await BookingDetail.insertMany(toInsert);
    }

    await tourService.save();

    // 6. Cập nhật booking
    booking.name = name;
    booking.phone = phone;
    booking.numberOfPeople = numberOfPeople;
    booking.status = status;
    booking.promotionId = promotionId;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Cập nhật booking thành công!",
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật booking:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server khi cập nhật booking",
      error: error.message,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking không tồn tại" });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái booking thành công",
      data: updatedBooking,
    });
  } catch (err) {
    console.error("Lỗi cập nhật trạng thái:", err);
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};

// Controller: deleteBooking
export const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID không hợp lệ.",
      });
    }

    // 1. Xoá các bản ghi liên quan
    await BookingDetail.deleteMany({ bookingId });
    await BookingCancellation.deleteMany({ bookingId });
    await Invoice.deleteMany({ bookingId });
    await Review.deleteMany({ bookingId });
    // 2. Xóa Booking chính
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking không tồn tại!",
      });
    }
    // 2. Lấy danh sách BookingDetail liên quan
    const bookingDetails = await BookingDetail.find({ bookingId: id });

    // 3. Cộng lại số lượng Tour (maxGroupSize)
    const tour = await Tour.findById(booking.tourId);
    if (tour) {
      tour.maxGroupSize += booking.numberOfPeople;
      await tour.save();
    }
    // 4. Cộng lại số lượng dịch vụ trong TourService
    const tourService = await TourService.findOne({ tourId: booking.tourId });
    if (tourService) {
      for (const detail of bookingDetails) {
        if (detail.itemType === "Service") {
          const service = tourService.services.find(
            (s) => s._id.toString() === detail.tourServiceId?.toString()
          );
          if (service) {
            service.numberOfPeopl += detail.quantity;
          }
        }
      }
      await tourService.save();
    }
    // 5. Xóa BookingDetail
    await BookingDetail.deleteMany({ bookingId: id });

    // 6. Xóa Booking chính
    await Booking.findByIdAndDelete(id);
    // 7. (Optional) Xóa hóa đơn nếu có
    await Invoice.deleteOne({ bookingId: id });

    return res.status(200).json({
      success: true,
      message: "Đã xóa booking và khôi phục số lượng thành công.",
    });
  } catch (error) {
    console.error("Lỗi khi xóa booking:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server khi xóa booking.",
      error: error.message,
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
    const bookings = await Booking.find()
      .populate("tourId")
      .populate("userId", "username email")
      .populate("promotionId");
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
    const booking = await Booking.findById(bookingId);

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

// Xác nhận nhiều booking
export const confirmMultipleBookings = async (req, res) => {
  try {
    const { bookingIds } = req.body;

    if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Danh sách booking không hợp lệ.",
      });
    }

    const result = await Booking.updateMany(
      { _id: { $in: bookingIds } },
      { $set: { status: "Xác nhận" } }
    );

    res.status(200).json({
      success: true,
      message: `Đã xác nhận ${result.modifiedCount} booking.`,
      result,
    });
  } catch (error) {
    console.error("Lỗi xác nhận booking:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xác nhận booking.",
      error: error.message,
    });
  }
};
