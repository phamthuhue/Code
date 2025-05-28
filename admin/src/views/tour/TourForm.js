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

const TourFormModal = ({ visible, onClose, onSubmit, initialData = null }) => {
  console.log('visible: ', visible)
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: undefined,
    city: undefined,
    price: undefined,
    startDate: undefined,
    endDate: undefined,
    maxGroupSize: undefined,
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
      setFormData({
        title: undefined,
        city: undefined,
        price: undefined,
        startDate: undefined,
        endDate: undefined,
        maxGroupSize: undefined,
        desc: undefined,
        photo: undefined,
      })
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

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit(formData)
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
            <CCol md={12}>
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
                    src={formData.photo}
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
