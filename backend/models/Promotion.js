const PromotionSchema = new mongoose.Schema({
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
    enum: ['percent', 'fixed'],
    default: 'percent', // Giảm theo phần trăm hoặc cố định
  },
  discountValue: {
    type: Number,
    required: true, // Ví dụ 20% hoặc 500000 VNĐ
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('Promotion', PromotionSchema);
