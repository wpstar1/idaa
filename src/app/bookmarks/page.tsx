import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { getUserBookmarks } from '@/utils/supabase-utils';
import IdeaCard from '@/components/IdeaCard';

export const metadata = {
  title: '내 북마크 | 오늘의 아이디어',
  description: '내가 북마크한 아이디어 목록을 확인해보세요.',
};

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions);

  // 인증 확인
  if (!session || !session.user) {
    redirect('/login?from=/bookmarks');
  }

  // 사용자의 북마크 가져오기
  const bookmarkedItems = await getUserBookmarks(session.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#a48eff]">내 북마크</h1>
      
      {bookmarkedItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">아직 북마크한 아이디어가 없습니다.</h2>
          <p className="text-gray-400 mb-6">관심 있는 아이디어를 북마크해보세요!</p>
          <Link 
            href="/" 
            className="px-4 py-2 bg-[#a48eff] text-white rounded-md hover:bg-[#8a6dff] transition"
          >
            아이디어 탐색하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedItems.map((bookmark) => (
            <IdeaCard 
              key={bookmark.idea_id}
              idea={bookmark.ideas}
              showBookmarkButton={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}