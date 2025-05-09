'use client';

import Link from 'next/link';
// 날짜 형식화 간단하게 구현 (date-fns 문제 해결)
function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
}
import BookmarkButton from './BookmarkButton';

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    summary: string;
    created_at: string;
    category?: string;
  };
  showBookmarkButton?: boolean;
}

export default function IdeaCard({ idea, showBookmarkButton = true }: IdeaCardProps) {
  if (!idea) return null;
  
  const formattedDate = idea.created_at 
    ? formatDate(idea.created_at)
    : '';

  return (
    <div className="bg-[#1f1e33] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white mb-2 flex-1">
            <Link 
              href={`/ideas/${idea.id}`}
              className="hover:text-[#a48eff] transition-colors duration-200"
            >
              {idea.title}
            </Link>
          </h3>
          
          {showBookmarkButton && <BookmarkButton ideaId={idea.id} />}
        </div>
        
        <p className="text-gray-300 mb-4 line-clamp-3">
          {idea.summary}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div>
            {idea.category && (
              <span className="bg-[#a48eff30] text-[#a48eff] px-2 py-1 rounded-full text-xs">
                {idea.category}
              </span>
            )}
          </div>
          <div>{formattedDate}</div>
        </div>
      </div>
      
      <div className="bg-[#2d2b42] p-3 flex justify-between items-center">
        <Link 
          href={`/ideas/${idea.id}`}
          className="text-[#a48eff] hover:text-[#8a6dff] text-sm font-medium"
        >
          자세히 보기 →
        </Link>
      </div>
    </div>
  );
}