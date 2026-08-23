import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const approaches = [
  {
    title: "コードファースト",
    flow: "実装 → OpenAPI",
    description:
      "先に実装を書き、関数やモデルにアノテーション（デコレータ）を付けて OpenAPI を自動生成する。既存コードがある場合に始めやすいが、ドキュメントは実装の「後追い」になる。",
  },
  {
    title: "スキーマ / デザインファースト",
    flow: "OpenAPI → 実装・型・モック",
    description:
      "先に OpenAPI を書き、そこから実装・型・モックを派生させる。契約が実装に先行するので、フロントとバックが合意した仕様を正本（Single Source of Truth）に固定できる。",
  },
];

const workflow = [
  {
    step: "1",
    title: "OpenAPI を書く",
    description:
      "エンドポイント・リクエスト・レスポンス・スキーマを YAML で記述する。これが契約の正本になる。",
  },
  {
    step: "2",
    title: "Spectral で Lint",
    description:
      "命名規則・必須フィールド・説明文の有無などをルールで検証し、仕様の品質を機械的に担保する。",
  },
  {
    step: "3",
    title: "Prism でモック起動",
    description:
      "OpenAPI から自動でモックサーバを立て、実装を待たずにフロントが叩けるようにする。",
  },
  {
    step: "4",
    title: "openapi-typescript で型生成",
    description:
      "OpenAPI から TypeScript の型を生成し、フロント・バック双方が同じ契約の型を共有する。",
  },
  {
    step: "5",
    title: "実装",
    description:
      "契約に従ってバックエンドを実装する。契約はあくまで OpenAPI 側が正本で、実装はそれに合わせる。",
  },
];

export default function SchemaFirst() {
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
            スキーマファースト開発
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            スキーマ（デザイン）ファーストは、実装より先に OpenAPI で API
            の契約を書き、そこから実装・型・モックを派生させる進め方です。
            契約が実装に先行するため、フロントとバックが合意した仕様を正本に固定でき、
            両者が並行して開発を進められます。ここでは 2
            つのアプローチの違いと、デザインファーストの具体的なワークフローを押さえます。
          </p>
        </div>

        <WhyNowBox
          tags={["OpenAPI", "デザインファースト", "契約", "型生成", "モック"]}
        >
          <p>
            API
            を実装してからドキュメントを書くと、ドキュメントは常に実装の後追いになり、
            ズレに気づくのは結合のタイミングです。先に契約を書いて
            <strong>正本（Single Source of Truth）</strong>
            に据えると、フロントは実装完成を待たずにモックで開発でき、
            型も契約から生成できます。並行開発のスピードと契約の一貫性を両立させたいときに、
            デザインファーストは効きます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 2つのアプローチ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              2 つのアプローチ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OpenAPI と実装の関係には、大きく 2
              つの方向があります。どちらを正本にするかが本質的な違いです。
              コードファーストは「実装が正本」、デザインファーストは「OpenAPI
              が正本」になります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {approaches.map((a) => (
                <div
                  key={a.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {a.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {a.flow}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="どちらが正しいわけではない">
              既存の大きな実装にドキュメントを追従させたいならコードファーストが現実的です。
              一方、新規開発でフロントとバックを並行で進めたい、契約を合意してから着手したい場合は、
              デザインファーストが向いています。チームの状況で選びます。
            </InfoBox>
          </section>

          {/* デザインファーストの利点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デザインファーストの利点
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              契約を先に確定させることで、開発の進め方そのものが変わります。
              特に効果が大きいのは次の 3 点です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">並行開発</p>
                  <p className="text-muted-foreground">
                    契約合意後はフロントとバックが互いの完成を待たずに進められる
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">先行モック</p>
                  <p className="text-muted-foreground">
                    OpenAPI
                    からモックを起動でき、実装前にフロントが叩いて検証できる
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">契約先行</p>
                  <p className="text-muted-foreground">
                    契約が実装に先行するので、認識のズレが起きにくい
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              要点は「契約が実装より先にある」ことです。フロントは
              <code>users</code> の形が確定していれば、サーバ実装が 0
              行でもモックを相手に画面を作り込めます。バックは同じ契約に向かって実装するだけです。
            </p>
          </section>

          {/* ワークフロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ワークフロー
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              デザインファーストの典型的な流れは次の 5
              ステップです。中心にあるのは「OpenAPI
              を正本に据える」という一点で、
              Lint・モック・型生成はすべてこの正本から派生します。
            </p>

            <div className="space-y-3 mb-6">
              {workflow.map((w) => (
                <div
                  key={w.step}
                  className="rounded-xl border border-border bg-card p-4 flex gap-4 items-start"
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {w.step}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm mb-1">
                      {w.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {w.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <InfoBox type="success" title="正本は OpenAPI に固定する">
              Lint も モックも 型も、すべて OpenAPI
              から派生します。実装やドキュメントを手で別々にメンテすると必ずズレるので、
              「変更はまず OpenAPI
              に入れる」というルールをチームで徹底することが肝心です。
            </InfoBox>
          </section>

          {/* 型生成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              openapi-typescript で型を生成する
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              openapi-typescript は OpenAPI 仕様から TypeScript
              の型定義を生成するツールです。手で型を書き写す必要がなくなり、
              契約が変われば型を再生成するだけでフロントの型が追従します。
            </p>

            <CodeBlock
              language="bash"
              title="OpenAPI から TypeScript 型を生成"
              code={`# openapi.yaml から型を生成して src/api/schema.d.ts に出力
npx openapi-typescript ./openapi.yaml -o ./src/api/schema.d.ts`}
            />

            <p className="text-muted-foreground my-6 leading-relaxed">
              下のような OpenAPI
              のスキーマがあるとき、生成される型は次のようになります。
              <code>required</code> に含まれないフィールドは省略可能（
              <code>?</code>）として表現され、
              契約の必須・任意がそのまま型に反映されます。
            </p>

            <CodeBlock
              language="yaml"
              title="openapi.yaml（抜粋）"
              code={`components:
  schemas:
    User:
      type: object
      required: [id, name]
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        email:
          type: string
          format: email`}
            />

            <CodeBlock
              language="ts"
              title="生成される型（schema.d.ts 抜粋）"
              code={`export interface components {
  schemas: {
    User: {
      /** Format: int64 */
      id: number;
      name: string;
      /** Format: email */
      email?: string;
    };
  };
}

// 利用側はこう参照する
import type { components } from "./api/schema";
type User = components["schemas"]["User"];`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="デザインファースト開発の利点として最も的確なのはどれ？"
              options={[
                { label: "サーバの応答が必ず速くなる" },
                {
                  label:
                    "契約を先に合意するので、フロントとバックがモックを使って並行開発できる",
                  correct: true,
                },
                { label: "OpenAPI を書かなくても型が生成される" },
                { label: "実行時の型のズレが自動的に解消される" },
              ]}
              explanation="デザインファーストの核心は「契約が実装に先行する」ことです。契約を正本に固定すると、フロントはモックを相手に実装完成を待たずに開発でき、バックは同じ契約に向かって実装します。応答速度や実行時の挙動はこのアプローチでは保証されません。"
            />
          </section>

          {/* 契約のズレの実例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              契約のズレは静かに起きる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              スキーマを正本に固定すべき理由は、契約のズレが
              <strong>静かに</strong>
              起きるからです。型を生成しても、実装がその型どおりに振る舞う保証はありません。
              典型的なズレを 2 つ挙げます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-bold text-foreground">
                      契約（OpenAPI）
                    </th>
                    <th className="py-2 pr-4 font-bold text-foreground">
                      実装の実測
                    </th>
                    <th className="py-2 font-bold text-foreground">問題</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">
                      <code>id: integer</code>
                    </td>
                    <td className="py-2 pr-4">
                      文字列 <code>"42"</code> を返す
                    </td>
                    <td className="py-2">
                      型は number なのに実体は string。比較・計算で破綻
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">
                      自由形式の <code>dict[str, Any]</code> な blob
                    </td>
                    <td className="py-2 pr-4">
                      生成された型は <code>{"{ [key: string]: unknown }"}</code>{" "}
                      相当
                    </td>
                    <td className="py-2">
                      構造が表現されず型安全が効かない。中身は実質ノーチェック
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              1 つ目は「契約は <code>integer</code>{" "}
              なのに実装が文字列を返す」ケースです。 生成された型は{" "}
              <code>number</code> なので、フロントは数値として扱いますが、
              実体は文字列のため、<code>id + 1</code> が <code>"421"</code>{" "}
              になり、厳密比較も false になります。<code>-</code> や{" "}
              <code>*</code>{" "}
              は数値へ強制変換されて通ってしまうため、ズレに気づきにくくなります。
              2 つ目は、契約側でスキーマを定義せず自由形式の blob
              にしてしまうケースです。 構造が記述されていないため、生成された TS
              型は曖昧なオブジェクト型に潰れ、
              型安全のメリットが消えます。どちらも「契約をスキーマとして具体的に書き、それを正本に固定する」ことで防げます。
            </p>

            <InfoBox
              type="warning"
              title="型生成だけでは実行時のズレは防げない"
            >
              openapi-typescript が生成するのは「コンパイル時の型」です。
              実装が契約どおりに振る舞っているか（id が本当に数値で返るか）は、
              型では検証できません。これを保証するには、契約と実装の一致を実行時に突き合わせる
              <strong>契約テスト（Contract Testing）</strong>
              が必要です。次の章で扱います。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="OpenAPI から TypeScript の型を生成すれば、契約と実装のズレは防げる？"
              options={[
                {
                  label:
                    "防げない。型はコンパイル時の検査で、実装が契約どおり振る舞う保証はない",
                  correct: true,
                },
                { label: "防げる。生成された型が実行時も値を検証するから" },
                { label: "防げる。型を生成すると実装が自動修正されるから" },
                {
                  label: "防げる。OpenAPI が実行時にレスポンスを書き換えるから",
                },
              ]}
              explanation="生成される型はあくまでコンパイル時の静的な型です。サーバが契約と違う値（integer のはずが文字列）を返しても、型生成は検知しません。実行時のズレを捕まえるには、契約と実装の一致を突き合わせる契約テストが必要になります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "OpenAPI Specification",
                  url: "https://spec.openapis.org/oas/latest.html",
                  description:
                    "OpenAPI 仕様の公式リファレンス。契約の正本となるフォーマットの定義",
                },
                {
                  title: "openapi-typescript",
                  url: "https://openapi-ts.dev/",
                  description:
                    "OpenAPI から TypeScript 型を生成するツールの公式ドキュメント",
                },
                {
                  title: "Spectral",
                  url: "https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview",
                  description:
                    "OpenAPI / JSON / YAML を Lint するツール。仕様の品質をルールで担保する",
                },
                {
                  title: "Prism",
                  url: "https://docs.stoplight.io/docs/prism/674b27b261c3c-overview",
                  description:
                    "OpenAPI からモックサーバを起動するツール。実装前のフロント開発に使う",
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
