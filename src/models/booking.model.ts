import { Schema, model, Document, Types } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "paid" | "declined" | "completed" | "cancelled";

export interface IBooking extends Document {
  tour: Types.ObjectId;
  tourist: Types.ObjectId;
  guide: Types.ObjectId;

  date: Date;
  numGuests: number;

  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    tour: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
    tourist: { type: Schema.Types.ObjectId, ref: "User", required: true },
    guide: { type: Schema.Types.ObjectId, ref: "User", required: true },

    date: { type: Date, required: true },
    numGuests: { type: Number, required: true },

    status: { type: String, enum: ["pending", "confirmed", "paid", "declined", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
