import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "@utils/config";
import Pagination from "../../components/Pagination/Pagination.jsx";
import ReviewModal from "@components/Modal/ReviewModal";
import axiosInstance from "@utils/axiosInstance";

export const History = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.info?._id;

  const [page, setPage] = useState(1);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const {
    data: bookings,
    currentPage,
    totalPages,
    loading,
    error,
  } = useFetch(`${BASE_URL}/bookings/user/${userId}?page=${page}&limit=6`);

  const [reviewsbyUser, setReviewsByUser] = useState([]);
  const [reloadReviews, setReloadReviews] = useState(false); // trigger reload

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance(`/reviews/user/${userId}`);
        if (res.data.success) {
          // console.log("Reviews by user:", res.data.data); // Xem dữ liệu thật
          setReviewsByUser(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải reviews:", err);
      }
    };

    if (userId) {
      fetchReviews();
    }
  }, [userId, reloadReviews]);

  const hasReviewedBooking = (bookingId) => {
    if (!reviewsbyUser) return false;
    return reviewsbyUser.some(review => review.bookingId?._id === bookingId);
  };


  const handleReview = (tourId, guideId, bookingId) => {
    console.log("Chọn tour:", tourId);
    console.log("Chọn guide:", guideId);
    setSelectedTour(tourId);
    setSelectedGuide(guideId);
    setSelectedBooking(bookingId);
    setShowReviewModal(true);
  };

  const handleRebook = (tourId) => {
    window.location.href = `/tours/${tourId}`;
  };

  const handleCancel = (booingId) => {
    window.location.href = `/`;
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Đã xảy ra lỗi khi tải dữ liệu.</p>;

  return (
    <div className="max-w-7xl mx-auto pb-8 px-2">
      <h2 className="text-2xl font-light text-gray-700 pt-4 pb-8 text-center"> Danh sách tour đã đặt </h2>

      {bookings.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-0 px-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border p-4 rounded-xl shadow flex gap-4 items-center"
            >
              {/* Phần ảnh (bên trái) */}
              <div className="w-1/2 flex justify-center">
                <img
                  src={booking.tourId?.photo}
                  alt="Tour avatar"
                  className="w-full rounded-lg object-cover border"
                />
              </div>

              {/* Phần thông tin (bên phải) */}
              <div className="w-1/2">
                <h2 className="text-lg font-semibold">{booking.tourId?.title || 'Chưa rõ'}</h2>
                <p className="text-sm text-gray-600">Số lượng khách: {booking.numberOfPeople}</p>
                <p className="text-sm text-gray-600">Tổng giá: {booking.totalPrice?.toLocaleString('vi-VN')}₫</p>
                <p className="text-sm text-gray-500">
                  Ngày khởi hành: {new Date(booking.startDate).toLocaleDateString("vi-VN")}
                </p>
                <p className="text-sm text-gray-500">Trạng thái: {booking.status}</p>
                <p className="text-sm text-gray-500">
                  Ngày đặt: {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
                </p>

                {/* Các nút hành động */}
                <div className="mt-4 flex gap-2">
                  {booking.status === "Xác nhận" ? (
                    <>
                      <button
                        onClick={() => handleReview(booking.tourId?._id, booking.tourId?.guideId || "", booking._id)}
                        disabled={hasReviewedBooking(booking._id)}
                        className="text-blue-500 bg-blue-10 hover:bg-blue-100 border border-blue-700 px-4 py-2 rounded"
                      >
                        {hasReviewedBooking(booking._id) ? "Đã đánh giá" : "Đánh giá"}
                      </button>

                      <button
                        onClick={() => handleRebook(booking.tourId?._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Đặt lại
                      </button>
                    </>
                  ) : booking.status === "Đã hủy" ? (
                    <button
                      onClick={() => handleRebook(booking.tourId?._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Đặt lại
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCancel(booking._id)} // nhớ định nghĩa hàm này
                      className="border border-red-500 text-red-400 bg-red-10 hover:bg-red-100 px-4 py-2 rounded"
                    >
                      Hủy đặt
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Bạn chưa đặt tour nào.
        </p>
      )}
      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      {/* Modal đánh giá */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        tourId={selectedTour}
        guideId={selectedGuide}
        userId={userId}
        bookingId={selectedBooking}
      />
    </div>
  );
};