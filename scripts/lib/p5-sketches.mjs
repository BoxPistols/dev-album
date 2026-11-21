// p5.jsマニュアルのページから、スケッチ・チャレンジ・プレビューの題名を取り出す共有部品。
//
// 実ブラウザで走らせる検査（scripts/check-p5-sketches.mjs）と、ブラウザを使わない検査
// （client/src/lib/p5-sketches.test.ts）が同じ取り出し方を使う。別々に持つと、
// 片方だけが拾うスケッチが出て「検査したつもり」の穴になる。

import fs from 'node:fs';
import path from 'node:path';
import { isP5Sketch } from '../../client/src/lib/preview.ts';

export const P5_PAGES_DIR = path.resolve(import.meta.dirname, '../../client/src/pages/p5js');

/** ディレクトリ以下の.tsxを名前順に返す */
export function listPageFiles(dir = P5_PAGES_DIR) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listPageFiles(full));
    else if (entry.name.endsWith('.tsx')) out.push(full);
  }
  return out.sort();
}

/**
 * TSXのテンプレートリテラルに書かれた文字列を、実行時の文字列に戻す（cooked値）。
 * JavaScriptのエスケープの規則に合わせる。`\n`は改行、`\\n`はバックスラッシュとn。
 * ソースを実行せずに戻すため、${...}の埋め込みは扱わない（教材のスケッチは使わない）
 */
export function unescapeTemplate(raw) {
  const simple = { n: '\n', t: '\t', r: '\r', b: '\b', f: '\f', v: '\v', 0: '\0' };
  return raw.replace(
    /\\(u\{[0-9a-fA-F]+\}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|\r\n|[\s\S])/g,
    (_, esc) => {
      if (esc.length > 1 && esc[0] === 'u') {
        const hex = esc[1] === '{' ? esc.slice(2, -1) : esc.slice(1);
        return String.fromCodePoint(parseInt(hex, 16));
      }
      if (esc.length > 1 && esc[0] === 'x') return String.fromCharCode(parseInt(esc.slice(1), 16));
      // 行末のバックスラッシュは、改行ごと消える（行の継続）
      if (esc === '\r\n' || esc === '\n' || esc === '\r' || esc === '\u2028' || esc === '\u2029') return '';
      return Object.prototype.hasOwnProperty.call(simple, esc) ? simple[esc] : esc;
    },
  );
}

function lineOf(src, index) {
  return src.slice(0, index).split('\n').length;
}

/** ファイル中のテンプレートリテラルから、p5のスケッチ（setup()とcreateCanvas()を持つもの）を取り出す */
export function extractSketches(src) {
  const sketches = [];
  const pattern = /`((?:[^`\\]|\\[\s\S])*)`/g;
  let m;
  while ((m = pattern.exec(src)) !== null) {
    const code = unescapeTemplate(m[1]);
    if (isP5Sketch(code)) sketches.push({ code, line: lineOf(src, m.index) });
  }
  return sketches;
}

/** title="..."とtitle={"..."}のどちらの書き方からも題名を取り出す */
function titleOf(jsx) {
  const m = jsx.match(/\btitle=(?:"([^"]+)"|\{"((?:[^"\\]|\\.)+)"\})/);
  return m ? (m[1] ?? m[2]) : '';
}

function stringItems(arrayBody) {
  return [...arrayBody.matchAll(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1] ?? m[2]);
}

/**
 * JSX要素の開始位置から、その要素を閉じる「/>」の位置を返す。
 * 属性の中の文字列（'...' "..." `...`）と波括弧の中は読み飛ばす。
 * 単純にindexOf('/>')で探すと、コード例の文字列に含まれる「/>」で途中で切れる
 */
function findSelfClosingEnd(src, start) {
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') {
      for (i++; i < src.length && src[i] !== c; i++) {
        if (src[i] === '\\') i++;
      }
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') depth--;
    else if (depth === 0 && c === '/' && src[i + 1] === '>') return i;
  }
  return -1;
}

/** <CodingChallenge ... /> のprops（題名・初期コード・答え・キーワード・ヒント）を取り出す */
export function extractChallenges(src) {
  const challenges = [];
  const pattern = /<CodingChallenge\b/g;
  let m;
  while ((m = pattern.exec(src)) !== null) {
    const end = findSelfClosingEnd(src, m.index);
    const body = src.slice(m.index, end === -1 ? undefined : end);
    challenges.push({
      line: lineOf(src, m.index),
      title: titleOf(body),
      initialCode: unescapeTemplate(body.match(/initialCode=\{`([\s\S]*?)`\}/)?.[1] ?? ''),
      answer: unescapeTemplate(body.match(/answer=\{`([\s\S]*?)`\}/)?.[1] ?? ''),
      keywords: stringItems(body.match(/keywords=\{\[([\s\S]*?)\]\}/)?.[1] ?? ''),
      hints: stringItems(body.match(/hints=\{\[([\s\S]*?)\]\}/)?.[1] ?? ''),
    });
  }
  return challenges;
}

/** <CodePreview ... /> の題名を取り出す。題名が無いものは空文字で返す */
export function extractPreviewTitles(src) {
  const titles = [];
  const pattern = /<CodePreview\b/g;
  let m;
  while ((m = pattern.exec(src)) !== null) {
    const end = findSelfClosingEnd(src, m.index);
    const body = src.slice(m.index, end === -1 ? undefined : end);
    titles.push({ line: lineOf(src, m.index), title: titleOf(body) });
  }
  return titles;
}
