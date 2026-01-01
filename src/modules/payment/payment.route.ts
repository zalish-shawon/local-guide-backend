import { Router } from "express";
import * as PaymentController from "./payment.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

// Tourist creates a payment session
router.post("/checkout", protect(["tourist"]), PaymentController.createCheckoutSession);

// Stripe webhook (raw body required)
router.post("/webhook", PaymentController.stripeWebhook);

export default router;
