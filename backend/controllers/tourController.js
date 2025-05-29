import Tour from "../models/Tour.js";
import fs from "fs";
import path from "path";
//create new tour
// [POST] /api/tours
export const createTour = async (req, res) => {
  try {
    if (req.file) {
      // Lấy đường dẫn file ảnh, ví dụ: uploads/2025/05/29/1685312345-123.png
      req.body.photo = req.file.path.replace(/\\/g, "/"); // thay dấu \ thành / (Windows)

      // Nếu bạn muốn lưu đường dẫn đầy đủ (URL), ví dụ:
      // req.body.photo = `${process.env.BASE_URL}/${req.file.path.replace(/\\/g, "/")}`;
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
    // Xử lý xóa ảnh nếu có yêu cầu
    if (req.body.removePhoto === "true") {
      if (tour.photo) {
        const oldPhotoPath = path.join(process.cwd(), tour.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      req.body.photo = null; // hoặc null tùy bạn thiết kế DB
    }
    // Xử lý ảnh mới
    if (req.file) {
      if (tour.photo) {
        const oldPhotoPath = path.join(process.cwd(), tour.photo);
        if (fs.existsSync(oldPhotoPath)) fs.unlinkSync(oldPhotoPath);
      }
      req.body.photo = req.file.path;
    }
    // Parse dữ liệu kiểu đúng
    const updateData = {
      ...req.body,
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
    if (tour.photo) {
      // Tạo đường dẫn tuyệt đối tới file ảnh
      const filePath = path.join(process.cwd(), tour.photo); // process.cwd() là root folder của project
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Đã xóa file ảnh: ${filePath}`);
      } else {
        console.log(`File ảnh không tồn tại: ${filePath}`);
      }
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
