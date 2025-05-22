import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema(
  {
    toursId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }],  // Danh sách tour mà hướng dẫn viên dẫn
    name: { type: String, required: true },                            // Tên hướng dẫn viên
    age: { type: Number, required: true },                             // Tuổi
    avgRating: { type: Number, default: 5},              // Đánh giá trung bình (mặc định 5)
    gender: { type: String, enum: ["Nam", "Nữ", "Khác"], required: true }, // Giới tính
    dob: { type: Date, required: true },                               // Ngày sinh
    address: { type: String, required: true },                         // Địa chỉ
    phone: { type: String, required: true },                           // Số điện thoại
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

const Guide = mongoose.model("Guide", guideSchema);
export default Guide;
