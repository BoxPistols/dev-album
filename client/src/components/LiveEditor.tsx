import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Maximize2, Minimize2, Eye, Code2 } from 'lucide-react';
import { buildPreviewHtml } from '@/lib/preview';
import { useTheme } from '@/contexts/ThemeContext';

// --- 型定義 ---
interface FileTab {
  name: string;
  language: 'tsx' | 'css' | 'html';
  code: string;
}

interface LiveEditorProps {
  /** タイトル（課題名） */
  title?: string;
  /** 説明文（何を作るか） */
  description?: string;
  /** 編集可能なファイルタブ */
  files: FileTab[];
  /** 見本のスクリーンショット的説明（テキスト） */
  goalDescription?: string;
  /** プレビューの高さ */
  previewHeight?: number;
  /** 手順リスト */
  steps?: string[];
  /** 自動実行するか（デフォルト: true） */
  autoRun?: boolean;
}

// --- メインコンポーネント ---
export default function LiveEditor({
  title,
  description,
  files: initialFiles,
  goalDescription,
  previewHeight = 300,
  steps,
  autoRun = true,
}: LiveEditorProps) {
  const { theme } = useTheme();
  const [files, setFiles] = useState<FileTab[]>(initialFiles);
  const [activeTab, setActiveTab] = useState(0);
  const [previewHtml, setPreviewHtml] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'code' | 'preview'>('split');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // プレビューを生成
  const runPreview = useCallback(() => {
    const jsxFile = files.find((f) => f.language === 'tsx') ?? files[0];
    const cssFile = files.find((f) => f.language === 'css');
    const html = buildPreviewHtml(jsxFile.code, cssFile?.code ?? '', theme === 'dark');
    setPreviewHtml(html);
  }, [files, theme]);

  // 自動実行（デバウンス付き）
  useEffect(() => {
    if (!autoRun) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(runPreview, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [files, autoRun, runPreview]);

  // 初回実行
  useEffect(() => {
    runPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCodeChange = (value: string) => {
    setFiles((prev) =>
      prev.map((f, i) => (i === activeTab ? { ...f, code: value } : f)),
    );
  };

  const handleReset = () => {
    setFiles(initialFiles);
    setTimeout(runPreview, 100);
  };

  const activeFile = files[activeTab];

  // タブの言語別カラー
  const tabColor = (lang: string) => {
    switch (lang) {
      case 'tsx':
        return 'text-blue-400';
      case 'css':
        return 'text-pink-400';
      case 'html':
        return 'text-orange-400';
      default:
        return 'text-slate-400';
    }
  };

  const containerClass = isFullscreen
    ? 'fixed inset-0 z-50 bg-background flex flex-col'
    : 'rounded-xl border-2 border-primary/20 bg-card overflow-hidden my-8';

  return (
    <div className={containerClass}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-[#313244]">
        <div className="flex items-center gap-3">
          {/* トラフィックライト */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
            <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
            <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
          </div>
          {title && (
            <span className="text-sm font-medium text-[#cdd6f4]">{title}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {/* ビューモード切替 */}
          <button
            onClick={() => setViewMode(viewMode === 'code' ? 'split' : 'code')}
            className={`p-1.5 rounded hover:bg-[#313244] transition-colors ${viewMode === 'code' ? 'text-blue-400' : 'text-[#cdd6f4]/50'}`}
            title="コードのみ"
          >
            <Code2 size={14} />
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'preview' ? 'split' : 'preview')}
            className={`p-1.5 rounded hover:bg-[#313244] transition-colors ${viewMode === 'preview' ? 'text-blue-400' : 'text-[#cdd6f4]/50'}`}
            title="プレビューのみ"
          >
            <Eye size={14} />
          </button>
          {/* 実行ボタン */}
          {!autoRun && (
            <button
              onClick={runPreview}
              className="flex items-center gap-1 px-3 py-1 rounded bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
            >
              <Play size={12} />
              実行
            </button>
          )}
          <button
            onClick={handleReset}
            className="p-1.5 rounded hover:bg-[#313244] text-[#cdd6f4]/50 hover:text-[#cdd6f4] transition-colors"
            title="リセット"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded hover:bg-[#313244] text-[#cdd6f4]/50 hover:text-[#cdd6f4] transition-colors"
            title={isFullscreen ? '縮小' : '全画面'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* 手順 + 説明（Progate風） */}
      {(description || steps) && (
        <div className="px-4 py-3 bg-[#1e1e2e] border-b border-[#313244]">
          {description && (
            <p className="text-sm text-[#cdd6f4]/80 mb-2">{description}</p>
          )}
          {steps && (
            <ol className="space-y-1">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#cdd6f4]/70">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* メインエリア: コード + プレビュー */}
      <div
        className={`flex ${isFullscreen ? 'flex-1' : ''} ${
          viewMode === 'split' ? 'flex-col lg:flex-row' : ''
        }`}
        style={!isFullscreen ? { minHeight: previewHeight + 80 } : undefined}
      >
        {/* コードエディタ */}
        {viewMode !== 'preview' && (
          <div className={`flex flex-col ${viewMode === 'split' ? 'lg:w-1/2' : 'w-full'} ${isFullscreen ? 'flex-1' : ''}`}>
            {/* ファイルタブ */}
            <div className="flex items-center gap-0 bg-[#11111b] border-b border-[#313244] overflow-x-auto">
              {files.map((file, i) => (
                <button
                  key={file.name}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 text-xs font-mono whitespace-nowrap transition-colors border-b-2 ${
                    i === activeTab
                      ? `bg-[#1e1e2e] ${tabColor(file.language)} border-primary`
                      : 'text-[#cdd6f4]/40 border-transparent hover:text-[#cdd6f4]/70 hover:bg-[#1e1e2e]/50'
                  }`}
                >
                  {file.name}
                </button>
              ))}
            </div>

            {/* テキストエリア */}
            <div className="flex-1 bg-[#1e1e2e] relative">
              <textarea
                value={activeFile.code}
                onChange={(e) => handleCodeChange(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[200px] py-4 px-5 font-mono text-sm leading-relaxed bg-transparent text-[#cdd6f4] resize-none focus:outline-none"
                style={
                  !isFullscreen ? { height: previewHeight + 40 } : undefined
                }
              />
            </div>
          </div>
        )}

        {/* プレビュー */}
        {viewMode !== 'code' && (
          <div
            className={`flex flex-col ${viewMode === 'split' ? 'lg:w-1/2 border-t lg:border-t-0 lg:border-l' : 'w-full'} border-[#313244] ${isFullscreen ? 'flex-1' : ''}`}
          >
            {/* プレビューヘッダー */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] dark:bg-[#1e1e2e] border-b border-border dark:border-[#313244]">
              <Eye size={12} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">プレビュー</span>
              {goalDescription && (
                <span className="text-xs text-muted-foreground/60 ml-auto">
                  目標: {goalDescription}
                </span>
              )}
            </div>

            {/* iframe */}
            <div className="flex-1 bg-white dark:bg-[#1e1e2e]" style={!isFullscreen ? { height: previewHeight } : undefined}>
              {previewHtml && (
                <iframe
                  ref={iframeRef}
                  srcDoc={previewHtml}
                  sandbox="allow-scripts allow-same-origin"
                  title="プレビュー"
                  className="w-full h-full border-0"
                  style={{ minHeight: previewHeight }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
