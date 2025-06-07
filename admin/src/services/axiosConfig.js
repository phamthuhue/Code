// src/utils/axiosConfig.js
import axios from 'axios'

const excludedUrls = ['/auth/login', '/auth/forgot-password', '/auth/reset-password']
const BASE_URL = 'http://localhost:8000/api/v1'

const BASE_URL_ENTRY = import.meta.env.VITE_API_BACKEND_URL || BASE_URL

const axiosConfig = axios.create({
  baseURL: BASE_URL_ENTRY, // tuỳ cách bạn config .env
  withCredentials: true, // nếu bạn dùng cookie để xác thực
})
function logout(message, redirect = true) {
  localStorage.removeItem('user')

  setTimeout(
    () => (redirect ? (window.location.href = '/auth/login') : window.location.reload()),
    1000,
  )
}
// Gắn token + kiểm tra hạn
axiosConfig.interceptors.request.use(
  (config) => {
    if (excludedUrls.includes(config.url)) {
      return config
    }
    const userStr = localStorage.getItem('user')
    const user = userStr ? JSON.parse(userStr) : null
    if (user && user.token) {
      if (isTokenExpired(user.token)) {
        logout('Vui lòng đăng nhập lại', false)
        throw new axios.Cancel('Mã token đã hết hạn')
      }
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Bạn có thể thêm interceptors ở đây nếu cần
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      // 🧹 Xóa token hoặc user khỏi localStorage
      const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra'
      logout(errorMessage) // gọi logout với thông báo từ BE nếu có
    }

    return Promise.reject(error)
  },
)

export default axiosConfig
