import {
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react'
import { useState, useEffect } from 'react'

const PartnerFilter = ({ filters, onFilterChange, partnerTypes = [] }) => {
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
          <CInputGroupText>Tên đối tác</CInputGroupText>
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
          <CInputGroupText>Loại đối tác</CInputGroupText>
          <CFormSelect name="type" value={localFilters.type} onChange={handleChange}>
            <option value="">Tất cả</option>
            {partnerTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default PartnerFilter