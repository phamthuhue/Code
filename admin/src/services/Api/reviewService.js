import axiosConfig from '../axiosConfig'
const API = '/reviews'
export const getReviews = () => axiosConfig.get(API)
export const createReview = (data) => axiosConfig.post(API, data)

export const updateReview = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteReview = (id) => axiosConfig.delete(`${API}/${id}`)