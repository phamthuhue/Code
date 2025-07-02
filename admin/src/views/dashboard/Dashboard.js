import classNames from 'classnames'
import { useEffect, useState } from 'react'
import PieChartComponent from './PieChartComponent'
import BarChartComponent from './BarChartComponent'
import DualBarChart from './DualBarChart'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilUserFemale,
  cilPlus,
  cilBan,
  cilClock,
  cilXCircle,
  cilCheckCircle,
  cilGroup,
  cilFactory,
  cilBuilding,
  cilHome,
  cilTruck,
} from '@coreui/icons'

import { getDashboardCount, getTop5Tours, getTop5Services, getLeast5Tours, getLeast5Services, getTopCustomers } from '../../services/Api/dashboardService'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [bookingStatusStats, setBookingStatusStats] = useState([])
  const [topTours, setTopTours] = useState([])
  const [topServices, setTopServices] = useState([])
  const [leastTours, setLeastTours] = useState([])
  const [leastServices, setLeastServices] = useState([])
  const [topCustomers, setTopCustomers] = useState([])

  const fetchTopCustomers = async () => {
    const res = await getTopCustomers()
    return res.data.data
  }

  const fetchTop5Tours = async () => {
    const res = await getTop5Tours()
    return res.data.data
  }

  const fetchTop5Services = async () => {
    const res = await getTop5Services()
    return res.data.data
  }

  const fetchLeast5Tours = async () => {
    const res = await getLeast5Tours()
    return res.data.data
  }

  const fetchLeast5Services = async () => {
    const res = await getLeast5Services()
    return res.data.data
  }

  useEffect(() => {
    const fetchTopStats = async () => {
      try {
        const [topToursData, topServicesData, leastToursData, leastServicesData, topCustomersData] = await Promise.all([
          fetchTop5Tours(),
          fetchTop5Services(),
          fetchLeast5Tours(),
          fetchLeast5Services(),
          fetchTopCustomers()
        ])
        setTopTours(topToursData)
        setTopServices(topServicesData)
        setLeastTours(leastToursData)
        setLeastServices(leastServicesData)
        setTopCustomers(topCustomersData)
      } catch (error) {
        console.error('Lỗi khi load top/least tours/services:', error)
      }
    }

    fetchTopStats()
  }, []) // ✅ chỉ gọi 1 lần khi component mount

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardCount()
        const data = res.data.data
        setStats(data)

        const total = data.totalBookings || 1

        const statusWithExtras = [
          { name: 'Mới tạo', icon: cilPlus },
          { name: 'Chờ xác nhận', icon: cilClock },
          { name: 'Xác nhận', icon: cilCheckCircle },
          { name: 'Chờ hủy', icon: cilBan },
          { name: 'Đã hủy', icon: cilXCircle },
        ]

        const statusMap = Object.fromEntries(data.bookingStatusStats.map(item => [item.name, item.count]))

        const finalStats = statusWithExtras.map(item => {
          const value = statusMap[item.name] || 0
          const percent = Number(((value / total) * 100).toFixed(2))
          return {
            title: item.name,
            value,
            percent,
            icon: item.icon,
          }
        })

        setBookingStatusStats(finalStats)
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu dashboard:', err)
      }
    }

    fetchStats()
  }, [])

  const groupRate = stats?.totalBookings
    ? (stats.totalGroupRequests / stats.totalBookings) * 100
    : 0

  const progressExample = stats
    ? [
        { title: 'Tổng số Tour', value: `${stats.totalTours} tours`, percent: 100, color: 'success' },
        { title: 'Hướng dẫn viên', value: `${stats.totalGuides} người`, percent: 100, color: 'info' },
        { title: 'Khách hàng', value: `${stats.totalUsers} người`, percent: 100, color: 'warning' },
        { title: 'Đối tác', value: `${stats.totalPartners} đơn vị`, percent: 100, color: 'purple' },
        { title: 'Khuyến mãi', value: `${stats.totalPromotions} loại`, percent: 100, color: 'danger' },
      ]
  : []

  const partnerTypeStats = stats?.partnerByTypeStats || []
  const totalPartners = stats?.totalPartners || 1
  const totalServices = stats?.totalServices || 1

  const getPartnerTypeIcon = (typeName) => {
    switch (typeName.toLowerCase()) {
      case 'khách sạn, nhà nghỉ':
        return cilHome
      case 'nhà hàng':
        return cilBuilding
      case 'phương tiện di chuyển':
        return cilTruck
      default:
        return cilFactory
    }
  }
  const orderedPartnerTypes = ['Nhà hàng', 'Khách sạn, Nhà nghỉ', 'Phương tiện di chuyển']
  const sortByPartnerTypeOrder = (a, b) => {
    const indexA = orderedPartnerTypes.indexOf(a.title || a.name)
    const indexB = orderedPartnerTypes.indexOf(b.title || b.name)
    return (indexA !== -1 ? indexA : 999) - (indexB !== -1 ? indexB : 999)
  }

  const progressGroupPartnerTypes = partnerTypeStats
  .map((item) => ({
    title: item.name,
    icon: getPartnerTypeIcon(item.name),
    value: item.count,
    percent: Number(((item.count * 100) / totalPartners).toFixed(2)),
  }))
  .sort(sortByPartnerTypeOrder)

  const serviceTypeStats = (stats?.serviceByPartnerTypeStats || [])
  .map(item => ({
    title: item.name,
    value: item.count,
    icon: getPartnerTypeIcon(item.name),
    percent: Number(((item.count * 100) / totalServices).toFixed(2)),
  }))
  .sort(sortByPartnerTypeOrder)

  const progressGroupExample2 = stats
  ? [
      {
        title: 'Đơn khách lẻ',
        icon: cilUser,
        value: stats.totalBookings - stats.totalGroupRequests,
        percent: Number((((stats.totalBookings - stats.totalGroupRequests) * 100) / stats.totalBookings).toFixed(2))
      },
      {
        title: 'Đơn khách đoàn',
        icon: cilGroup,
        value: stats.totalGroupRequests,
        percent: Number(((stats.totalGroupRequests * 100) / stats.totalBookings).toFixed(2))
      },
    ]
  : []

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">Thống kê</h4>
              <div className="small text-body-secondary">2025</div>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({ 'd-none d-xl-block': index + 1 === items.length })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">{item.value}</div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <CRow>
  <CCol xs={12}>
    <CCard className="mb-4">
      <CCardHeader>Top Khách hàng theo Tổng doanh thu và Số đơn đặt</CCardHeader>
      <CCardBody style={{ height: '400px' }}>
        <DualBarChart data={topCustomers} />
      </CCardBody>
    </CCard>
  </CCol>
</CRow>

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>Top Tour được đặt nhiều nhất</CCardHeader>
            <CCardBody style={{ height: '350px' }}>
              <BarChartComponent data={topTours} dataKey="totalPeople" nameKey="name" barColor="#28a745" />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>Top Tour ít đặt nhất</CCardHeader>
            <CCardBody style={{ height: '350px' }}>
              <BarChartComponent data={leastTours} dataKey="totalPeople" nameKey="name" barColor="#dc3545" />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>Top Dịch vụ được đặt nhiều nhất</CCardHeader>
            <CCardBody style={{ height: '350px' }}>
              <BarChartComponent data={topServices} dataKey="totalBooked" nameKey="name" barColor="#4dabf7" />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>Top Dịch vụ ít đặt nhất</CCardHeader>
            <CCardBody style={{ height: '350px' }}>
              <BarChartComponent data={leastServices} dataKey="totalBooked" nameKey="name" barColor="#fd7e14" />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} md={6} xl={6}>
          <CCard className="mb-4">
            <CCardHeader>Đơn đặt theo trạng thái</CCardHeader>
            <CCardBody>
              <PieChartComponent data={bookingStatusStats} />
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>Đơn khách lẻ / đoàn</CCardHeader>
            <CCardBody>
              <PieChartComponent data={progressGroupExample2} />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={6} xl={6}>
          <CCard className="mb-4">
            <CCardHeader>Đối tác theo loại</CCardHeader>
            <CCardBody>
              <PieChartComponent data={progressGroupPartnerTypes} />
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>Dịch vụ theo loại đối tác</CCardHeader>
            <CCardBody>
              <PieChartComponent data={serviceTypeStats} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard