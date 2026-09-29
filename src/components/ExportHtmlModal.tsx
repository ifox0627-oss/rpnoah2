import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { downloadStandaloneHtml, copyStandaloneHtml } from '../utils/exportHtml';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const success = downloadStandaloneHtml();
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }
  };

  const handleCopy = async () => {
    const success = await copyStandaloneHtml();
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl shadow-xs">
            📦
          </div>
          <div>
            <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              GitHub Pages & 오프라인 실행용
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              단일 HTML 파일 (index.html)
            </h2>
          </div>
        </div>

        {/* Authentication Error Explanation Box */}
        <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 my-3 text-left">
          <div className="flex items-center gap-2 text-xs font-black text-amber-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>쿠키/로그인 오류 완벽 해결! (브라우저 메모리 직접 생성)</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
            AI Studio 미리보기 URL에서 링크로 받으면 구글 보안 인증 화면이 다운로드 파일을 가로채는 문제가 있었습니다.
            아래 <strong className="text-indigo-700 font-black">‘index.html 직접 다운로드’</strong>를 누르시면, 서버를 거치지 않고 브라우저 메모리에서 100% 완전한 단일 HTML 파일이 즉시 다운로드됩니다!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 my-4">
          <button
            onClick={handleDownload}
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl cursor-pointer shadow-[0_6px_0_#3730a3] active:translate-y-1 active:shadow-[0_2px_0_#3730a3] transition-all flex items-center justify-center gap-2.5"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5 text-emerald-300" />
                <span>'index.html' 다운로드 완료! 🎉</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>index.html 직접 다운로드 (인증 오류 없음)</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-base rounded-2xl border border-slate-300 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            {copySuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">전체 코드 클립보드 복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>HTML 전체 코드 복사하기 (클립보드)</span>
              </>
            )}
          </button>
        </div>

        {/* Step-by-Step GitHub Pages Instructions */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left my-4">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>🚀</span>
            <span>GitHub Pages 3단계 업로드 방법</span>
          </h4>
          <ol className="text-xs sm:text-sm font-semibold text-slate-600 space-y-1.5 list-decimal list-inside">
            <li>
              내 GitHub 저장소(Repository) 최상단에 다운로드받은 <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono text-xs">index.html</code>을 업로드(Commit)합니다.
            </li>
            <li>
              저장소 상단 메뉴에서 <strong>Settings</strong> ➡️ <strong>Pages</strong>로 이동합니다.
            </li>
            <li>
              <strong>Branch</strong>를 <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono text-xs">main</code>, 폴더를 <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono text-xs">/ (root)</code>로 두고 <strong>Save</strong>를 누르면 1분 뒤 무료 링크가 열립니다!
            </li>
          </ol>
        </div>

        {/* Local double-click guide */}
        <div className="text-xs font-bold text-slate-500 text-center">
          💡 내 컴퓨터에서 인터넷 없이 바로 열고 싶다면 다운로드된 <code className="text-slate-700 font-mono">index.html</code>을 더블 클릭하기만 하면 브라우저에서 바로 실행됩니다.
        </div>
      </div>
    </div>
  );
};
