import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth.controller.js";
router.post("/signup", signup); // signup route
router.post("/signin", signin); // signin route
export default router;
