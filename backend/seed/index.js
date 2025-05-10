import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedTours } from "./seedTours.js";
import { seedGuides } from "./seedGuides.js";
import { seedItineraries } from "./seedItineraries.js";
import { seedReviews } from "./seedReviews.js";
// import { seedRoles } from "./roleSeeder.js"; // Nếu có

dotenv.config();

const runAllSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 Connected to MongoDB");

    // await seedRoles(); // Nếu có
    const tour = await seedTours();
    const guide = await seedGuides(tour._id);
    const itinerary = await seedItineraries();
    await seedReviews(tour._id, guide._id);

    console.log("✅ All seeders completed");
  } catch (err) {
    console.error("❌ Seeder failed:", err);
  } finally {
    await mongoose.disconnect();
  }
};

runAllSeeders();
