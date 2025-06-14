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
import bookingCancellationRoute from "./routes/bookingCancellations.js";
import paymentRoute from "./routes/payment.js";
import vnpayIpn from "./routes/vnpayIpn.js";
import serviceRoute from "./routes/services.js";
import partnerRoutes from './routes/partner.js'
import partnerTypeRoutes from './routes/partnerType.js'
import promotionRoutes from './routes/promotion.js'

import path from "path";

import momoRoute from "./routes/momo.js";

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

app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/guides", guideRoute);
app.use("/api/v1/itineraries", itineraryRoute);
app.use("/api/v1/groupTourRequests", groupTourRequestRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/booking-details", bookingDetailRoute);
app.use("/api/v1/tour-services", tourServiceRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/invoices", invoiceRoute);
app.use("/api/v1/payment", paymentRoute);
app.use('/api/v1/partners', partnerRoutes)
app.use('/api/v1/partner-types', partnerTypeRoutes)
app.use('/api/v1/promotions', promotionRoutes)
// Route IPN (phải đặt riêng, không verifyToken!)
app.use("/api/v1/payment-without-token", vnpayIpn);
app.use("/api/v1/booking-cancellations", bookingCancellationRoute);

// Start server
app.listen(port, () => {
    connectDB(); // 👉 gọi kết nối ở đây
    console.log(`🚀 Server running on port ${port}`);
});
