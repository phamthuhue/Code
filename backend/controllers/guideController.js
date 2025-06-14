import Guide from '../models/Guide.js';

// Tạo mới hướng dẫn viên
export const createGuide = async (req, res) => {
  try {
    const {
      toursId,
      name,
      age,
      gender,
      dob,
      address,
      phone
    } = req.body;

    const newGuide = new Guide({
      toursId,
      name,
      age,
      gender,
      dob,
      address,
      phone,
      avgrating: 5,        // mặc định
    });

    await newGuide.save();

    res.status(201).json({ success: true, message: 'Guide created successfully', data: newGuide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create guide' });
  }
};

export const getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find(); // Lấy tên tour nếu cần
    res.status(200).json({ success: true, data: guides });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch guides' });
  }
};

// GET guide by tourid
export const getGuideByTourId = async (req, res) => {
  try {
    const { tourId } = req.params;

    if (!tourId) {
      return res.status(400).json({ success: false, message: 'tourId is required' });
    }

    const guides = await Guide.findOne({ toursId: tourId }).populate('toursId', 'title');

    if (!guides || guides.length === 0) {
      return res.status(404).json({ success: false, message: 'No guides found for this tour' });
    }

    res.status(200).json({ success: true, data: guides });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch guides by tourId' });
  }
};

export const updateGuide = async (req, res) => {
  try {
    const updated = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Guide not found' });

    res.status(200).json({ success: true, message: 'Guide updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update guide' });
  }
};

export const deleteGuide = async (req, res) => {
  try {
    const deleted = await Guide.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Guide not found' });

    res.status(200).json({ success: true, message: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete guide' });
  }
};
