import crypto from "crypto";
import qs from "qs";

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
  const querystring = qs.stringify(sortedParams, { encode: false });
  const signData = crypto
    .createHmac("sha512", secretKey)
    .update(querystring)
    .digest("hex");
  return signData;
}
