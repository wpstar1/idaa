import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

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
    const supabase = supabaseAdmin;
    
    // 북마크 삭제
    const { data, error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', session.user.id)
      .eq('idea_id', ideaId)
      .select();
    
    if (error) {
      console.error('북마크 삭제 실패:', error);
      return NextResponse.json(
        { message: '북마크를 삭제하는 데 실패했습니다.', details: error.message },
        { status: 500 }
      );
    }
    
    // 삭제된 항목이 없는 경우 (이미 북마크가 없는 경우)
    if (data && data.length === 0) {
      return NextResponse.json(
        { message: '삭제할 북마크가 없습니다.' },
        { status: 404 }
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