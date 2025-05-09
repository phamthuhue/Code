import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import mongoose from "mongoose";

//user registration
export const register = async (req, res) => {
  try {
    // Với user đăng ký mặc định role là user
    const defaultRole = "user";
    const { username, email, password } = req.body;
    // Kiểm tra trường dữ liệu đầu vào cơ bản (có thể dùng validation middleware)
    if (!username || !email || !password) {
      return res.status(400).json({
        message:
          "Vui lòng điền đầy đủ thông tin yêu cầu (username, email, password, roleName).",
      });
    }
    // Tìm role theo tên
    const role = await Role.findOne({ name: defaultRole });
    if (!role) {
      return res.status(400).json({
        message: "Role không tồn tại. Vui lòng chọn một role hợp lệ.",
      });
    }
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hash,
      role: role._id, // Giả sử schema User có trường 'role' là ObjectId và bạn muốn lưu ID của role
    });

    await newUser.save();

    // Trả về 201 Created cho việc tạo tài nguyên thành công
    return res.status(201).json({
      success: true,
      message: "Tài khoản đã được tạo thành công.",
      user: {
        // Có thể trả về một số thông tin cơ bản của người dùng mới (không password)
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: role.name, // Trả về tên role để dễ hiểu
      },
    });
  } catch (err) {
    // 1. Lỗi trùng lặp (Duplicate Key Error) - thường là cho trường 'username' hoặc 'email' unique
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; // Lấy tên trường bị trùng
      const value = err.keyValue[field]; // Lấy giá trị bị trùng
      return res.status(409).json({
        // 409 Conflict: tài nguyên không thể tạo do xung đột với tài nguyên đã tồn tại
        success: false,
        message: `Giá trị '${value}' cho trường '${field}' đã tồn tại. Vui lòng chọn giá trị khác.`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra trên hệ thống. Vui lòng thử lại sau.",
      // Conditional inclusion of error details
      ...(process.env.NODE_ENV === "development" && {
        debug: {
          message: err.message,
          stack: err.stack, // Stack trace rất hữu ích trong dev, nhưng không bao giờ trong prod
        },
      }),
    });
  }
};

//user login
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng với email này",
      });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    const { id, password, role, ...rest } = user._doc;
    //create jwt token

    const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3m",
    });
    //set token in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        expires: new Date(Date.now() + 3 * 60 * 1000),
      })
      .status(200)
      .json({ token, data: { ...rest }, role });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Máy chủ có lỗi xảy ra. Vui lòng thử lại sau.",
      ...(process.env.NODE_ENV === "development" && {
        debug: {
          message: err.message,
          stack: err.stack,
        },
      }),
    });
  }
};
