import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from './supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          console.log("로그인 시도:", credentials.username);
          
          // 사용자 조회 (관리자 권한 사용)
          const { data: user, error } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('name', credentials.username)
            .single();
          
          console.log("사용자 조회 결과:", user ? user.id : null, "에러:", error ? error.message : null);
          
          if (error) {
            console.log("사용자 조회 오류:", error.message);
            return null;
          }
          
          if (!user) {
            console.log("사용자를 찾을 수 없습니다.");
            return null;
          }
          
          // 비밀번호 확인
          console.log("비밀번호 확인 시도");
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          console.log("비밀번호 일치 여부:", passwordMatch);
          
          if (!passwordMatch) {
            console.log("비밀번호가 일치하지 않습니다.");
            return null;
          }
          
          return {
            id: user.id,
            name: user.name,
            email: user.email || undefined,
          };
        } catch (error) {
          console.error('로그인 오류:', error);
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
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;