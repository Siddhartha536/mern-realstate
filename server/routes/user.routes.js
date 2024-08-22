import express from "express";
const router = express.Router();
import { updateUserInfo } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
router.post("/update/:id", verifyToken, updateUserInfo);
export default router;
