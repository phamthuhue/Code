import express from 'express';
import {
  createBookingCancellation,
  updateBookingCancellation,
  deleteBookingCancellation,
  confirmMultipleBookingCancellations,
  getCancellationBookings,
  rejectMultipleBookingCancellations
} from '../controllers/bookingCancellationController.js';

const router = express.Router();

// Tạo mới booking detail
router.put("/confirm-multiple", confirmMultipleBookingCancellations);
router.put("/reject-multiple", rejectMultipleBookingCancellations);
router.get("/", getCancellationBookings);
router.post('/', createBookingCancellation);
router.put('/:id', updateBookingCancellation);
router.delete('/:id', deleteBookingCancellation);

export default router;