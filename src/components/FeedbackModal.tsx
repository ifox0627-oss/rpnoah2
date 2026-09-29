import React from 'react';
import { QuizQuestion, AnswerType } from '../types/quiz';

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  userAnswer: AnswerType;
  question: QuizQuestion;
  isLastQuestion: boolean;
  isTimeout?: boolean;
  onNext: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  isCorrect,
  userAnswer,
  question,
  isLastQuestion,
  isTimeout = false,
  onNext,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-4xl p-6 sm:p-8 shadow-2xl border-6 border-amber-300 text-center relative animate-in zoom-in-95 duration-200">
        {/* Animated Celebration or Warning Icon */}
        <div className="text-6xl sm:text-7xl mb-2 animate-bounce">
          {isTimeout ? '⏰' : isCorrect ? '🎉' : '💡'}
        </div>

        {/* Title */}
        <h3
          className={`text-2xl sm:text-3xl font-black mb-1 ${
            isTimeout
              ? 'text-orange-600'
              : isCorrect
              ? 'text-emerald-600'
              : 'text-rose-600'
          }`}
        >
          {isTimeout
            ? '시간 초과! (15초 종료) ⏰'
            : isCorrect
            ? '딩동댕! 정답입니다! (+100점)'
            : '아쉽지만 오답이에요!'}
        </h3>

        {/* Subtitle / Note */}
        {isTimeout && (
          <p className="text-sm font-extrabold text-orange-800 mb-1">
            제한 시간 15초가 지나 이번 문제는 0점 처리되었어요! 다음 문제에 더 빠르게 도전해봐요!
          </p>
        )}

        {/* Answer verification pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-extrabold my-2">
          <span>
            내가 고른 답:{' '}
            <strong>
              {isTimeout ? '⏰ 시간 초과 (미선택)' : userAnswer}
            </strong>
          </span>
          <span>·</span>
          <span>
            실제 정답:{' '}
            <strong className="text-emerald-700 underline text-base font-black">
              {question.answer}
            </strong>
          </span>
        </div>

        {/* Explanation Box */}
        <div className="my-4 p-5 bg-amber-50 rounded-2xl border-2 border-amber-200 text-left">
          <div className="flex items-center gap-2 text-xs font-black text-amber-800 mb-1.5">
            <span>📖</span>
            <span>선생님의 친절한 설명</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed break-keep">
            {question.explanation}
          </p>

          {/* Key Takeaway tip */}
          <div className="mt-3 pt-3 border-t border-amber-200 flex items-start gap-2 text-xs sm:text-sm font-extrabold text-amber-950">
            <span className="shrink-0 text-amber-600">⭐ 핵심 요약:</span>
            <span>{question.keyTakeaway}</span>
          </div>
        </div>

        {/* Next Question CTA Button */}
        <button
          onClick={onNext}
          autoFocus
          className="w-full py-4 px-8 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl sm:text-2xl rounded-2xl sm:rounded-3xl cursor-pointer shadow-[0_8px_0_#3730a3] active:translate-y-1.5 active:shadow-[0_2px_0_#3730a3] transition-all"
        >
          {isLastQuestion ? '최종 결과 확인하기 🏆' : '다음 문제로 가기 ▶'}
        </button>
      </div>
    </div>
  );
};
