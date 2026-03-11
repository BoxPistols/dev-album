/**
 * Markdown をプレビュー用HTMLに変換する
 */
export function buildMarkdownPreviewHtml(markdown: string, isDark = false): string {
  const jsonContent = JSON.stringify(markdown);
  const bg = isDark ? '#1e1e2e' : '#fff';
  const textColor = isDark ? '#cdd6f4' : '#24292f';
  const borderColor = isDark ? '#45475a' : '#d0d7de';
  const codeBg = isDark ? '#313244' : '#f6f8fa';
  const blockquoteColor = isDark ? '#a6adc8' : '#57606a';
  const linkColor = isDark ? '#89b4fa' : '#0969da';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; padding: 16px; color: ${textColor}; background: ${bg}; font-size: 14px; line-height: 1.6; }
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
  a { color: ${linkColor}; }
  strong { font-weight: 600; }
</style>
</head>
<body>
<div id="content"></div>
<script>
function parseMd(md) {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\`\`\`([\\s\\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>')
    .replace(/\`(.+?)\`/g, '<code>$1</code>')
    .replace(/^\\> (.*$)/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/<p><\\/p>/g, '');
}
try {
  document.getElementById('content').innerHTML = parseMd(${jsonContent});
} catch(e) {
  document.getElementById('content').innerHTML = '<p style="color:red">' + e.message + '</p>';
}
<\/script>
</body>
</html>`;
}

/**
 * ターミナル風のコマンド/設定ファイル表示
 */
export function buildTerminalPreviewHtml(text: string, isDark = true): string {
  const jsonContent = JSON.stringify(text);
  const bg = isDark ? '#1e1e2e' : '#fafafa';
  const textColor = isDark ? '#cdd6f4' : '#333';
  const commentColor = isDark ? '#6c7086' : '#999';
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
    // JSON keys
    if (t.match(/^"[^"]+"\s*:/)) {
      return '<div class="line">' + line.replace(/"([^"]+)"\s*:/, '<span class="key">"$1"</span>:') + '</div>';
    }
    // Shell commands
    if (t.match(/^(tmux|git|claude|npm|npx|cd|mkdir|touch|echo|cat|curl|brew|apt|sudo)\\b/)) {
      var parts = t.split(' ');
      var cmd = t.startsWith('tmux') || t.startsWith('git') ? parts.slice(0,2).join(' ') : parts[0];
      var rest = parts.slice(t.startsWith('tmux') || t.startsWith('git') ? 2 : 1).map(function(p) {
        if (p.startsWith('-')) return '<span class="flag">' + p + '</span>';
        if (p.startsWith('"') || p.startsWith("'")) return '<span class="string">' + p + '</span>';
        return p;
      }).join(' ');
      return '<div class="line"><span class="prompt">$ </span><span class="command">' + cmd + '</span> ' + rest + '</div>';
    }
    // Config key=value
    if (t.match(/^set(-option)?\\s/)) {
      return '<div class="line"><span class="command">' + t.split(' ')[0] + '</span> ' + t.split(' ').slice(1).join(' ') + '</div>';
    }
    // YAML keys
    if (t.match(/^[a-zA-Z_-]+:/)) {
      return '<div class="line">' + line.replace(/^(\\s*)([a-zA-Z_-]+):/, '$1<span class="key">$2</span>:') + '</div>';
    }
    // Brackets
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
  const jsonContent = JSON.stringify(config);
  const bg = isDark ? '#1e1e2e' : '#fafafa';
  const textColor = isDark ? '#cdd6f4' : '#333';
  const validBg = isDark ? '#1e3a2f' : '#dafbe1';
  const validColor = isDark ? '#a6e3a1' : '#1a7f37';
  const validBorder = isDark ? '#2d5a3f' : '#aceebb';
  const invalidBg = isDark ? '#3a1e1e' : '#ffebe9';
  const invalidColor = isDark ? '#f38ba8' : '#cf222e';
  const invalidBorder = isDark ? '#5a2d2d' : '#ffcecb';
  const keyColor = isDark ? '#cba6f7' : '#8250df';
  const stringColor = isDark ? '#a6e3a1' : '#0a3069';
  const numberColor = isDark ? '#fab387' : '#953800';
  const booleanColor = isDark ? '#89b4fa' : '#0550ae';
  const nullColor = isDark ? '#6c7086' : '#999';
  const bracketColor = isDark ? '#f9e2af' : '#953800';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { font-family: 'SF Mono', Consolas, monospace; background: ${bg}; color: ${textColor}; padding: 16px; font-size: 13px; line-height: 1.6; }
  .status { padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; font-size: 12px; }
  .valid { background: ${validBg}; color: ${validColor}; border: 1px solid ${validBorder}; }
  .invalid { background: ${invalidBg}; color: ${invalidColor}; border: 1px solid ${invalidBorder}; }
  .key { color: ${keyColor}; }
  .string { color: ${stringColor}; }
  .number { color: ${numberColor}; }
  .boolean { color: ${booleanColor}; }
  .null { color: ${nullColor}; }
  .bracket { color: ${bracketColor}; }
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
