import axiosConfig from '../axiosConfig'
const API = '/partner-types'
export const getPartnerTypes = () => axiosConfig.get(API)
export const createPartnerType = (data) => axiosConfig.post(API, data)

export const updatePartnerType = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deletePartnerType = (id) => axiosConfig.delete(`${API}/${id}`)