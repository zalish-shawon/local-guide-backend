import { Router } from "express";
import * as TourController from "./tour.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

// Public
router.get("/", TourController.getTours);
router.get("/:id", TourController.getTourById);

// Guide-only
router.post("/", protect(["guide"]), TourController.createTour);
router.patch("/:id", protect(["guide"]), TourController.updateTour);
router.delete("/:id", protect(["guide"]), TourController.deactivateTour);

export default router;
