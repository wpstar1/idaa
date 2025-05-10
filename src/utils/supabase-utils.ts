import { supabaseAdmin } from '@/lib/supabase';
import { Idea, Comment } from '@/types/models';

// 아이디어 관련 함수
export async function getIdeas(
  limit = 10, 
  offset = 0, 
  tag?: string
): Promise<{ ideas: any[], totalCount: number }> {
  try {
    // 전체 아이디어 개수 조회를 위한 쿼리 빌더
    let countQuery = supabaseAdmin
      .from('ideas')
      .select('*', { count: 'exact', head: true });
    
    // 태그 필터링이 있으면 적용
    if (tag) {
      countQuery = countQuery.eq('tag', tag);
    }
    
    const { count: totalCount, error: countError } = await countQuery;
    
    if (countError) throw countError;
    
    // 아이디어 목록 가져오기 위한 쿼리 빌더
    let dataQuery = supabaseAdmin
      .from('ideas')
      .select(`
        *,
        comments:comments(id),
        bookmarks:bookmarks(id)
      `)
      .order('created_at', { ascending: false });
    
    // 태그 필터링이 있으면 적용
    if (tag) {
      dataQuery = dataQuery.eq('tag', tag);
    }
    
    // 페이지네이션 적용
    dataQuery = dataQuery.range(offset, offset + limit - 1);
    
    const { data: ideas, error } = await dataQuery;
    
    if (error) throw error;
    if (!ideas || ideas.length === 0) return { ideas: [], totalCount: totalCount || 0 };
    
    // 결과 포맷팅
    const ideasWithCounts = ideas.map(idea => ({
      ...idea,
      comment_count: idea.comments?.length || 0,
      bookmark_count: idea.bookmarks?.length || 0,
      // 중첩된 배열 제거
      comments: undefined,
      bookmarks: undefined
    }));
    
    return { ideas: ideasWithCounts, totalCount: totalCount || 0 };
  } catch (error) {
    console.error('아이디어 조회 오류:', error);
    // 기본 데이터 반환 (카운팅 없이)
    // 쿼리 빌더
    let fallbackQuery = supabaseAdmin
      .from('ideas')
      .select('*')
      .order('created_at', { ascending: false });
    
    // 태그 필터링 적용
    if (tag) {
      fallbackQuery = fallbackQuery.eq('tag', tag);
    }
    
    // 페이지네이션 적용
    fallbackQuery = fallbackQuery.range(offset, offset + limit - 1);
    
    const { data: basicIdeas } = await fallbackQuery;
    
    // 카운트 쿼리
    let countQuery = supabaseAdmin
      .from('ideas')
      .select('*', { count: 'exact', head: true });
    
    // 태그 필터링 적용
    if (tag) {
      countQuery = countQuery.eq('tag', tag);
    }
    
    const { count: totalCount } = await countQuery;
      
    return {
      ideas: (basicIdeas || []).map(idea => ({
        ...idea,
        comment_count: 0,
        bookmark_count: 0
      })),
      totalCount: totalCount || 0
    };
  }
}

// 모든 태그 목록 가져오기
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('ideas')
      .select('tag');
    
    if (error) throw error;
    
    // 태그별 카운트
    const tagCounts: Record<string, number> = {};
    
    // 태그 카운팅 (null이나 빈 문자열은 '기타'로 처리)
    data.forEach(item => {
      const tag = item.tag || '기타';
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    // 배열로 변환 후 개수 기준 내림차순 정렬
    const tagsArray = Object.entries(tagCounts).map(([tag, count]) => ({ tag, count }));
    tagsArray.sort((a, b) => b.count - a.count);
    
    return tagsArray;
  } catch (error) {
    console.error('태그 목록 조회 오류:', error);
    return [];
  }
}

export async function getIdeaById(id: string): Promise<Idea | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('ideas')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('아이디어 조회 오류:', error);
    return null;
  }
}

// 댓글 관련 함수
export async function getCommentsByIdeaId(ideaId: string): Promise<Comment[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('comments')
      .select('id, content, created_at, idea_id, user_id, users:user_id(id, name)')
      .eq('idea_id', ideaId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    return [];
  }
}

export async function getCommentCount(ideaId: string): Promise<number> {
  try {
    const { count, error } = await supabaseAdmin
      .from('comments')
      .select('id', { count: 'exact' })
      .eq('idea_id', ideaId);
    
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('댓글 수 조회 오류:', error);
    return 0;
  }
}

// 북마크 관련 함수
export async function getBookmarkCount(ideaId: string): Promise<number> {
  try {
    const { count, error } = await supabaseAdmin
      .from('bookmarks')
      .select('id', { count: 'exact' })
      .eq('idea_id', ideaId);
    
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('북마크 수 조회 오류:', error);
    return 0;
  }
}

export async function isBookmarked(userId: string, ideaId: string): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('idea_id', ideaId)
      .single();
    
    if (error && error.code !== 'PGRST116') return false; // PGRST116: 결과가 없음
    return !!data;
  } catch (error) {
    console.error('북마크 상태 확인 오류:', error);
    return false;
  }
}

export async function toggleBookmark(userId: string, ideaId: string): Promise<boolean> {
  try {
    // 현재 북마크 상태 확인
    const bookmarked = await isBookmarked(userId, ideaId);
    
    if (bookmarked) {
      // 북마크 제거
      const { error } = await supabaseAdmin
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('idea_id', ideaId);
      
      if (error) throw error;
    } else {
      // 북마크 추가
      const { error } = await supabaseAdmin
        .from('bookmarks')
        .insert([
          { user_id: userId, idea_id: ideaId }
        ]);
      
      if (error) throw error;
    }
    
    return !bookmarked;
  } catch (error) {
    console.error('북마크 토글 오류:', error);
    return false;
  }
}

// 사용자의 북마크 목록 가져오기
export async function getUserBookmarks(userId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookmarks')
      .select('*, ideas:idea_id(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('북마크 목록 조회 오류:', error);
    return [];
  }
}

// 관련 아이디어 가져오기 (같은 태그의 다른 아이디어)
export async function getRelatedIdeas(id: string, tag: string, limit: number = 3) {
  try {
    // 같은 태그의 다른 아이디어 가져오기
    const { data: ideas, error } = await supabaseAdmin
      .from('ideas')
      .select(`
        id,
        title,
        summary,
        tag,
        comments:comments(id),
        bookmarks:bookmarks(id)
      `)
      .eq('tag', tag)
      .neq('id', id) // 현재 아이디어 제외
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    // 결과가 limit보다 적으면 다른 최신 아이디어로 채우기
    if (!ideas || ideas.length < limit) {
      const remainingCount = limit - (ideas?.length || 0);
      
      const { data: recentIdeas, error: recentError } = await supabaseAdmin
        .from('ideas')
        .select(`
          id,
          title,
          summary,
          tag,
          comments:comments(id),
          bookmarks:bookmarks(id)
        `)
        .neq('id', id)
        .neq('tag', tag) // 이미 가져온 태그 제외
        .order('created_at', { ascending: false })
        .limit(remainingCount);
      
      if (recentError) throw recentError;
      
      // 결과 포맷팅 및 병합
      const relatedIdeas = [
        ...(ideas || []),
        ...(recentIdeas || [])
      ].map(idea => ({
        ...idea,
        comment_count: idea.comments?.length || 0,
        bookmark_count: idea.bookmarks?.length || 0,
        comments: undefined,
        bookmarks: undefined
      }));
      
      return relatedIdeas;
    }
    
    // 결과 포맷팅
    const formattedIdeas = ideas.map(idea => ({
      ...idea,
      comment_count: idea.comments?.length || 0,
      bookmark_count: idea.bookmarks?.length || 0,
      comments: undefined,
      bookmarks: undefined
    }));
    
    return formattedIdeas;
  } catch (error) {
    console.error('관련 아이디어 조회 오류:', error);
    return [];
  }
}