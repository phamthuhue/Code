import { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CAlert,
} from '@coreui/react'
import { changePassword } from '../../../services/Api/authService' // Import API login

const backendUrl = import.meta.env.VITE_END_POINT_BACKEND_URL

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { currentPassword, newPassword, confirmPassword } = formData

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và xác nhận không khớp.')
      return
    }

    try {
      // ✅ Lấy userId từ localStorage (bạn đang lưu object user)
      const user = JSON.parse(localStorage.getItem('user'))
      const email = user?.email

      if (!email) {
        setError('Không tìm thấy thông tin người dùng.')
        return
      }

      const response = await changePassword({
        email,
        currentPassword,
        newPassword,
        })

      setSuccess('Thay đổi mật khẩu thành công.')
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (err) {
      console.error('Change password error:', err)
      setError(
        err.response?.data?.message || 'Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại.'
      )
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h3 className="mb-4">Đổi mật khẩu</h3>

                    {error && <CAlert color="danger">{error}</CAlert>}
                    {success && <CAlert color="success">{success}</CAlert>}

                    <CFormLabel htmlFor="currentPassword">Mật khẩu hiện tại</CFormLabel>
                    <CFormInput
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="mb-3"
                      required
                    />

                    <CFormLabel htmlFor="newPassword">Mật khẩu mới</CFormLabel>
                    <CFormInput
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="mb-3"
                      required
                    />

                    <CFormLabel htmlFor="confirmPassword">Xác nhận mật khẩu</CFormLabel>
                    <CFormInput
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="mb-4"
                      required
                    />

                    <CButton color="primary" type="submit" className="w-100">
                      Đổi mật khẩu
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ChangePassword