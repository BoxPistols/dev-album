import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Vercel() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 45</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Vercel デプロイ</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Next.js アプリケーションを Vercel にデプロイする方法を学びます。
          GitHub 連携、環境変数の設定、プレビューデプロイ、カスタムドメインの設定まで、
          本番公開に必要なすべてをカバーします。
        </p>

        <WhyNowBox tags={['Vercel', 'デプロイ', 'GitHub連携', '環境変数', 'プレビューデプロイ', 'カスタムドメイン']}>
          <p>
            Vercel は Next.js の開発元が提供するホスティングプラットフォームです。
            Next.js のすべての機能（SSR、ISR、Server Actions など）を最適にサポートしています。
            GitHub と連携すれば、コードをプッシュするだけで自動的にデプロイされます。
            作ったアプリを世界に公開する、最後の重要なステップです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: Vercel とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Vercel とは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vercel は Next.js の作成元である Vercel 社が運営するクラウドプラットフォームです。
              フロントエンドアプリケーションのデプロイに特化しており、特に Next.js との相性が抜群です。
            </p>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">簡単デプロイ</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  GitHub にプッシュするだけで自動デプロイ。設定ファイルは基本的に不要です。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">プレビュー機能</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  プルリクエストごとにプレビュー URL が自動生成。レビュー前に実際の動作を確認できます。
                </p>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">グローバル CDN</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  世界中のエッジネットワークからコンテンツを配信。どの地域からも高速にアクセスできます。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="無料プラン">
              <p>
                Vercel の Hobby プラン（無料）で、個人プロジェクトやポートフォリオサイトを十分に運用できます。
                月間 100GB の帯域幅、無制限のデプロイ、自動 HTTPS が含まれます。
                チームで使う場合は Pro プラン（月 $20/メンバー）が必要です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: デプロイの手順 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デプロイの手順</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              GitHub リポジトリから Vercel にデプロイする手順を、ステップバイステップで解説します。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">GitHub にリポジトリを作成</h3>
                    <p className="text-sm text-foreground/80">
                      まず Next.js プロジェクトを GitHub リポジトリにプッシュします。
                      Public でも Private でも OK です。
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Vercel アカウントを作成</h3>
                    <p className="text-sm text-foreground/80">
                      vercel.com にアクセスし、GitHub アカウントでサインアップします。
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">プロジェクトをインポート</h3>
                    <p className="text-sm text-foreground/80">
                      「New Project」ボタンをクリックし、GitHub リポジトリを選択。
                      Next.js プロジェクトは自動的に検出されます。
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">デプロイ！</h3>
                    <p className="text-sm text-foreground/80">
                      「Deploy」ボタンをクリックするだけ。ビルドが自動で実行され、
                      数分後に .vercel.app ドメインで公開されます。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`# 事前準備: GitHub にプッシュする
git init
git add .
git commit -m "初回コミット"

# GitHub にリポジトリを作成して接続
gh repo create my-nextjs-app --public --push

# これだけ！あとは Vercel のダッシュボードから操作

# Vercel CLI を使う方法もある
pnpm add -g vercel

# プロジェクトディレクトリで実行
vercel

# 質問に答えていくだけでデプロイ完了
# ? Set up and deploy "~/my-nextjs-app"? [Y/n] Y
# ? Which scope do you want to deploy to? → 自分のアカウント
# ? Link to existing project? [y/N] N
# ? What's your project's name? → my-nextjs-app
# ? In which directory is your code located? → ./
# → デプロイ開始！`}
              language="bash"
              title="CLI でのデプロイ"
            />
          </section>

          {/* セクション 3: 環境変数 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">環境変数の設定</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              API キーやデータベースの接続情報などの機密情報は、環境変数として設定します。
              Vercel のダッシュボードから簡単に管理できます。
            </p>

            <CodeBlock
              code={`# ローカル開発用の環境変数
# .env.local（Git にコミットしない！）
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
SECRET_KEY="your-secret-key-here"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Vercel では以下の場所で設定:
# 1. Vercel ダッシュボード → プロジェクト → Settings → Environment Variables
# 2. 環境ごとに異なる値を設定可能:
#    - Production（本番）
#    - Preview（プレビュー）
#    - Development（開発）

# NEXT_PUBLIC_ プレフィックスの変数はクライアントに公開される
# 機密情報には NEXT_PUBLIC_ を付けない！`}
              language="bash"
              title="環境変数の管理"
            />

            <CodeBlock
              code={`// 環境変数の使い方

// Server Component / Server Action / Route Handler で使う場合
// （NEXT_PUBLIC_ なしでOK）
export default async function SettingsPage() {
  const dbUrl = process.env.DATABASE_URL; // サーバーのみ
  const secretKey = process.env.SECRET_KEY; // サーバーのみ

  // ...
}

// Client Component で使う場合
// （NEXT_PUBLIC_ プレフィックスが必要）
'use client';

export function ApiStatus() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // クライアントでも使える

  return <p>API: {apiUrl}</p>;
}

// 型安全にするための env.ts を作るパターン
// lib/env.ts
const env = {
  databaseUrl: process.env.DATABASE_URL!,
  secretKey: process.env.SECRET_KEY!,
  publicApiUrl: process.env.NEXT_PUBLIC_API_URL!,
} as const;

// ビルド時にチェック
Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(\`環境変数 \${key} が設定されていません\`);
  }
});

export default env;`}
              language="tsx"
              title="環境変数の使い方"
            />

            <InfoBox type="warning" title="環境変数のセキュリティ">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">NEXT_PUBLIC_</code> プレフィックスが付いた変数は
                クライアントの JavaScript バンドルに含まれ、誰でも見ることができます。
                API キー、パスワード、トークンなどの機密情報には絶対にこのプレフィックスを付けないでください。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: プレビューデプロイ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プレビューデプロイ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vercel の最も便利な機能の一つが、プルリクエストごとのプレビューデプロイです。
              コードの変更を実際の環境で確認してからマージできます。
            </p>

            <CodeBlock
              code={`# プレビューデプロイの流れ

# 1. 新しいブランチを作成
git checkout -b feature/new-header

# 2. コードを変更してプッシュ
git add .
git commit -m "ヘッダーのデザインを変更"
git push origin feature/new-header

# 3. GitHub でプルリクエストを作成

# 4. Vercel が自動的にプレビューをデプロイ！
#    → PR に "Visit Preview" リンクが表示される
#    → https://my-app-git-feature-new-header-username.vercel.app
#
# 5. チームメンバーがプレビューで確認
#    → デザイナーが実機で確認
#    → レビュアーが動作を確認
#
# 6. 問題なければマージ → 本番に自動デプロイ`}
              language="bash"
              title="プレビューデプロイのワークフロー"
            />

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">プレビューデプロイの特徴</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>PR ごとに固有の URL が発行される</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>プッシュするたびに自動更新</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>本番とは別の環境変数を設定可能</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>GitHub のコメントにリンクが自動投稿</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">デザイナーにとってのメリット</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>実際のデバイスで UI を確認できる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>クライアントにプレビュー URL を共有可能</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>Vercel のコメント機能でフィードバック可能</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>ローカル環境の構築が不要</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* セクション 5: カスタムドメイン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">カスタムドメインの設定</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              独自ドメインを Vercel プロジェクトに設定する方法です。
              HTTPS 証明書は自動的に発行・更新されます。
            </p>

            <CodeBlock
              code={`# カスタムドメインの設定手順

# 1. Vercel ダッシュボード → プロジェクト → Settings → Domains

# 2. ドメインを入力（例: example.com）

# 3. DNS 設定を行う（ドメイン管理サービスで設定）
#    方法 A: CNAME レコード
#    www.example.com → cname.vercel-dns.com
#
#    方法 B: A レコード（apex ドメインの場合）
#    example.com → 76.76.21.21
#
#    方法 C: Vercel でドメインを購入（DNS 設定不要）

# 4. DNS の反映を待つ（最大48時間、通常は数分〜数時間）

# 5. HTTPS 証明書が自動発行される（Let's Encrypt）

# 推奨: www.example.com と example.com の両方を設定
# → 片方にリダイレクトさせる`}
              language="bash"
              title="カスタムドメインの設定"
            />

            <InfoBox type="success" title="HTTPS は自動">
              <p>
                Vercel はカスタムドメインに対して SSL/TLS 証明書を自動的に発行し、更新も自動で行います。
                Let's Encrypt を使用しており、追加費用は一切かかりません。
                すべてのサイトが最初から HTTPS で配信されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: デプロイの設定 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デプロイの詳細設定</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">vercel.json</code> を使って、
              リダイレクトやヘッダーなどの追加設定を行えます。
            </p>

            <CodeBlock
              code={`// vercel.json - プロジェクトルートに配置
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    },
    {
      "source": "/blog/:slug",
      "destination": "/articles/:slug",
      "permanent": true
    }
  ],

  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://example.com"
        }
      ]
    }
  ],

  "rewrites": [
    {
      "source": "/api/proxy/:path*",
      "destination": "https://external-api.com/:path*"
    }
  ]
}`}
              language="json"
              title="vercel.json の設定例"
            />

            <CodeBlock
              code={`// next.config.ts でも同様の設定が可能（こちらが推奨）
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // リダイレクト
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301 リダイレクト
      },
    ];
  },

  // ヘッダー
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },

  // 画像の外部ドメイン許可
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;`}
              language="tsx"
              title="next.config.ts での設定（推奨）"
            />
          </section>

          {/* セクション 7: デプロイのチェックリスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">本番デプロイのチェックリスト</h2>

            <div className="space-y-3">
              <div className="rounded-lg border border-border p-4">
                <label className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 text-primary">&#9744;</span>
                  <span>環境変数がすべて設定されている（特に本番用の値）</span>
                </label>
              </div>
              <div className="rounded-lg border border-border p-4">
                <label className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 text-primary">&#9744;</span>
                  <span><code className="text-sm bg-muted px-1.5 py-0.5 rounded">next build</code> がローカルで成功する</span>
                </label>
              </div>
              <div className="rounded-lg border border-border p-4">
                <label className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 text-primary">&#9744;</span>
                  <span>メタデータ（title, description, OG 画像）が設定されている</span>
                </label>
              </div>
              <div className="rounded-lg border border-border p-4">
                <label className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 text-primary">&#9744;</span>
                  <span>画像の remotePatterns が正しく設定されている</span>
                </label>
              </div>
              <div className="rounded-lg border border-border p-4">
                <label className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 text-primary">&#9744;</span>
                  <span>favicon.ico と apple-touch-icon.png が配置されている</span>
                </label>
              </div>
              <div className="rounded-lg border border-border p-4">
                <label className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 text-primary">&#9744;</span>
                  <span>エラーページ（error.tsx, not-found.tsx）が作成されている</span>
                </label>
              </div>
              <div className="rounded-lg border border-border p-4">
                <label className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 text-primary">&#9744;</span>
                  <span>レスポンシブデザインがスマートフォンで正しく表示される</span>
                </label>
              </div>
              <div className="rounded-lg border border-border p-4">
                <label className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 text-primary">&#9744;</span>
                  <span>.env.local が .gitignore に含まれている</span>
                </label>
              </div>
            </div>

            <InfoBox type="info" title="ビルドエラーの確認">
              <p>
                デプロイ前に必ず <code className="text-sm bg-muted px-1.5 py-0.5 rounded">pnpm build</code> をローカルで実行してください。
                TypeScript のエラーや ESLint の警告がビルドを止めることがあります。
                Vercel でのビルドログはダッシュボードの Deployments タブから確認できます。
              </p>
            </InfoBox>
          </section>
        </div>

        {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Vercel 公式ドキュメント',
                  url: 'https://vercel.com/docs',
                  description: 'Vercel プラットフォームの公式ガイド',
                },
                {
                  title: 'Next.js デプロイ - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/deploying',
                  description: 'Next.js アプリのデプロイ方法',
                },
                {
                  title: 'Vercel CLI',
                  url: 'https://vercel.com/docs/cli',
                  description: 'Vercel CLI のコマンドリファレンス',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
