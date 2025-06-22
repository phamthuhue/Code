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
  deletedServices,
}) => {
  const [availableServices, setAvailableServices] = useState(tourServices?.services || [])

  const [maxQuantity, setMaxQuantity] = useState(0) // Lưu số lượng tối đa

  useEffect(() => {
    // Khi không có dịch vụ nào còn lại và có dịch vụ đã xóa, sử dụng dịch vụ đã xóa
    if (deletedServices.length > 0 && availableServices.length === 0) {
      setAvailableServices(deletedServices)
    } else if (Array.isArray(tourServices)) {
      let customTourServices = tourServices.map((el) => {
        return {
          ...el,
          disabled: true,
        }
      })

      // B2: Nếu có dịch vụ đã xóa → bỏ disabled cho chúng
      if (Array.isArray(deletedServices) && deletedServices.length > 0) {
        customTourServices = customTourServices.map((service) => {
          const wasDeleted = deletedServices.find((d) => d._id === service._id)
          return {
            ...service,
            disabled: wasDeleted ? false : service.disabled,
          }
        })
      }
      setAvailableServices(customTourServices)
    } else {
      setAvailableServices(tourServices?.services || [])
    }
  }, [tourServices, deletedServices, availableServices.length]) // Chỉ theo dõi tourServices và deletedServices

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
      setMaxQuantity(initialData.numberOfPeopl)
    } else {
      setSelectedServiceId(null)
      setQuantity(1)
    }
  }, [initialData, visible])

  const handleSave = () => {
    if (!initialData) {
      if (!validate()) return
      let selected = null
      if (Array.isArray(tourServices)) {
        selected = tourServices?.find((s) => s._id === selectedServiceId)
        if (!selected) return
        const service = {
          serviceId: selected._id,
          itemType: 'Service',
          description: selected.note,
          unitPrice: selected.servicePrice,
          tourServiceId: selected._id,
          quantity: quantity,
          totalPrice: selected.servicePrice * quantity,
          numberOfPeopl: selected.numberOfPeopl,
        }
        onSave(service)
        setAvailableServices((prev) => prev.filter((s) => s._id !== selected._id)).map(
          (el = { ...el, disabled: true }),
        )
      } else {
        selected = tourServices?.services?.find((s) => s._id === selectedServiceId)
        if (!selected) return

        const service = {
          serviceId: selected._id,
          itemType: 'Service',
          description: selected.note,
          unitPrice: selected.servicePrice,
          tourServiceId: selected._id,
          quantity: quantity,
          totalPrice: selected.servicePrice * quantity,
          numberOfPeopl: selected.numberOfPeopl,
        }
        onSave(service)
        setAvailableServices((prev) => prev.filter((s) => s._id !== selected._id))
      }
    } else {
      initialData.quantity = quantity
      initialData.totalPrice = initialData.unitPrice * quantity

      onSave(initialData)
    }
  }
  // Lấy max số lượng từ dịch vụ được chọn
  useEffect(() => {
    if (selectedServiceId) {
      const selectedService = availableServices.find((service) => service._id === selectedServiceId)
      setMaxQuantity(selectedService?.numberOfPeopl || 0) // Cập nhật maxQuantity với giá trị numberSize
    }
  }, [selectedServiceId, availableServices])
  const handleChange = (e) => {
    const { value } = e.target
    // Kiểm tra xem số lượng có vượt quá maxQuantity không
    setQuantity(Math.min(Number(value), maxQuantity)) // Số lượng không vượt quá maxQuantity
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
                onChange={(e) => {
                  setSelectedServiceId(e.target.value)
                }}
              >
                <option value="">-- Chọn dịch vụ --</option>
                {availableServices?.map((s) => (
                  <option key={s._id} value={s._id} disabled={s.disabled}>
                    {s.note} ({s.servicePrice?.toLocaleString()} VND)
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
            max={maxQuantity} // Sử dụng maxQuantity làm giới hạn
            onChange={handleChange}
          />
        </CRow>
        <div className="mt-4 d-flex justify-content-end">
          <CButton color="secondary" className="me-2" onClick={onClose}>
            Hủy
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            {!initialData ? 'Lưu' : 'Sửa'}
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default ServiceSelectModal
