/**
 * TSX ページファイルを Zenn Book 用 Markdown に変換するスクリプト
 *
 * 使い方:
 *   npx tsx zenn/scripts/convert.ts
 *
 * 出力: zenn/books/<book-id>/ に章ファイルを生成
 */

import fs from 'node:fs';
import path from 'node:path';

// ── マニュアル → Book のマッピング ──
const bookMap: Record<string, { bookId: string; dir: string }> = {
  react: { bookId: 'dev-album-react', dir: 'client/src/pages/react' },
  git: { bookId: 'dev-album-git', dir: 'client/src/pages/git' },
  threejs: { bookId: 'dev-album-threejs', dir: 'client/src/pages/threejs' },
  'claude-code': { bookId: 'dev-album-claude', dir: 'client/src/pages/claude-code' },
};

// ── ページ定義を navigation.ts から取得（簡易パース） ──
function getPages(manualId: string): { step: number; path: string; title: string; sectionId: string }[] {
  const navPath = path.resolve('client/src/lib/navigation.ts');
  const navSrc = fs.readFileSync(navPath, 'utf-8');

  const pageRegex = /\{\s*step:\s*(\d+),\s*path:\s*'([^']+)',\s*title:\s*'([^']+)',\s*sectionId:\s*'([^']+)',\s*manualId:\s*'([^']+)'/g;
  const pages: { step: number; path: string; title: string; sectionId: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = pageRegex.exec(navSrc)) !== null) {
    if (m[5] === manualId) {
      pages.push({ step: Number(m[1]), path: m[2], title: m[3], sectionId: m[4] });
    }
  }
  return pages.sort((a, b) => a.step - b.step);
}

// ── TSX → Markdown 変換 ──
function tsxToMarkdown(tsx: string, title: string, step: number): string {
  let md = `---\ntitle: "STEP ${step}: ${title}"\n---\n\n`;

  // JSX の文字列部分を抽出して変換
  let content = tsx;

  // コンポーネント定義の外側を除去
  const returnMatch = content.match(/return\s*\(\s*([\s\S]*)\s*\);\s*\}/);
  if (returnMatch) {
    content = returnMatch[1];
  }

  // CodeBlock → コードフェンス
  content = content.replace(
    /<CodeBlock\s+(?:[^>]*?)code=\{`([\s\S]*?)`\}(?:[^>]*?)language="([^"]*)"(?:[^>]*?)(?:title="([^"]*)")?[^>]*?\/>/g,
    (_match, code, lang, blockTitle) => {
      const header = blockTitle ? `**${blockTitle}**\n\n` : '';
      return `${header}\`\`\`${lang}\n${unescapeJsx(code)}\n\`\`\``;
    },
  );

  // InfoBox → Zenn message
  content = content.replace(
    /<InfoBox\s+type="(info|warning|error|success)"(?:\s+title="([^"]*)")?\s*>([\s\S]*?)<\/InfoBox>/g,
    (_match, type, boxTitle, inner) => {
      const alert = type === 'warning' || type === 'error' ? ' alert' : '';
      const titleLine = boxTitle ? `**${boxTitle}**\n` : '';
      return `:::message${alert}\n${titleLine}${stripJsx(inner)}\n:::`;
    },
  );

  // Quiz → details
  content = content.replace(
    /<Quiz[\s\S]*?question="([^"]*)"[\s\S]*?options=\{(\[[\s\S]*?\])\}[\s\S]*?correctIndex=\{(\d+)\}[\s\S]*?explanation="([^"]*)"[\s\S]*?\/>/g,
    (_match, question, optionsStr, correctIdx, explanation) => {
      let options: string[] = [];
      try {
        options = JSON.parse(optionsStr.replace(/'/g, '"'));
      } catch { /* ignore */ }
      const correct = Number(correctIdx);
      const optList = options.map((o, i) => `${i === correct ? '- **' + o + '** (正解)' : '- ' + o}`).join('\n');
      return `:::details クイズ: ${question}\n${optList}\n\n${explanation}\n:::`;
    },
  );

  // CodingChallenge → コードフェンス + details
  content = content.replace(
    /<CodingChallenge[\s\S]*?title="([^"]*)"[\s\S]*?description="([^"]*)"[\s\S]*?initialCode=\{`([\s\S]*?)`\}[\s\S]*?answer=\{`([\s\S]*?)`\}[\s\S]*?\/>/g,
    (_match, challengeTitle, desc, initial, answer) => {
      return `### チャレンジ: ${challengeTitle}\n\n${desc}\n\n\`\`\`tsx\n${unescapeJsx(initial)}\n\`\`\`\n\n:::details 模範解答\n\`\`\`tsx\n${unescapeJsx(answer)}\n\`\`\`\n:::`;
    },
  );

  // WhyNowBox
  content = content.replace(
    /<WhyNowBox[\s\S]*?>([\s\S]*?)<\/WhyNowBox>/g,
    (_match, inner) => `:::message\n**なぜ今これを学ぶのか**\n${stripJsx(inner)}\n:::`,
  );

  // ReferenceLinks → リンクリスト
  content = content.replace(
    /<ReferenceLinks[\s\S]*?links=\{(\[[\s\S]*?\])\}[\s\S]*?\/>/g,
    (_match, linksStr) => {
      try {
        const links = JSON.parse(linksStr.replace(/'/g, '"').replace(/,\s*\]/g, ']'));
        return '## 参考リンク\n\n' + links.map((l: { title: string; url: string }) => `- [${l.title}](${l.url})`).join('\n');
      } catch {
        return '';
      }
    },
  );

  // HTML タグの変換
  content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, '# $1');
  content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '## $1');
  content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '### $1');
  content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, '#### $1');
  content = content.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, '**$1**');
  content = content.replace(/<em[^>]*>([\s\S]*?)<\/em>/g, '*$1*');
  content = content.replace(/<code[^>]*>([\s\S]*?)<\/code>/g, '`$1`');
  content = content.replace(/<br\s*\/?>/g, '\n');
  content = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, '- $1');

  // JSX 式の除去
  content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, ''); // JSX コメント
  content = content.replace(/<(div|section|span|p|ul|ol|nav|header|footer|main|aside|article)[^>]*>/g, '');
  content = content.replace(/<\/(div|section|span|p|ul|ol|nav|header|footer|main|aside|article)>/g, '\n');

  // className, style 等の残骸を除去
  content = content.replace(/className="[^"]*"/g, '');
  content = content.replace(/style=\{\{[^}]*\}\}/g, '');

  // PageNavigation, CodePreview 等の残りタグを除去
  content = content.replace(/<(PageNavigation|CodePreview|Faq|LiveEditor|ThreePreview|CodeWithPreview|ParameterSlider|Highlight)[^>]*\/>/g, '');
  content = content.replace(/<(PageNavigation|CodePreview|Faq|LiveEditor|ThreePreview|CodeWithPreview)[^>]*>[\s\S]*?<\/\1>/g, '');

  // 残ったJSX タグを除去
  content = content.replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, '');
  content = content.replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, '');

  // JSX 式の除去（条件分岐、変数参照等）
  content = content.replace(/\{[a-zA-Z_]\w*\s*&&\s*\([\s\S]*?\)\}/g, ''); // {x && (...)}
  content = content.replace(/\{[a-zA-Z_]\w*\s*\?\s*[\s\S]*?:\s*[\s\S]*?\}/g, ''); // {x ? a : b}
  content = content.replace(/\{[a-zA-Z_]\w*\.map\([\s\S]*?\)\}/g, ''); // {x.map(...)}

  // React イベントハンドラの除去
  content = content.replace(/\s+on[A-Z]\w*=\{[^}]*\}/g, '');

  // 残った JSX 式 {variable} は除去（ただし {`code`} は保持済み）
  content = content.replace(/\{[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*\}/g, '');

  // className, style, ref 等の JSX 属性を除去
  content = content.replace(/\s+(className|style|ref|key|aria-\w+|data-\w+|tabIndex|role)=("[^"]*"|\{[^}]*\})/g, '');

  // 自己閉じタグの残骸
  content = content.replace(/<[a-z][a-z0-9]*\s*\/>/g, '');

  // クリーンアップ
  content = content.replace(/\{['"]\s*['"]\}/g, ''); // {''}
  content = content.replace(/\{" "\}/g, ' ');
  content = content.replace(/^\s*<\/?[a-z][^>]*>\s*$/gm, ''); // 単独行のHTMLタグ
  content = content.replace(/\n{3,}/g, '\n\n'); // 過度な空行を削減
  content = content.trim();

  md += content;
  return md;
}

function unescapeJsx(code: string): string {
  return code
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

function stripJsx(jsx: string): string {
  return jsx
    .replace(/<[^>]+>/g, '')
    .replace(/\{['"]\s*['"]\}/g, '')
    .replace(/\{" "\}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ── パスからTSXファイルを探す ──
function findTsxFile(pagePath: string): string | null {
  // /react/storybook/intro → client/src/pages/react/storybook/SbIntro.tsx 等
  // パスの最後のセグメントから推測
  const segments = pagePath.split('/').filter(Boolean);
  const manualId = segments[0];
  const baseDir = `client/src/pages/${manualId}`;

  if (!fs.existsSync(baseDir)) return null;

  // 末尾セグメントのパターンで探す
  const lastSegment = segments[segments.length - 1];
  const searchDirs = segments.length > 2
    ? [path.join(baseDir, segments.slice(1, -1).join('/'))]
    : [baseDir];

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
    // 完全一致 or kebab-to-PascalCase
    for (const f of files) {
      const name = f.replace('.tsx', '').toLowerCase();
      const target = lastSegment.replace(/-/g, '').toLowerCase();
      if (name === target || name.replace(/^sb/, '').toLowerCase() === target) {
        return path.join(dir, f);
      }
    }
    // フォールバック: 部分一致
    for (const f of files) {
      if (f.toLowerCase().includes(lastSegment.replace(/-/g, '').substring(0, 6))) {
        return path.join(dir, f);
      }
    }
  }
  return null;
}

// ── メイン処理 ──
function main() {
  const targetManual = process.argv[2]; // 引数でマニュアル指定 (任意)

  for (const [manualId, { bookId, dir }] of Object.entries(bookMap)) {
    if (targetManual && targetManual !== manualId) continue;

    const bookDir = `zenn/books/${bookId}`;
    const pages = getPages(manualId);

    if (pages.length === 0) {
      console.log(`[${manualId}] ページが見つかりません（navigation.ts の解析失敗の可能性）`);
      continue;
    }

    console.log(`\n[${manualId}] ${pages.length} ページを変換中...`);

    let converted = 0;
    for (const page of pages) {
      const tsxPath = findTsxFile(page.path);
      if (!tsxPath || !fs.existsSync(tsxPath)) {
        console.log(`  SKIP: ${page.title} (TSX not found: ${page.path})`);
        continue;
      }

      const tsx = fs.readFileSync(tsxPath, 'utf-8');
      const md = tsxToMarkdown(tsx, page.title, page.step);
      const chapterNum = String(page.step).padStart(2, '0');
      const outPath = path.join(bookDir, `${chapterNum}.md`);
      fs.writeFileSync(outPath, md, 'utf-8');
      converted++;
    }

    console.log(`  ${converted}/${pages.length} ページ変換完了 → ${bookDir}/`);
  }

  console.log('\n変換完了。npx zenn preview で確認できます。');
}

main();
