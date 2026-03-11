import { useState, useEffect, useRef, useCallback } from 'react';
import { Copy, Check, Eye, Code2, Maximize2, Minimize2, RotateCcw, GripVertical } from 'lucide-react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import { useBlobUrl, useDebouncedPreview } from '@/lib/preview';
import { useTheme } from '@/contexts/ThemeContext';

interface CodePreviewProps {
  code: string;
  language?: string;
  title?: string;
  css?: string;
  previewHeight?: number;
  layout?: 'horizontal' | 'vertical';
}

const languageMap: Record<string, Language> = {
  ts: 'typescript', tsx: 'tsx', js: 'javascript', jsx: 'jsx',
  html: 'markup', css: 'css', json: 'json', bash: 'bash',
};

function resolveLanguage(lang: string): Language {
  return languageMap[lang.toLowerCase()] ?? (lang.toLowerCase() as Language);
}

export default function CodePreview({
  code,
  language = 'tsx',
  title,
  css = '',
  previewHeight = 320,
  layout = 'horizontal',
}: CodePreviewProps) {
  const [editableCode, setEditableCode] = useState(code);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<'both' | 'code' | 'preview'>('both');
  const [splitRatio, setSplitRatio] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const highlightRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditableCode(code);
  }, [code]);

  const { theme } = useTheme();
  const isModified = editableCode !== code;
  const prismLanguage = resolveLanguage(language);
  const canPreview = language === 'tsx' || language === 'jsx';
  const isHorizontal = layout === 'horizontal';

  const previewHtml = useDebouncedPreview(editableCode, css, canPreview, 300, theme === 'dark');
  const blobUrl = useBlobUrl(previewHtml);

  const handleReset = () => setEditableCode(code);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScroll = () => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = editableCode.substring(0, start) + '  ' + editableCode.substring(end);
      setEditableCode(newCode);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  };

  // ドラッグリサイズ
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleMove = (ev: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const ratio = ((clientX - rect.left) / rect.width) * 100;
      setSplitRatio(Math.max(20, Math.min(80, ratio)));
    };

    const handleUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleUp);
  }, []);

  // コード行数からエディタ高さを計算
  const lineCount = editableCode.split('\n').length;
  const codeContentHeight = Math.max(lineCount * 20.8 + 32, 120); // line-height 1.6 * 13px + padding
  const editorHeight = isExpanded
    ? Math.max(codeContentHeight, 400)
    : Math.min(Math.max(codeContentHeight, previewHeight), isHorizontal ? previewHeight : 600);

  const showCode = viewMode !== 'preview';
  const showPreview = canPreview && viewMode !== 'code';
  const showSplit = showCode && showPreview && isHorizontal;

  // コードエディタパネル
  const codePanel = showCode ? (
    <div
      className="flex flex-col min-w-0"
      style={showSplit ? { width: `${splitRatio}%`, flexShrink: 0 } : undefined}
    >
      <div className="relative" style={{ height: editorHeight }}>
        {/* シンタックスハイライト層（横スクロール対応） */}
        <div
          ref={highlightRef}
          className="absolute inset-0 overflow-auto pointer-events-none"
          aria-hidden="true"
        >
          <Highlight theme={themes.vsDark} code={editableCode} language={prismLanguage}>
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre
                className="py-4 px-5 font-mono text-[13px] leading-[1.6] m-0 bg-[#1e1e2e] w-fit min-w-full min-h-full"
                style={{ tabSize: 2 }}
              >
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });
                  return (
                    <div key={i} {...lineProps} className="whitespace-pre">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        </div>
        {/* 編集可能 textarea 層（横スクロール対応） */}
        <textarea
          ref={textareaRef}
          value={editableCode}
          onChange={(e) => setEditableCode(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          wrap="off"
          className="absolute inset-0 w-full h-full py-4 px-5 font-mono text-[13px] leading-[1.6] bg-transparent text-transparent caret-white resize-none focus:outline-none selection:bg-blue-500/30 overflow-auto z-10 whitespace-pre"
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  ) : null;

  // リサイズハンドル
  const resizeHandle = showSplit ? (
    <div
      className="flex items-center justify-center w-2 cursor-col-resize bg-[#313244] hover:bg-[#45475a] transition-colors shrink-0 group"
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      title="ドラッグして幅を調整"
    >
      <GripVertical size={10} className="text-[#585b70] group-hover:text-[#a6adc8]" />
    </div>
  ) : null;

  // プレビューパネル
  const previewPanel = showPreview ? (
    <div
      className={`flex flex-col min-w-0 ${
        !showSplit ? (showCode ? 'border-t border-[#313244]' : '') : ''
      }`}
      style={showSplit ? { width: `${100 - splitRatio}%` } : undefined}
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f8fafc] dark:bg-[#1e1e2e] border-b border-border dark:border-[#313244] shrink-0">
        <Eye size={11} className="text-muted-foreground" />
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Result</span>
      </div>
      <div className="bg-white dark:bg-[#1e1e2e] flex-1 relative" style={{ height: editorHeight }}>
        <iframe
          src={blobUrl}
          sandbox="allow-scripts"
          title="プレビュー"
          className="w-full h-full border-0"
        />
        {/* ドラッグ中は iframe がマウスイベントを奪うのを防止 */}
        {isDragging && <div className="absolute inset-0" />}
      </div>
    </div>
  ) : null;

  const headerBar = (
    <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-[#313244]">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f9e2af]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
        </div>
        {title && (
          <span className="text-xs font-medium text-[#cdd6f4] ml-2">{title}</span>
        )}
        {language && (
          <span className="text-[10px] font-mono text-[#cdd6f4]/40 uppercase">{language}</span>
        )}
      </div>
      <div className="flex items-center gap-0.5">
        {canPreview && (
          <>
            <button
              onClick={() => setViewMode(viewMode === 'code' ? 'both' : 'code')}
              className={`p-1.5 rounded hover:bg-[#313244] transition-colors ${viewMode === 'code' ? 'text-blue-400' : 'text-[#cdd6f4]/40'}`}
              title="コード"
            >
              <Code2 size={16} />
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'preview' ? 'both' : 'preview')}
              className={`p-1.5 rounded hover:bg-[#313244] transition-colors ${viewMode === 'preview' ? 'text-blue-400' : 'text-[#cdd6f4]/40'}`}
              title="プレビュー"
            >
              <Eye size={16} />
            </button>
          </>
        )}
        {isModified && (
          <button
            onClick={handleReset}
            className="p-1.5 rounded hover:bg-[#313244] text-[#f9e2af] hover:text-[#f9e2af] transition-colors"
            title="リセット"
          >
            <RotateCcw size={16} />
          </button>
        )}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded hover:bg-[#313244] transition-colors"
          title="コピー"
        >
          {copied ? <Check size={16} className="text-[#a6e3a1]" /> : <Copy size={16} className="text-[#cdd6f4]/40" />}
        </button>
        {canPreview && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded hover:bg-[#313244] text-[#cdd6f4]/40 hover:text-[#cdd6f4] transition-colors"
            title={isExpanded ? '縮小' : '拡大'}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="rounded-xl overflow-hidden border border-border my-6"
    >
      {headerBar}
      <div className={`flex ${
        showSplit ? 'flex-row' : 'flex-col'
      }`}>
        {codePanel}
        {resizeHandle}
        {previewPanel}
      </div>
    </div>
  );
}
