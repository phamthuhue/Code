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
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import { useState, useEffect } from 'react'
import { checkUserExists } from '../../../services/Api/accountService' // cập nhật đường dẫn phù hợp

const UserFormModal = ({ visible, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    yearob: '',
    role: '', // 👈 thêm dòng này
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false) // Thêm trạng thái loading
  useEffect(() => {
    if (initialData) {
      console.log('initialData: ', initialData)
      setFormData({
        username: initialData.username || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        gender: initialData.gender || '',
        yearob: initialData.yearob || '',
        role: initialData.role.name || '', // 👈 thêm dòng này
      })
    } else {
      setFormData({
        username: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        yearob: '',
      })
    }

    if (!visible) setErrors({})
  }, [initialData, visible])

  const validate = () => {
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = 'Tên đăng nhập không được để trống'
    if (!formData.email.trim()) newErrors.email = 'Email không được để trống'
    if (!formData.gender.trim()) newErrors.gender = 'Giới tính không được để trống'
    if (!formData.role.trim()) newErrors.role = 'Vai trò không được để trống'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      // 👇 Kiểm tra trùng email hoặc username
      const res = await checkUserExists(formData.username, formData.email);
      if (res.data.success === false) {
        const conflicts = res.data.conflicts;
        const newErrors = {};
        if (conflicts.includes("username")) newErrors.username = "Tên đăng nhập đã tồn tại";
        if (conflicts.includes("email")) newErrors.email = "Email đã tồn tại";
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        const conflicts = err.response.data.conflicts;
        const newErrors = {};
        if (conflicts.includes("username")) newErrors.username = "Tên đăng nhập đã tồn tại";
        if (conflicts.includes("email")) newErrors.email = "Email đã tồn tại";
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CModal alignment="center" visible={visible} onClose={onClose} size="lg">
      <CModalHeader>{initialData ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}</CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>
                Tên đăng nhập <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormInput name="username" value={formData.username} onChange={handleChange} />
              {errors.username && <small className="text-danger">{errors.username}</small>}
            </CCol>

            <CCol md={6}>
              <CFormLabel>
                Email <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormInput
                disabled={!!initialData}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Số điện thoại</CFormLabel>
              <CFormInput name="phone" value={formData.phone} onChange={handleChange} />
            </CCol>

            <CCol md={6}>
              <CFormLabel>
                Vai trò <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormSelect name="role" value={formData.role} onChange={handleChange}>
                <option value="">-- Chọn vai trò --</option>
                <option value="user">Người dùng</option>
                <option value="admin">Quản trị viên</option>
                <option value="staff">Nhân viên</option>
              </CFormSelect>
              {errors.role && <small className="text-danger">{errors.role}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>
                Giới tính <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CFormSelect name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </CFormSelect>
              {errors.gender && <small className="text-danger">{errors.gender}</small>}
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="yearob">Năm sinh</CFormLabel>
              <CFormInput
                id="yearob"
                type="number"
                name="yearob"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.yearob || ''}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Địa chỉ</CFormLabel>
              <CFormInput name="address" value={formData.address} onChange={handleChange} />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>

      <div className="d-flex justify-content-end p-3">
        <CButton
          color="secondary"
          onClick={onClose}
          className="me-2"
          disabled={isLoading} // Disable nút hủy khi đang loading
        >
          {isLoading ? <CSpinner component="span" size="sm" aria-hidden="true" /> : 'Hủy'}
        </CButton>
        <CButton
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading} // Disable button khi đang loading
        >
          {isLoading ? (
            <CSpinner component="span" size="sm" aria-hidden="true" /> // Hiển thị spinner khi loading
          ) : initialData ? (
            'Lưu thay đổi'
          ) : (
            'Thêm mới'
          )}
        </CButton>
      </div>
    </CModal>
  )
}

export default UserFormModal
