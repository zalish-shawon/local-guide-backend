import { Request, Response } from "express";
import * as BookingService from "./booking.service";

// Tourist: create booking
export const createBooking = async (req: any, res: Response) => {
  const { tourId, numGuests, date } = req.body;
  const booking = await BookingService.createBooking(tourId, req.user.id, numGuests, new Date(date));
  res.status(201).json(booking);
};

// Tourist: get my bookings
export const getMyBookings = async (req: any, res: Response) => {
  const bookings = await BookingService.getBookingsByTourist(req.user.id);
  res.json(bookings);
};

// Guide: get bookings for tour
export const getTourBookings = async (req: any, res: Response) => {
  const bookings = await BookingService.getBookingsByGuide(req.user.id, req.params.tourId);
  res.json(bookings);
};

// Guide: update booking status
export const updateBookingStatus = async (req: any, res: Response) => {
  const { status } = req.body;
  const booking = await BookingService.updateBookingStatus(req.params.bookingId, req.user.id, status);
  res.json(booking);
};

export const completeBooking = async (req: any, res: Response) => {
  const booking = req.booking;

  booking.status = "completed";
  await booking.save();

  res.json({ message: "Tour marked as completed", booking });
};