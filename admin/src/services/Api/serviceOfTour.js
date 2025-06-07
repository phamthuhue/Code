import axiosConfig from '../axiosConfig'
const API = '/tour-services'
export const getAllTourServices = () => axiosConfig.get(API)
export const getServicesByTourId = (id) => axiosConfig.get(`${API}/tour/${id}`);
export const createTourServiceForTour = (data) =>
  axiosConfig.post(API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const updateTourService = (id, data) =>
  axiosConfig.put(`${API}/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
export const deleteTourService = (id) => axiosConfig.delete(`${API}/${id}`)