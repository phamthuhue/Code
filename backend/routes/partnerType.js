import express from "express";
import {
  getPartnerTypes,
  createPartnerType,
  updatePartnerType,
  deletePartnerType
} from '../controllers/partnerTypeController.js'

const router = express.Router();

router.get("/", getPartnerTypes);
router.post("/", createPartnerType);
router.put("/:id", updatePartnerType);
router.delete("/:id", deletePartnerType);

export default router;
