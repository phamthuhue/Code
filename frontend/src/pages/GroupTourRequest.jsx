import React, { useState, useEffect } from "react";
import axios from "axios";
import Img from "./../../src/assets/images/DuLichDoan.jpg"

export const GroupTourRequest = () => {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    preferredTourId: "",
    travelDate: "",
    specialRequest: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/api/tours")
      .then(res => setTours(res.data))
      .catch(err => console.error("Lỗi lấy tour:", err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { customerName, email, phone, numberOfPeople, preferredTourId, travelDate } = formData;

    if (!customerName || !email || !phone || !numberOfPeople || !preferredTourId || !travelDate) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc có dấu *.");
      return;
    }

    setError("");

    try {
      await axios.post("/api/group-tour-requests", formData);
      alert("Gửi yêu cầu thành công!");
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        numberOfPeople: "",
        preferredTourId: "",
        travelDate: "",
        specialRequest: ""
      });
    } catch (err) {
      alert("Gửi thất bại!");
      console.error(err);
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
          Du lịch khách đoàn là một loại hình cung cấp dịch vụ du lịch cho các công ty, xí nghiệp, các tổ chức, đoàn thể,...
          khách hàng sẽ đưa ra những nhu cầu riêng cho một tour du lịch mà khách hàng mong muốn.
          Khách hàng sẽ sử dụng chung các dịch vụ ăn uống, nghỉ ngơi và tham quan từ đơn vị lữ hành cung cấp,
          đơn vị lữ hành sẽ tư vấn và thiết kế một lịch trình sao cho hợp lý nhất và đáp ứng được đầy đủ mong muốn của khách hàng.
        </p>
      </div>

      <form className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-blue-800 text-center">Form đăng ký</h2>

        {error && <p className="text-red-600">{error}</p>}

        <label className="block">
          Họ và tên <span className="text-red-500">*</span>
          <input className="w-full border p-2 rounded" type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
        </label>

        <label className="block">
          Email <span className="text-red-500">*</span>
          <input className="w-full border p-2 rounded" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label className="block">
          Số điện thoại <span className="text-red-500">*</span>
          <input className="w-full border p-2 rounded" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label className="block">
          Số người <span className="text-red-500">*</span>
          <input className="w-full border p-2 rounded" type="number" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} required />
        </label>

        <label className="block">
          Tour mong muốn <span className="text-red-500">*</span>
          <select className="w-full border p-2 rounded" name="preferredTourId" value={formData.preferredTourId} onChange={handleChange} required>
            <option value="">-- Chọn tour --</option>
            {tours.map(tour => (
              <option key={tour._id} value={tour._id}>
                {tour.name} - {tour.location}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Ngày khởi hành mong muốn <span className="text-red-500">*</span>
          <input className="w-full border p-2 rounded" type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} required />
        </label>

        <label className="block">
          Yêu cầu đặc biệt (không bắt buộc)
          <textarea className="w-full border p-2 rounded" name="specialRequest" value={formData.specialRequest} onChange={handleChange} rows="3" />
        </label>

        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit">Gửi yêu cầu</button>
      </form>

      <div className="h-10" /> {/* khoảng trắng dưới cùng */}
    </div>
  );
};
