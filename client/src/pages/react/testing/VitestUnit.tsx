import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function VitestUnit() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 79
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          Vitest で単体テスト
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          単体テストは「関数に入力を渡し、返り値が期待どおりか」を確かめる作業です。ここでは
          Vitest を使って、React に依存しない純粋関数をテストします。UI
          を描画しなくても、ロジックだけを切り出して検証できることを体験します。
        </p>
        <WhyNowBox
          tags={[
            "Vitest",
            "単体テスト",
            "AAA",
            "純粋関数",
            "フレームワーク非依存",
          ]}
        >
          <p>
            テストの対象は「入力から出力を決める関数」です。React
            のコンポーネントもその内側は関数の集まりなので、まずロジック単体をテストできると、UI
            のテストに進む前に土台が固まります。Vitest は React
            を必要とせず、任意の TypeScript / JavaScript
            に対して走ります。この非依存性を理解しておくと、テストを「どこに置くか」の設計が楽になります。
          </p>
        </WhyNowBox>
        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Vitest とは / なぜ Vite プロジェクトで選ぶのか
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vitest は Vite
              上で動くテストランナーです。テストコードを書いて実行すると、期待どおりに動くかを自動で確かめてくれます。Vite
              プロジェクトで Vitest を選ぶ主な理由は次の 3 つです。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <span className="font-semibold text-foreground">
                  設定を共有できる
                </span>
                ： Vite が持つエイリアス（
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  @/
                </code>{" "}
                など）や TypeScript / JSX
                の変換設定を、テスト側でそのまま使えます。ビルドとテストで別々の設定を保守しなくてよくなります。
              </li>
              <li>
                <span className="font-semibold text-foreground">速い</span>：
                Vite
                の変換とキャッシュを使うため、テストの起動と再実行が軽いです。
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Jest 互換 API
                </span>
                ：{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  describe
                </code>{" "}
                /{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  it
                </code>{" "}
                /{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  expect
                </code>{" "}
                といった API が Jest とほぼ同じです。Jest
                の知識をそのまま持ち込めます。
              </li>
            </ul>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              まずはインストールと実行の形を確認します。
            </p>
            <CodeBlock
              language="bash"
              title="Vitest の追加と実行"
              code={`# 開発依存として追加
npm install -D vitest

# 一度だけ実行して結果を出す（CI 向き）
npx vitest run

# ファイルの変更を監視して再実行する（開発向き）
npx vitest`}
            />
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストファイルは対象と同じ場所に置き、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                *.test.ts
              </code>{" "}
              /{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                *.test.tsx
              </code>{" "}
              のような名前にするのが一般的です。React
              のコンポーネントを描画しないテストなら、拡張子は{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                .ts
              </code>{" "}
              で十分です。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              最初のテスト ー describe / it / expect と AAA
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストの基本構造は 3 つの関数でできています。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                describe
              </code>{" "}
              でテストのまとまりを作り、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">it</code>
              （別名{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                test
              </code>
              ）で 1 件のテストを書き、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                expect
              </code>{" "}
              で期待値を照合します。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              1 件のテストの中身は{" "}
              <span className="font-semibold text-foreground">
                AAA パターン（Arrange - Act - Assert）
              </span>{" "}
              で書くと読みやすくなります。準備（入力を用意）、実行（対象関数を呼ぶ）、検証（返り値を照合）の
              3 段に分けます。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テスト対象は「入力から出力が決まる純粋関数」にします。ここでは金額を円表記にフォーマットする短い関数を例にします。
            </p>
            <CodeBlock
              language="ts"
              title="formatYen.ts ー テスト対象の純粋関数"
              code={`// 数値を「¥1,000」のような円表記の文字列にする
export function formatYen(amount: number): string {
  return "¥" + amount.toLocaleString("ja-JP");
}`}
            />
            <CodeBlock
              language="ts"
              title="formatYen.test.ts ー AAA で書いたテスト"
              code={`import { describe, it, expect } from "vitest";
import { formatYen } from "./formatYen";

describe("formatYen", () => {
  it("3 桁ごとにカンマを入れて円記号を付ける", () => {
    // Arrange: 入力を用意する
    const amount = 1000;

    // Act: 対象の関数を実行する
    const result = formatYen(amount);

    // Assert: 返り値が期待どおりか照合する
    expect(result).toBe("¥1,000");
  });

  it("0 円でも壊れない", () => {
    expect(formatYen(0)).toBe("¥0");
  });
});`}
            />
            <InfoBox type="info" title="純粋関数がテストしやすい理由">
              <p>
                純粋関数は「同じ入力なら常に同じ出力を返し、外部の状態を書き換えない」関数です。この性質があると、テストは入力を渡して返り値を照合するだけで済みます。DOM
                や API
                の準備が要らないため、まず純粋関数からテストを書き始めると土台が固まります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              よく使うマッチャー
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                expect(...)
              </code>{" "}
              に続けて書く{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                toBe
              </code>{" "}
              などを「マッチャー」と呼びます。照合の種類ごとに使い分けます。まず押さえるのは次の
              5 つです。
            </p>
            <CodeBlock
              language="ts"
              title="matchers.test.ts ー 代表的なマッチャー"
              code={`import { describe, it, expect } from "vitest";

function sum(items: number[]): number {
  return items.reduce((acc, n) => acc + n, 0);
}

function tags(): string[] {
  return ["react", "vite", "vitest"];
}

function divide(a: number, b: number): number {
  if (b === 0) throw new Error("0 で割れません");
  return a / b;
}

describe("matchers", () => {
  it("toBe は === で比較する（プリミティブ向け）", () => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  it("toEqual は中身を再帰的に比較する（配列やオブジェクト向け）", () => {
    // 別インスタンスの配列同士。参照は違うが中身は同じ
    expect(tags()).toEqual(["react", "vite", "vitest"]);
    // toBe だと参照が異なるため失敗する
    expect(tags()).not.toBe(["react", "vite", "vitest"]);
  });

  it("toContain は配列に要素が含まれるか調べる", () => {
    expect(tags()).toContain("vitest");
  });

  it("toThrow は関数が例外を投げるか調べる", () => {
    // 関数を渡す点に注意（すぐ呼ぶと例外が伝播してテストが失敗する）
    expect(() => divide(1, 0)).toThrow("0 で割れません");
  });

  it("toBeCloseTo は浮動小数点の誤差を許容して比較する", () => {
    // 0.1 + 0.2 は 0.30000000000000004 になるため toBe では失敗する
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});`}
            />
            <InfoBox type="warning" title="toBe と toEqual の使い分け">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  toBe
                </code>{" "}
                は{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  ===
                </code>{" "}
                による同一性の比較です。数値や文字列などのプリミティブに使います。配列やオブジェクトは中身が同じでも参照が異なると{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  toBe
                </code>{" "}
                は失敗するため、中身を比べる{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  toEqual
                </code>{" "}
                を使います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              このリポジトリの実例
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              この Dev Album 自身が Vitest を使っています。設計として「React
              に依存しない純ロジック」を{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                lib/
              </code>{" "}
              に切り出し、そこへ単体テストを当てています。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  package.json
                </code>{" "}
                の{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  "test": "vitest run"
                </code>{" "}
                でテストを 1 回実行します。
              </li>
              <li>
                設定は{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  vite.config.ts
                </code>{" "}
                の{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  test
                </code>{" "}
                ブロックにまとめてあります（
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  environment: "jsdom"
                </code>{" "}
                、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  globals: true
                </code>
                ）。
              </li>
              <li>
                テストは{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  client/src/lib/
                </code>{" "}
                の純ロジック 5 ファイル ー{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  preview.test.ts
                </code>
                （プレビュー種別の判定）、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  navigation.test.ts
                </code>
                （ナビゲーション整合）、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  link-integrity.test.ts
                </code>
                、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  fuzzyCheck.test.ts
                </code>
                、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  editor-validation.test.ts
                </code>{" "}
                です。
              </li>
              <li>
                CI（
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  .github/workflows/ci.yml
                </code>
                ）では{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  pnpm test
                </code>{" "}
                が型チェックとビルドの間に走ります。
              </li>
            </ul>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              このうち{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                editor-validation.test.ts
              </code>{" "}
              は、教材内の全チャレンジコードが正しくトランスパイルできるかを検証しています。ページを増やすたびに壊れていないかが自動で確かめられる仕組みです。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              なお{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                globals: true
              </code>{" "}
              を指定すると、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                describe
              </code>{" "}
              /{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">it</code>{" "}
              /{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                expect
              </code>{" "}
              を{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                import
              </code>{" "}
              なしで使えます。この設定を使わない場合は、これまでの例のように{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                {`import { describe, it, expect } from "vitest"`}
              </code>{" "}
              を明示します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              少し発展 ー パラメタライズ・モック・カバレッジ
            </h2>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              test.each で入力パターンをまとめる
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              同じ関数を複数の入力で確かめたいときは、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                it.each
              </code>{" "}
              /{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                test.each
              </code>{" "}
              でパラメタライズすると、同じテストのコピーが減ります。
            </p>
            <CodeBlock
              language="ts"
              title="formatYen.each.test.ts ー パラメタライズ"
              code={`import { describe, it, expect } from "vitest";
import { formatYen } from "./formatYen";

describe("formatYen（複数パターン）", () => {
  // [入力, 期待値] の型を明示する（混在した値でも strict で通る）
  it.each<[number, string]>([
    [0, "¥0"],
    [100, "¥100"],
    [1000, "¥1,000"],
    [1234567, "¥1,234,567"],
  ])("formatYen(%i) は %s を返す", (input, expected) => {
    expect(formatYen(input)).toBe(expected);
  });
});`}
            />
            <h3 className="text-lg font-semibold text-foreground mb-3">
              vi.fn() で「呼ばれたか」を確かめる
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コールバックを受け取る関数では、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                vi.fn()
              </code>{" "}
              でモック関数を作り、それが何回・どの引数で呼ばれたかを照合できます。
            </p>
            <CodeBlock
              language="ts"
              title="forEachEven.test.ts ー vi.fn() でコールバックを検証"
              code={`import { describe, it, expect, vi } from "vitest";

// 偶数だけをコールバックに渡す純粋な高階関数
function forEachEven(items: number[], onEven: (n: number) => void): void {
  for (const n of items) {
    if (n % 2 === 0) onEven(n);
  }
}

describe("forEachEven", () => {
  it("偶数の回数だけコールバックを呼ぶ", () => {
    const spy = vi.fn();

    forEachEven([1, 2, 3, 4], spy);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(2);
    expect(spy).toHaveBeenCalledWith(4);
  });
});`}
            />
            <h3 className="text-lg font-semibold text-foreground mb-3">
              カバレッジで「どこを通ったか」を見る
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストがコードのどの行を通ったかは、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                --coverage
              </code>{" "}
              フラグで計測できます。数値の高低よりも「重要な分岐が通っていない箇所」を見つける道具として使うのが実用的です。
            </p>
            <CodeBlock
              language="bash"
              title="カバレッジ計測"
              code={`# 初回はカバレッジ用のパッケージを入れる
npm install -D @vitest/coverage-v8

# カバレッジ付きで実行する
npx vitest run --coverage`}
            />
            <InfoBox
              type="warning"
              title="仕様どおりの値 と 実環境で見える値 のズレ"
            >
              <p>
                Vitest の実行環境（テストが動く「土台」）は、指定しなければ{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  node
                </code>{" "}
                です。純粋関数のテストならこれで十分ですが、
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  document
                </code>{" "}
                や{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  window
                </code>{" "}
                といった DOM を触るテストは{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  node
                </code>{" "}
                環境では失敗します。DOM が必要なときは{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  jsdom
                </code>{" "}
                または{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  happy-dom
                </code>{" "}
                を環境として指定します。このリポジトリは{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  vite.config.ts
                </code>{" "}
                で{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  environment: "jsdom"
                </code>{" "}
                を指定しています。ファイル単位で切り替えたいときは、ファイル冒頭に{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  {`// @vitest-environment happy-dom`}
                </code>{" "}
                と書きます。仕様どおりの既定は{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  node
                </code>
                、実環境で必要になるのは DOM
                対応環境という点を先に知っておくと、原因不明の失敗で悩まずに済みます。
              </p>
            </InfoBox>
          </section>

          <Quiz
            question="toBe と toEqual の違いとして正しいものはどれですか？"
            options={[
              {
                label:
                  "toBe は配列やオブジェクトの中身を再帰的に比較し、toEqual は参照を比較する",
              },
              {
                label:
                  "toBe は === による同一性の比較で、中身が同じでも参照が異なる配列やオブジェクトには toEqual を使う",
                correct: true,
              },
              {
                label: "どちらも完全に同じで、好みでどちらを使ってもよい",
              },
              {
                label:
                  "toEqual は数値専用で、文字列の比較には toBe しか使えない",
              },
            ]}
            explanation="toBe は === による同一性の比較です。プリミティブ（数値・文字列など）に向きます。配列やオブジェクトは中身が同じでも参照が異なると toBe は失敗するため、中身を再帰的に比べる toEqual を使います。"
          />

          <ReferenceLinks
            links={[
              {
                title: "Vitest 公式ドキュメント",
                url: "https://vitest.dev/",
                description:
                  "Vitest のガイド。インストール・設定・API の全体像はここから。",
              },
              {
                title: "Vitest ー expect（マッチャー一覧）",
                url: "https://vitest.dev/api/expect.html",
                description:
                  "toBe / toEqual / toContain / toThrow / toBeCloseTo など、照合に使うマッチャーのリファレンス。",
              },
              {
                title: "Testing Library ー ガイドの原則",
                url: "https://testing-library.com/docs/guiding-principles/",
                description:
                  "UI をテストする段階に進むときの指針。ユーザー視点でのテスト設計を学べる。",
              },
            ]}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
