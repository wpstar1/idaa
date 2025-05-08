import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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
    
    const supabase = createClientComponentClient();
    
    // 댓글 생성
    const { data, error } = await supabase
      .from('comments')
      .insert({
        idea_id: ideaId,
        user_id: session.user.id,
        content: content.trim(),
      })
      .select('*, users:user_id(id, name, image)')
      .single();
    
    if (error) {
      console.error('댓글 생성 실패:', error);
      return NextResponse.json(
        { message: '댓글을 생성하는 데 실패했습니다.' },
        { status: 500 }
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