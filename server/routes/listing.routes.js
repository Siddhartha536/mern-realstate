import express from "express";
const router = express.Router();
import { createListing,deleteListing,getUserListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
router.post("/create", verifyToken, createListing);
router.get("/listings/:id", verifyToken, getUserListings);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
