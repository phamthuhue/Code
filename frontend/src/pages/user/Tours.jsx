import React, { useEffect, useState } from "react";
import { SearchTour } from "../../components/Home/SearchTour";
import { Items } from "../../components/Home/Items";
import tourImg from "../../assets/images/vn.jpeg";
import { BASE_URL } from "../../utils/config";

export const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy danh sách tour ban đầu
  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/tours`);
      if (!res.ok) throw new Error("Lỗi khi tải danh sách tour");
      const result = await res.json();
      setTours(result.data);
      setError("");
    } catch (err) {
      setError(err.message);
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <section className="max-w-[1640px] px-4 py-12 mx-8 mb-10 text-sm">
      {/* Heading */}
      <div className="h-screen lg:max-h-[400px] relative mb-6">
        <div className="tourOverlay">
          <h2 className="text-white text-center">
            Tìm kiếm <br />
            Nơi bạn muốn du lịch
          </h2>
          <div className="pt-3">
            <SearchTour setTours={setTours} setLoading={setLoading} />
          </div>
        </div>
        <img className="tourImg" src={tourImg} alt="hero" />
      </div>

      {/* Tour Display */}
      <div className="px-4">
        {loading && <p>Đang tải...</p>}
        {error && <p>{error}</p>}
      </div>

      {!loading && !error && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {tours?.map((item, index) => (
            <Items
              key={index}
              photo={item.photos[0]}
              title={item.title}
              city={item.city}
              price={item.price}
              id={item._id}
            />
          ))}
        </div>
      )}
    </section>
  );
};