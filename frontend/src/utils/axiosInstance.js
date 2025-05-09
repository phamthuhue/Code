// src/utils/axiosInstance.js
import axios from "axios";
import { BASE_URL } from "./config";

const BASE_URL_ENTRY = process.env.REACT_APP_BASE_URL_API || BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL_ENTRY, // tuỳ cách bạn config .env
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // nếu bạn dùng cookie để xác thực
});

// Bạn có thể thêm interceptors ở đây nếu cần
console.log("axiosInstance: ", axiosInstance);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tùy xử lý lỗi toàn cục
    return Promise.reject(error);
  }
);

export default axiosInstance;
