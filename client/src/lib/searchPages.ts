import type { PageInfo } from "./navigation";

export interface PageSearchHit<T extends PageInfo = PageInfo> {
  page: T;
  matchedKeywords: string[];
}

/** 入力を検索語に分ける。前後の空白と全角空白を落とし、空の語は捨てる */
export function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[\s　]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
}

/**
 * ページをタイトルとキーワードで検索する。
 *
 * 語ごとに「タイトルかキーワードのどれかに含まれる」を判定し、全部の語を満たす
 * ページだけ返す（AND）。以前は入力全体を1つの部分文字列として比べていたので、
 * 「useEffectクリーンアップ」のように2語で絞ると0件になり、末尾に空白が
 * 1つ付いただけでも0件になっていた。
 */
export function searchPages<T extends PageInfo>(
  pagesToSearch: readonly T[],
  index: Record<string, readonly string[]>,
  query: string,
): PageSearchHit<T>[] {
  const words = tokenizeQuery(query);
  if (words.length === 0) return [];
  return pagesToSearch.flatMap((page) => {
    const title = page.title.toLowerCase();
    const keywords = index[page.path] ?? [];
    const everyWordHits = words.every(
      (w) =>
        title.includes(w) ||
        keywords.some((kw) => kw.toLowerCase().includes(w)),
    );
    if (!everyWordHits) return [];
    const matchedKeywords = keywords.filter((kw) => {
      const lower = kw.toLowerCase();
      return words.some((w) => lower.includes(w));
    });
    return [{ page, matchedKeywords }];
  });
}
