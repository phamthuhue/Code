import { useState, useEffect } from "react";
import axiosInstance from "@utils/axiosInstance";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(url);
        setData(res.data.data || []);
        setCurrentPage(res.data.currentPage || 1);
        setTotalPages(res.data.totalPages || 1);
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setData([]);
        setCurrentPage(1);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading, currentPage, totalPages };
};

export default useFetch;