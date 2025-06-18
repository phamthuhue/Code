import { CFormInput, CInputGroup, CInputGroupText, CRow, CCol, CFormSelect } from '@coreui/react'
import { useState } from 'react'

const CancellationBookingFilter = ({ filters, onFilterChange}) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleChange = (e) => {
    const { name, value } = e.target
    const updated = { ...localFilters, [name]: value }
    setLocalFilters(updated)
    onFilterChange(updated)
  }

  return (
    <CRow className="mb-3">
      <CCol md={4}>
          <CInputGroup>
            <CInputGroupText>Email KH</CInputGroupText>
            <CFormInput
              name="email"
              value={localFilters.email}
              onChange={handleChange}
            />
          </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Phương thức hoàn</CInputGroupText>
          <CFormSelect name="refundMethod" value={localFilters.refundMethod} onChange={handleChange}>
            <option value="">Tất cả</option>
            <option value="Chuyển khoản">Chuyển khoản</option>
            <option value="Ví điện tử">Ví điện tử</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Trạng thái</CInputGroupText>
          <CFormSelect name="status" value={localFilters.status} onChange={handleChange}>
            <option value="">Tất cả</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đã hoàn">Đã hoàn</option>
            <option value="Hủy">Hủy</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default CancellationBookingFilter