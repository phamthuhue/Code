import { CFormInput, CInputGroup, CInputGroupText, CRow, CCol, CFormSelect } from '@coreui/react'
import { useState } from 'react'

const TourFilter = ({ filters, onFilterChange }) => {
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
          <CInputGroupText>Điểm đến</CInputGroupText>
          <CFormInput name="destination" value={localFilters.destination} onChange={handleChange} />
        </CInputGroup>
      </CCol>
      <CCol md={4}>
        <CInputGroup>
          <CInputGroupText>Mức giá tối đa</CInputGroupText>
          <CFormInput
            type="number"
            name="maxPrice"
            value={localFilters.maxPrice}
            onChange={handleChange}
          />
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default TourFilter
