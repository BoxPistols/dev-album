/**
 * fuzzyCheck（合格判定ロジック）のユニットテスト
 * CodingChallenge.tsx から export された実関数を直接テスト
 */
import { describe, it, expect } from "vitest";
import { fuzzyCheck } from "@/components/CodingChallenge";

// ============================================================
// keywords ベースの判定
// ============================================================
describe("fuzzyCheck: keywords ベース", () => {
  const answer =
    "display: 'flex', alignItems: 'center', justifyContent: 'center'";

  it("全 keywords が含まれていれば正解", () => {
    const code =
      "display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'";
    expect(fuzzyCheck(code, answer, ["flex", "center"])).toBe(true);
  });

  it("keywords の一部が欠けていれば不正解", () => {
    const code = "display: 'flex', padding: '20px'";
    expect(fuzzyCheck(code, answer, ["flex", "center"])).toBe(false);
  });

  it("空白の違いは無視される", () => {
    const code = "  display:  'flex' ,  alignItems: 'center' ";
    expect(fuzzyCheck(code, answer, ["flex", "center"])).toBe(true);
  });

  it("穴埋め式: ___ を正しい値に置換すれば正解", () => {
    const userCode =
      "display: 'flex', alignItems: 'center', justifyContent: 'center'";
    expect(fuzzyCheck(userCode, answer, ["flex", "center"])).toBe(true);
  });

  it("穴埋め式: ___ のままだと不正解", () => {
    const userCode =
      "display: '___', alignItems: '___', justifyContent: 'center'";
    expect(fuzzyCheck(userCode, answer, ["flex", "center"])).toBe(false);
  });

  it("順序が違っても keywords が含まれていれば正解", () => {
    const code =
      "justifyContent: 'center', display: 'flex', alignItems: 'center'";
    expect(fuzzyCheck(code, answer, ["flex", "center"])).toBe(true);
  });
});

// ============================================================
// 差分ベース判定（initialCode 付き）
// ============================================================
describe("fuzzyCheck: 差分ベース判定", () => {
  const initialCode = 'display: "___",\nflex: 1,';
  const answer = 'display: "flex",\nflex: 1,';

  it("プリフィル部分の keyword は無視される", () => {
    // flex: 1 はプリフィル済み。ユーザーが display: "AAA" と入力
    const userCode = 'display: "AAA",\nflex: 1,';
    expect(fuzzyCheck(userCode, answer, ["flex"], initialCode)).toBe(false);
  });

  it("ユーザーが正しく display: flex と入力すれば正解", () => {
    const userCode = 'display: "flex",\nflex: 1,';
    expect(fuzzyCheck(userCode, answer, ["flex"], initialCode)).toBe(true);
  });

  it("initialCode から何も変更していなければ不正解", () => {
    expect(fuzzyCheck(initialCode, answer, ["flex"], initialCode)).toBe(false);
  });

  it("initialCode なしの場合は従来の全文チェック（後方互換）", () => {
    const code = 'display: "AAA",\nflex: 1,';
    // initialCode なし → 全文に flex が含まれるので true（従来の動作）
    expect(fuzzyCheck(code, answer, ["flex"])).toBe(true);
  });
});

// ============================================================
// 完全一致
// ============================================================
describe("fuzzyCheck: 完全一致", () => {
  it("完全一致なら正解", () => {
    const code = "function App() { return <div>Hello</div>; }";
    expect(fuzzyCheck(code, code)).toBe(true);
  });

  it("空白のみの違いは正規化で一致", () => {
    const code = "function  App()  {  return  <div>Hello</div>;  }";
    const answer = "function App() { return <div>Hello</div>; }";
    expect(fuzzyCheck(code, answer)).toBe(true);
  });
});

// ============================================================
// TypeScript パターンマッチ
// ============================================================
describe("fuzzyCheck: TypeScript パターン", () => {
  const answer = "interface Props { name: string; age?: number; }";

  it("interface と型注釈が含まれていれば正解", () => {
    const code =
      "interface Props { name: string; age?: number; color: string; }";
    expect(fuzzyCheck(code, answer)).toBe(true);
  });

  it("interface がなければ不正解", () => {
    const code = "type Props = { name: string; }";
    expect(fuzzyCheck(code, answer)).toBe(false);
  });
});

// ============================================================
// 行ベースの部分一致（keywords なし、パターンなし）
// ============================================================
describe("fuzzyCheck: 行ベース部分一致", () => {
  const answer = "const a = 1; const b = 2; const c = 3; const d = 4;";

  it("50% 以上の行が一致すれば正解", () => {
    const code = "const a = 1; const b = 2; const c = 3; const x = 99;";
    expect(fuzzyCheck(code, answer)).toBe(true);
  });

  it("50% 未満だと不正解", () => {
    const code = "const x = 99; const y = 100;";
    expect(fuzzyCheck(code, answer)).toBe(false);
  });
});
