import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    details: [
      {
        time: { type: String, required: true },
        description: { type: String, required: true },
      }
    ],
    notes: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
export default Itinerary;