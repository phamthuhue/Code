// src/utils/axiosInstance.js
import axios from "axios";
import { BASE_URL } from "./config";
import { notify } from "./notify";
import { jwtDecode } from "jwt-decode";
const excludedUrls = [
  "/auth/login",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const BASE_URL_ENTRY = process.env.REACT_APP_BASE_URL_API || BASE_URL;
console.log("BASE_URL_ENTRY: ", BASE_URL_ENTRY);

const axiosInstance = axios.create({
  baseURL: BASE_URL_ENTRY, // tuỳ cách bạn config .env

  withCredentials: true, // nếu bạn dùng cookie để xác thực
});
function isTokenExpired(token) {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    const now = Date.now() / 1000; // tính bằng giây
    return exp < now;
  } catch (e) {
    return true; // nếu token lỗi thì coi như hết hạn
  }
}

function logout(message, redirect = true) {
  localStorage.removeItem("user");
  notify(redirect ? "error" : "warning", "Phiên đăng nhập hết hạn", message, 2);
  setTimeout(
    () =>
      redirect
        ? (window.location.href = "/auth/login")
        : window.location.reload(),
    1000
  );
}
// Gắn token + kiểm tra hạn
axiosInstance.interceptors.request.use(
  (config) => {
    if (excludedUrls.includes(config.url)) {
      return config;
    }
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    if (user && user.token) {
      if (isTokenExpired(user.token)) {
        logout("Vui lòng đăng nhập lại", false);
        throw new axios.Cancel("Mã token đã hết hạn");
      }
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Bạn có thể thêm interceptors ở đây nếu cần
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      // 🧹 Xóa token hoặc user khỏi localStorage
      const errorMessage = error.response?.data?.message || "Đã có lỗi xảy ra";
      logout(errorMessage); // gọi logout với thông báo từ BE nếu có
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
