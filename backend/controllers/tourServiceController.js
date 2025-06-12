import TourService from '../models/TourService.js';
import Service from "../models/Service.js";
import Tour from "../models/Tour.js";
import mongoose from 'mongoose';

// Lấy tất cả các dịch vụ của tour
export const getAllTourServices = async (req, res) => {
  try {
    const services = await TourService.find().populate('tourId', 'title');
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy dịch vụ theo ID
export const getTourServiceById = async (req, res) => {
  try {
    const service = await TourService.findById(req.params.id).populate('tourId').populate('serviceId');
    if (!service) return res.status(404).json({ message: 'Không tìm thấy dịch vụ' });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTourServicesByTourId = async (req, res) => {
  try {
    const { tourId } = req.params;

    const serviceData = await TourService.findOne({ tourId })
      .populate('services.serviceId') // populate cho từng service trong mảng
      .populate('tourId');

    if (!serviceData) {
      return res.status(404).json({ message: "Không tìm thấy dịch vụ cho tour này." });
    }

    res.status(200).json(serviceData);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dịch vụ theo tourId', error: error.message });
  }
};

// Tạo mới dịch vụ
export const createTourServiceForTour = async (req, res) => {
  try {
    const { tourId, services } = req.body;

    // Kiểm tra tourId có tồn tại không
    if (!tourId) {
      return res.status(400).json({ message: "Thiếu tourId trong yêu cầu." });
    }

    // Kiểm tra đã tồn tại TourService cho tour này chưa
    const existing = await TourService.findOne({ tourId });
    if (existing) {
      return res.status(400).json({ message: "TourService cho tour này đã tồn tại." });
    }

    // Tạo mới
    const newTourService = new TourService({ tourId, services });
    await newTourService.save();

    res.status(201).json({ message: "Tạo TourService thành công.", data: newTourService });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo TourService.", error: error.message });
  }
};

// Cập nhật dịch vụ
export const updateTourService = async (req, res) => {
  try {
    const updatedService = await TourService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ message: 'Không tìm thấy dịch vụ để cập nhật' });
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa dịch vụ
export const deleteTourService = async (req, res) => {
  try {
    const deleted = await TourService.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy dịch vụ để xóa' });
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa TourService theo tourId
export const deleteTourServiceByTourId = async (req, res) => {
  try {
    const tourObjectId = new mongoose.Types.ObjectId(req.params.tourId);
    const deleted = await TourService.findOneAndDelete({ tourId: tourObjectId  });
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy dịch vụ của tour để xóa' });
    }
    res.status(200).json({ message: 'Xóa dịch vụ của tour thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
