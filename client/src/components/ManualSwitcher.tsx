import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { manuals, getManualPages, type ManualId } from '@/lib/navigation';
import { useProgress } from '@/hooks/useProgress';
import ManualGlyph from './ManualGlyph';

interface ManualSwitcherProps {
  /** 現在開いているマニュアル。無いとき（TOP や汎用ページ）は本文側が一覧を出すので描画しない */
  activeManualId: ManualId | undefined;
  /** モバイルのドロワーを閉じる */
  onNavigate: () => void;
}

/**
 * サイドバー上部のマニュアル切り替え。
 *
 * 以前は 10 件を 2 列グリッドで常時展開しており、2 つの問題が同時に起きていた。
 * (1) 194px を占有し、セクションツリーの開始位置がサイドバー上端から 391px 下がる
 * (2) 1 列あたり約 77px しか無く「Claude Code」「Infra / DevOps」が省略される
 *
 * マニュアルの切り替えは滞在中ほとんど使わない操作なので、既定は現在地 1 行だけを出し、
 * 開いたときは 1 列にして全マニュアル名を省略なしで見せる。選ぶと畳んで本題へ戻る。
 */
export default function ManualSwitcher({ activeManualId, onNavigate }: ManualSwitcherProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { getProgressStats } = useProgress();

  const percentages = useMemo(() => {
    const out = {} as Record<ManualId, number>;
    for (const m of manuals) {
      out[m.id] = getProgressStats(getManualPages(m.id).map((p) => p.path)).percentage;
    }
    return out;
  }, [getProgressStats]);

  // Esc で閉じ、フォーカスをトリガーへ戻す（開いた場所を見失わせない）
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const current = manuals.find((m) => m.id === activeManualId);
  if (!current) return null;

  return (
    <div className="mb-4 rounded-lg border border-border bg-card">
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="manual-switcher-list"
        aria-label={`マニュアルを切り替え（現在: ${current.shortTitle}）`}
        className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ManualGlyph manual={current} />
        <span className="flex-1 min-w-0 text-left text-sm font-medium text-foreground truncate">
          {current.shortTitle}
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">{percentages[current.id]}%</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        // 現在のマニュアルはトリガー行が担っているので、ここには切り替え先だけを並べる
        <ul id="manual-switcher-list" className="border-t border-border p-1 space-y-0.5">
          {manuals
            .filter((m) => m.id !== current.id)
            .map((m) => (
              <li key={m.id}>
                <Link
                  href={`/${m.id}`}
                  onClick={() => {
                    setOpen(false);
                    onNavigate();
                  }}
                  className="flex items-center gap-2 px-1.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                >
                  <ManualGlyph manual={m} />
                  <span className="flex-1 min-w-0 text-sm truncate">{m.shortTitle}</span>
                  <span className="text-xs tabular-nums">{percentages[m.id]}%</span>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
