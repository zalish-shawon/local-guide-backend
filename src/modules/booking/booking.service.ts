import { Types } from "mongoose";
import { Tour } from "../../models/tour.model";
import { Booking } from "../../models/booking.model";

// Tourist creates a booking
export const createBooking = async (tourId: string, touristId: string, numGuests: number, date: Date) => {
  const tour = await Tour.findById(tourId);
  if (!tour || !tour.isActive) throw new Error("Tour not found");

  const booking = await Booking.create({
    tour: tour._id,
    tourist: touristId,
    guide: tour.guide,
    date,
    numGuests,
    status: "pending",
  });

  return booking;
};

// Tourist fetches their bookings
export const getBookingsByTourist = async (touristId: string) => {
  return Booking.find({ tourist: touristId }).populate("tour guide", "title name");
};

// Guide fetches bookings for their tours
export const getBookingsByGuide = async (guideId: string, tourId?: string) => {
  const filter: any = { guide: guideId };
  if (tourId) filter.tour = tourId;
  return Booking.find(filter).populate("tour tourist", "title name email");
};

// Guide updates booking status
export const updateBookingStatus = async (bookingId: string, guideId: string, status: string) => {
  const booking = await Booking.findOne({ _id: bookingId, guide: guideId });
  if (!booking) throw new Error("Booking not found or unauthorized");

  booking.status = status as any;
  return booking.save();
};
