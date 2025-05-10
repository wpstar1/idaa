import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import OpenAI from 'openai';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 기존 아이디어 목록 (백업용) - 요약을 더 상세하게 업데이트
const backupIdeas = [
  {
    title: 'AI 기반 법률 문서 자동화 솔루션',
    summary: '변호사와 법률 전문가를 위한 AI 기반 법률 문서 자동 작성 및 검토 시스템입니다. 복잡한 법률 문서 작성 시간을 90%까지 단축하고 오류 가능성을 크게 줄여줍니다. 사용자는 필요한 문서 유형을 선택하고 주요 정보만 입력하면 AI가 나머지 작업을 완료합니다.',
    features: '계약서 자동 작성, 법률 문서 검토, 판례 분석, 위험 조항 감지',
    tag: 'LegalTech',
    target: '법률 사무소, 기업 법무팀, 부동산 중개업체',
    revenue: '월 구독제 + 문서 수 기반 종량제'
  },
  {
    title: '소규모 수제 브랜드 글로벌 마켓플레이스',
    summary: '전세계 소규모 수제 브랜드와 장인을 위한 글로벌 판매 플랫폼입니다. 로컬 브랜드가 국제적으로 성장할 수 있는 인프라를 제공합니다. 중소 생산자들이 복잡한 국제 배송, 마케팅, 다국어 지원 없이도 전 세계 고객에게 제품을 판매할 수 있어 기존에는 접근하기 어려웠던 해외 시장 진출이 가능해집니다.',
    features: '간편한 국제 배송, 다국어 지원, 스토리텔링 마케팅, 현지화 서비스',
    tag: '이커머스',
    target: '소규모 수제품 브랜드, 장인, 독특한 제품을 찾는 소비자',
    revenue: '판매 수수료, 프리미엄 셀러 구독, 프로모션 노출'
  },
  {
    title: '크리에이터 수익 최적화 플랫폼',
    summary: '유튜버, 인플루언서 등 콘텐츠 크리에이터가 모든 수익 스트림을 한 곳에서 관리하고 최적화할 수 있는 SaaS 플랫폼입니다. 다양한 수익원(광고, 후원, 멤버십, 상품 판매 등)을 통합 관리하고, AI가 수익 증대를 위한 최적의 전략을 제안합니다. 복잡한 세금 계산과 계약 관리까지 자동화하여 크리에이터가 콘텐츠 제작에만 집중할 수 있게 합니다.',
    features: '다중 플랫폼 수익 통합, AI 기반 수익 최적화, 세금 계획, 계약 관리',
    tag: '크리에이터 이코노미',
    target: '중소형 인플루언서, 유튜버, 콘텐츠 크리에이터',
    revenue: '월 구독제 + 수익 기반 성과 수수료'
  },
  {
    title: '스마트 레스토랑 자동화 시스템',
    summary: '레스토랑 운영의 모든 측면을 디지털화하고 자동화하는 올인원 솔루션입니다. 주문 접수부터 재고 관리, 직원 일정까지 모든 프로세스를 최적화하여 인력 비용을 30%까지 절감합니다. 동시에 데이터 기반 의사결정으로 고객 경험을 향상시키고, 실시간 분석을 통해 메뉴와 가격 전략을 지속적으로 최적화할 수 있습니다.',
    features: '자동 주문 처리, 재고 관리, 데이터 분석, 직원 일정 최적화',
    tag: '푸드테크',
    target: '중소형 레스토랑, 카페, 프랜차이즈',
    revenue: '월 구독 모델 + 주문당 소액 수수료'
  },
  {
    title: '리모트 팀 생산성 분석 플랫폼',
    summary: '원격 근무 팀의 생산성을 객관적으로 측정하고 향상시키는 툴입니다. 마이크로매니징 없이도 팀 성과를 투명하게 관리할 수 있습니다. 작업 흐름, 협업 패턴을 시각화하고 병목 현상을 자동으로 감지하여 개선점을 제안합니다. 또한 번아웃 징후를 조기에 감지하여 팀원 건강을 보호하면서도 최적의 생산성을 유지할 수 있습니다.',
    features: '프로젝트 진행 시각화, 자동 업무 로깅, 번아웃 예방 알림, 성과 기반 인센티브 시스템',
    tag: '리모트워크',
    target: '원격 근무 기업, 분산된 프로젝트 팀',
    revenue: '직원당 월 구독료 + 기업용 대시보드 프리미엄 요금'
  },
  {
    title: '개인 투자자용 대체 투자 플랫폼',
    summary: '일반 개인 투자자들이 예술품, 와인, 희귀 수집품 등 대체 자산에 소액으로 투자할 수 있는 플랫폼입니다. 고가의 자산을 소유권 토큰으로 분할하여 소액부터 투자가 가능하며, 전문가 감정과 블록체인 기술로 투명한 거래를 보장합니다. 주식시장과 상관관계가 낮은 자산에 투자함으로써 포트폴리오 다각화 효과를 얻을 수 있습니다.',
    features: '자산 분할 소유권, 투명한 가치 평가, 거래 마켓플레이스, 자산 보관 서비스',
    tag: '핀테크',
    target: '포트폴리오 다각화를 원하는 개인 투자자',
    revenue: '거래 수수료 + 보관 수수료 + 프리미엄 리서치'
  },
  {
    title: '시니어 특화 헬스케어 모니터링 시스템',
    summary: '노인을 위한 비침습적 건강 모니터링 및 원격 케어 솔루션입니다. 독립적인 생활을 원하는 노인들의 안전을 보장하면서 가족에게 안심을 제공합니다. 웨어러블 기기와 스마트홈 센서를 통해 활동 패턴, 수면, 약물 복용 등을 모니터링하고, 이상 징후 발견 시 즉시 가족과 의료진에게 알립니다. 응급 상황 감지 시 자동 대응 시스템이 작동하여 골든타임을 확보합니다.',
    features: '실시간 활동 모니터링, 약물 복용 관리, 응급상황 감지, 가족 알림 시스템',
    tag: '헬스테크',
    target: '노인과 그 가족, 요양원',
    revenue: '하드웨어 판매 + 월 구독 모델'
  }
];

// GPT API를 통해 새로운 비즈니스 아이디어 생성
async function generateBusinessIdeas(count = 5) {
  try {
    console.log('OpenAI API 호출 시작...');
    console.log('API 키 상태:', process.env.OPENAI_API_KEY ? '설정됨' : '설정되지 않음');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `당신은 혁신적이고 수익성 높은 비즈니스 아이디어를 생성하는 전문가입니다. 
          특히 SaaS, 구독 모델, 마켓플레이스 등 실제로 돈을 벌 수 있는 아이디어에 특화되어 있습니다. 
          형식적이거나 일반적인 아이디어가 아닌, 실제 시장에서 수요가 있고 수익 창출이 가능한 구체적인 비즈니스 아이디어를 제시하세요.
          트렌드를 반영하고 실제 창업가가 바로 시작할 수 있을 정도로 구체적이어야 합니다.`
        },
        {
          role: "user",
          content: `현재 시장에서 성공 가능성이 높은 실제 수익 창출이 가능한 비즈니스 아이디어 ${count}개를 JSON 형식으로 생성해주세요.
          일반적인 아이디어나 이미 포화된 시장의 아이디어는 지양하고, 혁신적이고 틈새시장을 공략할 수 있는 아이디어를 원합니다.
          각 아이디어는 다음 포맷을 따라야 합니다:
          [
            {
              "title": "아이디어 제목",
              "summary": "해당 비즈니스가 어떻게 작동하는지, 왜 필요한지, 어떻게 돈을 버는지를 포함한 상세한 3-5문장 설명. 구체적인 수치나 예시를 포함하면 더 좋습니다.",
              "features": "핵심 기능 3-4개 (쉼표로 구분)",
              "tag": "카테고리 (SaaS, 핀테크, 헬스케어 등)",
              "target": "타겟 고객층",
              "revenue": "수익 모델 설명"
            }
          ]
          다양한 분야의 아이디어를 제공하고, 각 아이디어는 정말 시장성이 있어야 합니다. 특히 '요약' 부분은 매우 상세하게 작성하여 독자가 비즈니스 아이디어를 명확히 이해할 수 있도록 해주세요.`
        }
      ],
      temperature: 1.2,
      max_tokens: 2500
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("비어있는 응답이 반환되었습니다.");
    }

    console.log('API 응답 받음');
    console.log('응답 내용:', content.substring(0, 100) + '...');

    // JSON 형식으로 파싱
    // 응답이 백틱(```)으로 감싸져 있을 수 있으므로 필요한 부분만 추출
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('JSON 형식이 감지되지 않음. 원본 응답:', content);
      throw new Error("JSON 형식으로 파싱할 수 없습니다.");
    }

    const jsonContent = jsonMatch[0];
    const ideas = JSON.parse(jsonContent);
    console.log(`${ideas.length}개의 아이디어가 성공적으로 생성되었습니다.`);
    return ideas;
  } catch (error) {
    console.error('GPT API 호출 오류:', error);
    // 에러 발생 시 백업 아이디어에서 랜덤하게 선택
    console.log('백업 아이디어를 사용합니다.');
    
    // 매번 다른 백업 아이디어를 제공하기 위해 백업 아이디어를 무작위로 섞음
    const shuffledBackups = [...backupIdeas].sort(() => 0.5 - Math.random());
    
    // count만큼 아이디어 선택 (중복 가능)
    const randomIdeas = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * backupIdeas.length);
      // 백업 아이디어 그대로 사용 (날짜/타임스탬프 없음)
      const idea = JSON.parse(JSON.stringify(shuffledBackups[randomIndex % shuffledBackups.length]));
      randomIdeas.push(idea);
    }
    return randomIdeas;
  }
}

export async function GET() {
  try {
    console.log('GPT API를 통한 비즈니스 아이디어 생성 시작...');
    
    // GPT를 통해 새로운 아이디어 5개 생성
    const newIdeas = await generateBusinessIdeas(5);
    
    console.log(`${newIdeas.length}개의 새로운 아이디어가 생성되었습니다:`, 
      newIdeas.map(idea => idea.title).join(', '));
    
    // 아이디어 바로 추가 (중복 체크 건너뛰기)
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
      message: `${data.length}개의 새로운 비즈니스 아이디어가 성공적으로 추가되었습니다.`,
      ideas: data
    });
  } catch (error) {
    console.error('비즈니스 아이디어 생성 오류:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.', error: String(error) },
      { status: 500 }
    );
  }
}