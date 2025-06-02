// src/pages/PaymentSuccess.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const txnRef = params.get("vnp_TxnRef");
  const amount = params.get("vnp_Amount") / 100;
  const orderInfo = params.get("vnp_OrderInfo");

  return (
    <div className="container text-center mt-5">
      <h2 className="text-success">🎉 Thanh toán thành công!</h2>
      <p>
        <strong>Mã giao dịch:</strong> {txnRef}
      </p>
      <p>
        <strong>Số tiền:</strong> {amount.toLocaleString()} VND
      </p>
      <p>
        <strong>Thông tin đơn hàng:</strong> {orderInfo}
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default PaymentSuccess;
