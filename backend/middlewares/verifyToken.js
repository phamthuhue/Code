// middlewares/verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("authHeader: ", authHeader);
    // const token = authHeader?.split(" ")[1];
    // if (!token) return res.status(401).json({ message: "Token missing" });

    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //     if (err)
    //         return res
    //             .status(403)
    //             .json({ message: "Token invalid or expired" });
    //     req.user = user;
    //     next();
    // });
    next();
};
