import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";

const baasFeatures = [
  {
    title: "認証 (Auth)",
    description:
      "メール・パスワード、ソーシャルログイン、マジックリンクなどを設定だけで導入できる。セッションやトークンの管理も任せられる。",
  },
  {
    title: "データベース (DB)",
    description:
      "テーブルやドキュメントを定義すれば、CRUD API が自動で用意される。クライアントから直接読み書きする構成も取れる。",
  },
  {
    title: "ストレージ (Storage)",
    description:
      "画像や動画などのファイルをアップロード・配信する仕組み。アクセス制御や CDN 配信を含めて提供される。",
  },
  {
    title: "リアルタイム",
    description:
      "データの変更をクライアントへ即座に通知する仕組み。チャットやコラボ編集のような機能を組み立てやすい。",
  },
  {
    title: "サーバーレス関数",
    description:
      "サーバを常駐させずに、必要なときだけ実行されるコード。Webhook 処理や決済連携など、クライアントに置けない処理を担う。",
  },
  {
    title: "ホスティング / 配信",
    description:
      "フロントエンドの配信や API ゲートウェイを兼ねる製品もある。一つの基盤で前後をまとめて扱える。",
  },
];

export default function WhatIsBaas() {
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
            BaaS とは
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            BaaS は「Backend as a
            Service」の略で、認証・データベース・ストレージ・
            リアルタイム通信・サーバーレス関数といったバックエンドの機能を、
            まとめてサービスとして提供する仕組みです。サーバを自前で構築・運用しなくても、
            アプリの土台になる機能を設定とコードだけで使い始められます。
          </p>
        </div>

        <WhyNowBox
          tags={["BaaS", "バックエンド", "認証", "DB", "サーバーレス"]}
        >
          <p>
            フロントエンドだけで完結するアプリは多くありません。ログイン、データの保存、
            ファイルのアップロード——どれもバックエンドが必要です。BaaS
            は、こうした
            「どのアプリにも共通して要る部分」を肩代わりしてくれます。少人数や個人開発でも、
            バックエンドの構築に時間を取られずにプロダクトの本質に集中できるため、
            まず BaaS の守備範囲と向き不向きを押さえておく価値があります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 定義 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              BaaS が肩代わりする「バックエンドの共通部分」
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              アプリのバックエンドには、どんなサービスでも繰り返し必要になる定番の機能があります。
              ユーザー管理、データの保存、ファイル配信などです。BaaS はこれらを
              <strong>あらかじめ用意された部品</strong>
              として提供し、自分でサーバを書く範囲を
              小さく保ちます。クライアントから直接サービスの API
              を叩く構成が基本で、
              サーバ層を薄く——あるいは持たずに——アプリを組み立てられます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {baasFeatures.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="「サーバを書かない」が前提ではない">
              BaaS
              を使っても、複雑なビジネスロジックはサーバーレス関数として書きます。
              BaaS は「サーバを一切書かない」ための道具ではなく、
              「どのアプリにも共通する定番部分を自作しない」ための道具だと捉えると過不足がありません。
            </InfoBox>

            <MermaidDiagram
              title="図: アプリと BaaS が提供する機能ブロック"
              chart={`flowchart TD
    A["アプリ(クライアント)"] --> B["BaaS"]
    subgraph B_INNER["BaaS が肩代わりする機能"]
      direction LR
      AU["認証(Auth)"]
      DB["データベース(DB)"]
      ST["ストレージ(Storage)"]
      RT["リアルタイム"]
      FN["サーバーレス関数"]
    end
    B --> B_INNER`}
            />
          </section>

          {/* 従来構成との違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              自前バックエンドとの違い
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              従来は、サーバを立て、DB
              を構築し、認証を実装し、それらを運用し続ける必要がありました。
              BaaS はこの一連を managed
              なサービスに置き換えます。下の表は、典型的な役割分担の違いです。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      項目
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      自前バックエンド
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      BaaS
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      認証
                    </td>
                    <td className="py-3 px-4">自分で実装・保守する</td>
                    <td className="py-3 px-4">設定で有効化する</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      DB 運用
                    </td>
                    <td className="py-3 px-4">構築・バックアップ・スケール</td>
                    <td className="py-3 px-4">サービス側が管理する</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      初期の立ち上げ
                    </td>
                    <td className="py-3 px-4">時間がかかりやすい</td>
                    <td className="py-3 px-4">短時間で始められる</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      自由度
                    </td>
                    <td className="py-3 px-4">構成を細部まで選べる</td>
                    <td className="py-3 px-4">サービスの設計に従う</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">
                      コスト
                    </td>
                    <td className="py-3 px-4">サーバ費＋運用工数</td>
                    <td className="py-3 px-4">利用量に応じた従量課金</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* メリット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              メリット — 立ち上げの速さと運用の軽さ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BaaS の利点は大きく二つに整理できます。一つは
              <strong>立ち上げの速さ</strong>。認証や DB を自作しないぶん、
              アイデアを動く形にするまでの距離が短くなります。もう一つは
              <strong>運用が要らない</strong>こと。サーバの監視、OS の更新、
              スケールの調整といった作業をサービス側に任せられるため、
              少人数でも本来作りたい機能に時間を割けます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  立ち上げが速い
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  認証・DB・ストレージが最初から使える。プロトタイプから本番まで同じ基盤で進められる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  運用の負担が小さい
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  サーバの保守やスケール調整を任せられる。インフラ専任がいなくても運用しやすい。
                </p>
              </div>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="BaaS が主に肩代わりするのはどれ？"
              options={[
                { label: "UI コンポーネントのデザイン" },
                {
                  label:
                    "認証・DB・ストレージなど、多くのアプリに共通するバックエンドの定番機能",
                  correct: true,
                },
                { label: "フロントエンドの状態管理ロジック" },
                { label: "ブラウザのレンダリング処理" },
              ]}
              explanation="BaaS は Backend as a Service の略で、認証・データベース・ストレージ・リアルタイム・サーバーレス関数といった「どのアプリにも共通して必要なバックエンド機能」をサービスとして提供します。UI や状態管理はアプリ側の責務です。"
            />
          </section>

          {/* デメリット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              デメリット — ロックイン・制約・コストの非線形
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              便利さの裏には、考えておくべき性質があります。第一に
              <strong>ロックイン</strong>。サービス固有の API
              やデータ構造に深く依存するほど、
              後から別基盤へ移すコストが上がります。第二に
              <strong>制約</strong>
              。提供される機能や設定の範囲内で設計する必要があり、
              特殊な要件を実現しづらい場面があります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              第三に<strong>コストの非線形</strong>
              です。小規模なうちは無料枠や低額で収まりますが、
              読み書き回数・転送量・関数の実行時間など複数の軸で課金されるため、
              利用が伸びたときに料金が予想より急に跳ねることがあります。
              「仕様では従量課金」でも、「実測では特定の軸だけが突出して費用を押し上げる」
              ことがあり、理由は使い方によって支配的な課金軸が変わるためです。
              料金は変動するため断定はできませんが、設計段階でどの軸が効くかを見積もる習慣が役立ちます。
            </p>

            <InfoBox
              type="warning"
              title="ロックインは「悪」ではなく「トレードオフ」"
            >
              ロックインを避けようとして抽象化を重ねると、BaaS
              の利点である速さが薄れます。
              重要なのはゼロにすることではなく、どこまで依存するかを意識して選ぶことです。
              移行可能性が要件なら、データのエクスポート手段や標準技術の採用度合いを基準に評価します。
            </InfoBox>
          </section>

          {/* いつ使う / 使わない */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              いつ使い、いつ使わないか
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              BaaS
              が向くのは、定番機能の組み合わせで成り立つアプリを素早く形にしたい場面です。
              一方で、独自性の高いインフラ要件や厳しい規制要件がある場合は、
              自前構成のほうが見通しが良いことがあります。下のコードは、
              判断の入口になる典型的なクライアント呼び出しのイメージです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-2">使うと良い場面</p>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                  <li>MVP やプロトタイプを素早く出したい</li>
                  <li>少人数でインフラ専任がいない</li>
                  <li>認証・DB・ストレージが定番構成で足りる</li>
                  <li>リアルタイム機能を手早く組みたい</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-2">
                  慎重に検討する場面
                </p>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                  <li>特殊なインフラ要件や独自最適化が必要</li>
                  <li>移行可能性を強く重視する</li>
                  <li>大量トラフィックでコスト軸を精緻に管理したい</li>
                  <li>規制で配置やデータ保管に厳しい制約がある</li>
                </ul>
              </div>
            </div>

            <CodeBlock
              language="ts"
              title="BaaS クライアントの典型的な呼び出し（イメージ）"
              code={`// 認証・DB・ストレージが一つのクライアントから扱える
const { data: user } = await client.auth.signInWithPassword({
  email: "hanako@example.com",
  password: "********",
});

// ログイン済みユーザーとして DB に問い合わせる
const { data: posts } = await client
  .from("posts")
  .select("id, title, created_at")
  .order("created_at", { ascending: false });`}
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="BaaS の「コストの非線形」とは何を指す？"
              options={[
                { label: "利用量が増えても料金は一定だということ" },
                {
                  label:
                    "読み書き回数・転送量・実行時間など複数の軸で課金され、利用が伸びると費用が急に跳ねることがある",
                  correct: true,
                },
                { label: "最初から高額な固定費がかかること" },
                { label: "料金が時間とともに必ず下がること" },
              ]}
              explanation="BaaS は複数の課金軸（リクエスト数・データ転送量・関数の実行時間など）を持つことが多く、利用が増えると特定の軸が支配的になって費用が予想以上に増えることがあります。設計段階でどの軸が効きそうかを見積もると、後の驚きを減らせます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Supabase Documentation",
                  url: "https://supabase.com/docs",
                  description:
                    "PostgreSQL ベースのオープンソース BaaS。認証・DB・ストレージ・Edge Functions を網羅",
                },
                {
                  title: "Firebase Documentation",
                  url: "https://firebase.google.com/docs",
                  description:
                    "Google が提供する BaaS。Firestore・Authentication・Cloud Functions などの公式ガイド",
                },
                {
                  title: "MDN - Client-side web APIs",
                  url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs",
                  description:
                    "クライアントから外部サービスの API を扱う際の基礎概念",
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
