import express from "express";
const router = express.Router();
import { signup, signin, googleSigin } from "../controllers/auth.controller.js";
router.post("/signup", signup); // signup route
router.post("/signin", signin); // signin route
router.post("/google", googleSigin); // google signin route

export default router;
