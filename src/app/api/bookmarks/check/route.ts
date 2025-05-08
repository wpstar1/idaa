import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { isBookmarked: false },
      { status: 200 }
    );
  }
  
  const ideaId = request.nextUrl.searchParams.get('ideaId');
  
  if (!ideaId) {
    return NextResponse.json(
      { message: '아이디어 ID는 필수입니다.' },
      { status: 400 }
    );
  }
  
  try {
    const supabase = createClientComponentClient();
    
    // 북마크 확인
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('idea_id', ideaId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // 데이터가 없는 경우의 에러 코드는 무시
      console.error('북마크 확인 실패:', error);
      return NextResponse.json(
        { message: '북마크 상태를 확인하는 데 실패했습니다.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ isBookmarked: !!data }, { status: 200 });
  } catch (error) {
    console.error('북마크 확인 중 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.', isBookmarked: false },
      { status: 500 }
    );
  }
}