import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedRoles } from "./roleSeeder.js";

dotenv.config();

const runAllSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 Connected to MongoDB");
    await seedRoles();
    mongoose.disconnect();
    console.log("✅ All seeders completed");
  } catch (err) {
    console.error("❌ Seeder failed:", err);
    mongoose.disconnect();
  }
};

runAllSeeders();
