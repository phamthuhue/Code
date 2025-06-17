import axiosConfig from '../axiosConfig'
const API = '/auth/login'
export const login = (data) => axiosConfig.post(API, data)
