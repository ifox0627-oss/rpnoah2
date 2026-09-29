import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'quiz' | 'sandbox';
  setActiveTab: (tab: 'quiz' | 'sandbox') => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onResetQuiz: () => void;
  onGenerateNewQuiz: () => void;
  onShuffleBankQuiz: () => void;
  onGoToReady: () => void;
  isGenerating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  onToggleSound,
  onResetQuiz,
  onGenerateNewQuiz,
  onShuffleBankQuiz,
  onGoToReady,
  isGenerating = false,
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-amber-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('quiz');
              onGoToReady();
            }}
            title="준비화면으로 이동"
            className="flex items-center gap-2 cursor-pointer text-left group"
          >
            <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">🎲</span>
            <span className="text-base sm:text-xl font-black text-slate-900 tracking-tight whitespace-nowrap">
              보림초 6-2 OX
            </span>
          </button>
        </div>

        {/* Zone 2: Mode Navigation Tabs */}
        <nav className="flex items-center gap-1.5 p-1 bg-amber-100/70 rounded-2xl border border-amber-200">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/50'
            }`}
          >
            ✏️ OX 퀴즈
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sandbox'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/50'
            }`}
          >
            🧊 쌓기나무 실험실
          </button>
        </nav>

        {/* Zone 3: Functional Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Bank Random Shuffle Button */}
          <button
            onClick={onShuffleBankQuiz}
            title="AI 문제은행에서 무작위 10문제 새로 뽑기"
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black border border-amber-300 shadow-2xs cursor-pointer active:scale-95 transition-all"
          >
            <span>🎲</span>
            <span>문제은행 랜덤</span>
          </button>

          {/* Gemini New Quiz Button */}
          <button
            onClick={onGenerateNewQuiz}
            disabled={isGenerating}
            title="Gemini AI로 새로운 10문제 즉석 출제하기"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-xs cursor-pointer active:scale-95 transition-all disabled:opacity-50"
          >
            <span>{isGenerating ? '⏳' : '✨'}</span>
            <span>{isGenerating ? '출제 중...' : 'Gemini 출제'}</span>
          </button>

          {/* GitHub Standalone Download Link */}
          <a
            href="/standalone.html"
            download="index.html"
            title="GitHub Pages용 단일 index.html 다운로드"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black border border-indigo-200 shadow-2xs no-underline"
          >
            <span>📥</span>
            <span>GitHub HTML</span>
          </a>

          <button
            onClick={onToggleSound}
            aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
            title={isMuted ? '소리 켜기' : '소리 끄기'}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 hover:bg-amber-50 text-slate-700 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden lg:inline">음소거</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="hidden lg:inline">소리 켬</span>
              </>
            )}
          </button>

          <button
            onClick={onResetQuiz}
            aria-label="준비화면으로 돌아가기"
            title="준비화면으로 돌아가기"
            className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
