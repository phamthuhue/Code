import Service from '../models/Service.js'
import Partner from '../models/Partner.js' // <-- Đảm bảo model được đăng ký với Mongoose

// [GET] /services - Lấy danh sách tất cả dịch vụ
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('partnerId')
    res.status(200).json(services)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// [GET] /services/:id - Lấy chi tiết dịch vụ theo ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('partnerId')
    if (!service) {
      return res.status(404).json({ message: 'Dịch vụ không tồn tại' })
    }
    res.status(200).json(service)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// [POST] /services - Tạo mới dịch vụ
export const createService = async (req, res) => {
  try {
    const newService = new Service(req.body)
    const savedService = await newService.save()
    res.status(201).json(savedService)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// [PUT] /services/:id - Cập nhật dịch vụ
export const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedService) {
      return res.status(404).json({ message: 'Dịch vụ không tồn tại' })
    }
    res.status(200).json(updatedService)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// [DELETE] /services/:id - Xóa dịch vụ
export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Dịch vụ không tồn tại' })
    }
    res.status(200).json({ message: 'Xóa dịch vụ thành công' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}