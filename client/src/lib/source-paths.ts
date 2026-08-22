// 出典レジストリの usedByFiles（リポジトリ相対のソースパス）を、navigation.ts の
// path（読者が見る URL）へ解決する。
//
// 監査から機械生成した出典は「どのファイルで使ったか」しか持たない。ページに出す
// には URL が要るが、対応表を手で持つと App.tsx のルート定義と二重管理になり、
// 片方だけ直った状態で腐る。ここでは規則で導出し、導出結果が App.tsx の実際の
// ルートと一致することを source-paths.test.ts が全件で突き合わせる。
//
// 規則で解けないファイル（コンポーネント名と URL の綴りが独立しているもの）は
// undefined を返す。推測で近いページに寄せると、出典が別ページに付く事故になる。

import { pages, type PageInfo } from "./navigation";

const PAGES_PREFIX = "client/src/pages/";

/** PascalCase のコンポーネント名を URL スラッグの形に寄せる（TokenOptimization → token-optimization） */
export function toSlug(componentName: string): string {
  return componentName
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * 比較用の正規化。英数字以外を落として大小を無視する。
 * コンポーネント名からは語の切れ目が一意に決まらないため（OpenApi → open-api、
 * 実際の URL は openapi）、区切りを無視して突き合わせる。
 */
function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

interface FileParts {
  manualId: string;
  /** マニュアルとファイル名の間のディレクトリ（セクションに相当） */
  dirs: string[];
  /** 拡張子を除いたファイル名 */
  componentName: string;
}

function parseFile(file: string): FileParts | undefined {
  if (!file.startsWith(PAGES_PREFIX) || !file.endsWith(".tsx"))
    return undefined;
  const segments = file.slice(PAGES_PREFIX.length, -".tsx".length).split("/");
  // マニュアル直下に置かれた単体ページ（/policy/... など）は規則の対象外
  if (segments.length < 2) return undefined;
  return {
    manualId: segments[0],
    dirs: segments.slice(1, -1),
    componentName: segments[segments.length - 1],
  };
}

function lastSegment(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1);
}

/** slug に一致するページが 1 件だけならその path を返す。複数該当は「解けなかった」扱い */
function uniqueMatch(candidates: PageInfo[], slug: string): string | undefined {
  const wanted = normalize(slug);
  const hit = candidates.filter(
    (p) => normalize(lastSegment(p.path)) === wanted,
  );
  return hit.length === 1 ? hit[0].path : undefined;
}

/**
 * コンポーネント名が持つ冗長な語を落とす。
 * - 先頭がディレクトリ名の頭を繰り返している（storybook/SbSetup ではなく mui/MuiIntro の形）
 * - 末尾がマニュアル名を繰り返している（api/practice/VueApi）
 * どちらも URL 側では省かれることがあるため、落としてから照合し直す。
 */
function trimRedundantAffix(
  slug: string,
  parts: FileParts,
): string | undefined {
  const tokens = slug.split("-");
  if (tokens.length < 2) return undefined;

  const dir = parts.dirs[parts.dirs.length - 1];
  if (dir && normalize(dir).startsWith(normalize(tokens[0]))) {
    return tokens.slice(1).join("-");
  }
  if (normalize(tokens[tokens.length - 1]) === normalize(parts.manualId)) {
    return tokens.slice(0, -1).join("-");
  }
  return undefined;
}

/**
 * ソースファイルのパスから、そのページの navigation path を求める。
 * 解決できない場合は undefined（出典を出さない）。
 *
 * @param file リポジトリ相対のパス（例: client/src/pages/vue/basics/PropsEmits.tsx）
 * @param candidates 突き合わせ先のページ一覧。既定は navigation.ts の pages
 */
export function resolvePagePathFromFile(
  file: string,
  candidates: PageInfo[] = pages,
): string | undefined {
  const parts = parseFile(file);
  if (!parts) return undefined;

  const slug = toSlug(parts.componentName);
  const directory = [parts.manualId, ...parts.dirs].join("/");

  // 1. ディレクトリ構成がそのまま URL になっている（大多数）
  const exact = `/${directory}/${slug}`;
  if (candidates.some((p) => p.path === exact)) return exact;

  const inManual = candidates.filter((p) => p.manualId === parts.manualId);
  const sameDirectory = inManual.filter(
    (p) => p.path.slice(0, p.path.lastIndexOf("/")) === `/${directory}`,
  );

  // 2. 同じディレクトリで、綴りの区切りだけが違う（WhatIsOpenApi → what-is-openapi）
  const bySpelling = uniqueMatch(sameDirectory, slug);
  if (bySpelling) return bySpelling;

  // 3. セクションのディレクトリ名だけが URL と違う（multi-ai-architecture → multi-ai）
  const byManual = uniqueMatch(inManual, slug);
  if (byManual) return byManual;

  // 4. 冗長な語を落として 2・3 をやり直す（MuiIntro → intro）
  const trimmed = trimRedundantAffix(slug, parts);
  if (!trimmed) return undefined;
  return uniqueMatch(sameDirectory, trimmed) ?? uniqueMatch(inManual, trimmed);
}
