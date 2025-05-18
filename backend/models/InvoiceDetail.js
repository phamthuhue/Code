import mongoose from 'mongoose';

const InvoiceDetailSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true,
  },
  itemType: {
    type: String,
    enum: ['Tour', 'Service'],
    required: true,
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    default: null,
  },
  bookingServiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookingService',
    default: null,
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
});

export default mongoose.model('InvoiceDetail', InvoiceDetailSchema);
