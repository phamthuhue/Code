import Guide from "../models/Guide.js";

export const seedGuides = async (tourId) => {
  await Guide.deleteMany({});
  const guide = await Guide.create({
    name: "Trần Thị B",
    age: 28,
    gender: "Nữ",
    dob: new Date("1997-02-10"),
    address: "456 Trần Hưng Đạo, Hà Nội",
    phone: "0912123456",
    rating: 4.5,
    countRating: 2,
    toursId: [tourId],
  });
  console.log("✅ Seeded Guides");
  return guide;
};
