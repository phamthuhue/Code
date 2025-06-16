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

const InvoiceFormModal = ({ visible, onClose, onSubmit, initialData = null, bookings = [], users = [], promotions = [] }) => {
  const [formData, setFormData] = useState({
    bookingId: '',
    userId: '',
    promotionId: '',
    totalAmount: '',
    discountAmount: '',
    finalAmount: '',
    paymentStatus: 'Chưa thanh toán',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        bookingId: initialData.bookingId || '',
        userId: initialData.userId || '',
        promotionId: initialData.promotionId || '',
        totalAmount: initialData.totalAmount || '',
        discountAmount: initialData.discountAmount || '',
        finalAmount: initialData.finalAmount || '',
        paymentStatus: initialData.paymentStatus || 'Chưa thanh toán',
      })
    } else {
      setFormData({
        bookingId: '',
        userId: '',
        promotionId: '',
        totalAmount: '',
        discountAmount: '',
        finalAmount: '',
        paymentStatus: 'Chưa thanh toán',
      })
    }

    if (!visible) setErrors({})
  }, [initialData, visible])

  const validate = () => {
    const newErrors = {}
    if (!formData.bookingId) newErrors.bookingId = 'Chọn booking bắt buộc'
    if (!formData.userId) newErrors.userId = 'Chọn user bắt buộc'
    if (!formData.totalAmount) newErrors.totalAmount = 'Tổng tiền là bắt buộc'
    if (!formData.finalAmount) newErrors.finalAmount = 'Số tiền thực trả là bắt buộc'
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
      <CModalHeader>{initialData ? 'Chỉnh sửa hóa đơn' : 'Thêm hóa đơn mới'}</CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="bookingId">Booking *</CFormLabel>
              <CFormSelect name="bookingId" value={formData.bookingId} onChange={handleChange}>
                <option value="">-- Chọn booking --</option>
                {bookings.map(b => (
                  <option key={b._id} value={b._id}>{b._id}</option>
                ))}
              </CFormSelect>
              {errors.bookingId && <small className="text-danger">{errors.bookingId}</small>}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="userId">User *</CFormLabel>
              <CFormSelect name="userId" value={formData.userId} onChange={handleChange}>
                <option value="">-- Chọn user --</option>
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.fullname || u.email}</option>
                ))}
              </CFormSelect>
              {errors.userId && <small className="text-danger">{errors.userId}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="promotionId">Khuyến mãi</CFormLabel>
              <CFormSelect name="promotionId" value={formData.promotionId} onChange={handleChange}>
                <option value="">-- Không áp dụng --</option>
                {promotions.map(p => (
                  <option key={p._id} value={p._id}>{p.code}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="paymentStatus">Trạng thái thanh toán</CFormLabel>
              <CFormSelect name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
                <option value="Chưa thanh toán">Chưa thanh toán</option>
                <option value="Đã thanh toán">Đã thanh toán</option>
                <option value="Đã hoàn tiền">Đã hoàn tiền</option>
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel htmlFor="totalAmount">Tổng tiền *</CFormLabel>
              <CFormInput type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} />
              {errors.totalAmount && <small className="text-danger">{errors.totalAmount}</small>}
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="discountAmount">Tiền giảm</CFormLabel>
              <CFormInput type="number" name="discountAmount" value={formData.discountAmount} onChange={handleChange} />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="finalAmount">Thực trả *</CFormLabel>
              <CFormInput type="number" name="finalAmount" value={formData.finalAmount} onChange={handleChange} />
              {errors.finalAmount && <small className="text-danger">{errors.finalAmount}</small>}
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

export default InvoiceFormModal