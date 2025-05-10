'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  
  // 검색 제출 핸들러
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      setIsSearching(true);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="아이디어 검색..."
          className="w-full px-4 py-2 pl-10 bg-[#2d2b42] text-white rounded-full 
                    border border-[#3d3b52] focus:outline-none focus:border-[#a48eff] transition-colors"
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5 text-gray-400 absolute left-3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className={`absolute right-2 px-3 py-1 rounded-full text-sm font-medium
                    ${isSearching || !query.trim() 
                      ? 'bg-[#3d3b52] text-gray-400 cursor-not-allowed' 
                      : 'bg-[#a48eff] text-white hover:bg-[#8a6dff] transition-colors'
                    }`}
        >
          {isSearching ? '검색 중...' : '검색'}
        </button>
      </div>
    </form>
  );
}