import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function Components() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">
            STEP 5
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          コンポーネント
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React の核心、コンポーネント。Figma のコンポーネントと同じ考え方で、
          再利用可能な UI パーツを作る方法を学びましょう。
        </p>

        <WhyNowBox tags={['コンポーネント', 'Figma との類似性', '再利用性', 'PascalCase']}>
          <p>
            デザイナーなら Figma でコンポーネントを作った経験があるはずです。
            ボタン、カード、ヘッダーなどの UI パーツをコンポーネントにして、
            画面全体はそれらの組み合わせで作りますよね。
            React のコンポーネントはまさにその発想です。
            デザインシステムの考え方がそのままコードに活かせる、
            デザイナーにとって最も親しみやすい概念かもしれません。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* コンポーネントとは */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">コンポーネントとは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コンポーネントとは、<strong>再利用可能な UI の部品</strong>です。
              ページ全体を1つの大きな HTML として書くのではなく、
              ボタン、カード、ナビゲーションバーといった部品ごとに分割して作ります。
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-3 text-sm">Figma の場合</h4>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>ボタンを「コンポーネント」として作成</li>
                  <li>カードの中にボタンを「インスタンス」として配置</li>
                  <li>ボタンの色を変更すると全インスタンスに反映</li>
                  <li>コンポーネントに「Variants」を設定できる</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-3 text-sm">React の場合</h4>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>ボタンを「コンポーネント」として定義</li>
                  <li>カードの中にボタンコンポーネントを配置</li>
                  <li>コンポーネントを修正すると全ての使用箇所に反映</li>
                  <li>「Props」でバリエーションを表現できる</li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="コンポーネント思考はデザイナーの強み">
              <p>
                デザインシステムやアトミックデザインの経験があるデザイナーは、
                コンポーネントの粒度（どこで分割するか）を直感的に判断できます。
                「ボタン」「入力フィールド」「カード」「ナビゲーション」という分割は、
                デザインでもコードでも同じです。この感覚はエンジニアが学ぶのに苦労する部分でもあります。
              </p>
            </InfoBox>
          </section>

          {/* コンポーネントの粒度 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">コンポーネントの粒度を考える</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「どの単位でコンポーネントに分けるべきか？」は、React 初心者が最も悩むポイントの一つです。
              ここでは、デザイナーに馴染みのある考え方で整理しましょう。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">Figma のコンポーネントとの対応</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Figma でデザインシステムを作るとき、コンポーネントの階層を意識しますよね。
              React でも同じように、小さな部品から大きな部品へと組み上げていきます。
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">Atom</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">最小単位（Atoms）</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Figma</strong>: ボタン、テキスト入力、アイコン、アバター
                    <br />
                    <strong>React</strong>: <code className="bg-muted px-1 rounded">Button</code>、
                    <code className="bg-muted px-1 rounded">Input</code>、
                    <code className="bg-muted px-1 rounded">Icon</code>、
                    <code className="bg-muted px-1 rounded">Avatar</code>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">Mol</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">組み合わせ（Molecules）</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Figma</strong>: 検索バー（入力 + ボタン）、カード（画像 + テキスト + ボタン）
                    <br />
                    <strong>React</strong>: <code className="bg-muted px-1 rounded">SearchBar</code>、
                    <code className="bg-muted px-1 rounded">Card</code>、
                    <code className="bg-muted px-1 rounded">ProfileCard</code>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-violet-600 dark:text-violet-400 font-bold text-xs">Org</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">セクション（Organisms）</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Figma</strong>: ヘッダー、フッター、サイドバー、コンテンツセクション
                    <br />
                    <strong>React</strong>: <code className="bg-muted px-1 rounded">Header</code>、
                    <code className="bg-muted px-1 rounded">Footer</code>、
                    <code className="bg-muted px-1 rounded">Sidebar</code>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">Page</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">ページ（Pages）</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Figma</strong>: フレーム上のページ全体（ホーム、詳細ページなど）
                    <br />
                    <strong>React</strong>: <code className="bg-muted px-1 rounded">HomePage</code>、
                    <code className="bg-muted px-1 rounded">DetailPage</code>、
                    <code className="bg-muted px-1 rounded">SettingsPage</code>
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="完璧な分割を目指さなくてよい">
              <p>
                アトミックデザインの分類を厳密に守る必要はありません。
                大切なのは「再利用するか」「独立した責務を持つか」「コードが長すぎないか」の3点です。
                最初はざっくり作って、後からリファクタリング（分割・統合）するのが現実的です。
              </p>
            </InfoBox>
          </section>

          {/* UI 分解ワークショップ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">UI 分解ワークショップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              実際の Web サイトの UI をコンポーネントに分解する練習をしてみましょう。
              以下のような「ブログサイトのトップページ」を想像してください。
            </p>

            <div className="rounded-xl border-2 border-dashed border-border bg-card p-6 mb-6">
              <p className="text-sm font-bold text-foreground mb-4">想定する画面構成:</p>
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="p-3 border border-border rounded-lg bg-muted/30">
                  <strong>[ヘッダー]</strong> ロゴ + ナビゲーションリンク（ホーム、記事一覧、About） + 検索バー
                </div>
                <div className="p-3 border border-border rounded-lg bg-muted/30">
                  <strong>[ヒーローセクション]</strong> 大きな見出し + サブテキスト + CTAボタン
                </div>
                <div className="p-3 border border-border rounded-lg bg-muted/30">
                  <strong>[記事カードグリッド]</strong> 3列のカード（各カード: サムネイル画像 + カテゴリバッジ + タイトル + 抜粋 + 著者アバター + 投稿日）
                </div>
                <div className="p-3 border border-border rounded-lg bg-muted/30">
                  <strong>[フッター]</strong> コピーライト + SNSリンク + フッターナビ
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">分解結果の例</h3>
            <CodeBlock
              code={`// ページコンポーネント
HomePage

// セクション（Organisms）
├── Header
│   ├── Logo              // 最小単位
│   ├── NavLinks          // ナビリンクのリスト
│   └── SearchBar         // 入力 + ボタン
├── HeroSection
│   ├── Heading           // 見出しテキスト
│   └── Button            // CTA ボタン（最小単位）
├── ArticleGrid
│   └── ArticleCard       // 記事カード（Molecule）
│       ├── Thumbnail     // サムネイル画像
│       ├── CategoryBadge // カテゴリバッジ
│       ├── Avatar        // 著者アバター
│       └── (テキスト要素) // タイトル、抜粋、日付
└── Footer
    ├── SocialLinks       // SNS アイコンリスト
    └── FooterNav         // フッターナビリンク`}
              language="text"
              title="コンポーネントのツリー構造"
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              このように UI をツリー構造で分解することを <strong>Thinking in React</strong>（React 的に考える）と言います。
              React 公式ドキュメントでも推奨されているアプローチです。
              デザイナーが Figma でレイヤーを整理する作業と非常に似ています。
            </p>

            <div className="mt-4">
              <InfoBox type="success" title="練習してみよう">
                <p>
                  普段よく使う Web サイト（X、YouTube、Amazon など）を見て、
                  どのようにコンポーネントに分解できるか考えてみましょう。
                  ブラウザの開発者ツール（F12）で実際の DOM 構造を覗いてみるのもおすすめです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 関数コンポーネント */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">関数コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React のコンポーネントは <strong>JavaScript の関数</strong>として定義します。
              関数が JSX を返すだけで、それがコンポーネントになります。
            </p>

            <CodeBlock
              code={`// 最もシンプルなコンポーネント
function Greeting() {
  return <h1>こんにちは！</h1>
}

// アロー関数で書くパターン（どちらでもOK）
const Greeting = () => {
  return <h1>こんにちは！</h1>
}`}
              language="tsx"
              title="コンポーネントの基本形"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              関数名が<strong>大文字で始まる</strong>ことに注目してください。
              React では、大文字で始まる関数がコンポーネントとして認識されます。
              小文字で始めると HTML タグとして解釈されてしまいます。
            </p>

            <CodeBlock
              code={`// コンポーネント名のルール

// OK: 大文字始まり（PascalCase）
function MyButton() { ... }    // コンポーネントとして認識される
function UserProfile() { ... } // コンポーネントとして認識される

// NG: 小文字始まり
function myButton() { ... }    // HTML タグとして解釈される → 意図した表示にならない
function user_profile() { ... } // NG

// NG: ハイフン区切り（ケバブケース）
function my-button() { ... }   // JavaScript として無効な関数名`}
              language="tsx"
              title="コンポーネント名のルール"
              showLineNumbers
            />

            <div className="mt-4">
              <InfoBox type="warning" title="クラスコンポーネントについて">
                <p>
                  昔の React では <code className="bg-muted px-1 py-0.5 rounded text-xs">class</code> を使ったコンポーネントが主流でした。
                  しかし現在は<strong>関数コンポーネント</strong>がスタンダードです。
                  古いチュートリアルで見かけるかもしれませんが、新しいコードでは使いません。
                  このマニュアルでは全て関数コンポーネントを使います。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 最初のコンポーネントを作る */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">最初のコンポーネントを作ってみよう</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 2 で作ったプロジェクトの <code className="bg-muted px-1 py-0.5 rounded text-xs">src</code> フォルダに
              新しいファイルを作成してみましょう。
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">1. ボタンコンポーネントを作成</p>
                <CodeBlock
                  code={`// src/MyButton.tsx

function MyButton() {
  return (
    <button
      style={{
        backgroundColor: '#2563EB',
        color: 'white',
        padding: '10px 24px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      クリック
    </button>
  )
}

export default MyButton`}
                  language="tsx"
                  title="src/MyButton.tsx"
                  showLineNumbers
                />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">2. App.tsx でインポートして使う</p>
                <CodePreview
                  code={`function MyButton() {
  return (
    <button
      style={{
        backgroundColor: '#2563EB',
        color: 'white',
        padding: '10px 24px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginRight: '8px',
      }}
    >
      クリック
    </button>
  )
}

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <h1>コンポーネントのテスト</h1>
      <MyButton />
      <MyButton />
      <MyButton />
    </div>
  )
}
`}
                  title="同じボタンが3つ表示される → 右がブラウザ表示"
                  previewHeight={140}
                />
              </div>
            </div>

            <p className="text-muted-foreground mt-4 leading-relaxed">
              保存してブラウザを見ると、同じデザインのボタンが3つ表示されるはずです。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;MyButton /&gt;</code> と書くだけで、
              何度でも同じボタンを配置できます。これがコンポーネントの再利用性です。
            </p>

            <div className="mt-4">
              <InfoBox type="success" title="export default とは？">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">export default MyButton</code> は、
                  このファイルのメイン出力として MyButton を公開するという意味です。
                  他のファイルから <code className="bg-muted px-1 py-0.5 rounded text-xs">import MyButton from './MyButton'</code> で
                  読み込めるようになります。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* コンポーネントのファイル構成 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">コンポーネントのファイル構成</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コンポーネントのファイル管理には、いくつかの一般的なルールがあります。
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">1ファイル1コンポーネント</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    1つのファイルに1つのコンポーネントを定義するのが基本です。
                    ファイル名はコンポーネント名と一致させます（例: <code className="bg-muted px-1 rounded">MyButton.tsx</code>）。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">PascalCase（パスカルケース）で命名</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    コンポーネント名は大文字始まりのパスカルケースで書きます。
                    <code className="bg-muted px-1 rounded">MyButton</code>、<code className="bg-muted px-1 rounded">UserProfile</code>、
                    <code className="bg-muted px-1 rounded">NavigationBar</code> のように。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-violet-600 dark:text-violet-400 text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">components フォルダにまとめる</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    再利用するコンポーネントは <code className="bg-muted px-1 rounded">src/components/</code> フォルダにまとめるのが一般的です。
                  </p>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`src/
├── components/         # 再利用コンポーネント
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/              # ページコンポーネント（大きな単位）
│   ├── Home.tsx
│   └── About.tsx
├── App.tsx             # ルートコンポーネント
└── main.tsx            # エントリーポイント`}
              language="text"
              title="推奨フォルダ構成"
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">export の2つの方法</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              コンポーネントを公開する方法には「default export」と「named export」の2種類があります。
            </p>

            <CodeBlock
              code={`// 方法1: default export（1ファイル1コンポーネントの場合に使う）
// Button.tsx
function Button() {
  return <button>クリック</button>
}
export default Button

// インポート側: 好きな名前でインポートできる
import Button from './Button'
import MyButton from './Button'  // 別名でもOK

// 方法2: named export（1ファイルに複数公開する場合に使う）
// icons.tsx
export function HomeIcon() { return <span>🏠</span> }
export function UserIcon() { return <span>👤</span> }

// インポート側: 中括弧で囲み、定義された名前を使う
import { HomeIcon, UserIcon } from './icons'`}
              language="tsx"
              title="default export vs named export"
              showLineNumbers
            />
          </section>

          {/* コンポーネントの合成 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">コンポーネントを組み合わせる（コンポジション）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コンポーネントの真価は「組み合わせ」にあります。
              小さなコンポーネントを組み合わせて、より大きなコンポーネントを作り、
              最終的にページ全体を構成します。Figma でも同じですよね。
            </p>

            <CodePreview
              code={`// Avatar コンポーネント
function Avatar() {
  return (
    <div style={{
      width: 48,
      height: 48,
      borderRadius: '50%',
      backgroundColor: '#E5E7EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6B7280',
      fontSize: '14px',
      fontWeight: 'bold',
    }}>
      T
    </div>
  )
}

// UserInfo コンポーネント
function UserInfo() {
  return (
    <div>
      <p style={{ fontWeight: 'bold', margin: 0 }}>田中太郎</p>
      <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
        UI デザイナー
      </p>
    </div>
  )
}

// ProfileCard = Avatar + UserInfo の組み合わせ
function ProfileCard() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
    }}>
      <Avatar />
      <UserInfo />
    </div>
  )
}

// App で ProfileCard を3つ並べる
function App() {
  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>チームメンバー</h2>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  )
}
`}
              title="コンポーネントの組み合わせ → 右がブラウザ表示"
              previewHeight={220}
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">Avatar</code> と
              <code className="bg-muted px-1 py-0.5 rounded text-xs">UserInfo</code> を組み合わせて
              <code className="bg-muted px-1 py-0.5 rounded text-xs">ProfileCard</code> を作り、
              それを <code className="bg-muted px-1 py-0.5 rounded text-xs">App</code> で並べています。
              まさに Figma でコンポーネントをネストする感覚と同じです。
            </p>

            <div className="mt-4">
              <InfoBox type="info" title="コンポーネントツリー">
                <p>
                  React アプリは、コンポーネントがツリー構造を形成します。
                  最上位の App コンポーネントから始まり、枝分かれしてより小さなコンポーネントへと分かれていきます。
                  この構造は Figma のレイヤーパネルとよく似ています。
                  React DevTools（ブラウザ拡張機能）を使うと、このツリーを視覚的に確認できます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* 実践: Card コンポーネント */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">実践: Card コンポーネントを作る</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              デザインでよく使う「カード」コンポーネントを、自分で一から作ってみましょう。
              今はまだ Props（次の STEP で学習）を使わないので、固定の内容になりますが、
              コンポーネントの構造を理解するには十分です。
            </p>

            <CodePreview
              code={`function Card() {
  return (
    <div style={{
      borderRadius: '16px',
      border: '1px solid #E5E7EB',
      overflow: 'hidden',
      maxWidth: '360px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }}>
      {/* カード画像 */}
      <div style={{
        width: '100%',
        height: '120px',
        backgroundColor: '#F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9CA3AF',
        fontSize: '14px',
      }}>
        画像エリア
      </div>

      {/* カード本文 */}
      <div style={{ padding: '16px' }}>
        <p style={{
          fontSize: '12px',
          color: '#2563EB',
          fontWeight: 'bold',
          marginBottom: '4px',
        }}>
          カテゴリ
        </p>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '6px',
          color: '#1F2937',
        }}>
          カードのタイトル
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#6B7280',
          lineHeight: 1.6,
        }}>
          ここにカードの説明文が入ります。
        </p>
      </div>
    </div>
  )
}

function App() {
  return <Card />
}
`}
              title="Card コンポーネント → 右がブラウザ表示"
              previewHeight={300}
            />

            <div className="mt-4">
              <CodeBlock
                code={`// src/App.tsx
import Card from './components/Card'

function App() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#FAFBFC' }}>
      <h1 style={{ marginBottom: '24px' }}>プロジェクト一覧</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
      }}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default App`}
                language="tsx"
                title="src/App.tsx"
                showLineNumbers
              />
            </div>

            <p className="text-muted-foreground mt-4 leading-relaxed">
              3枚のカードが同じデザインで表示されます。
              しかし、全てのカードが同じ内容ですよね。
              「カードごとに異なるタイトルや画像を設定したい」と思ったはずです。
              それを可能にするのが次の STEP で学ぶ <strong>Props</strong> です。
            </p>

            <div className="mt-4">
              <InfoBox type="info" title="Props の予告">
                <p>
                  Figma のコンポーネントプロパティ（テキストプロパティ、ブールプロパティなど）に相当するのが
                  React の Props です。次の STEP 6 で、Card コンポーネントにタイトルや説明文を
                  外から渡せるようにします。コンポーネントが本当に「再利用可能」になる瞬間です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* コンポーネント設計のヒント */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">コンポーネント設計のヒント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              良いコンポーネントを作るためのヒントをいくつか紹介します。
              最初から完璧を目指す必要はありませんが、意識しておくと後々役立ちます。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">単一責任の原則</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  1つのコンポーネントは1つの役割だけを担うべきです。
                  「このコンポーネントは何をするものか？」を一文で説明できないなら、分割のサインです。
                  例: 「UserProfileCard は、ユーザーのプロフィール情報を表示するカードです」のように。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">コンポーネントの大きさの目安</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  明確なルールはありませんが、1つのコンポーネントが 100〜150 行を超えたら分割を検討しましょう。
                  return 文の中の JSX が画面に収まらないほど長い場合も分割のサインです。
                  ただし、行数だけで判断するのではなく、「関心の分離」ができているかが重要です。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground text-sm mb-2">命名は具体的に</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <code className="bg-muted px-1 rounded">Component1</code>、
                  <code className="bg-muted px-1 rounded">Item</code> のような曖昧な名前は避けましょう。
                  <code className="bg-muted px-1 rounded">ArticleCard</code>、
                  <code className="bg-muted px-1 rounded">UserAvatar</code>、
                  <code className="bg-muted px-1 rounded">NavigationBar</code> のように、
                  何を表すコンポーネントかが名前から分かるようにします。
                </p>
              </div>
            </div>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="React のコンポーネント名のルールとして正しいのはどれ？"
              options={[
                { label: 'コンポーネント名は小文字で始めなければならない（例: myButton）', correct: false },
                { label: 'コンポーネント名はPascalCase（大文字始まり）で書く（例: MyButton）', correct: true },
                { label: 'コンポーネント名はケバブケースで書く（例: my-button）', correct: false },
              ]}
              explanation="React ではコンポーネント名をPascalCase（大文字始まり）で書きます。小文字で始まる名前は HTML のネイティブタグ（div、span など）として解釈されるため、カスタムコンポーネントは必ず大文字で始める必要があります。"
            />

            <Quiz
              question="コンポーネントの再利用性を高めるために最も重要なことはどれ？"
              options={[
                { label: 'コンポーネントのファイルサイズを小さくすること', correct: false },
                { label: 'コンポーネントを1つの責任に集中させ、外部からデータを受け取れるようにすること', correct: true },
                { label: 'コンポーネント内にスタイルをすべてインラインで書くこと', correct: false },
              ]}
              explanation="再利用性の高いコンポーネントは「1つの責任に集中」し、「外部から必要なデータを Props で受け取る」設計になっています。これにより、同じコンポーネントを異なるデータで何度でも使えるようになります。次の STEP で学ぶ Props がこの鍵となります。"
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">チャレンジしてみよう</h2>

            <CodingChallenge
              title="ProfileCard コンポーネントを作ろう"
              description="名前、役職、スキルリストを表示する ProfileCard コンポーネントを作成してください。変数を使ってデータを定義し、JSX の中で表示しましょう。スキルは配列の map で表示します。"
              preview
              initialCode={`function ProfileCard() {
  const name = ""
  const role = ""
  const skills = []

  return (
    <div style={{
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      maxWidth: '320px',
    }}>
      {/* ここにプロフィール情報を表示 */}

    </div>
  )
}

export default ProfileCard`}
              answer={`function ProfileCard() {
  const name = "田中太郎"
  const role = "UI デザイナー"
  const skills = ["Figma", "React", "TypeScript"]

  return (
    <div style={{
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      maxWidth: '320px',
    }}>
      <h2 style={{ margin: '0 0 4px 0' }}>{name}</h2>
      <p style={{ color: '#6B7280', margin: '0 0 16px 0' }}>{role}</p>
      <h4 style={{ margin: '0 0 8px 0' }}>スキル</h4>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileCard`}
              keywords={['{name}', '{role}', 'skills.map']}
              hints={[
                'name、role、skills に値を入れましょう（例: skills = ["Figma", "React"]）',
                '{name} や {role} で変数の値をJSXの中に埋め込みます',
                'skills.map((skill, index) => <li key={index}>{skill}</li>) でリストを表示できます',
              ]}
            />
          </section>

          {/* よくある質問 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">よくある質問</h2>

            <Faq
              items={[
                {
                  question: 'コンポーネントの分割基準は？',
                  answer: '主に3つの基準があります。(1) 再利用性: 「この部品は別の場所でも使うかもしれない」と思ったら分割のサインです。(2) 責任の分離: 1つのコンポーネントが複数の役割を担っていたら分割を検討しましょう。(3) コードの長さ: 100〜150行を超えたら分割を考える目安です。最初から完璧に分ける必要はありません。後からいつでもリファクタリングできます。',
                },
                {
                  question: 'ファイル名はどういう規則にすべき？',
                  answer: 'コンポーネント名と同じPascalCase（例: MyButton.tsx、UserProfile.tsx）が最も一般的です。チームによっては kebab-case（my-button.tsx）を使うこともあります。大切なのはプロジェクト内で統一することです。Figma のコンポーネント命名規則と揃えると、デザインとコードの対応が取りやすくなります。',
                },
                {
                  question: '1ファイルに複数のコンポーネントを書いてもいいですか？',
                  answer: '基本的には1ファイル1コンポーネントが推奨されますが、絶対的なルールではありません。メインのコンポーネントの中でしか使わない小さなヘルパーコンポーネント（例: リストのアイテム）は、同じファイルに書いても構いません。ただし、export default するのはメインのコンポーネント1つだけにしましょう。他のファイルからも使いたくなったら、その時点で別ファイルに切り出します。',
                },
              ]}
            />
          </section>

          {/* このステップのまとめ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>コンポーネントは<strong>再利用可能な UI 部品</strong>で、Figma のコンポーネントと同じ発想</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>コンポーネントの粒度は <strong>Atoms → Molecules → Organisms → Pages</strong> で考える</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><strong>関数コンポーネント</strong>は、JSX を返す関数として定義する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>コンポーネント名は <strong>PascalCase</strong>（大文字始まり）で命名する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>1ファイル1コンポーネントで、<code className="bg-muted px-1 py-0.5 rounded">export default</code> で公開する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>コンポーネントを<strong>組み合わせて</strong>より大きなUIを構築する（コンポジション）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>UI を分解して<strong>コンポーネントツリー</strong>として設計する力が重要</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>次の STEP で学ぶ <strong>Props</strong> により、コンポーネントに動的なデータを渡せるようになる</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 公式: 最初のコンポーネント',
                  url: 'https://react.dev/learn/your-first-component',
                  description: 'コンポーネントの定義とエクスポートの基本',
                },
                {
                  title: 'React 公式: コンポーネントのインポートとエクスポート',
                  url: 'https://react.dev/learn/importing-and-exporting-components',
                  description: 'default export と named export の使い分け',
                },
                {
                  title: 'React 公式: React について考える',
                  url: 'https://react.dev/learn/thinking-in-react',
                  description: 'UI をコンポーネントに分解する考え方を公式で学ぶ',
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
