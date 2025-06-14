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

const ServiceFormModal = ({ visible, onClose, onSubmit, initialData = null, partners = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unitPrice: '',
    unit: '',
    partnerId: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        unitPrice: initialData.unitPrice || '',
        unit: initialData.unit || '',
        partnerId: initialData.partnerId?._id || '',
      })
    } else {
      setFormData({
        name: '',
        description: '',
        unitPrice: '',
        unit: '',
        partnerId: '',
      })
    }

    if (!visible) setErrors({})
  }, [initialData, visible])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Tên không được để trống'
    if (!formData.description.trim()) newErrors.description = 'Mô tả không được để trống'
    if (!formData.unitPrice) newErrors.unitPrice = 'Giá không được để trống'
    if (!formData.unit.trim()) newErrors.unit = 'Đơn vị không được để trống'
    if (!formData.partnerId) newErrors.partnerId = 'Đối tác không được để trống'
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
      <CModalHeader>{initialData ? 'Chỉnh sửa dịch vụ' : 'Thêm mới dịch vụ'}</CModalHeader>
      <CModalBody>
        <CForm>
            <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="partnerId">Đối tác *</CFormLabel>
              <CFormSelect
                id="partnerId"
                name="partnerId"
                value={formData.partnerId}
                onChange={handleChange}
              >
                <option value="">-- Chọn đối tác --</option>
                {partners.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </CFormSelect>
              {errors.partnerId && <small className="text-danger">{errors.partnerId}</small>}
            </CCol>
          </CRow>
          
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="name">Tên dịch vụ *</CFormLabel>
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
              <CFormLabel htmlFor="address">Mô tả *</CFormLabel>
              <CFormInput
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <small className="text-danger">{errors.description}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="unitPrice">Giá *</CFormLabel>
              <CFormInput
                id="unitPrice"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
              />
              {errors.unitPrice && <small className="text-danger">{errors.unitPrice}</small>}
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="unit">Đơn vị *</CFormLabel>
              <CFormInput
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              />
              {errors.unit && <small className="text-danger">{errors.unit}</small>}
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

export default ServiceFormModal