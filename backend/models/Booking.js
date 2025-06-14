import mongoose from "mongoose";

// Tạo schema cho Booking
const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Người đặt
        },
        tourId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour",
            required: true, // Tour được đặt
        },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        startDate: { type: Date, required: true },
        numberOfPeople: {
            type: Number,
            required: true, // Số lượng người
        },
        totalPrice: {
            type: Number,
            required: true, // Tổng giá (tour + dịch vụ)
        },
        status: {
            type: String,
            enum: ["Mới tạo", "Chờ xác nhận", "Chờ hủy", "Xác nhận", "Đã hủy"],
            default: "Mới tạo",
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Tạo virtual để populate danh sách BookingDetail của booking này
bookingSchema.virtual("bookingDetails", {
    ref: "BookingDetail", // Tên model BookingDetail
    localField: "_id", // Trường trong Booking
    foreignField: "bookingId", // Trường trong BookingDetail liên kết
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
