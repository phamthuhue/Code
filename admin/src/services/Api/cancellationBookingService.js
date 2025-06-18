import axiosConfig from '../axiosConfig'
const API = '/booking-cancellations'
export const getCancellationBookings = () => axiosConfig.get(API)
export const createCancellationBooking = (data) => axiosConfig.post(API, data)

export const updateCancellationBooking = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const confirmMultipleCancellationBookings = (bookingIds) => {
  return axiosConfig.put(`${API}/confirm-multiple`, {
    bookingIds: bookingIds
  });
};
export const rejectMultipleCancellationBookings = (bookingIds) => {
  return axiosConfig.put(`${API}/reject-multiple`, {
    bookingIds: bookingIds
  });
};
export const deleteCancellationBooking = (id) => axiosConfig.delete(`${API}/${id}`)