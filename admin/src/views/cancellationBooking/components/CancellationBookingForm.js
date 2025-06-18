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

const CancellationBookingFormModal = ({
  visible,
  onClose,
  onSubmit,
  initialData = null,
  bookingId,
  userId,
}) => {
  const initialForm = {
    bookingId: bookingId || '',
    userId: userId || '',
    cancelReason: '',
    status: 'Đang xử lý',
    refundMethod: '',
    refundAccountName: '',
    refundAccountNumber: '',
    refundBankName: '',
    refundWalletProvider: '',
    refundWalletPhone: '',
  }

  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  useEffect(() => {
    console.log('📥 initialData:', initialData) // 
    if (initialData) {
      setFormData({
        bookingId: initialData.bookingId || '',
        userId: initialData.userId || '',
        cancelReason: initialData.cancelReason || '',
        status: initialData.status || '',
        refundMethod: initialData.refundMethod || '',
        refundAccountName: initialData.refundAccountName,
        refundAccountNumber: initialData.refundAccountNumber,
        refundBankName: initialData.refundBankName,
        refundWalletProvider: initialData.refundWalletProvider,
        refundWalletPhone: initialData.refundWalletPhone,
      })
    } else {
      setFormData({
        bookingId: bookingId || '',
        userId: userId || '',
        cancelReason: '',
        status: 'Đang xử lý',
        refundMethod: '',
        refundAccountName: '',
        refundAccountNumber: '',
        refundBankName: '',
        refundWalletProvider: '',
        refundWalletPhone: '',
      })
    }

    if (!visible) setErrors({})
  }, [initialData, visible])

  const validate = () => {
    const newErrors = {}
    if (!formData.cancelReason) newErrors.cancelReason = 'Vui lòng nhập lý do hủy'
    if (!formData.refundMethod) newErrors.refundMethod = 'Vui lòng chọn phương thức hoàn tiền'
    if (formData.refundMethod === 'Chuyển khoản') {
      if (!formData.refundAccountName) newErrors.refundAccountName = 'Tên tài khoản không được để trống'
      if (!formData.refundAccountNumber) newErrors.refundAccountNumber = 'Số tài khoản không được để trống'
      if (!formData.refundBankName) newErrors.refundBankName = 'Tên ngân hàng không được để trống'
    } else if (formData.refundMethod === 'Ví điện tử') {
      if (!formData.refundWalletProvider) newErrors.refundWalletProvider = 'Nhà cung cấp ví không được để trống'
      if (!formData.refundWalletPhone) newErrors.refundWalletPhone = 'Số điện thoại ví không được để trống'
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
     console.log('📤 Submitting formData:', formData)
    onSubmit(formData)
    onClose()
  }

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="lg">
      <CModalHeader>{initialData ? 'Chỉnh sửa yêu cầu hủy tour' : 'Yêu cầu hủy tour'}</CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-2">
            <CCol>
              <CFormLabel htmlFor="cancelReason">Lý do hủy *</CFormLabel>
              <CFormInput
                id="cancelReason"
                name="cancelReason"
                value={formData.cancelReason}
                onChange={handleChange}
              />
              {errors.cancelReason && <small className="text-danger">{errors.cancelReason}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-2">
            <CCol>
              <CFormLabel htmlFor="refundMethod">Phương thức hoàn tiền *</CFormLabel>
              <CFormSelect
                id="refundMethod"
                name="refundMethod"
                value={formData.refundMethod}
                onChange={handleChange}
              >
                <option value="">-- Chọn phương thức --</option>
                <option value="Chuyển khoản">Chuyển khoản</option>
                <option value="Ví điện tử">Ví điện tử</option>
              </CFormSelect>
              {errors.refundMethod && <small className="text-danger">{errors.refundMethod}</small>}
            </CCol>
          </CRow>

          {formData.refundMethod === 'Chuyển khoản' && (
            <>
              <CRow className="mb-2">
                <CCol>
                  <CFormLabel htmlFor="refundBankName">Ngân hàng *</CFormLabel>
                  <CFormSelect 
                    id="refundBankName"
                    name="refundBankName"
                    value={formData.refundBankName}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn ngân hàng --</option>
                    <option value="Vietcombank">Vietcombank</option>
                    <option value="Techcombank">Techcombank</option>
                    <option value="BIDV">BIDV</option>
                    <option value="VPBank">VPBank</option>
                    <option value="ACB">ACB</option>
                  </CFormSelect>
                  {errors.refundBankName && <small className="text-danger">{errors.refundBankName}</small>}
                </CCol>
              </CRow>
              <CRow className="mb-2">
                <CCol md={6}>
                  <CFormLabel htmlFor="refundAccountName">Tên chủ tài khoản *</CFormLabel>
                  <CFormInput
                    id="refundAccountName"
                    name="refundAccountName"
                    value={formData.refundAccountName}
                    onChange={handleChange}
                  />
                  {errors.refundAccountName && <small className="text-danger">{errors.refundAccountName}</small>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="refundAccountNumber">Số tài khoản *</CFormLabel>
                  <CFormInput
                    id="refundAccountNumber"
                    name="refundAccountNumber"
                    value={formData.refundAccountNumber}
                    onChange={handleChange}
                  />
                  {errors.refundAccountNumber && <small className="text-danger">{errors.refundAccountNumber}</small>}
                </CCol>
              </CRow>
            </>
          )}

          {formData.refundMethod === 'Ví điện tử' && (
            <CRow className="mb-2">
              <CCol md={6}>
                <CFormLabel htmlFor="refundWalletProvider">Nhà cung cấp ví *</CFormLabel>
                <CFormSelect
                  id="refundWalletProvider"
                  name="refundWalletProvider"
                  value={formData.refundWalletProvider}
                  onChange={handleChange}
                >
                  <option value="">-- Chọn nhà cung cấp --</option>
                  <option value="Momo">Momo</option>
                  <option value="VNPay">VNPay</option>
                </CFormSelect>
                {errors.refundWalletProvider && (
                  <small className="text-danger">{errors.refundWalletProvider}</small>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="refundWalletPhone">Số điện thoại ví *</CFormLabel>
                <CFormInput
                  id="refundWalletPhone"
                  name="refundWalletPhone"
                  value={formData.refundWalletPhone}
                  onChange={handleChange}
                />
                {errors.refundWalletPhone && (
                  <small className="text-danger">{errors.refundWalletPhone}</small>
                )}
              </CCol>
            </CRow>
          )}
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

export default CancellationBookingFormModal