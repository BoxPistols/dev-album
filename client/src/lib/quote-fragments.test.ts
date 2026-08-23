import { describe, expect, it } from "vitest";

// 検査そのものを一度壊して赤を見るための単体テスト。
// scripts/check-quote-fragments.mjs は「文の途中で切れた引用」を拾う道具で、
// 拾い方を緩めると（散文の判定を広げる、機能語の一覧を削る）静かに 0 件になる。
// 実物の引用から取った文で、拾うものと拾わないものを固定しておく。
// @ts-expect-error - .mjs に型定義は無い。判定関数だけを読む
import { fragmentProblems } from "../../../scripts/check-quote-fragments.mjs";

const flag = (quote: string, claim = ""): string[] =>
  fragmentProblems(quote, claim) as string[];

describe("fragmentProblems", () => {
  it("機能語で終わる散文を拾う", () => {
    // docs/audits の実物。S3 のストレージクラスの説明が "If you" で切れている
    expect(flag("The default storage class. If you")).toContain(
      "末尾が機能語で終わる",
    );
    expect(flag("For advanced control, create an")).toContain(
      "末尾が機能語で終わる",
    );
    expect(flag("it will re-use an existing server on the")).toContain(
      "末尾が機能語で終わる",
    );
  });

  it("語の途中から始まる散文を拾う", () => {
    // 主語が落ちて「何が」sunset の対象外なのか引用の中で閉じていない
    expect(
      flag(
        "are not impacted by this sunset and will continue to be available to AWS customers",
        "AWS コンソール内のアシスタント / サンセットの対象外。継続提供される",
      ),
    ).toContain("先頭が語の途中から始まる");
    expect(
      flag(
        "if you neglect the six pillars of operational excellence,",
        "Well-Architected フレームワークは、AWS 上のシステムを点検するための設計指針です。",
      ),
    ).toContain("先頭が語の途中から始まる");
  });

  it("識別子・用語から始まる引用は拾わない", () => {
    // 用語の定義文は小文字始まりでも断片ではない。ここを緩めると 200 件超が偽陽性になる
    expect(
      flag(
        "useEffect is a React Hook that lets you synchronize a component with an external system.",
        "React 公式ドキュメントでも「useEffect は外部システムとの同期のためのもの」と強調されています。",
      ),
    ).toEqual([]);
    expect(
      flag(
        "prisma generate creates Prisma Client from the models and generator configuration in your schema.prisma file.",
        "クライアント生成が必要",
      ),
    ).toEqual([]);
  });

  it("文頭に立てる語から始まる引用は拾わない", () => {
    // 大文字始まりなら英語の文頭。This / It / We を継続語として拾わない
    expect(
      flag(
        "This projection mode is designed to mimic the way the human eye sees.",
        "Three.js で最もよく使われるカメラです。",
      ),
    ).toEqual([]);
    expect(
      flag(
        "It supports authentication using passwords, phone numbers, popular federated identity providers.",
        "メール・パスワード、電話番号認証を提供する。",
      ),
    ).toEqual([]);
  });

  it("完結した散文は拾わない", () => {
    expect(
      flag(
        "GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub.",
      ),
    ).toEqual([]);
    expect(
      flag("v-for の key 属性は、可能な場合は必ず指定することが推奨されます。"),
    ).toEqual([]);
  });

  it("コード・設定・表の行は散文として見ない", () => {
    expect(flag("npm install -g @anthropic-ai/claude-code")).toEqual([]);
    expect(flag('{"downloads":10103901,"start":"2026-08-01"}')).toEqual([]);
    expect(flag("- md, medium: 900px")).toEqual([]);
    expect(
      flag(
        "new PointLight( color : number | Color | string, intensity : number )",
      ),
    ).toEqual([]);
    expect(flag("| Java 8 | Java 17 and Java 21 |")).toEqual([]);
  });

  it("中略で終わる引用は末尾で判定しない", () => {
    // [...] は意図して 2 箇所を繋いだ印。切り詰めの失敗ではない
    expect(
      flag("99.9% [...] 43.2 minutes [...] 99.99% [...] 4.32 minutes"),
    ).toEqual([]);
  });

  it("空の引用と短すぎる断片は判定しない", () => {
    expect(flag("")).toEqual([]);
    expect(flag("Elite")).toEqual([]);
  });
});
