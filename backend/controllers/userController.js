import Role from "../models/Role.js";
import User from "../models/User.js";
import sendEmail from "../utils/emailService.js";
import { generateEmailHtml } from "../utils/emailTemplates.js";
import { hassPassword } from "../utils/hassPassword.js";

//create new user
export const createUser = async (req, res) => {
  const { username, email, phone, address, gender, yearob, role } = req.body;

  try {
    // Tạo mật khẩu ngẫu nhiên cho người dùng
    const password = Math.random().toString(36).slice(-8); // tạo mật khẩu ngẫu nhiên, ví dụ "abc12345"
    const hashedPassword = hassPassword(password);

    // Tìm role "Staff" trong bảng roles
    const staffRole = await Role.findOne({ name: "staff" }); // Tìm role Staff

    if (!staffRole) {
      return res.status(400).json({ message: "Không tìm thấy role Staff." });
    }
    // Tạo mới người dùng với mật khẩu đã mã hóa
    const newUser = new User({
      username,
      email,
      phone,
      address,
      gender,
      yearob,
      role: staffRole._id, // Sử dụng _id của role Staff

      password: hashedPassword,
    });

    await newUser.save();

    // Gửi email cho user với tên đăng nhập và mật khẩu

    // Gửi mail
    // Nội dung email
    const { html: emailHtml, text: plainText } = generateEmailHtml(
      email,
      password
    );
    const emailSubject = "Thông tin tài khoản của bạn";
    await sendEmail({
      to: process.env.EMAIL_USERNAME,
      subject: emailSubject,
      text: plainText,
      html: emailHtml,
    });

    res.status(201).json({
      message: "Tạo người dùng thành công và email đã được gửi đến người dùng",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi tạo người dùng và gửi email" });
  }
};
//update user
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Succesfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Succesfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
    });
  }
};

//get single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Succesfully found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
    });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "Thành công",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không tìm thấy người dùng",
    });
  }
};
