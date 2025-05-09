export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#151422] text-white px-4 py-8">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#a48eff]">바이브코딩 돈버는 아이디어 모음 소개</h1>
        
        <div className="bg-[#1e1c31] border border-[#2d2b42] rounded-xl p-8 shadow-lg">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#a48eff]">💡 서비스 소개</h2>
            <p className="text-gray-300 leading-relaxed">
              바이브코딩의 &quot;돈버는 아이디어 모음&quot;은 다양한 수익 창출 아이디어를 발견하고, 공유하고, 발전시키는 공간입니다.
              매일 업데이트되는 신선한 아이디어와 함께 여러분의 부수입 또는 주 수입원을 찾아보세요.
              창의적인 사업 아이디어부터 부업, 투자 전략까지 다양한 방법으로 경제적 자유를 향한 여정을 함께합니다.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#a48eff]">✨ 주요 기능</h2>
            <ul className="text-gray-300 space-y-3 list-disc pl-5">
              <li>
                <span className="text-white font-medium">다양한 아이디어 탐색</span> - 매일 업데이트되는 새로운 수익 창출 아이디어를 확인하세요.
              </li>
              <li>
                <span className="text-white font-medium">북마크</span> - 마음에 드는 아이디어를 저장하고 나중에 쉽게 찾아볼 수 있습니다.
              </li>
              <li>
                <span className="text-white font-medium">댓글 기능</span> - 아이디어에 대한 생각을 공유하고 다른 사용자와 소통하세요.
              </li>
              <li>
                <span className="text-white font-medium">맞춤형 카테고리</span> - 관심 분야에 따라 아이디어를 탐색할 수 있습니다.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#a48eff]">🚀 이용 방법</h2>
            <ol className="text-gray-300 space-y-3 list-decimal pl-5">
              <li>회원가입은 안하셔도 되요 ~ 북마크랑 덧글만 안될뿐</li>
              <li>메인 페이지에서 다양한 아이디어를 탐색해보세요.</li>
              <li>마음에 드는 아이디어는 북마크 버튼으로 저장하세요.</li>
              <li>댓글을 통해 생각을 공유하고 아이디어를 발전시키세요.</li>
              <li>정기적으로 방문하여 새로운 아이디어를 확인하세요.</li>
            </ol>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#a48eff]">💬 함께 성장하는 커뮤니티</h2>
            <p className="text-gray-300 leading-relaxed">
              바이브코딩 돈버는 아이디어 모음은 단순한 정보 제공을 넘어, 같은 목표를 가진 사람들이 
              서로의 경험과 지식을 나누는 커뮤니티입니다. 여러분의 참여로 더 풍부하고 
              실용적인 아이디어가 공유될 수 있습니다. 여러분만의 독특한 수익 창출 방법이 있다면 
              언제든지 공유해 주세요!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}