import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "@utils/config";
import Pagination from "../../components/Pagination/Pagination.jsx";
import ReviewModal from "@components/Modal/ReviewModal";
import CancelModal from "@components/Modal/CancelModal";
import axiosInstance from "@utils/axiosInstance";
import { notify } from "@utils/notify";

export const History = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.info?._id;

  const [page, setPage] = useState(1);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const {
    data: bookings,
    currentPage,
    totalPages,
    loading,
    error,
  } = useFetch(
    `/bookings/user/${userId}?page=${page}&limit=6&reload=${reloadTrigger}`
  );

  // Hàm reload
  const reloadBookings = () => {
    // Toggle để ép URL đổi => hook useFetch chạy lại
    setReloadTrigger((prev) => !prev);
  };

  const handleReload = () => {
    console.log("Reload danh sách...");
    reloadBookings();
  };

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
    return reviewsbyUser.some((review) => review.bookingId?._id === bookingId);
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

  const handlePayment = (bookingId) => {
    window.location.href = `/payment/${bookingId}`;
  };

  const handleCancel = async (bookingId) => {
      // Cập nhật giao diện nếu cần (ví dụ: refresh danh sách)
      setSelectedBooking(bookingId);
      setShowCancelModal(true);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Đã xảy ra lỗi khi tải dữ liệu.</p>;

  return (
    <div className="max-w-7xl mx-auto pb-8 px-2">
      <h2 className="text-2xl font-light text-gray-700 pt-4 pb-8 text-center">
        {" "}
        Danh sách tour đã đặt{" "}
      </h2>

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
                  src={
                    booking.tourId?.photos?.[0] ||
                    "https://via.placeholder.com/150"
                  } // Ảnh mặc định
                  alt="Tour avatar"
                  className="w-full rounded-lg object-cover border"
                />
              </div>

              {/* Phần thông tin (bên phải) */}
              <div className="w-1/2">
                <h2 className="text-lg font-semibold">
                  {booking.tourId?.title || "Chưa rõ"}
                </h2>
                <p className="text-sm text-gray-600">
                  Số lượng khách: {booking.numberOfPeople}
                </p>
                <p className="text-sm text-gray-600">
                  Tổng giá: {booking.totalPrice?.toLocaleString("vi-VN")}₫
                </p>
                <p className="text-sm text-gray-500">
                  Ngày khởi hành:{" "}
                  {new Date(booking.startDate).toLocaleDateString("vi-VN")}
                </p>
                <p className="text-sm text-gray-500">
                  Trạng thái: {booking.status}
                </p>
                <p className="text-sm text-gray-500">
                  Ngày đặt:{" "}
                  {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
                </p>

                {/* Các nút hành động */}
                <div className="mt-4 flex gap-2">
                  {booking.status === "Xác nhận" ? (
                    <>
                      <button
                        onClick={() =>
                          handleReview(
                            booking.tourId?._id,
                            booking.tourId?.guideId || "",
                            booking._id
                          )
                        }
                        disabled={hasReviewedBooking(booking._id)}
                        className={`px-4 py-2 rounded border ${
                          hasReviewedBooking(booking._id)
                            ? "text-blue-500 bg-blue-10 border-gray-400 cursor-not-allowed"
                            : "text-blue-500 bg-blue-10 hover:bg-blue-100 border-blue-700 cursor-pointer"
                        }`}
                      >
                        {hasReviewedBooking(booking._id)
                          ? "Đã đánh giá"
                          : "Đánh giá"}
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
                  ): booking.status === "Mới tạo" ? (
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-red-500">
                          ⚠️ Bạn cần thanh toán ngay để chỗ.
                        </span>
                        <button
                          onClick={() => handlePayment(booking._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Thanh toán
                        </button>
                    </div>
                  ) : booking.status === "Chờ xác nhận" ? (
                    <button
                      onClick={() => handleCancel(booking._id)} // nhớ định nghĩa hàm này
                      className="border border-red-500 text-red-400 bg-red-10 hover:bg-red-100 px-4 py-2 rounded"
                    >
                      Hủy đặt
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 border border-yellow bg-white text-yellow rounded cursor-not-allowed"
                    >
                      Đang xử lý
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">Bạn chưa đặt tour nào.</p>
      )}
      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* Modal đánh giá */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onReload={handleReload}
        tourId={selectedTour}
        guideId={selectedGuide}
        userId={userId}
        bookingId={selectedBooking}
      />

      {/* Modal hủy tour */}
      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        userId={userId}
        bookingId={selectedBooking}
        onReload={handleReload}
      />
    </div>
  );
};
