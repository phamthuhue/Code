import React from 'react'
import { Navigate } from 'react-router-dom' // Sử dụng Navigate thay vì Redirect
import { useSelector } from 'react-redux'

const PrivateRoute = ({ element, ...rest }) => {
  const token = null // Lấy token từ Redux store

  // Nếu có token, render route bình thường, ngược lại chuyển hướng về trang đăng nhập
  return token ? element : <Navigate to="/login" replace />
}

export default PrivateRoute
