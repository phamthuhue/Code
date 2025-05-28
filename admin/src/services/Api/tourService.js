import axiosConfig from '../axiosConfig'
const API = '/tours'
export const getTours = () => axiosConfig.get(API)
export const createTour = (data) => axiosConfig.post(API, data)
export const updateTour = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteTour = (id) => axiosConfig.delete(`${API}/${id}`)
