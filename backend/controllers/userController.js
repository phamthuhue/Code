import Role from "../models/Role.js";
import User from "../models/User.js";
import sendEmail from "../utils/emailService.js";
import {
  generateEmailHtml,
  generateUpdatedUserEmailHtml,
} from "../utils/emailTemplates.js";
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
    // Lấy người dùng cũ trước khi cập nhật
    const oldUser = await User.findById(id);
    if (!oldUser) {
      return res.status(404).json({
        success: false,
        message: "Người dùng không tồn tại",
      });
    }

    // Xóa email khỏi dữ liệu request để tránh sửa email
    const { email, ...updateData } = req.body;

    // Cập nhật thông tin người dùng (ngoại trừ email)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    // So sánh dữ liệu cũ và mới để xác định những trường đã thay đổi
    const changes = [];
    for (let key in updateData) {
      if (oldUser[key] !== updatedUser[key]) {
        changes.push({
          field: key,
          oldValue: oldUser[key],
          newValue: updatedUser[key],
        });
      }
    }

    // Nếu có thay đổi, gửi email thông báo
    if (changes.length > 0) {
      // Nếu có thay đổi, gửi email thông báo
      if (changes.length > 0) {
        const { html: emailHtml, text: plainText } =
          generateUpdatedUserEmailHtml(updatedUser.username, changes);
        const emailSubject = "Thông báo cập nhật thông tin tài khoản";

        await sendEmail({
          to: updatedUser.email,
          subject: emailSubject,
          text: plainText,
          html: emailHtml,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
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

export const getAllUsers = async (req, res) => {
  try {
    // Tìm tất cả người dùng và populate thông tin của role
    const users = await User.find({}).populate("role"); // populate

    res.status(200).json({
      success: true,
      message: "Thành công",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Không tìm thấy người dùng",
    });
  }
};

export const getUsersByUserRole = async (req, res) => {
  try {
    // Tìm tất cả user và populate thông tin role
    const allUsers = await User.find().populate('role');

    // Lọc những user có role.name === "user"
    const filteredUsers = allUsers.filter(user => user.role?.name === 'user');

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách người dùng thành công',
      data: filteredUsers,
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách user:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách user',
    });
  }
};
