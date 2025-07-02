import Tour from '../models/Tour.js'
import Guide from '../models/Guide.js'
import Partner from '../models/Partner.js'
import Booking from '../models/Booking.js'
import User from "../models/User.js";
import Service from '../models/Service.js'
import PartnerType from '../models/PartnerType.js'
import GroupTourRequest from '../models/GroupTourRequest.js';
import BookingCancellation from '../models/BookingCancellation.js'
import Promotion from '../models/Promotion.js'
import BookingDetail from '../models/BookingDetail.js'
import Role from '../models/Role.js' // Đừng quên import nếu bạn lọc user theo role

export const getDashboardCount = async (req, res) => {
  try {
    // Lấy role "user"
    const userRole = await Role.findOne({ name: 'user' })
    if (!userRole) {
      return res.status(400).json({ error: 'Không tìm thấy role user' })
    }

    // Thống kê số lượng user role = user
    const userCount = await User.countDocuments({ role: userRole._id })

    // Thống kê số lượng đối tác theo loại
    const partnerByType = await Partner.aggregate([
    {
        $group: {
        _id: '$partnerTypeId', // ID của loại đối tác
        count: { $sum: 1 },
        },
    },
    {
        $lookup: {
        from: 'partnertypes',       // collection name của PartnerType
        localField: '_id',
        foreignField: '_id',
        as: 'typeInfo',
        },
    },
    {
        $unwind: '$typeInfo',
    },
    {
        $project: {
        name: '$typeInfo.name',     // tên loại đối tác
        count: 1,
        },
    },
    ])

    // Thống kê dịch vụ theo loại đối tác
    const serviceByPartnerType = await Service.aggregate([
    {
        $lookup: {
        from: 'partners',
        localField: 'partnerId',
        foreignField: '_id',
        as: 'partnerInfo',
        },
    },
    { $unwind: '$partnerInfo' },
    {
        $lookup: {
        from: 'partnertypes',
        localField: 'partnerInfo.partnerTypeId',
        foreignField: '_id',
        as: 'partnerTypeInfo',
        },
    },
    { $unwind: '$partnerTypeInfo' },
    {
        $group: {
        _id: '$partnerTypeInfo._id',
        name: { $first: '$partnerTypeInfo.name' },
        count: { $sum: 1 },
        },
    },
    ])

    // Tổng số đơn booking
    const totalBookings = await Booking.countDocuments()

    // Lấy thống kê trạng thái đơn đặt
    const statusCounts = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    // Map status sang tiếng Việt
    const statusNameMap = {
      created: 'Mới tạo',
      cancel_requested: 'Chờ hủy',
      pending: 'Chờ xác nhận',
      cancelled: 'Đã hủy',
      confirmed: 'Xác nhận',
    }

    const statusData = statusCounts.map((item) => ({
      name: statusNameMap[item._id] || item._id,
      count: item.count,
    }))

    // Các thống kê khác
    const [
      tourCount,
      serviceCount,
      partnerTypeCount,
      groupRequestCount,
      guideCount,
      partnerCount,
      cancellationCount,
      promotionCount,
    ] = await Promise.all([
      Tour.countDocuments(),
      Service.countDocuments(),
      PartnerType.countDocuments(),
      GroupTourRequest.countDocuments(),
      Guide.countDocuments(),
      Partner.countDocuments(),
      BookingCancellation.countDocuments(),
      Promotion.countDocuments(),
    ])

    res.status(200).json({
      data: {
        totalTours: tourCount,
        totalUsers: userCount,
        totalServices: serviceCount,
        totalPartnerTypes: partnerTypeCount,
        totalGroupRequests: groupRequestCount,
        totalGuides: guideCount,
        totalPartners: partnerCount,
        totalBookings,
        totalCancellations: cancellationCount,
        totalPromotions: promotionCount,
        bookingStatusStats: statusData, // dạng [{ name: 'Mới tạo', count: 12 }, ...]
        partnerByTypeStats: partnerByType,
        serviceByPartnerTypeStats: serviceByPartnerType,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Lỗi khi lấy thống kê dashboard' })
  }
}

export const getTop5MostBookedTours = async (req, res) => {
  try {
    const topTours = await Booking.aggregate([
      {
        $group: {
          _id: '$tourId',
          totalPeople: { $sum: '$numberOfPeople' }, // ✅ tính tổng số người
        },
      },
      {
        $sort: { totalPeople: -1 },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: 'tours',
          localField: '_id',
          foreignField: '_id',
          as: 'tour',
        },
      },
      {
        $unwind: {
          path: '$tour',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          _id: 0,
          tourId: '$_id',
          name: '$tour.title',
          totalPeople: 1,
        },
      },
    ])

    res.status(200).json({ data: topTours })
  } catch (error) {
    console.error('Lỗi khi lấy top 5 tour:', error)
    res.status(500).json({ error: 'Lỗi server khi lấy top 5 tour theo tổng số người' })
  }
}

export const getTop5BookedServices = async (req, res) => {
  try {
    const topServices = await BookingDetail.aggregate([
      {
        $match: { itemType: 'Service' },
      },
      {
        $group: {
          _id: '$description',
          totalBooked: { $sum: '$quantity' },
        },
      },
      {
        $sort: { totalBooked: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          totalBooked: 1,
        },
      },
    ])

    res.status(200).json({ data: topServices })
  } catch (error) {
    console.error('Lỗi khi lấy top 5 dịch vụ:', error)
    res.status(500).json({ error: 'Lỗi server khi lấy top 5 dịch vụ được đặt nhiều nhất' })
  }
}

export const getTop5LeastBookedTours = async (req, res) => {
  try {
    const leastTours = await Booking.aggregate([
      {
        $group: {
          _id: '$tourId',
          totalPeople: { $sum: '$numberOfPeople' },
        },
      },
      {
        $sort: { totalPeople: 1 }, // ✅ ít nhất lên trước
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: 'tours',
          localField: '_id',
          foreignField: '_id',
          as: 'tour',
        },
      },
      {
        $unwind: {
          path: '$tour',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          _id: 0,
          tourId: '$_id',
          name: '$tour.title',
          totalPeople: 1,
        },
      },
    ])

    res.status(200).json({ data: leastTours })
  } catch (error) {
    console.error('Lỗi khi lấy top tour ít người:', error)
    res.status(500).json({ error: 'Lỗi server khi lấy tour ít được đặt nhất' })
  }
}

export const getTop5LeastBookedServices = async (req, res) => {
  try {
    const leastServices = await BookingDetail.aggregate([
      {
        $match: { itemType: 'Service' },
      },
      {
        $group: {
          _id: '$description',
          totalBooked: { $sum: '$quantity' },
        },
      },
      {
        $sort: { totalBooked: 1 }, // ✅ ít nhất lên trước
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          totalBooked: 1,
        },
      },
    ])

    res.status(200).json({ data: leastServices })
  } catch (error) {
    console.error('Lỗi khi lấy dịch vụ ít đặt nhất:', error)
    res.status(500).json({ error: 'Lỗi server khi lấy dịch vụ ít được đặt nhất' })
  }
}

export const getTopCustomersByRevenue = async (req, res) => {
  try {
    const topCustomers = await Booking.aggregate([
      {
        $match: {
          status: { $ne: 'Đã hủy' }, // Loại bỏ đơn đã hủy nếu không tính vào doanh thu
        },
      },
      {
        $group: {
          _id: '$userId',
          totalRevenue: { $sum: '$totalPrice' },
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: '$userInfo',
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          name: '$userInfo.name',
          email: '$userInfo.email',
          phone: '$userInfo.phone',
          totalRevenue: 1,
          totalBookings: 1,
        },
      },
    ])

    res.status(200).json({ data: topCustomers })
  } catch (error) {
    console.error('Lỗi khi lấy top khách hàng:', error)
    res.status(500).json({ error: 'Lỗi server khi lấy top khách hàng theo doanh thu' })
  }
}