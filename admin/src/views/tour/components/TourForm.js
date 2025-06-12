import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormSelect } from '@coreui/react'
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
import './tour.scss'
import { useState, useEffect, useRef } from 'react'
const backendUrl = import.meta.env.VITE_END_POINT_BACKEND_URL
const TourFormModal = ({ visible, onClose, onSubmit, initialData = null, guides = [] }) => {
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
    guideId: undefined,
    photos: [],
  })
  // Xử lý ảnh xóa
  const [removedPhotos, setRemovedPhotos] = useState([])
  const handleRemovePhoto = (index) => {
    setFormData((prev) => {
      const newPhotos = [...prev.photos]
      const removed = newPhotos.splice(index, 1)[0]
      if (typeof removed === 'string') {
        // Ảnh cũ bị xóa -> lưu lại để gửi lên backend xóa file
        setRemovedPhotos((prevRemoved) => [...prevRemoved, removed])
      }
      return { ...prev, photos: newPhotos }
    })
  }
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        startDate: initialData.startDate?.slice(0, 10),
        endDate: initialData.endDate?.slice(0, 10),
      })
      setRemovedPhotos([]) // reset ảnh đã xóa khi mở modal
    } else {
      const mockTour = {
        title: 'Tour Quảng Ninh 4N3Đ',
        city: 'Quảng Ninh',
        startDate: '2025-07-10T00:00:00.000Z',
        endDate: '2025-07-13T00:00:00.000Z',
        price: 4500000,
        maxGroupSize: 25,
        desc: 'Tour khám phá Quảng Ninh và Hội An tuyệt vời',
        photos: [],
        featured: true,
        guideId: '',
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
    if (!formData.guideId) newErrors.guideId = 'Hướng dẫn viên không được để trống'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const [imageError, setImageError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    console.log('files: ', files)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    const maxSize = 3 * 1024 * 1024 // 3MB
    const newErrors = []
    const validFiles = []

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        newErrors.push(`${file.name}: Định dạng không hợp lệ`)
        continue
      }
      if (file.size > maxSize) {
        newErrors.push(`${file.name}: Kích thước vượt quá 3MB`)
        continue
      }
      validFiles.push(file)
    }
    if (validFiles.length + formData.photos.length > 5) {
      setImageError('Tối đa chỉ được chọn 5 ảnh.')
      return
    }
    setImageError(newErrors.join(', ') || null)
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...validFiles],
    }))
  }

  const handleSubmit = () => {
    if (!validate()) return
    const data = new FormData()

    for (const key in formData) {
      if (key === 'photos') {
        // Gửi ảnh mới (File object)
        formData.photos.forEach((file) => {
          if (file instanceof File) data.append('photos', file)
        })
      } else if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key])
      }
    }

    // Gửi danh sách ảnh cũ đã xóa (dạng JSON string)
    console.log('removedPhotos: ', removedPhotos)
    if (removedPhotos.length > 0) {
      removedPhotos.forEach((photo) => {
        data.append('removedPhotos', photo.replace(/\\/g, '/')) // Normalize luôn
      })
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
                      <CCol md={12}>
              <CFormLabel htmlFor="guideId">Hướng dẫn viên *</CFormLabel>
              <CFormSelect
                id="guideId"
                name="guideId"
                disabled={!!initialData}
                value={formData.guideId}
                onChange={handleChange}
              >
                <option value="">-- Chọn hướng dẫn viên --</option>
                {guides.map((guide) => (
                  <option key={guide._id} value={guide._id}>
                    {guide.name}
                  </option>
                ))}
              </CFormSelect>
              {errors.guideId && <small className="text-danger">{errors.guideId}</small>}
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
          </CRow>
          {/*  Xử lý ảnh đại diện */}
          <CRow className="mb-1">
            <CCol md={6}>
              <CFormLabel htmlFor="photo">
                Danh sách ảnh{' '}
                <span className="text-muted ms-2" style={{ fontSize: '0.85rem' }}>
                  (Tối đa 5 ảnh)
                </span>{' '}
              </CFormLabel>
              <CFormInput
                ref={fileInputRef}
                id="photos"
                type="file"
                accept="image/*"
                multiple
                disabled={formData.photos.length >= 5}
                title="Chỉ chọn tối đa 5 ảnh"
                onChange={handleImageChange}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12}>
              {formData.photos.length > 0 && (
                <span
                  className={`mt-1 ${formData.photos.length >= 5 ? 'text-warning' : 'text-muted'}`}
                  style={{ fontSize: '0.85rem' }}
                >
                  Đã chọn {formData.photos.length}/5 ảnh.
                </span>
              )}
              {imageError && <small className="text-danger">{imageError}</small>}
              {formData.photos && !imageError && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {formData.photos.map((file, index) => (
                    <div
                      key={index}
                      className="image-wrapper"
                      style={{
                        position: 'relative',
                        display: 'inline-block',
                        margin: '4px',
                      }}
                    >
                      <img
                        src={
                          typeof file === 'string'
                            ? `${backendUrl}/${file}`
                            : URL.createObjectURL(file)
                        }
                        alt={`Tour ${index}`}
                        className="preview-image"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = 'https://placehold.co/100x100?text=No+Image'
                        }}
                        style={{
                          height: '100px',
                          borderRadius: '6px',
                          transition: 'opacity 0.3s ease',
                          width: '100px',
                          objectFit: 'cover',
                        }}
                      />

                      <CButton
                        color="danger"
                        size="sm"
                        variant="ghost"
                        className="delete-button"
                        onClick={() => handleRemovePhoto(index)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </div>
                  ))}
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
