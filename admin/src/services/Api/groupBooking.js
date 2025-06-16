import axiosConfig from '../axiosConfig'
const API = '/groupTourRequests'
export const getGroupBookings = () => axiosConfig.get(API)
export const createGroupBooking = (data) => axiosConfig.post(API, data)
export const updateGroupBooking = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteGroupBooking = (id) => axiosConfig.delete(`${API}/${id}`)