import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { createBooking, getAllBookings, getBooking, getBookingsByUser }  from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", verifyUser, createBooking)
router.get("/:id", verifyUser, getBooking)
router.get("/user/:userId", verifyUser, getBookingsByUser)
router.get("/", verifyAdmin, getAllBookings)

export default router;