import React, { useState } from 'react';
import { QuizQuestion, QuizAnswerRecord } from '../types/quiz';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  answers: QuizAnswerRecord[];
  questions: QuizQuestion[];
  onRestart: () => void;
  onRetryIncorrect: () => void;
  onOpenSandbox: () => void;
  onGenerateNewQuiz: () => void;
  onShuffleBankQuiz: () => void;
  isGenerating?: boolean;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  answers,
  questions,
  onRestart,
  onRetryIncorrect,
  onOpenSandbox,
  onGenerateNewQuiz,
  onShuffleBankQuiz,
  isGenerating = false,
}) => {
  const [showReview, setShowReview] = useState<boolean>(true);
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;

  // Personalized praise messages
  let praiseEmoji = '👑';
  let praiseTitle = '공간과 입체의 마스터!';
  let praiseMsg =
    '와우! 1000점 만점! 너는 진정한 공간과 입체의 마스터야! 위, 앞, 옆 어떤 방향에서 보아도 쌓기나무를 꿰뚫어 보는 최고의 공간 지각력을 가졌어! ✨';
  let badgeColor = 'bg-amber-100 text-amber-900 border-amber-400';

  if (score === 1000) {
    praiseEmoji = '👑';
    praiseTitle = '만점 달성! 공간의 제왕!';
    praiseMsg =
      '와우! 1000점 퍼펙트 만점! 너는 진정한 공간과 입체의 마스터야! 쌓기나무를 직접 머릿속으로 돌려보고 조립하는 놀라운 공간 지각력을 가졌어! ✨';
    badgeColor = 'bg-amber-100 text-amber-900 border-amber-400';
  } else if (score >= 800) {
    praiseEmoji = '🌟';
    praiseTitle = '대단해요! 훌륭한 수학 박사님!';
    praiseMsg =
      '정말 훌륭해요! 6학년 수학의 어려운 공간과 입체 단원을 멋지게 정복했네요! 공간 감각이 아주 뛰어난 멋진 수학 박사님이에요! 👏';
    badgeColor = 'bg-sky-100 text-sky-900 border-sky-400';
  } else if (score >= 600) {
    praiseEmoji = '👍';
    praiseTitle = '참 잘했어요! 멋진 실력!';
    praiseMsg =
      '참 잘했어요! 쌓기나무의 핵심 원리를 잘 알고 있네요. 헷갈렸던 문제만 다시 짚어보면 다음엔 1000점 만점도 식은 죽 먹기예요! 화이팅! 💪';
    badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-400';
  } else {
    praiseEmoji = '🌱';
    praiseTitle = '끝까지 해낸 멋진 열정!';
    praiseMsg =
      '끝까지 포기하지 않고 10문제를 완주한 열정이 정말 멋져요! 3D 쌓기나무 실험실에서 직접 블록을 만져보며 다시 한 번 도전해볼까요? 😊';
    badgeColor = 'bg-purple-100 text-purple-900 border-purple-400';
  }

  return (
    <div className="w-full max-w-3xl bg-white rounded-4xl p-6 sm:p-10 shadow-2xl border-6 border-amber-300 text-center animate-in fade-in zoom-in-95 duration-300">
      {/* Trophy Emoji Icon */}
      <div className="text-7xl sm:text-8xl mb-2 animate-bounce">{praiseEmoji}</div>

      {/* Grade Badge */}
      <div
        className={`inline-block px-5 py-1.5 rounded-full border-2 text-sm sm:text-base font-black mb-3 ${badgeColor}`}
      >
        {praiseTitle}
      </div>

      {/* Total Score Display */}
      <div className="my-2">
        <span className="text-sm sm:text-base font-extrabold text-slate-500 block">
          최종 획득 점수
        </span>
        <div className="text-5xl sm:text-7xl font-black text-rose-500 my-1 tracking-tight tabular-nums">
          {score} <span className="text-3xl sm:text-4xl text-slate-700">/ 1000점</span>
        </div>
        <p className="text-sm font-bold text-slate-600">
          총 10문제 중 <strong className="text-emerald-600 font-black">{correctCount}문제</strong>{' '}
          정답!
        </p>
      </div>

      {/* Cheerful Praise Message Box */}
      <div className="my-6 p-6 bg-linear-to-b from-amber-50 to-orange-50/50 rounded-3xl border-3 border-amber-200 shadow-xs">
        <h4 className="text-xl sm:text-2xl font-black text-amber-950 mb-2">
          💌 선생님의 칭찬 편지
        </h4>
        <p className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed break-keep">
          {praiseMsg}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <button
          onClick={onGenerateNewQuiz}
          disabled={isGenerating}
          className="col-span-1 sm:col-span-2 py-4 px-6 bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-xl sm:text-2xl rounded-2xl cursor-pointer shadow-[0_8px_0_#c2410c] active:translate-y-1.5 active:shadow-[0_2px_0_#c2410c] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isGenerating ? '⏳' : '✨'}</span>
          <span>
            {isGenerating
              ? 'Gemini가 새로운 문제 만드는 중...'
              : 'Gemini가 내는 새로운 10문제 도전하기!'}
          </span>
        </button>

        <button
          onClick={onShuffleBankQuiz}
          className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white font-black text-lg sm:text-xl rounded-2xl cursor-pointer shadow-[0_8px_0_#b45309] active:translate-y-1.5 active:shadow-[0_2px_0_#b45309] transition-all flex items-center justify-center gap-2"
        >
          <span>🎲</span>
          <span>문제은행 무작위 새 판 시작!</span>
        </button>

        <button
          onClick={onRestart}
          className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg sm:text-xl rounded-2xl cursor-pointer shadow-[0_8px_0_#057a55] active:translate-y-1.5 active:shadow-[0_2px_0_#057a55] transition-all flex items-center justify-center gap-2"
        >
          <span>🔄</span>
          <span>현재 문제 다시 풀기</span>
        </button>

        {incorrectCount > 0 && (
          <button
            onClick={onRetryIncorrect}
            className="w-full col-span-1 sm:col-span-2 py-3.5 px-6 bg-rose-500 hover:bg-rose-600 text-white font-black text-lg rounded-2xl cursor-pointer shadow-[0_8px_0_#be123c] active:translate-y-1.5 active:shadow-[0_2px_0_#be123c] transition-all flex items-center justify-center gap-2"
          >
            <span>💡</span>
            <span>틀린 {incorrectCount}문제만 집중 복습하기</span>
          </button>
        )}
      </div>

      {/* Review Toggle Button */}
      <div className="mt-8 pt-6 border-t-2 border-amber-200">
        <button
          onClick={() => setShowReview(!showReview)}
          className="text-base sm:text-lg font-black text-slate-700 hover:text-amber-700 underline underline-offset-4 cursor-pointer inline-flex items-center gap-2"
        >
          <span>📝</span>
          <span>{showReview ? '문제 풀이 접기 ▲' : '내가 푼 10문제 풀이 전체 보기 ▼'}</span>
        </button>

        {showReview && (
          <div className="mt-6 space-y-4 text-left">
            {questions.map((q, idx) => {
              const record = answers.find((a) => a.questionId === q.id);
              const isCorrect = record?.isCorrect ?? false;
              const userAns = record?.userAnswer ?? '-';

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-rose-50/60 border-rose-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-slate-800 text-white font-black text-xs flex items-center justify-center">
                        Q{idx + 1}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-black border ${
                          q.difficulty === '하'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : q.difficulty === '중'
                            ? 'bg-sky-100 text-sky-800 border-sky-300'
                            : 'bg-rose-100 text-rose-800 border-rose-300'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                      <span className="text-xs font-black text-slate-500">{q.conceptTitle}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black ${
                        isCorrect
                          ? 'bg-emerald-200 text-emerald-900'
                          : record?.isTimeout
                          ? 'bg-orange-200 text-orange-900'
                          : 'bg-rose-200 text-rose-900'
                      }`}
                    >
                      {isCorrect
                        ? '✅ 100점 획득'
                        : record?.isTimeout
                        ? '⏰ 시간 초과 (0점)'
                        : '❌ 오답 (0점)'}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-3">
                    {q.question}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-extrabold mb-2">
                    <span className="text-slate-600">
                      내 선택:{' '}
                      <strong
                        className={
                          isCorrect
                            ? 'text-emerald-700'
                            : record?.isTimeout
                            ? 'text-orange-700'
                            : 'text-rose-700'
                        }
                      >
                        {userAns === 'TIMEOUT' ? '⏰ 시간 초과 (미선택)' : userAns}
                      </strong>
                    </span>
                    <span>·</span>
                    <span className="text-emerald-800">
                      실제 정답: <strong>{q.answer}</strong>
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-700 bg-white/80 p-3 rounded-xl border border-slate-200 leading-relaxed font-semibold">
                    💡 {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
