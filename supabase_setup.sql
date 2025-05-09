-- Supabase 테이블 및 설정을 위한 통합 SQL 스크립트
-- 프로젝트 배포 시 필요한 테이블 구조와 설정이 포함되어 있습니다.

-- 1. 테이블 생성
-- users 테이블 (사용자 정보)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255),
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ideas 테이블 (아이디어 정보)
CREATE TABLE IF NOT EXISTS ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  features TEXT,
  tag VARCHAR(100),
  target VARCHAR(255),
  revenue VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- comments 테이블 (댓글)
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  idea_id UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- bookmarks 테이블 (북마크)
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  idea_id UUID NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, idea_id)
);

-- 2. 주요 수정 사항
-- users 테이블의 email 필드를 nullable로 변경
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;

-- 3. RLS 정책 비활성화 (개발 환경용)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE ideas DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks DISABLE ROW LEVEL SECURITY;

-- 참고: 프로덕션 환경에서는 적절한 RLS 정책을 설정하는 것이 좋습니다.
-- 아래는 예시 RLS 정책입니다 (필요시 주석 해제하여 사용):
/*
-- 사용자 테이블 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY users_select ON users FOR SELECT USING (true);
CREATE POLICY users_insert ON users FOR INSERT WITH CHECK (true);
CREATE POLICY users_update ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY users_delete ON users FOR DELETE USING (auth.uid() = id);

-- 아이디어 테이블 RLS
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY ideas_select ON ideas FOR SELECT USING (true);
CREATE POLICY ideas_insert ON ideas FOR INSERT WITH CHECK (true);

-- 댓글 테이블 RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY comments_select ON comments FOR SELECT USING (true);
CREATE POLICY comments_insert ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY comments_delete ON comments FOR DELETE USING (auth.uid() = user_id);

-- 북마크 테이블 RLS
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY bookmarks_select ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY bookmarks_insert ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY bookmarks_delete ON bookmarks FOR DELETE USING (auth.uid() = user_id);
*/

-- 4. 인덱스 추가 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
CREATE INDEX IF NOT EXISTS idx_comments_idea_id ON comments(idea_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id_idea_id ON bookmarks(user_id, idea_id);

-- 5. 샘플 아이디어 데이터
INSERT INTO ideas (title, summary, features, tag, target, revenue)
VALUES
  ('AI 기반 콘텐츠 제작 도구', '인공지능을 활용하여 블로그 글, 소셜 미디어 포스트, 광고 문구 등 다양한 콘텐츠를 자동으로 생성해주는 서비스입니다.', '다양한 콘텐츠 유형 지원, 브랜드 톤앤매너 학습, API 제공', '인공지능', '콘텐츠 제작자, 마케터', '월 구독 모델'),
  ('온라인 코딩 교육 플랫폼', '초보자도 쉽게 코딩을 배울 수 있는 인터랙티브 학습 플랫폼입니다. 실시간 코드 실행과 피드백을 제공합니다.', '인터랙티브 코딩 환경, 진도 추적, 프로젝트 기반 학습', '교육', '코딩 입문자, 학생', '프리미엄 코스 판매'),
  ('지역 기반 음식 배달 앱', '지역 소상공인과 연결하여 맛있는 홈메이드 음식을 배달해주는 서비스입니다.', '위치 기반 검색, 실시간 배달 추적, 리뷰 시스템', '푸드테크', '바쁜 직장인, 맛집 탐험가', '주문 수수료'),
  ('친환경 제품 큐레이션 마켓', '지구에 좋은 친환경 제품을 엄선하여 소개하고 판매하는 온라인 마켓플레이스입니다.', '제품 환경 영향 평가, 정기 구독 박스, 커뮤니티 포럼', '커머스', '환경 의식 있는 소비자', '제품 판매 마진'),
  ('디지털 노마드를 위한 숙박 플랫폼', '원격 근무자와 디지털 노마드를 위한 장기 숙박과 코워킹 공간을 연결해주는 서비스입니다.', '안정적인 인터넷 속도 보장, 코워킹 시설 정보, 노마드 커뮤니티', '여행', '디지털 노마드, 원격 근무자', '예약 수수료')
ON CONFLICT (id) DO NOTHING;