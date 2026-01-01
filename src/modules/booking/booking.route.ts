import { Router } from "express";
import * as BookingController from "./booking.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

// Tourist
router.post("/", protect(["tourist"]), BookingController.createBooking);
router.get("/my", protect(["tourist"]), BookingController.getMyBookings);

// Guide
router.get("/tour/:tourId", protect(["guide"]), BookingController.getTourBookings);
router.patch("/:bookingId/status", protect(["guide"]), BookingController.updateBookingStatus);

export default router;
