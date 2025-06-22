import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser, setLoading, setError } from '../../../store' // Import actions từ Redux store
import { login } from '../../../services/Api/authService' // Import API login
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [username, setUsername] = useState('') // Lưu username
  const [password, setPassword] = useState('') // Lưu password
  const [errors, setErrors] = useState({}) // Lưu lỗi
  const [isLoading, setIsLoading] = useState(false) // Trạng thái loading
  const dispatch = useDispatch() // Dùng dispatch để gửi action vào Redux
  const navigate = useNavigate() // Dùng useNavigate để chuyển hướng sau khi đăng nhập thành công
  const validate = () => {
    const newErrors = {}
    if (!username.trim()) newErrors.username = 'Tên đăng nhập không được để trống'
    if (!password.trim()) newErrors.password = 'Mật khẩu không được để trống'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Kiểm tra xem có lỗi không
  }
  const [toast, addToast] = useState()
  const toaster = useRef(null)
  const exampleToast = (message) => (
    <CToast>
      <CToastHeader closeButton>
        <strong className="me-auto">Thông báo</strong>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )
  const handleLogin = async (e) => {
    e.preventDefault()

    // Kiểm tra dữ liệu đầu vào trước khi gửi API
    if (!validate()) return

    // Bắt đầu quá trình đăng nhập -> set trạng thái loading là true
    setIsLoading(true)
    dispatch(setLoading(true))
    dispatch(setError(null)) // Reset lỗi nếu có

    try {
      // Gửi yêu cầu đăng nhập tới API backend

      const data = { email: username, password }
      const res = await login(data)
      console.log('Kết quả đăng nhập: ', res)
      if (res.status == 200) {
        // Lưu token và thông tin người dùng vào Redux store
        const user = { ...res.data.info, ...res.data.role }
        const token = res.data.token

        dispatch(setUser({ token: token, user: user }))

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        addToast(exampleToast('Đăng nhập thành công'))
        // Chuyển hướng tới trang Dashboard sau khi đăng nhập thành công
        window.location.href = '/dashboard'
      } else {
        addToast(exampleToast('Đăng nhập thất bại'))
        dispatch(setError('Đăng nhập thất bại'))
      }
    } catch (error) {
      addToast(exampleToast(error?.response?.data?.message))
      console.error('Lỗi đăng nhập:', error)
      dispatch(setError('Có lỗi xảy ra. Vui lòng thử lại sau'))
    } finally {
      setIsLoading(false) // Đặt trạng thái loading là false khi hoàn thành
      dispatch(setLoading(false)) // Đặt trạng thái loading là false sau khi hoàn thành
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Đăng Nhập</h1>
                    <p className="text-body-secondary">Vui lòng đăng nhập vào tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email đăng nhập"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Cập nhật giá trị username
                      />
                    </CInputGroup>
                    {errors.username && <small className="text-danger">{errors.username}</small>}

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị password
                      />
                    </CInputGroup>
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                          ) : (
                            'Đăng Nhập'
                          )}
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Quên mật khẩu?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Đăng Ký</h2>
                    <p>
                      Chưa có tài khoản? Đăng ký ngay với adminstator để có thể truy cập vào hệ
                      thống của chúng tôi cung cấp!
                    </p>

                    <CButton color="primary" className="mt-3" active tabIndex={-1}>
                      Đăng Ký Ngay!
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        <CToaster ref={toaster} push={toast} placement="top-end" />
      </CContainer>
    </div>
  )
}

export default Login
