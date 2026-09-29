import React from 'react';
import { QuizQuestion } from '../types/quiz';

interface QuestionDiagramProps {
  type: QuizQuestion['diagramType'];
}

export const QuestionDiagram: React.FC<QuestionDiagramProps> = ({ type }) => {
  switch (type) {
    case 'views_comparison':
      return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2 px-3 bg-amber-50/70 rounded-2xl border border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">👀</span>
            <span className="text-sm font-bold text-amber-900">시선 방향:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
            <span className="bg-sky-100 text-sky-800 px-3 py-1.5 rounded-xl border border-sky-300 shadow-xs">
              ⬆️ 위에서 본 모양
            </span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-300 shadow-xs">
              ➡️ 앞에서 본 모양
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-xl border border-purple-300 shadow-xs">
              ↗️ 옆에서 본 모양
            </span>
          </div>
        </div>
      );

    case 'top_view_only':
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-3 px-4 bg-orange-50/80 rounded-2xl border border-orange-200">
          <div className="text-xs font-bold text-orange-900 mb-1">
            위에서 본 모양만으로는 몇 층인지 알 수 없어요!
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-[11px] font-bold text-slate-500 mb-1">위에서 본 모양</div>
              <div className="grid grid-cols-2 gap-1 p-1 bg-white rounded-lg border-2 border-orange-300 shadow-xs">
                <div className="w-8 h-8 bg-orange-200 border border-orange-400 rounded flex items-center justify-center font-bold text-orange-800">?</div>
                <div className="w-8 h-8 bg-orange-200 border border-orange-400 rounded flex items-center justify-center font-bold text-orange-800">?</div>
                <div className="w-8 h-8 bg-orange-200 border border-orange-400 rounded flex items-center justify-center font-bold text-orange-800">?</div>
                <div className="w-8 h-8 bg-slate-100 border border-dashed border-slate-300 rounded"></div>
              </div>
            </div>
            <div className="text-xl font-bold text-orange-400">➡️</div>
            <div className="text-xs text-orange-950 font-semibold bg-white p-2 rounded-xl border border-orange-200 leading-relaxed text-left">
              1층만 쌓였을 수도 있고,<br />
              3층까지 쌓였을 수도 있어서<br />
              <strong className="text-red-600 font-black">개수를 확정할 수 없음!</strong>
            </div>
          </div>
        </div>
      );

    case 'numbered_grid':
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-3 px-4 bg-emerald-50/80 rounded-2xl border border-emerald-200">
          <div className="text-xs font-bold text-emerald-900 mb-1">
            위에서 본 모양의 각 칸에 층수를 쓰면 정확해요!
          </div>
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2 gap-1 p-1 bg-white rounded-lg border-2 border-emerald-400 shadow-xs">
              <div className="w-9 h-9 bg-emerald-200 border border-emerald-500 rounded flex items-center justify-center font-black text-emerald-900 text-lg">2</div>
              <div className="w-9 h-9 bg-emerald-200 border border-emerald-500 rounded flex items-center justify-center font-black text-emerald-900 text-lg">1</div>
              <div className="w-9 h-9 bg-emerald-200 border border-emerald-500 rounded flex items-center justify-center font-black text-emerald-900 text-lg">3</div>
              <div className="w-9 h-9 bg-slate-100 border border-dashed border-slate-300 rounded"></div>
            </div>
            <div className="text-left text-xs text-emerald-950 font-semibold bg-white p-2.5 rounded-xl border border-emerald-200">
              <div className="text-emerald-700 font-bold mb-1">✨ 개수 계산하기:</div>
              <span className="font-mono text-sm font-extrabold text-emerald-800">2 + 1 + 3 = 6개!</span>
              <div className="text-[11px] text-slate-600 mt-0.5">숨은 개수 없이 완벽하게 계산 가능</div>
            </div>
          </div>
        </div>
      );

    case 'front_vs_side':
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-3 px-4 bg-indigo-50/80 rounded-2xl border border-indigo-200">
          <div className="text-xs font-bold text-indigo-900 mb-1">
            앞과 옆에서 본 모양은 서로 다를 수 있어요!
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <span className="text-[11px] font-bold text-indigo-700 block mb-1">앞에서 본 모양</span>
              <div className="flex items-end gap-1 bg-white p-1.5 rounded-lg border border-indigo-200">
                <div className="w-6 h-14 bg-indigo-400 rounded-xs border border-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">2층</div>
                <div className="w-6 h-20 bg-indigo-500 rounded-xs border border-indigo-700 flex items-center justify-center text-white text-[10px] font-bold">3층</div>
              </div>
            </div>
            <div className="text-lg font-black text-indigo-300">≠</div>
            <div className="text-center">
              <span className="text-[11px] font-bold text-purple-700 block mb-1">옆에서 본 모양</span>
              <div className="flex items-end gap-1 bg-white p-1.5 rounded-lg border border-purple-200">
                <div className="w-6 h-20 bg-purple-500 rounded-xs border border-purple-700 flex items-center justify-center text-white text-[10px] font-bold">3층</div>
                <div className="w-6 h-8 bg-purple-400 rounded-xs border border-purple-600 flex items-center justify-center text-white text-[10px] font-bold">1층</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'layers':
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-2 px-3 bg-teal-50/80 rounded-2xl border border-teal-200">
          <div className="text-xs font-bold text-teal-900 mb-1">
            층별로 나타낸 모양 (1층, 2층, 3층을 따로 보기)
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center bg-white p-2 rounded-xl border border-teal-200">
              <div className="text-[10px] font-bold text-teal-700">1층 (4개)</div>
              <div className="grid grid-cols-2 gap-0.5 mt-1">
                <div className="w-5 h-5 bg-teal-400 rounded-xs"></div>
                <div className="w-5 h-5 bg-teal-400 rounded-xs"></div>
                <div className="w-5 h-5 bg-teal-400 rounded-xs"></div>
                <div className="w-5 h-5 bg-teal-400 rounded-xs"></div>
              </div>
            </div>
            <div className="text-sm font-bold text-teal-400">+</div>
            <div className="text-center bg-white p-2 rounded-xl border border-teal-200">
              <div className="text-[10px] font-bold text-teal-700">2층 (2개)</div>
              <div className="grid grid-cols-2 gap-0.5 mt-1">
                <div className="w-5 h-5 bg-teal-500 rounded-xs"></div>
                <div className="w-5 h-5 bg-teal-500 rounded-xs"></div>
                <div className="w-5 h-5 bg-transparent"></div>
                <div className="w-5 h-5 bg-transparent"></div>
              </div>
            </div>
            <div className="text-sm font-bold text-teal-400">+</div>
            <div className="text-center bg-white p-2 rounded-xl border border-teal-200">
              <div className="text-[10px] font-bold text-teal-700">3층 (1개)</div>
              <div className="grid grid-cols-2 gap-0.5 mt-1">
                <div className="w-5 h-5 bg-teal-600 rounded-xs"></div>
                <div className="w-5 h-5 bg-transparent"></div>
                <div className="w-5 h-5 bg-transparent"></div>
                <div className="w-5 h-5 bg-transparent"></div>
              </div>
            </div>
            <div className="text-sm font-black text-teal-800 bg-white px-2.5 py-1.5 rounded-lg border border-teal-300">
              = 총 7개
            </div>
          </div>
        </div>
      );

    case 'bottom_matching':
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-2 px-4 bg-sky-50/80 rounded-2xl border border-sky-200">
          <div className="text-xs font-bold text-sky-900">
            위에서 본 모양 = 1층 바닥에 놓인 자리
          </div>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-sky-200">
              <span className="text-xs font-bold text-slate-700">위에서 내려다보면:</span>
              <div className="flex gap-1">
                <div className="w-6 h-6 bg-sky-400 rounded-xs border border-sky-600"></div>
                <div className="w-6 h-6 bg-sky-400 rounded-xs border border-sky-600"></div>
                <div className="w-6 h-6 bg-sky-400 rounded-xs border border-sky-600"></div>
              </div>
            </div>
            <div className="text-base font-bold text-sky-500">=</div>
            <div className="text-xs font-bold text-sky-800 bg-sky-100 px-3 py-2 rounded-xl border border-sky-300">
              1층 바닥 칸 수 (3칸)
            </div>
          </div>
        </div>
      );

    case 'gravity_support':
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-2.5 px-4 bg-rose-50/80 rounded-2xl border border-rose-200">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center bg-white p-2 rounded-xl border border-red-200">
              <div className="text-[10px] font-black text-red-600 mb-1">❌ 불가능한 경우</div>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 bg-red-400 border border-red-600 rounded-xs text-white text-[10px] flex items-center justify-center font-bold">2층</div>
                <div className="w-7 h-7 border-2 border-dashed border-red-300 rounded-xs flex items-center justify-center text-[10px] text-red-400 font-bold">비어있음</div>
              </div>
              <div className="text-[10px] text-red-500 font-bold mt-1">공중에 뜰 수 없음!</div>
            </div>
            <div className="text-center bg-white p-2 rounded-xl border border-emerald-200">
              <div className="text-[10px] font-black text-emerald-600 mb-1">⭕ 반드시 받쳐주어야 함</div>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 bg-emerald-400 border border-emerald-600 rounded-xs text-white text-[10px] flex items-center justify-center font-bold">2층</div>
                <div className="w-7 h-7 bg-emerald-500 border border-emerald-700 rounded-xs text-white text-[10px] flex items-center justify-center font-bold">1층</div>
              </div>
              <div className="text-[10px] text-emerald-600 font-bold mt-1">1층이 받쳐줌</div>
            </div>
          </div>
        </div>
      );

    case 'max_height_sightline':
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-2.5 px-4 bg-cyan-50/80 rounded-2xl border border-cyan-200">
          <div className="text-xs font-bold text-cyan-900 mb-1">
            앞에서 볼 때는 각 줄의 '가장 높은 층'만 보여요!
          </div>
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-cyan-200">
            <span className="text-sm">👁️ 앞에서 봄</span>
            <div className="text-xs font-semibold text-slate-700">
              앞줄(3층) 뒤에 1층이 숨겨져 있어도 ➡️ <strong className="text-cyan-700 font-black">3칸 높이</strong>로 보임
            </div>
          </div>
        </div>
      );

    case 'hidden_blocks':
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-2.5 px-4 bg-amber-50/80 rounded-2xl border border-amber-200">
          <div className="text-xs font-bold text-amber-900 mb-1">
            높은 쌓기나무 뒤편의 숨은 자리 확인하기
          </div>
          <div className="text-xs font-semibold text-amber-950 bg-white p-2.5 rounded-xl border border-amber-300 leading-relaxed text-center">
            앞과 옆의 높은 층 뒤에 가려져 보이지 않는 자리가 있을 경우,<br />
            위·앞·옆 모양이 같아도 <strong>실제 쌓기나무 수는 2가지 이상</strong> 가능해요!
          </div>
        </div>
      );

    case 'four_block_shapes':
      return (
        <div className="flex flex-col items-center justify-center gap-2 py-2 px-3 bg-violet-50/80 rounded-2xl border border-violet-200">
          <div className="text-xs font-bold text-violet-900">
            쌓기나무 4개로 만들 수 있는 다양한 모양들
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold">
            <span className="bg-white px-2.5 py-1 rounded-lg border border-violet-300 text-violet-800 shadow-xs">
              1. 일자형(ㅡ)
            </span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-violet-300 text-violet-800 shadow-xs">
              2. ㄱ자형(ㄴ)
            </span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-violet-300 text-violet-800 shadow-xs">
              3. ㅗ/ㅜ자형
            </span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-violet-300 text-violet-800 shadow-xs">
              4. 번개형
            </span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-violet-300 text-violet-800 shadow-xs">
              5. 2층 계단형
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
