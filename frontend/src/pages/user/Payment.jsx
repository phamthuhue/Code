import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Payment = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('paymentData');
    if (data) {
    const parsedData = JSON.parse(data);
    console.log("Booking sẽ được lưu:", parsedData.booking);
  } else {
    console.warn("Không tìm thấy paymentData trong localStorage");
  }

    if (!data) {
      navigate('/'); // hoặc về trang checkout
    } else {
      try {
        const parsedData = JSON.parse(data);
        setPaymentData(parsedData);
      } catch (err) {
        console.error("Lỗi đọc dữ liệu paymentData:", err);
        navigate('/');
      }
    }
  }, [navigate]);

  if (!paymentData) return null; // hoặc spinner/loading...

  const { booking, selectedServices, totalPrice, price } = paymentData;

  return (
    <div>
      <h1>Trang Thanh Toán</h1>
      <p>Tên khách: {booking.name}</p>
      <p>SĐT: {booking.phone}</p>
      <p>Ngày khởi hành: {booking.startDate ? new Date(booking.startDate).toLocaleDateString('vi-VN') : ''}</p>
      <p>Số lượng: {booking.numberOfPeople}</p>
      <p>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</p>

      <h2>Dịch vụ đã chọn:</h2>
      <ul>
        {selectedServices.map((s) => (
          <li key={s._id}>{s.note} - {s.servicePrice.toLocaleString()} VNĐ/người</li>
        ))}
      </ul>
    </div>
  );
};