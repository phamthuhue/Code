import express from "express";
import {
  createGroupTourRequest,
  getAllGroupTourRequests,
  getGroupTourRequestById,
  updateGroupTourRequest,
  deleteGroupTourRequest
} from '../controllers/groupTourRequestController.js';

const router = express.Router();

router.post('/', createGroupTourRequest);
router.get('/', getAllGroupTourRequests);
router.get('/:id', getGroupTourRequestById);
router.put('/:id', updateGroupTourRequest);
router.delete('/:id', deleteGroupTourRequest);

export default router;