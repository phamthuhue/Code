import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Tour = React.lazy(() => import('./views/tour/Tour'))
const Booking = React.lazy(() => import('./views/booking/Booking'))
const CancellationBooking = React.lazy(() => import('./views/cancellationBooking/cancellationBooking'))
const Itinerary = React.lazy(() => import('./views/itinerary/Itinerary'))
const Guide = React.lazy(() => import('./views/guide/Guide'))
const TourService = React.lazy(() => import('./views/tourService/TourService'))
const PartnerType = React.lazy(() => import('./views/partnerType/partnerType'))
const Partner = React.lazy(() => import('./views/partner/partner'))
const Service = React.lazy(() => import('./views/service/service'))
const Promotion = React.lazy(() => import('./views/promotion/promotion'))
const GroupBooking = React.lazy(() => import('./views/groupBooking/groupBooking'))
const Invoice = React.lazy(() => import('./views/invoice/invoice'))
const Account = React.lazy(() => import('./views/account/account'))
const Review = React.lazy(() => import('./views/review/review'))
const ChangePassword = React.lazy(() => import('./views/pages/changePassword/changePassword'))
const EditProfile = React.lazy(() => import('./views/pages/editProfile/EditProfile'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/edit-profile', name: 'Chỉnh sửa thông tin cá nhân', element: EditProfile },
  { path: '/change-password', name: 'Đổi mật khẩu', element: ChangePassword },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/tour', name: 'Tour', element: Tour },
  { path: '/booking', name: 'Danh sách phiếu đặt', element: Booking },
  { path: '/itinerary', name: 'Lịch trình', element: Itinerary },
  { path: '/guide', name: 'Hướng dẫn viên', element: Guide },
  { path: '/tour-service', name: 'Dịch vụ theo tour', element: TourService },
  { path: '/partner-type', name: 'Loại đối tác', element: PartnerType },
  { path: '/partner', name: 'Đối tác', element: Partner },
  { path: '/service', name: 'Dịch vụ', element: Service },
  { path: '/promotion', name: 'Khuyến mãi', element: Promotion },
  { path: '/group-request', name: 'Danh sách yêu cầu đặt theo đoàn', element: GroupBooking },
  { path: '/invoice', name: 'Danh sách hóa đơn', element: Invoice },
  { path: '/account', name: 'Quản lý tài khoản', element: Account },
  { path: '/review', name: 'Danh sách đánh giá', element: Review },
  { path: '/cancellation-booking', name: 'Danh sách phiếu yêu cầu hủy', element: CancellationBooking },
]

export default routes
