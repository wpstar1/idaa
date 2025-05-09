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
    const { ideaId, content } = await request.json();
    
    if (!ideaId || !content.trim()) {
      return NextResponse.json(
        { message: '아이디어 ID와 댓글 내용은 필수입니다.' },
        { status: 400 }
      );
    }
    
    const supabase = supabaseAdmin;
    
    // 댓글 생성 - users:user_id에서 image 필드 제외
    const { data, error } = await supabase
      .from('comments')
      .insert({
        idea_id: ideaId,
        user_id: session.user.id,
        content: content.trim(),
      })
      // 기본 필드만 선택하여 users 테이블 조인
      .select('id, content, created_at, idea_id, user_id, users:user_id(id, name)')
      .single();
    
    if (error) {
      console.error('댓글 생성 실패:', error);
      
      let errorMessage = '댓글을 생성하는 데 실패했습니다.';
      let statusCode = 500;
      
      if (error.code === '23503') {
        // 외래 키 제약 조건 위반 (존재하지 않는 user_id 또는 idea_id)
        errorMessage = '아이디어가 존재하지 않거나 접근할 수 없습니다.';
        statusCode = 400;
      }
      
      return NextResponse.json(
        { message: errorMessage, details: error.message },
        { status: statusCode }
      );
    }
    
    if (!data) {
      return NextResponse.json(
        { message: '댓글은 생성되었으나 정보를 가져오지 못했습니다.' },
        { status: 201 }
      );
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('댓글 처리 중 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}