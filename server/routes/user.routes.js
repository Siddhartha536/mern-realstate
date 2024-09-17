import express from "express";
const router = express.Router();
import {
  updateUserInfo,
  deleteUserInfo,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
router.post("/update/:id", verifyToken, updateUserInfo);
router.delete("/delete/:id", verifyToken, deleteUserInfo);
router.get('/:id', verifyToken,getUser);
export default router;
