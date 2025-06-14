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
  cilCalendar,
  cilBlur,
  cilCart,
  cilClipboard,
  cilContact,
  cilSpeech,
  cilCommand,
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
    name: 'Quản lý Tour',
    icon: <CIcon icon={cilBlur} customClassName="nav-icon" />,
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
      {
        component: CNavItem,
        name: 'Dịch vụ theo tour',
        to: '/tour-service', // Đường dẫn cho Itinerary
      },
    ],
  },
  {
    component: CNavGroup, // Đổi từ CNavItem sang CNavGroup
    name: 'Quản lý đối tác',
    icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Loại đối tác',
        to: '/partner-type',
      },
      {
        component: CNavItem,
        name: 'Thông tin đối tác',
        to: '/partner',
      },
      {
        component: CNavItem,
        name: 'Dịch vụ',
        to: '/service',
      },
    ],
  },
  {
    component: CNavGroup, // Đổi từ CNavItem sang CNavGroup
    name: 'Quản lý đặt, hủy tour',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Phiếu đặt tour',
        to: '/booking',
      },
      {
        component: CNavItem,
        name: 'Phiếu hủy đặt tour',
        to: '/booking-cancellation', // Đường dẫn cho Itinerary
      },
      {
        component: CNavItem,
        name: 'Phiếu yêu cầu theo đoàn',
        to: '/group-request', // Đường dẫn cho Itinerary
      },
    ],
  },
  {
    component: CNavGroup, // Đổi từ CNavItem sang CNavGroup
    name: 'Quản lý thanh toán',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Quản lý hóa đơn',
        to: '/invoice',
      },
      {
        component: CNavItem,
        name: 'Quản lý khuyến mãi',
        to: '/promotion', // Đường dẫn cho Itinerary
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Quản lý đánh giá',
    to: '/review',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quản lý tài khoản',
    to: '/account',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
