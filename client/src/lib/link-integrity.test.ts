import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { pages } from "./navigation";

/** 指定ディレクトリ配下の全 .tsx ファイルを再帰取得 */
function getAllTsxFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...getAllTsxFiles(full));
    } else if (full.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

const PAGES_DIR = join(import.meta.dirname, "..", "pages");
const allPageFiles = getAllTsxFiles(PAGES_DIR);

/** 指定位置がテンプレートリテラル（バッククォート文字列）内かどうか判定 */
function isInsideTemplateLiteral(content: string, position: number): boolean {
  let insideBacktick = false;
  for (let i = 0; i < position; i++) {
    if (content[i] === '`') {
      // エスケープされたバッククォートはスキップ
      if (i > 0 && content[i - 1] === '\\') continue;
      insideBacktick = !insideBacktick;
    }
  }
  return insideBacktick;
}

// navigation.ts に登録されている全パスのセット
const validPaths = new Set(pages.map((p) => p.path));

describe("リンク整合性テスト", () => {
  it("window.location.href を使っていない（git ページ）", () => {
    const violations: string[] = [];
    for (const file of allPageFiles) {
      const content = readFileSync(file, "utf-8");
      // window.location.reload() は許可
      const matches = content.match(/window\.location\.href\s*=/g);
      if (matches) {
        violations.push(`${file}: ${matches.length} 箇所`);
      }
    }
    expect(violations).toEqual([]);
  });

  it("next/link をインポートしていない（コード例は除外）", () => {
    const violations: string[] = [];
    const pattern = /from ['"]next\/link['"]/g;
    for (const file of allPageFiles) {
      const content = readFileSync(file, "utf-8");
      for (const match of content.matchAll(pattern)) {
        if (!isInsideTemplateLiteral(content, match.index!)) {
          violations.push(file);
          break;
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it("next/navigation をインポートしていない（コード例は除外）", () => {
    const violations: string[] = [];
    const pattern = /from ['"]next\/navigation['"]/g;
    for (const file of allPageFiles) {
      const content = readFileSync(file, "utf-8");
      for (const match of content.matchAll(pattern)) {
        if (!isInsideTemplateLiteral(content, match.index!)) {
          violations.push(file);
          break;
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it("BookmarkContext をインポートしていない（削除済み）", () => {
    const violations: string[] = [];
    for (const file of allPageFiles) {
      const content = readFileSync(file, "utf-8");
      if (content.includes("BookmarkContext")) {
        violations.push(file);
      }
    }
    expect(violations).toEqual([]);
  });

  it('"use client" ディレクティブが不要（Vite プロジェクト）', () => {
    const violations: string[] = [];
    for (const file of allPageFiles) {
      const content = readFileSync(file, "utf-8");
      // ファイルの最初の行が "use client" の場合のみ検出
      const firstLine = content.split("\n")[0].trim();
      if (firstLine === '"use client";' || firstLine === "'use client';") {
        violations.push(file);
      }
    }
    expect(violations).toEqual([]);
  });
});

describe("navigate/href パスのプレフィックス検証", () => {
  // 各マニュアルのページファイルが、自マニュアルのプレフィックス付きパスを使っているか
  const manualDirs = ["react", "git", "threejs", "claude-mux"] as const;

  for (const manualId of manualDirs) {
    it(`${manualId} ページの navigate() パスに /${manualId} プレフィックスがある`, () => {
      const manualDir = join(PAGES_DIR, manualId);
      const files = getAllTsxFiles(manualDir);
      const violations: string[] = [];

      for (const file of files) {
        const content = readFileSync(file, "utf-8");
        // navigate('/path') パターンを検出
        const navigateMatches = content.matchAll(
          /navigate\(['"]\/([^'"]+)['"]\)/g,
        );
        for (const match of navigateMatches) {
          const path = "/" + match[1];
          // テンプレートリテラル内のコード例は除外
          if (isInsideTemplateLiteral(content, match.index!)) continue;
          if (!path.startsWith(`/${manualId}`)) {
            violations.push(`${file}: navigate('${path}') にプレフィックスなし`);
          }
        }
      }
      expect(violations).toEqual([]);
    });

    it(`${manualId} ページの href= パスに /${manualId} プレフィックスがある`, () => {
      const manualDir = join(PAGES_DIR, manualId);
      const files = getAllTsxFiles(manualDir);
      const violations: string[] = [];

      for (const file of files) {
        const content = readFileSync(file, "utf-8");
        // href="/path" パターンを検出（# アンカーと外部 URL は除外）
        const hrefMatches = content.matchAll(
          /href=["']\/([a-z][^"'#]*?)["']/g,
        );
        for (const match of hrefMatches) {
          const path = "/" + match[1];
          // ランディングページ "/" へのリンクは許可
          if (path === "/") continue;
          // テンプレートリテラル内のコード例は除外
          if (isInsideTemplateLiteral(content, match.index!)) continue;
          // HTML エンティティで囲まれたインライン例（&lt;a href="..."&gt; 等）は除外
          const lineStart = content.lastIndexOf("\n", match.index!) + 1;
          const lineEnd = content.indexOf("\n", match.index!);
          const line = content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
          if (line.includes("&lt;") || line.includes("&gt;")) continue;
          if (!path.startsWith(`/${manualId}`)) {
            violations.push(`${file}: href="${path}" にプレフィックスなし`);
          }
        }
      }
      expect(violations).toEqual([]);
    });
  }
});

describe("searchIndex の整合性", () => {
  it("searchIndex の全パスが navigation に存在する", async () => {
    const { searchIndex } = await import("./searchIndex");
    const indexPaths = Object.keys(searchIndex);
    const missingPaths = indexPaths.filter((p) => !validPaths.has(p));
    expect(missingPaths).toEqual([]);
  });
});
