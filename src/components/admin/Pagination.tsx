import { MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // 현재 페이지 그룹 계산 (1-10, 11-20, 21-30, ...)
  const currentGroup = Math.ceil(currentPage / 10);
  const startPage = (currentGroup - 1) * 10 + 1;
  const endPage = Math.min(currentGroup * 10, totalPages);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const canGoPrevGroup = startPage > 1;
  const canGoNextGroup = endPage < totalPages;

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="flex justify-center items-center space-x-2">
        {/* 맨 앞으로 */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="맨 앞"
        >
          <MdFirstPage className="w-5 h-5" />
        </button>

        {/* 이전 10페이지 */}
        <button
          onClick={() => onPageChange(startPage - 10)}
          disabled={!canGoPrevGroup}
          className={`p-2 rounded-lg transition ${
            !canGoPrevGroup
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="이전 10페이지"
        >
          <MdChevronLeft className="w-5 h-5" />
        </button>

        {/* 페이지 번호들 */}
        <div className="flex space-x-2">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === page
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* 다음 10페이지 */}
        <button
          onClick={() => onPageChange(endPage + 1)}
          disabled={!canGoNextGroup}
          className={`p-2 rounded-lg transition ${
            !canGoNextGroup
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="다음 10페이지"
        >
          <MdChevronRight className="w-5 h-5" />
        </button>

        {/* 맨 뒤로 */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="맨 끝"
        >
          <MdLastPage className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
