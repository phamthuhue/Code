import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },   // HoTen
  dob: { type: Date },                          // NgaySinh
  address: { type: String },                    // DiaChi
  phone: { type: String },                      // SDT
  gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'] }, // GioiTinh
  email: { type: String, unique: true },        
  username: { type: String, required: true, unique: true }, // TenDN
  password: { type: String, required: true },              // MatKhau
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
},
{ timestamps: true });

export default mongoose.model('Staff', StaffSchema);
