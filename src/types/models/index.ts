// 사용자 모델
export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string;
  created_at: string;
}

// 아이디어 모델
export interface Idea {
  id: string;
  title: string;
  summary: string;
  features: string | null;
  target: string | null;
  revenue: string | null;
  tag: string | null;
  created_at: string;
}

// 댓글 모델
export interface Comment {
  id: string;
  content: string;
  user_id: string;
  idea_id: string;
  created_at: string;
  users?: User; // Supabase 조인 결과
}

// 북마크 모델
export interface Bookmark {
  id: string;
  user_id: string;
  idea_id: string;
  created_at: string;
  ideas?: Idea; // Supabase 조인 결과
}