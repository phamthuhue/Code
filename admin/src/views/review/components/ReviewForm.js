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
import { CFormTextarea } from '@coreui/react'

const ReviewFormModal = ({
  visible,
  onClose,
  onSubmit,
  initialData = null,
  users = [],
  bookings = [],
  tours = [],
  guides = [],
}) => {
  const [formData, setFormData] = useState({
    userId: { username: '', email: '' },
    tourId: { title: '' },
    guideId: { name: '' },
    ratingTour: '',
    commentTour: '',
    ratingGuide: '',
    commentGuide: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        userId: initialData.userId || { username: '', email: '' },
        tourId: initialData.tourId || { title: '' },
        guideId: initialData.guideId || { name: '' },
        ratingTour: initialData.ratingTour || '',
        commentTour: initialData.commentTour || '',
        ratingGuide: initialData.ratingGuide || '',
        commentGuide: initialData.commentGuide || '',
      })
    } else {
      setFormData({
        userId: { username: '', email: '' },
        tourId: { title: '' },
        guideId: { name: '' },
        ratingTour: '',
        commentTour: '',
        ratingGuide: '',
        commentGuide: '',
      })
    }

    if (!visible) setErrors({})
  }, [initialData, visible])


  const validate = () => {
    const newErrors = {}
    if (formData.ratingTour === '' || formData.ratingTour < 0 || formData.ratingTour > 5) {
      newErrors.ratingTour = 'Điểm đánh giá tour từ 0 đến 5'
    }
    if (formData.ratingGuide === '' || formData.ratingGuide < 0 || formData.ratingGuide > 5) {
      newErrors.ratingGuide = 'Điểm đánh giá hướng dẫn viên từ 0 đến 5'
    }
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
      <CModalHeader>{initialData ? 'Chỉnh sửa đánh giá' : 'Thêm đánh giá mới'}</CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Tên KH *</CFormLabel>
              <CFormInput type="text" name="username" value={formData.userId.username} onChange={handleChange} disabled/>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Email KH *</CFormLabel>
              <CFormInput type="email" name="email" value={formData.userId.email} onChange={handleChange} disabled/>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Tour *</CFormLabel>
              <CFormInput type="text" name="tourId" value={formData.tourId.title} onChange={handleChange} disabled/>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Hướng dẫn viên *</CFormLabel>
              <CFormInput type="text" name="guideId" value={formData.guideId.name} onChange={handleChange} disabled/>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Đánh giá Tour (0-5) *</CFormLabel>
              <CFormInput type="number" name="ratingTour" value={formData.ratingTour} onChange={handleChange} />
              {errors.ratingTour && <small className="text-danger">{errors.ratingTour}</small>}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Đánh giá HDV (0-5) *</CFormLabel>
              <CFormInput type="number" name="ratingGuide" value={formData.ratingGuide} onChange={handleChange} />
              {errors.ratingGuide && <small className="text-danger">{errors.ratingGuide}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Bình luận Tour</CFormLabel>
              <CFormTextarea
                id="commentTour"
                name="commentTour"
                value={formData.commentTour}
                onChange={handleChange}
                className="mb-1"
              />
              {/* <CFormInput name="commentTour" value={formData.commentTour} onChange={handleChange} /> */}
            </CCol>
            <CCol md={6}>
              <CFormLabel>Bình luận HDV</CFormLabel>
              <CFormTextarea
                id="commentGuide"
                name="commentGuide"
                value={formData.commentGuide}
                onChange={handleChange}
                className="mb-1"
              />
              {/* <CFormInput name="commentGuide" value={formData.commentGuide} onChange={handleChange} /> */}
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

export default ReviewFormModal