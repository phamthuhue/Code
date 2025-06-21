import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  getUsersByUserRole,
  getUserByEmail
} from "../controllers/userController.js";
const router = express.Router();

//create new user
router.post("/", createUser);
router.get("/", getAllUsers);
router.get('/email/:email', getUserByEmail)
router.get("/role/user", getUsersByUserRole);
//update user
router.put("/:id", updateUser);
//delete user
router.delete("/:id", deleteUser);
//get single user
router.get("/:id", getSingleUser);
export default router;
