import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";

import { hassPassword } from "../utils/hassPassword.js";
import sendEmail from "../utils/emailService.js";
import { resetPasswordEmail } from "../utils/emailTemplates.js";

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
        const hash = hassPassword(password);
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
        const user = await User.findOne({ email }).populate("role");

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
            return res.status(422).json({
                success: false,
                message: "Tài khoản hoặc mật khẩu không chính xác",
            });
        }

        const { id, password, role, ...rest } = user._doc;
        //create jwt token
        const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });
        //set token in the browser cookies and send the response to the client
        res.status(200).json({ token, info: { ...rest }, role });
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

// user forgot password

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng với email này",
            });
        }
        // ✅ Check nếu tránh spamming gửi email lấy lại mật khẩu
        if (user.resetPasswordToken && user.resetPasswordExpires > Date.now()) {
            const waitMinutes = Math.ceil(
                (user.resetPasswordExpires - Date.now()) / 60000
            );
            return res.status(429).json({
                success: false,
                message: `Bạn đã yêu cầu đặt lại mật khẩu gần đây. Vui lòng thử lại sau khoảng ${waitMinutes} phút.`,
            });
        }
        // Tạo reset token và hash nó trong schema
        const resetToken = user.createPasswordResetToken();

        // Lưu token hash và expires vào DB, bỏ qua validate nếu không cần
        await user.save({ validateBeforeSave: false });

        // Tạo URL reset
        const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`;

        // Nội dung email
        const { html: emailHtml, text: plainText } =
            resetPasswordEmail(resetUrl);
        // Gửi mail
        await sendEmail({
            to: process.env.EMAIL_USERNAME,
            subject: "Đặt lại mật khẩu",
            text: plainText,
            html: emailHtml,
        });
        return res.status(200).json({
            success: true,
            message: "Email đặt lại mật khẩu đã được gửi đến địa chỉ của bạn",
        });
    } catch (err) {
        console.log("err: ", err);
        return res.status(500).json({
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

// user reset password
export const resetPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    try {
        // Tìm người dùng theo token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng",
            });
        }
        // Kiểm tra xem token có còn hiệu lực không
        if (
            user.resetPasswordToken !== token ||
            user.resetPasswordExpires < Date.now()
        ) {
            return res.status(400).json({
                success: false,
                message: "Token không hợp lệ hoặc đã hết hạn",
            });
        }
        // Cập nhật mật khẩu mới
        const hash = hassPassword(password);
        user.password = hash;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Mật khẩu đã được cập nhật thành công",
        });
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

// user change password
export const changePassword = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message:
                "Vui lòng cung cấp đầy đủ userId, mật khẩu hiện tại và mật khẩu mới.",
        });
    }

    try {
        // Tìm user theo id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy người dùng.",
            });
        }

        // So sánh mật khẩu hiện tại
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu hiện tại không đúng.",
            });
        }

        // Hash mật khẩu mới và lưu
        const hashedPassword = hassPassword(newPassword);
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Đổi mật khẩu thành công.",
        });
    } catch (err) {
        return res.status(500).json({
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
