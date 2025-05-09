import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("사용자 이름 또는 비밀번호가 제공되지 않았습니다.");
          return null;
        }

        try {
          console.log(`로그인 시도: ${credentials.username}`);
          
          // 사용자 조회 (관리자 권한 사용)
          const { data: user, error } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('name', credentials.username)
            .single();
          
          if (error) {
            console.log("사용자 조회 오류:", error.message);
            return null;
          }
          
          if (!user) {
            console.log("사용자를 찾을 수 없습니다.");
            return null;
          }
          
          console.log("사용자 찾음:", user.id);
          
          // 비밀번호 확인
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValidPassword) {
            console.log("비밀번호가 일치하지 않습니다.");
            return null;
          }
          
          console.log("로그인 성공");
          
          return {
            id: user.id,
            name: user.name,
            email: user.email || `${user.name}@example.com`
          };
        } catch (error) {
          console.error("로그인 과정에서 예외 발생:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };