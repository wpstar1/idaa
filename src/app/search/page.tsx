import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import SearchBar from '@/components/SearchBar';

// 서버 컴포넌트에서 검색 실행
async function searchIdeas(query: string) {
  try {
    // 검색 API 호출
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/search?q=${encodeURIComponent(query)}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) throw new Error('검색 오류');
    
    return res.json();
  } catch (error) {
    console.error('검색 오류:', error);
    return { results: [], count: 0 };
  }
}

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: { q?: string } 
}) {
  const query = searchParams.q;
  
  // 검색어가 없으면 404
  if (!query) {
    notFound();
  }
  
  // 검색 실행
  const { results, count } = await searchIdeas(query);
  
  return (
    <main className="min-h-screen bg-[#151422] text-white px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <BackButton />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-center text-[#a48eff]">아이디어 검색</h1>
        
        {/* 검색창 */}
        <SearchBar />
        
        {/* 검색 결과 정보 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            '{query}' 검색 결과 ({count}개)
          </h2>
        </div>
        
        {/* 검색 결과 목록 */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((idea: any) => (
              <div key={idea.id} className="border border-[#2d2b42] rounded-xl overflow-hidden shadow-lg bg-[#1e1c31] hover:bg-[#2d2b42] transition-colors">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-white">{idea.title}</h2>
                    <span className="bg-[#2d2b42] text-[#a48eff] text-xs font-medium px-3 py-1 rounded-full">
                      {idea.tag || '기타'}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-5 line-clamp-4 text-sm leading-relaxed">
                    {idea.summary}
                  </p>
                  
                  <div className="text-sm text-gray-400 space-y-1 mb-5">
                    <div><span className="text-[#a48eff] font-medium">대상:</span> {idea.target || '모든 사용자'}</div>
                    <div><span className="text-[#a48eff] font-medium">수익 모델:</span> {idea.revenue || '정보 없음'}</div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Link 
                      href={`/ideas/${idea.id}`}
                      className="px-4 py-2 bg-[#a48eff] hover:bg-[#8a6dff] text-white rounded-md text-sm font-medium transition-colors"
                    >
                      자세히 보기
                    </Link>
                    <div className="flex space-x-3 text-gray-400">
                      <span>💬 {idea.comment_count || 0}</span>
                      <span>⭐ {idea.bookmark_count || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">'{query}'에 대한 검색 결과가 없습니다.</div>
            <div className="text-gray-500">다른 검색어를 입력하거나 태그로 찾아보세요.</div>
          </div>
        )}
      </div>
    </main>
  );
}