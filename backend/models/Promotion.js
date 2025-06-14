import mongoose from "mongoose";
const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Mã áp dụng (ví dụ: GROUP20)
    },
    description: {
        type: String,
    },
    discountType: {
        type: String,
        enum: ["Phần trăm (%)", "VNĐ"],
        default: "%", // Giảm theo phần trăm hoặc cố định
    },
    discountValue: {
        type: Number,
        required: true, // Ví dụ 20% hoặc 500000 VNĐ
    },
},
{ timestamps: true }
);

export default mongoose.model("Promotion", promotionSchema);
