import axiosConfig from '../axiosConfig'
const API = '/services'
export const getServices = () => axiosConfig.get(API)
export const createService = (data) => axiosConfig.post(API, data)

export const updateService = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteService = (id) => axiosConfig.delete(`${API}/${id}`)