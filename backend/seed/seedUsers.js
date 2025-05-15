import mongoose from "mongoose";
import User from "../models/User.js";
import Role from "../models/Role.js";

import bcryptjs from "bcryptjs";

// Hàm seed user
export const seedUsers = async () => {
  const count = await User.countDocuments();
  if (count > 0) {
    console.log("ℹ️ Users already exist");
    return;
  }

  // Lấy các role có sẵn
  const roles = await Role.find();
  const userRole = roles.find((r) => r.name === "user");
  const adminRole = roles.find((r) => r.name === "admin");

  if (!userRole || !adminRole) {
    console.error("❌ Roles chưa được tạo. Hãy chạy seedRoles trước.");
    return;
  }
  // Hash password
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync("1234", salt);

  const users = [
    {
      username: "regular_user",
      email: "1234@gmail.com",
      password: hash,
      role: userRole._id,
    },
    {
      username: "admin_user",
      email: "admin@gmail.com",
      password: hash,
      role: adminRole._id,
    },
  ];

  await User.insertMany(users);
  console.log("✅ Users seeded");
};
