import InvoiceDetail from '../models/InvoiceDetail.js';

// Tạo chi tiết hóa đơn mới
export const createInvoiceDetail = async (req, res) => {
  try {
    const newDetail = new InvoiceDetail(req.body);
    const savedDetail = await newDetail.save();
    res.status(201).json(savedDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả chi tiết hóa đơn
export const getAllInvoiceDetails = async (req, res) => {
  try {
    const details = await InvoiceDetail.find().populate('invoiceId tourId bookingServiceId');
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy chi tiết hóa đơn theo ID
export const getInvoiceDetailById = async (req, res) => {
  try {
    const detail = await InvoiceDetail.findById(req.params.id).populate('invoiceId tourId bookingServiceId');
    if (!detail) return res.status(404).json({ message: 'Invoice Detail not found' });
    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả chi tiết của một hóa đơn
export const getDetailsByInvoiceId = async (req, res) => {
  try {
    const details = await InvoiceDetail.find({ invoiceId: req.params.invoiceId }).populate('tourId bookingServiceId');
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật chi tiết hóa đơn
export const updateInvoiceDetail = async (req, res) => {
  try {
    const updatedDetail = await InvoiceDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDetail) return res.status(404).json({ message: 'Invoice Detail not found' });
    res.status(200).json(updatedDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa chi tiết hóa đơn
export const deleteInvoiceDetail = async (req, res) => {
  try {
    const deletedDetail = await InvoiceDetail.findByIdAndDelete(req.params.id);
    if (!deletedDetail) return res.status(404).json({ message: 'Invoice Detail not found' });
    res.status(200).json({ message: 'Invoice Detail deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};