import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "5000",
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};

// 🔒 Fail fast if critical env is missing
if (!env.MONGO_URI || !env.JWT_SECRET) {
  throw new Error("❌ Missing required environment variables");
}
