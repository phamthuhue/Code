import mongoose from "mongoose";

const partnerTypeSchema = new mongoose.Schema(
    {
        name: String, // TenLoaiDoiTac
        description: String, // MoTa
    },
    { timestamps: true }
);

const PartnerType = mongoose.model('PartnerType', partnerTypeSchema);
export default PartnerType;
