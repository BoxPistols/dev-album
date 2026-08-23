import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function RtlComponents() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 80
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          React コンポーネントのテスト（RTL）
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          このテストセクションで、唯一 React
          に固有のページ。とはいえ特別扱いするわけではない。React Testing
          Library（RTL）の考え方は「ユーザーが見て操作するものをテストし、内部実装には触れない」で、これは
          このセクションが通して語ってきた「疎結合なテスト」を、UI
          の世界にそのまま当てはめた結果にすぎない。
        </p>
        <WhyNowBox
          tags={[
            "React Testing Library",
            "getByRole",
            "userEvent",
            "実装詳細に依存しない",
            "疎結合",
          ]}
        >
          <p>
            純粋関数の単体テストは通っているのに、画面のボタンが動かない。この
            「ビルドは通るのに配線が繋がっていない」バグを拾う手段が RTL。render
            → クエリで要素を取る → userEvent で操作する →
            画面の変化を検証する、という ユーザー目線の 4 手を押さえる。
          </p>
        </WhyNowBox>
        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              なぜコンポーネントテストが要るか
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストピラミッドの下段には、入力に対して出力を返すだけの純粋関数を素早く検証する単体テストが
              並ぶ。金額の合計、日付の整形、バリデーションのルール。ここは
              Vitest
              で高速に回せる。ただし単体テストは「関数が正しいこと」しか保証しない。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              画面のバグの多くは、正しい関数どうしの
              <strong className="text-foreground">配線</strong>
              で起きる。ボタンは表示されているが
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                onClick
              </code>{" "}
              が繋がっていない。入力欄はあるが state
              に反映されない。propsの名前を打ち間違えてハンドラが渡っていない。これらは関数単体を
              いくらテストしても素通りする。
            </p>
            <InfoBox type="info" title="ビルドが通る ≠ 正しく動く">
              TypeScript
              の型チェックが通り、ビルドが成功しても、それは「型が矛盾していない」ことの証明で
              あって「ユーザーの操作が期待どおりの結果を生む」ことの証明ではない。コンポーネントテストは、
              この後者を、実際にレンダリングして操作してみることで埋める。
            </InfoBox>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              このアプリ自体は、いま RTL によるコンポーネントテストを 1
              つも持っていない。テストはロジックの単体テスト（Vitest）と
              E2E（Playwright）に寄せてある。 これはピラミッド上の判断で、UI
              の重い確認は数を絞って E2E
              に任せている。とはいえ、複雑なフォームや状態を持つコンポーネントが増えれば、E2E
              より軽い RTL
              が中間層として効いてくる。だから必要になった時のために手法を押さえておく。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              RTL の思想 ― 実装詳細に依存しない
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              RTL の指針は 1 行で言える。
              <strong className="text-foreground">
                「ユーザーが見て操作するものをテストする。内部実装には触れない」
              </strong>
              。テストは、state
              変数の中身やコンポーネントのメソッドではなく、画面に表示されたテキスト・ロール・ラベルを
              手がかりに要素を探し、クリックや入力で操作する。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              これがそのまま疎結合になる。テストがユーザー体験だけを見ているなら、内部の実装を
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                useState
              </code>{" "}
              から
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                useReducer
              </code>{" "}
              に書き換えても、クラス名を整理しても、画面の見た目と振る舞いが同じならテストは壊れない。
              逆に、内部の状態や DOM
              構造に依存したテストは、リファクタリングのたびに壊れる。壊れやすいテストは、やがて
              「テストが重荷だから触らない」を招く。
            </p>
            <InfoBox type="info" title="疎結合の帰結として読む">
              このページを「唯一の React
              専用ページ」だから例外、と捉えないでほしい。RTL
              が実装詳細を避けるのは、テストと
              実装を疎に保つためであり、それはこのセクション全体の背骨と同じ。React
              固有なのはツールの名前だけで、思想は共通している。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              render・screen・クエリの優先順位
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              基本の 3 点セットは
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                render()
              </code>
              ・
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                screen
              </code>
              ・クエリ。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                render()
              </code>{" "}
              でコンポーネントを擬似 DOM に描画し、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                screen
              </code>{" "}
              から要素を探す。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              要素の探し方には優先順位がある。上にあるものほど「ユーザーや支援技術が実際に要素を認識する
              方法」に近い。上から順に検討し、どうしても取れない時だけ下に降りる。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  getByRole
                </code>{" "}
                ―
                最優先。ボタン・見出し・リンクなどをロールで取る。アクセシビリティも同時に検証できる
              </li>
              <li>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  getByLabelText
                </code>{" "}
                ― フォーム要素を、対応するラベル文字列で取る
              </li>
              <li>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  getByPlaceholderText
                </code>{" "}
                /{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  getByText
                </code>{" "}
                ― プレースホルダーや表示テキストで取る
              </li>
              <li>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  getByTestId
                </code>{" "}
                ― 最後の手段。ユーザーには見えない{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  data-testid
                </code>{" "}
                に頼る
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              例: シンプルなカウンター
            </h3>
            <CodeBlock
              language="tsx"
              title="Counter.tsx"
              code={`import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>ふやす</button>
    </div>
  );
}`}
            />
            <CodeBlock
              language="tsx"
              title="Counter.test.tsx"
              code={`import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("ボタンを押すとカウントが増える", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    // ロールと表示名でボタンを取る（getByRole が最優先）
    const button = screen.getByRole("button", { name: "ふやす" });

    // 初期表示はテキストで確認する
    expect(screen.getByText("カウント: 0")).toBeInTheDocument();

    await user.click(button);

    // クリック後の画面の変化を検証する
    expect(screen.getByText("カウント: 1")).toBeInTheDocument();
  });
});`}
            />
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストは
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                count
              </code>{" "}
              という state
              変数の名前を一切知らない。知っているのは「ボタンを押すと画面のカウントが
              増える」というユーザー体験だけ。だから state
              を別の実装に置き換えても壊れない。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              userEvent でインタラクション
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              クリックや入力は
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                @testing-library/user-event
              </code>
              で行う。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                userEvent.setup()
              </code>
              を呼んでから
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                user.click()
              </code>{" "}
              や
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                user.type()
              </code>{" "}
              を使う。各操作は非同期なので
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                await
              </code>{" "}
              を付ける。
            </p>
            <CodeBlock
              language="tsx"
              title="LoginForm.test.tsx"
              code={`import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("入力して送信するとハンドラが呼ばれる", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    // ラベル文字列でフォーム要素を取る（getByLabelText）
    await user.type(screen.getByLabelText("メールアドレス"), "a@example.com");
    await user.type(screen.getByLabelText("パスワード"), "secret123");
    await user.click(screen.getByRole("button", { name: "ログイン" }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "a@example.com",
      password: "secret123",
    });
  });
});`}
            />
            <p className="text-foreground/80 mb-4 leading-relaxed">
              古い
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                fireEvent
              </code>{" "}
              との違いに触れておく。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                fireEvent.click()
              </code>{" "}
              は単一の DOM イベントを発火するだけだが、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                userEvent
              </code>{" "}
              は実際のユーザー操作に近い一連のイベント（フォーカス・キー押下・入力など）を
              順に発生させる。より現実に近い挙動を確認できるため、新規のテストでは
              userEvent を使うのが基本。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              非同期の扱い ― findBy と waitFor
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              データ取得後にリストが現れる、といった非同期の描画は
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                getBy*
              </code>{" "}
              では取れない。まだ要素が存在しない瞬間に検索して失敗するからだ。要素が現れるまで
              待つには
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                findBy*
              </code>{" "}
              を使う。これは Promise
              を返し、要素が見つかるかタイムアウトするまで再試行する。
            </p>
            <CodeBlock
              language="tsx"
              title="UserList.test.tsx"
              code={`import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserList } from "./UserList";

describe("UserList", () => {
  it("取得したユーザー名が表示される", async () => {
    render(<UserList />);

    // findBy* は要素が現れるまで待って取得する
    const item = await screen.findByText("Taro Yamada");
    expect(item).toBeInTheDocument();
  });

  it("読み込み表示が消える", async () => {
    render(<UserList />);

    // 特定要素以外の条件は waitFor で待つ
    await waitFor(() => {
      expect(screen.queryByText("読み込み中...")).not.toBeInTheDocument();
    });
  });
});`}
            />
            <p className="text-foreground/80 mb-4 leading-relaxed">
              使い分けの目安は、「要素が現れるのを待つ」なら
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                findBy*
              </code>
              、 「任意のアサーションが通るまで待つ」なら
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                waitFor
              </code>
              。 要素の不在を確認する時は、例外を投げない
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                queryBy*
              </code>{" "}
              と組み合わせる。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              アンチパターン ― 実装詳細をテストしない
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              壊れやすいテストには共通の原因がある。ユーザーには見えない
              <strong className="text-foreground">実装詳細</strong>
              に依存していることだ。次のような書き方は避ける。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                コンポーネントの state や内部変数を直接読む（ユーザーは state
                を見ない）
              </li>
              <li>
                クラス名・タグ構造・DOM
                の階層で要素を取る（レイアウト変更で即壊れる）
              </li>
              <li>
                内部で呼ばれる関数が「呼ばれたか」だけを見て、画面の結果を検証しない
              </li>
            </ul>
            <CodeBlock
              language="tsx"
              title="脆いテスト vs 堅いテスト"
              code={`// 脆い: クラス名という実装詳細に依存する
// スタイル調整で class を変えただけで壊れる
const button = container.querySelector(".btn-primary");

// 堅い: ユーザーが認識するロールと表示名で取る
// 見た目の class を変えてもテストは生き残る
const button = screen.getByRole("button", { name: "保存" });`}
            />
            <InfoBox type="warning" title="テストが壊れる = 悪、ではない">
              リファクタリングでテストが壊れるのは 2
              種類ある。（1）ユーザー体験が変わったから壊れる ―
              これは正しい検知。（2）内部実装を 変えただけなのに壊れる ―
              これが避けたい脆さ。RTL
              の作法に従えば、（2）を減らして（1）だけが残る。テストの信頼性はここで決まる。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実行環境 ― 擬似 DOM が要る
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              RTL は要素を DOM に描画して検証するため、DOM
              環境が必要になる。ただしこれは
              <strong className="text-foreground">
                本物のブラウザではない
              </strong>
              。Vitest なら
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                jsdom
              </code>{" "}
              や
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                happy-dom
              </code>{" "}
              といった、JavaScript で DOM API を再現した擬似環境の上で動く。
            </p>
            <CodeBlock
              language="ts"
              title="vitest.config.ts"
              code={`import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // RTL は DOM 環境を要求する。jsdom または happy-dom を指定
    environment: "jsdom",
    // toBeInTheDocument 等のマッチャを有効化するセットアップ
    setupFiles: ["./vitest.setup.ts"],
  },
});`}
            />
            <InfoBox
              type="warning"
              title="仕様と実測のギャップ ― 擬似 DOM の限界"
            >
              仕様では jsdom / happy-dom は DOM API
              を実装しているが、実測ではレイアウト計算・実際の描画・一部のブラウザ
              API（正確な 寸法や
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                IntersectionObserver
              </code>{" "}
              など）が省略・簡略化されている。理由は、これらが軽量な純
              JavaScript 実装だから。つまり RTL
              のテストは「ロジックと配線」を速く検証する層であり、
              実際のブラウザでの見え方や挙動の最終確認は E2E（Playwright
              など）に任せる。両者は競合ではなく役割分担。
            </InfoBox>
          </section>

          <Quiz
            question="RTL が「実装詳細に依存しない」ことを重視する最大の理由はどれか。"
            options={[
              {
                label:
                  "state 変数を直接読むほうがテストの実行速度が速くなるため",
              },
              {
                label:
                  "内部実装を変えてもユーザー体験が同じならテストが壊れず、リファクタリングに強い（疎結合）ため",
                correct: true,
              },
              {
                label: "getByTestId が他のクエリより正確に要素を特定できるため",
              },
              {
                label: "jsdom では実装詳細をテストできない技術的制約があるため",
              },
            ]}
            explanation="RTL がユーザーの見え方・操作だけをテストするのは、テストと実装を疎に保つため。内部実装（useState→useReducer、クラス名の整理など）を変えても、画面の振る舞いが同じならテストは壊れない。これがリファクタリング耐性であり、このセクション共通の『疎結合なテスト』の帰結。クエリの優先順位で getByTestId が最後の手段なのも、これが実装詳細（ユーザーに見えない data-testid）に依存するからで、選択肢の主張とは逆。"
          />

          <ReferenceLinks
            links={[
              {
                title: "React Testing Library ― 公式ドキュメント",
                url: "https://testing-library.com/docs/react-testing-library/intro/",
                description:
                  "render・screen・クエリの基本 API と、RTL の設計思想の入り口",
              },
              {
                title: "クエリの優先順位（Priority）",
                url: "https://testing-library.com/docs/queries/about/",
                description:
                  "getByRole を最優先とし getByTestId を最後の手段とする、公式の推奨順序",
              },
              {
                title: "Kent C. Dodds「Testing Implementation Details」",
                url: "https://kentcdodds.com/blog/testing-implementation-details",
                description:
                  "なぜ実装詳細のテストが脆いのかを、具体例とともに論じた原典",
              },
            ]}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
