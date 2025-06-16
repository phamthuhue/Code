import { CFormInput, CInputGroup, CInputGroupText, CRow, CCol, CFormSelect } from '@coreui/react'
import { useState } from 'react'

const PartnerTypeFilter = ({ filters, onFilterChange }) => {
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
          <CInputGroupText>Mã khuyễn mãi</CInputGroupText>
          <CFormInput name="name" value={localFilters.name} onChange={handleChange} />
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Loại đơn vị</CInputGroupText>
          <CFormSelect
            name="discountType"
            value={localFilters.discountType}
            onChange={handleChange}
          >
            <option value="">- Tất cả -</option>
            <option value="Phần trăm (%)">Phần trăm (%)</option>
            <option value="VNĐ">VNĐ</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default PartnerTypeFilter