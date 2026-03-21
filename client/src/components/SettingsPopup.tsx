import { useEffect, useState, useMemo } from 'react';
import { X, Settings, Sun, Moon, Monitor, Columns2, Type, Trash2, Download, RefreshCcw } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLayout } from '@/contexts/LayoutContext';
import { getIsMac, modKey } from '@/lib/keyLabels';
import { getAllNotes } from '@/hooks/usePageNotes';

type FontSize = 'small' | 'medium' | 'large';

const fontSizes: { value: FontSize; label: string; class: string }[] = [
  { value: 'small', label: '小', class: 'text-[13px]' },
  { value: 'medium', label: '中', class: 'text-[15px]' },
  { value: 'large', label: '大', class: 'text-[17px]' },
];

export default function SettingsPopup() {
  const [open, setOpen] = useState(false);
  const { mode, setMode } = useTheme();
  const { layoutMode, setLayoutMode } = useLayout();
  const mod = useMemo(() => modKey(getIsMac()), []);
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('font-size') as FontSize) || 'medium';
  });

  // フォントサイズ適用
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${fontSize}`);
    localStorage.setItem('font-size', fontSize);
  }, [fontSize]);

  // キーボードショートカット
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    const handleOpen = () => setOpen(true);
    document.addEventListener('keydown', handler);
    document.addEventListener('open-settings', handleOpen);
    return () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('open-settings', handleOpen);
    };
  }, [open]);

  // データエクスポート
  const handleExport = () => {
    const data = {
      bookmarks: JSON.parse(localStorage.getItem('bookmarked-pages') || '[]'),
      completed: JSON.parse(localStorage.getItem('completed-pages') || '[]'),
      notes: getAllNotes(),
      settings: { fontSize, mode, layoutMode },
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dev-album-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // データリセット
  const handleReset = () => {
    if (confirm('学習進捗、ブックマーク、メモをすべて削除しますか？この操作は取り消せません。')) {
      localStorage.removeItem('bookmarked-pages');
      localStorage.removeItem('completed-pages');
      // メモを削除
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('page-note:')) {
          localStorage.removeItem(key);
          i--; // 削除したのでインデックスを調整
        }
      }
      window.location.reload();
    }
  };

  if (!open) return null;

  const themeOptions = [
    { value: 'system' as const, icon: <Monitor size={16} />, label: 'システム' },
    { value: 'light' as const, icon: <Sun size={16} />, label: 'ライト' },
    { value: 'dark' as const, icon: <Moon size={16} />, label: 'ダーク' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">設定</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* テーマ */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sun size={14} />
              テーマ
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMode(opt.value)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                    mode === opt.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  {opt.icon}
                  <span className="text-xs font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* レイアウト */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Columns2 size={14} />
              レイアウト
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(['normal', 'wide'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setLayoutMode(m)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                    layoutMode === m
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <span className="text-xs font-medium">{m === 'normal' ? '通常' : 'ワイド'}</span>
                </button>
              ))}
            </div>
          </section>

          {/* フォントサイズ */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Type size={14} />
              フォントサイズ
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {fontSizes.map((fs) => (
                <button
                  key={fs.value}
                  onClick={() => setFontSize(fs.value)}
                  className={`flex items-center justify-center p-3 rounded-xl border transition-all ${
                    fontSize === fs.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <span className={`font-medium ${fs.class}`}>{fs.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* データ管理 */}
          <section className="pt-2 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <RefreshCcw size={14} />
              データ管理
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all text-xs font-medium"
              >
                <Download size={14} />
                バックアップ
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/5 transition-all text-xs font-medium"
              >
                <Trash2 size={14} />
                進捗をリセット
              </button>
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground leading-relaxed px-1">
              ※ 進捗、ブックマーク、メモはブラウザの LocalStorage に保存されています。別のブラウザやシークレットモードでは共有されません。
            </p>
          </section>
        </div>

        {/* フッター */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono shadow-sm">{mod}+,</kbd> で設定を開く / <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono shadow-sm">Esc</kbd> で閉じる
          </p>
        </div>
      </div>
    </div>
  );
}
