import mongoose from "mongoose";

const tourServiceSchema = new mongoose.Schema({
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  numberOfPeopl: { type: Number, required: true },
  servicePrice: { type: Number, required: true },
  note: { type: String },
},
{ timestamps: true });

export default mongoose.model("TourService", tourServiceSchema);
