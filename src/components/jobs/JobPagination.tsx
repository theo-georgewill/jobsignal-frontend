type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const JobPagination = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  const prevPage = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const nextPage = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).slice(
    Math.max(0, page - 3),
    Math.min(totalPages, page + 2)
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Prev */}
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Numbers */}
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-4 py-2 rounded border ${
            page === pageNumber
              ? "bg-primary text-white border-primary"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default JobPagination;