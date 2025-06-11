import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { message } from "antd";
import axiosInstance from "@utils/axiosInstance";
import { notify } from "@utils/notify";

export const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu mới và xác nhận không khớp!");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/auth/change-password", {
        userId: user.info._id,
        currentPassword,
        newPassword,
      });
      notify(
        "success",
        "Đổi mật khẩu thành công"
      );
      navigate("/"); // Điều hướng về trang chủ
    } catch (err) {
      console.error("Chi tiết lỗi:", {
    message: err.message,
    responseData: err.response?.data,
    stack: err.stack,
  });
      const errorMessage = err.response?.data?.message ;
      notify("error", "Đổi mật khẩu thất bại ", errorMessage, 2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 text-center">Đổi mật khẩu</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block mb-1">Mật khẩu hiện tại</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Mật khẩu mới</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? "Đang đổi..." : "Đổi mật khẩu"}
            </button>
          </div>
        </form>
      </div>
      <div className="h-10" /> {/* khoảng trắng dưới cùng */}
    </div>
  );
};