import axiosConfig from '../axiosConfig'
const API = '/dashboard'
export const getDashboardCount  = () => axiosConfig.get(`${API}/count`)
export const getTop5Tours  = () => axiosConfig.get(`${API}/top-5-tours`)
export const getTop5Services  = () => axiosConfig.get(`${API}/top-5-services`)