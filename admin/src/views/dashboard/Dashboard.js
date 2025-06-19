import classNames from 'classnames'
import { useEffect, useState } from 'react'
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

import { getDashboardCount } from '../../services/Api/dashboardService'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [bookingStatusStats, setBookingStatusStats] = useState([])

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
          const percent = Math.round((value / total) * 100)
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
    percent: Math.round((item.count * 100) / totalPartners),
  }))
  .sort(sortByPartnerTypeOrder)

  const serviceTypeStats = (stats?.serviceByPartnerTypeStats || [])
  .map(item => ({
    title: item.name,
    value: item.count,
    icon: getPartnerTypeIcon(item.name),
    percent: Math.round((item.count * 100) / totalServices),
  }))
  .sort(sortByPartnerTypeOrder)

  const progressGroupExample2 = stats
  ? [
      {
        title: 'Đơn khách lẻ',
        icon: cilUser,
        value: stats.totalBookings - stats.totalGroupRequests,
        percent: Math.round(((stats.totalBookings - stats.totalGroupRequests) * 100) / stats.totalBookings),
      },
      {
        title: 'Đơn khách đoàn',
        icon: cilGroup,
        value: stats.totalGroupRequests,
        percent: Math.round((stats.totalGroupRequests * 100) / stats.totalBookings),
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
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">Đối tác</div>
                        <div className="fs-5 fw-semibold">{stats?.totalPartners ?? 'Đang tải...'}</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Dịch vụ</div>
                        <div className="fs-5 fw-semibold">{stats?.totalServices ?? 'Đang tải...'}</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupPartnerTypes.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value} <span className="text-body-secondary small">({item.percent}%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.percent} />
                      </div>
                    </div>
                  ))}

                  <hr className="mt-4" />

                  {serviceTypeStats.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value} <span className="text-body-secondary small">({item.percent}%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="danger" value={item.percent} />
                      </div>
                    </div>
                  ))}

                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Đơn đặt</div>
                        <div className="fs-5 fw-semibold">{stats?.totalBookings ?? 'Đang tải...'}</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Đơn theo đoàn</div>
                        <div className="fs-5 fw-semibold">{stats?.totalGroupRequests ?? 'Đang tải...'}</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {bookingStatusStats.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                  
                  <hr className="mt-4" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.percent}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard