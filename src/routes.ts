import { Router } from "express";
import authRoutes from "./modules/auth/auth.route";
import tourRoutes from "./modules/tour/tour.route";
import bookingRoutes from "./modules/booking/booking.route";
import reviewRoutes from "./modules/review/review.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/tours", tourRoutes);

router.use("/bookings", bookingRoutes);
router.use("/reviews", reviewRoutes);


export default router;
