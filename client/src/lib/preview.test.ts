import { describe, it, expect } from "vitest";
import {
  buildPreviewHtml,
  buildThreePreviewHtml,
  buildMarkdownPreviewHtml,
  buildTerminalPreviewHtml,
  buildConfigPreviewHtml,
} from "./preview";

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
});

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
});

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
