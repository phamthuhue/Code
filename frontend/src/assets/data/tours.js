import tourImg01 from "../images/hoian.jpeg";
import tourImg02 from "../images/daocatba.jpg";
import tourImg03 from "../images/sapa.jpeg";
import tourImg04 from "../images/trangan.jpg";
import tourImg05 from "../images/codohue.jpeg";
import tourImg06 from "../images/daoLySon.jpeg";
import tourImg07 from "../images/bandaosontra.jpeg";
import tourImg08 from "../images/phuquoc.jpg";

export const tours = [
  {
    id: "01",
    title: "Phố cổ Hội An",
    city: "Đà Nẵng",
    date:"15/01/2025",
    price: 2500000,
    maxGroupSize: 30,
    desc: "Khám phá Hội An cùng tour mới của VietnamTours - nơi di sản văn hóa hòa quyện với vẻ đẹp yên bình, mang đến trải nghiệm khó quên.",
    reviews: [
      {
        name: "Huê Phạm",
        rating: 4.6,
        reviewText:"Cảnh thác thật tuyệt vời, tôi rất thích không khí trong lành ở đây!",
        createdAt: "2024-5-15",
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "Đảo Cát Bà",
    city: "Hải Phòng",
    date:"15/01/2025",
    price: 2000000,
    maxGroupSize: 25,
    desc: "Tận hưởng vẻ đẹp hoang sơ và yên bình của Cát Bà, với bãi biển tuyệt đẹp và những ngọn núi xanh mướt, lý tưởng cho các hoạt động khám phá thiên nhiên và thư giãn.",
    reviews: [
      {
        name: "Huê Phạm",
        rating: 4.6,
        reviewText:"Cảnh thác thật tuyệt vời, tôi rất thích không khí trong lành ở đây!",
        createdAt: "2024-5-15",
      },
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "SaPa",
    city: "Lào Cai",
    date:"15/01/2025",
    price: 2200000,
    maxGroupSize: 30,
    desc: "Du lịch Sapa để chiêm ngưỡng cảnh sắc núi rừng Tây Bắc, với những thửa ruộng bậc thang và những bản làng dân tộc độc đáo, là điểm đến lý tưởng cho những ai muốn hòa mình vào thiên nhiên và văn hóa miền núi.",
    reviews: [
      {
        name: "Huê Phạm",
        rating: 4.6,
        reviewText:"Cảnh thác thật tuyệt vời, tôi rất thích không khí trong lành ở đây!",
        createdAt: "2024-5-15",
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Tràng An",
    city: "Ninh Bình",
    date:"15/01/2025",
    price: 1800000,
    maxGroupSize: 20,
    desc: "Hành trình đến Tràng An, nơi được mệnh danh là “vịnh Hạ Long trên cạn”, với các hang động kỳ bí và cảnh quan hùng vĩ, mang đến trải nghiệm thú vị cho những người yêu thích khám phá.",
    reviews: [
      {
        name: "Huê Phạm",
        rating: 4.6,
        reviewText:"Cảnh thác thật tuyệt vời, tôi rất thích không khí trong lành ở đây!",
        createdAt: "2024-5-15",
      },
    ],
    avgRating: 4.5,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "05",
    title: "Cố Đô Huế",
    city: "Huế",
    date:"15/01/2025",
    price: 3500000,
    maxGroupSize: 28,
    desc: "Du ngoạn Cố Đô Huế, nơi lưu giữ những giá trị văn hóa, lịch sử với các công trình kiến trúc cổ kính như Đại Nội, lăng tẩm vua chúa, sẽ đưa bạn trở về một thời kỳ huy hoàng của đất nước.",
    reviews: [
      {
        name: "Huê Phạm",
        rating: 4.6,
        reviewText:"Cảnh thác thật tuyệt vời, tôi rất thích không khí trong lành ở đây!",
        createdAt: "2024-5-15",
      },
    ],
    avgRating: 4.5,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "06",
    title: "Đảo Lý Sơn",
    city: "Quảng Ngãi",
    date:"15/01/2025",
    price: 3000000,
    maxGroupSize: 25,
    desc: "Đảo Lý Sơn, nổi bật với cảnh quan biển đảo hoang sơ và những di tích lịch sử độc đáo, mang đến cho bạn một chuyến đi đáng nhớ với thiên nhiên kỳ thú và văn hóa đặc sắc.",
    reviews: [
      {
        name: "Huê Phạm",
        rating: 4.6,
        reviewText:"Cảnh thác thật tuyệt vời, tôi rất thích không khí trong lành ở đây!",
        createdAt: "2024-5-15",
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "Bán Đảo Sơn Trà",
    city: "Đà Nẵng",
    date:"15/01/2025",
    price: 3200000,
    maxGroupSize: 20,
    desc: "Tham gia tour Bán Đảo Sơn Trà để chiêm ngưỡng cảnh quan biển cả và núi rừng tuyệt đẹp, cũng như khám phá hệ sinh thái đa dạng với những loài động vật quý hiếm.",
    reviews: [
      {
        name: "Huê Phạm",
        rating: 4.6,
        reviewText:"Cảnh thác thật tuyệt vời, tôi rất thích không khí trong lành ở đây!",
        createdAt: "2024-5-15",
      },
    ],
    avgRating: 4.5,
    photo: tourImg07,
    featured: false,
  },
  {
    id: "08",
    title: "Đảo Phú Quốc",
    city: "Kiên Giang",
    date:"15/01/2025",
    price: 3500000,
    maxGroupSize: 25,
    desc: "Khám phá Phú Quốc với bãi biển dài trắng mịn, làn nước trong xanh và hệ sinh thái biển phong phú, nơi bạn có thể thỏa sức tắm biển, thưởng thức hải sản tươi ngon và thư giãn.",
    reviews: [
      {
        name: "Huê Phạm",
        rating: 4.6,
        reviewText:"Cảnh thác thật tuyệt vời, tôi rất thích không khí trong lành ở đây!",
        createdAt: "2024-5-15",
      },
    ],
    avgRating: 4.5,
    photo: tourImg08,
    featured: false,
  },
];

