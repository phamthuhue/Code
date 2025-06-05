// components/ReviewModal.jsx
import { useState } from "react";
import axiosInstance from "@utils/axiosInstance";
import { notify } from "@utils/notify";

const ReviewModal = ({ isOpen, onClose, tourId, guideId, userId, bookingId, onReload }) => {
  const [ratingTour, setRatingTour] = useState(5);
  const [commentTour, setCommentTour] = useState("");
  const [ratingGuide, setRatingGuide] = useState(5);
  const [commentGuide, setCommentGuide] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
  //   console.log({
  //   userId,
  //   tourId,
  //   guideId,
  //   bookingId,
  //   ratingTour,
  //   commentTour,
  //   ratingGuide,
  //   commentGuide,
  // });
    setSubmitting(true);
    try {
      await axiosInstance.post("/reviews", {
        userId,
        tourId,
        guideId,
        bookingId,
        ratingTour,
        commentTour,
        ratingGuide,
        commentGuide,
      });
      notify(
                    "success",
                    "Gửi đánh giá thành công",
                    "Chúng tôi đã lưu lại đánh giá của bạn.",
                    2
            );
      onClose(); // Đóng modal sau khi gửi thành công
      onReload();
    } catch (err) {
      setError("Gửi đánh giá thất bại.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Đánh giá tour</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block font-medium mb-1">Đánh giá tour:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={ratingTour}
            onChange={(e) => setRatingTour(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <textarea
            placeholder="Nhận xét về tour"
            value={commentTour}
            onChange={(e) => setCommentTour(e.target.value)}
            className="border px-3 py-2 rounded w-full mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Đánh giá hướng dẫn viên:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={ratingGuide}
            onChange={(e) => setRatingGuide(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <textarea
            placeholder="Nhận xét về hướng dẫn viên"
            value={commentGuide}
            onChange={(e) => setCommentGuide(e.target.value)}
            className="border px-3 py-2 rounded w-full mt-2"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={submitting}
          >
            {submitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
