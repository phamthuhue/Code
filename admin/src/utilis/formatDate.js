import dayjs from 'dayjs'

/**
 * Hàm định dạng ngày
 * @param {string} dateString - Chuỗi ngày cần định dạng (ISO 8601)
 * @param {string} formatString - Chuỗi định dạng (ví dụ: 'DD/MM/YYYY')
 * @returns {string} - Ngày đã được định dạng
 */
export const formatDate = (dateString, formatString = 'DD/MM/YYYY') => {
  return dayjs(dateString).format(formatString)
}
