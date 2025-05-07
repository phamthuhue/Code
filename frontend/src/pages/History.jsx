import { BASE_URL } from '../utils/config'
import useFetch from '../hooks/useFetch'

const BookingHistory = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     // Giả định có API lấy danh sách booking của user hiện tại
//     fetch("/api/bookings/user") // hoặc thêm userId vào query
//       .then(res => res.json())
//       .then(data => setBookings(data))
//       .catch(err => console.error("Lỗi khi lấy dữ liệu:", err));
//   }, []);
  const {data:bookings} = useFetch(`${BASE_URL}/bookings/${id}`)

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
            <li key={booking._id} className="border p-4 rounded-xl shadow flex justify-between items-center">
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
