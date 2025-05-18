import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch"; // Giả sử bạn đã có hook useFetch
import { BASE_URL } from "../utils/config";

const BookingHistory = () => {
  // Lấy user từ AuthContext
  const { user } = useContext(AuthContext);

  // Kiểm tra xem người dùng có đăng nhập không
  if (!user) {
    return <p>Vui lòng đăng nhập để xem lịch sử đặt tour.</p>;
  }

  const userId = user._id; // Lấy _id của người dùng từ user trong AuthContext

  // Dùng useFetch để lấy dữ liệu bookings dựa vào userId
  const { data: bookings } = useFetch(`${BASE_URL}/bookings/${userId}`);

  const handleReview = (tourName) => {
    // Chuyển đến trang đánh giá (hoặc mở form/modal)
    window.location.href = `/review/${encodeURIComponent(tourName)}`;
  };

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
                <h2 className="text-lg font-semibold">{booking.tourName}</h2>
                <p className="text-sm text-gray-600">Họ tên: {booking.fullName}</p>
                <p className="text-sm text-gray-600">Số lượng khách: {booking.guestSize}</p>
                <p className="text-sm text-gray-500">
                  Ngày khởi hành: {new Date(booking.bookedAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <button
                onClick={() => handleReview(booking.tourName)}
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

export default BookingHistory;