import axiosConfig from '../axiosConfig'
const API = '/booking-details'
export const getBookingDetail = (id) => axiosConfig.get(`${API}/${id}`);
export const createBookingDetail = (data) => axiosConfig.post(API, data)
export const updateBookingDetail = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteBookingDetail = (id) => axiosConfig.delete(`${API}/${id}`)