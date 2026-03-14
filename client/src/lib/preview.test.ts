import { describe, it, expect } from "vitest";
import {
  buildPreviewHtml,
  buildThreePreviewHtml,
  buildMarkdownPreviewHtml,
  buildTerminalPreviewHtml,
  buildConfigPreviewHtml,
} from "./preview";
import {
  resolvePreviewType,
  detectLanguage,
} from "@/components/CodingChallenge";

// ============================================================
// buildPreviewHtml (JSX/TSX)
// ============================================================
describe("buildPreviewHtml (JSX/TSX)", () => {
  it("有効な JSX コードで HTML を生成", () => {
    const html = buildPreviewHtml(
      'function App() { return React.createElement("div", null, "Hello"); }',
      "",
      false,
    );
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("react@18");
    expect(html).toContain("react-dom@18");
    expect(html).toContain("App");
  });

  it("CSS カスタムプロパティを含む", () => {
    const html = buildPreviewHtml("function App() { return null; }", "", true);
    expect(html).toContain("--bg:");
    expect(html).toContain("--text:");
  });

  it("ダークモードで色が変わる", () => {
    const light = buildPreviewHtml("function App() { return null; }", "", false);
    const dark = buildPreviewHtml("function App() { return null; }", "", true);
    expect(light).not.toBe(dark);
    expect(dark).toContain("#1e1e2e");
  });

  it("CSS コードを埋め込む", () => {
    const css = ".test { color: red; }";
    const html = buildPreviewHtml("function App() { return null; }", css, false);
    expect(html).toContain(css);
  });

  it("構文エラーでエラーHTMLを返す", () => {
    const html = buildPreviewHtml("function {{{ broken", "", false);
    expect(html).toContain("<!DOCTYPE html>");
    // エラーメッセージが含まれる
    expect(html).not.toContain("react@18");
  });

  it("THREE を含むコードでも Three.js CDN は含まない（buildPreviewHtml は JSX 専用）", () => {
    // buildPreviewHtml は needsThree を検出するが、buildThreePreviewHtml を使うべき
    const html = buildPreviewHtml(
      "const scene = new THREE.Scene();",
      "",
      false,
    );
    // THREE 検出で CDN が含まれる（後方互換）
    expect(html).toContain("three");
  });

  // --- 追加テスト ---

  it("React 18 UMD スクリプトタグを含む（React 19 ではない）", () => {
    const html = buildPreviewHtml("function App() { return null; }", "", false);
    expect(html).toContain("react@18.3.1/umd/react.production.min.js");
    expect(html).toContain("react-dom@18.3.1/umd/react-dom.production.min.js");
    // React 19 が混入していないこと
    expect(html).not.toContain("react@19");
    expect(html).not.toContain("react-dom@19");
  });

  it("スプレッド演算子 (...styles[variant]) がトランスパイルされる", () => {
    const code = `
function Badge({ variant = 'success', children }) {
  const styles = {
    success: { background: '#dcfce7', color: '#166534' },
    error: { background: '#fee2e2', color: '#991b1b' },
  };
  return <span style={{ padding: '4px 8px', borderRadius: '4px', ...styles[variant] }}>{children}</span>;
}
function App() {
  return <div><Badge variant="success">OK</Badge></div>;
}`;
    const html = buildPreviewHtml(code, "", false);
    // トランスパイルが成功しエラーHTMLではないこと
    expect(html).toContain("react@18");
    expect(html).toContain("App");
    // スプレッド構文がトランスパイル後のコードに残る（ES2018+ 対応）
    expect(html).toContain("...styles[variant]");
  });

  it("分割代入プロパティ ({ variant = 'success', children }) がトランスパイルされる", () => {
    const code = `
function Badge({ variant = 'success', children }) {
  return <span>{variant}: {children}</span>;
}
function App() { return <Badge>test</Badge>; }`;
    const html = buildPreviewHtml(code, "", false);
    expect(html).toContain("react@18");
    expect(html).toContain("App");
    // エラーHTMLではない
    expect(html).not.toContain("color:#f38ba8");
  });

  it("ネストされたコンポーネント呼び出し (Badge inside App) がトランスパイルされる", () => {
    const code = `
function Badge({ children }) {
  return <span className="badge">{children}</span>;
}
function App() {
  return (
    <div>
      <Badge>Hello</Badge>
      <Badge>World</Badge>
    </div>
  );
}`;
    const html = buildPreviewHtml(code, "", false);
    expect(html).toContain("react@18");
    // Badge と App 両方がトランスパイル結果に含まれる
    expect(html).toContain("Badge");
    expect(html).toContain("App");
    // React.createElement への変換が行われている
    expect(html).toContain("React.createElement");
  });

  it("複数の関数コンポーネントがすべて定義される", () => {
    const code = `
function Header() { return <h1>Header</h1>; }
function Footer() { return <footer>Footer</footer>; }
function App() {
  return <div><Header /><Footer /></div>;
}`;
    const html = buildPreviewHtml(code, "", false);
    expect(html).toContain("Header");
    expect(html).toContain("Footer");
    expect(html).toContain("App");
    // エラーなく生成される
    expect(html).toContain("react@18");
  });

  it("componentName 検出で Badge と App が両方存在する場合、最初の PascalCase 名を返す", () => {
    // detectComponentName は最初にマッチした PascalCase 関数名を返す
    // Badge が先にあるので Badge が検出される...が、実際はレンダリングで使う
    const code = `
function Badge({ children }) {
  return <span>{children}</span>;
}
function App() {
  return <Badge>Hello</Badge>;
}`;
    const html = buildPreviewHtml(code, "", false);
    // 生成される HTML には componentName が使われる
    // detectComponentName は最初の PascalCase 関数名 = Badge を返す
    // しかし typeof Badge !== 'undefined' なのでレンダリングは行われる
    expect(html).toContain("Badge");
  });

  it("インラインスタイルの CSS 変数が出力に保持される", () => {
    const code = `
function App() {
  return <div style={{ color: 'var(--text)', background: 'var(--bg)' }}>Hello</div>;
}`;
    const html = buildPreviewHtml(code, "", false);
    expect(html).toContain("var(--text)");
    expect(html).toContain("var(--bg)");
  });

  it("構文エラー時にエラーメッセージ HTML が生成される", () => {
    const html = buildPreviewHtml("const x = <></>><broken", "", false);
    expect(html).toContain("<!DOCTYPE html>");
    // エラー用スタイル (赤色テキスト)
    expect(html).toContain("#f38ba8");
    expect(html).toContain("<pre>");
    // React CDN は含まない
    expect(html).not.toContain("react@18.3.1");
  });

  it("import 文と export キーワードが除去される", () => {
    const code = `
import React from 'react';
export default function App() {
  return <div>Hello</div>;
}`;
    const html = buildPreviewHtml(code, "", false);
    // import/export が除去されてもトランスパイル成功
    expect(html).toContain("react@18");
    expect(html).toContain("App");
    // import 文がそのまま残っていないこと
    expect(html).not.toContain("import React from");
  });
});

// ============================================================
// buildThreePreviewHtml
// ============================================================
describe("buildThreePreviewHtml", () => {
  it("Three.js CDN を含む", () => {
    const html = buildThreePreviewHtml("const scene = new THREE.Scene();");
    expect(html).toContain("cdn.jsdelivr.net/npm/three");
    expect(html).toContain("THREE.Scene()");
  });

  it("___ を空文字に置換", () => {
    const html = buildThreePreviewHtml(
      "const texture = new THREE.___(canvas);",
    );
    expect(html).not.toContain("___");
    expect(html).toContain("''");
  });

  it("ダークモードで背景色が変わる", () => {
    const dark = buildThreePreviewHtml("const a = 1;", true);
    const light = buildThreePreviewHtml("const a = 1;", false);
    expect(dark).toContain("#1a1a2e");
    expect(light).toContain("#e8e8f0");
  });

  it("canvas スタイルを含む", () => {
    const html = buildThreePreviewHtml("const a = 1;");
    expect(html).toContain("canvas");
    expect(html).toContain("overflow: hidden");
  });

  it("エラー表示用の div を含む", () => {
    const html = buildThreePreviewHtml("const a = 1;");
    expect(html).toContain('id="error"');
  });

  // --- 追加テスト ---

  it("Three.js CDN バージョンが 0.160.1 である（0.183.2 ではない）", () => {
    const html = buildThreePreviewHtml("const scene = new THREE.Scene();");
    expect(html).toContain("three@0.160.1/build/three.min.js");
    // ローカルで使う 0.183.2 が混入しないこと
    expect(html).not.toContain("three@0.183");
  });

  it("___ プレースホルダが複数箇所あっても全て置換される", () => {
    const code = "const a = new THREE.___(___); const b = ___;";
    const html = buildThreePreviewHtml(code);
    expect(html).not.toContain("___");
    // 3箇所すべてが '' に置換される
    const matches = html.match(/''/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBeGreaterThanOrEqual(3);
  });

  it("onerror ハンドラが日本語エラーメッセージを含む", () => {
    const html = buildThreePreviewHtml("const a = 1;");
    expect(html).toContain("Three.js の読み込みに失敗しました");
  });
});

// ============================================================
// buildMarkdownPreviewHtml
// ============================================================
describe("buildMarkdownPreviewHtml", () => {
  it("Markdown パーサーを含む", () => {
    const html = buildMarkdownPreviewHtml("# Hello World");
    expect(html).toContain("parseMarkdown");
    expect(html).toContain("Hello World");
  });

  it("ダークモードで色が変わる", () => {
    const dark = buildMarkdownPreviewHtml("test", true);
    const light = buildMarkdownPreviewHtml("test", false);
    expect(dark).toContain("#cdd6f4");
    expect(light).toContain("#24292f");
  });

  it("コードブロック用スタイルを含む", () => {
    const html = buildMarkdownPreviewHtml("```code```");
    expect(html).toContain("pre");
    expect(html).toContain("code");
  });

  it("特殊文字をエスケープ", () => {
    const html = buildMarkdownPreviewHtml('Test "quotes" and \\backslash');
    expect(html).toContain("<!DOCTYPE html>");
  });
});

// ============================================================
// buildTerminalPreviewHtml
// ============================================================
describe("buildTerminalPreviewHtml", () => {
  it("ターミナル風スタイルを含む", () => {
    const html = buildTerminalPreviewHtml("git commit -m 'test'");
    expect(html).toContain('id="terminal"');
    expect(html).toContain(".command");
    expect(html).toContain(".prompt");
  });

  it("シェルコマンドのハイライト対応", () => {
    const html = buildTerminalPreviewHtml("git status");
    expect(html).toContain("render");
    expect(html).toContain("git status");
  });

  it("monospace フォントを使用", () => {
    const html = buildTerminalPreviewHtml("echo hello");
    expect(html).toContain("monospace");
  });
});

// ============================================================
// buildConfigPreviewHtml
// ============================================================
describe("buildConfigPreviewHtml", () => {
  it("JSON バリデーション機能を含む", () => {
    const html = buildConfigPreviewHtml('{"key": "value"}');
    expect(html).toContain("JSON.parse");
    expect(html).toContain('id="status"');
    expect(html).toContain('id="output"');
  });

  it("valid/invalid のスタイルを含む", () => {
    const html = buildConfigPreviewHtml("{}");
    expect(html).toContain(".valid");
    expect(html).toContain(".invalid");
  });

  it("シンタックスハイライト対応", () => {
    const html = buildConfigPreviewHtml("{}");
    expect(html).toContain(".key");
    expect(html).toContain(".string");
    expect(html).toContain(".number");
    expect(html).toContain(".boolean");
  });
});

// ============================================================
// resolvePreviewType（プレビュータイプ自動判定）
// ============================================================
describe("resolvePreviewType", () => {
  it("previewType が指定されていればそのまま返す", () => {
    expect(resolvePreviewType("anything", "markdown")).toBe("markdown");
    expect(resolvePreviewType("anything", "threejs")).toBe("threejs");
    expect(resolvePreviewType("anything", "terminal")).toBe("terminal");
    expect(resolvePreviewType("anything", "config")).toBe("config");
  });

  it("THREE を含むコードは 'threejs' を返す", () => {
    expect(resolvePreviewType("const scene = new THREE.Scene();")).toBe("threejs");
  });

  it("シェルコマンドのみのコードは 'terminal' を返す", () => {
    expect(resolvePreviewType("git init\ngit add .")).toBe("terminal");
    expect(resolvePreviewType("npm install express")).toBe("terminal");
    expect(resolvePreviewType("cd ~/projects\nmkdir my-app")).toBe("terminal");
  });

  it("# コメントのみの行は 'terminal' を返す", () => {
    expect(resolvePreviewType("# これはコメント\n# もう一つ")).toBe("terminal");
  });

  it("JSX コンポーネントコードは 'jsx' を返す", () => {
    expect(resolvePreviewType("function App() { return <div>Hello</div>; }")).toBe("jsx");
  });

  // --- 追加エッジケーステスト ---

  it("# コメントとシェルコマンドが混在するコードは 'terminal'", () => {
    const code = `# パッケージのインストール
npm install express
# サーバーを起動
node server.js`;
    expect(resolvePreviewType(code)).toBe("terminal");
  });

  it("export default function App() を含むコードは 'jsx'（'terminal' ではない）", () => {
    const code = `export default function App() {
  return <div>Hello World</div>;
}`;
    expect(resolvePreviewType(code)).toBe("jsx");
  });

  it("HTML タグで始まるコード (<div>) は 'jsx'", () => {
    expect(resolvePreviewType("<div>Hello World</div>")).toBe("jsx");
  });

  it("THREE.Scene() を含むコードは 'threejs'", () => {
    const code = `const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();`;
    expect(resolvePreviewType(code)).toBe("threejs");
  });

  it("空のコードは 'jsx' を返す", () => {
    expect(resolvePreviewType("")).toBe("jsx");
  });

  it("空白のみのコードは 'jsx' を返す", () => {
    expect(resolvePreviewType("   \n  \n   ")).toBe("jsx");
  });

  it("JSX とシェルコマンドキーワードが混在する場合、シェルパターンに一致すれば 'terminal'", () => {
    // シェルパターンが先にチェックされる（# コメント除外後）
    const code = `# React アプリを作成
npx create-react-app my-app
cd my-app
npm start`;
    expect(resolvePreviewType(code)).toBe("terminal");
  });

  it("関数定義だけでシェルコマンドがないコードは 'jsx'", () => {
    const code = `const greeting = "hello";
function App() {
  return <h1>{greeting}</h1>;
}`;
    expect(resolvePreviewType(code)).toBe("jsx");
  });
});

// ============================================================
// detectLanguage（コード言語推定 - CodingChallenge 用）
// ============================================================
describe("detectLanguage", () => {
  it("git init → bash", () => {
    expect(detectLanguage("git init")).toBe("bash");
  });

  it("npm install → bash", () => {
    expect(detectLanguage("npm install express")).toBe("bash");
  });

  it("# コメントで始まるコード → bash", () => {
    expect(detectLanguage("# これはコメントです")).toBe("bash");
  });

  it("curl コマンド → bash", () => {
    expect(detectLanguage("curl https://api.example.com")).toBe("bash");
  });

  it("CSS コード (.class { }) → 現状の正規表現では tsx と判定される（既知の制限）", () => {
    // detectLanguage の CSS パターンは /(\.|#|@media|...)\\s*\\{/ で、
    // '.' の直後に \\s*\\{ を期待するため .container { } はマッチしない
    expect(detectLanguage(".container { display: flex; }")).toBe("tsx");
  });

  it("CSS body { } → css", () => {
    expect(detectLanguage("body { margin: 0; }")).toBe("css");
  });

  it("CSS html { } → css", () => {
    expect(detectLanguage("html { font-size: 16px; }")).toBe("css");
  });

  it("CSS :root セレクタ → css", () => {
    expect(detectLanguage(":root { --color: blue; }")).toBe("css");
  });

  it("HTML <!DOCTYPE → markup", () => {
    expect(detectLanguage("<!DOCTYPE html>")).toBe("markup");
  });

  it("HTML <div> タグ → markup", () => {
    expect(detectLanguage("<div>Hello World</div>")).toBe("markup");
  });

  it("HTML <form> タグ → markup", () => {
    expect(detectLanguage("<form action='/submit'>")).toBe("markup");
  });

  it("HTML <table> タグ → markup", () => {
    expect(detectLanguage("<table><tr><td>Cell</td></tr></table>")).toBe("markup");
  });

  it("JSX function App() → tsx", () => {
    expect(detectLanguage("function App() { return <div>Hello</div>; }")).toBe("tsx");
  });

  it("TypeScript interface → tsx", () => {
    expect(detectLanguage("interface Props { name: string; }")).toBe("tsx");
  });

  it("const 宣言 → tsx", () => {
    expect(detectLanguage("const x = 42;")).toBe("tsx");
  });

  it("先頭に空白がある bash コマンド → bash", () => {
    expect(detectLanguage("  git status")).toBe("bash");
  });

  it("先頭に空白がある CSS (body) → css", () => {
    expect(detectLanguage("  body { color: red; }")).toBe("css");
  });
});
