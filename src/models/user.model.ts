import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "tourist" | "guide" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;

  profilePic?: string;
  bio?: string;
  languages: string[];

  travelPreferences?: string;

  expertise: string[];
  dailyRate?: number;
  isApproved: boolean;

  rating: number;
  totalReviews: number;

  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["tourist", "guide", "admin"],
      default: "tourist",
    },

    profilePic: String,
    bio: String,
    languages: { type: [String], default: [] },

    travelPreferences: String,

    expertise: { type: [String], default: [] },
    dailyRate: Number,
    isApproved: { type: Boolean, default: false },

    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/**
 * ✅ Mongoose v7 SAFE password hashing
 * ❌ NO next()
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

/**
 * Password comparison
 */
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", userSchema);
