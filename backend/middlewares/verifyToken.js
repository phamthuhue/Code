// middlewares/verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("req.cookies: ", req.cookies);
  //   const token = req.cookies.accessToken;

  //   if (!token) {
  //     return res
  //       .status(401)
  //       .json({ message: "Bạn chưa đăng nhập hoặc token bị thiếu." });
  //   }

  //   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
  //     if (err) {
  //       return res
  //         .status(401)
  //         .json({ message: "Token không hợp lệ hoặc đã hết hạn." });
  //     }

  //     req.user = decoded; // lưu thông tin vào req.user để dùng ở route phía sau
  //     next(); // Cho phép đi tiếp
  //   });
  next();
};
