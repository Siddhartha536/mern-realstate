import express from "express";
const router = express.Router();
import {
  updateUserInfo,
  deleteUserInfo,
  getUserListings,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
router.post("/update/:id", verifyToken, updateUserInfo);
router.delete("/delete/:id", verifyToken, deleteUserInfo);
router.get("/listings/:id", verifyToken, getUserListings);
export default router;
