import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { message: '인증되지 않은 요청입니다.' },
      { status: 401 }
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
    
    // 북마크 삭제
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', session.user.id)
      .eq('idea_id', ideaId);
    
    if (error) {
      console.error('북마크 삭제 실패:', error);
      return NextResponse.json(
        { message: '북마크를 삭제하는 데 실패했습니다.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: '북마크가 성공적으로 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('북마크 삭제 중 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}