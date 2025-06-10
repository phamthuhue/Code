import React, { useState, useContext, useEffect } from "react";
// import Img from "./../../assets/images/DuLichDoan.jpg";
import Img from "./../../assets/images/groupTravel_cut.jpeg";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "@utils/config";
import { notify } from "@utils/notify";
// Giả sử bạn đang dùng AuthContext
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "@utils/axiosInstance";

export const GroupTourRequest = () => {
  const { user } = useContext(AuthContext); // Lấy user đang đăng nhập
  useEffect(() => {
    console.log("User hiện tại trong context:", user);
  }, [user]);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    tourId: "", // Sửa lại cho đúng với model
    travelDate: "",
    specialRequest: "",
  });

  const [error, setError] = useState("");

  const { data: tour } = useFetch(`tours`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { customerName, email, phone, numberOfPeople, tourId, travelDate } =
      formData;

    if (
      !customerName ||
      !email ||
      !phone ||
      !numberOfPeople ||
      !tourId ||
      !travelDate
    ) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc có dấu *.");
      return;
    }

    setError("");

    try {
      const payload = {
        ...formData,
        numberOfPeople: Number(formData.numberOfPeople),
        userId: user?.info?._id, // truyền thêm userId cho backend
      };

      await axiosInstance.post("/groupTourRequests", payload);
      notify(
        "success",
        "Gửi form thành công",
        "Chúng tôi đã lưu lại đơn đăng ký của bạn.",
        2
      );

      // Reset form
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        numberOfPeople: "",
        tourId: "",
        travelDate: "",
        specialRequest: "",
      });
    } catch (err) {
      console.error("Lỗi gửi form:", err); // Log chi tiết

      const errorMessage =
        err.response?.data?.message ||
        err.message || // Lỗi mạng, không có response
        "Đã có lỗi xảy ra";

      notify("error", "Gửi form thất bại", errorMessage, 2);
    }
  };

  return (
    <div className="">
      <div className="max-w-[1640px] px-4 py-6 mx-8 mb-4 text-sm">
        <img
          src={Img}
          alt="Du lịch đoàn"
          className="w-full h-auto rounded-xl mb-2"
        />

        <h1 className="text-2xl font-bold mb-2 text-black">Du lịch đoàn</h1>
        <p className="text-gray-700 leading-relaxed">
          Du lịch khách đoàn là một loại hình cung cấp dịch vụ du lịch cho các
          công ty, xí nghiệp, các tổ chức, đoàn thể,... khách hàng sẽ đưa ra
          những nhu cầu riêng cho một tour du lịch mà khách hàng mong muốn.
          Khách hàng sẽ sử dụng chung các dịch vụ ăn uống, nghỉ ngơi và tham
          quan từ đơn vị lữ hành cung cấp, đơn vị lữ hành sẽ tư vấn và thiết kế
          một lịch trình sao cho hợp lý nhất và đáp ứng được đầy đủ mong muốn
          của khách hàng.
        </p>
      </div>
      <form
        className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-blue-800 text-center">
          Form đăng ký
        </h2>

        {error && <p className="text-red-600">{error}</p>}

        <label className="block">
          Họ và tên <span className="text-red-500">*</span>
          <input
            className="w-full border p-2 rounded font-light"
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />
        </label>

        <label className="block">
          Email <span className="text-red-500">*</span>
          <input
            className="w-full border p-2 rounded font-light"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className="block">
          Số điện thoại <span className="text-red-500">*</span>
          <input
            className="w-full border p-2 rounded font-light"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label className="block">
          Số người <span className="text-red-500">*</span>
          <input
            className="w-full border p-2 rounded font-light"
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
          />
        </label>

        <label className="block">
          Tour mong muốn <span className="text-red-500">*</span>
          <select
            className="w-full border p-2 rounded font-light"
            name="tourId"
            value={formData.tourId}
            onChange={handleChange}
          >
            <option value="">-- Chọn tour --</option>
            {tour.map((tour) => (
              <option key={tour._id} value={tour._id}>
                {tour.title} - {tour.city}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Ngày khởi hành mong muốn <span className="text-red-500">*</span>
          <input
            className="w-full border p-2 rounded font-light"
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
          />
        </label>

        <label className="block">
          Yêu cầu đặc biệt (không bắt buộc)
          <textarea
            className="w-full border p-2 rounded font-light"
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            rows="3"
          />
        </label>

        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Gửi yêu cầu
        </button>
      </form>
      <div className="h-10" /> {/* khoảng trắng dưới cùng */}
    </div>
  );
};
