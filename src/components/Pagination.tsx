'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  
  // 표시할 페이지 번호 범위 (현재 페이지 주변에 최대 2개씩)
  const getPageNumbers = () => {
    const range = [];
    const delta = 2; // 현재 페이지 앞뒤로 보일 페이지 수
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    
    // 처음과 마지막 페이지는 항상 포함
    if (currentPage - delta > 2) {
      range.unshift('...'); // 줄임표 추가
    }
    
    if (currentPage + delta < totalPages - 1) {
      range.push('...'); // 줄임표 추가
    }
    
    if (totalPages > 1) {
      range.unshift(1); // 첫 페이지 항상 표시
    }
    
    if (totalPages > 1) {
      range.push(totalPages); // 마지막 페이지 항상 표시
    }
    
    return range;
  };
  
  const pageNumbers = getPageNumbers();
  
  // 페이지가 1개만 있으면 페이지네이션 미표시
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <div className="flex justify-center items-center space-x-1 my-8">
      {/* 이전 페이지 버튼 */}
      {currentPage > 1 && (
        <Link
          href={`${pathname}?page=${currentPage - 1}`}
          className="px-3 py-2 rounded-md bg-[#2d2b42] text-gray-300 hover:bg-[#3a384f] transition-colors"
        >
          이전
        </Link>
      )}
      
      {/* 페이지 번호 */}
      {pageNumbers.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <Link
              href={`${pathname}?page=${page}`}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === page
                  ? 'bg-[#a48eff] text-white'
                  : 'bg-[#2d2b42] text-gray-300 hover:bg-[#3a384f]'
              }`}
            >
              {page}
            </Link>
          )}
        </div>
      ))}
      
      {/* 다음 페이지 버튼 */}
      {currentPage < totalPages && (
        <Link
          href={`${pathname}?page=${currentPage + 1}`}
          className="px-3 py-2 rounded-md bg-[#2d2b42] text-gray-300 hover:bg-[#3a384f] transition-colors"
        >
          다음
        </Link>
      )}
    </div>
  );
}