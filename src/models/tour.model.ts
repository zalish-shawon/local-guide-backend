import { Schema, model, Document, Types } from "mongoose";

export interface ITour extends Document {
  guide: Types.ObjectId;

  title: string;
  description: string;
  itinerary: string;

  city: string;
  category: string;

  price: number;
  duration: number; // hours or days
  meetingPoint: string;
  maxGroupSize: number;

  languages: string[];
  images: string[];

  isActive: boolean;
}

const tourSchema = new Schema<ITour>(
  {
    guide: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    description: { type: String, required: true },
    itinerary: { type: String, required: true },

    city: { type: String, required: true },
    category: { type: String, required: true },

    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    meetingPoint: { type: String, required: true },
    maxGroupSize: { type: Number, required: true },

    languages: { type: [String], default: [] },
    images: { type: [String], default: [] },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Tour = model<ITour>("Tour", tourSchema);
