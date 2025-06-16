import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
    {
        name: String,
        address: String,
        phone: String,
        partnerTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PartnerType",
            required: true,
        },
    },
    { timestamps: true }
);

const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;
