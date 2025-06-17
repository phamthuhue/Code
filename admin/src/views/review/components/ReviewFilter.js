import {
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react'
import { useState, useEffect } from 'react'

const PartnerFilter = ({ filters, onFilterChange, tours = [], guides = [] }) => {
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
          <CFormInput name="username" value={localFilters.username} onChange={handleChange} />
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Tour</CInputGroupText>
          <CFormSelect name="tourId" value={localFilters.tourId} onChange={handleChange}>
            <option value="">Tất cả</option>
            {tours.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
            <option value="Null">Không áp dụng</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Hướng dẫn viên</CInputGroupText>
          <CFormSelect name="guideId" value={localFilters.guideId} onChange={handleChange}>
            <option value="">Tất cả</option>
            {guides.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default PartnerFilter