import express from "express";
import {
  createGuide,
  getAllGuides,
  getGuideByTourId,
  updateGuide,
  deleteGuide
} from '../controllers/guideController.js';

const router = express.Router();

// Tạo mới hướng dẫn viên
router.post("/", createGuide);

// Lấy tất cả hướng dẫn viên
router.get("/", getAllGuides);

// Lấy hướng dẫn viên theo ID
router.get("/tour/:tourId", getGuideByTourId);

// Cập nhật hướng dẫn viên
router.put("/:id", updateGuide);

// Xóa hướng dẫn viên
router.delete("/:id", deleteGuide);

export default router;
