import Stripe from "stripe";
import { config } from "dotenv";
import { Booking } from "../../models/booking.model";

config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2022-11-15",
});

// Create Stripe Checkout session for a booking
export const createCheckoutSession = async (bookingId: string, successUrl: string, cancelUrl: string) => {
  const booking = await Booking.findById(bookingId).populate("tour");
  if (!booking) throw new Error("Booking not found");

  if (booking.status !== "confirmed") throw new Error("Booking is not confirmed yet");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: (booking.tour as any).title,
            description: `Booking for ${booking.numGuests} guests`,
          },
          unit_amount: Math.round((booking.tour as any).price * 100), // in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      bookingId,
      guideId: booking.guide.toString(),
    },
  });

  return session;
};

// Optional: webhook for payment success
export const handleStripeWebhook = async (event: Stripe.Event) => {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;
    const booking = await Booking.findById(bookingId);
    if (booking) {
      booking.status = "paid"; // optional new status
      await booking.save();
    }
  }
};
