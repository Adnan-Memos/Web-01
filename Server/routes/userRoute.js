import express from "express";
import { allFav, bookVisit, cancelBooking, createUser, getAllBookings, toFav } from "../controllers/userCntrl.js";
import { all } from "axios";
const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking)
router.post("/toFav/:rid", toFav)
router.post("/allFav", allFav);
export { router as userRoute};
