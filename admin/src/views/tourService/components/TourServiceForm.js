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

const TourServiceFormModal = ({ visible, onClose, onSubmit, initialData = null, tours = [], serviceOptions = [] }) => {
  const [tourId, setTourId] = useState('');
  console.log(tourId)
  const [services, setServices] = useState([
    { serviceId: '', numberOfPeopl: 1, servicePrice: 0, note: '' },
  ]);

  useEffect(() => {
    if (initialData) {
      setTourId(initialData.tourId || '');
      setServices(initialData.services || []);
    } else {
      setTourId('');
      setServices([{ serviceId: '', numberOfPeopl: 1, servicePrice: 0, note: '' }]);
    }
  }, [initialData, visible]);

  const handleServiceChange = (index, field, value) => {
    const updated = [...services];
    if (field === 'serviceId') {
      const selectedService = serviceOptions.find((s) => s._id === value);
      if (selectedService) {
        updated[index] = {
          ...updated[index],
          serviceId: value,
          servicePrice: selectedService.unitPrice || 0,
          note: selectedService.name || '',
        };
      } else {
        // Trường hợp không tìm thấy dịch vụ (có thể người dùng chọn lại "-- Chọn dịch vụ --")
        updated[index] = {
          ...updated[index],
          serviceId: '',
          servicePrice: 0,
          note: '',
        };
      }
    } else {
      updated[index][field] = field === 'numberOfPeopl' || field === 'servicePrice' ? Number(value) : value;
    }
    setServices(updated);
  };

  const addService = () => {
    setServices([...services, { serviceId: '', numberOfPeopl: 1, servicePrice: 0, note: '' }]);
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!tourId) return alert('Vui lòng chọn tour.');

    const hasError = services.some(
      (s) => !s.serviceId || !s.numberOfPeopl || !s.servicePrice
    );
    if (hasError) return alert('Vui lòng nhập đầy đủ thông tin cho từng dịch vụ.');

    onSubmit({ tourId, services });
    onClose();
  };

  // Tìm tên tour từ danh sách nếu có tourId
  // const selectedTour = tours.find((t) => t._id === tourId);

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="lg">
      <CModalHeader>{initialData ? 'Chỉnh sửa dịch vụ tour' : 'Thêm dịch vụ tour'}</CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-4">
            <CFormLabel>Tour *</CFormLabel>
            {initialData ? (
              <CFormInput disabled value={initialData.tourId.title || 'Không tìm thấy tour'} />
            ) : (
              <CFormSelect value={tourId} onChange={(e) => setTourId(e.target.value)}>
                <option value="">-- Chọn tour --</option>
                {tours.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.title}
                  </option>
                ))}
              </CFormSelect>
            )}
          </div>

          {services.map((service, index) => (
            <div key={index} className="mb-4 border p-3 rounded">
              <CRow className="mb-2">
                <CCol md={6}>
                  <CFormLabel>Dịch vụ *</CFormLabel>
                  <CFormSelect
                    value={service.serviceId}
                    onChange={(e) => handleServiceChange(index, 'serviceId', e.target.value)}
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {serviceOptions.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Số lượng *</CFormLabel>
                  <CFormInput
                    type="number"
                    min={1}
                    value={service.numberOfPeopl}
                    onChange={(e) => handleServiceChange(index, 'numberOfPeopl', e.target.value)}
                  />
                </CCol>
              </CRow>

              {services.length > 1 && (
                <CButton color="danger" size="sm" onClick={() => removeService(index)}>
                  Xóa dịch vụ
                </CButton>
              )}
            </div>
          ))}

          <CButton color="info" onClick={addService}>
            + Thêm dịch vụ
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
  );
};

export default TourServiceFormModal;