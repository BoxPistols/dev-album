import { useEffect, useState } from 'react';
import { X, Settings, Sun, Moon, Monitor, Columns2, Type } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLayout } from '@/contexts/LayoutContext';

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
        className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md"
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

        <div className="px-6 py-5 space-y-6">
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
        </div>

        {/* フッター */}
        <div className="px-6 py-3 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">⌘/Ctrl+,</kbd> で設定を開く / <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">Esc</kbd> で閉じる
          </p>
        </div>
      </div>
    </div>
  );
}
