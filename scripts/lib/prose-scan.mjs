// JSX 本文の外にある散文を数える。
//
// なぜ要るか: 2026-08-23 の網羅性検証で見つかった抽出漏れ 44 件は置き場所に偏っていた。
// ファイル先頭の const 配列に切り出したカードデータ、InfoBox と Quiz の explanation、
// 表のセル、ReferenceLinks の description。どれも <p> や <h2> の中ではないので、
// 「ページを読んで主張を拾う」やり方だと視界から外れやすい。
// 出典: docs/audits/2026-08-23-extraction-completeness.md の
// 「JSX 本文の外を走査対象に含める」。
//
// ここが数えるのは「主張の件数」ではなく「主張が置かれうる散文の個数」である。
// 抽出の網が届いていたかを見るための代理指標で、1 個が 1 主張とは限らない。
// 数の大小ではなく「0 か、0 でないか」で読むこと。
//
// 構文解析ではなく走査で行う。TypeScript 7 の npm パッケージは Go 実装で
// JS の Compiler API（ts.createSourceFile 等）を提供しないため、AST は使えない。
// 代わりに、文字列リテラルの位置と <td> / <InfoBox> の範囲を取り、
// 1 つの文字列が 2 つの区分に数えられないよう位置で重複を排除する。

/** 散文を持たないキー（クラス名・URL・識別子の類） */
const NON_PROSE_KEYS = new Set([
  "className",
  "class",
  "url",
  "href",
  "src",
  "id",
  "key",
  "path",
  "to",
  "icon",
  "color",
  "type",
  "lang",
  "language",
  "variant",
  "size",
  "name",
  "value",
  "code",
  "initialCode",
  "solution",
  "keywords",
  "step",
  "level",
  "date",
  "category",
  "manualId",
  "sectionId",
]);

/**
 * 主張が書かれうる散文か。
 *
 * 短い語・URL・パス・Tailwind のクラス列を落とす。日本語を含むか、
 * 空白で区切られた語が 4 つ以上あるものだけを散文とみなす。
 */
export function isProse(raw) {
  const t = raw.trim();
  if (t.length < 12) return false;
  if (/^https?:\/\//.test(t)) return false;
  if (/^[\w./@-]+$/.test(t)) return false;
  const hasJa = /[ぁ-んァ-ヶ一-龥]/.test(t);
  if (
    !hasJa &&
    /(?:^|\s)(?:text|bg|border|flex|grid|rounded|shadow|hover|dark|md|sm|lg|w|h|p|m)[-:]/.test(
      t,
    )
  ) {
    return false;
  }
  return hasJa || t.split(/\s+/).length >= 4;
}

/** JSX の子要素からテキストだけを取り出す（タグと {式} を落とす） */
function jsxInnerText(fragment) {
  return fragment
    .replace(/\{(?:[^{}]|\{[^{}]*\})*\}/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** `<tag ...>...</tag>` の中身と位置を列挙する。入れ子は想定しない */
function elementRanges(source, tagPattern) {
  const re = new RegExp(
    `<(${tagPattern})(\\s[^>]*)?>([\\s\\S]*?)<\\/\\1>`,
    "g",
  );
  const out = [];
  let m;
  while ((m = re.exec(source))) {
    out.push({
      start: m.index,
      end: m.index + m[0].length,
      attrs: m[2] ?? "",
      inner: m[3],
    });
  }
  return out;
}

const inAnyRange = (ranges, pos) =>
  ranges.some((r) => pos >= r.start && pos < r.end);

/** ファイル先頭（コンポーネント定義より前）の終端 */
function moduleTopEnd(source) {
  const m = /^export default /m.exec(source);
  return m ? m.index : source.length;
}

const EMPTY = () => ({
  constArray: 0,
  explanation: 0,
  infoBox: 0,
  tableCell: 0,
  referenceDesc: 0,
});

/**
 * 1 ファイルを走査し、置き場所ごとの散文の個数を返す。
 *
 * @param {string} source ソースコード
 * @param {string} _fileName 呼び出し側の都合で受けるが走査には使わない
 * @param {(kind: string, text: string, line: number) => void} [onHit] 明細が要るときに渡す
 */
export function scanProseOutsideJsxBody(source, _fileName, onHit) {
  const counts = EMPTY();
  const lineOf = (pos) => source.slice(0, pos).split("\n").length;
  const hit = (kind, text, pos) => {
    if (!isProse(text)) return;
    counts[kind] += 1;
    if (onHit) onHit(kind, text.trim(), lineOf(pos));
  };

  const cells = elementRanges(source, "td|th");
  const infoBoxes = elementRanges(source, "InfoBox");
  const topEnd = moduleTopEnd(source);

  // 1. 文字列リテラルを位置つきで拾い、キーと位置で区分を決める。
  //    1 つのリテラルが 2 つの区分に数えられないよう、区分は排他にする。
  const literal =
    /(?:\b([A-Za-z_$][\w$]*)\s*(?::|=\{?)\s*)?(['"])((?:\\.|(?!\2)[^\\])*?)\2/g;
  let m;
  while ((m = literal.exec(source))) {
    const key = m[1] ?? null;
    const text = m[3];
    const pos = m.index;
    if (key && NON_PROSE_KEYS.has(key)) continue;
    if (key === "explanation") {
      hit("explanation", text, pos);
    } else if (pos < topEnd && key !== null) {
      // ファイル先頭の const に切り出したカード / 表 / ステップのデータ。
      // description を持つものもここに入れる（置き場所で分けるのが目的なので）
      hit("constArray", text, pos);
    } else if (inAnyRange(cells, pos)) {
      hit("tableCell", text, pos);
    } else if (inAnyRange(infoBoxes, pos)) {
      hit("infoBox", text, pos);
    } else if (key === "description") {
      // JSX 内の description は ReferenceLinks の links[] でほぼ占められる
      hit("referenceDesc", text, pos);
    }
  }

  // 2. JSX のテキストノード。文字列リテラルではないので上の走査には出てこない
  for (const cell of cells)
    hit("tableCell", jsxInnerText(cell.inner), cell.start);
  // title 属性は上の文字列リテラル走査が InfoBox の範囲内として既に拾っている
  for (const box of infoBoxes)
    hit("infoBox", jsxInnerText(box.inner), box.start);

  return { ...counts, total: Object.values(counts).reduce((a, b) => a + b, 0) };
}

export const emptyProseCounts = () => ({ ...EMPTY(), total: 0 });
