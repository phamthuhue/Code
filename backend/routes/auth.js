import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  changePassword,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", changePassword);

export default router;
