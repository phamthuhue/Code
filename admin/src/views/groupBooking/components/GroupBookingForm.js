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
  CFormTextarea,
} from '@coreui/react'
import { useState, useEffect } from 'react'

const GroupBookingForm = ({ visible, onClose, onSubmit, initialData = null, tours = [] }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    numberOfPeople: '',
    tourId: '',
    specialRequest: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        customerName: initialData.customerName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        numberOfPeople: initialData.numberOfPeople || '',
        tourId: initialData.tourId?._id || '',
        specialRequest: initialData.specialRequest || '',
      })
    } else {
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        numberOfPeople: '',
        tourId: '',
        specialRequest: '',
      })
    }
    if (!visible) setErrors({})
  }, [initialData, visible])

  const validate = () => {
    const newErrors = {}
    if (!formData.customerName.trim()) newErrors.customerName = 'Tên khách hàng không được để trống'
    if (!formData.email.trim()) newErrors.email = 'Email không được để trống'
    if (!formData.phone.trim()) newErrors.phone = 'Số điện thoại không được để trống'
    if (!formData.numberOfPeople) newErrors.numberOfPeople = 'Số người không được để trống'
    if (!formData.tourId) newErrors.tourId = 'Vui lòng chọn tour'
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
      <CModalHeader>{initialData ? 'Chỉnh sửa yêu cầu đặt tour nhóm' : 'Yêu cầu đặt tour nhóm'}</CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="customerName">Tên khách hàng *</CFormLabel>
              <CFormInput
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />
              {errors.customerName && <small className="text-danger">{errors.customerName}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="email">Email *</CFormLabel>
              <CFormInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </CCol>

            <CCol md={6}>
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

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="numberOfPeople">Số lượng người *</CFormLabel>
              <CFormInput
                id="numberOfPeople"
                name="numberOfPeople"
                type="number"
                min={1}
                value={formData.numberOfPeople}
                onChange={handleChange}
              />
              {errors.numberOfPeople && <small className="text-danger">{errors.numberOfPeople}</small>}
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="tourId">Tour *</CFormLabel>
              <CFormSelect
                id="tourId"
                name="tourId"
                value={formData.tourId}
                onChange={handleChange}
              >
                <option value="">-- Chọn tour --</option>
                {tours.map((tour) => (
                  <option key={tour._id} value={tour._id}>
                    {tour.name}
                  </option>
                ))}
              </CFormSelect>
              {errors.tourId && <small className="text-danger">{errors.tourId}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="specialRequest">Yêu cầu đặc biệt</CFormLabel>
              <CFormTextarea
                id="specialRequest"
                name="specialRequest"
                rows={3}
                value={formData.specialRequest}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>

      <div className="d-flex justify-content-end p-3">
        <CButton color="secondary" onClick={onClose} className="me-2">
          Hủy
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          {initialData ? 'Lưu thay đổi' : 'Gửi yêu cầu'}
        </CButton>
      </div>
    </CModal>
  )
}

export default GroupBookingForm