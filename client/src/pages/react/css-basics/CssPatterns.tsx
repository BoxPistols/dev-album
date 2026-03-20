import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function CssPatterns() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 24</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">CSS 設計パターン</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          規模が大きくなっても破綻しない CSS を書くための設計パターンを学びます。
          BEM、SMACSS、デザイントークン、レスポンシブデザインなど、
          実践で役立つ考え方を網羅します。
        </p>

        <WhyNowBox tags={['BEM', 'SMACSS', 'デザイントークン', 'レスポンシブ', '設計']}>
          <p>
            CSS のツール（CSS Modules, styled-components, Emotion）を学んできましたが、
            ツールだけでは大規模なプロジェクトの CSS は管理しきれません。
            設計パターンを知ることで、どのツールを使っても一貫性のある保守しやすい CSS を書けるようになります。
            デザイナーにとって、この知識はデザインシステムの構築にも直結します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: BEM */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">BEM（Block Element Modifier）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              BEM は最も広く使われている CSS 命名規則です。
              クラス名を <strong>Block（ブロック）</strong>、<strong>Element（要素）</strong>、
              <strong>Modifier（修飾子）</strong> の3つの概念で構造化します。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-foreground mb-3">BEM の命名規則</h3>
              <div className="space-y-2 text-foreground/80 text-sm font-mono">
                <p><strong>.block</strong> — 独立したコンポーネント（例: <code>.card</code>）</p>
                <p><strong>.block__element</strong> — ブロック内の構成要素（例: <code>.card__title</code>）</p>
                <p><strong>.block--modifier</strong> — ブロックのバリエーション（例: <code>.card--featured</code>）</p>
                <p><strong>.block__element--modifier</strong> — 要素のバリエーション（例: <code>.card__title--large</code>）</p>
              </div>
            </div>

            <CodeBlock
              language="css"
              title="BEM によるカードコンポーネント"
              code={`/* Block: カード */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Modifier: 特集カード */
.card--featured {
  border: 2px solid #3b82f6;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
}

/* Element: カードタイトル */
.card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

/* Element + Modifier: 大きなタイトル */
.card__title--large {
  font-size: 1.5rem;
}

/* Element: カード本文 */
.card__body {
  color: #64748b;
  line-height: 1.6;
}

/* Element: カードフッター */
.card__footer {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="BEM を React で使う（プレビュー）"
              code={`function App() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div className="card">
        <div className="card__header">
          <h3 className="card__title">通常カード</h3>
        </div>
        <div className="card__body">カードの内容です</div>
        <div className="card__footer">
          <button className="card__action card__action--primary">詳細</button>
          <button className="card__action card__action--secondary">共有</button>
        </div>
      </div>
      <div className="card card--featured">
        <div className="card__header">
          <h3 className="card__title">特集カード</h3>
        </div>
        <div className="card__body">card--featured で強調表示</div>
        <div className="card__footer">
          <button className="card__action card__action--primary">詳細</button>
          <button className="card__action card__action--secondary">共有</button>
        </div>
      </div>
    </div>
  );
}`}
              css={`
.card {
  background: white; border-radius: 12px; padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08); flex: 1; min-width: 200px;
}
.card--featured {
  border: 2px solid #3b82f6;
  box-shadow: 0 4px 16px rgba(59,130,246,0.15);
}
.card__title { font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 8px; }
.card__body { color: #64748b; line-height: 1.6; margin-bottom: 16px; font-size: 0.875rem; }
.card__footer {
  display: flex; gap: 12px; padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}
.card__action {
  padding: 6px 16px; border: none; border-radius: 6px;
  font-size: 0.8rem; font-weight: 500; cursor: pointer;
}
.card__action--primary { background: #3b82f6; color: white; }
.card__action--secondary { background: #f1f5f9; color: #334155; }
`}
              previewHeight={220}
            />

            <InfoBox type="info" title="CSS Modules を使うなら BEM は不要？">
              <p>
                CSS Modules を使えばスコープの問題は解決するため、BEM の命名規則は必須ではありません。
                しかし、BEM の「ブロック・要素・修飾子」という考え方は、
                コンポーネントの構造を設計する際に非常に役立ちます。
                命名規則としてではなく、設計のフレームワークとして取り入れることをおすすめします。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: SMACSS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">SMACSS（Scalable and Modular Architecture for CSS）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              SMACSS はCSSをカテゴリに分類して管理する設計方法論です。
              Jonathan Snook によって提唱されました。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-foreground mb-3">SMACSS の5つのカテゴリ</h3>
              <div className="space-y-3 text-foreground/80 text-sm">
                <div>
                  <strong className="text-foreground">1. Base（ベース）</strong>
                  <p className="ml-4">要素セレクタのデフォルトスタイル。リセット CSS や基本スタイル。</p>
                </div>
                <div>
                  <strong className="text-foreground">2. Layout（レイアウト）</strong>
                  <p className="ml-4">ページの大枠の構造。ヘッダー、フッター、サイドバー、メインコンテンツなど。</p>
                </div>
                <div>
                  <strong className="text-foreground">3. Module（モジュール）</strong>
                  <p className="ml-4">再利用可能な UI コンポーネント。カード、ボタン、ナビゲーションなど。</p>
                </div>
                <div>
                  <strong className="text-foreground">4. State（ステート）</strong>
                  <p className="ml-4">コンポーネントの状態を表すスタイル。is-active、is-hidden、is-loading など。</p>
                </div>
                <div>
                  <strong className="text-foreground">5. Theme（テーマ）</strong>
                  <p className="ml-4">色やフォントなどの見た目に関するスタイル。テーマの切り替えに使う。</p>
                </div>
              </div>
            </div>

            <CodeBlock
              language="text"
              title="SMACSS のディレクトリ構成例"
              code={`src/styles/
├── base/
│   ├── _reset.css
│   ├── _typography.css
│   └── _variables.css
├── layout/
│   ├── _header.css
│   ├── _footer.css
│   └── _grid.css
├── modules/
│   ├── _button.css
│   ├── _card.css
│   ├── _nav.css
│   └── _form.css
├── state/
│   └── _state.css
├── theme/
│   ├── _light.css
│   └── _dark.css
└── main.css            ← すべてをインポートするエントリーファイル`}
            />

            <InfoBox type="info" title="React と SMACSS">
              <p>
                React ではコンポーネント単位でスタイルを管理するのが一般的なので、
                SMACSS をそのまま適用する場面は少ないです。
                しかし、Base（リセット）、Layout（レイアウト）、State（状態）の分類は
                React プロジェクトでも有用な考え方です。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: Tailwind 的ユーティリティクラスを自前で作る */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ユーティリティクラスを自前で作る</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Tailwind CSS の「ユーティリティファースト」アプローチは非常に人気がありますが、
              その考え方の本質は CSS 変数とシンプルなクラスの組み合わせで自前で再現できます。
              「なぜユーティリティクラスが便利なのか」を理解するために、自作してみましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">なぜユーティリティクラスが生まれたのか</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              従来の CSS 設計では、コンポーネントごとにクラスを定義していました。
              しかし <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.card-title</code> と
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.article-title</code> に同じスタイルを書くことが多く、
              「スタイルの重複」が問題でした。
              ユーティリティクラスは「1つの CSS プロパティ = 1つのクラス」にすることで、
              スタイルの再利用性を最大化するアプローチです。
            </p>

            <CodeBlock
              language="css"
              title="src/styles/utilities.css — 自作ユーティリティ"
              code={`/* === スペーシング === */
/* CSS 変数で基本単位を定義 */
:root {
  --space-unit: 4px;
}

.p-1 { padding: calc(var(--space-unit) * 1); }   /* 4px */
.p-2 { padding: calc(var(--space-unit) * 2); }   /* 8px */
.p-3 { padding: calc(var(--space-unit) * 3); }   /* 12px */
.p-4 { padding: calc(var(--space-unit) * 4); }   /* 16px */
.p-6 { padding: calc(var(--space-unit) * 6); }   /* 24px */
.p-8 { padding: calc(var(--space-unit) * 8); }   /* 32px */

.px-4 { padding-left: 16px; padding-right: 16px; }
.py-2 { padding-top: 8px; padding-bottom: 8px; }

.m-0 { margin: 0; }
.mb-2 { margin-bottom: 8px; }
.mb-4 { margin-bottom: 16px; }
.mt-4 { margin-top: 16px; }

.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }

/* === Flexbox === */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }

/* === Grid === */
.grid { display: grid; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }

/* === テキスト === */
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }

.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

.text-center { text-align: center; }

/* === 色（CSS 変数経由） === */
.text-primary { color: var(--color-primary); }
.text-muted { color: var(--color-text-muted); }
.bg-surface { background-color: var(--color-surface); }
.bg-primary { background-color: var(--color-primary); }

/* === 角丸 === */
.rounded { border-radius: 4px; }
.rounded-md { border-radius: 8px; }
.rounded-lg { border-radius: 12px; }
.rounded-full { border-radius: 9999px; }

/* === シャドウ === */
.shadow-sm { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06); }
.shadow-md { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
.shadow-lg { box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12); }

/* === その他 === */
.w-full { width: 100%; }
.cursor-pointer { cursor: pointer; }
.transition { transition: all 0.2s ease; }`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="自作ユーティリティクラスを使ったコンポーネント"
              code={`import './utilities.css';

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-surface rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
      <div className="flex gap-2 mt-4">
        <button className="bg-primary text-sm font-medium rounded-md px-4 py-2 cursor-pointer">
          詳細
        </button>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="自作 vs Tailwind CSS">
              <p>
                自前でユーティリティクラスを作ることで「仕組み」は理解できますが、
                実際のプロジェクトでは Tailwind CSS を使う方が効率的です。
                Tailwind は何千ものユーティリティを提供し、未使用クラスの自動除去、
                レスポンシブバリアント、カスタマイズなど、自前で再現するのは困難な機能を備えています。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: CSS Container クエリ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS Container クエリ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Container クエリは CSS の比較的新しい機能で、<strong>親要素のサイズ</strong>に基づいてスタイルを変更できます。
              メディアクエリが「ビューポートのサイズ」に反応するのに対し、
              Container クエリは「コンポーネントの配置されたコンテナのサイズ」に反応します。
              これはコンポーネント指向の React と非常に相性が良い機能です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">なぜ Container クエリが必要なのか</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              同じカードコンポーネントがサイドバー（狭い）とメインコンテンツ（広い）の両方で使われる場合、
              メディアクエリではビューポート幅しか見れないため、「サイドバーにいる時は縦並び、メインにいる時は横並び」
              という切り替えが困難でした。Container クエリはこの問題を解決します。
            </p>

            <CodeBlock
              language="css"
              title="Container クエリの基本"
              code={`/* 1. コンテナとして宣言 */
.card-wrapper {
  container-type: inline-size;  /* 横幅のサイズに反応 */
  container-name: card;         /* 名前を付ける（オプション） */
}

/* 2. コンテナのサイズに応じたスタイル */
.card {
  display: flex;
  flex-direction: column;       /* デフォルト: 縦並び */
  padding: 16px;
  background: white;
  border-radius: 12px;
}

.card__image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
}

.card__body {
  margin-top: 12px;
}

/* コンテナが 400px 以上なら横並び */
@container card (min-width: 400px) {
  .card {
    flex-direction: row;
    gap: 16px;
  }

  .card__image {
    width: 200px;
    height: auto;
  }

  .card__body {
    margin-top: 0;
  }
}

/* コンテナが 600px 以上ならさらにリッチに */
@container card (min-width: 600px) {
  .card {
    padding: 24px;
  }

  .card__image {
    width: 280px;
  }
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="React での Container クエリ"
              code={`import styles from './Card.module.css';

function Card({ image, title, description }: {
  image: string; title: string; description: string;
}) {
  return (
    <div className={styles.card}>
      <img className={styles.card__image} src={image} alt={title} />
      <div className={styles.card__body}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

// 同じ Card でも配置場所によって見た目が変わる
function Layout() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
      {/* サイドバー: コンテナが狭い → 縦並び */}
      <aside>
        <div className={styles.cardWrapper}>
          <Card image="/img.jpg" title="サイドバー" description="狭い表示" />
        </div>
      </aside>

      {/* メイン: コンテナが広い → 横並び */}
      <main>
        <div className={styles.cardWrapper}>
          <Card image="/img.jpg" title="メイン" description="広い表示" />
        </div>
      </main>
    </div>
  );
}`}
            />

            <InfoBox type="success" title="Container クエリのブラウザ対応">
              <p>
                Container クエリは 2023年以降すべてのモダンブラウザ（Chrome, Firefox, Safari, Edge）で
                サポートされています。IE は非対応ですが、2025年現在 IE のサポートはほぼ不要です。
                React のコンポーネント設計と自然に組み合わせられる、非常に強力な CSS 機能です。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: CSS Layers (@layer) */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS Layers（@layer）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@layer</code> は
              CSS のカスケード（スタイルの優先順位）を明示的に制御する機能です。
              「リセット CSS → ベーススタイル → コンポーネント → ユーティリティ」のように
              レイヤーの優先順位を宣言的に管理できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">なぜ @layer が必要なのか</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              従来の CSS では、スタイルの優先順位はファイルの読み込み順序と詳細度（specificity）で決まりました。
              これが「先に書いた CSS が後から読み込まれた CSS に上書きされる」「!important の乱用」といった問題を生みました。
              @layer を使うと、スタイルの優先順位を一箇所で宣言的に管理できます。
            </p>

            <CodeBlock
              language="css"
              title="@layer の使い方"
              code={`/* 1. レイヤーの優先順位を宣言（後のレイヤーが優先） */
@layer reset, base, components, utilities;

/* 2. 各レイヤーにスタイルを配置 */
@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

@layer base {
  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
    color: var(--color-text);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }
}

@layer components {
  .card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }
}

@layer utilities {
  /* utilities レイヤーが最も優先されるため、
     コンポーネントのスタイルを確実にオーバーライドできる */
  .text-center { text-align: center; }
  .mt-4 { margin-top: 16px; }
  .hidden { display: none; }
}

/* レイヤー外のスタイルはすべてのレイヤーより優先される */
/* → !important なしでも最優先にできる */`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="@layer でサードパーティ CSS を管理"
              code={`/* サードパーティのリセット CSS を低優先度レイヤーに */
@layer reset, vendor, app;

@layer vendor {
  /* サードパーティライブラリの CSS を @import で読み込み */
  @import url('react-datepicker/dist/react-datepicker.css');
}

@layer app {
  /* アプリのスタイルは常にサードパーティより優先 */
  .datepicker-custom {
    border-radius: 12px;
    font-family: inherit;
  }
}`}
            />

            <InfoBox type="info" title="Tailwind CSS v3.4+ は @layer を活用">
              <p>
                Tailwind CSS は内部的に <code className="bg-muted px-1 rounded">@layer base</code>、
                <code className="bg-muted px-1 rounded">@layer components</code>、
                <code className="bg-muted px-1 rounded">@layer utilities</code> を使っています。
                これにより、ユーティリティクラスが常にコンポーネントスタイルより優先されることが保証されています。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: CSS ネスティング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS ネスティング</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS ネスティングは、2024年に全モダンブラウザでサポートされた新機能です。
              SCSS や styled-components でお馴染みのネスト記法が、ネイティブ CSS でも使えるようになりました。
              プリプロセッサなしで、親子関係のあるスタイルを簡潔に書けます。
            </p>

            <CodeBlock
              language="css"
              title="ネイティブ CSS ネスティング"
              code={`/* 従来の書き方 */
.card { background: white; border-radius: 12px; padding: 24px; }
.card:hover { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); }
.card .card-title { font-size: 1.25rem; font-weight: 600; }
.card .card-title.large { font-size: 1.5rem; }
.card .card-body { color: #64748b; }
@media (max-width: 768px) {
  .card { padding: 16px; }
}

/* ネスティング記法（ネイティブ CSS）*/
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;

  /* & は現在のセレクタを参照（SCSS と同じ） */
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  /* 子要素のネスト */
  & .card-title {
    font-size: 1.25rem;
    font-weight: 600;

    &.large {
      font-size: 1.5rem;
    }
  }

  & .card-body {
    color: #64748b;
  }

  /* メディアクエリもネスト可能 */
  @media (max-width: 768px) {
    padding: 16px;
  }
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="CSS Modules + ネスティングの実用例"
              code={`/* Button.module.css — SCSS が不要になる！ */
.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* バリアント */
  &.primary {
    background: var(--color-primary);
    color: white;
  }

  &.secondary {
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }

  /* サイズ */
  &.sm {
    padding: 6px 12px;
    font-size: 0.75rem;
  }

  &.lg {
    padding: 14px 28px;
    font-size: 1rem;
  }

  /* アイコン */
  & .icon {
    width: 16px;
    height: 16px;
  }
}`}
            />

            <InfoBox type="success" title="SCSS が不要になる時代">
              <p>
                CSS ネスティング、CSS 変数、Container クエリ、@layer など、
                以前は SCSS でしかできなかった機能の多くがネイティブ CSS でサポートされるようになりました。
                新規プロジェクトでは SCSS を導入せず、ネイティブ CSS + CSS Modules で
                十分対応できるケースが増えています。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: CSS カスタムプロパティとデザイントークン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS カスタムプロパティとデザイントークン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              デザイントークンは、デザインの決定事項（色、スペーシング、タイポグラフィなど）を
              プラットフォームに依存しない形式で定義したものです。
              CSS カスタムプロパティ（変数）は、デザイントークンを実装する最も直接的な方法です。
            </p>

            <CodeBlock
              language="css"
              title="デザイントークンとしての CSS 変数"
              code={`:root {
  /* カラーパレット */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-light: #eff6ff;
  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;

  /* スペーシング（4px ベース） */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;

  /* タイポグラフィ */
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;

  /* 角丸 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* シャドウ */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);

  /* トランジション */
  --transition-fast: 100ms ease;
  --transition-normal: 200ms ease;
}

/* ダークモード */
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-primary-hover: #93bbfd;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="CSS 変数でテーマを切り替える（プレビュー）"
              code={`function App() {
  var _s = React.useState('light');
  var theme = _s[0];
  var setTheme = _s[1];
  var isLight = theme === 'light';

  var colors = isLight
    ? { bg: '#f8fafc', surface: '#ffffff', text: '#1e293b', muted: '#64748b', primary: '#3b82f6', border: '#e2e8f0' }
    : { bg: '#0f172a', surface: '#1e293b', text: '#f1f5f9', muted: '#94a3b8', primary: '#60a5fa', border: '#334155' };

  return (
    <div style={{ background: colors.bg, padding: 24, borderRadius: 12, transition: 'all 0.3s ease' }}>
      <div style={{
        background: colors.surface, borderRadius: 12, padding: 20,
        border: '1px solid ' + colors.border, marginBottom: 16,
      }}>
        <h3 style={{ color: colors.text, fontWeight: 700, marginBottom: 8 }}>カード</h3>
        <p style={{ color: colors.muted, fontSize: '0.875rem', lineHeight: 1.6 }}>
          CSS 変数でテーマを切り替えると、ランタイムコストなしでテーマ変更が実現できます。
        </p>
      </div>
      <button
        onClick={function() { setTheme(isLight ? 'dark' : 'light'); }}
        style={{
          padding: '10px 20px', border: 'none', borderRadius: 8,
          background: colors.primary, color: 'white',
          fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
        }}
      >
        {isLight ? 'ダークモード' : 'ライトモード'}に切り替え
      </button>
    </div>
  );
}`}
              previewHeight={220}
            />

            <InfoBox type="info" title="Figma との連携">
              <p>
                デザイントークンを JSON 形式で管理すると、Figma の Variables や Tokens Studio プラグインと
                同期することもできます。デザイナーが Figma で変更したトークンが、
                自動的にコードに反映される仕組みを作ることで、デザインと実装の乖離を防げます。
              </p>
            </InfoBox>
          </section>

          {/* セクション8: レスポンシブデザイン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レスポンシブデザインパターン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              レスポンシブデザインは、画面サイズに応じてレイアウトを最適化するアプローチです。
              モバイルファースト設計が現在の標準です。
            </p>

            <CodePreview
              language="tsx"
              title="よく使うレスポンシブパターン（プレビュー）"
              code={`function App() {
  var items = ['カード 1', 'カード 2', 'カード 3', 'カード 4'];
  return (
    <div>
      <h2 className="fluid-title">Fluid Typography</h2>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 16 }}>
        clamp() でフォントサイズが滑らかに変化します
      </p>
      <div className="auto-grid">
        {items.map(function(item) {
          return React.createElement('div', {
            key: item,
            style: {
              background: 'white', borderRadius: 12, padding: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              textAlign: 'center', fontSize: '0.875rem', color: 'var(--text)',
            }
          }, item);
        })}
      </div>
    </div>
  );
}`}
              css={`
.fluid-title {
  font-size: clamp(1.2rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 4px;
}
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}
`}
              previewHeight={200}
            />
          </section>

          {/* セクション9: まとめ アプローチの選び方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ: プロジェクトに合った CSS アプローチの選び方</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-3 py-3 text-left font-semibold">プロジェクトの特徴</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">おすすめアプローチ</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">理由</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr>
                    <td className="border border-border px-3 py-2">小規模・個人プロジェクト</td>
                    <td className="border border-border px-3 py-2 font-medium">CSS Modules or Tailwind</td>
                    <td className="border border-border px-3 py-2">設定不要、学習コスト低</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2">中〜大規模チーム開発</td>
                    <td className="border border-border px-3 py-2 font-medium">Tailwind + デザイントークン</td>
                    <td className="border border-border px-3 py-2">一貫性を保ちやすい</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2">コンポーネントライブラリ</td>
                    <td className="border border-border px-3 py-2 font-medium">CSS-in-JS or CSS Modules</td>
                    <td className="border border-border px-3 py-2">スコープとカプセル化が重要</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2">パフォーマンス最優先</td>
                    <td className="border border-border px-3 py-2 font-medium">CSS Modules or Tailwind</td>
                    <td className="border border-border px-3 py-2">ランタイムコストゼロ</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2">動的スタイルが多い SPA</td>
                    <td className="border border-border px-3 py-2 font-medium">styled-components or Emotion</td>
                    <td className="border border-border px-3 py-2">JS で動的に制御</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2">Next.js App Router</td>
                    <td className="border border-border px-3 py-2 font-medium">Tailwind or CSS Modules</td>
                    <td className="border border-border px-3 py-2">Server Components 対応</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2">MUI を使う</td>
                    <td className="border border-border px-3 py-2 font-medium">Emotion（MUI 内蔵）</td>
                    <td className="border border-border px-3 py-2">MUI v5 のデフォルト</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2">デザイナーが CSS を書く</td>
                    <td className="border border-border px-3 py-2 font-medium">CSS Modules</td>
                    <td className="border border-border px-3 py-2">標準の CSS 知識で書ける</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-3">CSS 設計のチェックリスト</h3>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>デザイントークン（色、スペーシング、フォント）が定義されているか</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>コンポーネントのスタイルはスコープされているか（名前衝突しないか）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>モバイルファースト設計になっているか</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>ダークモード対応の仕組みが用意されているか</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>共通コンポーネント（ボタン、カード等）が再利用可能な形で設計されているか</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>チームメンバーが理解・保守できるアプローチか</span>
                </li>
              </ul>
            </div>

            <InfoBox type="success" title="CSS スタイリング基礎セクション完了">
              <p>
                このセクションでは、プレーン CSS から CSS Modules、styled-components、Emotion、
                そして CSS 設計パターンまで幅広く学びました。
                どのアプローチにも長所と短所があり、「唯一の正解」はありません。
                プロジェクトの規模、チーム構成、パフォーマンス要件に応じて最適なものを選びましょう。
                次のセクションでは、今最も人気のある CSS フレームワーク「Tailwind CSS」を深く学びます。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック 1 */}
          <section>
            <Quiz
              question="CSS Container クエリがメディアクエリと異なる点はどれですか？"
              options={[
                { label: 'Container クエリの方がパフォーマンスが良い' },
                { label: 'Container クエリはビューポートではなく、親コンテナのサイズに基づいてスタイルを変更する', correct: true },
                { label: 'Container クエリは JavaScript で動的にサイズを計算する' },
                { label: 'Container クエリはモバイルデバイスでのみ動作する' },
              ]}
              explanation="メディアクエリはブラウザのビューポート（画面全体）のサイズに反応しますが、Container クエリは container-type を宣言した親要素のサイズに反応します。これにより、同じコンポーネントがサイドバー（狭い）とメインコンテンツ（広い）で異なるレイアウトを持つことが可能になります。"
            />
          </section>

          {/* 理解度チェック 2 */}
          <section>
            <Quiz
              question="CSS @layer の主な目的はどれですか？"
              options={[
                { label: 'CSS ファイルのサイズを圧縮すること' },
                { label: 'CSS アニメーションのレイヤーを管理すること' },
                { label: 'スタイルの優先順位（カスケード）を宣言的に制御すること', correct: true },
                { label: 'CSS をコンポーネント単位でスコープすること' },
              ]}
              explanation="@layer を使うと、CSS のカスケード（スタイルの優先順位）を明示的に宣言できます。例えば @layer reset, base, components, utilities; と書くと、utilities レイヤーのスタイルは常に components より優先されます。これにより、!important の乱用やファイル読み込み順序への依存を避けられます。"
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <CodingChallenge
              title="デザイントークンの CSS 変数定義"
              description=":root の CSS カスタムプロパティの ___ を埋めてください。--カテゴリ-名前 の命名規則で、色・スペーシング・角丸のトークンを定義します。"
              initialCode={`:root {
  --color-___: #3b82f6; // ← ここを埋める（トークン名）
  --color-success: #10b981;
  --color-danger: #ef4444;

  --___-sm: 8px; // ← ここを埋める（カテゴリ名）
  --spacing-md: 16px;
  --spacing-lg: 24px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}`}
              answer={`:root {
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-danger: #ef4444;

  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}`}
              keywords={['--color-primary', '--spacing-sm']}
              hints={[
                '#3b82f6 はブランドの主要な青色なので、トークン名は primary です',
                '8px, 16px, 24px はスペーシング（余白）の値なので、カテゴリ名は spacing です',
              ]}
            />
          </section>

          {/* リファレンスリンク */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'MDN - CSS Container Queries',
                  url: 'https://developer.mozilla.org/ja/docs/Web/CSS/CSS_containment/Container_queries',
                  description: 'Container クエリの仕様、使い方、ブラウザサポートの公式リファレンス',
                },
                {
                  title: 'MDN - @layer',
                  url: 'https://developer.mozilla.org/ja/docs/Web/CSS/@layer',
                  description: 'CSS レイヤーの仕様と使い方の公式リファレンス',
                },
                {
                  title: 'MDN - CSS Nesting',
                  url: 'https://developer.mozilla.org/ja/docs/Web/CSS/CSS_nesting',
                  description: 'ネイティブ CSS ネスティングの仕様とブラウザサポート',
                },
                {
                  title: 'SMACSS 公式サイト',
                  url: 'https://smacss.com/',
                  description: 'Jonathan Snook による SMACSS 設計方法論の公式ドキュメント',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'BEM と CSS Modules はどう使い分ければいいですか？',
                  answer: 'CSS Modules を使っている場合、BEM の命名規則は必須ではありません。CSS Modules がスコープの問題を自動的に解決するためです。ただし、BEM の「ブロック・要素・修飾子」という構造化の考え方は、コンポーネントの設計で役立ちます。CSS Modules のクラス名に BEM のような構造を持たせる（例: .title, .titleLarge）のも有効です。',
                },
                {
                  question: 'CSS ネスティングは SCSS の完全な代替になりますか？',
                  answer: 'ネスティング、CSS 変数、calc() など主要な機能はネイティブ CSS でカバーできますが、SCSS の mixin、extend、ループ、条件分岐といった高度な機能はネイティブ CSS にはありません。シンプルなプロジェクトではネイティブ CSS で十分ですが、複雑なスタイル生成が必要な場合は SCSS の方が便利です。',
                },
                {
                  question: 'デザイントークンは JSON と CSS 変数のどちらで管理すべきですか？',
                  answer: 'JSON（または TypeScript オブジェクト）でトークンを定義し、ビルド時に CSS 変数に変換するのがベストプラクティスです。JSON はプラットフォームに依存しないため、Web（CSS 変数）、iOS（Swift）、Android（XML）などマルチプラットフォームに対応できます。Style Dictionary や Tokens Studio などのツールを使えば、この変換を自動化できます。',
                },
                {
                  question: 'Container クエリとメディアクエリは併用できますか？',
                  answer: 'はい、併用できます。メディアクエリはページ全体のレイアウト変更（ナビゲーションの切り替え、カラム数の変更など）に使い、Container クエリはコンポーネント内部のレイアウト調整に使うのが自然です。例えば、メディアクエリでサイドバーの表示/非表示を切り替え、Container クエリでカードの縦/横レイアウトを切り替えるという組み合わせが有効です。',
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
