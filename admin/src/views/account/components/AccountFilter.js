import { CFormInput, CInputGroup, CInputGroupText, CRow, CCol, CFormSelect } from '@coreui/react'
import { useState, useEffect } from 'react'

const UserFilter = ({ filters, onFilterChange, roles = [] }) => {
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleChange = (e) => {
    const { name, value } = e.target
    const updated = { ...localFilters, [name]: value }
    setLocalFilters(updated)
    onFilterChange(updated)
  }

  return (
    <CRow className="mb-3">
      <CCol md={3}>
        <CInputGroup>
          <CInputGroupText>Tên người dùng</CInputGroupText>
          <CFormInput name="username" value={localFilters.username} onChange={handleChange} />
        </CInputGroup>
      </CCol>

      <CCol md={3}>
        <CInputGroup>
          <CInputGroupText>Email</CInputGroupText>
          <CFormInput name="email" value={localFilters.email} onChange={handleChange} />
        </CInputGroup>
      </CCol>

      <CCol md={3}>
        <CInputGroup>
          <CInputGroupText>Giới tính</CInputGroupText>
          <CFormSelect name="gender" value={localFilters.gender} onChange={handleChange}>
            <option value="">-- Tất cả --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>

      <CCol md={3}>
        <CInputGroup>
          <CInputGroupText>Vai trò</CInputGroupText>
          <CFormSelect name="role" value={localFilters.role} onChange={handleChange}>
            <option value="">-- Tất cả --</option>
            <option value="user">Người dùng</option>
            <option value="admin">Quản trị viên</option>
            <option value="staff">Nhân viên</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

export default UserFilter
