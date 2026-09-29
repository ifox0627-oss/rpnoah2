import React from 'react';

interface ReadyScreenProps {
  quizSource: 'gemini' | 'bank';
  onStartQuiz: () => void;
  onGenerateGeminiQuiz: () => void;
  onShuffleBankQuiz: () => void;
  onOpenSandbox: () => void;
  isGenerating?: boolean;
}

export const ReadyScreen: React.FC<ReadyScreenProps> = ({
  quizSource,
  onStartQuiz,
  onGenerateGeminiQuiz,
  onShuffleBankQuiz,
  onOpenSandbox,
  isGenerating = false,
}) => {
  return (
    <div className="w-full max-w-3xl bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 shadow-2xl border-6 border-amber-300 text-center relative transition-all animate-in fade-in duration-300">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs sm:text-sm font-black shadow-2xs">
          🏫 보림초등학교 6학년 2반
        </span>
        <span className="px-3.5 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-300 text-xs sm:text-sm font-black shadow-2xs">
          📐 수학 2단원: 공간과 입체
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-black border ${
            quizSource === 'gemini'
              ? 'bg-purple-100 text-purple-900 border-purple-300'
              : 'bg-emerald-100 text-emerald-900 border-emerald-300'
          }`}
        >
          {quizSource === 'gemini' ? '✨ Gemini AI 출제 모드' : '🎲 AI 문제은행 무작위 모드'}
        </span>
      </div>

      {/* Main Title */}
      <div className="text-6xl sm:text-7xl mb-2">🎲🧊</div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-2 wrap-balance">
        공간과 입체 OX 퀴즈 대모험!
      </h1>
      <p className="text-base sm:text-lg font-bold text-slate-600 mb-6">
        쌓기나무 개념을 10문제로 신나게 풀고 <strong>1000점 만점</strong>에 도전해보세요!
      </p>

      {/* 4 Rules & Instructions Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 my-6 text-left">
        {/* Rule 1 */}
        <div className="p-3.5 sm:p-4 bg-amber-50/80 rounded-2xl border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl sm:text-2xl">🎯</span>
            <span className="text-sm sm:text-base font-black text-amber-950">10문제 1000점</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-600 leading-snug">
            문제당 100점씩 올라가요! 1000점 만점 왕관에 도전해봐요.
          </p>
        </div>

        {/* Rule 2 */}
        <div className="p-3.5 sm:p-4 bg-rose-50/80 rounded-2xl border-2 border-rose-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl sm:text-2xl">⏱️</span>
            <span className="text-sm sm:text-base font-black text-rose-950">문제당 15초 제한</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-600 leading-snug">
            시작 후 15초 안에 O나 X를 골라야 해요! 5초 전 경고음 작동!
          </p>
        </div>

        {/* Rule 3 */}
        <div className="p-3.5 sm:p-4 bg-indigo-50/80 rounded-2xl border-2 border-indigo-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl sm:text-2xl">📈</span>
            <span className="text-sm sm:text-base font-black text-indigo-950">점점 어려워져요</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-600 leading-snug">
            🌱 하(3) ➡️ 🌟 중(3) ➡️ 🔥 상(4) 순서로 출제됩니다.
          </p>
        </div>

        {/* Rule 4 */}
        <div className="p-3.5 sm:p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl sm:text-2xl">💡</span>
            <span className="text-sm sm:text-base font-black text-emerald-950">친절한 설명</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-600 leading-snug">
            틀려도 괜찮아요! 그림과 함께 선생님 해설로 바로 이해해요.
          </p>
        </div>
      </div>

      {/* Main Start Button with 3D Tactile feel */}
      <div className="my-6">
        <button
          onClick={onStartQuiz}
          disabled={isGenerating}
          className="w-full py-5 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-2xl sm:text-3xl rounded-3xl cursor-pointer shadow-[0_10px_0_#057a55] active:translate-y-2 active:shadow-[0_2px_0_#057a55] transition-all flex items-center justify-center gap-3 disabled:opacity-50 select-none border-2 border-emerald-400 group"
        >
          <span className="group-hover:scale-125 transition-transform">🚀</span>
          <span>퀴즈 시작하기! (카운트다운 3, 2, 1)</span>
        </button>
        <p className="text-xs sm:text-sm font-bold text-slate-500 mt-2.5">
          버튼을 누르면 3초 카운트다운 후 1번 문제와 15초 제한 시간이 시작됩니다.
        </p>
      </div>

      {/* Secondary Options Grid */}
      <div className="pt-4 border-t-2 border-amber-100 flex flex-wrap items-center justify-center gap-2.5">
        <button
          onClick={onGenerateGeminiQuiz}
          disabled={isGenerating}
          className="px-4 py-2.5 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <span>{isGenerating ? '⏳' : '✨'}</span>
          <span>{isGenerating ? 'Gemini 생성 중...' : 'Gemini AI 새로운 10문제 출제'}</span>
        </button>

        <button
          onClick={onShuffleBankQuiz}
          disabled={isGenerating}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs sm:text-sm border border-slate-300 shadow-2xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>🎲</span>
          <span>문제은행 무작위 새로고침</span>
        </button>

        <button
          onClick={onOpenSandbox}
          disabled={isGenerating}
          className="px-4 py-2.5 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-black text-xs sm:text-sm border border-sky-300 shadow-2xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>🧊</span>
          <span>쌓기나무 3D 실험실 미리보기</span>
        </button>
      </div>
    </div>
  );
};
