import { Router } from "express";
import * as ReviewController from "./review.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

// Tourist creates review
router.post("/", protect(["tourist"]), ReviewController.createReview);

// Public or admin fetches guide reviews
router.get("/guide/:guideId", ReviewController.getReviewsByGuide);

export default router;
