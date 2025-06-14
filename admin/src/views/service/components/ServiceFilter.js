import {
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react'
import { useState, useEffect } from 'react'

const ServiceFilter = ({ filters, onFilterChange, partners=[] }) => {
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
          <CInputGroupText>Tên dịch vụ</CInputGroupText>
          <CFormInput name="name" value={localFilters.name} onChange={handleChange} />
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Đối tác cung cấp</CInputGroupText>
          <CFormSelect name="partnerId" value={localFilters.partnerId} onChange={handleChange}>
            <option value="">Tất cả</option>
            {partners.map((partnerId) => (
              <option key={partnerId._id} value={partnerId._id}>
                {partnerId.name}
              </option>
            ))}
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default ServiceFilter