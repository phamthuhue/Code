import axiosConfig from '../axiosConfig'
const API = '/promotions'
export const getPromotions = () => axiosConfig.get(API)
export const createPromotion = (data) => axiosConfig.post(API, data)

export const updatePromotion = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deletePromotion = (id) => axiosConfig.delete(`${API}/${id}`)