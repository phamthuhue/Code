import {
  CModal,
  CModalHeader,
  CModalBody,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import { useState, useEffect } from 'react'

const PartnerFormModal = ({ visible, onClose, onSubmit, initialData = null, partnerTypes = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    partnerTypeId: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        address: initialData.address || '',
        phone: initialData.phone || '',
        partnerTypeId: initialData.partnerTypeId?._id || '',
      })
    } else {
      setFormData({
        name: '',
        address: '',
        phone: '',
        partnerTypeId: '',
      })
    }

    if (!visible) setErrors({})
  }, [initialData, visible])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Tên không được để trống'
    if (!formData.address.trim()) newErrors.address = 'Địa chỉ không được để trống'
    if (!formData.phone.trim()) newErrors.phone = 'Số điện thoại không được để trống'
    if (!formData.partnerTypeId) newErrors.partnerTypeId = 'Loại đối tác không được để trống'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit(formData)
    onClose()
  }

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="lg">
      <CModalHeader>{initialData ? 'Chỉnh sửa đối tác' : 'Thêm mới đối tác'}</CModalHeader>
      <CModalBody>
        <CForm>
            <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="partnerTypeId">Loại đối tác *</CFormLabel>
              <CFormSelect
                id="partnerTypeId"
                name="partnerTypeId"
                value={formData.partnerTypeId}
                onChange={handleChange}
              >
                <option value="">-- Chọn loại đối tác --</option>
                {partnerTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </CFormSelect>
              {errors.partnerTypeId && <small className="text-danger">{errors.partnerTypeId}</small>}
            </CCol>
          </CRow>
          
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="name">Tên đối tác *</CFormLabel>
              <CFormInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="address">Địa chỉ *</CFormLabel>
              <CFormInput
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="phone">Số điện thoại *</CFormLabel>
              <CFormInput
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>

      <div className="d-flex justify-content-end p-3">
        <CButton color="secondary" onClick={onClose} className="me-2">
          Hủy
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          {initialData ? 'Lưu thay đổi' : 'Thêm mới'}
        </CButton>
      </div>
    </CModal>
  )
}

export default PartnerFormModal