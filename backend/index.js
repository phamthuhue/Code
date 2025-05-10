import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import { verifyToken } from "./middlewares/verifyToken.js";
import { connectDB } from "./services/config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute); // login không cần token
// Route cần token - áp dụng middleware từ đây trở đi
app.use(verifyToken);

// Routes
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoute);

// Start server
app.listen(port, () => {
    connectDB(); // 👉 gọi kết nối ở đây
    console.log(`🚀 Server running on port ${port}`);
});
