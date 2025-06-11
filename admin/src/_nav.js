import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup, // Đổi từ CNavItem sang CNavGroup
    name: 'Thông tin Tour',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách tour',
        to: '/tour',
      },
      {
        component: CNavItem,
        name: 'Lịch trình',
        to: '/itinerary', // Đường dẫn cho Itinerary
      },
      {
        component: CNavItem,
        name: 'Hướng dẫn viên',
        to: '/guide', // Đường dẫn cho Itinerary
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Danh sách phiếu đặt',
    to: '/booking',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
