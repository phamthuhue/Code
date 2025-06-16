import axiosConfig from '../axiosConfig'
const API = '/invoices'
export const getInvoices = () => axiosConfig.get(API)
export const createInvoice = (data) => axiosConfig.post(API, data)
export const updateInvoice = (id, data) => axiosConfig.put(`${API}/${id}`, data)
export const deleteInvoice = (id) => axiosConfig.delete(`${API}/${id}`)