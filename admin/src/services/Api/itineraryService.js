import axiosConfig from '../axiosConfig'
const API = '/itineraries'
export const getItineraries = () => axiosConfig.get(API)
export const getItineraryByTour = (tourId) => axiosConfig.get(`${API}/tour/${tourId}`)
export const createItinerary = (data) => axiosConfig.post(API, data)

export const updateItinerary = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteItinerary = (id) => axiosConfig.delete(`${API}/${id}`)
export const deleteItineraryByTour = (tourId) => axiosConfig.get(`${API}/tour/${tourId}`)
