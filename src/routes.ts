import { Router } from "express";
import authRoutes from "./modules/auth/auth.route";
import tourRoutes from "./modules/tour/tour.route";
import bookingRoutes from "./modules/booking/booking.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/tours", tourRoutes);

router.use("/bookings", bookingRoutes);

export default router;
