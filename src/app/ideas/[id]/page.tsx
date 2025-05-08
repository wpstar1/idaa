import { notFound } from 'next/navigation';
import { getIdeaById, getCommentsByIdeaId } from '@/utils/supabase-utils';
import CommentSection from '@/components/CommentSection';
import BookmarkButton from '@/components/BookmarkButton';
import CopyPromptButton from '@/components/CopyPromptButton';
import BackButton from '@/components/BackButton';

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { id: string } }) {
  const idea = await getIdeaById(params.id);

  if (!idea) {
    return {
      title: '아이디어를 찾을 수 없습니다',
    };
  }

  return {
    title: idea.title,
    description: idea.summary,
  };
}

export default async function IdeaDetailPage({ params }: { params: { id: string } }) {
  const idea = await getIdeaById(params.id);
  const comments = await getCommentsByIdeaId(params.id);

  if (!idea) {
    notFound();
  }

  // 프롬프트 생성 (AI가 바로 만들 수 있는 형식)
  const prompt = `# ${idea.title} 개발 요청

아래 명세대로 프로그램/웹사이트/앱을 개발해주세요:

## 프로젝트 개요
${idea.summary}

## 주요 기능
${idea.features || '- 직관적이고 사용하기 쉬운 인터페이스\n- 사용자 데이터 안전한 저장 및 관리\n- 모바일 및 데스크톱 모두 지원'}

## 타겟 사용자
${idea.target || '일반 사용자'}

## 비즈니스 모델
${idea.revenue || '후원 기반 또는 프리미엄 구독 모델'}

## 기술 스택
프론트엔드: 최신 웹 기술 (React, Vue 등)
백엔드: 안정적인 서버 기술 (Node.js, Python 등)
데이터베이스: 요구사항에 맞는 적절한 데이터베이스

## 추가 요구사항
- 반응형 디자인으로 모든 기기에서 접근 가능
- 확장성을 고려한 모듈식 설계
- 보안 고려사항 반영

위 내용대로 만들어 주세요. 필요한 코드는 전체를 제공해주시고, 시각적으로 매력적인 디자인을 적용해주세요.
`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BackButton />
      
      <div className="bg-[#1e1c31] border border-[#2d2b42] shadow-lg rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-white">{idea.title}</h1>
            <span className="bg-[#2d2b42] text-[#a48eff] text-xs font-medium px-3 py-1 rounded-full">
              {idea.tag || '기타'}
            </span>
          </div>

          <div className="text-sm text-gray-400 mb-6">
            {new Date(idea.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-[#a48eff] mb-2">요약</h2>
              <p className="text-gray-300 whitespace-pre-line">{idea.summary}</p>
            </div>

            {idea.features && (
              <div>
                <h2 className="text-lg font-semibold text-[#a48eff] mb-2">주요 기능</h2>
                <p className="text-gray-300 whitespace-pre-line">{idea.features}</p>
              </div>
            )}

            {idea.target && (
              <div>
                <h2 className="text-lg font-semibold text-[#a48eff] mb-2">대상 고객</h2>
                <p className="text-gray-300">{idea.target}</p>
              </div>
            )}

            {idea.revenue && (
              <div>
                <h2 className="text-lg font-semibold text-[#a48eff] mb-2">수익 모델</h2>
                <p className="text-gray-300 whitespace-pre-line">{idea.revenue}</p>
              </div>
            )}
          </div>

          <div className="mt-8 mb-8 p-5 bg-[#2d2b42] rounded-lg border border-[#3d3b52]">
            <h3 className="text-xl font-bold text-white mb-3">💡 이 아이디어를 바로 구현해보세요!</h3>
            <p className="text-gray-300 mb-4">아래 버튼을 클릭하여 프롬프트를 복사한 후, ChatGPT, Claude, Windsurf AI 등에 붙여넣으면 자동으로 코드를 생성해 줍니다.</p>
            <CopyPromptButton prompt={prompt} />
            <div className="flex justify-end">
              <BookmarkButton ideaId={idea.id} />
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#2d2b42]">
            <CommentSection ideaId={idea.id} initialComments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}