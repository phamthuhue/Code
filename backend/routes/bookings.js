import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createBooking, getAllBookings, getBooking, getBookingsByUser }  from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking)
router.get("/user/:userId", getBookingsByUser)
router.get("/:id", getBooking)
router.get("/", verifyAdmin, getAllBookings)

export default router;