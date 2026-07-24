import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

export default function PlaywrightE2E() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 81
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          Playwright で E2E テスト
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Playwright
          は本物のブラウザを起動して、ユーザーがやる操作を機械に再現させるツールです。React
          に限らず、Vue でも素の HTML でも、URL を開いてクリックできる Web
          アプリなら同じやり方で駆動できます。 このページでは E2E
          テストの位置づけと、Playwright
          の基本、そしてこのサイト自身のテスト構成を実例に読み解きます。
        </p>
        <WhyNowBox
          tags={[
            "Playwright",
            "E2E",
            "ブラウザ自動化",
            "auto-wait",
            "axe-core",
          ]}
        >
          <p>
            単体テストは関数を、統合テストはコンポーネントの組み合わせを検証します。E2E
            はその一段上で「実際にブラウザで開いて操作したらどうなるか」を確かめます。Playwright
            が React 専用ではなく Web
            アプリ全般に効く汎用ツールだと分かると、フレームワークを乗り換えても
            テスト資産を持ち越せることが見えてきます。
          </p>
        </WhyNowBox>
        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              E2E とは — 単体・統合との違い
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              E2E（End to
              End）テストは、アプリを実際のブラウザで起動し、ユーザーがやる一連の操作を最初から最後まで通して確認します。
              「トップページを開く → リンクを押す →
              目的の画面が表示される」といった流れをそのまま検証するため、
              テストの中でもっともユーザー体験に近い層です。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              一方でコストも高くなります。実ブラウザを立ち上げて実際のネットワークや描画を待つので実行が遅く、
              画面の構造が少し変わっただけで壊れやすい（フレーキーになりやすい）。この性質から、テストは
              「テストピラミッド」の考え方で配分します。土台に数の多い単体テスト、中間に統合テスト、頂点に少数の
              E2E テストを置く、というバランスです。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  単体テスト
                </code>
                ：関数や 1 コンポーネントを直接呼ぶ。速く、数を多くできる
              </li>
              <li>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  統合テスト
                </code>
                ：複数の部品を組み合わせた挙動を検証する
              </li>
              <li>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  E2E テスト
                </code>
                ：本物のブラウザで通し操作を再現する。ユーザー体験に最も近いが、遅く・壊れやすいので数を絞る
              </li>
            </ul>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Playwright
              が扱うのはこの頂点の層です。ブラウザを操作対象にするので、UI
              の実装がどのフレームワークでも同じ書き方でテストできる、というのが最大の利点です。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              セットアップ — playwright.config.ts の要点
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Playwright は設定ファイル 1
              つで挙動が決まります。中でも重要なのが、テスト前に開発サーバーを自動起動する
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                webServer
              </code>
              、テスト内の相対パスの基準になる
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                baseURL
              </code>
              、そして動かすブラウザの指定です。
              このサイトが実際に使っている設定を見てみます。
            </p>
            <CodeBlock
              language="ts"
              title="playwright.config.ts（このサイトの実設定）"
              code={`import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    // テスト内の page.goto("/") はこの baseURL を基準に解決される
    baseURL: \`http://localhost:\${process.env.PORT || 3000}\`,
    // 失敗したテストだけスクリーンショットを残す（デバッグ用）
    screenshot: "only-on-failure",
  },
  webServer: {
    // テスト開始前に dev サーバーを自動で立ち上げる
    command: "npm run dev",
    port: Number(process.env.PORT) || 3000,
    reuseExistingServer: true,
  },
  projects: [
    // このサイトは chromium のみで実行する
    { name: "chromium", use: { browserName: "chromium" } },
  ],
});`}
            />
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                webServer
              </code>{" "}
              があるので、テストを走らせる前に手動で dev
              サーバーを起動しておく必要はありません。Playwright がポート 3000
              の起動を待ってからテストを始めます。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                reuseExistingServer: true
              </code>
              は、すでにサーバーが動いていればそれを使い回す指定です。
            </p>
            <InfoBox type="info" title="ブラウザは複数選べる">
              このサイトは chromium のみですが、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                projects
              </code>
              に firefox / webkit
              を並べれば複数ブラウザで同じテストを実行できます。ブラウザ差異の検証まで含めたいときに増やします。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              最初のテスト — goto・getByRole・expect
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストの基本形は「ページを開く → 要素を掴む → 状態を確かめる」の 3
              ステップです。要素の掴み方は
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                getByRole
              </code>
              を優先します。これはユーザーやスクリーンリーダーが認識するのと同じ「役割（見出し・ボタン・リンク）」で要素を探すため、
              クラス名の変更などに強く、アクセシビリティの観点とも一致します。
            </p>
            <CodeBlock
              language="ts"
              title="最初の E2E テスト"
              code={`import { test, expect } from "@playwright/test";

test("トップページに見出しが表示される", async ({ page }) => {
  // baseURL が効くので "/" だけで OK
  await page.goto("/");

  // 役割（role）とアクセシブルネームで要素を掴む
  const heading = page.getByRole("heading", { level: 1 });

  // 表示されるまで自動で待ってから検証する（auto-wait）
  await expect(heading).toBeVisible();
});`}
            />
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ここで効いているのが{" "}
              <strong className="text-foreground">auto-wait（自動待機）</strong>
              です。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                toBeVisible()
              </code>
              は要素が現れるまで（タイムアウトまで）自動的に待ってくれます。非同期にデータを読み込む画面でも、
              手動で待ち時間を挟まずに済むのが Playwright の要になる仕組みです。
            </p>
            <CodeBlock
              language="ts"
              title="クリックして遷移を確認する"
              code={`import { test, expect } from "@playwright/test";

test("リンクを押すと React マニュアルへ遷移する", async ({ page }) => {
  await page.goto("/");

  // 見えているリンクをクリック
  await page.getByRole("link", { name: "React" }).first().click();

  // 遷移先の見出しが表示されることを検証
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});`}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              このサイトの実例 — manuals と a11y
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              このサイトの{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                e2e/
              </code>
              ディレクトリには複数のテストファイルがあります。代表的な 2
              つを見ます。
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              manuals.spec.ts — 各ページが例外なく描画される
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              型チェックやビルドが通っても、描画時に例外が出て真っ白になることはあります。これを捕まえるため、
              マニュアルの全ルートを 1 つずつ開き、
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">h1</code>
              が表示され、ページ内で未捕捉の例外が発生していないことを確認します。
            </p>
            <CodeBlock
              language="ts"
              title="e2e/manuals.spec.ts（要点を抜粋）"
              code={`import { test, expect } from "@playwright/test";

const RENDER_ROUTES = ["/api", "/api/quickstart", "/vue", "/vue/basics/setup"];

test("マニュアルの全ページが例外なく描画される", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (err) => pageErrors.push(err.message));

  for (const route of RENDER_ROUTES) {
    pageErrors.length = 0;
    // DOM 到達で待つ（dev サーバーの変換で networkidle は収束しないことがある）
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const h1 = page.locator("h1").first();
    await expect(h1, \`h1 が見つからない: \${route}\`).toBeVisible({ timeout: 15_000 });

    // 描画時に例外が出ていないこと
    expect(pageErrors, \`描画時に例外: \${route}\`).toEqual([]);
  }
});`}
            />
            <h3 className="text-lg font-semibold text-foreground mb-3">
              a11y.spec.ts — axe-core でアクセシビリティを自動検査
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                @axe-core/playwright
              </code>
              を使うと、開いたページの DOM
              をアクセシビリティ観点で自動スキャンできます。このサイトでは
              critical / serious な違反がゼロであることを不変条件にし、Light /
              Dark / Dracula の 3 テーマすべてで検査しています。
            </p>
            <CodeBlock
              language="ts"
              title="e2e/a11y.spec.ts（要点を抜粋）"
              code={`import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("critical / serious な a11y 違反がない", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("h1").first()).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();

  // 重大度の高い違反だけを取り出す
  const blocking = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  expect(blocking).toEqual([]);
});`}
            />
            <InfoBox
              type="warning"
              title="このサイトの E2E は CI の自動ゲートではない"
            >
              重要な事実として、このサイトの E2E テストは実装されていますが、CI
              では自動実行されていません。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                .github/workflows/ci.yml
              </code>
              が回すのは「型チェック → 単体テスト（vitest） → ビルド」の 3
              つだけで、Playwright は含まれていません。 E2E
              はローカルまたは手動で実行する位置づけです。「テストが存在する」ことと「そのテストが自動ゲートとして毎回走る」
              ことは別だという典型例なので、区別して押さえておきましょう。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フレーキーテスト対策
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              E2E
              が「たまに落ちる（フレーキー）」原因の多くはタイミングです。基本方針は、Playwright
              の auto-wait を信じて、固定の待ち時間で誤魔化さないことです。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <strong className="text-foreground">auto-wait を信じる</strong>
                ：
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  expect(locator).toBeVisible()
                </code>
                や{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  click()
                </code>{" "}
                は要素が操作可能になるまで自動で待つ
              </li>
              <li>
                <strong className="text-foreground">固定 sleep を避ける</strong>
                ：
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  waitForTimeout(1000)
                </code>
                のような決め打ちは、遅ければ落ち・速ければ無駄になる。状態に対する待機に置き換える
              </li>
              <li>
                <strong className="text-foreground">retries</strong>
                ：不安定な環境では設定で自動再試行を付け、たまたまの失敗を吸収する
              </li>
              <li>
                <strong className="text-foreground">trace で追う</strong>
                ：失敗時にトレースを残すと、各操作の
                DOM・スクリーンショット・ネットワークを後から辿れる
              </li>
            </ul>
            <CodeBlock
              language="ts"
              title="固定待機ではなく状態を待つ"
              code={`import { test, expect } from "@playwright/test";

test("読み込み後にリストが表示される", async ({ page }) => {
  await page.goto("/list");

  // NG: 決め打ちの待機（環境で成否が変わる）
  // await page.waitForTimeout(1000);

  // OK: 目的の状態を待つ（auto-wait）
  await expect(page.getByRole("listitem").first()).toBeVisible();
});`}
            />
            <CodeBlock
              language="bash"
              title="失敗を trace で追う"
              code={`# 失敗時のトレースを記録して実行
npx playwright test --trace on

# 記録されたトレースをビューアで開く
npx playwright show-trace trace.zip`}
            />
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ここで仕様と実測のギャップを 1 つ押さえておきます。上の設定にある
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                screenshot: "only-on-failure"
              </code>
              は「失敗したときにデバッグ用のスクリーンショットを残す」だけの機能で、見た目の変化を検出する
              ビジュアルリグレッションの assert
              ではありません。仕様上、これはあくまで失敗調査の材料であって、
              「前回と画面が同じか」を機械的に比較するものではない、という点に注意してください。画面の見た目そのものを
              テストで固定したい場合は、次のページで扱うスナップショットテストが担当します。
            </p>
          </section>

          <Quiz
            question="Playwright の getByRole を優先すべき主な理由は？"
            options={[
              {
                label: "クラス名で要素を掴むより記述が短くなるから",
              },
              {
                label:
                  "ユーザーやスクリーンリーダーが認識する役割で掴むため実装変更に強く、a11y の観点とも一致するから",
                correct: true,
              },
              {
                label: "getByRole でしか要素をクリックできないから",
              },
              {
                label: "他の掴み方より実行速度が速いから",
              },
            ]}
            explanation="getByRole は見出し・ボタン・リンクといった役割で要素を探します。クラス名などの内部実装に依存しないため壊れにくく、スクリーンリーダーが辿る経路と同じ観点になるためアクセシビリティの確認にもつながります。要素の掴み方は速度ではなく堅牢さで選びます。"
          />

          <ReferenceLinks
            links={[
              {
                title: "Playwright 公式ドキュメント",
                url: "https://playwright.dev/",
                description: "セットアップ・API・ベストプラクティスの一次情報",
              },
              {
                title: "Playwright ロケータ（Locators）",
                url: "https://playwright.dev/docs/locators",
                description:
                  "getByRole を中心とした要素の掴み方と auto-wait の解説",
              },
              {
                title: "@axe-core/playwright",
                url: "https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright",
                description:
                  "Playwright でアクセシビリティ検査を自動化する axe-core 連携",
              },
            ]}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
