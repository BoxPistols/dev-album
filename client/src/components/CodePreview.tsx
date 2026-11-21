import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Copy, Check, Eye, Code2, Maximize2, Minimize2, RotateCcw, GripVertical } from 'lucide-react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import {
  buildThreePreviewHtml,
  isP5Sketch,
  useDebouncedPreview,
  type PreviewLib,
} from '@/lib/preview';
import { useTheme, isDarkTheme } from '@/contexts/ThemeContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSketchDraft } from '@/hooks/useSketchDraft';
import P5Frame from '@/features/p5/P5Frame';

interface CodePreviewProps {
  code: string;
  language?: string;
  title?: string;
  css?: string;
  previewHeight?: number;
  layout?: 'horizontal' | 'vertical';
  /** true にするとコードを隠し、プレビューのみ表示する（視覚デモ用） */
  previewOnly?: boolean;
  /** プレビュー iframe に読み込む外部ライブラリ（MUI は import 文から自動検出される） */
  libs?: PreviewLib[];
  /**
   * 素のThree.js（Reactを使わないコード）はJSX用の組み立てでは動かない。
   * THREEを使うコードは自動でThree.js用の組み立てに切り替える。
   */
}

/** p5の結果枠の高さの上限（px）。これより長いコード欄の横では、枠がスクロールに追従する */
const P5_STICKY_HEIGHT = 460;
/** 狭い画面でp5の結果をコードの上に積むときの枠の高さ（px） */
const P5_STACKED_HEIGHT = 360;
/** これより狭い画面では、p5の結果とコードを横に並べない（キャンバスが小さくなりすぎる） */
const P5_STACK_QUERY = '(max-width: 767px)';

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
  previewOnly = false,
  libs,
}: CodePreviewProps) {
  // p5のスケッチは作品づくりの素材なので、書き換えた内容を端末に下書きとして残す。
  // それ以外のコードは、これまでどおりページを離れると元に戻る
  const {
    code: editableCode,
    setCode: setEditableCode,
    reset: handleReset,
    status: draftStatus,
    restoreDraft,
    markRunning,
    markAlive,
  } = useSketchDraft({
    original: code,
    title,
    enabled: !previewOnly && isP5Sketch(code),
  });
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<'both' | 'code' | 'preview'>(previewOnly ? 'preview' : 'both');
  const [splitRatio, setSplitRatio] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const highlightRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isModified = editableCode !== code;
  const prismLanguage = resolveLanguage(language);
  // 素のThree.jsはReactを経由しないので、JSX用の組み立てでは描画されない
  const isThree = /\bTHREE\b/.test(editableCode);
  // p5.jsのスケッチは素のJavaScriptで書くので、languageがjsでもプレビューする。
  // 元のコードで判定する。編集中に括弧を1つ消しただけで判定が外れ、結果欄ごと消えていた
  const isP5 = isP5Sketch(code) || isP5Sketch(editableCode);
  const canPreview = language === 'tsx' || language === 'jsx' || isP5;
  // 狭い画面で横に並べるとキャンバスが極端に小さくなる。p5は結果を上、コードを下に積む
  const stackP5 = useMediaQuery(P5_STACK_QUERY) && isP5;
  const isHorizontal = layout === 'horizontal' && !stackP5;

  const jsxPreviewHtml = useDebouncedPreview(
    editableCode,
    css,
    canPreview && !isThree && !isP5,
    300,
    isDarkTheme(theme),
    libs,
  );
  // p5は入力のたびにiframeを作り直すと描画が始まらないので、打鍵が止まってから反映する
  const isDark = isDarkTheme(theme);
  const [p5Code, setP5Code] = useState(editableCode);
  useEffect(() => {
    if (!isP5) return;
    const timer = setTimeout(() => setP5Code(editableCode), 400);
    return () => clearTimeout(timer);
  }, [editableCode, isP5]);
  // 書き換えたコードを動かす前に「実行中」の印を付ける。枠の中のスケッチは親ページと同じスレッドで
  // 動くので、印はiframeが実行を始める前（DOMに入れた直後の同期処理）に付ける
  useLayoutEffect(() => {
    if (isP5) markRunning(p5Code);
  }, [isP5, p5Code, markRunning]);
  const previewHtml = isP5
    ? ''
    : canPreview && isThree
      ? buildThreePreviewHtml(editableCode, isDark)
      : jsxPreviewHtml;

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
  const codeContentHeight = Math.max(lineCount * 20.8 + 32, 120);
  const editorHeight = isExpanded
    ? Math.max(codeContentHeight, 400)
    : Math.min(Math.max(codeContentHeight, previewHeight), isHorizontal ? previewHeight : 600);

  const showCode = viewMode !== 'preview';
  const showPreview = canPreview && viewMode !== 'code';

  // プレビューパネルの高さ（縮小時と拡大時で必ず差が出るようにする）
  const previewCollapsed = Math.max(200, previewHeight);
  const previewExpanded = Math.max(previewCollapsed + 300, 600);
  const showSplit = showCode && showPreview && isHorizontal;
  // p5の結果枠はコード欄の高さに合わせず、キャンバスが収まる高さで固定する。
  // 横並びのときだけ、コード欄と同じ高さの領域の中で枠を上端に留めてスクロールに追従させる
  const p5FrameHeight = !showCode
    ? (isExpanded ? previewExpanded : previewCollapsed)
    : stackP5
      ? P5_STACKED_HEIGHT
      : Math.min(editorHeight, P5_STICKY_HEIGHT);
  const previewPanelHeight = !showCode
    ? (isExpanded ? previewExpanded : previewCollapsed)
    : isP5 && !showSplit
      ? p5FrameHeight
      : editorHeight;

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
                  const { key: _lk, ...lineProps } = getLineProps({ line });
                  return (
                    <div key={i} {...lineProps} className="whitespace-pre">
                      {line.map((token, j) => {
                        const { key: _tk, ...tokenProps } = getTokenProps({ token });
                        return <span key={j} {...tokenProps} />;
                      })}
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
          aria-label={title ? `コードエディタ: ${title}` : 'コードエディタ'}
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
        !showSplit ? (showCode ? (stackP5 ? 'order-first border-b border-[#313244]' : 'border-t border-[#313244]') : '') : ''
      }`}
      style={showSplit ? { width: `${100 - splitRatio}%` } : undefined}
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f8fafc] dark:bg-[#1e1e2e] border-b border-border dark:border-[#313244] shrink-0">
        <Eye size={11} className="text-muted-foreground" />
        <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">Result</span>
      </div>
      <div
        className="bg-white dark:bg-[#1e1e2e] relative"
        // p5の枠は上端に留まるので、その下に残る余白をスケッチの地の色に合わせる
        style={{ height: previewPanelHeight, ...(isP5 ? { backgroundColor: isDark ? '#16161e' : '#ececf0' } : {}) }}
      >
        {isP5 ? (
          // p5のスケッチはコードが長くなりやすい。結果の枠をコード欄と同じ高さまで伸ばすと
          // キャンバスが画面の外に出るので、枠の高さを固定し、上端に留めてスクロールに追従させる。
          // 背の低い画面でも操作バー（一時停止）が見えるよう、画面の高さも上限にする
          <P5Frame
            code={p5Code}
            isDark={isDark}
            title={`プレビュー: ${title ?? 'p5.jsのスケッチ'}`}
            className="w-full sticky top-3"
            style={{ height: `min(${p5FrameHeight}px, calc(100dvh - 96px))` }}
            onAlive={markAlive}
          />
        ) : previewHtml && (
          <iframe
            srcDoc={previewHtml}
            sandbox="allow-scripts allow-same-origin"
            title="プレビュー"
            className="w-full h-full border-0"
          />
        )}
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
          <span className="text-[12px] font-mono text-[#cdd6f4]/65 uppercase">{language}</span>
        )}
        {/* 常に置いておき、文言が変わったときに読み上げられるようにする */}
        <span role="status" className="text-[12px] text-[#f9e2af] ml-1">
          {draftStatus === 'saved' && '下書きを保存済み'}
          {draftStatus === 'unsaved' && '下書きを保存できません'}
          {draftStatus === 'recovered' && '前回この下書きで止まったため、元のコードで開きました'}
        </span>
        {draftStatus === 'recovered' && (
          <button
            type="button"
            onClick={restoreDraft}
            className="text-[12px] text-[#cdd6f4] underline underline-offset-2 ml-1 cursor-pointer"
          >
            下書きを開く
          </button>
        )}
      </div>
      <div className="flex items-center gap-0.5">
        {canPreview && !previewOnly && (
          <>
            <button
              onClick={() => setViewMode(viewMode === 'code' ? 'both' : 'code')}
              className={`p-1.5 rounded cursor-pointer hover:bg-[#313244] transition-colors ${viewMode === 'code' ? 'text-blue-400' : 'text-[#cdd6f4]/40'}`}
              title="コード"
            >
              <Code2 size={16} />
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'preview' ? 'both' : 'preview')}
              className={`p-1.5 rounded cursor-pointer hover:bg-[#313244] transition-colors ${viewMode === 'preview' ? 'text-blue-400' : 'text-[#cdd6f4]/40'}`}
              title="プレビュー"
            >
              <Eye size={16} />
            </button>
          </>
        )}
        {!previewOnly && (
          <>
            {isModified && (
              <button
                onClick={handleReset}
                className="p-1.5 rounded cursor-pointer hover:bg-[#313244] text-[#f9e2af] hover:text-[#f9e2af] transition-colors"
                title="リセット"
              >
                <RotateCcw size={16} />
              </button>
            )}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded cursor-pointer hover:bg-[#313244] transition-colors"
              title="コピー"
            >
              {copied ? <Check size={16} className="text-[#a6e3a1]" /> : <Copy size={16} className="text-[#cdd6f4]/40" />}
            </button>
            {canPreview && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded cursor-pointer hover:bg-[#313244] text-[#cdd6f4]/40 hover:text-[#cdd6f4] transition-colors"
                title={isExpanded ? '縮小' : '拡大'}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`rounded-xl border border-border my-6 ${isP5 ? 'overflow-clip' : 'overflow-hidden'}`}
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
