import React from 'react';

const PaymentModal = ({ totalPrice, onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-black w-[90%] max-w-md">
        <h3 className="text-lg font-semibold mb-4">Xác nhận thanh toán</h3>
        <p>Tổng tiền: {totalPrice} VNĐ</p>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
            Hủy
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-green-500 text-white rounded">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;