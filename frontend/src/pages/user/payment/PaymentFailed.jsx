import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import cancelAnimation from "./cancel.json"; // ✅ animation checkmark
const timeToNavigate = 15000; // 15 seconds
const PaymentFailed = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const txnRef = params.get("vnp_TxnRef");
  const responseCode = params.get("vnp_ResponseCode");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/checkout");
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
          <Lottie animationData={cancelAnimation} loop={false} />
        </div>
        <h2 className="text-red-600 text-2xl font-bold mb-2">
          ❌ Thanh toán thất bại
        </h2>
        <p>
          <strong>Mã giao dịch:</strong> {txnRef}
        </p>
        <p className="mb-3">
          <strong>Mã lỗi:</strong> {responseCode}
        </p>
        <p className="text-gray-600 mb-4">
          Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ khách hàng.
        </p>
        <Link to="/checkout">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
            🔁 Thử lại thanh toán
          </button>
        </Link>
        <p className="mt-4 text-sm text-gray-400">
          Bạn sẽ được chuyển về trang thanh toán sau {timeToNavigate / 1000}{" "}
          {` `}
          giây...
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;
