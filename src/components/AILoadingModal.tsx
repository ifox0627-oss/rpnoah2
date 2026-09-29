import React from 'react';

interface AILoadingModalProps {
  isOpen: boolean;
}

export const AILoadingModal: React.FC<AILoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-4xl p-6 sm:p-8 shadow-2xl border-6 border-amber-300 text-center relative animate-in zoom-in-95 duration-200">
        <div className="text-6xl mb-3 animate-bounce">🤖🎲</div>

        <h3 className="text-2xl font-black text-slate-900 mb-1">
          Gemini AI 문제 출제 중!
        </h3>

        <p className="text-sm font-extrabold text-amber-700 mb-4">
          보림초 6학년 2반을 위한 맞춤형 10문제를 만들고 있어요.
        </p>

        {/* Difficulty Progression Graphic */}
        <div className="p-3 bg-amber-50 rounded-2xl border-2 border-amber-200 mb-4 text-xs font-bold text-slate-700 flex flex-col gap-1.5">
          <div className="text-amber-900 font-black">📈 난이도 설계 순서</div>
          <div className="flex items-center justify-center gap-1.5 font-extrabold">
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg border border-emerald-300">
              🌱 하 3문제
            </span>
            <span>➡️</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-lg border border-sky-300">
              🌟 중 3문제
            </span>
            <span>➡️</span>
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-lg border border-rose-300">
              🔥 상 4문제
            </span>
          </div>
        </div>

        {/* Shimmer loading bar */}
        <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden relative">
          <div className="h-full bg-linear-to-r from-amber-400 via-orange-400 to-rose-400 rounded-full w-2/3 animate-[pulse_1s_ease-in-out_infinite]" />
        </div>

        <div className="text-xs font-bold text-slate-500 mt-3">
          잠시만 기다려주세요... (약 1~2초)
        </div>
      </div>
    </div>
  );
};
