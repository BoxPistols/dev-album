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
    title: "Cloud Firestore",
    description:
      "ドキュメント指向の NoSQL DB。コレクションの中にドキュメントを置く構造で、リアルタイム購読とオフライン同期に対応する。",
  },
  {
    title: "Realtime Database",
    description:
      "JSON ツリー型の古参 NoSQL DB。シンプルで低レイテンシ。Firestore とは別物で、用途に応じて選ぶ。",
  },
  {
    title: "Authentication",
    description:
      "メール・パスワード、Google・Apple などのソーシャルログイン、電話番号認証を提供する。",
  },
  {
    title: "Cloud Functions",
    description:
      "イベント駆動のサーバーレス関数。DB の書き込みや HTTP リクエストをトリガに処理を走らせる。",
  },
  {
    title: "Hosting",
    description:
      "静的サイトと SPA の配信。CDN 経由で高速配信し、Functions と組み合わせて動的処理も担える。",
  },
  {
    title: "Google Cloud 統合",
    description:
      "BigQuery などの GCP サービスと連携できる。データ分析や本格的なバックエンドへ自然に拡張できる。",
  },
];

export default function Firebase() {
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
            Firebase
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Firebase は Google が提供する BaaS で、NoSQL データベース（Firestore
            / Realtime
            Database）・認証・サーバーレス関数・ホスティングをまとめて扱えます。
            リアルタイム同期とオフライン対応に強く、モバイルアプリと相性の良い構成が特徴です。
            ここでは各プロダクトの役割と、セキュリティルールによるアクセス制御を押さえます。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "Firebase",
            "Firestore",
            "NoSQL",
            "認証",
            "セキュリティルール",
          ]}
        >
          <p>
            ログイン・データ保存・リアルタイム更新をまとめて素早く整えたいとき、Firebase
            は有力な選択肢です。 特にクライアントから DB
            へ直接アクセスする構成と、オフラインでも書き込める同期機能は、
            モバイルや不安定な回線のアプリで効きます。一方で NoSQL
            ならではのデータ設計と、
            アクセスを守るセキュリティルールは最初に理解しておきたい要点です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* プロダクト全体像 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Firebase の主なプロダクト
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Firebase は単一の製品ではなく、複数のサービスの集合です。
              アプリの土台になる
              DB・認証・関数・配信が揃い、必要なものだけ組み合わせて使います。
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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Firestore と Realtime Database */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Firestore と Realtime Database（NoSQL ドキュメント）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Firebase には DB が二種類あります。新しめの
              <strong>Cloud Firestore</strong>
              は、コレクションの中にドキュメントを置く ドキュメント指向の NoSQL
              です。クエリやスケールに優れ、多くの新規アプリの第一候補になります。
              もう一つの <strong>Realtime Database</strong> は、巨大な JSON
              ツリーとして データを持つ古参の DB
              で、構造が単純で低レイテンシな反面、複雑なクエリは苦手です。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      Cloud Firestore
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      Realtime Database
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      データ構造
                    </td>
                    <td className="py-3 px-4">コレクション / ドキュメント</td>
                    <td className="py-3 px-4">単一の大きな JSON ツリー</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      クエリ
                    </td>
                    <td className="py-3 px-4">複合クエリに強い</td>
                    <td className="py-3 px-4">単純な参照が中心</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      向いている用途
                    </td>
                    <td className="py-3 px-4">多くの新規アプリ</td>
                    <td className="py-3 px-4">低レイテンシな小規模同期</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">
                      オフライン同期
                    </td>
                    <td className="py-3 px-4">対応</td>
                    <td className="py-3 px-4">対応</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="迷ったら Firestore から検討する">
              新規プロジェクトでは Firestore
              が標準的な選択肢です。クエリ機能とスケール特性が広い用途に合います。
              Realtime Database
              は、極めて単純な同期や既存資産がある場合に検討します。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Cloud Firestore のデータモデルはどれ？"
              options={[
                { label: "テーブルと行からなるリレーショナルモデル" },
                {
                  label:
                    "コレクションの中にドキュメントを置く、ドキュメント指向の NoSQL モデル",
                  correct: true,
                },
                {
                  label: "単一の巨大な JSON ツリー（Realtime Database の構造）",
                },
                { label: "キーと値だけのシンプルな KVS" },
              ]}
              explanation="Firestore はドキュメント指向の NoSQL で、コレクションの中にドキュメントを格納します。リレーショナル DB のテーブル/行とは異なる設計で、JSON ツリー型は Realtime Database のほうの特徴です。"
            />
          </section>

          {/* セキュリティルール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              セキュリティルールでアクセスを守る
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Firebase はクライアントから DB へ直接アクセスできるため、安全性は
              <strong>セキュリティルール</strong>
              で担保します。ルールは専用の宣言的な言語で、
              「どのパスのデータを、どの条件で読み書きできるか」を記述します。
              認証済みかどうか、ドキュメントの所有者かどうかなどを条件にして許可を絞ります。
            </p>

            <CodeBlock
              language="js"
              title="Firestore セキュリティルールの例"
              code={`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // posts/{postId} は所有者だけが読み書きできる
    match /posts/{postId} {
      allow read: if request.auth != null
        && resource.data.userId == request.auth.uid;

      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;

      allow update, delete: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }
  }
}`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>request.auth.uid</code> はログイン中ユーザーの ID、
              <code>resource.data</code> は対象ドキュメントの現在値、
              <code>request.resource.data</code>{" "}
              は書き込もうとしている値です。これらを比較して、自分のデータだけに操作を限定します。
            </p>

            <InfoBox type="warning" title="デフォルトを「拒否」に保つ">
              セキュリティルールは、明示的に許可しない限り拒否されるのが安全な設計です。
              開発初期にテスト用の全許可ルールを置いたまま公開すると、誰でも読み書きできてしまいます。
              公開前に「必要な操作だけを明示的に許可しているか」を必ず見直してください。
            </InfoBox>
          </section>

          {/* クエリと同期 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              クエリ・リアルタイム購読・オフライン同期
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              クライアント SDK からは、クエリの実行とリアルタイム購読を同じ API
              で扱えます。
              さらにオフライン同期が有効なら、回線が切れていてもローカルに書き込み、
              復帰時にサーバへ反映されます。
            </p>

            <CodeBlock
              language="ts"
              title="Firestore クエリとリアルタイム購読の例"
              code={`import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

// 自分の投稿を新しい順に購読する
const q = query(
  collection(db, "posts"),
  where("userId", "==", uid),
  orderBy("createdAt", "desc"),
);

// onSnapshot は変更があるたびに最新の一覧を受け取る
const unsubscribe = onSnapshot(q, (snapshot) => {
  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  render(posts);
});`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              <code>onSnapshot</code>{" "}
              は一度きりの取得ではなく、対象データが変わるたびにコールバックが呼ばれます。
              これがリアルタイム同期の正体です。オフライン時はキャッシュから即座に結果が返り、
              「仕様上はサーバのデータ」でも「実測ではまずローカルキャッシュ」が返ることがある点を覚えておくと、
              更新タイミングのズレに戸惑いません。
            </p>
          </section>

          {/* Cloud Functions / Hosting / GCP */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Cloud Functions・Hosting・Google Cloud 統合
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              クライアントに置けない処理は <strong>Cloud Functions</strong>{" "}
              に書きます。DB の書き込みや HTTP
              リクエストをトリガに動くイベント駆動の関数です。
              <strong>Hosting</strong> は静的サイトや SPA を CDN
              配信し、Functions と組み合わせて 動的処理も担えます。さらに
              Firebase は <strong>Google Cloud</strong> の一部であり、 BigQuery
              などへ自然に拡張できます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Cloud Functions
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  イベント駆動で動くサーバーレス関数。秘匿処理や外部連携を担う。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Hosting
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  SPA や静的サイトを CDN 配信。Functions
                  と組み合わせて動的処理も。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  Google Cloud 統合
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  BigQuery などの GCP
                  サービスへ拡張し、分析や本格的なバックエンドに繋げる。
                </p>
              </div>
            </div>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Firebase でクライアントが DB に直接アクセスする構成の安全性は、主に何で担保される？"
              options={[
                { label: "クライアントの JavaScript を難読化すること" },
                {
                  label:
                    "セキュリティルールで、どのパスを誰がどの条件で読み書きできるかを宣言すること",
                  correct: true,
                },
                { label: "API キーを秘密にしておくこと" },
                { label: "HTTPS で通信を暗号化すること" },
              ]}
              explanation="Firebase はクライアント直アクセスを前提とするため、セキュリティルールでアクセスを宣言的に制御します。request.auth や resource.data を使い、認証状態や所有者かどうかで許可を絞ります。難読化や API キーの秘匿は安全性の本質ではありません。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Firebase Documentation",
                  url: "https://firebase.google.com/docs",
                  description:
                    "Firebase 全プロダクトの公式ドキュメント。各サービスの導入ガイドの起点",
                },
                {
                  title: "Cloud Firestore ドキュメント",
                  url: "https://firebase.google.com/docs/firestore",
                  description:
                    "Firestore のデータモデル・クエリ・リアルタイム購読の公式ガイド",
                },
                {
                  title: "Firestore セキュリティルール",
                  url: "https://firebase.google.com/docs/firestore/security/get-started",
                  description:
                    "セキュリティルールの構文と、安全なアクセス制御の書き方",
                },
                {
                  title: "Cloud Functions for Firebase",
                  url: "https://firebase.google.com/docs/functions",
                  description:
                    "イベント駆動のサーバーレス関数の作成とデプロイの公式ガイド",
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
