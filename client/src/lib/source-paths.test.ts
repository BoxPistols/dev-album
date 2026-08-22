import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { pages } from "./navigation";
import { resolvePagePathFromFile, toSlug } from "./source-paths";
import { GENERATED_SOURCES } from "../data/sources.generated";

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_TSX = resolve(HERE, "../App.tsx");

/**
 * App.tsx から「ページのソースファイル → ルート」の実際の対応を読み出す。
 * これが導出規則の答え合わせに使う一次情報。対応表を手で持たずに済ませるため、
 * ルート定義そのものを読む。
 */
function readRoutesFromApp(): Map<string, string> {
  const source = readFileSync(APP_TSX, "utf8");
  const componentToFile = new Map<string, string>();
  for (const m of source.matchAll(
    /const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\("\.\/([^"]+)"\)\)/g,
  )) {
    componentToFile.set(m[1], `client/src/${m[2]}.tsx`);
  }
  const fileToRoute = new Map<string, string>();
  for (const m of source.matchAll(
    /<Route\s+path="([^"]+)"\s+component=\{(\w+)\}/g,
  )) {
    const file = componentToFile.get(m[2]);
    // 同じファイルに複数のルートが刺さる場合（旧 URL の転送）は最初の 1 本を正とする
    if (file && !fileToRoute.has(file)) fileToRoute.set(file, m[1]);
  }
  return fileToRoute;
}

/** 出典が指しているソースファイル（重複を除く） */
const referencedFiles = [
  ...new Set(GENERATED_SOURCES.flatMap((s) => s.usedByFiles ?? [])),
];

describe("toSlug", () => {
  it("PascalCase を kebab-case にする", () => {
    expect(toSlug("TokenOptimization")).toBe("token-optimization");
    expect(toSlug("Reactivity")).toBe("reactivity");
    expect(toSlug("Next15Features")).toBe("next15-features");
    expect(toSlug("WSL2")).toBe("wsl2");
    expect(toSlug("MCPSetup")).toBe("mcp-setup");
  });
});

describe("resolvePagePathFromFile", () => {
  it("ディレクトリ構成がそのまま URL のもの", () => {
    expect(
      resolvePagePathFromFile("client/src/pages/vue/basics/PropsEmits.tsx"),
    ).toBe("/vue/basics/props-emits");
    expect(
      resolvePagePathFromFile(
        "client/src/pages/git/github-actions/SecretsPermissions.tsx",
      ),
    ).toBe("/git/github-actions/secrets-permissions");
  });

  it("綴りの区切りだけが違うもの", () => {
    expect(
      resolvePagePathFromFile("client/src/pages/api/openapi/WhatIsOpenApi.tsx"),
    ).toBe("/api/openapi/what-is-openapi");
    expect(
      resolvePagePathFromFile(
        "client/src/pages/claude-code/ai-coding-agents/OpenAiCodex.tsx",
      ),
    ).toBe("/claude-code/ai-coding-agents/openai-codex");
  });

  it("セクションのディレクトリ名が URL と違うもの", () => {
    expect(
      resolvePagePathFromFile(
        "client/src/pages/claude-code/multi-ai-architecture/DesignMd.tsx",
      ),
    ).toBe("/claude-code/multi-ai/design-md");
    expect(
      resolvePagePathFromFile(
        "client/src/pages/claude-code/cicd-headless/GitHubActions.tsx",
      ),
    ).toBe("/claude-code/ci-cd/github-actions");
  });

  it("コンポーネント名がディレクトリ名・マニュアル名を繰り返しているもの", () => {
    expect(
      resolvePagePathFromFile("client/src/pages/react/mui/MuiIntro.tsx"),
    ).toBe("/react/mui/intro");
    expect(
      resolvePagePathFromFile(
        "client/src/pages/react/react19/React19Features.tsx",
      ),
    ).toBe("/react/react19/features");
    expect(
      resolvePagePathFromFile("client/src/pages/api/practice/VueApi.tsx"),
    ).toBe("/api/practice/vue");
  });

  it("ページ以外・マニュアル配下でないものは解決しない", () => {
    expect(resolvePagePathFromFile("client/src/lib/navigation.ts")).toBe(
      undefined,
    );
    expect(resolvePagePathFromFile("client/src/pages/Landing.tsx")).toBe(
      undefined,
    );
    expect(
      resolvePagePathFromFile("client/src/pages/react/nope/Missing.tsx"),
    ).toBe(undefined);
  });

  it("解決した path はすべて navigation.ts に実在する", () => {
    const known = new Set(pages.map((p) => p.path));
    for (const file of referencedFiles) {
      const path = resolvePagePathFromFile(file);
      if (!path) continue;
      expect(known.has(path), `${file} → ${path} が navigation に無い`).toBe(
        true,
      );
    }
  });

  it("解決した path が App.tsx の実際のルートと食い違わない", () => {
    // 出典が別ページに付く事故を防ぐ検査。解けない（undefined）ことは許すが、
    // 違うページを指すことは許さない。
    const actual = readRoutesFromApp();
    expect(actual.size).toBeGreaterThan(300);
    for (const file of referencedFiles) {
      const path = resolvePagePathFromFile(file);
      if (!path) continue;
      expect(path, `${file} の解決先がルート定義と違う`).toBe(actual.get(file));
    }
  });

  it("出典が指すファイルの大半を解決できる", () => {
    // 規則で解けるのはコンポーネント名と URL に対応があるものだけ。
    // ここが大きく下がったら、規則の追加ではなくルート命名の見直しを検討する。
    const resolved = referencedFiles.filter((f) => resolvePagePathFromFile(f));
    expect(referencedFiles.length).toBeGreaterThan(50);
    expect(resolved.length / referencedFiles.length).toBeGreaterThan(0.9);
  });
});
