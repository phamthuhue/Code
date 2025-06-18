import { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CFormSelect,
  CFormInput,
  CFormLabel,
  CButton,
} from '@coreui/react'

const ServiceSelectModal = ({ visible, onClose, onSave, tourServices = [], initialData }) => {
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [quantity, setQuantity] = useState(1)
  console.log("Data truyền:", initialData)

  useEffect(() => {
    if (initialData) {
      setSelectedServiceId(initialData.serviceId?._id || '')
      setQuantity(initialData.numberOfPeopl || 1)
    } else {
      setSelectedServiceId('')
      setQuantity(1)
    }
  }, [initialData, visible])

  const handleSave = () => {
    const selected = tourServices.find((s) => s.serviceId._id === selectedServiceId)
    if (!selected) return

    const service = {
      serviceId: selected.serviceId._id,
      itemType: selected.serviceId.name,
      description: selected.serviceId.description,
      unitPrice: selected.servicePrice,
      quantity,
      totalPrice: selected.servicePrice * quantity,
    }

    onSave(service)
  }

  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>Chọn dịch vụ</CModalHeader>
      <CModalBody>
        {!initialData && (
          <>
            <CFormLabel>Dịch vụ</CFormLabel>
            <CFormSelect
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
            >
              <option value="">-- Chọn dịch vụ --</option>
              {tourServices
                .filter((s) => s.serviceId && s.serviceId._id)
                .map((s) => (
                  <option key={s._id} value={s.serviceId._id}>
                    {s.serviceId.name} ({s.servicePrice.toLocaleString()} VND)
                  </option>
                ))}
            </CFormSelect>
          </>
        )}

        <CFormLabel className="mt-3">Số lượng</CFormLabel>
        <CFormInput
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        />

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
