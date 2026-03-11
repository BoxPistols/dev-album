import { useState, useEffect, useRef } from 'react';
import { Code2, CheckCircle2, Lightbulb, RotateCcw, Eye, EyeOff } from 'lucide-react';
import {
  useBlobUrl,
  buildPreviewHtml,
  buildThreePreviewHtml,
  buildMarkdownPreviewHtml,
  buildTerminalPreviewHtml,
  buildConfigPreviewHtml,
} from '@/lib/preview';
import { useTheme } from '@/contexts/ThemeContext';

interface CodingChallengeProps {
  title: string;
  description: string;
  initialCode: string;
  answer: string;
  hints?: string[];
  /** 重要なキーワード: これらが含まれていれば正解とみなす */
  keywords?: string[];
  validator?: (input: string) => boolean;
  /** プレビューを表示するか */
  preview?: boolean;
  /** プレビュー種別: threejs / markdown / terminal / config / jsx（デフォルト自動判定） */
  previewType?: 'threejs' | 'markdown' | 'terminal' | 'config' | 'jsx';
  css?: string;
}

/**
 * キーワードベースの緩い判定
 */
function fuzzyCheck(code: string, answer: string, keywords?: string[]): boolean {
  const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
  const normalizedCode = normalize(code);
  const normalizedAnswer = normalize(answer);

  if (normalizedCode === normalizedAnswer) return true;

  if (keywords && keywords.length > 0) {
    return keywords.every((kw) => normalizedCode.includes(kw));
  }

  const importantPatterns = [
    /interface\s+\w+/g,
    /type\s+\w+/g,
    /:\s*(?:string|number|boolean|ReactNode)/g,
    /\?\s*:/g,
    /'\w+'\s*\|/g,
    /\|\s*'\w+'/g,
  ];

  const tokens = new Set<string>();
  for (const pattern of importantPatterns) {
    const matches = answer.match(pattern);
    if (matches) matches.forEach((m) => tokens.add(normalize(m)));
  }

  if (tokens.size === 0) {
    const answerLines = normalizedAnswer.split(/[;\n]/).map(normalize).filter(Boolean);
    const matchCount = answerLines.filter((line) => normalizedCode.includes(line)).length;
    return matchCount >= Math.ceil(answerLines.length * 0.5);
  }

  const matchCount = Array.from(tokens).filter((t) => normalizedCode.includes(t)).length;
  return matchCount >= Math.ceil(tokens.size * 0.8);
}

/** プレビュータイプを自動判定 */
function resolvePreviewType(code: string, previewType?: string): string {
  if (previewType) return previewType;
  if (/\bTHREE\b/.test(code)) return 'threejs';
  return 'jsx';
}

/** プレビュータイプに応じた HTML を生成 */
function buildPreviewForType(type: string, code: string, css: string, isDark: boolean): string {
  switch (type) {
    case 'threejs':
      return buildThreePreviewHtml(code, isDark);
    case 'markdown':
      return buildMarkdownPreviewHtml(code, isDark);
    case 'terminal':
      return buildTerminalPreviewHtml(code, isDark);
    case 'config':
      return buildConfigPreviewHtml(code, isDark);
    default:
      return buildPreviewHtml(code, css, isDark);
  }
}

export default function CodingChallenge({
  title,
  description,
  initialCode,
  answer,
  hints = [],
  keywords,
  validator,
  preview = false,
  previewType,
  css = '',
}: CodingChallengeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [code, setCode] = useState(initialCode);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [previewHtml, setPreviewHtml] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const resolvedType = resolvePreviewType(code, previewType);

  // プレビュー用 HTML をデバウンス生成
  useEffect(() => {
    if (!preview) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPreviewHtml(buildPreviewForType(resolvedType, code, css, isDark));
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, css, preview, isDark, resolvedType]);

  // 初回プレビュー
  useEffect(() => {
    if (preview) setPreviewHtml(buildPreviewForType(resolvedType, code, css, isDark));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Three.js は外部CDNが必要なため srcDoc を使用、それ以外は blob URL
  const needsSrcDoc = resolvedType === 'threejs';
  const blobUrl = useBlobUrl(needsSrcDoc ? '' : previewHtml);

  const handleCheck = () => {
    if (validator) {
      setIsCorrect(validator(code));
    } else {
      setIsCorrect(fuzzyCheck(code, answer, keywords));
    }
  };

  const handleNextHint = () => {
    if (hintIndex < hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
    setShowHint(true);
  };

  const handleReset = () => {
    setCode(initialCode);
    setShowAnswer(false);
    setShowHint(false);
    setHintIndex(0);
    setIsCorrect(null);
  };

  // Three.js プレビューは高さを大きめに
  const previewMinHeight = resolvedType === 'threejs' ? 300 : 160;

  return (
    <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 my-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
          <Code2 className="text-white" size={16} />
        </div>
        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
          コーディングチャレンジ
        </span>
      </div>

      <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>

      {/* エディタ + プレビュー */}
      {preview ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg overflow-hidden border border-border bg-[#1e1e2e]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-[#313244]">
              <span className="text-xs font-mono text-[#cdd6f4]/60 uppercase">エディタ</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setIsCorrect(null);
              }}
              spellCheck={false}
              wrap="off"
              className="w-full py-4 px-5 font-mono text-sm leading-relaxed bg-transparent text-[#cdd6f4] resize-none focus:outline-none min-h-[160px] overflow-auto whitespace-pre"
              rows={Math.max(6, code.split('\n').length + 1)}
            />
          </div>
          <div className="relative rounded-lg overflow-hidden border border-border bg-white dark:bg-[#1e1e2e]" style={{ minHeight: previewMinHeight }}>
            <div className="absolute top-2 right-2 text-xs text-muted-foreground z-10 bg-background/80 px-2 py-0.5 rounded">
              プレビュー
            </div>
            {(needsSrcDoc ? previewHtml : blobUrl) && (
              <iframe
                {...(needsSrcDoc ? { srcDoc: previewHtml } : { src: blobUrl })}
                className="w-full h-full border-0"
                style={{ minHeight: previewMinHeight }}
                sandbox={needsSrcDoc ? 'allow-scripts allow-same-origin' : 'allow-scripts'}
                title="プレビュー"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden border border-border bg-[#1e1e2e] mb-4">
          <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-[#313244]">
            <span className="text-xs font-mono text-[#cdd6f4]/60 uppercase">エディタ</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setIsCorrect(null);
            }}
            spellCheck={false}
            wrap="off"
            className="w-full py-4 px-5 font-mono text-sm leading-relaxed bg-transparent text-[#cdd6f4] resize-none focus:outline-none min-h-[160px] overflow-auto whitespace-pre"
            rows={Math.max(6, code.split('\n').length + 1)}
          />
        </div>
      )}

      {/* 結果表示 */}
      {isCorrect !== null && (
        <div
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg mb-4 ${
            isCorrect
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
          }`}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 size={18} />
              <span className="text-sm font-semibold">正解！素晴らしい！</span>
            </>
          ) : (
            <>
              <Code2 size={18} />
              <span className="text-sm font-semibold">もう少し！ヒントを確認してみましょう。</span>
            </>
          )}
        </div>
      )}

      {/* ヒント */}
      {showHint && hints.length > 0 && (
        <div className="px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb size={14} className="text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              ヒント {hintIndex + 1} / {hints.length}
            </span>
          </div>
          <p className="text-sm text-foreground/80">{hints[hintIndex]}</p>
        </div>
      )}

      {/* 模範解答 */}
      {showAnswer && (
        <div className="rounded-lg overflow-hidden border border-border bg-[#1e1e2e] mb-4">
          <div className="px-4 py-2 bg-[#181825] border-b border-[#313244]">
            <span className="text-xs font-mono text-emerald-400 uppercase">模範解答</span>
          </div>
          <pre className="p-4 font-mono text-sm leading-relaxed text-[#cdd6f4] overflow-x-auto whitespace-pre">
            {answer}
          </pre>
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCheck}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          チェックする
        </button>

        {hints.length > 0 && (
          <button
            onClick={handleNextHint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-sm hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
          >
            <Lightbulb size={14} />
            {showHint && hintIndex < hints.length - 1 ? '次のヒント' : 'ヒントを見る'}
          </button>
        )}

        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm hover:bg-muted transition-colors"
        >
          {showAnswer ? <EyeOff size={14} /> : <Eye size={14} />}
          {showAnswer ? '模範解答を隠す' : '模範解答を見る'}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <RotateCcw size={14} />
          リセット
        </button>
      </div>
    </div>
  );
}
