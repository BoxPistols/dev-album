import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import { Link } from "wouter";

export default function SnapshotVisual() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 82
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          スナップショットとビジュアルリグレッション
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          テストには「値が正しいか」を確かめるものと、「出力そのものが変わっていないか」を確かめるものがあります。
          スナップショットテストは出力を保存して差分を取り、ビジュアルリグレッションは描画結果をピクセルで比較します。
          このページでは両者の仕組みと、いつ使い、いつ使わないかの判断軸を扱います。
        </p>

        <WhyNowBox
          tags={[
            "スナップショット",
            "ビジュアルリグレッション",
            "toMatchSnapshot",
            "toHaveScreenshot",
            "Chromatic",
          ]}
        >
          <p>
            前ページ{" "}
            <Link
              href="/react/testing/playwright-e2e"
              className="text-primary underline"
            >
              Playwright で E2E テスト
            </Link>{" "}
            までで、操作と結果を明示的にアサートするテストを書きました。
            一方で「レンダリング結果が前回と同じか」を丸ごと比較したい場面もあります。
            スナップショットとビジュアルリグレッションは、その「丸ごと比較」を担う手法です。
            便利な反面、使い方を誤ると誰もレビューしない大きな差分ファイルを生み、テストの意味が失われます。
            ここでは有効な使い所と陳腐化の条件を先に押さえます。
          </p>
        </WhyNowBox>

        <InfoBox type="info" title="このサイト自体はスナップショットを持たない">
          <p>
            Dev Album のテストは Vitest の単体アサートと Playwright の E2E
            で構成されており、 スナップショットテスト（
            <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
              toMatchSnapshot
            </code>
            ）もビジュアルリグレッション（
            <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
              toHaveScreenshot
            </code>
            ）も採用していません。
            採用しない判断そのものが、このページで扱う「いつ使わないか」の一例です。
            以下のコード例は一般的な使い方として読んでください。
          </p>
        </InfoBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: スナップショットテストとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              スナップショットテストとは
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              スナップショットテストは、初回実行時に対象の出力をファイルとして保存し、
              2 回目以降は保存済みの出力と現在の出力を比較する手法です。
              期待値を手で書く代わりに「前回の出力」を期待値として扱うため、
              大きな構造やシリアライズ結果をまとめて監視できます。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                初回: 出力を保存する（
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  __snapshots__
                </code>{" "}
                ディレクトリにファイルが作られる）
              </li>
              <li>2 回目以降: 保存済みの内容と現在の出力を比較する</li>
              <li>
                差分があればテスト失敗。意図した変更なら保存内容を更新する
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              toMatchSnapshot：別ファイルに保存する
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vitest の{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                toMatchSnapshot()
              </code>{" "}
              は、出力を隣接する{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                .snap
              </code>{" "}
              ファイルに保存します。オブジェクトや配列、シリアライズ可能な値に向いています。
            </p>

            <CodeBlock
              language="ts"
              title="toMatchSnapshot でオブジェクトを保存する"
              code={`import { expect, test } from "vitest";

// 表示用のデータを整形する純粋関数
function toViewModel(user: { id: number; name: string; admin: boolean }) {
  return {
    id: user.id,
    label: user.admin ? \`\${user.name}（管理者）\` : user.name,
  };
}

test("toViewModel の出力を保存して比較する", () => {
  const result = toViewModel({ id: 1, name: "田中", admin: true });
  // 初回はこの result が __snapshots__ に保存され、次回以降その内容と比較される
  expect(result).toMatchSnapshot();
});`}
            />

            <p className="text-foreground/80 mb-4 leading-relaxed">
              保存された内容が意図通り変わったときは、更新コマンドで保存側を上書きします。
              このコマンドを無思考で叩く運用が後述の「陳腐化」を招くため、更新時は必ず差分を読みます。
            </p>

            <CodeBlock
              language="bash"
              title="スナップショットの更新"
              code={`# 差分を確認せずに全スナップショットを上書きする（乱用しない）
npx vitest run --update

# 短縮形
npx vitest run -u`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3">
              toMatchInlineSnapshot：テストファイルに埋め込む
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                toMatchInlineSnapshot()
              </code>{" "}
              は保存先を別ファイルにせず、テストコード内に期待値を書き込みます。
              初回実行時に Vitest が引数へ自動で結果を埋め込むため、
              レビュー時に「テストと期待値が同じ画面で見える」利点があります。
              小さく安定した出力に向いています。
            </p>

            <CodeBlock
              language="ts"
              title="toMatchInlineSnapshot は期待値がその場に残る"
              code={`import { expect, test } from "vitest";

function formatPrice(yen: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(yen);
}

test("金額のフォーマットを固定する", () => {
  // 初回実行後、Vitest が下の引数へ結果を自動で書き込む
  expect(formatPrice(1980)).toMatchInlineSnapshot(\`"￥1,980"\`);
});`}
            />

            <InfoBox type="info" title="別ファイル型とインライン型の使い分け">
              <p>
                出力が数行に収まるならインライン型（
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  toMatchInlineSnapshot
                </code>
                ）が読みやすく、レビューで期待値がすぐ確認できます。
                出力が長い、または複数のテストで共有したい場合は別ファイル型（
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  toMatchSnapshot
                </code>
                ）を選びます。
                ただし別ファイルが数百行に膨らむと誰も読まなくなるため、大きさは常に意識します。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: いつ有効 / いつ陳腐化するか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              いつ有効で、いつ陳腐化するか
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              スナップショットは「小さく安定した出力」に対して最も価値を発揮します。
              逆に、大きく変わりやすい出力に当てると、
              差分レビューが形骸化してテストが「壊れているのに緑」の状態に陥ります。
              これがスナップショットの陳腐化です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              有効な場面
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                純粋関数の変換結果（整形・正規化・シリアライズなど）が意図せず変わっていないか
              </li>
              <li>
                エラーメッセージや設定オブジェクトなど、値が小さく安定したものの固定
              </li>
              <li>
                小さなコンポーネントの、変化させたくないマークアップ構造の監視
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              陳腐化する場面
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                巨大なコンポーネントツリー全体を保存する。差分が大きすぎて誰もレビューしない
              </li>
              <li>
                日時・乱数・自動採番など、実行ごとに変わる値を含む。毎回失敗するので更新が常態化する
              </li>
              <li>
                失敗するたびに内容を読まず{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  --update
                </code>{" "}
                で上書きする。バグ混入も一緒に固定されてしまう
              </li>
            </ul>

            <InfoBox type="warning" title="陳腐化のサイン">
              <p>
                レビューで「スナップショットの差分は見ずに Approve
                する」習慣がついたら、
                そのスナップショットはすでに陳腐化しています。 巨大な{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  .snap
                </code>{" "}
                ファイルは、テストしているつもりで何も守っていない状態になりがちです。
                大きすぎるスナップショットは分割するか、要点だけを単体アサートで検証する形に置き換えます。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              判断軸
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <strong>出力が小さいか</strong>:
                差分を人間が一目で読めるサイズか
              </li>
              <li>
                <strong>出力が安定しているか</strong>:
                実行ごとに変わる値（日時・乱数）を含まないか
              </li>
              <li>
                <strong>更新時に差分を読むか</strong>:{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  --update
                </code>{" "}
                を無思考で叩かない運用ができるか
              </li>
            </ul>
          </section>

          {/* セクション 3: ビジュアルリグレッション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ビジュアルリグレッション
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              スナップショットが DOM
              構造やシリアライズ結果というテキストを比較するのに対し、
              ビジュアルリグレッションは実際に描画された結果（ピクセル）を比較します。
              CSS
              の崩れ、余白のズレ、色の変化など、テキスト比較では捉えにくい見た目の退行を検出できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              toHaveScreenshot：画面をピクセルで比較する
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Playwright の{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                toHaveScreenshot()
              </code>{" "}
              は、初回実行で基準画像を保存し、以降はその基準画像と現在の描画をピクセル比較します。
              動作はスナップショットと同じ「初回保存・次回比較」ですが、比較対象が画像である点が異なります。
            </p>

            <CodeBlock
              language="ts"
              title="toHaveScreenshot で描画結果を比較する"
              code={`import { test, expect } from "@playwright/test";

test("トップページの見た目が退行していない", async ({ page }) => {
  await page.goto("/");
  // 初回は基準画像を保存し、次回以降はその画像とピクセル比較する
  await expect(page).toHaveScreenshot("landing.png");
});

test("カード単体の見た目を固定する", async ({ page }) => {
  await page.goto("/components/card");
  const card = page.getByRole("article").first();
  // 要素単位でも撮影できる。範囲を絞るほど差分が読みやすい
  await expect(card).toHaveScreenshot("card.png");
});`}
            />

            <p className="text-foreground/80 mb-4 leading-relaxed">
              基準画像を更新するときは Playwright の更新フラグを使います。
              スナップショットと同様、更新は差分を確認してから行います。
            </p>

            <CodeBlock
              language="bash"
              title="基準画像の更新"
              code={`# 差分を確認したうえで基準画像を更新する
npx playwright test --update-snapshots`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3">
              仕様と実測のギャップ：偽陽性が出る性質
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              仕様上は「同じ HTML と CSS なら同じ画像になる」はずですが、
              実測ではフォントのレンダリング差や anti-aliasing、
              スクロールバーの有無などで数ピクセルの差が出ることがあります。
              理由は、描画が OS・GPU・ブラウザバージョンに依存するためです。
              ローカルで撮った基準画像を Linux の CI で比較すると、
              コードを変えていないのに差分として報告される、という偽陽性がこれにあたります。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <strong>しきい値</strong>:{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  maxDiffPixelRatio
                </code>{" "}
                や{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  threshold
                </code>{" "}
                で許容差を設定し、微小な差を無視する
              </li>
              <li>
                <strong>環境をそろえる</strong>: 基準画像を CI と同じ OS（多くは
                Docker の Linux 上）で生成する
              </li>
              <li>
                <strong>待機とアニメーション停止</strong>:
                フォント読み込みの完了を待ち、アニメーションを止めてから撮影する
              </li>
            </ul>

            <CodeBlock
              language="ts"
              title="偽陽性を抑える設定（playwright.config.ts）"
              code={`import { defineConfig } from "@playwright/test";

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      // 1% までのピクセル差は許容する（フォント差などを吸収）
      maxDiffPixelRatio: 0.01,
      // CSS アニメーションを無効化して撮影を安定させる
      animations: "disabled",
    },
  },
});`}
            />

            <InfoBox type="info" title="基準画像は生成環境を固定する">
              <p>
                ビジュアルリグレッションで最も多いつまずきは、 手元の macOS
                で撮った基準画像を Linux の CI
                と比較して常に落ちる、というものです。 基準画像は CI
                と同じ環境（同じ OS・同じブラウザバージョン、多くは
                Docker）で生成し、 リポジトリにコミットして共有します。
                こうすることで「環境差の偽陽性」と「本当の退行」を切り分けられます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: Storybook + Chromatic */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Storybook + Chromatic
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              基準画像を自分でコミット・管理する運用は、
              ページ数やコンポーネント数が増えるほど負担が大きくなります。
              Chromatic は Storybook の各 Story をクラウド上で撮影し、
              前回ビルドとの差分を Web の UI で見せるサービスです。
              基準画像の保管や環境固定をサービス側が肩代わりし、
              人間は「その差分が意図通りか」の判断に集中できます。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>Story ごとにスクリーンショットを自動取得する</li>
              <li>前回ビルド（ベースライン）との差分を並べて表示する</li>
              <li>
                レビュアーが差分ごとに Accept / Reject を判定し、GitHub PR
                のステータスに反映する
              </li>
            </ul>

            <InfoBox type="info" title="Chromatic の詳しい設定は別ページで">
              <p>
                このサイトの Storybook 教材に、Chromatic
                を使ったビジュアルリグレッションの
                セットアップ・しきい値調整・CI 連携をまとめたページがあります。
                設定の手を動かす段階になったら、そちらへ進んでください。
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 mt-3">
                <li>
                  <Link
                    href="/react/storybook/figma"
                    className="text-primary underline"
                  >
                    Figma 連携と Chromatic
                  </Link>{" "}
                  — Story を起点に Figma と Chromatic をつなぐ
                </li>
                <li>
                  <Link
                    href="/react/cdd-flow/design-qa"
                    className="text-primary underline"
                  >
                    デザイン QA の自動化
                  </Link>{" "}
                  — Chromatic のしきい値・フォント差対処・CI 連携を実践する
                </li>
              </ul>
            </InfoBox>

            <p className="text-foreground/80 mb-4 leading-relaxed">
              Chromatic
              を導入すると、これまで手動で並べて確認していた「変更前後の見た目」が
              PR 上のステータスチェックになります。 前ページの{" "}
              <Link
                href="/react/cdd-flow/design-qa"
                className="text-primary underline"
              >
                デザイン QA の自動化
              </Link>{" "}
              では、フォントレンダリング差への対処や viewport ごとの撮影など、
              運用で必要になる調整を具体的に扱っています。
            </p>
          </section>

          {/* セクション 5: 判断軸のまとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              判断軸のまとめ
            </h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              スナップショットとビジュアルリグレッションは、
              単体アサートで表現しづらいものを「丸ごと比較」で守るための手法です。
              裏を返すと、単体アサートで表現できるものにこれらを使うと、
              テストの意図が読み取りにくくなります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              使う / 使わないの目安
            </h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4">
              <li>
                <strong>単体アサートで書けるもの</strong>:{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  toBe
                </code>{" "}
                や{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  toEqual
                </code>{" "}
                で意図が明示できるなら、スナップショットにしない
              </li>
              <li>
                <strong>安定した構造の監視</strong>:
                変化させたくない小さなマークアップやオブジェクトはスナップショットで固定する
              </li>
              <li>
                <strong>見た目そのものの監視</strong>: CSS
                の崩れや余白のズレなど、描画結果でしか捉えられない退行はビジュアルリグレッションで守る
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-3">
              テストピラミッドの中での位置づけ
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テストピラミッドは、下から単体テスト・結合テスト・E2E
              テストの順に、上へ行くほど実行コストが高く数を絞る、という考え方です。
              スナップショットは対象の粒度に応じて単体〜結合の層に、
              ビジュアルリグレッションは実ブラウザで描画を撮影するため E2E
              に近い上位層に位置づきます。 上位ほど遅く不安定になりやすいので、
              数を絞り、下位のアサートで表現できるものは下位に置くのが基本です。
            </p>

            <InfoBox type="info" title="丸ごと比較は補助線として使う">
              <p>
                スナップショットとビジュアルリグレッションは、 単体・結合・E2E
                のアサートを置き換えるものではなく、
                それらでは捉えきれない「構造の変化」「見た目の変化」を補う補助線です。
                何を検証しているかが差分から読み取れる状態を保つことが、
                これらの手法を陳腐化させないための条件です。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <Quiz
            question="スナップショットテストが「陳腐化」した状態を最もよく表しているのはどれですか？"
            options={[
              {
                label:
                  "小さなオブジェクトの出力を toMatchInlineSnapshot で固定している",
              },
              {
                label:
                  "巨大な .snap ファイルの差分を誰も読まず、失敗するたびに --update で上書きしている",
                correct: true,
              },
              {
                label: "純粋関数の変換結果をスナップショットで監視している",
              },
              {
                label:
                  "更新前に差分を確認してから基準を更新する運用ができている",
              },
            ]}
            explanation="陳腐化とは、スナップショットが大きすぎて差分がレビューされず、失敗するたびに内容を読まずに更新される状態です。これではバグ混入も一緒に固定され、テストが緑でも何も守っていないことになります。小さく安定した出力を固定し、更新時に差分を読む運用であれば陳腐化しません。"
          />

          {/* Quiz 2 */}
          <Quiz
            question="ビジュアルリグレッションで、コードを変更していないのに CI で差分が報告される主な理由はどれですか？"
            options={[
              { label: "DOM の構造がテキストとして変わったため" },
              {
                label:
                  "フォントレンダリングや anti-aliasing が OS・ブラウザによって異なるため",
                correct: true,
              },
              { label: "toBe によるアサートが失敗したため" },
              { label: "スナップショットファイルが存在しないため" },
            ]}
            explanation="ビジュアルリグレッションは描画結果（ピクセル）を比較するため、フォントレンダリングや anti-aliasing の環境差で数ピクセルの差が出て偽陽性になります。しきい値の設定、基準画像の生成環境を CI とそろえること、フォント待機とアニメーション停止で対処します。DOM 構造の比較はスナップショット側の話です。"
          />

          {/* 参考リンク */}
          <ReferenceLinks
            links={[
              {
                title: "Vitest - Snapshot",
                url: "https://vitest.dev/guide/snapshot.html",
                description:
                  "toMatchSnapshot / toMatchInlineSnapshot の使い方と更新方法の公式ガイド。",
              },
              {
                title: "Playwright - Visual comparisons",
                url: "https://playwright.dev/docs/test-snapshots",
                description:
                  "toHaveScreenshot によるピクセル比較としきい値設定の公式ドキュメント。",
              },
              {
                title: "Chromatic",
                url: "https://www.chromatic.com/docs/",
                description:
                  "Storybook の Story をクラウドで撮影・比較するビジュアルテストサービスの公式ドキュメント。",
              },
            ]}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
