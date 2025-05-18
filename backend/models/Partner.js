import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema({
  name: String,             
  address: String,
  phone: String,
  partnerTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnerType', required: true },
},
{ timestamps: true });

export default mongoose.model("Partner", partnerSchema);

