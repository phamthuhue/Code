import express from 'express';
import {
  getAllItineraries,
  getItineraryByTour,
  getItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary
} from '../controllers/itineraryController.js';

const router = express.Router();

router.get("/", getAllItineraries);
router.get("/:id", getItineraryById);
router.get("/tour/:tourId", getItineraryByTour);
router.post("/", createItinerary);
router.put("/:id", updateItinerary);
router.delete("/:id", deleteItinerary);

export default router;
