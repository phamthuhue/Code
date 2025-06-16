import { CFormInput, CInputGroup, CInputGroupText, CRow, CCol, CFormSelect } from '@coreui/react'
import { useState } from 'react'

const BookingFilter = ({ filters, onFilterChange, promotions = [] }) => {
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
          <CInputGroupText>Khuyến mãi</CInputGroupText>
          <CFormSelect name="promotionId" value={localFilters.promotionId} onChange={handleChange}>
            <option value="">Tất cả</option>
            {promotions.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
            <option value="Null">Không áp dụng</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Trạng thái</CInputGroupText>
          <CFormSelect name="status" value={localFilters.status} onChange={handleChange}>
            <option value="">Tất cả</option>
            <option value="Mới tạo">Mới tạo</option>
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Chờ hủy">Chờ hủy</option>
            <option value="Xác nhận">Xác nhận</option>
            <option value="Đã hủy">Đã hủy</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Số điện thoại</CInputGroupText>
          <CFormInput name="phone" value={localFilters.phone} onChange={handleChange} />
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default BookingFilter