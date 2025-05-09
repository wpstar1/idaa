import Link from 'next/link';
import { getIdeas } from '@/utils/supabase-utils';

export default async function Home() {
  const ideas = await getIdeas(10);

  return (
    <main className="min-h-screen bg-[#151422] text-white px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-12 text-center text-[#a48eff]">바이브코딩 돈버는 아이디어 모음</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((idea) => (
            <div key={idea.id} className="border border-[#2d2b42] rounded-xl overflow-hidden shadow-lg bg-[#1e1c31] hover:bg-[#2d2b42] transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-white">{idea.title}</h2>
                  <span className="bg-[#2d2b42] text-[#a48eff] text-xs font-medium px-3 py-1 rounded-full">
                    {idea.tag || '기타'}
                  </span>
                </div>
                <p className="text-gray-300 mb-5 line-clamp-2">{idea.summary}</p>
                
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
        
        {ideas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">아직 등록된 아이디어가 없습니다.</p>
          </div>
        )}
      </div>
    </main>
  );
}