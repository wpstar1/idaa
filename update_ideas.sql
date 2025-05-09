-- 아이디어 1 업데이트: AI 번역 어시스턴트
UPDATE ideas
SET 
summary = '실시간으로 다국어 번역과 대화를 지원하는 AI 어시스턴트입니다. 여행자나 국제 비즈니스에 매우 유용합니다. 기존 번역 서비스와 달리 문맥을 완벽하게 이해하고 자연스러운 번역을 제공합니다. 특히 비즈니스 미팅, 해외여행, 외국어 학습 상황에서 실시간으로 대화를 번역해주어 언어 장벽을 완전히 해소합니다. 음성 인식 기능을 통해 말하는 내용을 즉시 번역하며, 오프라인 모드에서도 기본적인 번역 기능을 사용할 수 있어 데이터 연결이 불안정한 해외에서도 문제없이 사용 가능합니다.',

features = '1. 실시간 음성 번역: 대화 중 실시간으로 음성을 인식하고 번역하여 자연스러운 대화 지원
2. 문맥 인식 번역: 단순 단어 번역이 아닌 전체 문맥을 이해하는 고급 AI 알고리즘 활용
3. 오프라인 모드: 주요 언어에 대해 인터넷 연결 없이도 기본 번역 기능 제공
4. 이미지 텍스트 번역: 사진 속 텍스트(메뉴판, 표지판 등)를 실시간으로 인식하고 번역
5. 전문 분야별 최적화: 비즈니스, 의료, 법률, 기술 등 전문 분야별 용어 최적화 번역 제공
6. 발음 코칭: 번역된 문장의 올바른 발음을 음성으로 안내하고 사용자 발음 교정 제공
7. 대화 기록 및 학습: 자주 사용하는 표현과 단어를 기억하고 개인화된 번역 서비스 제공'
WHERE title = 'AI 번역 어시스턴트';

-- 아이디어 2 업데이트: 자동화된 콘텐츠 요약 도구
UPDATE ideas
SET 
summary = '긴 문서나 기사를 AI가 자동으로 요약해주는 서비스입니다. 시간을 절약하고 핵심 내용을 빠르게 파악할 수 있습니다. 현대인들은 매일 엄청난 양의 정보를 접하지만, 모든 내용을 꼼꼼히 읽을 시간은 부족합니다. 이 도구는 최신 자연어 처리 기술을 활용하여 어떤 문서든 핵심만 추출해 간결하게 요약해 줍니다. 학술 논문, 뉴스 기사, 계약서, 보고서 등 다양한 종류의 문서를 지원하며, 사용자가 원하는 요약 길이와 형식을 자유롭게 설정할 수 있습니다. 또한 중요한 키워드를 자동으로 추출하여 문서의 주요 주제를 빠르게 파악할 수 있게 해줍니다.',

features = '1. 다양한 문서 형식 지원: PDF, DOC, TXT, HTML 등 다양한 형식의 문서를 업로드하여 즉시 요약
2. 맞춤형 요약 길이 설정: 요약 비율(10%~50%)이나 단어/문장 수를 사용자가 직접 지정 가능
3. 주요 키워드 추출: 문서에서 가장 중요한 키워드와 개념을 자동으로 추출하여 시각화
4. 다중 언어 지원: 40개 이상의 언어로 작성된 문서의 요약과 번역 동시 지원
5. 인사이트 분석: 단순 요약을 넘어 문서의 논조, 감정, 편향성 등 심층 분석 제공
6. 보안 및 개인정보 보호: 엔드투엔드 암호화로 민감한 정보 보호, GDPR 준수
7. API 통합: 기업의 기존 시스템과 쉽게 통합할 수 있는 RESTful API 제공
8. 오디오 변환: 요약된 내용을 자연스러운 음성으로 변환하여 이동 중에도 청취 가능'
WHERE title = '자동화된 콘텐츠 요약 도구';

-- 아이디어 3 업데이트: 개인화된 헬스 트래킹 앱
UPDATE ideas
SET 
summary = '사용자의 건강 데이터를 분석하고 맞춤형 건강 관리 방안을 제시하는 앱입니다. 현대인의 바쁜 생활 속에서 건강 관리는 점점 더 중요해지고 있지만, 개인에게 맞는 건강 조언을 받기는 쉽지 않습니다. 이 앱은 사용자의 수면 패턴, 활동량, 식이 습관, 스트레스 수준 등 다양한 건강 지표를 스마트폰과 웨어러블 기기를 통해 자동으로 수집하고 분석합니다. 인공지능이 사용자의 생활 패턴과 건강 상태를 종합적으로 평가하여 개인화된 조언을 제공하며, 필요한 경우 영양사, 운동 코치, 의사 등 전문가와의 연결도 지원합니다. 장기적인 건강 데이터 트렌드를 시각화하여 사용자가 자신의 건강 개선 현황을 쉽게 파악할 수 있습니다.',

features = '1. 종합적 건강 지표 모니터링: 수면의 질, 심박수, 혈압, 활동량, 칼로리 소모량 등 30개 이상의 건강 지표 자동 추적
2. AI 기반 개인화 분석: 사용자의 건강 데이터, 목표, 제약사항을 고려한 맞춤형 건강 인사이트 제공
3. 영양 관리 시스템: 식단 기록(사진 촬영만으로 자동 인식), 영양소 분석, 개인 맞춤 식단 추천
4. 운동 코칭: 사용자의 체력 수준과 선호도에 맞는 맞춤형 운동 계획 제공 및 실시간 피드백
5. 전문가 연결 네트워크: 필요 시 영양사, PT, 의사 등 검증된 건강 전문가와 원격 상담 연결
6. 건강 예측 모델: 현재 생활 패턴 지속 시 예상되는 건강 상태를 시뮬레이션하여 제시
7. 사회적 동기부여 시스템: 비슷한 건강 목표를 가진 사용자들과 연결하여 함께 도전하는 커뮤니티 형성
8. 의료 기록 통합: 사용자 동의 하에 병원 의료 기록과 앱 데이터를 통합해 종합적인 건강 기록 유지
9. 스트레스 관리: 호흡 패턴, 심박 변이도 분석을 통한 스트레스 수준 측정 및 맞춤형 마음챙김 활동 추천'
WHERE title = '개인화된 헬스 트래킹 앱';

-- 아이디어 4 업데이트: 스마트 홈 에너지 최적화 시스템
UPDATE ideas
SET 
summary = '인공지능을 활용하여 가정의 에너지 사용을 최적화하고 비용을 절감하는 시스템입니다. 전 세계적으로 에너지 비용이 증가하고 환경 문제가 심각해지는 가운데, 가정에서의 에너지 효율성은 중요한 문제가 되었습니다. 이 시스템은 스마트 홈 기기와 통합되어 가정 내 모든 전자기기의 에너지 사용 패턴을 분석합니다. 인공지능이 거주자의 생활 패턴, 날씨 변화, 전력 요금 변동 등을 학습하여 최적의 에너지 사용 계획을 수립합니다. 예를 들어, 전력 요금이 저렴한 시간대에 세탁기를 자동으로 작동시키거나, 집에 아무도 없을 때 불필요한 기기의 전원을 차단합니다. 또한 태양광 발전이나 에너지 저장 시스템과 연동하여 재생에너지 활용을 극대화합니다. 사용자는 모바일 앱을 통해 실시간으로 에너지 사용 현황을 확인하고 절감 효과를 시각적으로 확인할 수 있습니다.',

features = '1. 실시간 에너지 모니터링: 가정 내 모든 전자기기의 에너지 소비량을 개별적으로 측정하고 분석
2. AI 기반 사용 패턴 학습: 거주자의 생활 패턴을 학습하여 불필요한 에너지 낭비 자동 감지 및 조정
3. 스마트 기기 자동 제어: 에너지 효율을 최적화하기 위해 조명, 냉난방, 가전제품 등을 자동으로 제어
4. 변동 요금제 최적화: 시간대별 전력 요금 변동에 맞춰 에너지 집약적 작업 일정을 자동 조정
5. 재생 에너지 통합: 태양광 패널, 가정용 배터리 저장 시스템과 연동하여 청정 에너지 활용 최대화
6. 예측 분석 기반 조언: 에너지 사용 패턴 분석을 통해 잠재적 절약 기회 발견 및 맞춤형 조언 제공
7. 사용자 친화적 대시보드: 모바일 앱과 웹을 통해 에너지 사용량, 절감액, 환경 기여도를 시각적으로 표시
8. 스마트 그리드 연동: 지역 전력망과 연계하여 피크 시간대 수요 반응 프로그램 참여로 추가 수익 창출
9. 이상 감지 알림: 비정상적인 에너지 사용 패턴(가스 누출, 전기 누전 등)을 감지하여 안전 문제 사전 예방
10. 다중 주택 관리: 여러 주택이나 건물을 소유한 사용자를 위한 통합 관리 인터페이스 제공'
WHERE title = '스마트 홈 에너지 최적화 시스템';

-- 아이디어 5 업데이트: AI 기반 퍼스널 스타일리스트
UPDATE ideas
SET 
summary = '사용자의 취향과 체형에 맞는 의류를 추천하고 스타일링 조언을 제공하는 AI 서비스입니다. 매일 아침 "오늘 뭐 입지?"라는 고민은 많은 사람들에게 시간과 에너지를 소모하게 합니다. 이 서비스는 사용자의 옷장을 디지털화하고, 개인의 체형, 피부톤, 선호 스타일, 라이프스타일을 분석하여 최적의 코디네이션을 제안합니다. 컴퓨터 비전 기술을 활용해 사용자가 촬영한 옷 사진을 자동으로 분류하고 태그를 지정합니다. 특별한 날의 모임, 비즈니스 미팅, 캐주얼한 주말 등 상황별 맞춤 코디를 제안하며, 사용자의 피드백을 통해 추천의 정확도가 지속적으로 향상됩니다. 또한 현재 트렌드를 반영한 새로운 아이템 추천과 사용자의 기존 옷장과 잘 어울리는 제품을 온라인 쇼핑몰에서 찾아 제안합니다. 이를 통해 불필요한 쇼핑을 줄이고 지속 가능한 패션 소비를 촉진합니다.',

features = '1. 가상 옷장 디지털화: 사용자의 모든 의류 아이템을 사진으로 등록하고 AI가 자동 분류 및 태그 지정
2. 체형 및 톤 분석: 사용자의 체형, 피부톤, 얼굴형 등을 분석하여 가장 잘 어울리는 스타일과 색상 추천
3. 상황별 코디 제안: 날씨, 일정, 모임 성격 등을 고려한 맞춤형 일일/주간 코디네이션 제안
4. 트렌드 인사이트: 현재 패션 트렌드를 반영한 사용자 맞춤형 스타일 제안 및 뉴스레터 제공
5. 가상 피팅룸: 증강현실 기술을 활용해 실제로 옷을 입어보지 않고도 가상으로 착용 모습 확인
6. 지속가능한 쇼핑 추천: 사용자의 기존 옷장과 잘 어울리는 아이템만 선별하여 추천, 불필요한 소비 방지
7. 캡슐 워드로브 설계: 최소한의 아이템으로 다양한 코디가 가능한 캡슐 워드로브 구성 가이드
8. 스타일 커뮤니티: 비슷한 체형과 취향을 가진 사용자들의 실제 코디를 참고할 수 있는 커뮤니티 제공
9. 시즌별 정리 조언: 계절이 바뀔 때마다 보관할 옷과 기부/판매할 옷 분류 조언으로 옷장 관리 최적화
10. 개인 스타일 분석 리포트: 사용자의 패션 취향과 습관에 대한 종합적인 분석 및 인사이트 제공'
WHERE title = 'AI 기반 퍼스널 스타일리스트';