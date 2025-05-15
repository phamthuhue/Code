const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên dịch vụ
  description: { type: String }, // Mô tả dịch vụ
  numberOfService: { type: Number, required: true },      
  unitPrice: { type: Number, required: true }, // Đơn giá dịch vụ
  unit: { type: String } // Đơn vị tính (VD: "người", "lượt", "gói")
},
{ timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
