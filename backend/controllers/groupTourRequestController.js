import GroupTourRequest from '../models/GroupTourRequest.js';

// [POST] /api/groupTourRequests
export const createGroupTourRequest = async (req, res) => {
  try {
    const newRequest = new GroupTourRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json({
      success: true,
      message: "Yêu cầu đã được gửi thành công!",
      data: savedRequest
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi gửi yêu cầu",
      error: err.message
    });
  }
};

// [GET] /api/groupTourRequests
export const getAllGroupTourRequests = async (req, res) => {
  try {
    const requests = await GroupTourRequest.find()
      .populate("tourId")
      .populate("userId");

    res.status(200).json({
      success: true,
      message: "Lấy danh sách yêu cầu thành công",
      data: requests
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách yêu cầu",
      error: err.message
    });
  }
};

// [GET] /api/groupTourRequests/:id
export const getGroupTourRequestById = async (req, res) => {
  try {
    const request = await GroupTourRequest.findById(req.params.id)
      .populate("tourId")
      .populate("userId");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy yêu cầu"
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy yêu cầu thành công",
      data: request
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy yêu cầu",
      error: err.message
    });
  }
};

// [PUT] /api/groupTourRequests/:id
export const updateGroupTourRequest = async (req, res) => {
  try {
    const updatedRequest = await GroupTourRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy yêu cầu để cập nhật"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật yêu cầu thành công",
      data: updatedRequest
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật yêu cầu",
      error: err.message
    });
  }
};

// [DELETE] /api/groupTourRequests/:id
export const deleteGroupTourRequest = async (req, res) => {
  try {
    const deletedRequest = await GroupTourRequest.findByIdAndDelete(req.params.id);

    if (!deletedRequest) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy yêu cầu để xóa"
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa yêu cầu thành công"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa yêu cầu",
      error: err.message
    });
  }
};