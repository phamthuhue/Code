import { useState, useEffect } from 'react'
import {
  CModal, CModalHeader, CModalBody,
  CFormSelect, CFormInput, CFormLabel, CButton
} from '@coreui/react'

const ServiceSelectModal = ({ visible, onClose, onSave, tourServices = [], initialData }) => {
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (initialData) {
      setSelectedServiceId(initialData.serviceId)
      setQuantity(initialData.quantity)
    } else {
      setSelectedServiceId('')
      setQuantity(1)
    }
  }, [initialData, visible])

  const handleSave = () => {
    const selected = tourServices.find(s => s._id === selectedServiceId)
    if (!selected) return

    const service = {
      serviceId: selected._id,
      itemType: selected.name,
      description: selected.description,
      unitPrice: selected.price,
      quantity,
      totalPrice: selected.price * quantity,
    }

    onSave(service)
  }

  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>Chọn dịch vụ</CModalHeader>
      <CModalBody>
        <CFormLabel>Dịch vụ</CFormLabel>
        <CFormSelect
          value={selectedServiceId}
          onChange={(e) => setSelectedServiceId(e.target.value)}
        >
          <option value="">-- Chọn dịch vụ --</option>
          {tourServices.map(service => (
            <option key={service._id} value={service._id}>
              {service.name} ({service.price.toLocaleString()} VND)
            </option>
          ))}
        </CFormSelect>

        <CFormLabel className="mt-3">Số lượng</CFormLabel>
        <CFormInput
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className="mt-4 d-flex justify-content-end">
          <CButton color="secondary" className="me-2" onClick={onClose}>Hủy</CButton>
          <CButton color="primary" onClick={handleSave}>Lưu</CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default ServiceSelectModal