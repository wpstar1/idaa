'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BookmarkButton({ ideaId }: { ideaId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 현재 아이디어가 북마크되어 있는지 확인
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!session) return;

      try {
        const response = await fetch(`/api/bookmarks/check?ideaId=${ideaId}`);
        if (response.ok) {
          const data = await response.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error('북마크 상태 확인 실패:', error);
      }
    };

    checkBookmarkStatus();
  }, [session, ideaId]);

  const toggleBookmark = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      // 북마크 추가/제거를 위한 API 호출 방식 변경
      if (isBookmarked) {
        // 북마크 제거
        const response = await fetch(`/api/bookmarks/remove?ideaId=${ideaId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('북마크 제거 중 오류가 발생했습니다.');
        }
      } else {
        // 북마크 추가
        const response = await fetch('/api/bookmarks/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ideaId })
        });
        
        if (!response.ok) {
          throw new Error('북마크 추가 중 오류가 발생했습니다.');
        }
      }

      // 북마크 상태 토글
      setIsBookmarked(!isBookmarked);
      router.refresh();
    } catch (error) {
      console.error('북마크 처리 실패:', error);
      alert(error instanceof Error ? error.message : '북마크 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className={`flex items-center space-x-1 px-4 py-2 rounded-md font-medium transition-all ${
        isBookmarked
          ? 'bg-[#3d3b52] text-yellow-300 hover:bg-[#4d4b62] border border-yellow-500/30'
          : 'bg-[#2d2b42] text-gray-300 hover:bg-[#3d3b52] border border-[#4d4b62]'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <span className="text-lg">
        {isBookmarked ? '★' : '☆'}
      </span>
      <span>
        {isLoading
          ? '처리 중...'
          : isBookmarked
          ? '북마크 취소'
          : '북마크'}
      </span>
    </button>
  );
}