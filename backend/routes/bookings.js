import express from "express";
import {createBooking,
        getAllBookings,
        getBooking,
        getBookingsByUser,
        getBookingWithDetails
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking)
router.get("/user/:userId", getBookingsByUser)
router.get("/:id", getBooking)
router.get("/", getAllBookings)
router.get("/details/:bookingId", getBookingWithDetails)

export default router;