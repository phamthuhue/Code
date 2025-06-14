import Tour from "../models/Tour.js";
import fs from "fs";
import path from "path";
import Itinerary from "../models/Itinerary.js";
import TourService from "../models/TourService.js";
import BookingDetail from "../models/BookingDetail.js";
import BookingCancellation from "../models/BookingCancellation.js";
import Invoice from "../models/Invoice.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import GroupTourRequest from "../models/GroupTourRequest.js";

//create new tour
// [POST] /api/tours
export const createTour = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            // req.files là mảng các file đã upload
            // Lấy đường dẫn tất cả file ảnh, chuyển dấu \ thành /
            req.body.photos = req.files.map((file) =>
                file.path.replace(/\\/g, "/")
            );

            // Nếu muốn lưu kèm domain URL
            // req.body.photo = req.files.map(file => `${process.env.BASE_URL}/${file.path.replace(/\\/g, "/")}`);
        }
        console.log("req.body: ", req.body);
        const newTour = new Tour(req.body);
        const savedTour = await newTour.save();
        res.status(201).json(savedTour);
    } catch (error) {
        res.status(500).json({
            message: "Tạo tour thất bại",
            error: error.message,
        });
    }
};

//update tour
// [PUT] /api/tours/:id
export const updateTour = async (req, res) => {
    try {
        const tourId = req.params.id;
        const tour = await Tour.findById(tourId);
        if (!tour)
            return res
                .status(404)
                .json({ message: "Không tìm thấy tour để cập nhật" });
        // 1. Xử lý ảnh bị xóa
        const removedPhotos = Array.isArray(req.body.removedPhotos)
            ? req.body.removedPhotos
            : [req.body.removedPhotos];

        removedPhotos.forEach((relativePath) => {
            if (
                typeof relativePath === "string" &&
                relativePath.trim() !== ""
            ) {
                const fullPath = path.join(
                    process.cwd(),
                    path.normalize(relativePath)
                );
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }
        });
        // Lọc danh sách ảnh còn giữ lại = ảnh cũ - ảnh bị xóa
        const remainingPhotos = tour.photos.filter(
            (photo) => !removedPhotos.includes(photo)
        );
        // 2. Xử lý ảnh mới được upload
        const newPhotos = req.files.map((file) => file.path); // array of uploaded file paths
        // 3. Cập nhật các field khác
        const updateData = {
            ...req.body,
            photos: [...remainingPhotos, ...newPhotos],
            price: req.body.price ? Number(req.body.price) : tour.price,
            maxGroupSize: req.body.maxGroupSize
                ? Number(req.body.maxGroupSize)
                : tour.maxGroupSize,
            featured: req.body.featured === "true",
            startDate: req.body.startDate
                ? new Date(req.body.startDate)
                : tour.startDate,
            endDate: req.body.endDate
                ? new Date(req.body.endDate)
                : tour.endDate,
        };

        const updatedTour = await Tour.findByIdAndUpdate(tourId, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(500).json({
            message: "Cập nhật tour thất bại",
            error: error.message,
        });
    }
};

//delete tour
// [DELETE] /api/tours/:id
export const deleteTour = async (req, res) => {
    try {
        const tourId = req.params.id;
        // Tìm tour theo id trước
        const tour = await Tour.findById(req.params.id);
        if (!tour)
            return res
                .status(404)
                .json({ message: "Không tìm thấy tour để xóa" });

        // Nếu có ảnh, xóa file ảnh trên server
        // Nếu có nhiều ảnh, xóa từng file ảnh trên server
        if (tour.photos && Array.isArray(tour.photos)) {
            tour.photos.forEach((photoPath) => {
                const filePath = path.join(process.cwd(), photoPath);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Đã xóa file ảnh: ${filePath}`);
                } else {
                    console.log(`File ảnh không tồn tại: ${filePath}`);
                }
            });
        }
        // 3. Lấy danh liên quan đến tour
        const bookings = await Booking.find({ tourId }); // tourId là id của tour sắp xóa
        const bookingsIdList = bookings.map((b) => b._id); // Lấy ra mảng các _id booking
        // Xóa Booking & các bản ghi liên quan
        await BookingDetail.deleteMany({ bookingId: { $in: bookingsIdList } });
        await BookingCancellation.deleteMany({
            bookingId: { $in: bookingsIdList },
        });
        await Invoice.deleteMany({ bookingId: { $in: bookingsIdList } });
        await Booking.deleteMany({ tourId });

        // Xóa Itinerary
        await Itinerary.deleteMany({ tourId });

        // Xóa TourService
        await TourService.deleteMany({ tourId });

        // Xóa Review
        await Review.deleteMany({ tourId });

        // Xóa GroupTourRequest nếu có trường tourId
        await GroupTourRequest.deleteMany({ tourId });

        // Xóa tour trong database
        await Tour.findByIdAndDelete(tourId);

        res.status(200).json({ message: "Xóa tour thành công" });
    } catch (error) {
        res.status(500).json({
            message: "Xóa tour thất bại",
            error: error.message,
        });
    }
};

// Lấy 1 tour cụ thể, có kèm thông tin guide
export const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate("guideId"); // populate hướng dẫn viên
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy tour",
            });
        }
        res.status(200).json({
            success: true,
            message: "Tìm thấy tour thành công",
            data: tour,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
};

// Lấy tất cả tour, có kèm thông tin guide
export const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({}).populate("guideId");
        res.status(200).json({
            success: true,
            message: "Thành công",
            data: tours,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Không tìm thấy tour nào",
        });
    }
};
export const getToursWithoutItinerary = async (req, res) => {
    try {
        // Lấy danh sách tourId đã có lịch trình
        const tourIdsWithItinerary = await Itinerary.distinct("tourId");

        // Lấy các tour KHÔNG có trong danh sách trên
        const toursWithoutItinerary = await Tour.find({
            _id: { $nin: tourIdsWithItinerary },
        });

        res.json(toursWithoutItinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getToursWithoutService = async (req, res) => {
    try {
        // Lấy danh sách tourId đã có dịch vụ
        const tourIdsWithService = await TourService.distinct("tourId");

        // Lấy các tour KHÔNG có trong danh sách trên
        const toursWithoutService = await Tour.find({
            _id: { $nin: tourIdsWithService },
        });

        res.json(toursWithoutService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Tìm kiếm tour theo city và maxGroupSize, có kèm guide
export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, "i");
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour.find({
            city,
            maxGroupSize: { $gte: maxGroupSize },
        }).populate("guideId");
        res.status(200).json({
            success: true,
            message: "Tìm kiếm thành công",
            data: tours,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Không tìm thấy tour",
        });
    }
};

// Lấy tổng số tour
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success: true,
            message: "Thành công",
            data: tourCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Không thể đếm số lượng tour",
        });
    }
};

export const getTourBySearchClient = async (req, res) => {
  try {
    const { city, price, groupSize } = req.query

    const filters = {}

    // Tìm gần đúng theo tên thành phố (không phân biệt hoa thường)
    if (city) {
      filters.city = { $regex: city, $options: 'i' }
    }

    // Giá tour phải nhỏ hơn hoặc bằng giá được nhập
    if (price) {
      filters.price = { $lte: Number(price) }
    }

    // Tour có thể nhận đủ số lượng người
    if (groupSize) {
      filters.maxGroupSize = { $gte: Number(groupSize) }
    }

    const tours = await Tour.find(filters)

    res.status(200).json({
      success: true,
      data: tours,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi tìm kiếm tour',
    })
  }
}
