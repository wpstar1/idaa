'use client';

import { useState } from 'react';

export default function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setShowTooltip(true);
      setTimeout(() => {
        setCopied(false);
        setTimeout(() => setShowTooltip(false), 500);
      }, 2000);
    } catch (err) {
      console.error('복사 실패:', err);
      alert('클립보드에 복사하지 못했습니다. 직접 텍스트를 선택하여 복사해 주세요.');
    }
  };

  return (
    <div className="w-full relative mb-4">
      <button
        onClick={copyToClipboard}
        className={`flex items-center justify-center w-full py-4 px-6 rounded-lg font-medium text-lg transition-all ${
          copied 
            ? 'bg-green-600 text-white' 
            : 'bg-[#a48eff] text-white hover:bg-[#8a6dff] shadow-lg hover:shadow-xl'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span className="flex-1">{copied ? '복사 완료! AI에 붙여넣기 하세요!' : 'AI에게 전달할 프롬프트 복사하기'}</span>
      </button>
      
      {showTooltip && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10">
          이제 GPT나 Windsurf AI에 붙여넣기 하면 자동으로 만들어집니다!
        </div>
      )}
    </div>
  );
}