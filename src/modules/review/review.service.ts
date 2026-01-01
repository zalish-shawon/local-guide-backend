
import { Types } from "mongoose";
import { Booking } from "../../models/booking.model";
import { Review } from "../../models/review.model";
import { User } from "../../models/user.model";

// Tourist posts a review
export const createReview = async (
  tourId: string,
  touristId: string,
  rating: number,
  comment?: string
) => {
  // Only allow review if booking is completed
  const booking = await Booking.findOne({ tour: tourId, tourist: touristId, status: "completed" });
  if (!booking) throw new Error("Booking not completed or not found");

  const review = await Review.create({
    tour: tourId,
    tourist: touristId,
    guide: booking.guide,
    rating,
    comment,
  });

  // Update guide's rating
  const guide = await User.findById(booking.guide);
  if (guide) {
    const reviews = await Review.find({ guide: guide._id });
    guide.totalReviews = reviews.length;
    guide.rating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await guide.save();
  }

  return review;
};

// Get reviews for a guide
export const getReviewsByGuide = async (guideId: string) => {
  return Review.find({ guide: guideId }).populate("tour tourist", "title name");
};
