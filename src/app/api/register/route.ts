import { NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/utils/supabase-utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 필수 입력값 확인
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 중복 확인
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { message: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      );
    }

    // 사용자 생성 (비밀번호 해싱은 createUser 함수 내에서 처리)
    const user = await createUser(name, email, password);

    if (!user) {
      return NextResponse.json(
        { message: '회원가입 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 민감한 정보 제외하고 반환
    const { password: _, ...result } = user;

    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.', user: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return NextResponse.json(
      { message: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}