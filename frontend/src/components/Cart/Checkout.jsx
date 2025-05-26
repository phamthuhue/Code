import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

import { BASE_URL } from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from "@utils/axiosInstance";

import PaymentModal from '../Modal/PaymentModal'; // import modal riêng

export const Checkout = ({ title, price, reviews, avgRating, tourId }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    tourId: tourId,
    name: '',
    phone: '',
    startDate: '',
    numberOfPeople: 1,
  });

  useEffect(() => {
    if (!tourId) return;

    const fetchTourServices = async () => {
      try {
        const res = await axiosInstance.get(`/tour-services/tour/${tourId}`);
        // Kiểm tra res.data là object có thuộc tính services không
        if (res.data && Array.isArray(res.data.services)) {
          setServices(res.data.services);
          console.log("Dịch vụ tour:", res.data.services);
        } else {
          console.warn("Dữ liệu dịch vụ không phải mảng:", res.data);
        }
      } catch (err) {
        console.error("Lỗi lấy dịch vụ:", err.response?.data?.message || err.message);
      }
    };

    fetchTourServices();
  }, [tourId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [id]: id === "numberOfPeople" ? Number(value) : value,
    }));
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.find((s) => s._id === service._id)
        ? prev.filter((s) => s._id !== service._id)
        : [...prev, service]
    );
  };

  const totalServicePrice = selectedServices.reduce((total, s) => {
    return total + s.servicePrice * booking.numberOfPeople;
  }, 0);

  const totalPrice = Number(price) * booking.numberOfPeople + totalServicePrice;

  const handleConfirmBooking = async () => {
    try {
      const bookingRes = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...booking, totalPrice }),
      });

      const savedBooking = await bookingRes.json();

      if (!bookingRes.ok) {
        return alert(savedBooking.message);
      }

      if (selectedServices.length > 0) {
        await Promise.all(
          selectedServices.map((service) =>
            fetch(`${BASE_URL}/booking-detail`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                bookingId: savedBooking._id,
                tourServiceId: service._id,
                itemType: 'Service',
                description: service.note || 'Dịch vụ thêm',
                quantity: booking.numberOfPeople,
                unitPrice: service.servicePrice,
                totalPrice: service.servicePrice * booking.numberOfPeople,
              }),
            })
          )
        );
      }

      navigate('/thank-you');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full px-3 max-h-[1010px] font-light bg-darkGreen text-white shadow-md rounded">
      <div className="flex justify-between py-4 px-2 text-center border-b-2 border-gray">
        <h5>{price} VNĐ/1 người</h5>
        <div className="flex items-center">
          <BsFillStarFill className="text-yellow" />
          <span className="mx-2 text-sm">
            {avgRating === 0 ? null : avgRating} ({reviews?.length || 0})
          </span>
        </div>
      </div>

      <div className="mx-2 p-2">
        <h4 className="text-lg mt-4">Phiếu đặt tour</h4>
        <form className="grid gap-3">
          <label htmlFor="name">Họ và tên</label>
          <input id="name" type="text" onChange={handleChange} />

          <label htmlFor="phone">Số điện thoại</label>
          <input id="phone" type="text" onChange={handleChange} />

          <label htmlFor="startDate">Ngày khởi hành</label>
          <input id="startDate" type="date" onChange={handleChange} />

          <label htmlFor="numberOfPeople">Số lượng khách</label>
          <input
            id="numberOfPeople"
            type="number"
            value={booking.numberOfPeople}
            min={1}
            onChange={handleChange}
          />
        </form>

        <div className="mt-4">
          <h5 className="mb-2 font-semibold">Chọn thêm dịch vụ:</h5>
          {Array.isArray(services) && services.length > 0 ? (
            <div className="space-y-2">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="flex justify-between items-center p-3 bg-white rounded shadow text-black"
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedServices.some((s) => s._id === service._id)}
                      onChange={() => toggleService(service)}
                      className="accent-green-600"
                    />
                    <span>{service.note || 'Dịch vụ thêm'}</span>
                  </label>
                  <span className="font-medium text-right">
                    {service.servicePrice?.toLocaleString()} VNĐ/người
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 italic">Không có dịch vụ nào.</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4 resume">
          <div>
            <span>{price} VNĐ / 1 người</span>
            <span>{price * booking.numberOfPeople} VNĐ</span>
          </div>
          <div>
            <span>Chi phí dịch vụ</span>
            <span>{totalServicePrice} VNĐ</span>
          </div>
          <div className="font-bold">
            <span>Tổng</span>
            <span>{totalPrice} VNĐ</span>
          </div>
          <div className="self-center">
            <button
              onClick={() => setShowPaymentPopup(true)}
              className="submitButton rounded-full px-8"
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>

      {showPaymentPopup && (
        <PaymentModal
          totalPrice={totalPrice}
          onCancel={() => setShowPaymentPopup(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};
