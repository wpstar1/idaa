import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json(
        { message: '검색어가 필요합니다.' },
        { status: 400 }
      );
    }
    
    // 제목과 내용에서 검색어 찾기
    const { data, error } = await supabaseAdmin
      .from('ideas')
      .select(`
        *,
        comments:comments(id),
        bookmarks:bookmarks(id)
      `)
      .or(`title.ilike.%${query}%, summary.ilike.%${query}%, features.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (error) {
      console.error('검색 오류:', error);
      return NextResponse.json(
        { message: '검색 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
    
    // 결과 포맷팅
    const formattedResults = data.map(idea => ({
      ...idea,
      comment_count: idea.comments?.length || 0,
      bookmark_count: idea.bookmarks?.length || 0,
      comments: undefined,
      bookmarks: undefined
    }));
    
    return NextResponse.json({
      message: `${formattedResults.length}개의 결과를 찾았습니다.`,
      results: formattedResults,
      count: formattedResults.length
    });
  } catch (error) {
    console.error('검색 API 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}