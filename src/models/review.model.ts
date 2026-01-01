import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
  tour: Types.ObjectId;
  tourist: Types.ObjectId;
  guide: Types.ObjectId;

  rating: number;
  comment?: string;

  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    tour: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
    tourist: { type: Schema.Types.ObjectId, ref: "User", required: true },
    guide: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

export const Review = model<IReview>("Review", reviewSchema);
