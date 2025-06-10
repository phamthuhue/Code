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
  CFormTextarea,
} from '@coreui/react';
import { useState, useEffect } from 'react';

const ItineraryFormModal = ({ visible, onClose, onSubmit, initialData = null, tours = [] }) => {
  const [formData, setFormData] = useState({
    tourId: '',
    details: [{ time: '', description: '' }],
    notes: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        tourId: initialData.tourId || '',
        details: initialData.details.length ? initialData.details : [{ time: '', description: '' }],
        notes: initialData.notes || [],
      });
    } else {
      setFormData({
        tourId: '',
        details: [{ time: '', description: '' }],
        notes: [],
      });
    }

    if (!visible) setErrors({});
  }, [initialData, visible]);

  // ✅ Đảm bảo tourId luôn khớp với danh sách tours
  useEffect(() => {
    if (initialData && tours.length > 0) {
      const foundTour = tours.find((tour) => tour._id === initialData.tourId);
      if (!foundTour) {
        setFormData((prev) => ({ ...prev, tourId: '' }));
      }
    }
  }, [tours, initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.tourId) newErrors.tourId = 'Tour không được để trống';
    formData.details.forEach((detail, index) => {
      if (!detail.time || !detail.description) {
        newErrors[`detail_${index}`] = 'Thời gian và mô tả không được để trống';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...formData.details];
    newDetails[index][field] = value;
    setFormData((prev) => ({ ...prev, details: newDetails }));
  };

  const handleAddDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { time: '', description: '' }],
    }));
  };

  const handleRemoveDetail = (index) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, details: newDetails }));
  };

  const handleNoteChange = (e) => {
    const value = e.target.value.split('\n').filter((note) => note.trim() !== '');
    setFormData((prev) => ({ ...prev, notes: value }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(formData);
    onClose();
  };

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="lg">
      <CModalHeader>{initialData ? 'Chỉnh sửa hành trình' : 'Thêm mới hành trình'}</CModalHeader>
      <CModalBody>
        <h6 className="fw-bold mb-3">Thông tin tour</h6>
        <CForm>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="tourId">Tour *</CFormLabel>
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
              {errors.tourId && <small className="text-danger">{errors.tourId}</small>}
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
          <CRow className="mb-2">
            <CCol md={12}>
              <CFormLabel htmlFor="notes">Ghi chú (mỗi ghi chú 1 dòng)</CFormLabel>
              <CFormTextarea
                id="notes"
                rows={4}
                value={formData.notes.join('\n')}
                onChange={handleNoteChange}
                placeholder="Nhập mỗi ghi chú trên 1 dòng"
              />
            </CCol>
          </CRow>
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
  );
};

export default ItineraryFormModal;