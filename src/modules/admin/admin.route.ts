import { Router } from "express";
import * as AdminController from "./admin.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

// USERS
router.get("/users", protect(["admin"]), AdminController.getUsers);
router.patch("/users/:userId/approve", protect(["admin"]), AdminController.approveGuide);
router.patch("/users/:userId/block", protect(["admin"]), AdminController.blockUser);

// TOURS
router.get("/tours", protect(["admin"]), AdminController.getTours);
router.patch("/tours/:tourId/deactivate", protect(["admin"]), AdminController.deactivateTour);

// BOOKINGS
router.get("/bookings", protect(["admin"]), AdminController.getBookings);

// REVIEWS
router.delete("/reviews/:reviewId", protect(["admin"]), AdminController.deleteReview);

export default router;
