import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Summary() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 51</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">総まとめと次のステップ</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ここまでの学習内容を振り返り、これから先の学習ロードマップを確認します。
          React と Next.js の基礎をを確認した段階で、次に進む方向を整理します。
        </p>

        <WhyNowBox tags={['振り返り', 'ロードマップ', 'ポートフォリオ', 'コミュニティ', '次のステップ']}>
          <p>
            46 ステップにわたる学習、お疲れさまでした！
            React の基礎から Next.js のデプロイまで、デザイナーとして必要なフロントエンド開発の知識を体系的に学んできました。
            ここで一度立ち止まって全体を俯瞰し、学んだことを整理しましょう。
            そして、これからの成長に向けた次のステップを計画します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 学習の振り返り */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">学習の振り返り</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              あなたがこのマニュアルで学んだことを、フェーズごとに整理します。
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">1-10</span>
                  <h3 className="font-bold text-foreground">React の基礎</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                  HTML/CSS/JavaScript の基礎から始めて、React の核心を理解しました。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">JSX</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">コンポーネント</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Props</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">条件分岐</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">リスト表示</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">11-18</span>
                  <h3 className="font-bold text-foreground">State とイベント / Hooks</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                  インタラクティブな UI を作るための状態管理とイベント処理を習得しました。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">useState</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">useEffect</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">useRef</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">カスタムフック</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">フォーム</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">19-30</span>
                  <h3 className="font-bold text-foreground">CSS / Tailwind / MUI / 実践アプリ</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                  デザイナーの強みを活かせるスタイリングと、実践的なアプリ構築を経験しました。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">Tailwind CSS</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">MUI</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">レスポンシブ</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">テーマ</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">API連携</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm">31-46</span>
                  <h3 className="font-bold text-foreground">Next.js とデプロイ</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                  プロダクション品質のアプリを構築・公開するためのの流れを確認しました。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">App Router</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Server Components</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Server Actions</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">データフェッチ</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Vercel</span>
                </div>
              </div>
            </div>
          </section>

          {/* セクション 2: 身についたスキル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">身についたスキルセット</h2>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <h3 className="font-bold text-foreground mb-3">できるようになったこと</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>React コンポーネントの設計と実装</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>Tailwind CSS / MUI でのスタイリング</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>フォームの作成とバリデーション</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>API との通信とデータ表示</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>Next.js でのページ作成とルーティング</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>Server / Client Component の使い分け</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>Vercel へのデプロイと公開</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">理解している概念</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">&#9679;</span>
                    <span>コンポーネント指向の UI 設計</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">&#9679;</span>
                    <span>宣言的 UI とリアクティブな状態管理</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">&#9679;</span>
                    <span>SSR / SSG / CSR の違い</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">&#9679;</span>
                    <span>ファイルベースルーティング</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">&#9679;</span>
                    <span>キャッシュと再検証の仕組み</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">&#9679;</span>
                    <span>画像最適化と SEO の基本</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">&#9679;</span>
                    <span>環境変数とセキュリティの基本</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* セクション 3: 次に学ぶべきこと */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">次に学ぶべきこと</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              基礎を確認した段階で、どの方向に深めていくかを選びましょう。
              すべてを同時に学ぶ必要はありません。自分のやりたいことに近いものから始めてください。
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">1. 状態管理を深める</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  アプリが大きくなると、コンポーネント間の状態共有が課題になります。
                  グローバルな状態管理の仕組みを学びましょう。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Zustand</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Jotai</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">React Context（深掘り）</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">TanStack Query</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">2. テストを書く</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  品質の高いコードを書くために、テストの基礎を学びましょう。
                  コンポーネントのテストができると、安心してリファクタリングできます。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Vitest</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">React Testing Library</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Playwright</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Storybook</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">3. データベースと認証</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  フルスタックアプリを作るために、データベースと認証の仕組みを学びましょう。
                  Next.js と相性の良いツールが揃っています。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Prisma</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Drizzle ORM</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">NextAuth.js (Auth.js)</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Supabase</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">4. アニメーションと UX</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  デザイナーの強みを活かして、より洗練された UI を作りましょう。
                  アニメーションやマイクロインタラクションでユーザー体験を向上させます。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Motion</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">CSS Animations</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">View Transitions API</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Lottie</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">5. アクセシビリティ</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  すべてのユーザーが使いやすい UI を目指しましょう。
                  アクセシビリティはデザインの品質を示す重要な指標です。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">WAI-ARIA</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">キーボード操作</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">スクリーンリーダー</span>
                  <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded-full">Radix UI</span>
                </div>
              </div>
            </div>
          </section>

          {/* セクション 4: 実践プロジェクトのアイデア */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践プロジェクトのアイデア</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              学んだ知識を定着させるために、実際にプロジェクトを作りましょう。
              ポートフォリオにも使えるプロジェクトのアイデアを紹介します。
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl">&#128196;</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">ポートフォリオサイト</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                      自分の作品を紹介するサイト。Next.js のメタデータ API で SEO 対策し、Vercel にデプロイ。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Next.js</span>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Tailwind</span>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Framer Motion</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl">&#128221;</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">ブログサイト</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                      MDX でコンテンツを管理するブログ。動的メタデータと OG 画像の自動生成にチャレンジ。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">MDX</span>
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">generateMetadata</span>
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">OG画像生成</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl">&#128736;</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">タスク管理アプリ</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                      Server Actions でデータを操作する TODO アプリ。認証を追加してユーザーごとのデータ管理を実装。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">Server Actions</span>
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">Prisma</span>
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">Auth.js</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl">&#127912;</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">デザインシステムのドキュメントサイト</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                      自分のコンポーネントライブラリのドキュメントを Next.js で構築。Storybook との連携も。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">shadcn/ui</span>
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Storybook</span>
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">MDX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="success" title="まずは小さく始めよう">
              <p>
                最初から完璧なアプリを作る必要はありません。
                まずはシンプルな 1 ページのサイトから始めて、少しずつ機能を追加していきましょう。
                「動くもの」を作ることが一番の学習です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: おすすめリソース */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">おすすめの学習リソース</h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">公式ドキュメント</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>React 公式</strong>: react.dev - チュートリアルとリファレンス</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>Next.js 公式</strong>: nextjs.org/docs - App Router のドキュメント</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>Tailwind CSS 公式</strong>: tailwindcss.com/docs - クラスのリファレンス</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>TypeScript 公式</strong>: typescriptlang.org - ハンドブック</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">学習コース</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>Next.js Learn</strong>: nextjs.org/learn - 公式のインタラクティブチュートリアル（無料）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>Total TypeScript</strong>: totaltypescript.com - TypeScript を深く学ぶ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>Josh W Comeau のブログ</strong>: joshwcomeau.com - CSS と React の深い解説</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">コミュニティ</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>Zenn</strong>: zenn.dev - 日本語の技術記事プラットフォーム</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>X (Twitter)</strong>: Next.js や React のコアチームをフォロー</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>Discord</strong>: Next.js、Tailwind CSS の公式 Discord</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span><strong>connpass</strong>: 日本のフロントエンド勉強会やイベント</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* セクション 6: デザイナー × エンジニアの価値 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザイナー × エンジニアの価値</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザインとエンジニアリングの両方を理解するあなたは、非常に価値の高い存在です。
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">デザイナーの強み</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>美しい UI を直接コードで実現できる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>エンジニアとの対話がスムーズになる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>技術的制約を理解した現実的なデザインができる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>プロトタイプを素早く作れる</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">活躍できるフィールド</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>デザインエンジニア / フロントエンドエンジニア</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>フリーランスでの Web サイト制作</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>デザインシステムの構築・運用</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>自分のプロダクトの開発</span>
                  </li>
                </ul>
              </div>
            </div>

            <CodeBlock
              code={`// あなたのこれからの開発テンプレート
// Next.js + Tailwind CSS + TypeScript

npx create-next-app@latest my-new-project \\
  --typescript \\
  --tailwind \\
  --app \\
  --src-dir \\
  --import-alias "@/*"

cd my-new-project

# shadcn/ui を追加（お好みで）
npx shadcn@latest init

# 開発開始！
npm run dev

# さあ、次のプロジェクトを始めましょう！`}
              language="bash"
              title="次のプロジェクトを始めるコマンド"
            />
          </section>

          {/* セクション 7: 最後に */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">最後に</h2>

            <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-violet-500/5 p-8 text-center">
              <p className="text-lg text-foreground leading-relaxed mb-4">
                46 ステップの学習、おめでとうございます！
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                React と Next.js の基礎を一通り学び、アプリケーションを作ってデプロイする力が身につきました。
                ここからは「自分で作りたいもの」を起点に学習を続けてください。
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                分からないことに出会ったら、それは成長のチャンスです。
                公式ドキュメントを読み、コミュニティで質問し、コードを書き続けてください。
              </p>
              <p className="text-lg font-bold text-foreground">
                デザインの力とコードの力を組み合わせて、よいプロダクトを作ってください。
              </p>
            </div>

            <InfoBox type="success" title="学びを続けるためのヒント">
              <p>
                <strong>毎日少しずつ</strong>: 1日30分でもコードを書く習慣を作りましょう。<br />
                <strong>アウトプットする</strong>: 学んだことを Zenn や X で発信すると理解が深まります。<br />
                <strong>人に教える</strong>: 誰かに教えることが最高の学習方法です。<br />
                <strong>完璧を求めない</strong>: 動くコードを書いてから改善する。これが最速の成長法です。
              </p>
            </InfoBox>
          </section>
        </div>

        {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 公式ドキュメント',
                  url: 'https://ja.react.dev/',
                  description: 'React の学習と API リファレンス',
                },
                {
                  title: 'Next.js 公式ドキュメント',
                  url: 'https://nextjs.org/docs',
                  description: 'Next.js の包括的なガイド',
                },
                {
                  title: 'TypeScript 公式ドキュメント',
                  url: 'https://www.typescriptlang.org/docs/',
                  description: 'TypeScript のハンドブックとリファレンス',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
