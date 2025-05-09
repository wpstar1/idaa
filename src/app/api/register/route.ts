import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, password, confirmPassword } = body;

    // 필수 입력값 확인
    if (!name || !password) {
      return NextResponse.json(
        { message: '아이디와 비밀번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 비밀번호 확인 체크
    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { message: '비밀번호가 일치하지 않습니다.' },
        { status: 400 }
      );
    }

    const supabase = supabaseAdmin;

    // 아이디 중복 확인
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('name', name)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: '이미 사용 중인 아이디입니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 더미 이메일 생성 (Supabase users 테이블에서 email이 필수 필드임)
    const dummyEmail = `${name}-${Date.now()}@example.com`;

    // 사용자 생성
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name,
        email: dummyEmail, // 더미 이메일 추가
        password: hashedPassword,
      })
      .select('id, name, created_at')
      .single();

    if (error) {
      console.error('회원가입 실패:', error);
      
      // 구체적인 에러 메시지 제공
      let errorMessage = '회원가입 중 오류가 발생했습니다.';
      let statusCode = 500;
      
      if (error.code === '23505') {
        errorMessage = '이미 사용 중인 아이디 또는 이메일입니다.';
        statusCode = 409;
      } else if (error.code === '23502') {
        errorMessage = '필수 입력값이 누락되었습니다.';
        statusCode = 400;
      }
      
      return NextResponse.json(
        { message: errorMessage, error: error.message },
        { status: statusCode }
      );
    }
    
    if (!user) {
      console.error('회원가입 후 사용자 정보를 가져오지 못했습니다.');
      return NextResponse.json(
        { message: '회원가입은 성공했으나 사용자 정보를 가져오지 못했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.', user },
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