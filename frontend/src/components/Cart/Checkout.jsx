import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";

import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "@utils/axiosInstance";
import { notify } from "@utils/notify";
import { Form, Input, InputNumber } from "antd";

export const Checkout = ({
    title,
    price,
    reviews,
    avgRating,
    tourId,
    maxGroupSize,
    tour,
}) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [booking, setBooking] = useState({
        userId: user && user._id,
        tourId: tourId,
        name: "",
        phone: "",
        startDate: "",
        numberOfPeople: 1,
    });

    useEffect(() => {
        if (!tourId) return;

        const fetchTourServices = async () => {
            try {
                // Lấy thông tin tour
                const tourRes = await axiosInstance.get(`/tours/${tourId}`);
                const tour = tourRes.data?.data;

                if (tour?.startDate) {
                    setBooking((prev) => ({
                        ...prev,
                        startDate: tour.startDate,
                    }));
                }

                // Lấy danh sách dịch vụ
                const res = await axiosInstance.get(
                    `/tour-services/tour/${tourId}`
                );
                if (res.data && Array.isArray(res.data.services)) {
                    setServices(res.data.services);
                } else {
                    console.warn("Dữ liệu dịch vụ không phải mảng:", res.data);
                }
            } catch (err) {
                console.error(
                    "Lỗi lấy dịch vụ:",
                    err.response?.data?.message || err.message
                );
            }
        };

        fetchTourServices();
    }, [tourId]);

    const handleChange = (value, fieldName) => {
        setBooking((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const toggleService = (service) => {
        setSelectedServices((prev) => {
            const existingService = prev.find((s) => s._id === service._id);
            if (existingService) {
                // Nếu đã có, bỏ chọn
                return prev.filter((s) => s._id !== service._id);
            } else {
                // Nếu chưa có, thêm mới với số lượng mặc định là 1
                return [...prev, { ...service, quantity: 1 }];
            }
        });
    };

    const updateServiceQuantity = (serviceId, newQuantity) => {
        setSelectedServices((prev) =>
            prev.map((s) =>
                s._id === serviceId ? { ...s, quantity: newQuantity } : s
            )
        );
    };

    const totalServicePrice = selectedServices.reduce((total, s) => {
        return total + s.servicePrice * s.quantity;
    }, 0);

    const totalPrice =
        Number(price) * booking.numberOfPeople + totalServicePrice;

    const handleCheckoutClick = async () => {
        setLoading(true);
        try {
            const { name, phone, startDate, numberOfPeople } = booking;

            // Kiểm tra thông tin đầy đủ
            if (!name.trim() || !phone.trim() || !numberOfPeople) {
                notify(
                    "error",
                    "Lỗi",
                    "Vui lòng điền đầy đủ thông tin đặt tour!"
                );
                setLoading(false);
                return;
            }

            // Validate số điện thoại (regex kiểm tra định dạng)
            const phoneRegex = /^0\d{9,10}$/; // Kiểm tra số điện thoại bắt đầu bằng 0 và có 10-11 chữ số
            if (!phoneRegex.test(phone)) {
                notify(
                    "error",
                    "Lỗi",
                    "Số điện thoại không hợp lệ. Vui lòng nhập lại!"
                );
                return;
            }
            const paymentData = {
                booking,
                selectedServices,
                totalPrice,
                price,
                tourId,
            };
            // Nếu tất cả đều hợp lệ, lưu thông tin và điều hướng đến trang thanh toán
            localStorage.setItem("paymentData", JSON.stringify(paymentData));
            const res = await axiosInstance.post(
                "payment/before-create-payment",
                {
                    ...paymentData,
                    user: user ? user.info : null,
                }
            );

            if (res) {
                const invoiceSaved = res.data.data;
                localStorage.setItem(
                    "invoiceSaved",
                    JSON.stringify(invoiceSaved)
                );
                navigate("/payment");
            } else {
                notify("error", "Lỗi", "Có lỗi máy chủ khi đặt tour !");
                return;
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="w-full px-3 max-h-[1010px] font-light bg-darkGreen text-white shadow-md rounded">
            <div className="flex justify-between py-4 px-2 text-center border-b-2 border-gray">
                <h5>{price} VNĐ/1 người</h5>
                <div className="flex items-center">
                    <BsFillStarFill className="text-yellow" />
                    <span className="mx-2 text-sm">
                        {avgRating === 0 ? null : avgRating} (
                        {reviews?.length || 0})
                    </span>
                </div>
            </div>

            <div className="mx-2 p-2">
                <h4 className="text-lg mt-4">Phiếu đặt tour</h4>
                <Form
                    layout="vertical" // Đặt layout của form là vertical (dọc)
                    onFinish={(values) => console.log(values)} // Dùng onFinish thay cho onSubmit
                >
                    <Form.Item
                        label={<>Họ và tên</>}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập họ và tên!",
                            },
                        ]}
                    >
                        <Input
                            value={booking.name}
                            name="name"
                            onChange={(e) =>
                                handleChange(e.target.value, "name")
                            }
                            className="text-black"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<>Số điện thoại</>}
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số điện thoại!",
                            },
                            {
                                pattern: /^0\d{9,10}$/, // Biểu thức chính quy kiểm tra số điện thoại bắt đầu bằng 0 và có 10 hoặc 11 chữ số
                                message:
                                    "Số điện thoại không hợp lệ, vui lòng nhập lại!",
                            },
                        ]}
                    >
                        <Input
                            value={booking.phone}
                            name="phone"
                            onChange={(e) =>
                                handleChange(e.target.value, "phone")
                            }
                            className="text-black"
                        />
                    </Form.Item>
                    <Form.Item
                        label={<>Số lượng khách</>}
                        name="numberOfPeople"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số lượng khách!",
                            },
                        ]}
                    >
                        <InputNumber
                            value={booking.numberOfPeople}
                            name="numberOfPeople"
                            min={1}
                            max={maxGroupSize}
                            onChange={(value) =>
                                handleChange(value, "numberOfPeople")
                            }
                            className="text-black"
                        />
                    </Form.Item>
                </Form>

                <div className="mt-4">
                    <h5 className="mb-2 font-semibold">Chọn thêm dịch vụ:</h5>
                    {Array.isArray(services) && services.length > 0 ? (
                        <div className="space-y-2">
                            {services.map((service) => {
                                const selectedService = selectedServices.find(
                                    (s) => s._id === service._id
                                );
                                return (
                                    <div
                                        key={service._id}
                                        className="flex flex-col p-3 bg-white rounded shadow text-black"
                                    >
                                        <div className="flex justify-between items-center">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedService}
                                                    onChange={() =>
                                                        toggleService(service)
                                                    }
                                                    className="accent-green-600"
                                                />
                                                <span>
                                                    {service.note ||
                                                        "Dịch vụ thêm"}
                                                </span>
                                            </label>
                                            <span className="font-medium text-right">
                                                {service.servicePrice?.toLocaleString()}{" "}
                                                VNĐ/người
                                            </span>
                                        </div>
                                        {selectedService && (
                                            <div className="flex items-center gap-2 mt-2">
                                                <label>Số lượng:</label>

                                                <InputNumber
                                                    min={1}
                                                    max={service.numberOfPeopl}
                                                    value={
                                                        selectedService.quantity
                                                    }
                                                    onChange={(value) =>
                                                        updateServiceQuantity(
                                                            service._id,
                                                            Number(value)
                                                        )
                                                    }
                                                    className="w-16 text-center border border-gray-300 rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-300 italic">
                            Không có dịch vụ nào.
                        </p>
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
                            onClick={handleCheckoutClick}
                            className="submitButton rounded-full px-8"
                            disabled={loading}
                        >
                            {loading ? (
                                <span>
                                    <svg
                                        className="inline mr-2 w-4 h-4 animate-spin"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        />
                                    </svg>
                                    Đang xử lý...
                                </span>
                            ) : (
                                "Đặt ngay"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
