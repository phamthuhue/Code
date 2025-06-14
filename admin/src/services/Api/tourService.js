import axiosConfig from '../axiosConfig'
const API = '/tours'
export const getTours = () => axiosConfig.get(API)
export const getToursWithoutService  = () => axiosConfig.get(`${API}/without-service`)
export const getToursWithoutItinerary = () => axiosConfig.get(`${API}/without-itinerary`)
export const createTour = (data) =>
  axiosConfig.post(API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const updateTour = (id, data) =>
  axiosConfig.put(`${API}/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
export const deleteTour = (id) => axiosConfig.delete(`${API}/${id}`)
