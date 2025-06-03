import Invoice from '../models/Invoice.js';

// Tạo hóa đơn mới
export const createInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả hóa đơn
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('bookingId userId promotionId');
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy hóa đơn theo ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('bookingId userId promotionId');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật hóa đơn
export const updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInvoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(updatedInvoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa hóa đơn
export const deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getInvoiceWithDetails = async (req, res) => {
  try {
    const { id } = req.params; // id của hóa đơn (Invoice)
    
    const invoice = await Invoice.findById(id)
      .populate('bookingDetails') // lấy toàn bộ bookingDetails liên quan
      .populate('userId', 'name email') // lấy thêm thông tin người dùng
      .populate('promotionId', 'code discount') // lấy thêm thông tin khuyến mãi (nếu có)
      .populate({
        path: 'bookingId',
        select: 'tourId startDate numberOfPeople status',
        populate: {
          path: 'tourId',
          select: 'name price',
        },
      });

    if (!invoice) {
      return res.status(404).json({ message: 'Hóa đơn không tồn tại' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error('Lỗi khi lấy hóa đơn:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};