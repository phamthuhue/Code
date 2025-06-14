import React, { useState } from "react";
import axiosInstance from "@utils/axiosInstance";
import { notify } from "@utils/notify";

const CancelModal = ({ isOpen, onClose, bookingId, userId, onReload }) => {
  const [cancelReason, setCancelReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("Chuyển khoản");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [walletProvider, setWalletProvider] = useState("");
  const [walletPhone, setWalletPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const bankOptions = ["Vietcombank", "Techcombank", "BIDV", "VPBank", "ACB"];
  const walletOptions = ["MoMo", "ZaloPay", "VNPay"];

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      bookingId,
      userId,
      cancelReason,
      refundMethod,
      refundAccountName: refundMethod === "Chuyển khoản" ? accountName : undefined,
      refundAccountNumber: refundMethod === "Chuyển khoản" ? accountNumber : undefined,
      refundBankName: refundMethod === "Chuyển khoản" ? bankName : undefined,
      refundWalletProvider: refundMethod === "Ví điện tử" ? walletProvider : undefined,
      refundWalletPhone: refundMethod === "Ví điện tử" ? walletPhone : undefined,
    };
    
    // console.log("Payload gửi lên:", payload);

    try {
        if (!cancelReason) {
          notify("warning", "Vui lòng nhập lý do hủy");
          return;
        }

        // Gửi yêu cầu hủy
        await axiosInstance.post("/booking-cancellations", payload);
        // Gọi API cập nhật trạng thái booking thành "Chờ hủy"
        await axiosInstance.put(`/bookings/${bookingId}/status`, {
          status: "Chờ hủy",
        });

        notify(
          "success",
          "Gửi yêu cầu hủy thành công",
          "Chúng tôi đã lưu lại yêu cầu hủy của bạn.",
          2
        );

        // Đóng modal và reload danh sách cha
        onClose();
        onReload();

        // Thêm return để chặn chạy xuống catch
        return;
      } catch (err) {
        console.error("Lỗi:", err);
        setError("Gửi yêu cầu thất bại.");
        notify(
          "error",
          "Gửi yêu cầu hủy thất bại",
          err.response?.data?.error || err.message,
          3
        );
      } finally {
        setSubmitting(false);
      }
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Yêu cầu hủy đặt tour</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl font-bold">&times;</button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Nội dung */}
        <div className="space-y-4">
          <textarea
            placeholder="Lý do hủy"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div>
            <label className="block font-medium">Phương thức hoàn tiền:</label>
            <select
              value={refundMethod}
              onChange={(e) => setRefundMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Chuyển khoản">Chuyển khoản</option>
              <option value="Ví điện tử">Ví điện tử</option>
            </select>
          </div>

          {refundMethod === "Chuyển khoản" ? (
            <>
              <input
                className="w-full p-2 border rounded"
                placeholder="Tên tài khoản"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Số tài khoản"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
                <select
                className="w-full p-2 border rounded"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                >
                <option value="">-- Chọn ngân hàng --</option>
                {bankOptions.map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                ))}
                </select>
            </>
          ) : (
            <>
                <select
                className="w-full p-2 border rounded"
                value={walletProvider}
                onChange={(e) => setWalletProvider(e.target.value)}
                >
                <option value="">-- Chọn ví điện tử --</option>
                {walletOptions.map((wallet) => (
                    <option key={wallet} value={wallet}>{wallet}</option>
                ))}
                </select>
              <input
                className="w-full p-2 border rounded"
                placeholder="SĐT đăng ký ví"
                value={walletPhone}
                onChange={(e) => setWalletPhone(e.target.value)}
              />
            </>
          )}

          <button
            onClick={handleSubmit}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
            disabled={submitting}
          >
            {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;