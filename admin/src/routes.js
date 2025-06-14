import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Tour = React.lazy(() => import('./views/tour/Tour'))
const Booking = React.lazy(() => import('./views/booking/Booking'))
const Itinerary = React.lazy(() => import('./views/itinerary/Itinerary'))
const Guide = React.lazy(() => import('./views/guide/Guide'))
const TourService = React.lazy(() => import('./views/tourService/TourService'))
const PartnerType = React.lazy(() => import('./views/partnerType/partnerType'))
const Partner = React.lazy(() => import('./views/partner/partner'))
const Service = React.lazy(() => import('./views/service/service'))
const Promotion = React.lazy(() => import('./views/promotion/promotion'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
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
]

export default routes
