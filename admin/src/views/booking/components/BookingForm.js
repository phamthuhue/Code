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
import BookingDetailTable from './BookingDetailTable'
import ServiceSelectModal from './ServiceSelectModal' // bạn cần tạo file này

const BookingFormModal = ({
  visible,
  onClose,
  onSubmit,
  initialData = null,
  tours,
  bookingDetails,
  setBookingDetails,
  tourServices,
  promotions,
  users,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tourId: '',
    userId: '',
    totalPrice: '',
    status: 'Mới tạo',
    promotionId: '',
  })

  const [errors, setErrors] = useState({})
  const [serviceModalVisible, setServiceModalVisible] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)

  console.log('BookingFormModal - tourServices:', tourServices)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        phone: initialData.phone || '',
        tourId: initialData.tourId || '',
        userId: initialData.userId || '',
        totalPrice: initialData.totalPrice || '',
        status: initialData.status || 'Mới tạo',
        promotionId: initialData.promotionId || '',
      })
      setBookingDetails(bookingDetails || [])
    } else {
      setFormData({
        name: '',
        phone: '',
        tourId: '',
        userId: '',
        totalPrice: '',
        status: 'Mới tạo',
      })
      setBookingDetails([])
    }

    if (!visible) setErrors({})
  }, [initialData, visible])

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Tên khách hàng không được để trống'
    if (!formData.phone) newErrors.phone = 'Số điện thoại không được để trống'
    if (!formData.tourId) newErrors.tourId = 'Tour không được để trống'
    if (!formData.userId) newErrors.userId = 'Tài khoản khách hàng không được để trống'
    if (!formData.promotionId) newErrors.promotionId = 'Khuyến mãi không được để trống'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit({ ...formData, bookingDetails })
    onClose()
  }

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="xl">
      <CModalHeader>{initialData ? 'Chỉnh sửa đặt tour' : 'Thêm mới đặt tour'}</CModalHeader>
      <CModalBody>
        {/* Phần 1: Thông tin chung */}
        <h6 className="fw-bold mb-3">Thông tin chung</h6>
        <CForm>
          <CRow className="mb-2">
            <CCol md={6}>
              <CFormLabel htmlFor="userId">TK khách hàng *</CFormLabel>
              <CFormSelect
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
              >
                <option value="">-- Chọn khách hàng --</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </CFormSelect>
              {errors.userId && <small className="text-danger">{errors.userId}</small>}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="tourId">Tour *</CFormLabel>

              {initialData ? (
                <CFormInput disabled value={initialData.tourId?.title || 'Không tìm thấy tour'} />
              ) : (
                <CFormSelect
                  id="tourId"
                  name="tourId"
                  value={formData.tourId}
                  onChange={handleChange}
                >
                  <option value="">-- Chọn tour --</option>
                  {tours.map((tour) => (
                    <option key={tour._id} value={tour._id}>
                      {tour.title}
                    </option>
                  ))}
                </CFormSelect>
              )}

              {errors.tourId && <small className="text-danger">{errors.tourId}</small>}
            </CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={6}>
              <CFormLabel htmlFor="name">Tên người liên hệ chính*</CFormLabel>
              <CFormInput id="name" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="phone">Số điện thoại *</CFormLabel>
              <CFormInput id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={6}>
              <CFormLabel htmlFor="numberOfPeople">Số lượng khách *</CFormLabel>
              <CFormInput id="numberOfPeople" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} />
              {errors.numberOfPeople && <small className="text-danger">{errors.numberOfPeople}</small>}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="promotionId">Khuyến mãi</CFormLabel>
              <CFormSelect
                id="promotionId"
                name="promotionId"
                value={formData.promotionId}
                onChange={handleChange}
              >
                <option value="">-- Không áp dụng khuyến mãi --</option>
                {promotions.map((promo) => (
                  <option key={promo._id} value={promo._id}>
                    {promo.name} - Giảm {promo.discountPercentage}%
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-2">
            <CCol md={6}>
              <CFormLabel htmlFor="status">Trạng thái</CFormLabel>
              <CFormInput id="status" name="status" value={formData.status} disabled />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="totalPrice">Tổng giá</CFormLabel>
              <CFormInput
                id="totalPrice"
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                disabled
              />
            </CCol>
          </CRow>
        </CForm>

        {/* Phần 2: Thông tin chi tiết dịch vụ */}
        <h6 className="fw-bold mt-4 mb-2">Chi tiết dịch vụ</h6>
        <BookingDetailTable
          bookingDetails={bookingDetails}
          onChange={(newDetails) => setBookingDetails(newDetails)}
          tourServices={tourServices}
        />
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

export default BookingFormModal
