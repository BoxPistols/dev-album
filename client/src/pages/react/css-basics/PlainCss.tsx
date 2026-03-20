import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function PlainCss() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 20</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">プレーン CSS と CSS Modules</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React でスタイリングを始める最もシンプルな方法、プレーン CSS と CSS Modules を学びます。
          グローバル CSS の問題点を理解し、CSS Modules がどのように解決するかを見ていきましょう。
        </p>

        <WhyNowBox tags={['CSS', 'CSS Modules', 'スコープ', 'Vite']}>
          <p>
            ここまでで React のコンポーネント設計や状態管理を学んできました。
            しかし、見た目を整えなければアプリケーションは完成しません。
            デザイナーにとって CSS は最も馴染みのあるツールです。
            まずは React でプレーン CSS をどう使うか、そしてその課題を CSS Modules がどう解決するかを理解しましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: React でのプレーン CSS */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React でプレーン CSS を使う</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React でプレーン CSS を使う方法は非常にシンプルです。
              CSS ファイルを作成し、コンポーネントから <code className="bg-muted px-1.5 py-0.5 rounded text-sm">import</code> するだけです。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">CSS ファイルの作成</h3>
            <CodeBlock
              language="css"
              title="src/styles/App.css"
              code={`/* グローバルに適用される CSS */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1a1a1a;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
}

.button:hover {
  background-color: #2563eb;
}`}
            />

            <div className="mt-4" />

            <h3 className="text-lg font-semibold text-foreground mb-3">コンポーネントでのインポート</h3>
            <CodePreview
              language="tsx"
              title="src/App.tsx"
              code={`function App() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1a1a' }}>こんにちは React</h1>
      <div style={{ background: 'white', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <p>カードコンテンツ</p>
        <button style={{ padding: '8px 16px', border: 'none', borderRadius: 4, backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer' }}>クリック</button>
      </div>
    </div>
  );
}`}
              previewHeight={180}
            />

            <InfoBox type="info" title="class ではなく className">
              <p>
                HTML では <code className="bg-muted px-1.5 py-0.5 rounded text-sm">class</code> 属性を使いますが、
                React (JSX) では <code className="bg-muted px-1.5 py-0.5 rounded text-sm">className</code> を使います。
                これは <code className="bg-muted px-1.5 py-0.5 rounded text-sm">class</code> が JavaScript の予約語であるためです。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: プレーン CSS の問題点 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プレーン CSS の問題点</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              プレーン CSS は手軽ですが、React のコンポーネント設計と組み合わせると問題が生じます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">問題1: グローバルスコープ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS はすべてグローバルに適用されます。異なるコンポーネントで同じクラス名を使うと衝突します。
            </p>

            <CodeBlock
              language="css"
              title="src/components/Header.css"
              code={`/* Header コンポーネント用の .title */
.title {
  font-size: 1.5rem;
  color: white;
  background: #1e293b;
  padding: 16px;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="src/components/Article.css"
              code={`/* Article コンポーネント用の .title - 衝突！ */
.title {
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 16px;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="どちらの .title が適用される？"
              code={`// Header.tsx
import './Header.css';

function Header() {
  // .title のスタイルが Article.css で上書きされるかも！
  return <header className="title">サイトタイトル</header>;
}

// Article.tsx
import './Article.css';

function Article() {
  return <h1 className="title">記事タイトル</h1>;
}`}
            />

            <InfoBox type="warning" title="CSS の読み込み順に依存する">
              <p>
                どちらの CSS が「勝つ」かは、ファイルの読み込み順序に依存します。
                これは予測が難しく、コンポーネントが増えるにつれて管理が困難になります。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">問題2: 不要なスタイルの残存</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コンポーネントを削除しても、対応する CSS が残りがちです。
              使われていないスタイルがプロジェクト内に蓄積し、CSS ファイルが肥大化します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">問題3: 命名規則の負担</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              衝突を避けるために、BEM のような命名規則を導入する必要が出てきます。
              クラス名が長くなり、開発効率が下がることもあります。
            </p>

            <CodeBlock
              language="css"
              title="BEM で衝突を回避する例"
              code={`/* 衝突を避けるために長い名前になりがち */
.header__title { ... }
.header__title--large { ... }
.article__title { ... }
.article__title--highlighted { ... }
.sidebar__title { ... }
.sidebar__title--collapsed { ... }`}
            />
          </section>

          {/* セクション3: CSS Modules とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS Modules とは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules は、CSS クラス名を自動的にユニークな名前に変換する仕組みです。
              ファイル単位でスコープが生成されるため、クラス名の衝突を完全に防ぎます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">仕組み</h3>
            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <div className="space-y-3 text-foreground/80">
                <p><strong>1. ファイル名の規約:</strong> <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.module.css</code> という拡張子を使う</p>
                <p><strong>2. ビルド時の変換:</strong> <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.title</code> → <code className="bg-muted px-1.5 py-0.5 rounded text-sm">._title_x7h3k_1</code> のように変換される</p>
                <p><strong>3. JavaScript オブジェクト:</strong> クラス名をオブジェクトとしてインポートできる</p>
              </div>
            </div>

            <CodeBlock
              language="css"
              title="src/components/Card.module.css"
              code={`/* CSS Modules: .module.css という拡張子がポイント */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.description {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="src/components/Card.tsx（CSS Modules のプレビュー）"
              code={`function App() {
  return (
    <div style={{
      background: 'white',
      borderRadius: 12,
      padding: 24,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'box-shadow 0.2s ease',
      maxWidth: 360,
    }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>カードタイトル</h3>
      <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>カードの説明文です。CSS Modules により、クラス名がユニークに変換されます。</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
        <button style={{ padding: '8px 16px', border: 'none', borderRadius: 6, backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer', fontWeight: 500 }}>詳細</button>
      </div>
    </div>
  );
}`}
              previewHeight={200}
            />

            <div className="mt-4" />

            <CodeBlock
              language="html"
              title="実際に生成される HTML（開発者ツールで確認）"
              code={`<!-- ユニークなクラス名が自動生成される -->
<div class="_card_x7h3k_1">
  <h3 class="_title_x7h3k_5">カードタイトル</h3>
  <p class="_description_x7h3k_12">カードの説明文...</p>
</div>`}
            />

            <InfoBox type="success" title="同じ .title でも衝突しない">
              <p>
                Header.module.css の <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.title</code> と
                Card.module.css の <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.title</code> は、
                ビルド後にそれぞれ異なるクラス名に変換されます。
                もう命名規則で悩む必要はありません。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: ハッシュ化の仕組み詳解 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS Modules のハッシュ化の仕組み</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules がクラス名をどのように変換するか、その内部動作を詳しく見ていきましょう。
              「なぜハッシュ化が必要なのか」を理解すると、デバッグ時のクラス名の読み方もわかるようになります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">変換の流れ</h3>
            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <div className="space-y-4 text-foreground/80 text-sm">
                <div>
                  <strong className="text-foreground">Step 1: ソースコードの解析</strong>
                  <p className="ml-4 mt-1">ビルドツール（Vite / webpack）が <code className="bg-muted px-1 rounded">.module.css</code> ファイルを検出し、CSSパーサーがクラス名を抽出する。</p>
                </div>
                <div>
                  <strong className="text-foreground">Step 2: ハッシュの生成</strong>
                  <p className="ml-4 mt-1">ファイルパス + クラス名 + ファイル内容からハッシュ値を計算する。同じファイルの同じクラス名なら常に同じハッシュが生成される（決定的）。</p>
                </div>
                <div>
                  <strong className="text-foreground">Step 3: CSS の書き換え</strong>
                  <p className="ml-4 mt-1">元のクラス名をハッシュ付きのクラス名に置換した CSS を出力する。</p>
                </div>
                <div>
                  <strong className="text-foreground">Step 4: JavaScript マッピングの生成</strong>
                  <p className="ml-4 mt-1">元のクラス名と変換後のクラス名の対応関係を JavaScript オブジェクトとしてエクスポートする。</p>
                </div>
              </div>
            </div>

            <CodeBlock
              language="text"
              title="変換の例（Vite のデフォルト設定）"
              code={`入力ファイル: src/components/Card.module.css

元のクラス名        →  変換後のクラス名
.card              →  ._card_x7h3k_1
.title             →  ._title_x7h3k_5
.description       →  ._description_x7h3k_12
.footer            →  ._footer_x7h3k_18

生成される JavaScript オブジェクト:
export default {
  card: "_card_x7h3k_1",
  title: "_title_x7h3k_5",
  description: "_description_x7h3k_12",
  footer: "_footer_x7h3k_18"
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">クラス名のフォーマットをカスタマイズ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vite では <code className="bg-muted px-1.5 py-0.5 rounded text-sm">generateScopedName</code> オプションでクラス名のフォーマットを変更できます。
              開発環境ではデバッグしやすい名前に、本番環境では短い名前にするのがベストプラクティスです。
            </p>

            <CodeBlock
              language="typescript"
              title="vite.config.ts — 開発/本番で異なるクラス名"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName:
        mode === 'development'
          // 開発: コンポーネント名とクラス名が見えるので DevTools でわかりやすい
          ? '[name]__[local]__[hash:base64:5]'
          // 本番: 短いハッシュのみで CSS ファイルサイズを削減
          : '[hash:base64:8]',
    },
  },
}));

// 開発環境での出力例:
// Card__title__x7h3k → 「Card コンポーネントの title クラス」だとすぐわかる
//
// 本番環境での出力例:
// dF4kL9mQ → 短くて効率的`}
            />

            <div className="bg-muted/30 border border-border rounded-lg p-6 mt-4 mb-4">
              <h4 className="font-semibold text-foreground mb-3">使用できるプレースホルダー</h4>
              <div className="space-y-2 text-foreground/80 text-sm font-mono">
                <p><code>[name]</code> — CSS ファイル名（拡張子なし）</p>
                <p><code>[local]</code> — 元のクラス名</p>
                <p><code>[hash:base64:N]</code> — N 文字のハッシュ値</p>
                <p><code>[folder]</code> — フォルダ名</p>
                <p><code>[path]</code> — ファイルパス</p>
              </div>
            </div>
          </section>

          {/* セクション5: :global セレクタ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">:global セレクタ — スコープを外す方法</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules ではすべてのクラス名がローカルスコープになりますが、
              外部ライブラリのクラスを上書きしたい場合など、グローバルにスタイルを適用したい場面もあります。
              そんなときに使うのが <code className="bg-muted px-1.5 py-0.5 rounded text-sm">:global</code> セレクタです。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">なぜ :global が必要になるのか</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              たとえば、サードパーティのカルーセルライブラリや DatePicker が生成するクラス名は
              CSS Modules の管理外です。それらのスタイルをカスタマイズするには、
              ハッシュ化されないグローバルなクラス名でスタイルを書く必要があります。
            </p>

            <CodeBlock
              language="css"
              title="src/components/DatePickerWrapper.module.css"
              code={`/* ローカルスコープのクラス（通常通りハッシュ化される） */
.wrapper {
  padding: 16px;
  border-radius: 12px;
  background: white;
}

/* :global() で囲んだクラス名はハッシュ化されない */
.wrapper :global(.react-datepicker) {
  font-family: inherit;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.wrapper :global(.react-datepicker__header) {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.wrapper :global(.react-datepicker__day--selected) {
  background-color: #3b82f6;
  color: white;
  border-radius: 50%;
}

/* ブロック記法: 複数のグローバルセレクタをまとめて書ける */
:global {
  .tippy-content {
    padding: 8px 12px;
    font-size: 0.875rem;
  }

  .tippy-arrow {
    color: #1e293b;
  }
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="使用例"
              code={`import styles from './DatePickerWrapper.module.css';
import DatePicker from 'react-datepicker';

function DatePickerWrapper() {
  return (
    // styles.wrapper はハッシュ化されたローカルクラス
    // 内部の .react-datepicker 等は :global によりハッシュ化されない
    <div className={styles.wrapper}>
      <DatePicker />
    </div>
  );
}`}
            />

            <InfoBox type="warning" title=":global の使いすぎに注意">
              <p>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">:global</code> を多用すると、
                CSS Modules の利点であるスコープの隔離が失われます。
                サードパーティライブラリのスタイル上書きなど、本当に必要な場面に限定して使いましょう。
                必ず親のローカルクラスでネストして、影響範囲を限定するのがベストプラクティスです。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: Vite での CSS Modules */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Vite での CSS Modules セットアップ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Vite は CSS Modules をビルトインでサポートしています。追加の設定は一切不要です。
            </p>

            <CodeBlock
              language="tsx"
              title="設定不要！ファイル名を .module.css にするだけ"
              code={`// Vite では .module.css ファイルを import するだけで自動的に CSS Modules として扱われる
import styles from './Button.module.css';

// styles はオブジェクトとして使える
console.log(styles);
// → { button: "_button_a1b2c_1", primary: "_primary_a1b2c_8", ... }`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">TypeScript の型定義（オプション）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              TypeScript で CSS Modules を使う場合、型定義を追加すると補完が効くようになります。
            </p>

            <CodeBlock
              language="typescript"
              title="src/vite-env.d.ts（または global.d.ts）"
              code={`/// <reference types="vite/client" />

// CSS Modules の型定義
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}`}
            />

            <InfoBox type="info" title="Vite のデフォルト設定">
              <p>
                Vite は <code className="bg-muted px-1.5 py-0.5 rounded text-sm">vite/client</code> の型定義に
                CSS Modules の型が含まれています。通常は追加の設定なしで TypeScript と組み合わせて使えます。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Vite の CSS Modules 設定をカスタマイズ</h3>
            <CodeBlock
              language="typescript"
              title="vite.config.ts（必要な場合のみ）"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // クラス名の生成パターンをカスタマイズ
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // ローカルスコープをデフォルトにする（通常はデフォルト）
      scopeBehaviour: 'local',
    },
  },
});`}
            />
          </section>

          {/* セクション7: className の扱い方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">className の扱い方</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules では、クラス名をオブジェクトのプロパティとしてアクセスします。
              複数のクラスを組み合わせたり、条件付きで適用する方法を見ていきましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">基本的な className バインディング</h3>
            <CodeBlock
              language="tsx"
              title="単一クラス"
              code={`import styles from './Button.module.css';

// 単一クラスの適用
<button className={styles.button}>クリック</button>

// ハイフン付きクラス名はブラケット記法で
<button className={styles['primary-button']}>クリック</button>`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">複数クラスの結合</h3>
            <CodeBlock
              language="tsx"
              title="テンプレートリテラルで結合"
              code={`import styles from './Button.module.css';

// テンプレートリテラルで複数クラスを結合
<button className={\`\${styles.button} \${styles.primary}\`}>
  プライマリボタン
</button>

// 条件付きクラス
<button className={\`\${styles.button} \${isActive ? styles.active : ''}\`}>
  条件付きクラス
</button>

// 配列 + join でも可能
<button className={[styles.button, styles.large, styles.primary].join(' ')}>
  複数クラス
</button>`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">clsx / classnames ライブラリ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              複雑な条件付きクラスには、<code className="bg-muted px-1.5 py-0.5 rounded text-sm">clsx</code> や
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">classnames</code> ライブラリが便利です。
            </p>

            <CodeBlock
              language="bash"
              title="インストール"
              code={`npm install clsx`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="clsx を使った例"
              code={`import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

function Button({ variant = 'primary', size = 'md', disabled, children }: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,           // 常に適用
        styles[variant],         // variant に応じたクラス
        styles[size],            // size に応じたクラス
        disabled && styles.disabled  // disabled の時だけ適用
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}`}
            />
          </section>

          {/* セクション8: composes の実践 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">composes でスタイルを合成する</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules には <code className="bg-muted px-1.5 py-0.5 rounded text-sm">composes</code> という独自の機能があり、
              他のクラスのスタイルを継承（合成）できます。
              これは CSS のカスケードとは異なる仕組みで、ビルド時に処理されるため実行時のコストはゼロです。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">なぜ composes が生まれたのか</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              従来の CSS では「スタイルの再利用」は主にカスケードと継承で行っていました。
              しかし、これは CSS の詳細度（specificity）問題を引き起こしがちです。
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">composes</code> はビルド時に複数のクラス名を
              HTML 要素に付与することで、詳細度を一切変えずにスタイルを合成します。
            </p>

            <CodeBlock
              language="css"
              title="src/components/Button.module.css"
              code={`/* ベーススタイル */
.base {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* composes でベーススタイルを継承 */
.primary {
  composes: base;
  background-color: #3b82f6;
  color: white;
}

.primary:hover {
  background-color: #2563eb;
}

.secondary {
  composes: base;
  background-color: #f1f5f9;
  color: #334155;
}

.secondary:hover {
  background-color: #e2e8f0;
}

.danger {
  composes: base;
  background-color: #ef4444;
  color: white;
}

.danger:hover {
  background-color: #dc2626;
}

/* 別ファイルからの合成も可能 */
.specialButton {
  composes: base;
  composes: shadow from './shared.module.css';
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="composes を使ったコンポーネント"
              code={`import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  variant?: Variant;
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  // composes により、styles.primary には base のスタイルも含まれる
  // 追加で base を指定する必要がない
  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">composes の内部動作</h3>
            <CodeBlock
              language="text"
              title="生成される HTML を見てみよう"
              code={`CSS Modules の composes は「クラス名を複数付与する」ことで動作します。

例: styles.primary を参照すると...

JavaScript 上: styles.primary → "_base_a1b2c_1 _primary_a1b2c_8"
                                  ^^^^^^^^^^^ 合成された base のクラスも含まれる

生成される HTML:
<button class="_base_a1b2c_1 _primary_a1b2c_8">プライマリ</button>

→ 2つのクラスが付与されるので、base と primary 両方のスタイルが適用される
→ 詳細度は変わらない（どちらも .クラス名 = 詳細度 010）`}
            />

            <InfoBox type="info" title="composes はビルド時に解決される">
              <p>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">composes</code> はランタイムではなくビルド時に処理されます。
                生成される HTML には複数のクラス名が付与されるため、パフォーマンスへの影響はありません。
                別ファイルからの <code className="bg-muted px-1.5 py-0.5 rounded text-sm">composes: ... from '...'</code> も同様にビルド時に解決されます。
              </p>
            </InfoBox>
          </section>

          {/* セクション9: CSS Modules + TypeScript */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS Modules + TypeScript（typed-css-modules）</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules のデフォルトの型定義は <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{`{ [key: string]: string }`}</code> なので、
              存在しないクラス名を書いてもコンパイルエラーになりません。
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">typed-css-modules</code> を使うと、
              各 CSS Modules ファイルに対応する型定義ファイルを自動生成でき、クラス名のタイプセーフティが得られます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">なぜ型が必要なのか</h3>
            <CodeBlock
              language="tsx"
              title="型定義がない場合の問題"
              code={`import styles from './Card.module.css';

// 問題: "tigle" はタイポだが、TypeScript はエラーにしない
<h3 className={styles.tigle}>タイトル</h3>
// → undefined が className に渡され、クラスが適用されない
// → 画面上でスタイルが崩れるが、コンパイルエラーにはならない`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">typed-css-modules のセットアップ</h3>
            <CodeBlock
              language="bash"
              title="インストールと実行"
              code={`# インストール
npm install -D typed-css-modules

# 実行: .module.css ファイルに対応する .module.css.d.ts を生成
npx tcm src

# ウォッチモード: ファイル変更時に自動で型定義を再生成
npx tcm src --watch`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="typescript"
              title="自動生成される Card.module.css.d.ts"
              code={`// このファイルは typed-css-modules により自動生成されます
// 手動で編集しないでください
declare const styles: {
  readonly card: string;
  readonly title: string;
  readonly description: string;
  readonly footer: string;
};
export default styles;`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="型定義があると安全に書ける"
              code={`import styles from './Card.module.css';

// 型定義により、存在するクラス名のみが補完候補に出る
<h3 className={styles.title}>タイトル</h3>       // OK
<h3 className={styles.tigle}>タイトル</h3>       // TS エラー！
// → Property 'tigle' does not exist on type '...'

// エディタの補完で card, title, description, footer が候補に表示される`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">package.json にスクリプトを追加</h3>
            <CodeBlock
              language="json"
              title="package.json"
              code={`{
  "scripts": {
    "dev": "vite",
    "build": "tcm src && tsc && vite build",
    "tcm": "tcm src",
    "tcm:watch": "tcm src --watch"
  }
}`}
            />

            <InfoBox type="info" title="Vite プラグインによる代替手段">
              <p>
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">vite-plugin-css-modules-dts</code> を使えば、
                Vite のビルドプロセスに統合して型定義を自動生成することもできます。
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">typed-css-modules</code> の代わりに
                こちらを選ぶプロジェクトも増えています。
              </p>
            </InfoBox>
          </section>

          {/* セクション10: 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プレーン CSS vs CSS Modules 比較</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left text-sm font-semibold">特徴</th>
                    <th className="border border-border px-4 py-3 text-left text-sm font-semibold">プレーン CSS</th>
                    <th className="border border-border px-4 py-3 text-left text-sm font-semibold">CSS Modules</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-foreground/80">
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">スコープ</td>
                    <td className="border border-border px-4 py-3">グローバル</td>
                    <td className="border border-border px-4 py-3">ローカル（自動）</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-3 font-medium">クラス名の衝突</td>
                    <td className="border border-border px-4 py-3">起きる</td>
                    <td className="border border-border px-4 py-3">起きない</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">学習コスト</td>
                    <td className="border border-border px-4 py-3">なし</td>
                    <td className="border border-border px-4 py-3">ほぼなし</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-3 font-medium">ツール設定</td>
                    <td className="border border-border px-4 py-3">不要</td>
                    <td className="border border-border px-4 py-3">Vite では不要</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">命名規則</td>
                    <td className="border border-border px-4 py-3">BEM 等が必要</td>
                    <td className="border border-border px-4 py-3">自由に命名可能</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-3 font-medium">デバッグ</td>
                    <td className="border border-border px-4 py-3">直感的</td>
                    <td className="border border-border px-4 py-3">ハッシュ付きクラス名</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-medium">動的スタイル</td>
                    <td className="border border-border px-4 py-3">CSS 変数のみ</td>
                    <td className="border border-border px-4 py-3">CSS 変数 + クラス切替</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-4 py-3 font-medium">コンポーネントとの結合</td>
                    <td className="border border-border px-4 py-3">弱い</td>
                    <td className="border border-border px-4 py-3">強い（同一ディレクトリに配置）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション11: 実践例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: カードコンポーネント</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules を使って、実際のプロジェクトで使えるカードコンポーネントを作ってみましょう。
            </p>

            <CodeBlock
              language="css"
              title="src/components/ProfileCard.module.css"
              code={`/* プロフィールカードのスタイル */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 320px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e2e8f0;
  margin-bottom: 16px;
}

.name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.role {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 16px;
}

.bio {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
}

.tag {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #eff6ff;
  color: #3b82f6;
}

.actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.followButton {
  flex: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: #3b82f6;
  color: white;
}

.followButton:hover {
  background-color: #2563eb;
}

.messageButton {
  flex: 1;
  padding: 10px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
  color: #334155;
}

.messageButton:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

/* レスポンシブ対応 */
@media (max-width: 640px) {
  .card {
    padding: 24px 16px;
  }

  .actions {
    flex-direction: column;
  }
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/components/ProfileCard.tsx"
              code={`import styles from './ProfileCard.module.css';

interface ProfileCardProps {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  tags: string[];
  onFollow?: () => void;
  onMessage?: () => void;
}

function ProfileCard({
  name,
  role,
  bio,
  avatarUrl,
  tags,
  onFollow,
  onMessage,
}: ProfileCardProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.avatar}
        src={avatarUrl}
        alt={\`\${name}のアバター\`}
      />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
      <p className={styles.bio}>{bio}</p>

      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.followButton} onClick={onFollow}>
          フォロー
        </button>
        <button className={styles.messageButton} onClick={onMessage}>
          メッセージ
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="プロフィールカードのプレビュー"
              code={`function App() {
  const tags = ['Figma', 'React', 'TypeScript', 'UI デザイン'];
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: 'white', borderRadius: 16, padding: '32px 24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)', maxWidth: 320, margin: '0 auto',
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: '50%', border: '3px solid #e2e8f0',
        marginBottom: 16, background: 'linear-gradient(135deg, #667eea, #764ba2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: '1.5rem', fontWeight: 700,
      }}>田</div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>田中 花子</h3>
      <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: 16 }}>UI/UX デザイナー</p>
      <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, textAlign: 'center', marginBottom: 20 }}>
        ユーザー体験を大切にしたデザインを心がけています。
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
        {tags.map(function(tag) {
          return React.createElement('span', {
            key: tag,
            style: { padding: '4px 12px', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 500, backgroundColor: '#eff6ff', color: '#3b82f6' }
          }, tag);
        })}
      </div>
      <div style={{ display: 'flex', gap: 12, width: '100%' }}>
        <button style={{ flex: 1, padding: '10px 20px', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white' }}>フォロー</button>
        <button style={{ flex: 1, padding: '10px 20px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', backgroundColor: 'white', color: '#334155' }}>メッセージ</button>
      </div>
    </div>
  );
}`}
              previewHeight={400}
            />
          </section>

          {/* セクション12: ファイル構成のベストプラクティス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ファイル構成のベストプラクティス</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS Modules を使う場合、コンポーネントとスタイルを同じディレクトリに置くのが推奨されます。
            </p>

            <CodeBlock
              language="text"
              title="推奨ディレクトリ構成"
              code={`src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx          # コンポーネント
│   │   ├── Button.module.css   # スタイル
│   │   └── index.ts            # エクスポート
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.module.css
│   │   └── index.ts
│   └── Header/
│       ├── Header.tsx
│       ├── Header.module.css
│       └── index.ts
├── styles/
│   └── global.css              # リセット CSS やグローバルスタイル
└── App.tsx`}
            />

            <InfoBox type="info" title="グローバル CSS は使い分けよう">
              <p>
                リセット CSS、フォントの読み込み、CSS カスタムプロパティの定義など、
                本当にグローバルに適用したいスタイルはプレーン CSS（<code className="bg-muted px-1.5 py-0.5 rounded text-sm">global.css</code>）に書きます。
                コンポーネント固有のスタイルは CSS Modules を使いましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション13: いつどちらを使うか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">いつどちらを使うか</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">プレーン CSS を使う場面</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>CSS リセット / ノーマライズ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>フォントの読み込み（@font-face）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>CSS カスタムプロパティ（変数）の定義</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>非常に小規模なプロジェクト</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>プロトタイプ / 学習目的</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">CSS Modules を使う場面</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>コンポーネント固有のスタイリング</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>チーム開発（命名衝突を防ぎたい）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>中〜大規模プロジェクト</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>CSS を書く技術は活かしたい場合</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>ランタイムコストをゼロにしたい場合</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 理解度チェック 1 */}
          <section>
            <Quiz
              question="CSS Modules でクラス名が衝突しない理由として正しいものはどれですか？"
              options={[
                { label: 'CSS の詳細度（specificity）が自動的に上がるから' },
                { label: 'ビルド時にクラス名がハッシュ付きのユニークな名前に変換されるから', correct: true },
                { label: 'クラス名が !important 付きで出力されるから' },
                { label: 'ブラウザが Shadow DOM を使ってスコープを分離するから' },
              ]}
              explanation="CSS Modules はビルド時にファイルパスとクラス名からハッシュ値を生成し、元のクラス名をユニークな名前に変換します。これにより、異なるファイルで同じクラス名を使っても衝突しません。Shadow DOM やスタイルの詳細度は関与しません。"
            />
          </section>

          {/* 理解度チェック 2 */}
          <section>
            <Quiz
              question="CSS Modules の :global セレクタの正しい使い方はどれですか？"
              options={[
                { label: 'すべてのスタイルを :global で囲んでパフォーマンスを向上させる' },
                { label: ':global を使うとスタイルが自動的にメモ化される' },
                { label: 'サードパーティライブラリのクラス名をカスタマイズする際に、ハッシュ化を避けるために使う', correct: true },
                { label: ':global を使うとスタイルがインライン化される' },
              ]}
              explanation=":global セレクタは、CSS Modules のハッシュ化処理をスキップし、記述したクラス名をそのままグローバルに出力します。主にサードパーティライブラリが生成するクラス名（例: .react-datepicker__day）のスタイルをカスタマイズする場面で使います。"
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <CodingChallenge
              title="CSS Modules でカードコンポーネントをスタイリング"
              description=".card:hover と .tag の ___ を埋めてください。ホバーで要素を上に移動し、composes で .badge を継承します。"
              initialCode={`.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: ___(-4px); // ← ここを埋める（CSS関数名）
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.tag {
  ___: badge; // ← ここを埋める（CSS Modules の継承キーワード）
  background-color: #eff6ff;
  color: #3b82f6;
}`}
              answer={`.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.tag {
  composes: badge;
  background-color: #eff6ff;
  color: #3b82f6;
}`}
              keywords={['translateY', 'composes']}
              hints={[
                'Y軸方向に移動させる CSS 関数は translateY です',
                'CSS Modules で他クラスのスタイルを継承するキーワードは composes です',
              ]}
            />
          </section>

          {/* リファレンスリンク */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Vite 公式 - CSS Modules',
                  url: 'https://vite.dev/guide/features#css-modules',
                  description: 'Vite における CSS Modules のサポートと設定オプションの公式ドキュメント',
                },
                {
                  title: 'CSS Modules GitHub リポジトリ',
                  url: 'https://github.com/css-modules/css-modules',
                  description: 'CSS Modules の仕様と設計思想がまとめられた公式リポジトリ',
                },
                {
                  title: 'MDN - CSS の基礎',
                  url: 'https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Styling_basics',
                  description: 'CSS の基本的な概念とセレクタについての MDN リファレンス',
                },
                {
                  title: 'typed-css-modules',
                  url: 'https://github.com/Quramy/typed-css-modules',
                  description: 'CSS Modules の型定義ファイルを自動生成するツール',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'CSS Modules は SCSS / Sass と併用できますか？',
                  answer: 'はい、.module.scss という拡張子のファイルを作成すれば、CSS Modules と SCSS を組み合わせて使えます。Vite では sass パッケージをインストールするだけで対応できます（npm install -D sass）。ネストや変数など SCSS の機能をそのまま CSS Modules のスコープ内で使えます。',
                },
                {
                  question: 'CSS Modules のクラス名にハイフンが含まれる場合はどうすればいいですか？',
                  answer: 'styles["my-class"] のようにブラケット記法でアクセスします。ドット記法（styles.my-class）は JavaScript の構文エラーになるため使えません。チームで統一するなら camelCase のクラス名（.myClass）を推奨します。Vite の設定で localsConvention: "camelCaseOnly" を指定すると、CSS のケバブケースを JS 側で自動的にキャメルケースに変換できます。',
                },
                {
                  question: 'CSS Modules はランタイムコストがありますか？',
                  answer: 'いいえ、CSS Modules はビルド時にすべての変換が完了します。ランタイムでは通常の CSS と同じように動作するため、パフォーマンスへの影響はゼロです。これは styled-components や Emotion などのランタイム CSS-in-JS ライブラリとの大きな違いです。',
                },
                {
                  question: 'CSS Modules と CSS-in-JS のどちらを選ぶべきですか？',
                  answer: 'CSS の知識を直接活かしたい場合や、パフォーマンスを重視する場合は CSS Modules がおすすめです。JavaScript の力を使った動的なスタイリング（props に基づくスタイル変更、テーマの管理など）が多い場合は CSS-in-JS が便利です。次のステップで CSS-in-JS について詳しく学びます。',
                },
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <InfoBox type="success" title="まとめ">
              <p>
                プレーン CSS はグローバルなスタイルに、CSS Modules はコンポーネントのスタイルに使いましょう。
                CSS Modules は追加のライブラリが不要で、既存の CSS の知識がそのまま活かせる最もシンプルなスコープ付き CSS ソリューションです。
                次のステップでは、JavaScript でスタイルを書く CSS-in-JS というアプローチを学びます。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
