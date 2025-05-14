import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (num) =>
        num === 1 ||
        num === totalPages ||
        (num >= page - 2 && num <= page + 2)
    );

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap text-sm">
      {/* First */}
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className={`px-3 py-1 rounded border transition 
          ${page === 1 ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'hover:bg-blue-50 text-blue-600 border-gray-300'}`}
      >
        Đầu
      </button>

      {/* Prev */}
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className={`px-3 py-1 rounded border transition 
          ${page === 1 ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'hover:bg-blue-50 text-blue-600 border-gray-300'}`}
      >
        ←
      </button>

      {/* Page numbers */}
      {visiblePages.map((num, idx, arr) => {
        const prev = arr[idx - 1];
        const isEllipsis = prev && num - prev > 1;

        return (
          <React.Fragment key={num}>
            {isEllipsis && <span className="px-2">...</span>}
            <button
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded border transition 
                ${page === num ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-blue-50 text-blue-600 border-gray-300'}`}
            >
              {num}
            </button>
          </React.Fragment>
        );
      })}

      {/* Next */}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded border transition 
          ${page === totalPages ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'hover:bg-blue-50 text-blue-600 border-gray-300'}`}
      >
        →
      </button>

      {/* Last */}
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded border transition 
          ${page === totalPages ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'hover:bg-blue-50 text-blue-600 border-gray-300'}`}
      >
        Cuối
      </button>
    </div>
  );
};

export default Pagination;