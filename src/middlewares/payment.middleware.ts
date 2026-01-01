import { Request, Response, NextFunction } from "express";
import { Booking } from "../models/booking.model";

/**
 * Ensures booking exists and is PAID
 * Optionally checks ownership
 */
export const verifyPaidBooking =
  (options?: { allowGuide?: boolean }) =>
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const bookingId =
        req.params.bookingId || req.body.bookingId || req.query.bookingId;

      if (!bookingId) {
        return res.status(400).json({ message: "Booking ID is required" });
      }

      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Ensure payment completed
      if (booking.status !== "paid") {
        return res
          .status(403)
          .json({ message: "Booking payment not completed" });
      }

      // Ownership check
      if (
        !options?.allowGuide &&
        booking.tourist.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      if (
        options?.allowGuide &&
        booking.guide.toString() !== req.user.id &&
        booking.tourist.toString() !== req.user.id
      ) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      req.booking = booking;
      next();
    } catch (error) {
      next(error);
    }
  };
