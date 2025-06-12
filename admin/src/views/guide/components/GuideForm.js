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
} from '@coreui/react';
import { useState, useEffect } from 'react';

const GuideFormModal = ({ visible, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        gender: initialData.gender || '',
        dob: initialData.dob ? new Date(initialData.dob).toISOString().split('T')[0] : '',
        address: initialData.address || '',
        phone: initialData.phone || '',
      });
    } else {
      setFormData({
        name: '',
        gender: '',
        dob: '',
        address: '',
        phone: '',
      });
    }

    if (!visible) setErrors({});
  }, [initialData, visible]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Tên không được để trống';
    if (!formData.gender) newErrors.gender = 'Giới tính không được để trống';
    if (!formData.dob) newErrors.dob = 'Ngày sinh không được để trống';
    if (!formData.address.trim()) newErrors.address = 'Địa chỉ không được để trống';
    if (!formData.phone.trim()) newErrors.phone = 'Số điện thoại không được để trống';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(formData);
    onClose();
  };

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="lg">
      <CModalHeader>
        {initialData ? 'Chỉnh sửa hướng dẫn viên' : 'Thêm mới hướng dẫn viên'}
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="name">Tên *</CFormLabel>
              <CFormInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="gender">Giới tính *</CFormLabel>
              <CFormSelect
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </CFormSelect>
              {errors.gender && <small className="text-danger">{errors.gender}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="dob">Ngày sinh *</CFormLabel>
              <CFormInput
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <small className="text-danger">{errors.dob}</small>}
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="phone">Số điện thoại *</CFormLabel>
              <CFormInput
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="address">Địa chỉ *</CFormLabel>
              <CFormInput
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
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

export default GuideFormModal;