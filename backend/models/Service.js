import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên dịch vụ
  description: { type: String }, // Mô tả dịch vụ    
  unitPrice: { type: Number, required: true }, // Đơn giá dịch vụ
  unit: { type: String }, // Đơn vị tính (VD: "người", "lượt", "gói")
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true }
},
{ timestamps: true });

export default mongoose.model('Service', ServiceSchema);
