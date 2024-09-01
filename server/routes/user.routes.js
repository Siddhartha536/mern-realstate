import express from "express";
const router = express.Router();
import {
  updateUserInfo,
  deleteUserInfo,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
router.post("/update/:id", verifyToken, updateUserInfo);
router.delete("/delete/:id", verifyToken, deleteUserInfo);
export default router;
