/**
 * p5.jsマニュアルのスケッチの静的検査。
 *
 * 実ブラウザでの実行はpnpm check:p5が見る（描画時のエラーはそちらでしか分からない）。
 * ここではブラウザを使わずに済むものだけを見る。構文エラー、プレビューの前提を崩す書き方、
 * チャレンジの答えとヒントの食い違い。
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fuzzyCheck } from "@/components/CodingChallenge";
import {
  P5_PAGES_DIR,
  extractChallenges,
  extractPreviewTitles,
  extractSketches,
  listPageFiles,
  unescapeTemplate,
  // @ts-expect-error - .mjsに型定義は無い
} from "../../../scripts/lib/p5-sketches.mjs";

interface Sketch {
  code: string;
  line: number;
}

interface Challenge {
  line: number;
  title: string;
  initialCode: string;
  answer: string;
  keywords: string[];
  hints: string[];
}

interface PreviewTitle {
  line: number;
  title: string;
}

const files = (listPageFiles() as string[]).map((file) => {
  const src = fs.readFileSync(file, "utf8");
  return {
    name: path.relative(P5_PAGES_DIR as string, file),
    sketches: extractSketches(src) as Sketch[],
    challenges: extractChallenges(src) as Challenge[],
    previewTitles: extractPreviewTitles(src) as PreviewTitle[],
  };
});

describe("p5.jsマニュアルのスケッチ", () => {
  it("検査対象のスケッチを拾えている（0件は走査の事故）", () => {
    const total = files.reduce((n, f) => n + f.sketches.length, 0);
    expect(total).toBeGreaterThan(0);
  });

  it("全ページがスケッチを1つ以上持つ", () => {
    // このマニュアルは動くスケッチを中心に組み立てる（specs/p5js-manual.md）
    const empty = files.filter((f) => f.sketches.length === 0).map((f) => f.name);
    expect(empty).toEqual([]);
  });

  for (const file of files) {
    if (file.sketches.length === 0) continue;

    it(`[${file.name}] のスケッチ（${file.sketches.length}個）が構文として正しい`, () => {
      for (const { code, line } of file.sketches) {
        // 空欄（___）は識別子として読めるので、埋める前のチャレンジもそのまま検査できる
        expect(() => new vm.Script(code), `${file.name}:${line}`).not.toThrow();
      }
    });

    it(`[${file.name}] のスケッチがプレビューで使えない書き方をしていない`, () => {
      for (const { code, line } of file.sketches) {
        const where = `${file.name}:${line}`;
        // p5.js 2.x系にpreload()は無い。async setup()とawaitで読み込む
        expect(/\bfunction\s+preload\s*\(/.test(code), `${where}: preload()`).toBe(false);
        // プレビューのCSPは外部ホストへの通信を遮断する
        expect(
          /\bload(Image|Font|JSON|Strings|Table|Sound|Model)\s*\(\s*['"]https?:/.test(code),
          `${where}: 外部URLの読み込み`,
        ).toBe(false);
        // 空欄は空文字として宣言される。ループの増分に置くと値が進まず、タブが固まる
        expect(
          /for\s*\([^)]*[+\-*/]=\s*___/.test(code) || /while\s*\([^)]*___/.test(code),
          `${where}: ループの増分・条件に空欄`,
        ).toBe(false);
        // ブロックコメントは編集欄のハイライトと相性が悪いので、行コメントに統一する
        expect(code.includes("/*"), `${where}: ブロックコメント`).toBe(false);
      }
    });
  }
});

describe("p5.jsマニュアルのプレビューの題名", () => {
  // 題名は下書きの保存先のキーになる（useSketchDraft）。無いと保存されず、
  // 同じページで重なると別のスケッチの下書きが開く
  for (const file of files) {
    if (file.previewTitles.length === 0) continue;

    it(`[${file.name}] のCodePreviewが、ページの中で一意な題名を持つ`, () => {
      const untitled = file.previewTitles.filter((p) => p.title === "").map((p) => p.line);
      expect(untitled, `${file.name}: 題名が無い行`).toEqual([]);
      const titles = file.previewTitles.map((p) => p.title);
      const duplicated = titles.filter((t, i) => titles.indexOf(t) !== i);
      expect(duplicated, `${file.name}: 重複している題名`).toEqual([]);
    });
  }
});

describe("p5.jsマニュアルのチャレンジ", () => {
  it("検査対象のチャレンジを拾えている（0件は走査の事故）", () => {
    const total = files.reduce((n, f) => n + f.challenges.length, 0);
    expect(total).toBeGreaterThan(0);
  });

  for (const file of files) {
    for (const challenge of file.challenges) {
      const where = `${file.name}:${challenge.line}「${challenge.title}」`;

      it(`${where} の答え・キーワード・ヒントが食い違っていない`, () => {
        const { initialCode, answer, keywords, hints } = challenge;
        expect(initialCode, "initialCodeを取り出せない").not.toBe("");
        expect(answer, "answerを取り出せない").not.toBe("");
        expect(/\b___\b/.test(initialCode), "初期コードに空欄が無い").toBe(true);
        expect(/\b___\b/.test(answer), "答えに空欄が残っている").toBe(false);

        // キーワード対応ヒント（1 keyword = 1 hint。CLAUDE.md）
        expect(keywords.length, "キーワードが無い").toBeGreaterThan(0);
        expect(keywords.length, "キーワードが5個以上（問題を分ける合図）").toBeLessThan(5);
        expect(hints.length, "ヒントの数がキーワードの数と違う").toBe(keywords.length);

        // 答えは正解と判定され、手を付けていない初期コードは正解にならない
        expect(fuzzyCheck(answer, answer, keywords, initialCode), "答えが正解にならない").toBe(true);
        expect(fuzzyCheck(initialCode, answer, keywords, initialCode), "初期コードのまま正解になる").toBe(false);

        // 答えと初期コードの差は、空欄を埋めた行だけ
        const initialLines = initialCode.split("\n");
        const answerLines = answer.split("\n");
        expect(answerLines.length, "初期コードと答えの行数が違う").toBe(initialLines.length);
        const strayLines = initialLines.filter(
          (line, i) => line !== answerLines[i] && !/\b___\b/.test(line),
        );
        expect(strayLines, "空欄の無い行が、初期コードと答えで違う").toEqual([]);

        // 各キーワードは、空欄を埋めた行に実際に現れる
        const filled = answerLines.filter((line, i) => line !== initialLines[i]).join("\n");
        const missing = keywords.filter((keyword) => !filled.includes(keyword));
        expect(missing, "空欄を埋めた行に現れないキーワード").toEqual([]);
      });
    }
  }
});

describe("JSXからpropsを取り出す部品", () => {
  it("属性の文字列に「/>」があっても、要素の途中で切らない", () => {
    const src = [
      "<CodePreview",
      "  code={`function App() { return <br />; }`}",
      '  title="後ろにある題名"',
      "/>",
      "<CodingChallenge",
      '  initialCode={`const a = "<img />";\nlet b = ___;`}',
      '  answer={`const a = "<img />";\nlet b = 1;`}',
      '  title="空欄の問題"',
      '  keywords={["1"]}',
      '  hints={["1を入れる"]}',
      "/>",
    ].join("\n");
    expect((extractPreviewTitles(src) as PreviewTitle[]).map((p) => p.title)).toEqual([
      "後ろにある題名",
    ]);
    const [challenge] = extractChallenges(src) as Challenge[];
    expect(challenge.title).toBe("空欄の問題");
    expect(challenge.keywords).toEqual(["1"]);
    expect(challenge.hints).toEqual(["1を入れる"]);
  });
});

describe("テンプレートリテラルの復元", () => {
  // 実行時（JavaScriptが読むとき）と同じ文字列に戻す。違うと、正しいスケッチを構文エラーと判定する
  const cooked = (raw: string) => unescapeTemplate(raw) as string;

  it("\\nは改行に、\\\\nはバックスラッシュとnに戻す", () => {
    expect(cooked("a\\nb")).toBe("a\nb");
    expect(cooked("a\\\\nb")).toBe("a\\nb");
  });

  it("バッククォート・ドル記号・Unicodeのエスケープを戻す", () => {
    expect(cooked("\\`x\\`")).toBe("`x`");
    expect(cooked("\\${a}")).toBe("${a}");
    expect(cooked("\\u0041\\u{1F600}\\x41")).toBe("A\u{1F600}A");
  });

  it("文の間に\\nを書いたスケッチを、構文として正しいと判定する", () => {
    const [sketch] = extractSketches(
      "const S = `function setup() { createCanvas(1, 1); }\\nfunction draw() {}`;",
    ) as Sketch[];
    expect(() => new vm.Script(sketch.code)).not.toThrow();
    expect(sketch.code).toContain("}\nfunction draw");
  });
});
