// middlewares/verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Bạn cần mã token để truy cập" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // nên dùng process.env.JWT_SECRET
    req.user = decoded; // gắn user info vào request
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Mã token không hợp lệ hoặc đã hết hạn" });
  }
};
