import axiosConfig from '../axiosConfig'
const API = '/tour-services'
export const getTourServices = () => axiosConfig.get(API)
export const getServicesByTourId = (id) => axiosConfig.get(`${API}/tour/${id}`);
export const createTourService = (data) => axiosConfig.post(API, data)

export const updateTourService = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteTourService = (id) => axiosConfig.delete(`${API}/${id}`)
export const deleteTourServiceByTour = (tourId) => axiosConfig.get(`${API}/tour/${tourId}`)