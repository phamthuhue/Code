import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormTextarea,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CRow,
  CCol,
} from '@coreui/react'

const CancellationBookingForm = ({ booking, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    bookingId: booking._id,
    userId: booking.userId?._id || '',
    invoiceId: booking.invoiceId?._id || '',
    cancelReason: '',
    status: 'Đang xử lý',
    refundMethod: '',
    refundAccountName: '',
    refundAccountNumber: '',
    refundBankName: '',
    refundWalletProvider: '',
    refundWalletPhone: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Reset errors on modal open
    setErrors({})
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.cancelReason) newErrors.cancelReason = 'Vui lòng nhập lý do hủy.'
    if (!formData.refundMethod) newErrors.refundMethod = 'Vui lòng chọn phương thức hoàn tiền.'

    if (formData.refundMethod === 'Chuyển khoản') {
      if (!formData.refundAccountName) newErrors.refundAccountName = 'Vui lòng nhập tên tài khoản.'
      if (!formData.refundAccountNumber) newErrors.refundAccountNumber = 'Vui lòng nhập số tài khoản.'
      if (!formData.refundBankName) newErrors.refundBankName = 'Vui lòng chọn ngân hàng.'
    }

    if (formData.refundMethod === 'Ví điện tử') {
      if (!formData.refundWalletProvider) newErrors.refundWalletProvider = 'Chọn nhà cung cấp ví.'
      if (!formData.refundWalletPhone) newErrors.refundWalletPhone = 'Nhập số điện thoại ví.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSave(formData)
  }

  return (
    <CModal visible={true} onClose={onClose} alignment="center" size="lg">
      <CModalHeader closeButton>Yêu cầu hủy đặt tour</CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <CCol>
              <CFormLabel htmlFor="cancelReason">Lý do hủy *</CFormLabel>
              <CFormTextarea
                id="cancelReason"
                name="cancelReason"
                value={formData.cancelReason}
                onChange={handleChange}
              />
              {errors.cancelReason && <small className="text-danger">{errors.cancelReason}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
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
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="refundAccountName">Tên tài khoản *</CFormLabel>
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
              <CRow className="mb-3">
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
                    <option value="ACB">ACB</option>
                    <option value="VPBank">VPBank</option>
                  </CFormSelect>
                  {errors.refundBankName && <small className="text-danger">{errors.refundBankName}</small>}
                </CCol>
              </CRow>
            </>
          )}

          {formData.refundMethod === 'Ví điện tử' && (
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="refundWalletProvider">Nhà cung cấp ví *</CFormLabel>
                <CFormSelect
                  id="refundWalletProvider"
                  name="refundWalletProvider"
                  value={formData.refundWalletProvider}
                  onChange={handleChange}
                >
                  <option value="">-- Chọn --</option>
                  <option value="Momo">Momo</option>
                  <option value="ZaloPay">ZaloPay</option>
                  <option value="VNPay">VNPay</option>
                </CFormSelect>
                {errors.refundWalletProvider && <small className="text-danger">{errors.refundWalletProvider}</small>}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="refundWalletPhone">Số điện thoại ví *</CFormLabel>
                <CFormInput
                  id="refundWalletPhone"
                  name="refundWalletPhone"
                  value={formData.refundWalletPhone}
                  onChange={handleChange}
                />
                {errors.refundWalletPhone && <small className="text-danger">{errors.refundWalletPhone}</small>}
              </CCol>
            </CRow>
          )}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Hủy
        </CButton>
        <CButton color="danger" onClick={handleSubmit}>
          Xác nhận hủy
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default CancellationBookingForm