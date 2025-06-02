// src/pages/PaymentSuccess.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "./success.json"; // ✅ animation checkmark
const timeToNavigate = 15000; // 15 seconds
const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const txnRef = params.get("vnp_TxnRef");
  const amount = params.get("vnp_Amount") / 100;
  const orderInfo = params.get("vnp_OrderInfo");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, timeToNavigate);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center ">
      <div
        className="card shadow p-4 text-center"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        {/* ✅ Lottie animation */}
        <div style={{ width: 180, margin: "0 auto" }}>
          <Lottie animationData={successAnimation} loop={false} />
        </div>

        <h2 className="text-success mt-3">🎉 Thanh toán thành công!</h2>
        <p className="text-muted">Cảm ơn bạn đã đặt tour với chúng tôi.</p>

        <div className="text-start mt-4 small">
          <p>
            <strong>Mã giao dịch:</strong> {txnRef}
          </p>
          <p>
            <strong>Số tiền:</strong> {amount.toLocaleString()} VND
          </p>
          <p>
            <strong>Thông tin đơn hàng:</strong> {orderInfo}
          </p>
        </div>

        <Link to="/" className="btn btn-primary mt-4">
          ⏎ Quay về trang chủ ngay
        </Link>
        <p className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
          Hoặc chờ {timeToNavigate / 1000} {` `} giây để được chuyển tự động...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
