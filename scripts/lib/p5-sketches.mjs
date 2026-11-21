// p5.jsマニュアルのページから、スケッチ・チャレンジ・プレビューの題名を取り出す共有部品。
//
// 実ブラウザで走らせる検査（scripts/check-p5-sketches.mjs）と、ブラウザを使わない検査
// （client/src/lib/p5-sketches.test.ts）が同じ取り出し方を使う。別々に持つと、
// 片方だけが拾うスケッチが出て「検査したつもり」の穴になる。

import fs from 'node:fs';
import path from 'node:path';
import { isP5Sketch } from '../../client/src/lib/preview.ts';

export const P5_PAGES_DIR = path.resolve(import.meta.dirname, '../../client/src/pages/p5js');

/** ディレクトリ以下の .tsx を名前順に返す */
export function listPageFiles(dir = P5_PAGES_DIR) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listPageFiles(full));
    else if (entry.name.endsWith('.tsx')) out.push(full);
  }
  return out.sort();
}

/** TSXのテンプレートリテラルに書かれた文字列を、実行時の文字列に戻す */
function unescapeTemplate(raw) {
  return raw.replace(/\\`/g, '`').replace(/\\\$/g, '$').replace(/\\\\/g, '\\');
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

/** title="..." と title={"..."} のどちらの書き方からも題名を取り出す */
function titleOf(jsx) {
  const m = jsx.match(/\btitle=(?:"([^"]+)"|\{"((?:[^"\\]|\\.)+)"\})/);
  return m ? (m[1] ?? m[2]) : '';
}

function stringItems(arrayBody) {
  return [...arrayBody.matchAll(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1] ?? m[2]);
}

/** <CodingChallenge ... /> のprops（題名・初期コード・答え・キーワード・ヒント）を取り出す */
export function extractChallenges(src) {
  const challenges = [];
  const pattern = /<CodingChallenge\b/g;
  let m;
  while ((m = pattern.exec(src)) !== null) {
    const end = src.indexOf('/>\n', m.index);
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
    const end = src.indexOf('/>', m.index);
    const body = src.slice(m.index, end === -1 ? undefined : end);
    titles.push({ line: lineOf(src, m.index), title: titleOf(body) });
  }
  return titles;
}
