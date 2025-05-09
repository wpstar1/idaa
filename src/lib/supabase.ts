import { createClient } from '@supabase/supabase-js';

// 일반 Supabase 클라이언트 생성 함수 (익명 키 사용)
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL과 Anon Key가 설정되지 않았습니다.');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// 서비스 역할 키를 사용하는 관리자 Supabase 클라이언트 생성 함수
export const createSupabaseAdminClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase URL과 Service Role Key가 설정되지 않았습니다.');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
};

// 서버 측에서 사용할 일반 Supabase 클라이언트
export const supabaseServer = createSupabaseClient();

// 서버 측에서 사용할 관리자 Supabase 클라이언트 (RLS 우회)
export const supabaseAdmin = createSupabaseAdminClient();