import Itinerary from "../models/Itinerary.js";

export const seedItineraries = async (tourId) => {
  await Itinerary.deleteMany({});
  const itinerary = await Itinerary.create({
    tourId: tourId,
    details: [
      { time: "09:00", description: "Tham quan Đại Nội" },
      { time: "14:00", description: "Dạo sông Hương" },
    ],
    notes: ["Mang dù", "Kem chống nắng"],
  });
  console.log("✅ Seeded Itineraries");
  return itinerary;
};
