import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from './routes/reviews.js';
import guideRoute from './routes/guides.js';
import itineraryRoute from './routes/itineraries.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true
};

// ✅ Hàm kết nối MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully, Hue ");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Dừng server nếu kết nối thất bại
  }
};

// Test API
app.get("/", (req, res) => {
  res.send("API is working");
});

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/guides', guideRoute);
app.use('/api/v1/itineraries', itineraryRoute);

// Start server
app.listen(port, () => {
  connect(); // 👉 gọi kết nối ở đây
  console.log(`🚀 Server running on port ${port}`);
});
