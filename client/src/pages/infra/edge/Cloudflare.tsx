import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const products = [
  {
    title: "DNS",
    role: "名前解決",
    description:
      "ドメイン名を IP に変換する権威 DNS。Cloudflare に向けることで、以降のトラフィックが Cloudflare 網を経由するようになる。",
  },
  {
    title: "CDN",
    role: "配信高速化",
    description:
      "世界中のエッジに静的・動的コンテンツをキャッシュし、利用者に近い拠点から配信する。",
  },
  {
    title: "WAF",
    role: "アプリ層防御",
    description:
      "Web Application Firewall。SQL インジェクションや XSS など、HTTP リクエストに含まれる攻撃をルールで遮断する。",
  },
  {
    title: "DDoS 対策",
    role: "可用性維持",
    description:
      "大量トラフィックによる攻撃をエッジで吸収・緩和し、オリジンに到達させない。",
  },
  {
    title: "SSL/TLS",
    role: "暗号化",
    description:
      "証明書の発行と更新を自動化し、HTTPS を簡単に有効化する。エッジで TLS を終端する。",
  },
  {
    title: "Zero Trust",
    role: "アクセス制御",
    description:
      "社内アプリやリソースへのアクセスを、ネットワーク境界ではなく ID と文脈で都度検証する。",
  },
];

const workers = [
  {
    title: "Workers",
    examples: "エッジ実行ランタイム",
    description:
      "V8 isolate 上で動くサーバレス実行環境。世界中のエッジでコードを走らせ、リクエストに近い場所で処理する。",
  },
  {
    title: "KV",
    examples: "キーバリューストア",
    description:
      "読み取りが多く結果整合で十分な用途向けの分散ストレージ。設定値やフラグの配布に向く。",
  },
  {
    title: "D1",
    examples: "SQLite ベースDB",
    description:
      "SQL を扱えるエッジ向けデータベース。リレーショナルなデータを Workers から直接クエリできる。",
  },
  {
    title: "R2",
    examples: "オブジェクトストレージ",
    description:
      "S3 互換のオブジェクトストレージ。下り転送（egress）課金がない設計で、画像やファイル配信に使われる。",
  },
  {
    title: "Queues",
    examples: "メッセージキュー",
    description:
      "非同期処理のためのキュー。重い処理をリクエストから切り離し、後続のワーカーで消化する。",
  },
];

export default function Cloudflare() {
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
            Cloudflare の全体像
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Cloudflare は「DNS とリバースプロキシ」を入り口に、CDN・WAF・DDoS
            対策・SSL/TLS、 さらに Zero Trust や Workers
            までを束ねた広範なプラットフォームです。
            製品が多く全体像を掴みにくいので、
            このページでは「トラフィックがどこを通るか」という軸で各製品の役割を整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["Cloudflare", "DNS", "CDN", "WAF", "Workers", "Zero Trust"]}
        >
          <p>
            フロントエンドのデプロイやドメイン管理で Cloudflare
            に触れる機会は多いものの、
            ダッシュボードに並ぶ製品の多さに圧倒されがちです。
            個々の機能を暗記するより、
            <strong>
              「利用者のリクエストが Cloudflare のどこを通って処理されるか」
            </strong>
            という流れを掴むほうが、各製品の立ち位置を一度に理解できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* DNS + リバースプロキシ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              立ち位置：DNS とリバースプロキシ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Cloudflare の出発点は<strong>権威 DNS</strong>です。 ドメインの
              DNS を Cloudflare に向けると、利用者のリクエストは
              オリジンへ直接行かず、まず Cloudflare のエッジを経由します。 この
              「間に立つ」構造が<strong>リバースプロキシ</strong>です。
              リクエストがエッジを通ることで、CDN・WAF・DDoS 対策・TLS
              終端といった機能を、 オリジンに手を入れずに後付けできます。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">利用者</p>
                  <p className="text-muted-foreground">
                    ブラウザやアプリ。DNS で Cloudflare のエッジへ案内される
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">Cloudflare</p>
                  <p className="text-muted-foreground">
                    間に立つリバースプロキシ。ここで防御・キャッシュ・TLS を処理
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">オリジン</p>
                  <p className="text-muted-foreground">
                    自前のサーバ。エッジを通った正当なリクエストだけ受ける
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="proxied（オレンジ雲）とは">
              Cloudflare の DNS
              設定で「proxied」を有効にすると、その名前への通信がエッジを経由します。
              逆に「DNS
              only（グレー雲）」にすると名前解決だけ担い、トラフィックはオリジンへ直行します。
              CDN や WAF が効くのは proxied
              のときだけ、という点が混乱しやすいポイントです。
            </InfoBox>
          </section>

          {/* 製品グリッド */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              エッジで提供される主な機能
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              リクエストがエッジを通る構造を前提に、Cloudflare
              は複数の機能をその経路上に重ねています。
              配信・防御・暗号化・アクセス制御が、
              オリジンに到達する前に処理されると捉えると整理しやすくなります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {p.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {p.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Cloudflare で CDN や WAF を効かせるための前提はどれ？"
              options={[
                {
                  label: "DNS レコードが proxied（エッジ経由）になっていること",
                  correct: true,
                },
                { label: "オリジンを必ず米国に置くこと" },
                { label: "Workers を有効化していること" },
                { label: "独自の証明書を手動で更新すること" },
              ]}
              explanation="Cloudflare の防御・キャッシュ・TLS 終端は、トラフィックがエッジ（リバースプロキシ）を通ることで機能します。DNS only（グレー雲）だと名前解決だけでトラフィックはオリジンに直行するため、CDN や WAF は効きません。proxied（オレンジ雲）が前提です。"
            />
          </section>

          {/* SSL/TLS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              SSL/TLS の自動化
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Cloudflare はドメインの証明書発行と更新を自動で行い、HTTPS
              を手間なく有効化します。 利用者とエッジの間は Cloudflare
              が用意した証明書で暗号化され、 エッジとオリジンの間は別途
              <strong>暗号化モード</strong>で制御します。
              このモード選択を誤ると、暗号化が
              「途中までしか効かない」状態になり得るので注意が必要です。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      モード
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      エッジ⇄オリジン
                    </th>
                    <th className="text-left py-2 px-3 text-foreground font-bold">
                      備考
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Flexible</td>
                    <td className="py-2 px-3">暗号化なし（HTTP）</td>
                    <td className="py-2 px-3">オリジンまで平文。原則避ける</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Full</td>
                    <td className="py-2 px-3">暗号化あり（証明書検証なし）</td>
                    <td className="py-2 px-3">自己署名証明書でも可</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Full (strict)</td>
                    <td className="py-2 px-3">暗号化＋証明書検証</td>
                    <td className="py-2 px-3">推奨。正規証明書が必要</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="Flexible は「南京錠が出るのに平文」">
              Flexible
              モードはブラウザに鍵マークを出しますが、エッジからオリジンへの区間は平文です。
              利用者には HTTPS
              に見えて、実態は途中から暗号化されていない、という危うい状態になります。
              オリジンに証明書を置いて Full (strict) を選ぶのが安全です。
            </InfoBox>
          </section>

          {/* Zero Trust */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Zero Trust の概観
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              従来の社内ネットワークは「中に入れた人は信頼する」境界防御でした。
              <strong>Zero Trust</strong>はこの前提を置かず、
              リソースへのアクセスを毎回「誰が・どの端末で・どんな状況で」検証します。
              Cloudflare はこの考え方を <strong>Access</strong>（ID
              ベースのアクセス制御）と
              <strong>Tunnel</strong>
              （オリジンを公開せず安全に接続）として提供し、 VPN
              に頼らない社内アプリ公開を可能にします。
            </p>

            <InfoBox type="info" title="VPN との違い">
              VPN は「ネットワークに入れる＝信頼」ですが、Zero Trust
              は「アクセスのたびに ID と文脈を検証」します。
              アプリ単位で許可を絞れるため、1
              つの端末が侵害されても被害範囲を限定しやすくなります。
            </InfoBox>
          </section>

          {/* Workers エコシステム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Workers エコシステムの俯瞰
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Workers
              はエッジでコードを実行する仕組みで、その周辺にデータを扱う各種ストレージが揃っています。
              Workers を「処理」、KV・D1・R2・Queues
              を「保存・連携」の部品と捉えると、 全体像がつかみやすくなります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {workers.map((w) => (
                <div
                  key={w.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {w.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {w.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {w.description}
                  </p>
                </div>
              ))}
            </div>

            <CodeBlock
              language="ts"
              title="最小の Worker（リクエストにエッジで応答する）"
              code={`export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    // エッジで動くので、利用者に近い場所から即座に返せる
    return new Response("Hello from the edge: " + url.pathname);
  },
};`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Workers の実行モデル（V8
              isolate）や制約は、次のエッジ関数のページで詳しく扱います。
              ここでは「Cloudflare
              には自前のコードをエッジで動かす層がある」という位置づけを押さえれば十分です。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Workers のストレージ製品のうち、SQL を扱えるリレーショナルなデータベースはどれ？"
              options={[
                { label: "KV（キーバリューストア）" },
                { label: "R2（オブジェクトストレージ）" },
                { label: "D1（SQLite ベース）", correct: true },
                { label: "Queues（メッセージキュー）" },
              ]}
              explanation="D1 は SQLite をベースにしたエッジ向けデータベースで、SQL クエリを扱えます。KV はキーバリュー、R2 は S3 互換のオブジェクトストレージ、Queues は非同期処理用のメッセージキューで、それぞれ役割が異なります。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Cloudflare Docs",
                  url: "https://developers.cloudflare.com/",
                  description:
                    "DNS・CDN・WAF から Workers まで全製品をまとめた公式ドキュメントの入口",
                },
                {
                  title: "Cloudflare Workers Docs",
                  url: "https://developers.cloudflare.com/workers/",
                  description:
                    "エッジ実行ランタイムと KV・D1・R2・Queues の使い方",
                },
                {
                  title: "Cloudflare Zero Trust Docs",
                  url: "https://developers.cloudflare.com/cloudflare-one/",
                  description:
                    "Access と Tunnel を中心とした Zero Trust の概念と設定",
                },
                {
                  title: "Cloudflare SSL/TLS encryption modes",
                  url: "https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/",
                  description:
                    "Flexible・Full・Full (strict) の違いと安全な選び方",
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
