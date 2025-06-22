import { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CAlert,
  CFormSelect,
} from '@coreui/react'
import { updateUser, getUserByEmail } from '../../../services/Api/accountService' // Import API login

const EditProfile = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        address: '',
        gender: '',
        phone: '',
        yearob: '',
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
    const loadUserData = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (!storedUser?.email) return

        try {
        const res = await getUserByEmail(storedUser.email)
        const userFromServer = res.data

        setFormData({
            username: userFromServer.username || '',
            email: userFromServer.email || '',
            address: userFromServer.address || '',
            gender: userFromServer.gender || '',
            phone: userFromServer.phone || '',
            yearob: userFromServer.yearob || '',
        })

        // Gắn userId vào localStorage để dùng sau (hoặc setState)
        localStorage.setItem('userId', userFromServer._id)
        } catch (error) {
        console.error('Lỗi khi lấy user từ email:', error)
        }
    }

    loadUserData()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setIsLoading(true)

        try {
            const userId = localStorage.getItem('userId')
            await updateUser(userId, formData)

            const res = await getUserByEmail(formData.email)
            const updatedUser = res.data
            localStorage.setItem('user', JSON.stringify(updatedUser))
            setFormData({
            username: updatedUser.username || '',
            email: updatedUser.email || '',
            address: updatedUser.address || '',
            gender: updatedUser.gender || '',
            phone: updatedUser.phone || '',
            yearob: updatedUser.yearob || '',
            })

            setSuccess('Cập nhật thông tin thành công!')
        } catch (err) {
            console.error('Update profile error:', err)
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin.')
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h3 className="mb-4">Chỉnh sửa thông tin cá nhân</h3>

                  {error && <CAlert color="danger">{error}</CAlert>}
                  {success && <CAlert color="success">{success}</CAlert>}

                  <CFormLabel>Tên hiển thị</CFormLabel>
                  <CFormInput
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mb-3"
                  />

                  <CFormLabel>Email</CFormLabel>
                  <CFormInput
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="mb-3"
                  />

                  <CFormLabel>Địa chỉ</CFormLabel>
                  <CFormInput
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mb-3"
                  />

                  <CFormLabel>Số điện thoại</CFormLabel>
                  <CFormInput
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mb-3"
                  />

                  <CFormLabel>Năm sinh</CFormLabel>
                  <CFormInput
                    name="yearob"
                    type="number"
                    value={formData.yearob}
                    onChange={handleChange}
                    className="mb-3"
                  />

                  <CFormLabel>Giới tính</CFormLabel>
                  <CFormSelect
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mb-4"
                  >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </CFormSelect>

                  <CButton color="primary" type="submit" className="w-100" disabled={isLoading}>
                    {isLoading ? (
                        <>
                        <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        Đang cập nhật...
                        </>
                    ) : (
                        'Cập nhật'
                    )}
                    </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default EditProfile