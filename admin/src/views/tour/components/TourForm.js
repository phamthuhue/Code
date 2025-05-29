import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
  CFormLabel,
  CRow,
  CCol,
} from '@coreui/react'
import { useState, useEffect, useRef } from 'react'
const backendUrl = import.meta.env.VITE_END_POINT_BACKEND_URL
const TourFormModal = ({ visible, onClose, onSubmit, initialData = null }) => {
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: undefined,
    city: undefined,
    price: undefined,
    startDate: undefined,
    endDate: undefined,
    maxGroupSize: undefined,
    avgRating: undefined, // ✅ Bổ sung nếu chưa có
    desc: undefined,
    photo: undefined,
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        startDate: initialData.startDate?.slice(0, 10),
        endDate: initialData.endDate?.slice(0, 10),
      })
    } else {
      const mockTour = {
        title: 'Tour Quảng Ninh 4N3Đ',
        city: 'Quảng Ninh',
        startDate: '2025-07-10T00:00:00.000Z',
        endDate: '2025-07-13T00:00:00.000Z',
        price: 4500000,
        maxGroupSize: 25,
        desc: 'Tour khám phá Quảng Ninh và Hội An tuyệt vời',
        photo: null,
        featured: true,
        guideId: '6835925cedc05facf0fa6c6a',
        avgRating: 4.8,
        createdAt: '2025-05-27T10:22:20.271Z',
        updatedAt: '2025-05-27T10:22:20.271Z',
        __v: 0,
      }
      setFormData(mockTour)
    }
    if (!visible) {
      // Reset errors when the modal is opened
      setErrors({})
    }
  }, [initialData, visible])
  // Xử lý lỗi
  const [errors, setErrors] = useState({})
  const validate = () => {
    const newErrors = {}
    if (!formData.title) newErrors.title = 'Tiêu đề không được để trống'
    if (!formData.city) newErrors.city = 'Thành phố không được để trống'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Giá phải lớn hơn 0'
    if (!formData.maxGroupSize || formData.maxGroupSize <= 0)
      newErrors.maxGroupSize = 'Số lượng phải lớn hơn 0'
    if (!formData.startDate) newErrors.startDate = 'Vui lòng chọn ngày bắt đầu'
    if (!formData.endDate) newErrors.endDate = 'Vui lòng chọn ngày kết thúc'
    if (formData.avgRating !== undefined && (formData.avgRating < 0 || formData.avgRating > 5)) {
      newErrors.avgRating = 'Đánh giá trung bình phải từ 0 đến 5'
    }
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu'
    }
    if (!formData.desc) newErrors.desc = 'Mô tả không được để trống'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const [imageError, setImageError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
      const maxSize = 3 * 1024 * 1024 // 3MB

      if (!allowedTypes.includes(file.type)) {
        setImageError('Chỉ chấp nhận định dạng JPG, JPEG hoặc PNG.')
        return
      }

      if (file.size > maxSize) {
        setImageError('Kích thước ảnh không được vượt quá 3MB.')
        return
      }

      setImageError(null) // Clear lỗi nếu hợp lệ

      setFormData((prev) => ({ ...prev, photo: file }))
    }
  }

  const handleSubmit = () => {
    if (!validate()) return
    const data = new FormData()

    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key])
      }
    }
    // Nếu photo === null nghĩa là user đã xóa ảnh cũ, cần gửi flag cho backend
    if (formData.photo === null) {
      data.append('removePhoto', 'true')
    }
    console.log('formData: ', formData)
    onSubmit(data)
    onClose()
  }

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="lg">
      <CModalHeader>{initialData ? 'Chỉnh sửa tour' : 'Thêm mới tour'}</CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-1">
            <CCol md={12}>
              <CFormLabel htmlFor="title">
                Tiêu đề <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormInput
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mb-1"
              />
              {errors.title && <small className="text-danger">{errors.title}</small>}
            </CCol>
          </CRow>
          <CRow className="mb-1">
            <CCol md={12}>
              <CFormLabel htmlFor="city">
                Thành phố <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormInput
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mb-1"
              />
              {errors.city && <small className="text-danger">{errors.city}</small>}
            </CCol>
          </CRow>
          <CRow className="mb-1">
            <CCol md={12}>
              <CFormLabel htmlFor="price">
                Giá <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormInput
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mb-1"
              />
              {errors.price && <small className="text-danger">{errors.price}</small>}
            </CCol>
          </CRow>
          <CRow className="mb-1">
            <CCol md={6}>
              <CFormLabel htmlFor="maxGroupSize">
                Số lượng tối đa <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormInput
                id="maxGroupSize"
                type="number"
                name="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleChange}
                className="mb-1"
              />
              {errors.maxGroupSize && <small className="text-danger">{errors.maxGroupSize}</small>}
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="avgRating">Đánh giá trung bình (0 - 5)</CFormLabel>
              <CFormInput
                id="avgRating"
                type="number"
                name="avgRating"
                step="0.1"
                min="0"
                max="5"
                value={formData.avgRating}
                onChange={handleChange}
                className="mb-1"
              />
              {errors.avgRating && <small className="text-danger">{errors.avgRating}</small>}
            </CCol>
          </CRow>
          <CRow className="mb-1">
            <CCol md={6}>
              <CFormLabel htmlFor="startDate">
                Ngày bắt đầu <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormInput
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              {errors.startDate && <small className="text-danger">{errors.startDate}</small>}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="endDate">
                Ngày kết thúc <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormInput
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
              {errors.endDate && <small className="text-danger">{errors.endDate}</small>}
            </CCol>
          </CRow>
          <CRow className="mb-1">
            <CCol md={12}>
              <CFormLabel htmlFor="desc">
                Mô tả <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormTextarea
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                className="mb-1"
              />
              {errors.desc && <small className="text-danger">{errors.desc}</small>}
            </CCol>
          </CRow>{' '}
          <CRow className="mb-1">
            <CCol md={6}>
              <CFormLabel htmlFor="photo">Ảnh đại diện</CFormLabel>
              <CFormInput
                ref={fileInputRef}
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imageError && <small className="text-danger">{imageError}</small>}
              {formData.photo && !imageError && (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={
                      typeof formData.photo === 'string'
                        ? `${backendUrl}/${formData.photo}`
                        : URL.createObjectURL(formData.photo)
                    }
                    alt="Tour"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://placehold.co/150x100?text=No+Image&font=roboto'
                    }}
                    style={{
                      maxHeight: '150px',
                      borderRadius: '8px',
                      display: 'block',
                      marginTop: '10px',
                    }}
                  />
                  <CButton
                    color="danger"
                    size="sm"
                    variant="ghost"
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '-30px',
                      padding: '2px 6px',
                      borderRadius: '50%',
                    }}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, photo: null }))
                      fileInputRef.current.value = null // ✅ Reset input file
                    }}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              )}
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Hủy
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          {initialData ? 'Lưu thay đổi' : 'Thêm mới'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default TourFormModal
