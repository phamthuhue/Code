import { useState, useEffect } from "react";
import axios from "axios";

const usePaginatedFetch = (url) => {
  const [response, setResponse] = useState({
    data: [],
    currentPage: 1,
    totalPages: 1,
    totalReviews: 0,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setResponse({
          data: res.data.data,
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
          totalReviews: res.data.totalReviews,
        });
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setResponse({
          data: [],
          currentPage: 1,
          totalPages: 1,
          totalReviews: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { ...response, error, loading };
};

export default usePaginatedFetch;