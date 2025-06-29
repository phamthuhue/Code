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
  const [availableServices, setAvailableServices] = useState([])
  const [maxQuantity, setMaxQuantity] = useState(0)
  const [errors, setErrors] = useState({})
  const [selectedServiceId, setSelectedServiceId] = useState(null)
  const [quantity, setQuantity] = useState(1)

  // ✅ Cập nhật danh sách dịch vụ khả dụng
  useEffect(() => {
    if (deletedServices.length > 0 && availableServices.length === 0) {
      setAvailableServices(deletedServices)
    } else if (Array.isArray(tourServices)) {
      const usedIds = rowDataDetailTable
        .map((d) => d.tourServiceId)
        .filter(Boolean)

      let customTourServices = tourServices.map((el) => ({
        ...el,
        disabled: usedIds.includes(el._id),
      }))

      // Nếu có dịch vụ bị xóa, cho phép chọn lại
      // if (Array.isArray(deletedServices) && deletedServices.length > 0) {
      //   customTourServices = customTourServices.map((service) => {
      //     const wasDeleted = deletedServices.find((d) => d._id === service._id)
      //     return {
      //       ...service,
      //       disabled: wasDeleted ? false : service.disabled,
      //     }
      //   })
      // }
      if (Array.isArray(deletedServices) && deletedServices.length > 0) {
        customTourServices = customTourServices.map((service) => {
          if (!service || !service._id) return service; // tránh lỗi nếu service không hợp lệ

          const wasDeleted = deletedServices.find(
            (d) => d && d._id && d._id === service._id
          );

          return {
            ...service,
            disabled: wasDeleted ? false : service.disabled,
          };
        });
      }

      setAvailableServices(customTourServices)
    } else {
      setAvailableServices(tourServices?.services || [])
    }
  }, [tourServices, deletedServices, rowDataDetailTable.length])

  // ✅ Gán lại dữ liệu khi mở modal
  useEffect(() => {
    if (initialData) {
      setSelectedServiceId(initialData.serviceId?._id || null)
      setQuantity(initialData.quantity || 1)
      setMaxQuantity(Number(initialData.numberOfPeopl) || 0)
    } else {
      setSelectedServiceId(null)
      setQuantity(1)
    }
  }, [initialData, visible])

  // ✅ Validate input
  const validate = () => {
    const newErrors = {}
    if (!selectedServiceId) newErrors.selectedServiceId = 'Dịch vụ không được để trống'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ✅ Lưu thông tin dịch vụ mới
  const handleSave = () => {
    if (!initialData) {
      if (!validate()) return
      let selected = null

      if (Array.isArray(tourServices)) {
        selected = tourServices.find((s) => s._id === selectedServiceId)
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

        setAvailableServices((prev) =>
          prev.map((el) => {
            if (el._id === selected._id) {
              return { ...el, disabled: true }
            }
            return el
          })
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
    }
  }

  // ✅ Cập nhật maxQuantity khi thay đổi dịch vụ
  useEffect(() => {
    if (selectedServiceId) {
      const selectedService = availableServices.find(
        (service) => service._id === selectedServiceId
      )
      setMaxQuantity(selectedService?.numberOfPeopl || 0)
    }
  }, [selectedServiceId, availableServices])

  // ✅ Xử lý thay đổi số lượng
  const handleChange = (e) => {
    const numericValue = Number(e.target.value)

    // Nếu là rỗng, cho phép người dùng xóa để gõ lại
    if (e.target.value === '') {
      setQuantity('')
      return
    }

    if (!isNaN(numericValue) && numericValue > 0) {
      setQuantity(numericValue > maxQuantity ? maxQuantity : numericValue)
    }
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
                value={selectedServiceId || ''}
                onChange={(e) => setSelectedServiceId(e.target.value)}
              >
                <option value="">-- Chọn dịch vụ --</option>
                {availableServices.map((s) => (
                  <option key={s._id} value={s._id} disabled={s.disabled}>
                    {s.note} ({s.servicePrice?.toLocaleString()} VND)
                  </option>
                ))}
              </CFormSelect>
              {errors.selectedServiceId && (
                <small className="text-danger">{errors.selectedServiceId}</small>
              )}
            </>
          )}
        </CRow>

        <CRow>
          <CFormLabel className="mt-3">Số lượng</CFormLabel>
          <CFormInput
            type="number"
            value={quantity}
            min={1}
            max={maxQuantity || 1}
            onChange={handleChange}
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