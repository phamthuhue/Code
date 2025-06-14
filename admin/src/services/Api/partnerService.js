import axiosConfig from '../axiosConfig'
const API = '/partners'
export const getPartners = () => axiosConfig.get(API)
export const createPartner = (data) => axiosConfig.post(API, data)

export const updatePartner = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deletePartner = (id) => axiosConfig.delete(`${API}/${id}`)