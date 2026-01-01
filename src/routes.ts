import { Router } from "express";
import authRoutes from "./modules/auth/auth.route";
import tourRoutes from "./modules/tour/tour.route";
import bookingRoutes from "./modules/booking/booking.route";
import reviewRoutes from "./modules/review/review.route";
import paymentRoutes from "./modules/payment/payment.route";
import adminRoutes from "./modules/admin/admin.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/tours", tourRoutes);

router.use("/bookings", bookingRoutes);
router.use("/reviews", reviewRoutes);
router.use("/payments", paymentRoutes);
router.use("/admin", adminRoutes);



export default router;
