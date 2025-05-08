import { supabase, supabaseAdmin } from '@/lib/supabase';
import { User, Idea, Comment, Bookmark } from '@/types/models';
import { hash, compare } from 'bcrypt';

// 사용자 관련 함수
export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  try {
    // 비밀번호 해싱
    const hashedPassword = await hash(password, 10);
    
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([
        { name, email, password: hashedPassword }
      ])
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('사용자 생성 오류:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    return null;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    return null;
  }
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  try {
    return await compare(password, user.password);
  } catch (error) {
    console.error('비밀번호 검증 오류:', error);
    return false;
  }
}

// 아이디어 관련 함수
export async function getIdeas(limit = 10): Promise<Idea[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('아이디어 조회 오류:', error);
    return [];
  }
}

export async function getIdeaById(id: string): Promise<Idea | null> {
  try {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        users:user_id (
          id,
          name,
          email
        )
      `)
      .eq('idea_id', ideaId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    return [];
  }
}

export async function createComment(content: string, userId: string, ideaId: string): Promise<Comment | null> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        { content, user_id: userId, idea_id: ideaId }
      ])
      .select(`
        *,
        users:user_id (
          id,
          name,
          email
        )
      `)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('댓글 생성 오류:', error);
    return null;
  }
}

export async function deleteComment(id: string, userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('댓글 삭제 오류:', error);
    return false;
  }
}

// 북마크 관련 함수
export async function checkBookmark(userId: string, ideaId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .eq('idea_id', ideaId)
      .maybeSingle();
    
    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('북마크 체크 오류:', error);
    return false;
  }
}

export async function addBookmark(userId: string, ideaId: string): Promise<Bookmark | null> {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .insert([
        { user_id: userId, idea_id: ideaId }
      ])
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('북마크 추가 오류:', error);
    return null;
  }
}

export async function removeBookmark(userId: string, ideaId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('idea_id', ideaId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('북마크 삭제 오류:', error);
    return false;
  }
}

export async function getUserBookmarks(userId: string): Promise<Idea[]> {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select(`
        ideas:idea_id (*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data?.map(item => item.ideas) || [];
  } catch (error) {
    console.error('북마크 조회 오류:', error);
    return [];
  }
}