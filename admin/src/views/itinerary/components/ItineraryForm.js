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

const ItineraryFormModal = ({ visible, onClose, onSubmit, initialData = null, tours = [] }) => {
  const [formData, setFormData] = useState({
    tourId: '',
    details: [{ time: '', description: '' }],
    notes: [''], // Ban đầu là 1 note rỗng
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        tourId: initialData.tourId._id || '',
        details: initialData.details.length ? initialData.details : [{ time: '', description: '' }],
        notes: initialData.notes && initialData.notes.length > 0 ? initialData.notes : [''],
      })
    } else {
      setFormData({
        tourId: '',
        details: [{ time: '', description: '' }],
        notes: [''],
      })
    }

    if (!visible) setErrors({})
  }, [initialData, visible])

  const validate = () => {
    const newErrors = {}
    if (!formData.tourId) newErrors.tourId = 'Tour không được để trống'
    if (formData.details.length === 0) {
      newErrors.details = 'Cần ít nhất 1 chi tiết hành trình'
    } else {
      formData.details.forEach((detail, index) => {
        if (!detail.time || !detail.description) {
          newErrors[`detail_${index}`] = 'Thời gian và mô tả không được để trống'
        }
      })
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...formData.details]
    newDetails[index][field] = value
    setFormData((prev) => ({ ...prev, details: newDetails }))
  }

  const handleAddDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { time: '', description: '' }],
    }))
  }

  const handleRemoveDetail = (index) => {
    const newDetails = formData.details.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, details: newDetails }))
  }

  // ✅ Thêm/xóa/chỉnh sửa ghi chú
  const handleNoteChange = (index, value) => {
    const newNotes = [...formData.notes]
    newNotes[index] = value
    setFormData((prev) => ({ ...prev, notes: newNotes }))
  }

  const handleAddNote = () => {
    setFormData((prev) => ({
      ...prev,
      notes: [...prev.notes, ''],
    }))
  }

  const handleRemoveNote = (index) => {
    const newNotes = formData.notes.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, notes: newNotes }))
  }

  const handleSubmit = () => {
    if (!validate()) return
    // Lọc các ghi chú rỗng (nếu muốn loại bỏ ghi chú rỗng trước khi submit)
    const cleanedFormData = {
      ...formData,
      notes: formData.notes.filter((note) => note.trim() !== ''),
    }
    console.log('Dữ liệu submit:', cleanedFormData)
    onSubmit(cleanedFormData)
    onClose()
  }

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="lg">
      <CModalHeader>{initialData ? 'Chỉnh sửa hành trình' : 'Thêm mới hành trình'}</CModalHeader>
      <CModalBody>
        <h6 className="fw-bold mb-3">Thông tin tour</h6>
        <CForm>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="tourId">Tour *</CFormLabel>

              {initialData ? (
                <CFormInput
                  disabled
                  value={initialData.tourId?.title || "Không tìm thấy tour"}
                />
              ) : (
                <CFormSelect
                  id="tourId"
                  name="tourId"
                  value={formData.tourId}
                  onChange={handleChange}
                >
                  <option value="">-- Chọn tour --</option>
                  {tours.map((tour) => (
                    <option key={tour._id} value={tour._id}>
                      {tour.title}
                    </option>
                  ))}
                </CFormSelect>
              )}

              {errors.tourId && (
                <small className="text-danger">{errors.tourId}</small>
              )}
            </CCol>
          </CRow>

          <h6 className="fw-bold mt-4 mb-2">Chi tiết hành trình</h6>
          {formData.details.map((detail, index) => (
            <CRow className="mb-2" key={index}>
              <CCol md={3}>
                <CFormLabel htmlFor={`time_${index}`}>Thời gian *</CFormLabel>
                <CFormInput
                  id={`time_${index}`}
                  value={detail.time}
                  onChange={(e) => handleDetailChange(index, 'time', e.target.value)}
                />
              </CCol>
              <CCol md={7}>
                <CFormLabel htmlFor={`description_${index}`}>Mô tả *</CFormLabel>
                <CFormInput
                  id={`description_${index}`}
                  value={detail.description}
                  onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                />
              </CCol>
              <CCol md={2} className="d-flex align-items-end">
                <CButton
                  color="danger"
                  size="sm"
                  onClick={() => handleRemoveDetail(index)}
                  className="me-2"
                >
                  Xóa
                </CButton>
              </CCol>
              {errors[`detail_${index}`] && (
                <CCol md={12}>
                  <small className="text-danger">{errors[`detail_${index}`]}</small>
                </CCol>
              )}
            </CRow>
          ))}
          <CButton color="secondary" size="sm" onClick={handleAddDetail}>
            Thêm chi tiết
          </CButton>

          <h6 className="fw-bold mt-4 mb-2">Ghi chú</h6>
          {formData.notes.map((note, index) => (
            <CRow className="mb-2" key={index}>
              <CCol md={10}>
                <CFormInput
                  placeholder={`Ghi chú ${index + 1}`}
                  value={note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                />
              </CCol>
              <CCol md={2} className="d-flex align-items-end">
                <CButton
                  color="danger"
                  size="sm"
                  onClick={() => handleRemoveNote(index)}
                  className="me-2"
                >
                  Xóa
                </CButton>
              </CCol>
            </CRow>
          ))}
          <CButton color="secondary" size="sm" onClick={handleAddNote}>
            Thêm ghi chú
          </CButton>
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

export default ItineraryFormModal
