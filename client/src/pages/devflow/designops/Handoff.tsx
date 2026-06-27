import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const gapTactics = [
  {
    title: "トークンを単一の出所にする",
    description:
      "色や余白の値を、デザインと実装が同じトークンから参照する。値の二重管理をやめると、ズレが構造的に減る。",
  },
  {
    title: "コンポーネント名を揃える",
    description:
      'Figma の「Button / Primary」とコードの <Button variant="primary"> を対応させる。名前が一致すると会話が速い。',
  },
  {
    title: "状態を漏れなく渡す",
    description:
      "hover・disabled・loading・エラーといった状態をデザイン側で用意する。実装後の「この状態は？」を減らせる。",
  },
];

export default function Handoff() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        {/* Header */}
        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            デザインとエンジニアの協業・ハンドオフ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ハンドオフは、デザインを実装へ受け渡す工程です。 Figma Dev
            Mode・トークン同期・Storybook・Code Connect といった道具を使い、
            デザインと実装のギャップを減らす工夫を一通り整理します。
            道具より大切なのは、共通言語をつくり、デザイナーを早期に巻き込むという協業の姿勢です。
          </p>
        </div>

        <WhyNowBox
          tags={["ハンドオフ", "Dev Mode", "デザイントークン", "Code Connect"]}
        >
          <p>
            「デザイン通りに作ったはずが、なぜか違う」——この摩擦の多くは、
            デザインと実装が別々の世界として扱われることから生まれます。
            ハンドオフを「完成したデザインを投げ渡す儀式」ではなく、
            「最初から地続きにする仕組み」として捉え直すと、手戻りは大きく減ります。
            トークンやコンポーネント名を揃え、早い段階から会話することが鍵になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Figma Dev Mode */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Figma Dev Mode
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Dev Mode は、エンジニアがデザインを「実装の視点」で見るための
              Figma の機能です。 要素を選ぶと、余白・サイズ・色がそのまま読め、
              CSS や各種フレームワーク向けのスニペットも確認できます。
              デザインを目視で測り直す手間が減り、値の取り違えを防げます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ただし、自動生成されるコードはあくまで参考です。
              仕様（生成スニペット）では絶対値の px が並びますが、
              実測ではプロジェクトのトークンやレスポンシブ設計に置き換える必要があります。
              理由は、Dev Mode は 1 画面のスナップショットを見ているだけで、
              アプリ全体の設計方針までは知らないためです。生成物は出発点として使います。
            </p>

            <InfoBox type="info" title="Dev Mode は「測る道具」">
              Dev Mode
              の価値は、値を正確に読めることと、デザインの変更箇所を追えることにあります。
              生成コードをそのまま貼るのではなく、自分たちのトークンに翻訳して使うのが前提です。
            </InfoBox>
          </section>

          {/* デザイントークンの同期 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザイントークンの同期
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ギャップを根本から減らす一番の方法は、
              デザインと実装が同じトークンを参照することです。 Figma の
              Variables で定義した値を書き出し、 コード側の CSS
              変数や設定に取り込むことで、値の二重管理をなくせます。
              色をひとつ変えれば、デザインとコードの両方が同じ方向に揃います。
            </p>

            <CodeBlock
              language="json"
              title="書き出したデザイントークンの例（W3C 形式）"
              code={`{
  "color": {
    "primary": { "$value": "#2563EB", "$type": "color" },
    "foreground": { "$value": "#3F3F46", "$type": "color" }
  },
  "spacing": {
    "sm": { "$value": "8px", "$type": "dimension" },
    "md": { "$value": "16px", "$type": "dimension" }
  }
}`}
            />

            <CodeBlock
              language="ts"
              title="トークンを CSS 変数に変換して取り込む"
              code={`// トークンを CSS カスタムプロパティへ変換する最小例
import tokens from "./design-tokens.json";

function toCssVariables(group: Record<string, { $value: string }>, prefix: string) {
  return Object.entries(group)
    .map(([name, token]) => \`  --\${prefix}-\${name}: \${token.$value};\`)
    .join("\\n");
}

const css = \`:root {\\n\${toCssVariables(tokens.color, "color")}\\n}\`;`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="デザインと実装のギャップを最も根本的に減らす方法はどれ？"
              options={[
                { label: "ハンドオフ前のミーティングを長くする" },
                {
                  label:
                    "色や余白をトークンとして一元化し、デザインと実装が同じ値を参照する",
                  correct: true,
                },
                { label: "Dev Mode の生成コードをそのまま貼り付ける" },
                { label: "実装後にデザイナーが全画面を作り直す" },
              ]}
              explanation="値の二重管理がズレの温床です。トークンを単一の出所にして、デザインと実装が同じ値を参照すれば、色を一箇所変えるだけで両者が揃います。Dev Mode の生成コードは参考であり、プロジェクトのトークンに翻訳して使うのが前提です。"
            />
          </section>

          {/* Storybook */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Storybook での共有
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Storybook
              は、実装されたコンポーネントを単体で並べて確認できるツールです。
              ボタンの全バリエーション、入力欄のエラー状態などを一覧で見られるため、
              デザイナーは「実装後の本物」を触ってデザインとの差を確認できます。
              デザインとコードの<strong>突き合わせの場</strong>
              として機能します。
            </p>

            <CodeBlock
              language="tsx"
              title="Storybook のストーリー例"
              code={`import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: { variant: "primary", children: "保存する" },
};

export const Disabled: StoryObj<typeof Button> = {
  args: { variant: "primary", disabled: true, children: "保存する" },
};`}
            />

            <InfoBox type="success" title="Storybook は「生きたカタログ」">
              実装と同じコードで描画されるので、デザインデータより実態に近い状態を確認できます。
              デザイナーがここでレビューすると、デザインQA
              の差分検証がそのまま回せます。
            </InfoBox>
          </section>

          {/* Code Connect */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Code Connect
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Code Connect は、Figma
              のコンポーネントと実装のコンポーネントを紐づける Figma
              の仕組みです。 対応づけておくと、Dev Mode
              でそのコンポーネントを選んだときに、
              実際に使うべきコードスニペット（自分たちの{" "}
              <code>&lt;Button&gt;</code> の呼び出し方）が表示されます。
              汎用的な生成コードではなく、プロジェクト固有の正しい使い方が出るのが利点です。
            </p>

            <CodeBlock
              language="ts"
              title="Code Connect の対応づけ例"
              code={`import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(Button, "https://figma.com/file/xxx?node-id=1:23", {
  props: {
    label: figma.string("Label"),
    variant: figma.enum("Variant", {
      Primary: "primary",
      Secondary: "secondary",
    }),
  },
  example: ({ label, variant }) => <Button variant={variant}>{label}</Button>,
});`}
            />
          </section>

          {/* 実装ギャップを減らす工夫 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              実装ギャップを減らす工夫と共通言語
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              道具を揃えるだけでなく、運用での工夫もギャップを縮めます。
              特に効くのが<strong>共通言語</strong>
              、つまりコンポーネント名の統一です。 Figma の「Button /
              Primary」とコードの <code>variant=&quot;primary&quot;</code>{" "}
              が一致していれば、
              「あのプライマリボタン」と言うだけで両者が同じものを思い浮かべられます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gapTactics.map((t) => (
                <div
                  key={t.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {t.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* デザイナーを早期に巻き込む */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザイナーを早期に巻き込む
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ハンドオフを「最後に渡す儀式」にすると、実装段階で見つかった制約が手戻りを生みます。
              そうではなく、デザイナーを開発の早い段階から巻き込み、
              技術的な制約や既存コンポーネントの状況を共有しながら設計すると、
              実現しやすいデザインが最初から生まれます。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              協業は一方通行ではありません。
              エンジニアもデザインの意図を理解し、デザイナーも実装の都合を知る。
              互いの領域に少しずつ踏み込むことで、ハンドオフは「受け渡し」から「共同作業」へ変わります。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Code Connect を設定する主な利点はどれ？"
              options={[
                { label: "Figma のファイルサイズを小さくできる" },
                {
                  label:
                    "Dev Mode で、汎用コードではなくプロジェクト固有の正しいコンポーネントの使い方が表示される",
                  correct: true,
                },
                { label: "デザイナーがコードを書けるようになる" },
                { label: "Storybook が不要になる" },
              ]}
              explanation="Code Connect は Figma コンポーネントと実装コンポーネントを紐づけ、Dev Mode で自分たちの <Button> の正しい呼び出し方を表示します。汎用的な生成コードではなくプロジェクト固有の使い方が出るため、実装ギャップが減ります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Figma Dev Mode 公式ガイド",
                  url: "https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode",
                  description:
                    "Dev Mode の使い方と、エンジニア向けの機能を解説",
                },
                {
                  title: "Figma Code Connect ドキュメント",
                  url: "https://www.figma.com/code-connect-docs/",
                  description: "Figma コンポーネントとコードを紐づける設定方法",
                },
                {
                  title: "Storybook 公式サイト",
                  url: "https://storybook.js.org/",
                  description:
                    "コンポーネントを単体で開発・共有するためのツール",
                },
              ]}
            />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
