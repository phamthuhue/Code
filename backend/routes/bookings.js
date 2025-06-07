import express from "express";
import {createBooking,
        getAllBookings,
        getBookingsByUser,
        getBookingWithDetails,
        updateBooking,
        deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking)
router.get("/user/:userId", getBookingsByUser)
router.get("/", getAllBookings)
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/:id", getBookingWithDetails)

export default router;