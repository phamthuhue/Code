import { notification } from "antd";

/**
 * Hiển thị notification với tuỳ chọn mở rộng.
 * @param {"success" | "error" | "info" | "warning"} type - Loại thông báo.
 * @param {string} message - Tiêu đề chính.
 * @param {string} description - Nội dung phụ.
 * @param {number} duration - (Tuỳ chọn) thời gian hiển thị (giây). Mặc định là 3.
 */
export const notify = (type, message, description = "", duration = 3) => {
  notification[type]({
    message,
    description,
    duration,
  });
};
