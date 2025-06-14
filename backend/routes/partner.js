import express from 'express'
import {
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner
} from '../controllers/partnerController.js'

const router = express.Router()

router.get('/', getPartners)
router.get('/:id', getPartnerById)
router.post('/', createPartner)
router.put('/:id', updatePartner)
router.delete('/:id', deletePartner)

export default router