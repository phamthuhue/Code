import Tour from "../models/Tour.js";

//create new tour
// [POST] /api/tours
export const createTour = async (req, res) => {
  try {
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
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTour)
      return res
        .status(404)
        .json({ message: "Không tìm thấy tour để cập nhật" });
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
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour)
      return res.status(404).json({ message: "Không tìm thấy tour để xóa" });
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
