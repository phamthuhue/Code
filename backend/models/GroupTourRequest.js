import mongoose from 'mongoose';

const GroupTourRequestSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  
  // Liên kết với Tour cụ thể mà khách chọn từ danh sách
  tourId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tour',
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },

  travelDate: { type: Date, required: true },
  specialRequest: { type: String },

  status: {
    type: String,
    enum: ['Chờ xử lý', 'Đã tạo booking', 'Đã hủy'],
    default: 'Chờ xử lý',
  },
},
{ timestamps: true });

export default mongoose.model('GroupTourRequest', GroupTourRequestSchema);