import { Request, Response } from "express";
import * as AdminService from "./admin.service";

// USERS
export const getUsers = async (_req: Request, res: Response) => {
  const users = await AdminService.getAllUsers();
  res.json(users);
};

export const approveGuide = async (req: Request, res: Response) => {
  const user = await AdminService.approveGuide(req.params.userId);
  res.json({ message: "Guide approved", user });
};

export const blockUser = async (req: Request, res: Response) => {
  const user = await AdminService.blockUser(req.params.userId);
  res.json({ message: "User blocked", user });
};

// TOURS
export const getTours = async (_req: Request, res: Response) => {
  const tours = await AdminService.getAllTours();
  res.json(tours);
};

export const deactivateTour = async (req: Request, res: Response) => {
  const tour = await AdminService.deactivateTour(req.params.tourId);
  res.json({ message: "Tour deactivated", tour });
};

// BOOKINGS
export const getBookings = async (_req: Request, res: Response) => {
  const bookings = await AdminService.getAllBookings();
  res.json(bookings);
};

// REVIEWS
export const deleteReview = async (req: Request, res: Response) => {
  await AdminService.deleteReview(req.params.reviewId);
  res.json({ message: "Review deleted" });
};
