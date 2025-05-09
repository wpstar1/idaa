import { supabaseAdmin } from '@/lib/supabase';
import { Idea, Comment } from '@/types/models';

// 아이디어 관련 함수
export async function getIdeas(limit = 10): Promise<Idea[]> {
  try {
    // 아이디어 목록 가져오기
    const { data: ideas, error } = await supabaseAdmin
      .from('ideas')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    // 각 아이디어에 대한 댓글 수와 북마크 수 추가
    if (ideas && ideas.length > 0) {
      const ideasWithCounts = await Promise.all(ideas.map(async (idea) => {
        // 댓글 수 가져오기
        const { count: commentCount, error: commentError } = await supabaseAdmin
          .from('comments')
          .select('id', { count: 'exact' })
          .eq('idea_id', idea.id);
          
        // 북마크 수 가져오기
        const { count: bookmarkCount, error: bookmarkError } = await supabaseAdmin
          .from('bookmarks')
          .select('id', { count: 'exact' })
          .eq('idea_id', idea.id);
          
        return {
          ...idea,
          comment_count: commentError ? 0 : (commentCount || 0),
          bookmark_count: bookmarkError ? 0 : (bookmarkCount || 0)
        };
      }));
      
      return ideasWithCounts;
    }
    
    return ideas || [];
  } catch (error) {
    console.error('아이디어 조회 오류:', error);
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

export async function createComment(userId: string, ideaId: string, content: string): Promise<Comment | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('comments')
      .insert([
        { user_id: userId, idea_id: ideaId, content }
      ])
      .select('id, content, created_at, idea_id, user_id, users:user_id(id, name)')
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('댓글 생성 오류:', error);
    return null;
  }
}

export async function deleteComment(commentId: string, userId: string): Promise<boolean> {
  try {
    // 먼저 댓글이 해당 사용자의 것인지 확인
    const { data: comment, error: checkError } = await supabaseAdmin
      .from('comments')
      .select('user_id')
      .eq('id', commentId)
      .single();
    
    if (checkError || !comment) return false;
    if (comment.user_id !== userId) return false;
    
    // 댓글 삭제
    const { error } = await supabaseAdmin
      .from('comments')
      .delete()
      .eq('id', commentId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('댓글 삭제 오류:', error);
    return false;
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