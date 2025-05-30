const mockTours = [
  {
    _id: 'tour1',
    title: 'Khám phá Đà Lạt mộng mơ',
    city: 'Đà Lạt',
    startDate: '2025-07-01',
    endDate: '2025-07-05',
    price: 4500000,
    maxGroupSize: 20,
    desc: 'Tour khám phá thiên nhiên, thác nước, và ẩm thực Đà Lạt ',
    photo: 'http://localhost:3002/tour-images/tour-img01.jpg',
    featured: true,
    guideId: {
      _id: 'guide1',
      name: 'Nguyễn Văn A',
    },
    avgRating: 4.8,
  },
  {
    _id: 'tour2',
    title: 'Hành trình miền Tây sông nước',
    city: 'Cần Thơ',
    startDate: '2025-06-10',
    endDate: '2025-06-13',
    price: 3500000,
    maxGroupSize: 25,
    desc: 'Trải nghiệm chợ nổi, vườn trái cây, và cuộc sống miền Tây',
    photo: 'http://localhost:3002/tour-images/tour-img02.jpg',
    featured: false,
    guideId: {
      _id: 'guide2',
      name: 'Trần Thị B',
    },
    avgRating: 4.5,
  },
  {
    _id: 'tour3',
    title: 'Thám hiểm Sa Pa',
    city: 'Lào Cai',
    startDate: '2025-09-15',
    endDate: '2025-09-20',
    price: 5500000,
    maxGroupSize: 15,
    desc: 'Leo Fansipan, thăm bản làng, và thưởng thức đặc sản vùng cao',
    photo: 'http://localhost:3002/tour-images/tour-img03.jpg',
    featured: true,
    guideId: {
      _id: 'guide3',
      name: 'Phạm Văn C',
    },
    avgRating: 4.9,
  },
  {
    _id: 'tour4',
    title: 'Thám hiểm Sa Pa',
    city: 'Lào Cai',
    startDate: '2025-09-15',
    endDate: '2025-09-20',
    price: 5500000,
    maxGroupSize: 15,
    desc: 'Leo Fansipan, thăm bản làng, và thưởng thức đặc sản vùng cao',
    photo: 'http://localhost:3002/tour-images/tour-img03.jpg',
    featured: true,
    guideId: {
      _id: 'guide3',
      name: 'Phạm Văn C',
    },
    avgRating: 4.9,
  },
]

export default mockTours
