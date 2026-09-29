import React, { useEffect, useState } from 'react';
import { sound } from '../utils/sound';

interface CountdownOverlayProps {
  onComplete: () => void;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    // Play initial sound for 3
    sound.playCountdownBeep(false);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Play final start sound
          sound.playCountdownBeep(true);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 0; // 0 represents "출발!"
        }
        sound.playCountdownBeep(false);
        return prev - 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="text-center select-none">
        <div className="text-sm sm:text-base font-black text-amber-300 mb-2 tracking-widest uppercase animate-pulse">
          보림초 6학년 2반 · 공간과 입체
        </div>

        {count > 0 ? (
          <div
            key={count}
            className="text-8xl sm:text-9xl font-black text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-in zoom-in-50 duration-300"
          >
            <span className="text-amber-400">{count}</span>
          </div>
        ) : (
          <div className="text-7xl sm:text-8xl font-black text-emerald-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-in zoom-in-75 duration-200 flex flex-col items-center">
            <span>출발! 🚀</span>
            <span className="text-2xl sm:text-3xl text-white font-extrabold mt-3">
              1번 문제 시작!
            </span>
          </div>
        )}

        <div className="mt-6 text-slate-200 text-sm sm:text-base font-bold">
          {count > 0 ? '준비하세요! 문제가 곧 시작됩니다...' : '15초 제한 시간 카운트다운 시작!'}
        </div>
      </div>
    </div>
  );
};
