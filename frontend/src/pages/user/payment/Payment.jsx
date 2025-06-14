import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "@utils/notify";
import axiosInstance from "@utils/axiosInstance";
import { AuthContext } from "context/AuthContext";

export const Payment = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { bookingId } = useParams();

    const [paymentData, setPaymentData] = useState(null);
    const [invoiceSaved, setInvoiceSaved] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        const fetchBookingFromDB = async () => {
            try {
                const res = await axiosInstance.get(`/bookings/${bookingId}`);
                const selectedServicesRes = await axiosInstance.get(
                    `/booking-details/item-type/${bookingId}`
                );
                const selectedServices = selectedServicesRes.data;
                const booking = res.data.data;
                const price = booking.tourPrice;
                const totalPrice = booking.totalPrice;

                setPaymentData({
                    booking,
                    selectedServices,
                    price,
                    totalPrice,
                });
            } catch (error) {
                console.error("Không thể lấy booking từ DB:", error);
                navigate("/");
            }
        };

        if (bookingId) {
            fetchBookingFromDB();
        } else {
            const data = localStorage.getItem("paymentData");
            if (data) {
                try {
                    const parsedData = JSON.parse(data);
                    setPaymentData(parsedData);
                } catch (err) {
                    console.error("Lỗi đọc dữ liệu paymentData:", err);
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        }

        const invoiceSaved = localStorage.getItem("invoiceSaved") ?? null;
        setInvoiceSaved(JSON.parse(invoiceSaved));
    }, [bookingId, navigate]);

    if (!paymentData) return null;
    if (!invoiceSaved) return null;

    const { booking, selectedServices, totalPrice } = paymentData;

    const handlePayment = async () => {
        if (!paymentMethod) {
            notify(
                "warning",
                "Cảnh báo",
                "Vui lòng chọn phương thức thanh toán!"
            );
            return;
        }

        try {
            if (paymentMethod === "vnpay") {
                const res = await axiosInstance.post("payment/create-payment", {
                    ...paymentData,
                    user: user ? user.info : null,
                    invoiceSaved,
                });

                const { paymentUrl } = res.data;
                if (paymentUrl) {
                    window.location.href = paymentUrl;
                    // window.open(paymentUrl, "_blank", "noopener,noreferrer");
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
                    <strong>Tổng tiền:</strong> {totalPrice} VNĐ
                </p>

                <h2 className="mt-4 font-semibold">Dịch vụ đã chọn:</h2>
                <ul className="list-disc pl-5">
                    {selectedServices.map((s) => (
                        <li key={s._id}>{s.description || s.note}</li>
                    ))}
                </ul>
            </div>

            {/* Chọn phương thức thanh toán */}
            <div className="bg-white rounded shadow p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Phương thức thanh toán
                </h1>

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
