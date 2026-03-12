import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { ChevronLeft, ChevronRight, HelpCircle, Settings, Bookmark } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  getNextPage,
  getPreviousPage,
  getPageByPath,
  getManualPages,
} from '@/lib/navigation';
import { getIsMac, modKey } from '@/lib/keyLabels';

export default function KeyboardNav() {
  const [location, setLocation] = useLocation();
  const [showToast, setShowToast] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    setIsMac(getIsMac());
  }, []);

  const currentPage = getPageByPath(location);
  const prevPage = getPreviousPage(location);
  const nextPage = getNextPage(location);

  const navigate = useCallback(
    (path: string, label: string) => {
      setLocation(path);
      setShowToast(label);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setShowToast(null), 1200);
    },
    [setLocation],
  );

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      // Cmd+K / Ctrl+K → 検索
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('focus-search'));
        return;
      }

      // Cmd/Ctrl + Shift + D → ダークモード切替
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // Cmd/Ctrl + ← → ページ送り
      if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowRight') {
        const next = getNextPage(location);
        if (next) {
          e.preventDefault();
          navigate(next.path, `→ ${next.title}`);
        }
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowLeft') {
        const prev = getPreviousPage(location);
        if (prev) {
          e.preventDefault();
          navigate(prev.path, `← ${prev.title}`);
        }
        return;
      }

      // Home → トップへ戻る
      if (e.key === 'Home' || (e.key === 'ArrowUp' && e.metaKey)) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [location, navigate, toggleTheme]);

  const mod = modKey(isMac);

  return (
    <>
      {/* ナビゲーショントースト */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {showToast}
        </div>
      )}

      {/* 画面下部ショートカットバー */}
      <div className="fixed bottom-0 left-0 right-0 z-30 hidden md:flex items-center justify-center gap-1 py-2 px-4 bg-card/80 backdrop-blur-sm border-t border-border md:ml-64">
        {/* 前へ */}
        <button
          onClick={() => prevPage && navigate(prevPage.path, `← ${prevPage.title}`)}
          disabled={!prevPage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title={`前のステップ (${mod}+←)`}
        >
          <ChevronLeft size={14} />
          <span className="hidden lg:inline max-w-[120px] truncate">{prevPage?.title ?? '---'}</span>
        </button>

        {/* 現在位置 */}
        {currentPage && (() => {
          const totalSteps = getManualPages(currentPage.manualId).length;
          return (
            <div className="flex items-center gap-2 px-3 py-1.5 text-xs">
              <span className="text-primary font-bold">
                {currentPage.step}/{totalSteps}
              </span>
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(currentPage.step / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          );
        })()}

        {/* 次へ */}
        <button
          onClick={() => nextPage && navigate(nextPage.path, `→ ${nextPage.title}`)}
          disabled={!nextPage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title={`次のステップ (${mod}+→)`}
        >
          <span className="hidden lg:inline max-w-[120px] truncate">{nextPage?.title ?? '---'}</span>
          <ChevronRight size={14} />
        </button>

        {/* 区切り */}
        <div className="h-4 w-px bg-border mx-1" />

        {/* ショートカット一覧 */}
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60">
          <span className="flex items-center gap-0.5">
            <kbd className="px-1 py-0.5 rounded bg-muted/60 border border-border/50 font-mono">{mod}+←→</kbd>
            <span className="ml-0.5">ページ</span>
          </span>
          <span className="flex items-center gap-0.5">
            <kbd className="px-1 py-0.5 rounded bg-muted/60 border border-border/50 font-mono">{mod}+K</kbd>
            <span className="ml-0.5">検索</span>
          </span>
        </div>

        {/* 区切り */}
        <div className="h-4 w-px bg-border mx-1" />

        {/* ユーティリティボタン */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('open-settings'))}
            className="p-1.5 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
            title={`設定 (${mod}+,)`}
          >
            <Settings size={14} />
          </button>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('open-help'))}
            className="p-1.5 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
            title="ヘルプ (?)"
          >
            <HelpCircle size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
