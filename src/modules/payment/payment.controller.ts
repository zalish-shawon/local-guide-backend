import { Request, Response } from "express";
import * as PaymentService from "./payment.service";

// Create Stripe Checkout session
export const createCheckoutSession = async (req: any, res: Response) => {
  const { bookingId } = req.body;
  const successUrl = `${process.env.CLIENT_URL}/payment-success`;
  const cancelUrl = `${process.env.CLIENT_URL}/payment-cancel`;

  const session = await PaymentService.createCheckoutSession(bookingId, successUrl, cancelUrl);
  res.json({ url: session.url });
};

// Stripe webhook
export const stripeWebhook = async (req: any, res: Response) => {
  const sig = req.headers["stripe-signature"]!;
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    await PaymentService.handleStripeWebhook(event);
    res.json({ received: true });
  } catch (err: any) {
    console.log(err);
    res.status(400).send(`Webhook error: ${err.message}`);
  }
};



