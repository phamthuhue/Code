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
