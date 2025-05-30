import Tour from "../models/Tour.js";
import fs from "fs";
import path from "path";
//create new tour
// [POST] /api/tours
export const createTour = async (req, res) => {
  try {
    if (req.files && req.files.length > 0) {
      // req.files là mảng các file đã upload
      // Lấy đường dẫn tất cả file ảnh, chuyển dấu \ thành /
      req.body.photos = req.files.map((file) => file.path.replace(/\\/g, "/"));

      // Nếu muốn lưu kèm domain URL
      // req.body.photo = req.files.map(file => `${process.env.BASE_URL}/${file.path.replace(/\\/g, "/")}`);
    }
    console.log("req.body: ", req.body);
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Tạo tour thất bại", error: error.message });
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
      const fullPath = path.join(process.cwd(), path.normalize(relativePath));
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
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
      endDate: req.body.endDate ? new Date(req.body.endDate) : tour.endDate,
    };

    const updatedTour = await Tour.findByIdAndUpdate(tourId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedTour);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cập nhật tour thất bại", error: error.message });
  }
};

//delete tour
// [DELETE] /api/tours/:id
export const deleteTour = async (req, res) => {
  try {
    // Tìm tour theo id trước
    const tour = await Tour.findById(req.params.id);
    if (!tour)
      return res.status(404).json({ message: "Không tìm thấy tour để xóa" });

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
    // Xóa tour trong database
    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Xóa tour thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Xóa tour thất bại", error: error.message });
  }
};

//get single tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id);
    res.status(200).json({
      success: true,
      message: "Succesfully found",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Tour not found",
    });
  }
};

//get all tours
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({});
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

//get tour by search
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({
      city,
      maxGroupSize: { $gte: maxGroupSize },
    });
    res.status(200).json({
      success: true,
      message: "Succesfully found",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not found",
    });
  }
};

//get tour counts
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "Succesfully found",
      data: tourCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not found",
    });
  }
};
