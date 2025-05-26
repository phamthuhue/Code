import express from 'express';
import {
  getAllBookingDetails,
  getBookingDetailById,
  createBookingDetail,
  updateBookingDetail,
  deleteBookingDetail
} from '../controllers/bookingDetailController.js';

const router = express.Router();

// Lấy tất cả booking detail
router.get('/', getAllBookingDetails);

// Lấy chi tiết theo ID
router.get('/:id', getBookingDetailById);

// Tạo mới booking detail
router.post('/', createBookingDetail);

// Cập nhật booking detail theo ID
router.put('/:id', updateBookingDetail);

// Xóa booking detail theo ID
router.delete('/:id', deleteBookingDetail);

export default router;