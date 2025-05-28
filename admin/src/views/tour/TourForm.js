import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
  CFormLabel,
  CRow,
  CCol,
} from '@coreui/react'
import { useState, useEffect } from 'react'

const TourFormModal = ({ visible, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: null,
    city: null,
    price: null,
    startDate: null,
    endDate: null,
    maxGroupSize: null,
    desc: null,
    photo: null,
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
        title: null,
        city: null,
        price: null,
        startDate: null,
        endDate: null,
        maxGroupSize: null,
        desc: null,
        photo: null,
      })
    }
  }, [initialData, visible])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
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
          <CRow className="mb-2">
            <CCol md={6}>
              <CFormInput
                type="date"
                label="Ngày bắt đầu"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                label="Ngày kết thúc"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CFormTextarea
            label="Mô tả"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="mb-2"
          />

          <div className="mb-3">
            <CFormLabel>Ảnh đại diện</CFormLabel>
            <CFormInput type="file" accept="image/*" onChange={handleImageChange} />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Tour"
                className="mt-2"
                style={{ maxHeight: '150px', borderRadius: '8px' }}
              />
            )}
          </div>
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
