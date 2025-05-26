// routes/invoiceDetail.js
import express from 'express';
import {
  createInvoiceDetail,
  getAllInvoiceDetails,
  getInvoiceDetailById,
  getDetailsByInvoiceId,
  updateInvoiceDetail,
  deleteInvoiceDetail
} from '../controllers/invoiceDetailController.js';

const router = express.Router();

router.post('/', createInvoiceDetail);
router.get('/', getAllInvoiceDetails);
router.get('/:id', getInvoiceDetailById);
router.get('/invoice/:invoiceId', getDetailsByInvoiceId);
router.put('/:id', updateInvoiceDetail);
router.delete('/:id', deleteInvoiceDetail);

export default router;