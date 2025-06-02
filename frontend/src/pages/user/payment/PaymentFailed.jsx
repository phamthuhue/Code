// src/pages/PaymentFailed.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentFailed = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const txnRef = params.get("vnp_TxnRef");
  const responseCode = params.get("vnp_ResponseCode");

  return (
    <div className="container text-center mt-5">
      <h2 className="text-danger">❌ Thanh toán thất bại</h2>
      <p>
        <strong>Mã giao dịch:</strong> {txnRef}
      </p>
      <p>
        <strong>Mã lỗi:</strong> {responseCode}
      </p>
      <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
      <Link to="/checkout" className="btn btn-warning mt-3">
        Thử lại thanh toán
      </Link>
    </div>
  );
};

export default PaymentFailed;
