import crypto from "crypto";
import axios from "axios";

export const createMoMoPayment = async (req, res) => {
  try {
    const { amount, redirectUrl } = req.body;

    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = "Thanh toán tour du lịch";
    const ipnUrl = redirectUrl;
    const requestType = "captureWallet";
    const extraData = "";

    // Tạo chữ ký (signature)
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: "vi",
    };

    // Gửi yêu cầu tới MoMo bằng axios
    const momoRes = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(momoRes.data);

  } catch (err) {
    console.error("Lỗi khi gọi MoMo API:", err);
    res.status(500).json({ message: "Không thể tạo thanh toán MoMo" });
  }
};