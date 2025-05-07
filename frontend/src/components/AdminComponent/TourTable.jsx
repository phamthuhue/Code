import React, { useEffect, useState } from "react";
import axios from "axios";
import TourFormModal from "./TourFormModal";

const TourTable = () => {
  const [tours, setTours] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    startDate: "",
    duration: "",
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchTours = async () => {
    try {
      const res = await axios.get("/api/v1/tours");
      setTours(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy tour:", err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const openAddModal = () => {
    setForm({
      name: "",
      price: "",
      startDate: "",
      duration: "",
      description: "",
    });
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (tour) => {
    setForm(tour);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`/api/v1/tours/${form.id}`, form);
      } else {
        await axios.post("/api/v1/tours", form);
      }
      setModalOpen(false);
      fetchTours();
    } catch (err) {
      console.error("Lỗi khi gửi form:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tour này không?")) return;
    try {
      await axios.delete(`/api/v1/tours/${id}`);
      fetchTours();
    } catch (err) {
      console.error("Lỗi khi xóa tour:", err);
    }
  };

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTours = filteredTours.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách tour</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Tìm kiếm tour..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={openAddModal}
          >
            + Thêm Tour
          </button>
        </div>
      </div>

      <table className="w-full border shadow text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Tên tour</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Ngày khởi hành</th>
            <th className="px-4 py-2">Thời lượng</th>
            <th className="px-4 py-2">Mô tả</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTours.map((tour, index) => (
            <tr key={tour.id} className="text-center border-t">
              <td className="px-4 py-2">{startIndex + index + 1}</td>
              <td className="px-4 py-2">{tour.name}</td>
              <td className="px-4 py-2">{tour.price?.toLocaleString("vi-VN")} đ</td>
              <td className="px-4 py-2">{tour.startDate}</td>
              <td className="px-4 py-2">{tour.duration} ngày</td>
              <td className="px-4 py-2">{tour.description}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  onClick={() => openEditModal(tour)}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(tour.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {paginatedTours.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-4">
                Không tìm thấy tour phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}

      <TourFormModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        form={form}
        setForm={setForm}
        isEditing={isEditing}
      />
    </div>
  );
};

export default TourTable;
