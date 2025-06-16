import {
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react'
import { useState, useEffect } from 'react'

const GroupBookingFilter = ({ filters, onFilterChange, tours = [] }) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleChange = (e) => {
    const { name, value } = e.target
    const updated = { ...localFilters, [name]: value }
    setLocalFilters(updated)
    onFilterChange(updated)
  }

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  return (
    <div className="mb-3">
      <CRow className="mb-2">
        <CCol md={4}>
          <CInputGroup>
            <CInputGroupText>Tên KH</CInputGroupText>
            <CFormInput
              name="customerName"
              value={localFilters.customerName}
              onChange={handleChange}
            />
          </CInputGroup>
        </CCol>
        <CCol md={4}>
          <CInputGroup>
            <CInputGroupText>Điện thoại</CInputGroupText>
            <CFormInput
              name="phone"
              value={localFilters.phone}
              onChange={handleChange}
            />
          </CInputGroup>
        </CCol>
        <CCol md={4}>
          <CInputGroup>
            <CInputGroupText>Email</CInputGroupText>
            <CFormInput
              name="email"
              value={localFilters.email}
              onChange={handleChange}
            />
          </CInputGroup>
        </CCol>
      </CRow>

      <CRow>
        <CCol md={4}>
          <CInputGroup>
            <CInputGroupText>Tour</CInputGroupText>
            <CFormSelect
              name="tourId"
              value={localFilters.tourId}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              {tours.map((tour) => (
                <option key={tour._id} value={tour._id}>
                  {tour.title}
                </option>
              ))}
            </CFormSelect>
          </CInputGroup>
        </CCol>
      </CRow>
    </div>
  )
}

export default GroupBookingFilter