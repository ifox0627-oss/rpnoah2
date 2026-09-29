import React, { useState } from 'react';
import { sound } from '../utils/sound';

export const BlockSandbox: React.FC = () => {
  // 3x3 grid representing cube heights (0 to 3)
  const [grid, setGrid] = useState<number[][]>([
    [2, 1, 0],
    [3, 0, 0],
    [1, 0, 0],
  ]);

  const cycleCell = (r: number, c: number) => {
    sound.playClick();
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = (next[r][c] + 1) % 4; // 0, 1, 2, 3
      return next;
    });
  };

  const resetGrid = () => {
    sound.playClick();
    setGrid([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  };

  const loadPreset = (preset: number[][]) => {
    sound.playClick();
    setGrid(preset);
  };

  // Calculations
  const totalCubes = grid.reduce((acc, row) => acc + row.reduce((a, b) => a + b, 0), 0);

  // 1층, 2층, 3층 counts
  const layer1Count = grid.reduce((acc, row) => acc + row.filter((v) => v >= 1).length, 0);
  const layer2Count = grid.reduce((acc, row) => acc + row.filter((v) => v >= 2).length, 0);
  const layer3Count = grid.reduce((acc, row) => acc + row.filter((v) => v >= 3).length, 0);

  // Front view heights (looking from bottom row up, columns c=0, 1, 2)
  // Max height for each column across all rows
  const frontViewHeights = [0, 1, 2].map((col) => {
    return Math.max(grid[0][col], grid[1][col], grid[2][col]);
  });

  // Right side view heights (looking from right to left, row r=0, 1, 2)
  // Looking from right: top row is r=0 (back), middle is r=1, bottom is r=2 (front)
  // In textbook, Side view (오른쪽 옆) looks at rows: from left to right in the view, it's back to front or front to back
  // Standard Korean textbook side view is from the right: column 1 of side view is row 0 (back), col 2 is row 1, col 3 is row 2
  const sideViewHeights = [0, 1, 2].map((row) => {
    return Math.max(...grid[row]);
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
        <div>
          <span className="text-xs font-black tracking-wider text-amber-600 uppercase">Interactive Lab</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-2">
            <span>🎲</span>
            <span>쌓기나무 3D 실험실</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            칸을 클릭해서 쌓기나무를 1층, 2층, 3층으로 쌓아보세요! 위, 앞, 옆에서 본 모양이 실시간으로 바뀝니다.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={resetGrid}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors cursor-pointer border border-slate-300"
          >
            모두 지우기
          </button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 my-4 pt-1">
        <span className="text-xs font-bold text-slate-500">예시 불러오기:</span>
        <button
          onClick={() =>
            loadPreset([
              [2, 1, 0],
              [3, 0, 0],
              [1, 0, 0],
            ])
          }
          className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-bold transition-colors cursor-pointer"
        >
          기본 모양 (7개)
        </button>
        <button
          onClick={() =>
            loadPreset([
              [1, 2, 3],
              [0, 1, 2],
              [0, 0, 1],
            ])
          }
          className="px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-lg text-xs font-bold transition-colors cursor-pointer"
        >
          계단 모양 (10개)
        </button>
        <button
          onClick={() =>
            loadPreset([
              [3, 1, 0],
              [1, 0, 0],
              [0, 0, 0],
            ])
          }
          className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-bold transition-colors cursor-pointer"
        >
          숨은 자리 예시 (5개)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
        {/* Left: 3x3 Clickable Grid with numbers (위에서 본 모양에 수를 쓴 모양) */}
        <div className="lg:col-span-6 bg-amber-50/70 p-5 rounded-2xl border-2 border-amber-200 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-sm font-extrabold text-amber-950 flex items-center gap-1.5">
              <span>✍️</span>
              <span>위에서 본 모양 (클릭하여 층수 조절)</span>
            </span>
            <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-md">
              0 → 1 → 2 → 3층
            </span>
          </div>

          {/* 3x3 Interactive Matrix */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-white rounded-2xl border-2 border-amber-300 shadow-inner">
            {grid.map((row, rIdx) =>
              row.map((val, cIdx) => (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => cycleCell(rIdx, cIdx)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl font-black text-2xl sm:text-3xl flex flex-col items-center justify-center transition-all cursor-pointer shadow-md select-none ${
                    val === 0
                      ? 'bg-slate-50 border-2 border-dashed border-slate-300 text-slate-300 hover:bg-amber-100/50 hover:border-amber-300'
                      : val === 1
                      ? 'bg-emerald-400 border-b-4 border-emerald-600 text-white hover:bg-emerald-500'
                      : val === 2
                      ? 'bg-sky-500 border-b-4 border-sky-700 text-white hover:bg-sky-600'
                      : 'bg-purple-500 border-b-4 border-purple-700 text-white hover:bg-purple-600'
                  }`}
                >
                  <span>{val === 0 ? '0' : val}</span>
                  <span className="text-[11px] font-bold opacity-90">
                    {val === 0 ? '비어있음' : `${val}층`}
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Direction indicators */}
          <div className="w-full mt-3 flex items-center justify-between text-xs font-extrabold text-slate-500 px-4">
            <span>⬅️ 뒤(북)</span>
            <span className="text-emerald-700">⬇️ 앞(남)에서 봄</span>
            <span>우(동) ➡️</span>
          </div>

          {/* Real-time sum formula */}
          <div className="w-full mt-4 bg-white p-3 rounded-xl border border-amber-300 text-center">
            <div className="text-xs text-slate-500 font-bold">각 자리에 적힌 수 모두 더하기:</div>
            <div className="text-base sm:text-lg font-black text-slate-800 mt-1">
              {grid.flat().filter((n) => n > 0).length > 0 ? (
                <span>
                  {grid
                    .flat()
                    .filter((n) => n > 0)
                    .join(' + ')}{' '}
                  ={' '}
                  <strong className="text-2xl text-emerald-600 font-black">
                    총 {totalCubes}개
                  </strong>
                </span>
              ) : (
                <span className="text-slate-400">쌓기나무를 놓아보세요!</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Projections & Layer Stats */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Top/Front/Side Projections Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200">
            <div className="text-sm font-extrabold text-slate-800 mb-3 flex items-center gap-1.5">
              <span>📐</span>
              <span>방향별 보이는 모양 관찰</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* 위에서 본 모양 */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-xs font-bold text-sky-700 block mb-2">위에서 봄</span>
                <div className="grid grid-cols-3 gap-1 mx-auto w-18 h-18 p-1 bg-sky-50 rounded-lg border border-sky-200">
                  {grid.map((row, r) =>
                    row.map((val, c) => (
                      <div
                        key={`top-${r}-${c}`}
                        className={`rounded-xs ${
                          val > 0 ? 'bg-sky-500 border border-sky-600' : 'bg-transparent'
                        }`}
                      />
                    ))
                  )}
                </div>
                <span className="text-[11px] font-bold text-slate-500 mt-2 block">
                  {layer1Count}칸 보임
                </span>
              </div>

              {/* 앞에서 본 모양 */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-xs font-bold text-emerald-700 block mb-2">앞에서 봄</span>
                <div className="flex items-end justify-center gap-1 mx-auto w-18 h-18 p-1 bg-emerald-50 rounded-lg border border-emerald-200">
                  {frontViewHeights.map((h, i) => (
                    <div
                      key={`front-${i}`}
                      style={{ height: `${(h / 3) * 100}%` }}
                      className={`w-4 rounded-t-xs transition-all ${
                        h > 0
                          ? 'bg-emerald-500 border border-emerald-600'
                          : 'h-0 bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-500 mt-2 block">
                  최고 {Math.max(...frontViewHeights, 0)}층
                </span>
              </div>

              {/* 옆에서 본 모양 */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-xs font-bold text-purple-700 block mb-2">옆에서 봄</span>
                <div className="flex items-end justify-center gap-1 mx-auto w-18 h-18 p-1 bg-purple-50 rounded-lg border border-purple-200">
                  {sideViewHeights.map((h, i) => (
                    <div
                      key={`side-${i}`}
                      style={{ height: `${(h / 3) * 100}%` }}
                      className={`w-4 rounded-t-xs transition-all ${
                        h > 0
                          ? 'bg-purple-500 border border-purple-600'
                          : 'h-0 bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-500 mt-2 block">
                  최고 {Math.max(...sideViewHeights, 0)}층
                </span>
              </div>
            </div>
          </div>

          {/* 층별로 나타낸 모양 (1층, 2층, 3층) */}
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <div className="text-sm font-extrabold text-amber-900 mb-2 flex items-center gap-1.5">
              <span>🥞</span>
              <span>층별로 나누어 세기</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                <span className="text-slate-500 font-bold block">1층</span>
                <strong className="text-lg font-black text-amber-700">{layer1Count}개</strong>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                <span className="text-slate-500 font-bold block">2층</span>
                <strong className="text-lg font-black text-sky-700">{layer2Count}개</strong>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                <span className="text-slate-500 font-bold block">3층</span>
                <strong className="text-lg font-black text-purple-700">{layer3Count}개</strong>
              </div>
            </div>
            <div className="mt-2 text-center text-xs font-bold text-slate-700">
              1층({layer1Count}) + 2층({layer2Count}) + 3층({layer3Count}) = 총 {totalCubes}개
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
