'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface Tag {
  tag: string;
  count: number;
}

interface TagFilterProps {
  tags: Tag[];
  currentTag?: string;
}

export default function TagFilter({ tags, currentTag }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 태그 필터 클릭 핸들러
  const handleTagClick = useCallback((tag?: string) => {
    // 현재 URL 파라미터 복사
    const params = new URLSearchParams(searchParams.toString());
    
    // 페이지 파라미터 초기화 (태그 변경 시 항상 1페이지로)
    params.set('page', '1');
    
    // 태그 파라미터 설정 또는 제거
    if (tag && tag !== '전체') {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    
    // 새 URL로 이동
    router.push(`/?${params.toString()}`);
  }, [router, searchParams]);
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-[#a48eff]">카테고리</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleTagClick()}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !currentTag ? 'bg-[#a48eff] text-white' : 'bg-[#2d2b42] text-gray-300 hover:bg-[#3d3b52]'
          }`}
        >
          전체
        </button>
        
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              currentTag === tag ? 'bg-[#a48eff] text-white' : 'bg-[#2d2b42] text-gray-300 hover:bg-[#3d3b52]'
            }`}
          >
            {tag} ({count})
          </button>
        ))}
      </div>
    </div>
  );
}