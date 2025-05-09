import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { message: '인증되지 않은 요청입니다.' },
      { status: 401 }
    );
  }
  
  try {
    const { ideaId } = await request.json();
    
    if (!ideaId) {
      return NextResponse.json(
        { message: '아이디어 ID는 필수입니다.' },
        { status: 400 }
      );
    }
    
    const supabase = supabaseAdmin;
    
    // 이미 북마크가 있는지 확인
    const { data: existingBookmark } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('idea_id', ideaId)
      .single();
    
    if (existingBookmark) {
      return NextResponse.json(
        { message: '이미 북마크한 아이디어입니다.' },
        { status: 409 }
      );
    }
    
    // 북마크 생성
    const { data, error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: session.user.id,
        idea_id: ideaId,
      })
      .select()
      .single();
    
    if (error) {
      console.error('북마크 생성 실패:', error);
      
      let errorMessage = '북마크를 추가하는 데 실패했습니다.';
      let statusCode = 500;
      
      // 중복 북마크 에러 처리
      if (error.code === '23505') {
        errorMessage = '이미 북마크한 아이디어입니다.';
        statusCode = 409;
      } else if (error.code === '23503') {
        // 외래 키 제약 조건 위반 (존재하지 않는 user_id 또는 idea_id)
        errorMessage = '사용자 또는 아이디어가 존재하지 않습니다.';
        statusCode = 400;
      }
      
      return NextResponse.json(
        { message: errorMessage, details: error.message },
        { status: statusCode }
      );
    }
    
    return NextResponse.json(
      { message: '북마크가 성공적으로 추가되었습니다.', bookmark: data },
      { status: 201 }
    );
  } catch (error) {
    console.error('북마크 추가 중 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}