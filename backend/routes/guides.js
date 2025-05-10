import express from "express";
import { verifyUser} from "../utils/verifyToken.js";
import {
  createGuide,
  getAllGuides,
  getGuideById,
  updateGuide,
  deleteGuide
} from '../controllers/guideController.js';

const router = express.Router();

// Tạo mới hướng dẫn viên
router.post('/',verifyUser, createGuide);

// Lấy tất cả hướng dẫn viên
router.get('/', getAllGuides);

// Lấy hướng dẫn viên theo ID
router.get('/:id', getGuideById);

// Cập nhật hướng dẫn viên
router.put('/:id', updateGuide);

// Xóa hướng dẫn viên
router.delete('/:id', deleteGuide);

export default router;
