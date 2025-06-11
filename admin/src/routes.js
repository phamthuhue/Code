import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Tour = React.lazy(() => import('./views/tour/Tour'))
const Booking = React.lazy(() => import('./views/booking/Booking'))
const Itinerary = React.lazy(() => import('./views/itinerary/Itinerary'))
const Guide = React.lazy(() => import('./views/guide/Guide'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/tour', name: 'Tour', element: Tour },
  { path: '/booking', name: 'Danh sách phiếu đặt', element: Booking },
  { path: '/itinerary', name: 'Lịch trình', element: Itinerary },
  { path: '/guide', name: 'Hướng dẫn viên', element: Guide },
]

export default routes
