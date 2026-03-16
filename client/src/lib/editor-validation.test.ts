/**
 * エディタ関連の包括テスト
 * - 全チャレンジコードのトランスパイル検証
 * - detectComponentName のエッジケース
 * - プレビューHTML のフォーム要素対応
 */
import { describe, it, expect } from 'vitest';
import { buildPreviewHtml } from './preview';
import { resolvePreviewType } from '@/components/CodingChallenge';
import { transform } from 'sucrase';
import fs from 'node:fs';
import path from 'node:path';

function stripModuleSyntax(code: string): string {
  return code.replace(/^import\s+.*$/gm, '').replace(/^export\s+default\s+/gm, '').replace(/^export\s+/gm, '');
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
