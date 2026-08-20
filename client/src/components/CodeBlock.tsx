import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Highlight, themes, type Language, type PrismTheme } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  /** ヘッダー右側に出す短い注記（例: "対象チャンネルで実行"）。どこで打つコードかを示す */
  badge?: string;
  showLineNumbers?: boolean;
}

// prism-react-renderer が認識する言語名へのマッピング
const languageMap: Record<string, Language> = {
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  jsx: 'jsx',
  html: 'markup',
  css: 'css',
  json: 'json',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  terminal: 'bash',
  yaml: 'yaml',
  yml: 'yaml',
  markdown: 'markdown',
  md: 'markdown',
  sql: 'sql',
  graphql: 'graphql',
  diff: 'diff',
  python: 'python',
  go: 'go',
  rust: 'rust',
};

function resolveLanguage(lang: string): Language {
  const lower = lang.toLowerCase();
  return languageMap[lower] ?? (lower as Language);
}

// vsDark の一部トークン色は、このコンポーネントのコード背景 #1e1e2e に対して
// WCAG AA (4.5:1) を満たさない。該当色のみ AA 準拠の近似色へ差し替える（色相は維持）。
// 実測(対 #1e1e2e): prolog rgb(0,0,128)=1.02 / constant rgb(100,102,149)=3.03 / punctuation #808080=4.15
const AA_CONTRAST_FIXES: Record<string, string> = {
  'rgb(0, 0, 128)': '#569cd6', // prolog: 1.02 → 5.56
  'rgb(100, 102, 149)': '#8a8ac0', // constant（テンプレートリテラル補間など）: 3.03 → 5.06
  '#808080': '#a6accd', // punctuation: 4.15 → 7.34
};

const codeTheme: PrismTheme = {
  ...themes.vsDark,
  styles: themes.vsDark.styles.map((entry) => {
    const replacement = entry.style?.color
      ? AA_CONTRAST_FIXES[entry.style.color]
      : undefined;
    return replacement
      ? { ...entry, style: { ...entry.style, color: replacement } }
      : entry;
  }),
};

export default function CodeBlock({
  code,
  language = 'tsx',
  title,
  badge,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prismLanguage = resolveLanguage(language);

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-[#1e1e2e] text-slate-100 my-4">
      {/* ヘッダー */}
      {(title || language) && (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2.5 bg-[#181825] border-b border-[#313244]">
          <div className="flex items-center gap-2 min-w-0">
            {language && (
              <span className="text-xs font-mono text-[#cdd6f4]/60 uppercase tracking-wider flex-shrink-0">
                {language}
              </span>
            )}
            {title && (
              <span className="text-sm font-medium text-[#cdd6f4] truncate">
                {title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {badge && (
              <span className="inline-block rounded-full border border-[#45475a] px-2.5 py-0.5 text-xs font-medium text-[#cdd6f4] whitespace-nowrap">
                {badge}
              </span>
            )}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded hover:bg-[#313244] transition-colors"
              title="コードをコピー"
            >
              {copied ? (
                <Check size={16} className="text-[#a6e3a1]" />
              ) : (
                <Copy size={16} className="text-[#cdd6f4]/60" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* コード本体（横スクロールをキーボードでも操作できるよう focusable にする） */}
      <Highlight theme={codeTheme} code={code.trim()} language={prismLanguage}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <div
            className="overflow-x-auto focus:outline-2 focus:outline-primary"
            tabIndex={0}
            role="region"
            aria-label={title ? `コード: ${title}` : 'コードブロック'}
          >
            <pre className="p-4 font-mono text-sm leading-relaxed m-0">
              {tokens.map((line, i) => {
                const { key: _lk, ...lineProps } = getLineProps({ line });
                return (
                  <div key={i} {...lineProps} className="flex">
                    {showLineNumbers && (
                      <span className="inline-block w-10 text-right pr-4 text-[#8b90a8] select-none flex-shrink-0 text-xs leading-relaxed">
                        {i + 1}
                      </span>
                    )}
                    <span className="flex-1">
                      {line.map((token, j) => {
                        const { key: _tk, ...tokenProps } = getTokenProps({ token });
                        return <span key={j} {...tokenProps} />;
                      })}
                    </span>
                  </div>
                );
              })}
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
}
