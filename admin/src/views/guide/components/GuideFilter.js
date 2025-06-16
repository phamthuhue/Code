import { CFormInput, CInputGroup, CInputGroupText, CRow, CCol, CFormSelect } from '@coreui/react'
import { useState } from 'react'

const GuideFilter = ({ filters, onFilterChange }) => {
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
          <CInputGroupText>Tên hướng dẫn viên</CInputGroupText>
          <CFormInput name="name" value={localFilters.name} onChange={handleChange} />
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

export default GuideFilter
