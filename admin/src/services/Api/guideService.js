import axiosConfig from '../axiosConfig'
const API = '/guides'
export const getGuides = () => axiosConfig.get(API)
export const createGuide = (data) => axiosConfig.post(API, data)
export const updateGuide = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteGuide = (id) => axiosConfig.delete(`${API}/${id}`)