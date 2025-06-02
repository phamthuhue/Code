import moment from "moment";
import qs from "qs";
import { signVnpayParams } from "../utils/vnpay.js";

export const createPaymentUrl = (req, res) => {
  // 👇 Data từ frontend gửi lên
  const { amount, orderInfo, bookingId } = req.body;

  if (!amount || !orderInfo || !bookingId) {
    return res.status(400).json({ message: "Thiếu thông tin thanh toán" });
  }

  const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const tmnCode = process.env.VNP_TMNCODE;
  const secretKey = process.env.VNP_HASH_SECRET;
  const vnpUrl = process.env.VNP_URL;
  const returnUrl = process.env.VNP_RETURN_URL;

  const createDate = moment().format("YYYYMMDDHHmmss");
  const orderId = moment().format("HHmmss"); // Mỗi lần thanh toán nên khác nhau
  const locale = "vn";
  const currency = "VND";
  const bankCode = ""; // Có thể để trống nếu không chọn ngân hàng cụ thể

  const vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currency,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: `${orderInfo} - BookingID: ${bookingId}`,
    vnp_OrderType: "other",
    vnp_Amount: amount * 100, // nhân 100 theo yêu cầu VNPAY
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  // Nếu chọn ngân hàng cụ thể:
  if (bankCode) {
    vnp_Params.vnp_BankCode = bankCode;
  }

  // ✅ Bước ký hash
  const vnp_SecureHash = signVnpayParams(vnp_Params, secretKey);
  vnp_Params.vnp_SecureHash = vnp_SecureHash;

  // ✨ Tạo URL redirect
  const querystring = qs.stringify(vnp_Params, { encode: false });

  const paymentUrl = `${vnpUrl}?${querystring}`;

  return res.json({ paymentUrl });
};
