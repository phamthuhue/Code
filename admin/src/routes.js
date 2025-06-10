import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Tour = React.lazy(() => import('./views/tour/Tour'))
const Booking = React.lazy(() => import('./views/booking/Booking'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/tour', name: 'Tour', element: Tour },
  { path: '/booking', name: 'Booking', element: Booking },
  { path: '/itinerary', name: 'Tour', element: Itinerary },
]

export default routes
