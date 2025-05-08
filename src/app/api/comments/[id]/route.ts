import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { message: '인증되지 않은 요청입니다.' },
      { status: 401 }
    );
  }
  
  const commentId = params.id;
  
  try {
    const supabase = createClientComponentClient();
    
    // 해당 댓글이 요청한 사용자의 것인지 확인
    const { data: comment, error: fetchError } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', commentId)
      .single();
    
    if (fetchError || !comment) {
      return NextResponse.json(
        { message: '해당 댓글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    // 댓글 작성자와 현재 사용자가 동일한지 확인
    if (comment.user_id !== session.user.id) {
      return NextResponse.json(
        { message: '다른 사용자의 댓글을 삭제할 수 없습니다.' },
        { status: 403 }
      );
    }
    
    // 댓글 삭제
    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
    
    if (deleteError) {
      console.error('댓글 삭제 실패:', deleteError);
      return NextResponse.json(
        { message: '댓글을 삭제하는 데 실패했습니다.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: '댓글이 성공적으로 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('댓글 삭제 중 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}