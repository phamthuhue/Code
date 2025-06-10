import crypto from "crypto";

export function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    for (let key of keys) {
        sorted[key] = obj[key];
    }
    return sorted;
}

export function signVnpayParams(params, secretKey) {
    const sortedParams = sortObject(params);

    const querystring = Object.entries(sortedParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

    const signData = crypto
        .createHmac("sha512", secretKey)
        .update(querystring)
        .digest("hex");

    return signData;
}

export const verifyVnpaySignature = (vnp_Params) => {
    const secretKey = process.env.VNP_HASH_SECRET; // Lấy từ môi trường

    // Lấy tất cả các tham số và sắp xếp chúng
    const sortedParams = Object.keys(vnp_Params)
        .filter(
            (key) => key !== "vnp_SecureHash" && key !== "vnp_SecureHashType"
        ) // Loại bỏ vnp_SecureHash và vnp_SecureHashType
        .sort()
        .map((key) => `${key}=${vnp_Params[key]}`)
        .join("&");

    // Tạo chữ ký HMAC với secretKey
    const hmac = crypto.createHmac("sha512", secretKey);
    const secureHash = hmac.update(sortedParams, "utf-8").digest("hex");

    // So sánh chữ ký do VNPay gửi và chữ ký mình tạo
    return secureHash === vnp_Params.vnp_SecureHash;
};

export function sanitizeOrderInfo(str) {
    // 1. Loại bỏ dấu tiếng Việt
    const from =
        "ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸỳỵỷỹ";
    const to =
        "AAAAEEEIIOOOOUUAĐIUOaaaaeeeiiioooouađiuoUAẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂuaạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸỳỵỷỹ";

    let strNoAccent = "";
    for (let i = 0; i < str.length; i++) {
        const index = from.indexOf(str[i]);
        if (index !== -1) {
            strNoAccent += to[index];
        } else {
            strNoAccent += str[i];
        }
    }

    // 2. Thay dấu cách (space) thành dấu gạch dưới
    let strNoSpaces = strNoAccent.replace(/\s+/g, "_");

    // 3. Loại bỏ các ký tự không phải chữ cái, số, gạch dưới
    let sanitized = strNoSpaces.replace(/[^a-zA-Z0-9_]/g, "");

    return sanitized;
}
