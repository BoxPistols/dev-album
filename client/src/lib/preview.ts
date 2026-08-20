import { useState, useEffect, useRef, useCallback } from 'react';
import { transform } from 'sucrase';

/** プレビュー iframe に追加読み込みできる外部ライブラリ */
export type PreviewLib = 'mui' | 'tailwind' | 'styled-components' | 'emotion';

// プレビュー用 UMD は client/public/vendor/ にセルフホスト（CDN 障害・社内ネットワークの
// 単一障害点を排除）。srcDoc iframe は親と同一オリジンなので絶対パスで解決される。
// UMD 配布は MUI v5 系が最終のため、ライブプレビューは v5 で実行する
// （Button / Typography / Alert 等の基本 API は v5〜v7 で同一）
const REACT_UMD_URL = '/vendor/react-18.3.1.production.min.js';
const REACT_DOM_UMD_URL = '/vendor/react-dom-18.3.1.production.min.js';
const THREE_UMD_URL = '/vendor/three-0.160.1.min.js';
const MUI_UMD_URL = '/vendor/mui-material-5.18.0.umd.min.js';
const ROBOTO_FONT_URL = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
// Tailwind v4 のブラウザ実行ビルド（クラスを実行時にコンパイルする公式デモ用ビルド）
const TAILWIND_BROWSER_URL = '/vendor/tailwindcss-browser-4.3.2.global.js';
const STYLED_COMPONENTS_UMD_URL = '/vendor/styled-components-6.1.19.min.js';
const EMOTION_REACT_UMD_URL = '/vendor/emotion-react-11.14.0.umd.min.js';
const EMOTION_STYLED_UMD_URL = '/vendor/emotion-styled-11.14.1.umd.min.js';
const EMOTION_CSS_UMD_URL = '/vendor/emotion-css-11.13.5.umd.min.js';

// プレビュー iframe の Content-Security-Policy。
// script/style は自己ホスト(/vendor='self')とトランスパイル済みインラインを許可。
// connect-src 'none' で fetch/XHR/WebSocket を封じ、万一のコードでも外部送信を不可能にする
// （srcDoc は allow-same-origin で親オリジンを継承するため、この多層防御を併用する）。
const PREVIEW_CSP = "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src data: https:; connect-src 'none'; base-uri 'none'";

/**
 * コード中の import 文からプレビューに必要な外部ライブラリを検出する。
 * Tailwind は import が現れないため、利用側が libs で明示する。
 */
export function detectPreviewLibs(code: string): PreviewLib[] {
  const libs: PreviewLib[] = [];
  if (/@mui\/material/.test(code)) libs.push('mui');
  if (/from\s*['"]styled-components['"]/.test(code)) libs.push('styled-components');
  if (/@emotion\//.test(code)) libs.push('emotion');
  return libs;
}

/**
 * import 文と export キーワードを除去し、プレビュー用に整形する
 * （複数行 import にも対応。実行時は UMD グローバルから解決される）
 */
function stripModuleSyntax(code: string): string {
  return code
    .replace(/^import\s[^'"]*?from\s*['"][^'"]*['"];?[^\S\n]*(?:\/\/[^\n]*)?$/gm, '')
    .replace(/^import\s*['"][^'"]*['"];?[^\S\n]*(?:\/\/[^\n]*)?$/gm, '')
    .replace(/^export\s+default\s+/gm, '')
    .replace(/^export\s+/gm, '');
}

/**
 * コードからレンダリング対象のコンポーネント名を検出する。
 * App が定義されていれば優先。なければ最初の PascalCase 関数名。
 */
function detectComponentName(code: string): string {
  if (/function\s+App\b/.test(code) || /const\s+App\s*=/.test(code)) return 'App';
  const match = code.match(/function\s+([A-Z][A-Za-z0-9]*)/);
  return match?.[1] ?? 'App';
}

/**
 * JSX/TSX コードを iframe 用 HTML に変換する
 * libs: 明示的に読み込む外部ライブラリ（import 文からの自動検出とマージされる）
 */
export function buildPreviewHtml(
  jsxCode: string,
  cssCode: string,
  isDark = false,
  libs?: readonly PreviewLib[],
): string {
  const cleanedCode = stripModuleSyntax(jsxCode);
  const componentName = detectComponentName(cleanedCode);
  const activeLibs = new Set<PreviewLib>([...detectPreviewLibs(jsxCode), ...(libs ?? [])]);
  const needsMui = activeLibs.has('mui');
  const needsTailwind = activeLibs.has('tailwind');
  const needsStyled = activeLibs.has('styled-components');
  const needsEmotion = activeLibs.has('emotion');

  let transpiledCode = '';
  let errorMessage = '';

  try {
    const result = transform(cleanedCode, {
      transforms: ['jsx', 'typescript'],
      jsxRuntime: 'classic',
      // Emotion 使用時は css prop を有効にするため jsx ファクトリを切り替える
      ...(needsEmotion ? { jsxPragma: 'emotionReact.jsx' } : {}),
      production: false,
    });
    transpiledCode = result.code;
  } catch (e: unknown) {
    errorMessage = e instanceof Error ? e.message : String(e);
  }

  if (errorMessage) {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}">
<style>body{font-family:system-ui;margin:0;padding:16px;background:#1e1e2e;color:#f38ba8;}
pre{white-space:pre-wrap;font-size:13px;line-height:1.5;}</style></head>
<body><pre>${errorMessage.replace(/</g, '&lt;')}</pre></body></html>`;
  }

  const needsThree = /\bTHREE\b/.test(cleanedCode);

  return `<!DOCTYPE html>
<html${needsTailwind && isDark ? ' class="dark"' : ''}><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="${REACT_UMD_URL}"><\/script>
<script src="${REACT_DOM_UMD_URL}"><\/script>
${needsThree ? `<script src="${THREE_UMD_URL}"><\\/script>` : ''}
${needsMui ? `<link rel="stylesheet" href="${ROBOTO_FONT_URL}">
<script src="${MUI_UMD_URL}"><\/script>` : ''}
${needsStyled ? `<script src="${STYLED_COMPONENTS_UMD_URL}"><\/script>` : ''}
${needsEmotion ? `<script src="${EMOTION_REACT_UMD_URL}"><\/script>
<script src="${EMOTION_STYLED_UMD_URL}"><\/script>
<script src="${EMOTION_CSS_UMD_URL}"><\/script>` : ''}
${needsTailwind ? `<style>/* 先にレイヤー順を宣言し、preview-base を最下位に固定する（Tailwind 注入シートより前が必須） */
@layer preview-base, properties, theme, base, components, utilities;</style>
<script src="${TAILWIND_BROWSER_URL}"><\/script>
<style type="text/tailwindcss">@custom-variant dark (&:where(.dark, .dark *));</style>` : ''}
<style>
${needsTailwind ? `/* 基底スタイルを最下位レイヤーに置き、Tailwind の @layer utilities が勝てるようにする */
@layer preview-base {` : ''}
:root{
  --bg:${isDark ? '#1e1e2e' : '#fff'};
  --bg-subtle:${isDark ? '#252640' : '#f8fafc'};
  --bg-muted:${isDark ? '#313244' : '#f3f4f6'};
  --bg-accent:${isDark ? '#1e3a5f' : '#dbeafe'};
  --bg-accent-light:${isDark ? '#1a2842' : '#eff6ff'};
  --bg-success:${isDark ? '#1a3a2a' : '#dcfce7'};
  --bg-warning:${isDark ? '#3a2a1a' : '#fef3c7'};
  --bg-card:${isDark ? '#1a2332' : '#fff'};
  --text:${isDark ? '#cdd6f4' : '#1f2937'};
  --text-muted:${isDark ? '#a6adc8' : '#6b7280'};
  --text-accent:${isDark ? '#89b4fa' : '#2563eb'};
  --text-success:${isDark ? '#a6e3a1' : '#16a34a'};
  --text-danger:${isDark ? '#f38ba8' : '#dc2626'};
  --border:${isDark ? '#45475a' : '#e5e7eb'};
  --shadow:${isDark ? '0 1px 3px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.1)'};
}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Work Sans',system-ui,sans-serif;padding:20px;background:var(--bg);color:var(--text);line-height:1.6;}
input,textarea,select,button{font:inherit;color:var(--text);background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:6px 10px;}
input:focus,textarea:focus,select:focus{outline:2px solid var(--text-accent);outline-offset:1px;}
button{cursor:pointer;background:var(--bg-muted);border-color:var(--border);}
button:hover{opacity:0.85;}
${needsTailwind ? '}' : ''}
${cssCode}
</style></head><body>
<div id="root"></div>
<script>
try{
  var {useState,useEffect,useRef,useCallback,useMemo,useReducer,useContext,createContext}=React;
${needsMui ? `  if(typeof MaterialUI==='undefined'){
    throw new Error('MUI ライブラリ(/vendor)の読み込みに失敗しました。ページを再読み込みしてください。');
  }
  Object.assign(window, MaterialUI);
` : ''}${needsStyled ? `  if(typeof styled==='undefined'){
    throw new Error('styled-components ライブラリ(/vendor)の読み込みに失敗しました。ページを再読み込みしてください。');
  }
  (function(){
    var sc=window.styled;
    if(sc&&typeof sc!=='function'&&sc.default){Object.assign(window,sc);window.styled=sc.default;}
    var s=window.styled;
    if(typeof s==='function'){['css','keyframes','createGlobalStyle','ThemeProvider','useTheme'].forEach(function(k){if(s[k]&&typeof window[k]==='undefined'){window[k]=s[k];}});}
  })();
` : ''}${needsEmotion ? `  if(typeof emotionReact==='undefined'){
    throw new Error('Emotion ライブラリ(/vendor)の読み込みに失敗しました。ページを再読み込みしてください。');
  }
  var css=emotionReact.css,keyframes=emotionReact.keyframes,Global=emotionReact.Global,ThemeProvider=emotionReact.ThemeProvider,useTheme=emotionReact.useTheme;
  var styled=typeof emotionStyled!=='undefined'?(emotionStyled.default||emotionStyled):undefined;
  var injectGlobal=typeof emotion!=='undefined'?emotion.injectGlobal:undefined;
  var cx=typeof emotion!=='undefined'?emotion.cx:undefined;
` : ''}  ${transpiledCode}
  if(typeof ${componentName}!=='undefined'){
    var __element=React.createElement(${componentName});
${needsMui ? `    var __previewTheme=MaterialUI.createTheme({palette:{mode:'${isDark ? 'dark' : 'light'}',background:{default:'${isDark ? '#1e1e2e' : '#fff'}'}}});
    __element=React.createElement(MaterialUI.ThemeProvider,{theme:__previewTheme},
      React.createElement(MaterialUI.CssBaseline),__element);
` : ''}    ReactDOM.createRoot(document.getElementById('root')).render(__element);
  }
}catch(e){
  document.getElementById('root').innerHTML=
    '<div style="color:#ef4444;padding:16px;font-size:13px;font-family:monospace;">'+
    '<strong>Error:</strong> '+e.message.replace(/</g,'&lt;')+'</div>';
}
<\/script></body></html>`;
}

/**
 * Three.js コードをプレビュー用HTMLに変換する（vanilla Three.js 用）
 */
export function buildThreePreviewHtml(code: string, isDark = true): string {
  const safeCode = code.replace(/___/g, "''");
  const bgColor = isDark ? '#1a1a2e' : '#e8e8f0';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: ${bgColor}; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100%; }
  #error { color: #ff6b6b; font-family: monospace; font-size: 13px; padding: 12px; white-space: pre-wrap; }
</style>
</head>
<body>
<div id="error"></div>
<script>
(function() {
  var s = document.createElement('script');
  s.src = '${THREE_UMD_URL}';
  s.onload = function() {
    try {
      ${safeCode}
    } catch(e) {
      document.getElementById('error').textContent = e.message;
    }
  };
  s.onerror = function() {
    document.getElementById('error').textContent = 'Three.js の読み込みに失敗しました';
  };
  document.head.appendChild(s);
})();
<\/script>
</body>
</html>`;
}

/**
 * Markdown をプレビュー用HTMLに変換する
 */
export function buildMarkdownPreviewHtml(markdown: string, isDark = false): string {
  const jsonContent = JSON.stringify(markdown).replace(/<\//g, '<\\/');
  const bg = isDark ? '#1e1e2e' : '#fff';
  const fg = isDark ? '#cdd6f4' : '#24292f';
  const borderColor = isDark ? '#45475a' : '#d0d7de';
  const codeBg = isDark ? '#313244' : '#f6f8fa';
  const blockquoteColor = isDark ? '#a6adc8' : '#57606a';
  const linkColor = isDark ? '#89b4fa' : '#0969da';
  const thBg = isDark ? '#313244' : '#f6f8fa';
  const errorColor = isDark ? '#f38ba8' : '#cf222e';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; padding: 16px; color: ${fg}; background: ${bg}; font-size: 14px; line-height: 1.6; }
  h1 { font-size: 1.8em; border-bottom: 1px solid ${borderColor}; padding-bottom: 0.3em; margin-bottom: 16px; }
  h2 { font-size: 1.4em; border-bottom: 1px solid ${borderColor}; padding-bottom: 0.3em; margin: 24px 0 16px; }
  h3 { font-size: 1.15em; margin: 24px 0 16px; }
  p { margin: 0 0 16px; }
  ul, ol { padding-left: 2em; margin: 0 0 16px; }
  li { margin: 4px 0; }
  code { background: ${codeBg}; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; }
  pre { background: ${codeBg}; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 0 0 16px; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 4px solid ${borderColor}; padding: 0 16px; color: ${blockquoteColor}; margin: 0 0 16px; }
  a { color: ${linkColor}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  table { border-collapse: collapse; width: 100%; margin: 0 0 16px; }
  th, td { border: 1px solid ${borderColor}; padding: 6px 13px; }
  th { background: ${thBg}; font-weight: 600; }
  hr { border: none; border-top: 1px solid ${borderColor}; margin: 24px 0; }
  strong { font-weight: 600; }
  em { font-style: italic; }
  #error { color: ${errorColor}; font-family: monospace; font-size: 13px; padding: 12px; }
</style>
</head>
<body>
<div id="content"></div>
<script>
function parseMarkdown(md) {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\`\`\`([\\s\\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>')
    .replace(/\`(.+?)\`/g, '<code>$1</code>')
    .replace(/^> (.*$)/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\\/li>)/s, '<ul>$1</ul>')
    .replace(/^(?!<[hupblo]|<\\/|<li|<hr|$)(.*$)/gm, '<p>$1</p>')
    .replace(/<p><\\/p>/g, '');
}
try {
  document.getElementById('content').innerHTML = parseMarkdown(${jsonContent});
} catch(e) {
  document.getElementById('content').innerHTML = '<div id="error">' + e.message + '</div>';
}
<\/script>
</body>
</html>`;
}

/**
 * ターミナル風のコマンド/設定ファイル表示
 */
export function buildTerminalPreviewHtml(text: string, isDark = true): string {
  const jsonContent = JSON.stringify(text).replace(/<\//g, '<\\/');
  const bg = isDark ? '#1e1e2e' : '#fafafa';
  const textColor = isDark ? '#cdd6f4' : '#333';
  // AA 4.5:1 の実測値。旧 #6c7086 は #1e1e2e 上で 3.36、旧 #999 は #fafafa 上で 2.73 だった
  const commentColor = isDark ? '#8a8fa8' : '#6a737d';
  const commandColor = isDark ? '#89b4fa' : '#0550ae';
  const flagColor = isDark ? '#f9e2af' : '#953800';
  const stringColor = isDark ? '#a6e3a1' : '#0a3069';
  const keyColor = isDark ? '#cba6f7' : '#8250df';
  const bracketColor = isDark ? '#f9e2af' : '#953800';
  const promptColor = isDark ? '#a6e3a1' : '#1a7f37';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace; background: ${bg}; color: ${textColor}; padding: 16px; font-size: 13px; line-height: 1.7; }
  .comment { color: ${commentColor}; font-style: italic; }
  .command { color: ${commandColor}; }
  .flag { color: ${flagColor}; }
  .string { color: ${stringColor}; }
  .key { color: ${keyColor}; }
  .value { color: ${stringColor}; }
  .bracket { color: ${bracketColor}; }
  .prompt { color: ${promptColor}; }
  .line { margin: 1px 0; white-space: pre-wrap; }
</style>
</head>
<body>
<div id="terminal"></div>
<script>
function render(text) {
  return text.split('\\n').map(function(line) {
    var t = line.trimStart();
    if (!t) return '<div class="line">&nbsp;</div>';
    if (t.startsWith('#')) return '<div class="line comment">' + line + '</div>';
    if (t.startsWith('//')) return '<div class="line comment">' + line + '</div>';
    if (t.match(/^"[^"]+"\s*:/)) {
      return '<div class="line">' + line.replace(/"([^"]+)"\s*:/, '<span class="key">"$1"</span>:') + '</div>';
    }
    if (t.match(/^(tmux|git|claude|npm|npx|cd|mkdir|touch|echo|cat|curl|brew|apt|sudo|ssh|gh|node|pnpm)\\b/)) {
      var parts = t.split(' ');
      var cmd = t.startsWith('tmux') || t.startsWith('git') ? parts.slice(0,2).join(' ') : parts[0];
      var rest = parts.slice(t.startsWith('tmux') || t.startsWith('git') ? 2 : 1).map(function(p) {
        if (p.startsWith('-')) return '<span class="flag">' + p + '</span>';
        if (p.startsWith('"') || p.startsWith("'")) return '<span class="string">' + p + '</span>';
        return p;
      }).join(' ');
      return '<div class="line"><span class="prompt">$ </span><span class="command">' + cmd + '</span> ' + rest + '</div>';
    }
    if (t.match(/^set(-option)?\\s/)) {
      return '<div class="line"><span class="command">' + t.split(' ')[0] + '</span> ' + t.split(' ').slice(1).join(' ') + '</div>';
    }
    if (t.match(/^[a-zA-Z_-]+:/)) {
      return '<div class="line">' + line.replace(/^(\\s*)([a-zA-Z_-]+):/, '$1<span class="key">$2</span>:') + '</div>';
    }
    if (t.match(/^[{}\\[\\]]/)) return '<div class="line bracket">' + line + '</div>';
    return '<div class="line">' + line + '</div>';
  }).join('');
}
document.getElementById('terminal').innerHTML = render(${jsonContent});
<\/script>
</body>
</html>`;
}

/**
 * JSON設定ファイルのバリデーション付きプレビュー
 */
export function buildConfigPreviewHtml(config: string, isDark = true): string {
  const jsonContent = JSON.stringify(config).replace(/<\//g, '<\\/');
  const bg = isDark ? '#1e1e2e' : '#fafafa';
  const textColor = isDark ? '#cdd6f4' : '#333';
  const validBg = isDark ? '#1e3a2f' : '#dafbe1';
  const validColor = isDark ? '#a6e3a1' : '#1a7f37';
  const validBorder = isDark ? '#2d5a3f' : '#aceebb';
  const invalidBg = isDark ? '#3a1e1e' : '#ffebe9';
  const invalidColor = isDark ? '#f38ba8' : '#cf222e';
  const invalidBorder = isDark ? '#5a2d2d' : '#ffcecb';
  const keyColorVal = isDark ? '#cba6f7' : '#8250df';
  const stringColorVal = isDark ? '#a6e3a1' : '#0a3069';
  const numberColor = isDark ? '#fab387' : '#953800';
  const booleanColor = isDark ? '#89b4fa' : '#0550ae';
  // commentColor と同じ理由で AA を満たす値に寄せる
  const nullColor = isDark ? '#8a8fa8' : '#6a737d';
  const bracketColorVal = isDark ? '#f9e2af' : '#953800';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { font-family: 'SF Mono', Consolas, monospace; background: ${bg}; color: ${textColor}; padding: 16px; font-size: 13px; line-height: 1.6; }
  .status { padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; font-size: 12px; }
  .valid { background: ${validBg}; color: ${validColor}; border: 1px solid ${validBorder}; }
  .invalid { background: ${invalidBg}; color: ${invalidColor}; border: 1px solid ${invalidBorder}; }
  .key { color: ${keyColorVal}; }
  .string { color: ${stringColorVal}; }
  .number { color: ${numberColor}; }
  .boolean { color: ${booleanColor}; }
  .null { color: ${nullColor}; }
  .bracket { color: ${bracketColorVal}; }
  pre { white-space: pre-wrap; }
</style>
</head>
<body>
<div id="status"></div>
<pre id="output"></pre>
<script>
var raw = ${jsonContent};
try {
  var parsed = JSON.parse(raw);
  document.getElementById('status').innerHTML = '<div class="status valid">\\u2713 Valid JSON</div>';
  var formatted = JSON.stringify(parsed, null, 2);
  var highlighted = formatted
    .replace(/"([^"]+)"\\s*:/g, '<span class="key">"$1"</span>:')
    .replace(/:\\s*"([^"]*)"(,?)/g, ': <span class="string">"$1"</span>$2')
    .replace(/:\\s*(\\d+\\.?\\d*)(,?)/g, ': <span class="number">$1</span>$2')
    .replace(/:\\s*(true|false)(,?)/g, ': <span class="boolean">$1</span>$2')
    .replace(/:\\s*(null)(,?)/g, ': <span class="null">$1</span>$2')
    .replace(/([{}\\[\\]])/g, '<span class="bracket">$1</span>');
  document.getElementById('output').innerHTML = highlighted;
} catch(e) {
  document.getElementById('status').innerHTML = '<div class="status invalid">\\u2717 ' + e.message + '</div>';
  document.getElementById('output').textContent = raw;
}
<\/script>
</body>
</html>`;
}

/**
 * デバウンス付きプレビュー生成フック
 */
export function useDebouncedPreview(
  code: string,
  css: string,
  canPreview: boolean,
  delay = 300,
  isDark = false,
  libs?: readonly PreviewLib[],
): string {
  const [previewHtml, setPreviewHtml] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  // 配列 identity での再ビルドを避けるため中身で比較する
  const libsKey = libs?.join(',') ?? '';

  const build = useCallback(() => {
    if (!canPreview) {
      setPreviewHtml('');
      return;
    }
    setPreviewHtml(buildPreviewHtml(code, css, isDark, libsKey ? (libsKey.split(',') as PreviewLib[]) : undefined));
  }, [code, css, canPreview, isDark, libsKey]);

  // 初回即時実行
  useEffect(() => {
    build();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 以降はデバウンス
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(build, delay);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [build, delay]);

  return previewHtml;
}
