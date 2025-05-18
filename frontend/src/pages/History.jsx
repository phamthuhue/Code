import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

export const History = () => {
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const { data: bookings, loading, error } = useFetch(`${BASE_URL}/bookings/user/${userId}`);

  const handleReview = (tourId) => {
    window.location.href = `/review/${tourId}`;
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Đã xảy ra lỗi khi tải dữ liệu.</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Lịch sử đặt tour</h1>
      {bookings.length === 0 ? (
        <p>Bạn chưa đặt tour nào.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{booking.tourId?.title || 'Chưa rõ'}</h2>
                <p className="text-sm text-gray-600">Người đặt: {booking.userId?.username || 'Ẩn danh'}</p>
                <p className="text-sm text-gray-600">Số lượng khách: {booking.numberOfPeople}</p>
                <p className="text-sm text-gray-600">Tổng giá: {booking.totalPrice.toLocaleString('vi-VN')}₫</p>
                <p className="text-sm text-gray-500">
                  Trạng thái: {booking.status}
                </p>
                <p className="text-sm text-gray-500">
                  Ngày đặt: {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <button
                onClick={() => handleReview(booking.tourId?._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Đánh giá
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
