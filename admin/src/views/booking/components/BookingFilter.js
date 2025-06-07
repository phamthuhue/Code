import { CFormInput, CInputGroup, CInputGroupText, CRow, CCol, CFormSelect } from '@coreui/react'
import { useState } from 'react'

const BookingFilter = ({ filters, onFilterChange }) => {
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
          <CInputGroupText>Họ tên</CInputGroupText>
          <CFormInput name="name" value={localFilters.name} onChange={handleChange} />
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Số điện thoại</CInputGroupText>
          <CFormInput name="phone" value={localFilters.phone} onChange={handleChange} />
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Trạng thái</CInputGroupText>
          <CFormSelect name="status" value={localFilters.status} onChange={handleChange}>
            <option value="">Tất cả</option>
            <option value="new">Mới tạo</option>
            <option value="pending">Đang xử lý</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="cancelled">Đã hủy</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default BookingFilter