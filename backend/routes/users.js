import express from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userController.js";
const router = express.Router();
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

//create new user
router.post("/", createUser);
//update user
router.put("/:id", verifyUser, updateUser);
//delete user
router.delete("/:id", verifyUser, deleteUser);
//get single user
router.get("/:id", verifyUser, getSingleUser);
//get all users
router.get("/", verifyAdmin, getAllUsers);

export default router;