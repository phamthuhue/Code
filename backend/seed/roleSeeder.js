import Role from "../models/Role.js";

export const seedRoles = async () => {
  const count = await Role.countDocuments();
  if (count === 0) {
    await Role.insertMany([{ name: "user" }, { name: "admin" }]);
    console.log("✅ Roles seeded");
  } else {
    console.log("ℹ️ Roles already exist");
  }
};
