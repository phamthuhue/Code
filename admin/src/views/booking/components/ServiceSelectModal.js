import { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CFormSelect,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
} from '@coreui/react'

const ServiceSelectModal = ({
  visible,
  onClose,
  onSave,
  tourServices = [],
  initialData,
  rowDataDetailTable,
}) => {
  const [availableServices, setAvailableServices] = useState(tourServices?.services || [])
  useEffect(() => {
    setAvailableServices(tourServices?.services || [])
  }, [tourServices])

  const [errors, setErrors] = useState({})

  const [selectedServiceId, setSelectedServiceId] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const validate = () => {
    const newErrors = {}
    if (!selectedServiceId) newErrors.selectedServiceId = 'Dịch vụ không được để trống'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  useEffect(() => {
    if (initialData) {
      setSelectedServiceId(initialData.serviceId?._id || null)
      setQuantity(initialData.quantity || 1)
    } else {
      setSelectedServiceId(null)
      setQuantity(1)
    }
  }, [initialData, visible])

  const handleSave = () => {
    if (!initialData) {
      if (!validate()) return
    }
    const selected = tourServices?.services?.find((s) => s._id === selectedServiceId)
    if (!selected) return

    const service = {
      serviceId: selected._id,
      itemType: 'Service',
      description: selected.note,
      unitPrice: selected.servicePrice,
      tourServiceId: selected._id,
      quantity: quantity,
      totalPrice: selected.servicePrice * quantity,
    }

    onSave(service)
    setAvailableServices((prev) => prev.filter((s) => s._id !== selected._id))
  }

  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>Chọn dịch vụ</CModalHeader>
      <CModalBody>
        <CRow className="mb-1">
          {!initialData && (
            <>
              <CFormLabel>
                Dịch vụ <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormSelect
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
              >
                <option value="">-- Chọn dịch vụ --</option>
                {availableServices?.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.note} ({s.servicePrice.toLocaleString()} VND)
                  </option>
                ))}
              </CFormSelect>
            </>
          )}
          {errors.selectedServiceId && (
            <small className="text-danger">{errors.selectedServiceId}</small>
          )}
        </CRow>
        <CRow>
          <CFormLabel className="mt-3">Số lượng</CFormLabel>
          <CFormInput
            type="number"
            value={quantity}
            min={1}
            max={100}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
        </CRow>
        <div className="mt-4 d-flex justify-content-end">
          <CButton color="secondary" className="me-2" onClick={onClose}>
            Hủy
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Lưu
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default ServiceSelectModal
