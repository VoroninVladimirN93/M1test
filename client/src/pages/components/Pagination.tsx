import React, { memo } from 'react';

const paginationStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  gap: '5px',
};

const pageButtonStyles = {
  padding: '5px 10px',
  border: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
};

const activeButtonStyles = {
  ...pageButtonStyles,
  background: '#007bff',
  color: 'white',
  borderColor: '#007bff',
};

const navButtonStyles = {
  ...pageButtonStyles,
  background: '#f8f9fa',
};

const disabledButtonStyles = {
  ...navButtonStyles,
  opacity: 0.5,
  cursor: 'not-allowed',
};

const ellipsisStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // setCurrentPage: (page: number) => void;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = memo(({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    pages.push(
      <button key="first" onClick={() => handlePageChange(1)} style={pageButtonStyles}>
        1
      </button>,
    );
    if (startPage > 2) {
      pages.push(
        <span key="left-ellipsis" style={ellipsisStyles}>
          ...
        </span>,
      );
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        style={currentPage === i ? activeButtonStyles : pageButtonStyles}
      >
        {i}
      </button>,
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="right-ellipsis" style={ellipsisStyles}>
          ...
        </span>,
      );
    }
    pages.push(
      <button key="last" onClick={() => handlePageChange(totalPages)} style={pageButtonStyles}>
        {totalPages}
      </button>,
    );
  }

  return (
    <div style={paginationStyles}>
      <button
        style={currentPage === 1 ? disabledButtonStyles : navButtonStyles}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pages}
      <button
        style={currentPage === totalPages ? disabledButtonStyles : navButtonStyles}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
});

export default Pagination;
