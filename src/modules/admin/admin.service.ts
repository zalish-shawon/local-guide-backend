import { Booking } from "../../models/booking.model";
import { Review } from "../../models/review.model";
import { Tour } from "../../models/tour.model";
import { User } from "../../models/user.model";


// USERS
export const getAllUsers = async () => {
  return User.find().select("-password");
};

export const approveGuide = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user || user.role !== "guide") {
    throw new Error("Guide not found");
  }

  user.isApproved = true;
  return user.save();
};

export const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.isApproved = false;
  return user.save();
};

// TOURS
export const getAllTours = async () => {
  return Tour.find().populate("guide", "name email");
};

export const deactivateTour = async (tourId: string) => {
  const tour = await Tour.findById(tourId);
  if (!tour) throw new Error("Tour not found");

  tour.isActive = false;
  return tour.save();
};

// BOOKINGS
export const getAllBookings = async () => {
  return Booking.find().populate("tour tourist guide", "title name email");
};

// REVIEWS
export const deleteReview = async (reviewId: string) => {
  return Review.findByIdAndDelete(reviewId);
};
