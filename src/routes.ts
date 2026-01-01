import { Router } from "express";
import authRoutes from "./modules/auth/auth.route";
import tourRoutes from "./modules/tour/tour.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/tours", tourRoutes);

export default router;
