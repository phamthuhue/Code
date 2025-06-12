import Itinerary from "../models/Itinerary.js";
import mongoose from 'mongoose';

// GET all itineraries
export const getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({}).populate("tourId", "title");
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one itinerary by tourId
export const getItineraryByTour = async (req, res) => {
  try {
    const { tourId } = req.params;
    if (!tourId) {
      return res.status(400).json({ error: "tourId is required" });
    }
    const itinerary = await Itinerary.findOne({ tourId });
    if (!itinerary) {
      return res
        .status(404)
        .json({ error: "Itinerary not found for the given tourId" });
    }
    res.status(200).json({ success: true, data: itinerary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single itinerary by ID
export const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: "Not found" });
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new itinerary
export const createItinerary = async (req, res) => {
  try {
    const newItinerary = new Itinerary(req.body);
    await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT (update) itinerary
export const updateItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: "Not found" });
    const { tourId, details, notes } = req.body;
    console.log("notes: ", notes);
    console.log("details: ", details);
    console.log("tourId: ", tourId);
    // Gán các trường cần cập nhật
    itinerary.tourId = req.body.tourId;
    itinerary.details = req.body.details;
    itinerary.notes = req.body.notes;

    const updated = await itinerary.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE itinerary
export const deleteItinerary = async (req, res) => {
  try {
    const deleted = await Itinerary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE itinerary by tourId
export const deleteItineraryByTourId = async (req, res) => {
  try {
    const tourObjectId = new mongoose.Types.ObjectId(req.params.tourId);
    const deleted = await Itinerary.findOneAndDelete({ tourId: tourObjectId });
    if (!deleted) return res.status(404).json({ message: "Itinerary not found for this tour" });
    res.json({ message: "Itinerary deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
