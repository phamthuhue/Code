import Tour from "../models/Tour.js";

export const seedTours = async (guideId) => {
    await Tour.deleteMany({});
    const tour = await Tour.create({
        title: "Tour Đà Nẵng 4N3Đ",
        city: "Đà Nẵng",
        startDate: new Date("2025-07-10"),
        endDate: new Date("2025-07-13"),
        price: 4500000,
        maxGroupSize: 25,
        desc: "Tour khám phá Đà Nẵng và Hội An tuyệt vời",
        photo: "danang.jpg",
        featured: true,
        avgRating: 4.8,
        guideId: guideId, // Sử dụng guideId đã được truyền vào
    });
    console.log("✅ Seeded Tours");
    return tour;
};
