import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import guideRoute from "./routes/guides.js";
import itineraryRoute from "./routes/itineraries.js";
import groupTourRequestRoute from "./routes/groupTourRequests.js";
import bookingRoute from "./routes/bookings.js";
import bookingDetailRoute from "./routes/bookingDetails.js";
import tourServiceRoute from "./routes/tourServices.js";
import invoiceRoute from "./routes/invoices.js";
import invoiceDetailRoute from "./routes/invoiceDetails.js";

import path from "path";

import momoRoute from "./routes/momo.js"


import { verifyToken } from "./middlewares/verifyToken.js";
import { connectDB } from "./services/config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Phục vụ thư mục uploads dưới đường dẫn /uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/v1/auth", authRoute); // login và đăng ký không cần token
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/momo", momoRoute);
// Route cần token - áp dụng middleware từ đây trở đi

app.use("/api/v1/users", verifyToken, userRoute);
app.use("/api/v1/reviews", verifyToken, reviewRoute);
app.use("/api/v1/guides", verifyToken, guideRoute);
app.use("/api/v1/itineraries", verifyToken, itineraryRoute);
app.use("/api/v1/groupTourRequests", verifyToken, groupTourRequestRoute);
app.use("/api/v1/bookings", verifyToken, bookingRoute);
app.use("/api/v1/booking-details", verifyToken, bookingDetailRoute);
app.use("/api/v1/tour-services", verifyToken, tourServiceRoute);
app.use("/api/v1/invoices", verifyToken, invoiceRoute);
app.use("/api/v1/invoice-details", verifyToken, invoiceDetailRoute);

// Start server
app.listen(port, () => {
  connectDB(); // 👉 gọi kết nối ở đây
  console.log(`🚀 Server running on port ${port}`);
});
