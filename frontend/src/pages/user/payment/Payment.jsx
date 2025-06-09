import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "@utils/notify";
import axiosInstance from "@utils/axiosInstance";

export const Payment = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("paymentData");
    if (data) {
      const parsedData = JSON.parse(data);
      console.log("Booking sẽ được lưu:", parsedData.booking);
    } else {
      console.warn("Không tìm thấy paymentData trong localStorage");
    }

    if (!data) {
      navigate("/"); // hoặc về trang checkout
    } else {
      try {
        const parsedData = JSON.parse(data);
        setPaymentData(parsedData);
      } catch (err) {
        console.error("Lỗi đọc dữ liệu paymentData:", err);
        navigate("/");
      }
    }
  }, [navigate]);

  if (!paymentData) return null; // hoặc spinner/loading...

  const { booking, selectedServices, totalPrice, price } = paymentData;

  const handlePayment = async () => {
    if (!paymentMethod) {
      notify("warning", "Cạnh báo", "Vui lòng chọn phương thức thanh toán!");
      return;
    }

    try {
      if (paymentMethod === "vnpay") {
        const res = await axiosInstance.post("payment/create-payment", {
          amount: paymentData?.totalPrice, // Số tiền thanh toán, có thể thay đổi tùy theo tour
          orderInfo: "Thanh toán tour du lịch",
          bookingId: "123456", //
        });

        const { paymentUrl } = res.data;
        console.log("paymentUrl: ", paymentUrl);
        if (paymentUrl) {
          // 🔁 Redirect sang VNPAY
          window.location.href = paymentUrl; // Chuyển hướng trong cùng một tab
        }
      } else if (paymentMethod === "momo") {
        const res = await axios.post(
          "http://localhost:8000/api/v1/momo/create",
          {
            amount: totalPrice,
            redirectUrl: "http://localhost:3000/payment-success",
          }
        );

        if (res.data && res.data.payUrl) {
          window.location.href = res.data.payUrl;
        } else {
          alert("Không nhận được URL thanh toán từ MoMo.");
        }
      }
    } catch (err) {
      console.error("Lỗi khi gọi thanh toán:", err);
      alert("Không thể tạo liên kết thanh toán");
    }
  };

  const handleMomoPayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/momo/create", {
        amount: totalPrice,
        bookingInfo: booking,
        redirectUrl: "http://localhost:3000/payment-success", // hoặc payment-notify nếu cần
      });

      if (res.data && res.data.payUrl) {
        window.location.href = res.data.payUrl; // chuyển hướng đến cổng thanh toán MoMo
      } else {
        alert("Không nhận được URL thanh toán từ MoMo.");
      }
    } catch (error) {
      console.error("Lỗi gọi API MoMo:", error);
      alert("Đã có lỗi xảy ra khi tạo thanh toán.");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Thông tin đặt tour */}
      <div className="bg-white rounded shadow p-4">
        <h1 className="text-2xl font-bold mb-4">Thông tin đặt tour</h1>
        <p>
          <strong>Tên khách:</strong> {booking.name}
        </p>
        <p>
          <strong>SĐT:</strong> {booking.phone}
        </p>
        <p>
          <strong>Ngày khởi hành:</strong>{" "}
          {new Date(booking.startDate).toLocaleDateString("vi-VN")}
        </p>
        <p>
          <strong>Số lượng:</strong> {booking.numberOfPeople}
        </p>
        <p>
          <strong>Tổng tiền:</strong> {totalPrice.toLocaleString()} VNĐ
        </p>

        <h2 className="mt-4 font-semibold">Dịch vụ đã chọn:</h2>
        <ul className="list-disc pl-5">
          {selectedServices.map((s) => (
            <li key={s._id}>
              {s.note} - {s.servicePrice.toLocaleString()} VNĐ/người
            </li>
          ))}
        </ul>
      </div>

      {/* Chọn phương thức thanh toán */}
      <div className="bg-white rounded shadow p-4">
        <h1 className="text-2xl font-bold mb-4">Phương thức thanh toán</h1>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="vnpay"
              checked={paymentMethod === "vnpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Thanh toán qua VNPay</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Thanh toán qua MoMo</span>
          </label>

          <button
            onClick={handlePayment}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};
