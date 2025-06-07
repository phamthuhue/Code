import mongoose from "mongoose";

const partnerTypeSchema = new mongoose.Schema(
    {
        name: String, // TenLoaiDoiTac
        description: String, // MoTa
    },
    { timestamps: true }
);

export default mongoose.model("PartnerType", partnerTypeSchema);
