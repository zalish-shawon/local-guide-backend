import { Router } from "express";
import * as BookingController from "./booking.controller";
import { protect } from "../../middlewares/auth.middleware";
import { verifyPaidBooking } from "../../middlewares/payment.middleware";

const router = Router();

// Tourist
router.post("/", protect(["tourist"]), BookingController.createBooking);
router.get("/my", protect(["tourist"]), BookingController.getMyBookings);

// Guide
router.get("/tour/:tourId", protect(["guide"]), BookingController.getTourBookings);
router.patch("/:bookingId/status", protect(["guide"]), BookingController.updateBookingStatus);
router.patch(
  "/:bookingId/complete",
  protect(["guide"]),
  verifyPaidBooking({ allowGuide: true }),
  BookingController.completeBooking
);
export default router;
