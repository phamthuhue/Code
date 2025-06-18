import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

//create new user
router.post("/", createUser);
//update user
router.put("/:id", updateUser);
//delete user
router.delete("/:id", deleteUser);
//get single user
router.get("/:id", getSingleUser);
//get all users
router.get("/", getAllUsers);

export default router;
