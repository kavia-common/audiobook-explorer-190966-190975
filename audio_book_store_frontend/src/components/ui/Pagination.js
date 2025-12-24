import React from 'react';

const Pagination = ({ page, setPage, total, pageSize }) => {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        className="btn ghost"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        Prev
      </button>
      <span>Page {page} of {pages}</span>
      <button
        className="btn ghost"
        onClick={() => setPage(Math.min(pages, page + 1))}
        disabled={page >= pages}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
