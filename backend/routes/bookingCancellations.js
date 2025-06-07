import express from 'express';
import {
  createBookingCancellation
} from '../controllers/bookingCancellationController.js';

const router = express.Router();

// Tạo mới booking detail
router.post('/', createBookingCancellation);

export default router;