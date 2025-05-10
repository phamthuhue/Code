// models/Itinerary.js
import mongoose from 'mongoose';

const detailSchema = new mongoose.Schema({
  time: { type: String, required: true },
  description: { type: String, required: true }
});

const itinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: [detailSchema],
  notes: [String]
});

export default mongoose.model('Itinerary', itinerarySchema);