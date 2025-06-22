import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsByUser,
  getBookingWithDetails,
  updateBooking,
  deleteBooking,
  getBookingById,
  confirmMultipleBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";

const router = express.Router();
router.put("/confirm-multiple", confirmMultipleBookings);
router.post("/", createBooking);
router.get("/user/:userId", getBookingsByUser);
router.get("/", getAllBookings);
router.get("/:bookingId", getBookingById);
router.put("/:id", updateBooking);
router.put("/:id/status", updateBookingStatus);
router.delete("/:id", deleteBooking);
router.get("/details/:id", getBookingWithDetails);

export default router;
