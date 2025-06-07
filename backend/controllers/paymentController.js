import moment from "moment";
import { sanitizeOrderInfo, signVnpayParams } from "../utils/vnpay.js";

export const createPaymentUrl = (req, res) => {
  const { amount, orderInfo, bookingId } = req.body;

  if (!amount || !orderInfo || !bookingId) {
    return res.status(400).json({ message: "Thiếu thông tin thanh toán" });
  }

  const ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    "127.0.0.1";
  const tmnCode = process.env.VNP_TMNCODE;
  const secretKey = process.env.VNP_HASH_SECRET;
  const vnpUrl = process.env.VNP_URL;
  const returnUrl = `${process.env.CLIENT_URL}/payment-success`;
  const createDate = moment().format("YYYYMMDDHHmmss");
  const orderId = moment().format("HHmmss");

  // Các tham số thanh toán
  const vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: sanitizeOrderInfo(orderInfo),
    vnp_OrderType: "other",
    vnp_Amount: amount * 100, // VNPay yêu cầu nhân 100
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  // 🔐 Ký các tham số (phải encode giá trị)
  const signedHash = signVnpayParams(vnp_Params, secretKey);
  vnp_Params.vnp_SecureHash = signedHash;

  // 🔗 Tạo URL thanh toán (encode giá trị đúng chuẩn)
  const querystring = Object.entries(vnp_Params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const paymentUrl = `${vnpUrl}?${querystring}`;

  return res.json({ paymentUrl });
};

export const vnpayIpnHandler = async (req, res) => {
  console.log("aaaaaaaaaaaaaaaaaaa ");
  // let vnp_Params = req.query;

  // // Lưu ý: Xóa trường hash trước khi xác thực
  // const secureHash = vnp_Params["vnp_SecureHash"];
  // delete vnp_Params["vnp_SecureHash"];
  // delete vnp_Params["vnp_SecureHashType"];

  // // Sắp xếp params alphabetically
  // vnp_Params = Object.keys(vnp_Params)
  //   .sort()
  //   .reduce((result, key) => {
  //     result[key] = vnp_Params[key];
  //     return result;
  //   }, {});

  // // Tạo hash xác thực
  // const secretKey = process.env.VNP_HASH_SECRET;
  // const signData = Object.entries(vnp_Params)
  //   .map(([key, value]) => `${key}=${value}`)
  //   .join("&");
  // const checkHash = crypto
  //   .createHmac("sha512", secretKey)
  //   .update(signData)
  //   .digest("hex");

  // if (secureHash === checkHash) {
  //   // Đã xác thực IPN từ VNPay là hợp lệ!
  //   const txnRef = vnp_Params["vnp_TxnRef"];
  //   const responseCode = vnp_Params["vnp_ResponseCode"];

  //   // Ví dụ cập nhật trạng thái booking
  //   if (responseCode === "00") {
  //     // Thanh toán thành công
  //     await updateBookingStatus(txnRef, "paid");
  //   } else {
  //     // Thanh toán thất bại
  //     await updateBookingStatus(txnRef, "failed");
  //   }
  //   // Trả về đúng response cho VNPay
  //   res.status(200).json({ RspCode: "00", Message: "Success" });
  // } else {
  //   res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  // }
};
