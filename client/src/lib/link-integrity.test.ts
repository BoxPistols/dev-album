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
          // 他マニュアルへの横断リンク（navigation に登録済みの有効パス）は許可
          if (!path.startsWith(`/${manualId}`) && !validPaths.has(path)) {
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

describe("announcements の整合性", () => {
  // お知らせの link は TOP から踏まれる導線なので、リンク先の実在を検査する。
  // navigation に無いが App.tsx に直接生えているルート（/announcements 等）も
  // 正当な行き先なので、両方を突き合わせ先にする。
  const APP_TSX = join(import.meta.dirname, "..", "App.tsx");
  const routePaths = new Set(
    [...readFileSync(APP_TSX, "utf8").matchAll(/<Route\s+path="([^"]+)"/g)].map(
      (m) => m[1],
    ),
  );

  it("お知らせのリンク先が実在する", async () => {
    const { ANNOUNCEMENTS } = await import("../data/announcements");
    const links = ANNOUNCEMENTS.map((a) => a.link).filter(
      (l): l is string => typeof l === "string",
    );
    // 0 件でも成功する検査を作らない
    expect(links.length).toBeGreaterThan(0);
    expect(routePaths.size).toBeGreaterThan(0);

    const missing = links.filter(
      (l) => !validPaths.has(l) && !routePaths.has(l),
    );
    expect(missing).toEqual([]);
  });

  it("画面に直書きした内部リンクの行き先が実在する", () => {
    // お知らせと同じ穴が、共有コンポーネントや教材以外のページにも空いていた。
    // サイドバーや LP のフッターに書いた href="/..." は誰も検査しておらず、
    // ルート名を変えると無言で 404 になる。列挙ではなく走査で拾う。
    const SRC = join(import.meta.dirname, "..");
    const targets = [
      ...getAllTsxFiles(join(SRC, "components")),
      // 教材ページはコード例に href を含むので、教材以外の直下ページだけを見る
      ...readdirSync(join(SRC, "pages"))
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => join(SRC, "pages", f)),
    ];

    const found: string[] = [];
    const missing: string[] = [];
    for (const file of targets) {
      const content = readFileSync(file, "utf8");
      for (const m of content.matchAll(/href="(\/[^"]*)"/g)) {
        // 教材コード例の中の href は対象外
        if (isInsideTemplateLiteral(content, m.index!)) continue;
        const href = m[1].split("#")[0].split("?")[0];
        if (href === "/") continue;
        found.push(`${file}: ${href}`);
        if (!validPaths.has(href) && !routePaths.has(href)) {
          missing.push(`${file}: ${href}`);
        }
      }
    }

    // 1 件も拾えていないなら走査が壊れている（0 件成功を作らない）
    expect(found.length).toBeGreaterThan(0);
    expect(missing).toEqual([]);
  });

  it("お知らせの id が重複せず、規定の書式に沿っている", async () => {
    const { ANNOUNCEMENTS } = await import("../data/announcements");
    const ids = ANNOUNCEMENTS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);

    const badIds = ids.filter((id) => !/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(id));
    expect(badIds).toEqual([]);

    const badDates = ANNOUNCEMENTS.filter(
      (a) => !/^\d{4}-\d{2}-\d{2}$/.test(a.date) || !a.id.startsWith(a.date),
    ).map((a) => a.id);
    expect(badDates).toEqual([]);
  });
});
