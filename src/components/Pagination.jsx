import { useState, useEffect } from 'react';

const Pagination = ({ numberOfRecords, handleFetch, currentPage }) => {
  const itemsPerPage = 8;
  const totalPages = Math.ceil(numberOfRecords / itemsPerPage);

  const [startIndex, setStartIndex] = useState(1);

  useEffect(() => {
    if (currentPage >= startIndex + 5) {
      setStartIndex((prevIndex) => prevIndex + 5);
    } else if (currentPage < startIndex) {
      setStartIndex((prevIndex) => prevIndex - 5);
    }
  }, [currentPage, startIndex]);

  const handlePageChange = (newPage) => {
    handleFetch(newPage);
  };

  return (
    <div className={'px-2 mx-1'}>
      {/* Pagination controls */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={'mx-2'}
      >
        Previous
      </button>
      {Array.from(
        { length: totalPages > 5 ? 5 : totalPages },
        (_, index) => startIndex + index,
      ).map((val, idx) => (
        <span
          key={idx}
          className={`px-2 py-1 my-2 mx-1 cursor-pointer ${
            currentPage === val
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black'
          }`}
          onClick={() => handlePageChange(val)}
        >
          {val}
        </span>
      ))}
      <button
        className={'mx-2'}
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
