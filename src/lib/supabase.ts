import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
// 환경 변수에서 URL과 익명 키를 가져옵니다
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// 서비스 롤 키 (관리자 권한이 필요한 작업용)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// 기본 Supabase 클라이언트 (익명 키 사용 - 일반 사용자용)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 관리자 Supabase 클라이언트 (서비스 롤 키 사용 - 관리자용)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);