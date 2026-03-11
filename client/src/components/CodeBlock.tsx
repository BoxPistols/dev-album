import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
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

export default function CodeBlock({
  code,
  language = 'tsx',
  title,
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
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-[#313244]">
          <div className="flex items-center gap-2">
            {language && (
              <span className="text-xs font-mono text-[#cdd6f4]/60 uppercase tracking-wider">
                {language}
              </span>
            )}
            {title && (
              <span className="text-sm font-medium text-[#cdd6f4]">{title}</span>
            )}
          </div>
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
      )}

      {/* コード本体 */}
      <Highlight theme={themes.vsDark} code={code.trim()} language={prismLanguage}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <div className="overflow-x-auto">
            <pre className="p-4 font-mono text-sm leading-relaxed m-0">
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <div key={i} {...lineProps} className="flex">
                    {showLineNumbers && (
                      <span className="inline-block w-10 text-right pr-4 text-[#6c7086] select-none flex-shrink-0 text-xs leading-relaxed">
                        {i + 1}
                      </span>
                    )}
                    <span className="flex-1">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
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
