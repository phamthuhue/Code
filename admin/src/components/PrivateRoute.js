import React from 'react'
import { Navigate } from 'react-router-dom' // Sử dụng Navigate thay vì Redirect
import { useSelector } from 'react-redux' // Import useSelector để lấy dữ liệu từ Redux store

const PrivateRoute = ({ children }) => {
  // Lấy token từ Redux store
  const token = useSelector((state) => state.token) // Lấy token từ Redux store

  // Nếu có token, render route bình thường, ngược lại chuyển hướng về trang đăng nhập
  return token ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
