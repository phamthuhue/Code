// mockData.js
// Đây là file mockData.js chứa dữ liệu mẫu cho các model trong ứng dụng
// Mỗi model sẽ có một đối tượng chứa dữ liệu mẫu tương ứng
// 1. Role
const Role = {
    _id: "6832a0b981f79edcf2bdd149",
    name: "user",
};
// 2. User
const User = {
    _id: "6832a0b981f79edcf2bdd14e",
    username: "regular_user",
    email: "1234@gmail.com",
    password: "$2a$10$sG1re3XLJUqYSGzCpb6ac.PebSdxpZY/QymLXnY1CPltbEhQ1W.jS",
    role: "6832a0b981f79edcf2bdd149",
};
// 3. Guide
const Guide = {
    _id: "60d21b4667d0d8992e610c90",
    name: "Nguyễn Văn A",
    age: 32,
    rating: 4.5,
    countRating: 24,
    gender: "Nam",
    dob: new Date("2025-03-15"),
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    phone: "0909123456",
};

// 4. Staff
const Staff = {
    _id: "60d21b4667d0d8992e610cae",
    name: "Trần Minh Quân",
    dob: new Date("2025-03-15"),
    address: "54 Nguyễn Đình Chiểu, Quận 3, TP.HCM",
    phone: "0909777888",
    gender: "Nam",
    email: "quan.tran@tourco.com",
    username: "quantran",
    password: "$2a$10$4fgh2ahgkRopgZfDnJSvseG1Uv6ZQpWkNHsghsYFWTlgHfYxLKqOa", // hash
    role: "6832a0b981f79edcf2bdd149",
    isActive: true,
};

// 5. PartnerType
const PartnerType = {
    _id: "60d21b4667d0d8992e610caa",
    name: "Khách sạn",
    description: "Đối tác chuyên cung cấp dịch vụ lưu trú cho khách tour.",
};

// 6. Partner
const Partner = {
    _id: "60d21b4667d0d8992e610cab",
    name: "Khách sạn Hòa Bình",
    address: "15 Lý Tự Trọng, Quận 1, TP.HCM",
    phone: "02838231234",
    partnerTypeId: "60d21b4667d0d8992e610caa",
};

// 7. Service
const Service = {
    _id: "60d21b4667d0d8992e610cee",
    name: "Đưa đón sân bay",
    description: "Dịch vụ đưa đón khách tại sân bay Tân Sơn Nhất.",
    unitPrice: 500000,
    unit: "lượt",
    partnerId: "60d21b4667d0d8992e610cab",
};
// 8. Tour
const Tour = {
    _id: "60d21b4667d0d8992e610cb5",
    title: "Khám phá Sài Gòn về đêm",
    city: "TP. Hồ Chí Minh",
    startDate: new Date("2025-03-15"),
    endDate: new Date("2025-03-25"),

    price: 3500000,
    maxGroupSize: 15,
    desc: "Tour khám phá các địa điểm nổi bật của Sài Gòn về đêm cùng hướng dẫn viên giàu kinh nghiệm.",
    photos: ["/tour-images/tour-img03.jpg", "/tour-images/tour-img02.jpg"],
    featured: true,
    guideId: "60d21b4667d0d8992e610c90",
    avgRating: 4.7,
};

// 9. Itinerary
const Itinerary = {
    _id: "60d21b4667d0d8992e610ccc",
    tourId: "60d21b4667d0d8992e610cb5",
    details: [
        {
            time: "08:00",
            description:
                "Đón khách tại khách sạn, khởi hành đi tham quan Bưu điện TP.HCM.",
        },
        {
            time: "12:00",
            description: "Dùng bữa trưa tại nhà hàng nổi tiếng Sài Gòn.",
        },
        {
            time: "15:00",
            description: "Tham quan Dinh Độc Lập, Nhà thờ Đức Bà.",
        },
        {
            time: "18:00",
            description: "Thưởng thức Sài Gòn về đêm trên du thuyền Bạch Đằng.",
        },
    ],
    notes: ["Mang theo giấy tờ tùy thân.", "Mặc trang phục lịch sự."],
};

// 10. TourService
const TourService = {
    _id: "60d21b4667d0d8992e610cff",
    tourId: "60d21b4667d0d8992e610cb5",
    services: [
        {
            serviceId: "60d21b4667d0d8992e610cee",
            numberOfPeopl: 4,
            servicePrice: 500000,
            note: "Đưa đón sân bay",
        },
    ],
};
// 11. Booking
const Booking = {
    _id: "60d21b4667d0d8992e610cb0",
    userId: "6832a0b981f79edcf2bdd14e",
    tourId: "60d21b4667d0d8992e610cb5",
    name: "Nguyễn Văn A",
    phone: "0909123456",
    startDate: new Date("2025-03-25"),
    numberOfPeople: 5,
    totalPrice: 7000000,
    status: "Xác nhận",
};

// 12. BookingDetail
const BookingDetail = {
    _id: "60d21b4667d0d8992e610cbb",
    bookingId: "60d21b4667d0d8992e610cb0",
    tourServiceId: "60d21b4667d0d8992e610cff",
    itemType: "Service",
    description: "Dịch vụ đưa đón sân bay",
    quantity: 2,
    unitPrice: 500000,
    totalPrice: 1000000,
};
// 13. Invoice
const Invoice = {
    _id: "60d21b4667d0d8992e610ca1",
    bookingId: "60d21b4667d0d8992e610cb0",
    userId: "6832a0b981f79edcf2bdd14e",
    totalAmount: 7000000,
    discountAmount: 0,
    finalAmount: 7000000,
    paymentStatus: "Đã thanh toán",
};

// 14. BookingCancellation
const BookingCancellation = {
    _id: "60d21b4667d0d8992e610cfa",
    bookingId: "60d21b4667d0d8992e610cb0",
    userId: "6832a0b981f79edcf2bdd14e",
    cancelReason: "Khách bận công việc, không thể tham gia.",
    invoiceId: "60d21b4667d0d8992e610ca1",
    status: "Đã hoàn",
    refundMethod: "Chuyển khoản",
    refundAccountName: "Nguyễn Văn A",
    refundAccountNumber: "123456789",
    refundBankName: "Vietcombank",
};

// 15. Promotion
const Promotion = {
    _id: "60d21b4667d0d8992e610caf",
    name: "GROUP20",
    description: "Ưu đãi 20% cho nhóm từ 5 người trở lên",
    discountType: "percent",
    discountValue: 20,
    staffId: "60d21b4667d0d8992e610cae",
    startDate: new Date("2025-03-25"),
    endDate: new Date("2025-03-25"),
    isActive: true,
};

// 16. Review
const Review = {
    _id: "60d21b4667d0d8992e610cdd",
    userId: "6832a0b981f79edcf2bdd14e",
    ratingTour: 5,
    commentTour: "Tour tuyệt vời, trải nghiệm rất hài lòng!",
    ratingGuide: 5,
    commentGuide: "Hướng dẫn viên nhiệt tình, kiến thức tốt.",
    tourId: "60d21b4667d0d8992e610cb5",
    guideId: "60d21b4667d0d8992e610c90",
    bookingId: "60d21b4667d0d8992e610cb0",
};

// 17. GroupTourRequest
const GroupTourRequest = {
    _id: "60d21b4667d0d8992e610caa",
    customerName: "Phạm Thị Lan",
    email: "lanpham@example.com",
    phone: "0988888888",
    numberOfPeople: 10,
    tourId: "60d21b4667d0d8992e610cb5",
    userId: "6832a0b981f79edcf2bdd14e",
    travelDate: "2024-08-15T08:00:00.000Z",
    specialRequest: "Yêu cầu suất ăn chay cho 2 người.",
    status: "Chờ xử lý",
};
// Export default object chứa tất cả model mock
export default {
    Guide,
    Invoice,
    Itinerary,
    Partner,
    PartnerType,
    Promotion,
    Review,
    Role,
    Service,
    Staff,
    Tour,
    TourService,
    User,
    Booking,
    BookingCancellation,
    BookingDetail,
    GroupTourRequest,
};
