# 바이브코딩 돈버는 아이디어 모음

다양한 수익창출 아이디어를 공유하고 북마크하며 댓글을 통해 소통할 수 있는 웹 플랫폼입니다.

## 주요 기능

- **회원가입/로그인**: 간단한 아이디와 비밀번호로 가입 및 로그인
- **아이디어 목록**: 다양한 수익 창출 아이디어 확인
- **아이디어 상세**: 아이디어에 대한 자세한 설명과 특징 확인
- **북마크 기능**: 관심있는 아이디어 저장 및 관리
- **댓글 기능**: 아이디어에 대한 의견 공유 및 소통

## 기술 스택

- **프론트엔드**: Next.js, React, TailwindCSS
- **백엔드**: Next.js API Routes, Supabase
- **인증**: NextAuth.js
- **데이터베이스**: Supabase (PostgreSQL)

## 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- Supabase 계정 및 프로젝트

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정합니다:

```
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 데이터베이스 설정

Supabase SQL 에디터에서 `supabase_setup.sql` 파일의 내용을 실행하여 필요한 테이블과 샘플 데이터를 생성합니다.

### 개발 서버 시작

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 애플리케이션을 확인할 수 있습니다.

## Vercel 배포 가이드

### 배포 전 최적화 팁

1. **환경 변수 설정**: Vercel 대시보드에서 모든 환경 변수를 정확히 설정합니다.
2. **서버리스 함수 최적화**: 복잡한 쿼리에 주의하고, 가능한 한 효율적인 방식으로 데이터를 가져옵니다.
3. **NEXTAUTH_URL**: 실제 배포 URL로 설정해야 합니다 (예: `https://your-app.vercel.app`).

### 배포 방법

1. GitHub 저장소에 코드를 푸시합니다.
2. Vercel 대시보드에서 새 프로젝트를 생성하고 GitHub 저장소를 연결합니다.
3. 필요한 환경 변수를 설정합니다.
4. "Deploy" 버튼을 클릭하여 배포를 시작합니다.

Next.js는 Vercel과 완벽하게 호환되므로 배포 과정이 매우 원활하게 진행됩니다.