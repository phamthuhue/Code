import axiosConfig from '../axiosConfig'
const API = '/bookings'
export const getBookings = () => axiosConfig.get(API)
export const createBooking = (data) =>
  axiosConfig.post(API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const updateBooking = (id, data) =>
  axiosConfig.put(`${API}/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
export const confirmMultipleBookings = (bookingIds) => {
  return axiosConfig.put(`${API}/confirm-multiple`, {
    bookingIds: bookingIds
  });
};
export const deleteBooking = (id) => axiosConfig.delete(`${API}/${id}`)