import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// 새로운 아이디어 목록 (매일 5개씩 추가)
const dailyIdeas = [
  // 첫째 날 아이디어
  [
    {
      title: 'AI 기반 콘텐츠 요약 서비스',
      summary: '긴 문서, 기사, 책을 AI로 요약해주는 서비스. 바쁜 전문직 종사자들에게 시간 절약 효과 제공.',
      features: '다양한 언어 지원, 주요 포인트 추출, 다양한 요약 길이 옵션',
      tag: '인공지능',
      target: '바쁜 전문직 종사자, 학생, 리서처',
      revenue: '월 구독 모델, 무료/프리미엄 티어'
    },
    {
      title: '로컬 식자재 직거래 플랫폼',
      summary: '지역 농부와 소비자를 직접 연결하는 플랫폼. 신선한 농산물을 중간 마진 없이 합리적 가격에 제공.',
      features: '실시간 재고 확인, 농부 스토리텔링, 정기 배송 서비스',
      tag: '푸드테크',
      target: '건강 식품 선호자, 로컬 비즈니스 지지자',
      revenue: '거래 수수료, 프리미엄 구독 서비스'
    },
    {
      title: '재택근무자를 위한 버추얼 오피스',
      summary: '재택근무자가 실제 오피스 환경처럼 소통할 수 있는 가상 공간 제공. 화이트보드, 회의실 등 구현.',
      features: '가상 회의실, 자연스러운 대화 영역, 문서 공유 기능',
      tag: '원격근무',
      target: '원격 근무 회사, 프리랜서 팀',
      revenue: '사용자당 월별 구독 모델'
    },
    {
      title: '디지털 노마드를 위한 여행 플래너',
      summary: '원격 근무자를 위한, 인터넷 속도와 코워킹 스페이스를 중심으로 한 여행 계획 서비스.',
      features: '속도 테스트 데이터베이스, 비자 정보, 커뮤니티 리뷰',
      tag: '여행',
      target: '디지털 노마드, 원격 근무자',
      revenue: '프리미엄 멤버십, 추천 서비스 수수료'
    },
    {
      title: '주식 초보자를 위한 가상 투자 게임',
      summary: '실제 시장 데이터를 기반으로 투자 경험을 쌓을 수 있는 게임화된 플랫폼.',
      features: '실시간 시장 데이터, 튜토리얼, 투자 성과 분석',
      tag: '핀테크',
      target: '투자 입문자, 금융 교육 분야',
      revenue: '프리미엄 기능, 관련 금융 상품 추천'
    }
  ],
  // 둘째 날 아이디어
  [
    {
      title: '개인 맞춤형 영양제 구독 서비스',
      summary: '개인의 건강 상태와 목표에 맞는 맞춤형 영양제 패키지를 월 단위로 배송.',
      features: '온라인 건강 설문, 정기적 건강 평가, 전문가 상담',
      tag: '헬스케어',
      target: '건강 관리에 관심 있는 성인',
      revenue: '월 구독료, 추가 제품 판매'
    },
    {
      title: '스마트홈 에너지 관리 시스템',
      summary: 'AI를 활용해 가정 내 에너지 사용량을 최적화하고 전기요금을 절약하는 솔루션.',
      features: '실시간 모니터링, 스마트 기기 제어, 절약 조언',
      tag: '스마트홈',
      target: '주택 소유자, 에너지 절약에 관심 있는 사람들',
      revenue: '하드웨어 판매, 월 구독 서비스'
    },
    {
      title: '온라인 전문 기술 교환 플랫폼',
      summary: '전문가들이 서로 다른 분야의 기술을 교환할 수 있는 플랫폼. 예: 웹 개발 vs 그래픽 디자인',
      features: '기술 매칭 알고리즘, 평판 시스템, 시간 기반 거래',
      tag: '전문 서비스',
      target: '프리랜서, 전문직 종사자',
      revenue: '프리미엄 멤버십, 거래 수수료'
    },
    {
      title: '반려동물 건강 모니터링 웨어러블',
      summary: '반려동물의 활동, 식사, 수면을 추적하여 건강 이상을 조기에 발견하는 웨어러블 기기.',
      features: '활동 트래킹, 수의사 데이터 연동, 건강 이상 알림',
      tag: '펫테크',
      target: '반려동물 주인',
      revenue: '하드웨어 판매, 구독형 건강 서비스'
    },
    {
      title: '개인 금융 자동화 도구',
      summary: '수입, 지출, 투자를 자동으로 관리하고 최적화하는 개인 금융 앱.',
      features: '자동 예산 조정, 절약 제안, 투자 최적화',
      tag: '핀테크',
      target: '재정 관리에 어려움을 겪는 청년층',
      revenue: '프리미엄 기능 구독, 금융 제품 추천'
    }
  ],
  // 셋째 날 아이디어
  [
    {
      title: '가상 여행 경험 플랫폼',
      summary: 'VR 기술을 활용해 집에서 세계 각국의 명소를 체험할 수 있는 몰입형 여행 서비스.',
      features: '고화질 360도 영상, 현지 가이드 해설, 문화 체험',
      tag: '가상현실',
      target: '여행 애호가, 시니어 세대',
      revenue: '콘텐츠 별 구매, 월 구독 서비스'
    },
    {
      title: '중고 디자이너 의류 인증 마켓플레이스',
      summary: '고급 디자이너 의류를 인증 과정을 통해 안전하게 거래할 수 있는 플랫폼.',
      features: '전문가 인증, 에스크로 서비스, 가격 추천',
      tag: '패션',
      target: '패션 애호가, 환경 의식 있는 소비자',
      revenue: '판매 수수료, 인증 수수료'
    },
    {
      title: '소셜 러닝 플랫폼',
      summary: '같은 주제를 공부하는 사람들을 연결하여 함께 학습하고 동기부여를 주는 커뮤니티 서비스.',
      features: '스터디 그룹 매칭, 진도 공유, 게임화된 도전 과제',
      tag: '교육',
      target: '학생, 평생 학습자',
      revenue: '프리미엄 기능, 교육 콘텐츠 판매'
    },
    {
      title: '식품 폐기물 절감 앱',
      summary: '유통기한이 임박한 식품을 할인된 가격에 판매하거나 나눔 할 수 있는 커뮤니티 플랫폼.',
      features: '위치 기반 매칭, 바코드 스캐닝, 임팩트 측정',
      tag: '지속가능성',
      target: '환경 의식 있는 소비자, 소상공인',
      revenue: '상업적 판매자 수수료, 프리미엄 위치 노출'
    },
    {
      title: '개인 맞춤형 피트니스 AI 코치',
      summary: 'AI를 활용해 사용자의 체형, 목표, 선호도에 맞는 맞춤형 운동 루틴과 식단을 제공.',
      features: '운동 형태 분석, 진행 추적, 실시간 피드백',
      tag: '피트니스',
      target: '홈트레이닝 애호가, 바쁜 현대인',
      revenue: '월 구독 모델, 개인화된 프리미엄 플랜'
    }
  ]
];

// 실행 시간대를 기반으로 요일 결정 (0: 일요일, 1: 월요일, ...)
function getDayIndex(): number {
  const now = new Date();
  const day = now.getDay(); // 0-6 (일-토)
  
  // 요일에 맞게 아이디어 세트 선택 (3일 주기로 로테이션)
  return day % 3;
}

export async function GET() {
  try {
    // 보안 토큰 확인 (Vercel Cron은 기본적으로 보안이 되어 있음)
    // 로컬에서 테스트 시에는 추가 보안 조치가 필요할 수 있음
    
    const dayIndex = getDayIndex();
    const ideasToAdd = dailyIdeas[dayIndex];
    
    console.log(`오늘의 아이디어 추가 (${dayIndex + 1}번째 세트, ${ideasToAdd.length}개)`);
    
    // 최근 아이디어 확인 (중복 방지)
    const { data: latestIdeas } = await supabaseAdmin
      .from('ideas')
      .select('title')
      .order('created_at', { ascending: false })
      .limit(15);
    
    const latestTitles = latestIdeas?.map(idea => idea.title) || [];
    
    // 중복되지 않는 아이디어만 필터링
    const newIdeas = ideasToAdd.filter(idea => !latestTitles.includes(idea.title));
    
    if (newIdeas.length === 0) {
      return NextResponse.json({ message: '오늘 추가할 새로운 아이디어가 없습니다.' });
    }
    
    // 아이디어 추가
    const { data, error } = await supabaseAdmin
      .from('ideas')
      .insert(newIdeas)
      .select();
    
    if (error) {
      console.error('아이디어 추가 실패:', error);
      return NextResponse.json(
        { message: '아이디어 추가 중 오류가 발생했습니다.', error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: `${data.length}개의 새로운 아이디어가 성공적으로 추가되었습니다.`,
      ideas: data
    });
  } catch (error) {
    console.error('Daily ideas cron job error:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.', error: String(error) },
      { status: 500 }
    );
  }
}