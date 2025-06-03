import mongoose from "mongoose";

const BookingDetailSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    tourServiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourService",
      required: false, // Cho phép null nếu chỉ có tour chính
      default: null,
    },
    itemType: {
      type: String,
      enum: ["Tour", "Service"],
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

// Thiết lập virtual cho Booking -> BookingDetail[]
BookingDetailSchema.virtual("booking", {
  ref: "Booking",
  localField: "bookingId",
  foreignField: "_id",
  justOne: true,
});

// Đảm bảo virtuals xuất hiện khi chuyển sang JSON
BookingDetailSchema.set("toObject", { virtuals: true });
BookingDetailSchema.set("toJSON", { virtuals: true });

export default mongoose.model("BookingDetail", BookingDetailSchema);