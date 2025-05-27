import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import { useState, useEffect } from 'react'

const TourFormModal = ({ visible, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    price: '',
    startDate: '',
    endDate: '',
    maxGroupSize: '',
    desc: '',
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
        title: '',
        city: '',
        price: '',
        startDate: '',
        endDate: '',
        maxGroupSize: '',
        desc: '',
      })
    }
  }, [initialData, visible])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="lg">
      <CModalHeader>{initialData ? 'Chỉnh sửa tour' : 'Thêm mới tour'}</CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            type="text"
            label="Tiêu đề"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mb-2"
          />
          <CFormInput
            type="text"
            label="Thành phố"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mb-2"
          />
          <CFormInput
            type="number"
            label="Giá"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mb-2"
          />
          <CFormInput
            type="number"
            label="Số lượng tối đa"
            name="maxGroupSize"
            value={formData.maxGroupSize}
            onChange={handleChange}
            className="mb-2"
          />
          <CFormInput
            type="date"
            label="Ngày bắt đầu"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mb-2"
          />
          <CFormInput
            type="date"
            label="Ngày kết thúc"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mb-2"
          />
          <CFormTextarea label="Mô tả" name="desc" value={formData.desc} onChange={handleChange} />
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
