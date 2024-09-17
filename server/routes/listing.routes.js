import express from "express";
const router = express.Router();
import { createListing,deleteListing,getListing,getUserListings, updateListing ,getAllListings} from "../controllers/listing.controller.js";
import { getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
router.post("/create", verifyToken, createListing);
router.get("/listings/:id", verifyToken, getUserListings);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get('/getListing/:id', getListing);
router.get('/getalllistings',getAllListings);

export default router;
