import React from 'react';
import { QuizQuestion, AnswerType } from '../types/quiz';
import { QuestionDiagram } from './QuestionDiagram';

interface QuizCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  timeLeft: number;
  maxTime?: number;
  quizSource?: 'gemini' | 'bank';
  onAnswer: (answer: AnswerType) => void;
  disabled?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  timeLeft,
  maxTime = 15,
  quizSource = 'bank',
  onAnswer,
  disabled = false,
}) => {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const timePercent = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));
  const isUrgent = timeLeft <= 5;

  return (
    <div className="w-full max-w-3xl bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 shadow-2xl border-6 border-amber-300 relative transition-all">
      {/* Top Header Row: Badge & Progress & Score */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b-2 border-amber-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xl">🎲</span>
          <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            보림초 6학년 2반
          </span>

          {/* Source Badge */}
          <span
            className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black border ${
              quizSource === 'gemini'
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-indigo-50 text-indigo-800 border-indigo-200'
            }`}
          >
            {quizSource === 'gemini' ? '✨ Gemini AI' : '🎲 문제은행'}
          </span>

          {/* Difficulty Badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1 shadow-2xs ${
              question.difficulty === '하'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : question.difficulty === '중'
                ? 'bg-sky-100 text-sky-800 border-sky-300'
                : 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
            }`}
          >
            {question.difficulty === '하' && '🌱 난이도: 하 (기초)'}
            {question.difficulty === '중' && '🌟 난이도: 중 (실력)'}
            {question.difficulty === '상' && '🔥 난이도: 상 (심화)'}
          </span>
          <span className="hidden sm:inline-block text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
            {question.conceptTitle}
          </span>
        </div>

        {/* Current Score Pill */}
        <div className="flex items-center gap-3">
          <div className="bg-sky-50 border-2 border-sky-300 text-sky-900 px-4 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xs">
            <span className="text-sm font-bold text-sky-700">현재 점수</span>
            <span className="text-xl sm:text-2xl font-black text-sky-600 tabular-nums">
              {score}
            </span>
            <span className="text-xs font-bold text-sky-700">점</span>
          </div>
        </div>
      </div>

      {/* 15-Second Countdown Timer Banner */}
      <div className="mt-4 mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className={`text-xl ${isUrgent ? 'animate-bounce' : ''}`}>⏱️</span>
            <span className="text-xs sm:text-sm font-black text-slate-700">
              남은 제한 시간
            </span>
          </div>
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-xl font-black text-base sm:text-lg tabular-nums transition-colors border ${
              isUrgent
                ? 'bg-rose-100 text-rose-600 border-rose-400 animate-pulse'
                : timeLeft <= 8
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}
          >
            <span>{timeLeft}</span>
            <span className="text-xs font-bold">초</span>
            {isUrgent && <span className="text-xs text-rose-500 font-extrabold ml-1">서둘러요!</span>}
          </div>
        </div>

        {/* Countdown Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              isUrgent
                ? 'bg-rose-500'
                : timeLeft <= 8
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>

      {/* Question Progress Indicator */}
      <div className="my-3">
        <div className="flex justify-between items-center text-sm font-extrabold text-slate-600 mb-1">
          <span className="flex items-center gap-1">
            <span className="text-amber-500">Q.</span>
            <strong className="text-lg text-slate-800 font-black">{currentIndex + 1}</strong>
            <span className="text-slate-400 font-medium">/ {totalQuestions}</span>
          </span>
          <span className="text-xs font-black text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
            100점 도전!
          </span>
        </div>
        <div className="w-full h-2.5 bg-amber-100 rounded-full overflow-hidden p-0.5 border border-amber-200">
          <div
            className="h-full bg-linear-to-r from-amber-400 via-orange-400 to-rose-400 rounded-full transition-all duration-300 ease-out shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Box with Large Clear Text */}
      <div className="my-4 sm:my-6 p-6 sm:p-8 bg-amber-50/60 rounded-3xl border-3 border-dashed border-amber-300 flex flex-col items-center justify-center min-h-48 text-center shadow-xs">
        <span className="text-xs sm:text-sm font-black text-amber-700 mb-2 tracking-wider uppercase">
          맞으면 O, 틀리면 X를 골라보세요!
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-snug wrap-balance break-keep">
          {question.question}
        </h2>
      </div>

      {/* Visual Diagram Aid for the Question */}
      <div className="my-5">
        <QuestionDiagram type={question.diagramType} />
      </div>

      {/* Large Chunky O and X Buttons for Kids */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 pt-2">
        {/* O Button */}
        <button
          onClick={() => onAnswer('O')}
          disabled={disabled}
          className="group relative flex flex-col items-center justify-center h-32 sm:h-38 bg-emerald-500 hover:bg-emerald-600 text-white rounded-3xl sm:rounded-4xl font-black cursor-pointer shadow-[0_10px_0_#057a55] active:translate-y-2 active:shadow-[0_2px_0_#057a55] transition-all disabled:opacity-50 disabled:pointer-events-none select-none border-2 border-emerald-400"
          aria-label="O 선택 (맞다)"
        >
          <span className="text-6xl sm:text-7xl font-black leading-none drop-shadow-sm group-hover:scale-110 transition-transform">
            ⭕
          </span>
          <span className="text-xl sm:text-2xl font-black mt-1">그렇다 (O)</span>
        </button>

        {/* X Button */}
        <button
          onClick={() => onAnswer('X')}
          disabled={disabled}
          className="group relative flex flex-col items-center justify-center h-32 sm:h-38 bg-rose-500 hover:bg-rose-600 text-white rounded-3xl sm:rounded-4xl font-black cursor-pointer shadow-[0_10px_0_#be123c] active:translate-y-2 active:shadow-[0_2px_0_#be123c] transition-all disabled:opacity-50 disabled:pointer-events-none select-none border-2 border-rose-400"
          aria-label="X 선택 (틀리다)"
        >
          <span className="text-6xl sm:text-7xl font-black leading-none drop-shadow-sm group-hover:scale-110 transition-transform">
            ❌
          </span>
          <span className="text-xl sm:text-2xl font-black mt-1">아니다 (X)</span>
        </button>
      </div>
    </div>
  );
};
