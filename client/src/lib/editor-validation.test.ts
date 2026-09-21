/**
 * エディタ関連の包括テスト
 * - 全チャレンジコードのトランスパイル検証
 * - detectComponentName のエッジケース
 * - プレビューHTML のフォーム要素対応
 */
import { describe, it, expect } from 'vitest';
import { buildPreviewHtml, fillBlanks } from './preview';
import { resolvePreviewType } from '@/components/CodingChallenge';
import { transform } from 'sucrase';
import fs from 'node:fs';
import path from 'node:path';

// preview.ts の stripModuleSyntax と同一実装（複数行 import 対応）
function stripModuleSyntax(code: string): string {
  return code
    .replace(/^import\s[^'"]*?from\s*['"][^'"]*['"];?[^\S\n]*(?:\/\/[^\n]*)?$/gm, '')
    .replace(/^import\s*['"][^'"]*['"];?[^\S\n]*(?:\/\/[^\n]*)?$/gm, '')
    .replace(/^export\s+default\s+/gm, '')
    .replace(/^export\s+/gm, '');
}

function isJsxCode(code: string): boolean {
  return resolvePreviewType(code) === 'jsx';
}

function tryTranspile(code: string): { ok: boolean; error?: string } {
  // JSX 以外（shell, config, markdown, HTML fragment, TypeScript 型定義等）はトランスパイル対象外
  if (!isJsxCode(code)) return { ok: true };
  // <style> タグを含むコードはテンプレートリテラル抽出時に壊れるのでスキップ
  if (/<style>/.test(code)) return { ok: true };
  // interface/type のみ（テスト抽出で context を失う場合のフォールバック）
  if (/^\s*(interface|type)\s/.test(code.trim()) && !/\bfunction\b/.test(code)) return { ok: true };
  // // コメントのみ（プラグイン構造説明等）
  const nonEmpty = code.split('\n').filter(l => l.trim());
  if (nonEmpty.length > 0 && nonEmpty.every(l => l.trim().startsWith('//'))) return { ok: true };
  try {
    const cleaned = stripModuleSyntax(code);
    transform(cleaned, { transforms: ['jsx', 'typescript'], jsxRuntime: 'classic', production: false });
    return { ok: true };
  } catch (e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message.split('\n')[0] : String(e) };
  }
}

function extractCodes(src: string): string[] {
  const codes: string[] = [];
  // initialCode={`...`} と answer={`...`} の両方を抽出
  const patterns = [
    /initialCode=\{`([\s\S]*?)`\}/g,
    /answer=\{`([\s\S]*?)`\}/g,
    /initialCode:\s*`([\s\S]*?)`/g,
    /answer:\s*`([\s\S]*?)`/g,
  ];
  for (const pattern of patterns) {
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(src)) !== null) {
      // テンプレートリテラルのエスケープを解除
      const code = m[1]
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\`/g, '`')
        .replace(/\\\\/g, '\\');
      codes.push(code);
    }
  }
  return codes;
}

// ============================================================
// 全チャレンジコードのトランスパイル検証
// ============================================================
describe('全チャレンジコードのトランスパイル検証', () => {
  const dataDir = path.resolve(__dirname, '..', 'data');
  const pagesDir = path.resolve(__dirname, '..', 'pages');

  // トレーニングデータ
  const trainingFiles = fs.existsSync(dataDir)
    ? fs.readdirSync(dataDir).filter(f => f.startsWith('training-'))
    : [];

  for (const file of trainingFiles) {
    it(`[${file}] の全コードがトランスパイル可能`, () => {
      const src = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      // <style> タグを含むファイルはテンプレートリテラル抽出が壊れるのでスキップ
      if (src.includes('<style>')) return;
      const codes = extractCodes(src);
      expect(codes.length).toBeGreaterThan(0);
      for (const code of codes) {
        const result = tryTranspile(code);
        if (!result.ok) {
          const preview = code.split('\n').filter(l => l.trim()).slice(0, 3).join(' ').substring(0, 100);
          throw new Error(`トランスパイル失敗: ${result.error}\n  コード: ${preview}...`);
        }
      }
    });
  }

  // Training.tsx 本体
  it('[Training.tsx] の全コードがトランスパイル可能', () => {
    const trainingPath = path.join(pagesDir, 'Training.tsx');
    if (!fs.existsSync(trainingPath)) return;
    const src = fs.readFileSync(trainingPath, 'utf-8');
    const codes = extractCodes(src);
    for (const code of codes) {
      const result = tryTranspile(code);
      if (!result.ok) {
        const preview = code.split('\n').filter(l => l.trim()).slice(0, 3).join(' ').substring(0, 100);
        throw new Error(`トランスパイル失敗: ${result.error}\n  コード: ${preview}...`);
      }
    }
  });

  // 全ページの CodingChallenge（JSX プレビューのみ検証、config/terminal/markdown はスキップ）
  function scanPages(dir: string): { file: string; codes: string[] }[] {
    const results: { file: string; codes: string[] }[] = [];
    if (!fs.existsSync(dir)) return results;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...scanPages(full));
      } else if (entry.name.endsWith('.tsx')) {
        const src = fs.readFileSync(full, 'utf-8');
        if (!src.includes('CodingChallenge')) continue;
        // previewType が config/terminal/markdown の CodingChallenge を含むファイルはスキップ
        if (/previewType=["'](config|terminal|markdown)["']/.test(src)) continue;
        // ネストしたテンプレートリテラル（\`${}\`）を含むファイルは正規表現抽出が壊れるのでスキップ
        if (src.includes('\\`\\${')) continue;
        const codes = extractCodes(src);
        if (codes.length > 0) {
          results.push({ file: path.relative(pagesDir, full), codes });
        }
      }
    }
    return results;
  }

  const pageResults = scanPages(pagesDir);
  for (const { file, codes } of pageResults) {
    it(`[${file}] の CodingChallenge コード (${codes.length}個) がトランスパイル可能`, () => {
      for (const code of codes) {
        const result = tryTranspile(code);
        if (!result.ok) {
          const preview = code.split('\n').filter(l => l.trim()).slice(0, 3).join(' ').substring(0, 100);
          throw new Error(`トランスパイル失敗: ${result.error}\n  コード: ${preview}...`);
        }
      }
    });
  }
});

// ============================================================
// チャレンジの空欄（___）が実行できる形になるか
// ============================================================
// トランスパイルは通るが実行時にReferenceErrorで落ちる形なので、上の検証では捕まらない。
// 判定はfillBlanksの正規表現をなぞらず、文字列リテラルを伏せてから識別子として
// 残っていないかを見る（同じ書き方で検査すると、実装の取りこぼしも一緒に見逃す）。
describe('チャレンジの空欄', () => {
  /** 文字列・テンプレートリテラルの中身を伏せる。残った___は識別子の位置にある */
  function maskStrings(code: string): string {
    return code
      .replace(/`(?:\\[\s\S]|[^`\\])*`/g, '``')
      .replace(/'(?:\\[\s\S]|[^'\\\n])*'/g, "''")
      .replace(/"(?:\\[\s\S]|[^"\\\n])*"/g, '""');
  }

  function collectChallengeCodes(dir: string): { file: string; code: string }[] {
    const found: { file: string; code: string }[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        found.push(...collectChallengeCodes(full));
        continue;
      }
      if (!full.endsWith('.tsx') && !full.endsWith('.ts')) continue;
      if (full.endsWith('.test.ts') || full.endsWith('.test.tsx')) continue;
      const src = fs.readFileSync(full, 'utf-8');
      for (const pattern of [/initialCode=\{`([\s\S]*?)`\}/g, /initialCode:\s*`([\s\S]*?)`/g]) {
        for (const m of src.matchAll(pattern)) {
          found.push({ file: path.relative(path.resolve(__dirname, '..'), full), code: m[1] });
        }
      }
    }
    return found;
  }

  const all = collectChallengeCodes(path.resolve(__dirname, '..'));
  const blanks = all.filter(c => c.code.includes('___'));
  const quoted = all.filter(c => /['"`]___['"`]/.test(c.code));

  it('走査そのものが壊れていない（拾えた件数を固定する）', () => {
    // 走査が壊れて0件になったときに素通りするのを防ぐ。件数は増える方向にしか動かないので下限だけ置く
    expect(all.length).toBeGreaterThanOrEqual(240);
    expect(blanks.length).toBeGreaterThanOrEqual(235);
    expect(quoted.length).toBeGreaterThanOrEqual(60);
  });

  it('値の位置の空欄が、実行できる形に置き換わる', () => {
    const remaining = blanks
      .filter(c => maskStrings(fillBlanks(c.code)).includes('___'))
      .map(c => c.file);
    expect(remaining).toEqual([]);
  });

  it('引用符に挟まれた空欄は、問題文のまま残る', () => {
    const broken = quoted.filter(c => fillBlanks(c.code).includes("''''")).map(c => c.file);
    expect(broken).toEqual([]);
  });
});

// ============================================================
// 全 CodePreview コードのトランスパイル検証
// （CodingChallenge と異なり code={`...`} prop を使うため別途抽出する）
// ============================================================
describe('全 CodePreview コードのトランスパイル検証', () => {
  const pagesDir = path.resolve(__dirname, '..', 'pages');

  /**
   * CodePreview の code={`...`} だけを抽出する。
   * - CodeBlock（静的表示・プレビューなし）の code prop は対象外
   * - language prop が tsx/jsx 以外（css/bash/html 等）は実行時も
   *   プレビューされない（canPreview=false）ため対象外
   * エスケープ（\` \$ 等）を正しく跨いで最初の未エスケープな
   * バッククォート + } で終端する
   */
  function extractPreviewCodes(src: string): string[] {
    const codes: string[] = [];
    const pattern = /code=\{`((?:\\[\s\S]|[^`\\])*)`\}/g;
    for (const m of src.matchAll(pattern)) {
      const idx = m.index ?? 0;
      // 直前に現れるコンポーネント開始タグが CodePreview のものだけを対象にする
      const previewStart = src.lastIndexOf('<CodePreview', idx);
      const blockStart = src.lastIndexOf('<CodeBlock', idx);
      if (previewStart === -1 || blockStart > previewStart) continue;
      // 実行時の canPreview 判定を再現: language が tsx/jsx（省略時は tsx）のみ
      const closeIdx = src.indexOf('/>', idx + m[0].length);
      const span = src.slice(previewStart, closeIdx === -1 ? idx : closeIdx);
      const language = span.match(/language="([^"]+)"/)?.[1] ?? 'tsx';
      if (language !== 'tsx' && language !== 'jsx') continue;
      // ページソース上のエスケープを実行時の文字列に戻す
      const code = m[1]
        .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
        .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\`/g, '`')
        .replace(/\\\$/g, '$')
        .replace(/\\\\/g, '\\');
      codes.push(code);
    }
    return codes;
  }

  function scanPreviewPages(dir: string): { file: string; codes: string[] }[] {
    const results: { file: string; codes: string[] }[] = [];
    if (!fs.existsSync(dir)) return results;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...scanPreviewPages(full));
      } else if (entry.name.endsWith('.tsx')) {
        const src = fs.readFileSync(full, 'utf-8');
        if (!src.includes('CodePreview')) continue;
        const codes = extractPreviewCodes(src).filter(
          // JSX プレビューされるものだけ検証（css/bash/HTML 等は対象外）
          (code) => isJsxCode(code) && !/<style>/.test(code),
        );
        if (codes.length > 0) {
          results.push({ file: path.relative(pagesDir, full), codes });
        }
      }
    }
    return results;
  }

  const previewResults = scanPreviewPages(pagesDir);

  it('CodePreview を含むページが検出される（抽出の自壊防止）', () => {
    expect(previewResults.length).toBeGreaterThan(10);
  });

  for (const { file, codes } of previewResults) {
    it(`[${file}] の CodePreview コード (${codes.length}個) がトランスパイル可能`, () => {
      for (const code of codes) {
        const result = tryTranspile(code);
        if (!result.ok) {
          const preview = code.split('\n').filter(l => l.trim()).slice(0, 3).join(' ').substring(0, 100);
          throw new Error(`トランスパイル失敗: ${result.error}\n  コード: ${preview}...`);
        }
      }
    });
  }
});

// ============================================================
// detectComponentName (App 優先)
// ============================================================
describe('detectComponentName: App 優先レンダリング', () => {
  it('NormalChild + MemoChild + App → App がレンダリングされる', () => {
    const code = `
function NormalChild({ name }) { return <div>{name}</div>; }
const MemoChild = React.memo(function MemoChild({ name }) { return <div>{name}</div>; });
function App() {
  const [count, setCount] = useState(0);
  return <div><button onClick={() => setCount(c => c+1)}>+1</button><NormalChild name="test" /><MemoChild name="test" /></div>;
}`;
    const html = buildPreviewHtml(code, '', false);
    expect(html).toContain('React.createElement(App)');
  });

  it('Badge + App → App がレンダリングされる', () => {
    const html = buildPreviewHtml('function Badge() { return <span/>; }\nfunction App() { return <Badge/>; }', '', false);
    expect(html).toContain('React.createElement(App)');
  });

  it('App がない場合は最初の PascalCase 関数がレンダリングされる', () => {
    const html = buildPreviewHtml('function MyComponent() { return <div>Hello</div>; }', '', false);
    expect(html).toContain('React.createElement(MyComponent)');
  });

  it('const App = ... 形式でも App が検出される', () => {
    const html = buildPreviewHtml('const App = () => <div>Hello</div>;', '', false);
    expect(html).toContain('React.createElement(App)');
  });
});

// ============================================================
// プレビュー HTML: フォーム要素のダークモード対応
// ============================================================
describe('プレビュー HTML: フォーム要素対応', () => {
  it('ダークモードでフォーム要素に色指定がある', () => {
    const html = buildPreviewHtml('function App() { return <input />; }', '', true);
    expect(html).toContain('input,textarea,select,button');
    expect(html).toContain('var(--text)');
    expect(html).toContain('var(--bg)');
    expect(html).toContain('var(--border)');
  });

  it('ライトモードでもフォーム要素スタイルが含まれる', () => {
    const html = buildPreviewHtml('function App() { return <input />; }', '', false);
    expect(html).toContain('input,textarea,select,button');
  });

  it('button に cursor:pointer が設定される', () => {
    const html = buildPreviewHtml('function App() { return <button>Click</button>; }', '', false);
    expect(html).toContain('cursor:pointer');
  });
});
