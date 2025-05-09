import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// 테스트용 API 라우트
export async function GET() {
  try {
    // 1. users 테이블 구조 확인
    const { data: tableInfo, error: tableError } = await supabaseAdmin
      .from('users')
      .select('*')
      .limit(1);

    // 2. 샘플 사용자 생성 테스트
    const testUser = {
      name: `test-${Date.now()}`,
      email: `test-${Date.now()}@example.com`,
      password: 'hashed_password_here'
    };

    const { data: insertResult, error: insertError } = await supabaseAdmin
      .from('users')
      .insert(testUser)
      .select();

    // 모든 결과 반환
    return NextResponse.json({
      tableInfo,
      tableError: tableError ? tableError.message : null,
      insertResult,
      insertError: insertError ? insertError.message : null
    });
  } catch (error) {
    console.error('Supabase 테스트 오류:', error);
    return NextResponse.json({ error: 'Supabase 연결 테스트 중 오류가 발생했습니다.' }, { status: 500 });
  }
}