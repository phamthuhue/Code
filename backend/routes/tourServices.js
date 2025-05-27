import express from 'express';
import {
  getAllTourServices,
  getTourServiceById,
  createTourServiceIfTourId,
  updateTourService,
  deleteTourService,
  getTourServicesByTourId
} from '../controllers/tourServiceController.js';

const router = express.Router();

router.get('/', getAllTourServices);
router.get('/:id', getTourServiceById);
router.post('/', createTourServiceIfTourId);
router.put('/:id', updateTourService);
router.delete('/:id', deleteTourService);
router.get('/tour/:tourId', getTourServicesByTourId);

export default router;
