import axiosConfig from '../axiosConfig'
const API = '/booking-cancellations'
export const getCancellationBookings = () => axiosConfig.get(API)
export const createCancellationBooking = (data) => axiosConfig.post(API, data)

export const updateCancellationBooking = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const confirmMultipleCancellationBookings = (selectedCancellationBookingIds) => {
  return axiosConfig.put(`${API}/confirm-multiple`, {
    selectedCancellationBookingIds: selectedCancellationBookingIds,
  })
}
export const rejectMultipleCancellationBookings = (selectedCancellationBookingIds) => {
  return axiosConfig.put(`${API}/reject-multiple`, {
    selectedCancellationBookingIds: selectedCancellationBookingIds,
  })
}
export const deleteCancellationBooking = (id) => axiosConfig.delete(`${API}/${id}`)
