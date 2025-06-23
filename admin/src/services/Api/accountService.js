import axiosConfig from '../axiosConfig'

const API = '/users'

export const getUsers = (params) => axiosConfig.get(API, { params }) // hỗ trợ lọc/phân trang
export const getUsersByUserRole = (params) => axiosConfig.get(`${API}/role/user`) 
export const createUser = (data) => axiosConfig.post(API, data)
export const updateUser = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteUser = (id) => axiosConfig.delete(`${API}/${id}`)
// services/Api/accountService.js
export const getUserByEmail = (email) =>
  axiosConfig.get(`${API}/email/${email}`) // endpoint này bạn cần tạo sẵn ở backend

// ✅ Kiểm tra xem username hoặc email đã tồn tại chưa
export const checkUserExists = (username, email) =>
  axiosConfig.get(`${API}/check-exists`, {
    params: { username, email },
  })
