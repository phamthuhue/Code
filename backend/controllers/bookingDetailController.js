import BookingDetail from '../models/BookingDetail.js';

// Lấy tất cả chi tiết đặt tour
export const getAllBookingDetails = async (req, res) => {
  try {
    const details = await BookingDetail.find()
      .populate('bookingId')
      .populate('tourServiceId');
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy chi tiết theo ID
export const getBookingDetailById = async (req, res) => {
  try {
    const detail = await BookingDetail.findById(req.params.id)
      .populate('bookingId')
      .populate('tourServiceId');
    if (!detail) return res.status(404).json({ message: 'Không tìm thấy chi tiết đặt tour' });
    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới chi tiết
export const createBookingDetail = async (req, res) => {
  try {
    const newDetail = new BookingDetail(req.body);
    const saved = await newDetail.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật chi tiết
export const updateBookingDetail = async (req, res) => {
  try {
    const updated = await BookingDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy để cập nhật' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa chi tiết
export const deleteBookingDetail = async (req, res) => {
  try {
    const deleted = await BookingDetail.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy để xóa' });
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
