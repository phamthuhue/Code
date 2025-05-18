import { useState, useEffect } from "react";
import axiosInstance from "@utils/axiosInstance";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(url);
        setData(res.data.data); // Giả định rằng dữ liệu nằm trong `res.data.data`
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
