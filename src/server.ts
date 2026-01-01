import app from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { env } from "./config/env";

dotenv.config();
connectDB();

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});