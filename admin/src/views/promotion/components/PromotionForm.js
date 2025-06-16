import {
  CModal,
  CModalHeader,
  CModalBody,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
} from '@coreui/react';
import { useState, useEffect } from 'react';
import { CFormSelect } from '@coreui/react';

const PromotionFormModal = ({ visible, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    discountType:'',
    discountValue:''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        discountType: initialData.discountType || '',
        discountValue: initialData.discountValue || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        discountType:'',
        discountValue:''
      });
    }

    if (!visible) setErrors({});
  }, [initialData, visible]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Tên loại đối tác không được để trống';
    if (!formData.description.trim()) newErrors.description = 'Mô tả không được để trống';
    if (!formData.discountType.trim()) newErrors.discountType = 'Loại đơn vị không được để trống';
    if (!formData.discountValue) newErrors.discountValue = 'Giá trị không được để trống';
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
        {initialData ? 'Chỉnh sửa khuyến mãi' : 'Thêm mới khuyến mãi'}
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="name">Mã khuyến mãi *</CFormLabel>
              <CFormInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="description">Mô tả *</CFormLabel>
              <CFormInput
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <small className="text-danger">{errors.description}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="discountType">Loại đơn vị *</CFormLabel>
              <CFormSelect
                          name="discountType"
                          id="discountType"
                          value={formData.discountType}
                          onChange={handleChange}
                        >
                          <option value="">- Tất cả -</option>
                          <option value="Phần trăm (%)">Phần trăm (%)</option>
                          <option value="VNĐ">VNĐ</option>
              </CFormSelect>
              {errors.discountType && <small className="text-danger">{errors.discountType}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="discountValue">Giá trị *</CFormLabel>
              <CFormInput
                id="discountValue"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
              />
              {errors.discountValue && <small className="text-danger">{errors.discountValue}</small>}
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

export default PromotionFormModal;