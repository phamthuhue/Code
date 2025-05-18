import mongoose from "mongoose";

const BookingDetailSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true }, // ID đơn đặt tour
  tourServiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'TourService', required: true }, // Dịch vụ của tour
  itemType: {
    type: String,
    enum: ['Tour', 'Service'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
},
{ timestamps: true }
);

export default mongoose.model('BookingDetail', BookingDetailSchema);
