import { Request, Response } from "express";
import * as ReviewService from "./review.service";

// Tourist posts review
export const createReview = async (req: any, res: Response) => {
  const { tourId, rating, comment } = req.body;
  const review = await ReviewService.createReview(tourId, req.user.id, rating, comment);
  res.status(201).json(review);
};

// Get reviews by guide
export const getReviewsByGuide = async (req: any, res: Response) => {
  const reviews = await ReviewService.getReviewsByGuide(req.params.guideId);
  res.json(reviews);
};
