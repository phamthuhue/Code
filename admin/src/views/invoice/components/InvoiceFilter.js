import {
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react'
import { useState, useEffect } from 'react'

const PartnerFilter = ({ filters, onFilterChange, promotions = [] }) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleChange = (e) => {
    const { name, value } = e.target
    const updated = { ...localFilters, [name]: value }
    setLocalFilters(updated)
    onFilterChange(updated)
  }

  useEffect(() => {
    setLocalFilters(filters) // Cập nhật nếu filters thay đổi từ bên ngoài
  }, [filters])

  return (
    <CRow className="mb-3">
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Tên KH</CInputGroupText>
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
            <option value="Chưa thanh toán">Chưa thanh toán</option>
            <option value="Đã thanh toán">Đã thanh toán</option>
            <option value="Đã hoàn tiền">Đã hoàn tiền</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default PartnerFilter