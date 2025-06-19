import axiosConfig from '../axiosConfig'
const API = '/dashboard'
export const getDashboardCount  = () => axiosConfig.get(`${API}/count`)