import Itinerary from '../models/Itinerary.js';

// GET all itineraries (with optional filter by tourId)
export const getAllItineraries = async (req, res) => {
  try {
    const { tourId } = req.query;
    const query = tourId ? { tourId } : {};

    const itineraries = await Itinerary.find(query);
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single itinerary by ID
export const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Not found' });
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
    const updated = await Itinerary.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE itinerary
export const deleteItinerary = async (req, res) => {
  try {
    const deleted = await Itinerary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
