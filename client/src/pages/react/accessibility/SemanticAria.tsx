import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function SemanticAria() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 66</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">セマンティック HTML と ARIA</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Web アクセシビリティの土台となるセマンティック HTML と ARIA 属性を体系的に学びます。
          スクリーンリーダーやキーボード操作に対応した、すべてのユーザーに使いやすいインターフェースを構築しましょう。
        </p>

        <WhyNowBox tags={['セマンティック HTML', 'ARIA', 'アクセシビリティ', 'スクリーンリーダー', 'キーボード操作']}>
          <p>
            ここまでの学習で React コンポーネントの設計、スタイリング、ルーティングなど多くの技術を習得してきました。
            しかし、視覚に頼らないユーザーや、マウスを使えないユーザーにとって使いにくいアプリケーションでは不十分です。
            セマンティック HTML と ARIA を正しく使うことで、支援技術（スクリーンリーダー等）が UI の構造と意味を
            正確に伝えられるようになります。アクセシビリティは「後付け」ではなく、設計段階から組み込むべき品質です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: セマンティック HTML とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">セマンティック HTML とは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              セマンティック（意味論的）HTML とは、コンテンツの「意味」と「構造」を正しく伝える HTML 要素を使うことです。
              見た目は CSS で制御できますが、構造の意味はブラウザ、スクリーンリーダー、検索エンジンが
              HTML 要素のタグ名から判断します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">なぜ div と span だけではダメなのか</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{'<div>'}</code> と
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{'<span>'}</code> は
              汎用コンテナであり、それ自体に意味を持ちません。
              スクリーンリーダーはこれらの要素を「グループ」や「テキスト」としか認識できず、
              ナビゲーションなのか、メインコンテンツなのか、補足情報なのかを伝えられません。
            </p>

            <CodeBlock
              language="html"
              title="悪い例: div だけで構築されたページ"
              code={`<!-- スクリーンリーダーにとって、すべてが「グループ」にしか見えない -->
<div class="header">
  <div class="logo">サイト名</div>
  <div class="nav">
    <div class="nav-item"><a href="/">ホーム</a></div>
    <div class="nav-item"><a href="/about">概要</a></div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title">記事タイトル</div>
    <div class="content">記事の本文...</div>
  </div>
  <div class="sidebar">関連記事...</div>
</div>
<div class="footer">コピーライト</div>`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="html"
              title="良い例: セマンティック HTML で構築されたページ"
              code={`<!-- スクリーンリーダーがページ構造を正確に把握できる -->
<header>
  <h1>サイト名</h1>
  <nav aria-label="メインナビゲーション">
    <ul>
      <li><a href="/">ホーム</a></li>
      <li><a href="/about">概要</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h2>記事タイトル</h2>
    <p>記事の本文...</p>
  </article>
  <aside aria-label="関連記事">関連記事...</aside>
</main>
<footer>コピーライト</footer>`}
            />

            <InfoBox type="info" title="セマンティック HTML の恩恵">
              <ul className="list-disc pl-4 space-y-1">
                <li>スクリーンリーダーがランドマークジャンプでページを素早く移動できる</li>
                <li>検索エンジンがコンテンツの構造を正しく理解し SEO が向上する</li>
                <li>コードの可読性が上がり、開発者間での意思疎通がスムーズになる</li>
                <li>ブラウザのリーダーモードがコンテンツを正しく抽出できる</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション2: ランドマーク要素 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ランドマーク要素の正しい使い方</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ランドマーク要素は、ページの大まかな構造を定義する HTML5 要素です。
              スクリーンリーダーのユーザーはランドマーク間をジャンプして目的のセクションに素早くたどり着けます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">要素</th>
                    <th className="text-left p-3 font-semibold text-foreground">暗黙の ARIA ロール</th>
                    <th className="text-left p-3 font-semibold text-foreground">用途</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">{'<header>'}</code></td>
                    <td className="p-3">banner</td>
                    <td className="p-3">ページまたはセクションのヘッダー。サイトロゴ、グローバルナビゲーション等</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">{'<nav>'}</code></td>
                    <td className="p-3">navigation</td>
                    <td className="p-3">ナビゲーションリンクのグループ。メニュー、パンくずリスト等</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">{'<main>'}</code></td>
                    <td className="p-3">main</td>
                    <td className="p-3">ページ固有の主要コンテンツ。ページに1つだけ配置する</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">{'<aside>'}</code></td>
                    <td className="p-3">complementary</td>
                    <td className="p-3">主要コンテンツの補足情報。サイドバー、関連リンク等</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">{'<footer>'}</code></td>
                    <td className="p-3">contentinfo</td>
                    <td className="p-3">ページまたはセクションのフッター。コピーライト、連絡先等</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">{'<section>'}</code></td>
                    <td className="p-3">region（見出し付き）</td>
                    <td className="p-3">テーマ別のコンテンツグループ。必ず見出しを伴うこと</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">{'<article>'}</code></td>
                    <td className="p-3">article</td>
                    <td className="p-3">自己完結した独立コンテンツ。ブログ記事、ニュース、コメント等</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodePreview
              code={`function LandmarkDemo() {
  return (
    <div style={{ fontFamily: 'system-ui', fontSize: '13px', color: 'var(--text)' }}>
      <header style={{ background: 'var(--bg-accent)', padding: '12px 16px', borderRadius: '8px 8px 0 0' }}>
        <strong>header</strong> - サイトのヘッダー
      </header>
      <nav style={{ background: 'var(--bg-muted)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <strong>nav</strong> - ナビゲーション
      </nav>
      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1, padding: '16px', background: 'var(--bg)', minHeight: '80px' }}>
          <strong>main</strong> - メインコンテンツ
        </main>
        <aside style={{ width: '120px', padding: '16px', background: 'var(--bg-muted)' }}>
          <strong>aside</strong> - サイドバー
        </aside>
      </div>
      <footer style={{ background: 'var(--bg-accent)', padding: '12px 16px', borderRadius: '0 0 8px 8px' }}>
        <strong>footer</strong> - フッター
      </footer>
    </div>
  );
}`}
              language="tsx"
              title="ランドマーク要素のレイアウト"
            />

            <InfoBox type="warning" title="ランドマーク要素の注意点">
              <ul className="list-disc pl-4 space-y-1">
                <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">{'<main>'}</code> はページに1つだけ。複数配置するとスクリーンリーダーが混乱する</li>
                <li>同じ種類のランドマークが複数ある場合（nav が2つ等）は <code className="bg-muted px-1.5 py-0.5 rounded text-sm">aria-label</code> で区別する</li>
                <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">{'<section>'}</code> は見出し（h2-h6）なしで使うとランドマークとして認識されない</li>
                <li>ランドマーク要素を過剰にネストしない。ページの大枠の構造を示すために使う</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション3: 見出しレベルの設計 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">見出しレベルの設計</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              見出し要素（h1-h6）はページの文書構造を定義する最も重要なセマンティック要素です。
              スクリーンリーダーのユーザーは見出し一覧を表示し、目的のセクションにジャンプします。
              見出しレベルがスキップされると、文書構造が壊れ、ナビゲーションが困難になります。
            </p>

            <CodeBlock
              language="html"
              title="悪い例: 見出しレベルのスキップ"
              code={`<!-- h2 を飛ばして h3 に行っている。構造が不明瞭 -->
<h1>ショッピングサイト</h1>
<h3>新着商品</h3>       <!-- h2 がない！ -->
<h5>おすすめ商品</h5>   <!-- h4 がない！ -->

<!-- 見た目のサイズで見出しレベルを選んではいけない -->
<!-- 小さい文字にしたいからといって h4 や h5 を使うのは間違い -->
<!-- サイズは CSS で制御する -->`}
            />

            <div className="mt-4" />

            <CodePreview
              code={`function HeadingHierarchy() {
  const level = (n, label, indent) => (
    <div style={{
      marginLeft: indent * 20,
      padding: '6px 12px',
      marginBottom: '4px',
      borderLeft: '3px solid ' + ['', 'var(--accent)', '#6366f1', '#8b5cf6', '#a78bfa'][n],
      background: n === 1 ? 'var(--bg-accent)' : 'var(--bg-muted)',
      borderRadius: '0 6px 6px 0',
      fontFamily: 'system-ui',
      fontSize: n === 1 ? '16px' : n === 2 ? '14px' : n === 3 ? '13px' : '12px',
      fontWeight: n <= 2 ? 'bold' : '600',
      color: 'var(--text)',
    }}>
      <span style={{ opacity: 0.5, fontSize: '11px', marginRight: '8px' }}>h{n}</span>
      {label}
    </div>
  );

  return (
    <div style={{ fontFamily: 'system-ui', color: 'var(--text)' }}>
      {level(1, 'ショッピングサイト', 0)}
      {level(2, '新着商品', 1)}
      {level(3, 'エレクトロニクス', 2)}
      {level(3, 'ファッション', 2)}
      {level(2, 'おすすめ商品', 1)}
      {level(3, '今週のピックアップ', 2)}
      {level(3, 'ランキング', 2)}
      {level(4, '総合ランキング', 3)}
      {level(4, 'カテゴリ別', 3)}
    </div>
  );
}`}
              language="tsx"
              title="見出しの階層構造ビジュアライゼーション"
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="React コンポーネントでの見出しレベル管理"
              code={`// 見出しレベルを Props で受け取ることで、再利用性を確保する
interface SectionProps {
  title: string;
  headingLevel?: 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
}

function Section({ title, headingLevel = 'h2', children }: SectionProps) {
  // 動的にタグを変更
  const Heading = headingLevel;

  return (
    <section aria-labelledby={title.replace(/\\s/g, '-')}>
      <Heading id={title.replace(/\\s/g, '-')}>{title}</Heading>
      {children}
    </section>
  );
}

// 使用例: コンテキストに応じて見出しレベルを指定
function ProductPage() {
  return (
    <main>
      <h1>商品詳細</h1>
      <Section title="商品説明" headingLevel="h2">
        <p>この商品は...</p>
        <Section title="スペック" headingLevel="h3">
          <p>サイズ: ...</p>
        </Section>
      </Section>
      <Section title="レビュー" headingLevel="h2">
        <p>ユーザーレビュー一覧</p>
      </Section>
    </main>
  );
}`}
            />
          </section>

          {/* セクション4: ARIA の基本原則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ARIA の基本原則</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              WAI-ARIA（Web Accessibility Initiative - Accessible Rich Internet Applications）は、
              HTML だけでは伝えきれないインタラクティブな UI の意味と状態を補足するための仕様です。
              ただし、最も重要な原則は「ARIA を使わないのが最良の ARIA」であるということです。
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
                <h3 className="font-bold text-foreground mb-2">ARIA の5つのルール</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                  <li>ネイティブ HTML 要素で代替できるなら、ARIA を使わない</li>
                  <li>ネイティブ HTML のセマンティクスを ARIA で上書きしない</li>
                  <li>すべてのインタラクティブ要素はキーボードで操作可能にする</li>
                  <li>フォーカス可能な要素に <code className="bg-muted px-1.5 py-0.5 rounded">role="presentation"</code> や <code className="bg-muted px-1.5 py-0.5 rounded">aria-hidden="true"</code> を使わない</li>
                  <li>すべてのインタラクティブ要素にはアクセシブルな名前を付ける</li>
                </ol>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="悪い例: ARIA で本来不要な役割を付与"
              code={`// 悪い例: div に role="button" を付けるより、button を使う
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  }}
>
  送信
</div>

// 良い例: ネイティブの button を使えば ARIA もキーボード対応も不要
<button onClick={handleClick}>
  送信
</button>`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="悪い例: セマンティクスの上書き"
              code={`// 悪い例: h2 の見出しロールを上書きしている
<h2 role="button">クリックして展開</h2>

// 良い例: 見出しの中にボタンを配置する
<h2>
  <button
    aria-expanded={isExpanded}
    onClick={() => setIsExpanded(!isExpanded)}
  >
    クリックして展開
  </button>
</h2>`}
            />

            <InfoBox type="info" title="ARIA を使うべき場面">
              <p>
                ARIA はネイティブ HTML では表現できない「動的な状態」や「カスタムウィジェット」のために存在します。
                例えば、アコーディオンの開閉状態、タブパネルの選択状態、モーダルダイアログの存在、
                ライブリージョンによる動的な通知などです。これらはネイティブ HTML だけでは伝えられません。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: 必須 ARIA 属性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">必須 ARIA 属性</h2>

            {/* aria-label / aria-labelledby / aria-describedby */}
            <h3 className="text-lg font-semibold text-foreground mb-3">
              aria-label / aria-labelledby / aria-describedby の使い分け
            </h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              これら3つの属性は要素に「名前」や「説明」を付与しますが、使い分けが重要です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">属性</th>
                    <th className="text-left p-3 font-semibold text-foreground">用途</th>
                    <th className="text-left p-3 font-semibold text-foreground">優先度</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">aria-label</code></td>
                    <td className="p-3">画面上にテキストがない場合に、要素の名前を直接指定</td>
                    <td className="p-3">テキストが画面上にない場合に使う</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">aria-labelledby</code></td>
                    <td className="p-3">画面上の別の要素のテキストを名前として参照</td>
                    <td className="p-3">画面上に既にテキストがある場合はこちらを優先</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">aria-describedby</code></td>
                    <td className="p-3">補足説明を関連付ける（名前ではなく説明）</td>
                    <td className="p-3">追加の説明が必要な場合に使う</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="tsx"
              title="3つの属性の使い分け"
              code={`// aria-label: アイコンボタンなど、テキストが画面にない場合
<button aria-label="メニューを開く" onClick={toggleMenu}>
  <MenuIcon />
</button>

// aria-labelledby: 画面上のテキストで要素の名前を指定
<h2 id="cart-heading">ショッピングカート</h2>
<section aria-labelledby="cart-heading">
  {/* この section は「ショッピングカート」という名前を持つ */}
  <ul>...</ul>
</section>

// aria-describedby: 補足説明を関連付ける
<label htmlFor="password">パスワード</label>
<input
  id="password"
  type="password"
  aria-describedby="password-help"
/>
<p id="password-help">
  8文字以上、大文字・小文字・数字を含めてください
</p>
{/* スクリーンリーダーは「パスワード、テキスト入力、8文字以上...」と読み上げる */}`}
            />

            {/* aria-hidden */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">aria-hidden（装飾要素の非表示）</h3>

            <CodeBlock
              language="tsx"
              title="aria-hidden の正しい使い方"
              code={`// 装飾用アイコンはスクリーンリーダーから隠す
<button>
  <TrashIcon aria-hidden="true" />
  削除する
</button>
{/* 「削除する」だけが読み上げられる（アイコンは冗長な情報） */}

// 悪い例: テキストなしのアイコンボタンで aria-hidden を使う
<button>
  <TrashIcon aria-hidden="true" />
</button>
{/* ボタンに名前がない！スクリーンリーダーは「ボタン」としか読み上げない */}

// 正しい方法: aria-label を併用する
<button aria-label="削除する">
  <TrashIcon aria-hidden="true" />
</button>`}
            />

            {/* aria-expanded / aria-controls */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">aria-expanded / aria-controls（開閉 UI）</h3>

            <CodeBlock
              language="tsx"
              title="アコーディオンの実装"
              code={`function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = useId();

  return (
    <div>
      <h3>
        <button
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-4 text-left"
        >
          {title}
          <ChevronIcon
            aria-hidden="true"
            className={isExpanded ? 'rotate-180' : ''}
          />
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={/* ボタンの id */}
        hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
}

// aria-expanded: ボタンが制御する領域の開閉状態を伝える
// aria-controls: どの要素を制御しているかを ID で紐付ける
// hidden: 閉じているときは DOM からも非表示にする`}
            />

            {/* aria-live */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">aria-live / aria-atomic（動的コンテンツ通知）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              SPA では画面遷移やデータ更新が JavaScript で動的に行われます。
              スクリーンリーダーはページのリロードなしに変化を検知できないため、
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">aria-live</code> で変更を通知する必要があります。
            </p>

            <CodeBlock
              language="tsx"
              title="aria-live の使い分け"
              code={`// polite: 現在の読み上げが終わってから通知（多くの場面で適切）
<div aria-live="polite" aria-atomic="true">
  {statusMessage && <p>{statusMessage}</p>}
</div>

// assertive: 即座に割り込んで通知（エラーや緊急情報のみ）
<div aria-live="assertive" aria-atomic="true">
  {errorMessage && <p role="alert">{errorMessage}</p>}
</div>

// 実装例: 検索結果の件数を通知
function SearchResults({ results }: { results: Item[] }) {
  return (
    <div>
      {/* 検索結果が変わるたびに件数を読み上げる */}
      <p aria-live="polite" aria-atomic="true">
        {results.length}件の結果が見つかりました
      </p>
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// aria-atomic="true": 一部が変わっても領域全体を読み上げる
// aria-atomic="false": 変更された部分だけを読み上げる`}
            />

            {/* aria-current */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">aria-current（現在のナビゲーション）</h3>

            <CodePreview
              code={`function NavigationDemo() {
  const links = [
    { href: '/', label: 'ホーム', current: false },
    { href: '/products', label: '商品', current: true },
    { href: '/about', label: '会社概要', current: false },
  ];

  return (
    <nav aria-label="メインナビゲーション" style={{ fontFamily: 'system-ui', fontSize: '13px' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '4px' }}>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href="#"
              aria-current={link.current ? 'page' : undefined}
              onClick={(e) => e.preventDefault()}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: link.current ? 'bold' : 'normal',
                background: link.current ? 'var(--accent)' : 'transparent',
                color: link.current ? '#fff' : 'var(--text)',
                border: link.current ? 'none' : '1px solid var(--border)',
                fontSize: '13px',
              }}
            >
              {link.label}
              {link.current && (
                <span style={{
                  display: 'block',
                  fontSize: '10px',
                  opacity: 0.8,
                  fontWeight: 'normal',
                  marginTop: '2px',
                }}>
                  aria-current="page"
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        スクリーンリーダーは「商品、リンク、現在のページ」と読み上げます
      </p>
    </nav>
  );
}`}
              language="tsx"
              title="aria-current によるナビゲーション現在位置"
            />

            {/* role 属性 */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">role 属性の正しい使い方</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">role</code> 属性は
              要素の役割をブラウザに伝えますが、カスタムウィジェットの場合にのみ使うべきです。
              ネイティブ HTML 要素に冗長な role を付ける必要はありません。
            </p>

            <CodeBlock
              language="tsx"
              title="role 属性の適切な使用例"
              code={`// 不要な例: ネイティブ要素には暗黙の role がある
<nav role="navigation">...</nav>        {/* nav は既に navigation */}
<button role="button">送信</button>     {/* button は既に button */}

// 適切な例: カスタムウィジェットに role を付ける
// タブインターフェース
<div role="tablist" aria-label="設定タブ">
  <button role="tab" aria-selected={activeTab === 0} aria-controls="panel-0">
    一般
  </button>
  <button role="tab" aria-selected={activeTab === 1} aria-controls="panel-1">
    通知
  </button>
</div>
<div role="tabpanel" id="panel-0" aria-labelledby="tab-0">
  一般設定の内容...
</div>

// ダイアログ
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">確認</h2>
  <p>この操作は取り消せません。続行しますか？</p>
  <button>キャンセル</button>
  <button>続行</button>
</div>

// alert: 緊急の通知
<div role="alert">
  セッションが切れました。再ログインしてください。
</div>`}
            />
          </section>

          {/* セクション6: フォーカス管理 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォーカス管理</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">tabindex の使い分け</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">tabindex</code> 属性は
              要素のフォーカス可能性と Tab キーでの移動順序を制御します。
              値によって動作が大きく異なるため、正しい使い分けが重要です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">値</th>
                    <th className="text-left p-3 font-semibold text-foreground">動作</th>
                    <th className="text-left p-3 font-semibold text-foreground">使用場面</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">tabindex="0"</code></td>
                    <td className="p-3">Tab キーで到達可能。DOM 順序でフォーカスが移動</td>
                    <td className="p-3">通常フォーカス不可の要素をフォーカス可能にする場合</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">tabindex="-1"</code></td>
                    <td className="p-3">Tab キーでは到達不可。JavaScript の focus() で制御可能</td>
                    <td className="p-3">プログラム的にフォーカスを移す必要がある要素（モーダル、エラー表示等）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><code className="bg-muted px-1.5 py-0.5 rounded">tabindex="1+"</code></td>
                    <td className="p-3">指定した数値の順番でフォーカスが移動</td>
                    <td className="p-3 font-semibold text-red-600 dark:text-red-400">使用禁止。DOM の自然な順序が壊れ、混乱を招く</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="tsx"
              title="tabindex の実用例"
              code={`// tabindex="0": カスタムコンポーネントをフォーカス可能にする
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  カスタムボタン
</div>
{/* ただし、可能な限り <button> を使うべき */}

// tabindex="-1": モーダルを開いたときにフォーカスを移す
function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}  // focus() で移動可能だが Tab では到達しない
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose}>閉じる</button>
    </div>
  );
}`}
            />

            {/* フォーカストラップ */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">フォーカストラップの実装</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              モーダルダイアログを開いているとき、Tab キーによるフォーカスがモーダル内に閉じ込められる必要があります。
              モーダルの外にフォーカスが移動すると、背景要素と意図せず操作してしまう危険があります。
            </p>

            <CodeBlock
              language="tsx"
              title="フォーカストラップの実装例"
              code={`function useFocusTrap(ref: RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), ' +
      'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      const focusableElements = element.querySelectorAll<HTMLElement>(focusableSelector);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift+Tab で最初の要素から逆方向 → 最後の要素に移動
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab で最後の要素から順方向 → 最初の要素に移動
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [ref, isActive]);
}

// 使用例
function Dialog({ isOpen, onClose, children }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen);

  // Escape キーで閉じる
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" tabIndex={-1}>
      {children}
    </div>
  );
}`}
            />

            {/* Skip Navigation */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Skip Navigation リンク</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ページの先頭にナビゲーションが長く続く場合、キーボードユーザーは毎回すべてのリンクを
              Tab で通過しなければなりません。Skip Navigation リンクを設置すると、
              メインコンテンツに直接ジャンプできます。
            </p>

            <CodeBlock
              language="tsx"
              title="Skip Navigation の実装"
              code={`function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 通常は画面外に隠し、フォーカス時に表示する */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                   focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white
                   focus:rounded-lg focus:outline-none"
      >
        メインコンテンツへスキップ
      </a>

      <header>
        <nav aria-label="メインナビゲーション">
          {/* 長いナビゲーションリンク群 */}
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}

/* Tailwind の sr-only クラス:
   position: absolute; width: 1px; height: 1px;
   overflow: hidden; clip: rect(0, 0, 0, 0);

   focus:not-sr-only: フォーカス時にこれらを解除して表示する */`}
            />
          </section>

          {/* セクション7: 画像の代替テキスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">画像の代替テキスト</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">alt</code> 属性は
              画像が表示されない環境や、スクリーンリーダーで利用するユーザーに画像の内容を伝えます。
              すべての <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{'<img>'}</code> タグには必ず alt 属性を設定してください。
            </p>

            <CodeBlock
              language="tsx"
              title="alt 属性の書き方ガイドライン"
              code={`// 1. 意味のある画像: 内容を簡潔に説明する
<img src="/team-photo.jpg" alt="2025年度の開発チーム全員集合写真。10名のメンバーが笑顔で写っている" />

// 2. 機能を持つ画像（リンクやボタンの中）: 機能を説明する
<a href="/home">
  <img src="/logo.svg" alt="ホームに戻る" />
</a>

// 3. テキストを含む画像: テキスト内容をそのまま書く
<img src="/sale-banner.jpg" alt="春の大セール 全品30%オフ 3月31日まで" />

// 4. 装飾画像: alt="" で空にする（スクリーンリーダーが無視する）
<img src="/decorative-line.svg" alt="" />
<img src="/background-pattern.png" alt="" role="presentation" />

// 5. 複雑な画像（グラフ等）: 簡潔な alt + 詳細説明を別途提供
<figure>
  <img
    src="/sales-chart.png"
    alt="2025年度の月別売上推移グラフ"
    aria-describedby="chart-description"
  />
  <figcaption id="chart-description">
    1月から3月は横ばい（約500万円）、4月から急増し
    8月にピーク（1200万円）を記録。その後は緩やかに減少。
  </figcaption>
</figure>

// 避けるべきパターン
<img src="/photo.jpg" alt="画像" />          {/* 情報がない */}
<img src="/photo.jpg" alt="IMG_20250101.jpg" /> {/* ファイル名は意味がない */}
<img src="/icon.svg" alt="アイコン画像" />    {/* 「画像」は冗長 */}`}
            />
          </section>

          {/* セクション8: 色に依存しない情報伝達 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">色だけに依存しない情報伝達</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              日本人男性の約5%、女性の約0.2%が色覚特性を持つとされています。
              色だけで情報を伝えると、一部のユーザーが情報を受け取れません。
              色に加えて、テキスト、アイコン、パターンなど別の視覚的手がかりを併用しましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="悪い例と良い例: フォームバリデーション"
              code={`// 悪い例: 赤色だけでエラーを示している
<input
  style={{ borderColor: hasError ? 'red' : 'gray' }}
/>
{/* 色覚特性のあるユーザーには赤とグレーの区別がつかない */}

// 良い例: 色 + アイコン + テキストで伝える
<div>
  <div className="flex items-center gap-2">
    <input
      className={hasError
        ? 'border-red-500 border-2'
        : 'border-gray-300 border'}
      aria-invalid={hasError}
      aria-describedby={hasError ? 'email-error' : undefined}
    />
    {hasError && (
      <ExclamationIcon aria-hidden="true" className="text-red-500" />
    )}
  </div>
  {hasError && (
    <p id="email-error" className="text-red-500 text-sm mt-1">
      {/* テキストでもエラー内容を伝える */}
      有効なメールアドレスを入力してください
    </p>
  )}
</div>`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="良い例: ステータスバッジ"
              code={`// 悪い例: 色だけでステータスを区別
<span className={status === 'active' ? 'bg-green-500' : 'bg-red-500'} />

// 良い例: 色 + テキスト + アイコンの組み合わせ
function StatusBadge({ status }: { status: 'active' | 'inactive' | 'pending' }) {
  const config = {
    active: {
      className: 'bg-green-100 text-green-800 border-green-300',
      label: '有効',
      icon: <CheckCircleIcon aria-hidden="true" />,
    },
    inactive: {
      className: 'bg-red-100 text-red-800 border-red-300',
      label: '無効',
      icon: <XCircleIcon aria-hidden="true" />,
    },
    pending: {
      className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      label: '保留中',
      icon: <ClockIcon aria-hidden="true" />,
    },
  };

  const { className, label, icon } = config[status];

  return (
    <span className={\`inline-flex items-center gap-1 px-2 py-1 rounded border \${className}\`}>
      {icon}
      {label}
    </span>
  );
}`}
            />
          </section>

          {/* セクション9: キーボード操作 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">キーボード操作パターン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              インタラクティブなカスタムウィジェットは、WAI-ARIA Authoring Practices に定義された
              キーボード操作パターンに従う必要があります。
              ユーザーが直感的に操作できるよう、一般的なキーの役割を理解しましょう。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">キー</th>
                    <th className="text-left p-3 font-semibold text-foreground">一般的な動作</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-3"><kbd className="bg-muted px-2 py-0.5 rounded border text-xs">Tab</kbd></td>
                    <td className="p-3">次のフォーカス可能な要素に移動</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><kbd className="bg-muted px-2 py-0.5 rounded border text-xs">Shift + Tab</kbd></td>
                    <td className="p-3">前のフォーカス可能な要素に移動</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><kbd className="bg-muted px-2 py-0.5 rounded border text-xs">Enter</kbd></td>
                    <td className="p-3">ボタンの実行、リンクの遷移、フォームの送信</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><kbd className="bg-muted px-2 py-0.5 rounded border text-xs">Space</kbd></td>
                    <td className="p-3">ボタンの実行、チェックボックスの切替、ドロップダウンの開閉</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><kbd className="bg-muted px-2 py-0.5 rounded border text-xs">Escape</kbd></td>
                    <td className="p-3">モーダルを閉じる、ドロップダウンを閉じる、操作のキャンセル</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><kbd className="bg-muted px-2 py-0.5 rounded border text-xs">Arrow Keys</kbd></td>
                    <td className="p-3">タブ間の移動、メニュー項目間の移動、スライダーの値の変更</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3"><kbd className="bg-muted px-2 py-0.5 rounded border text-xs">Home / End</kbd></td>
                    <td className="p-3">リストの先頭 / 末尾に移動</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodePreview
              code={`function AccordionDemo() {
  const [open, setOpen] = React.useState({});
  const toggle = (id) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  const faqs = [
    { id: 'q1', q: 'アクセシビリティとは？', a: 'すべてのユーザーが Web コンテンツを利用できるようにすること。視覚、聴覚、身体、認知の障害を持つ方を含みます。' },
    { id: 'q2', q: 'ARIA 属性はいつ使う？', a: 'ネイティブ HTML だけでは表現できないカスタムウィジェットの状態や関係性を補足するときに使います。' },
    { id: 'q3', q: 'キーボード操作のテスト方法は？', a: 'Tab キーですべてのインタラクティブ要素に到達でき、Enter/Space で操作、Escape で閉じられるか確認します。' },
  ];

  return (
    <div style={{ fontFamily: 'system-ui', fontSize: '13px', color: 'var(--text)' }}>
      {faqs.map((faq) => (
        <div key={faq.id} style={{ borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ margin: 0 }}>
            <button
              aria-expanded={!!open[faq.id]}
              aria-controls={'panel-' + faq.id}
              onClick={() => toggle(faq.id)}
              style={{
                all: 'unset',
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
                color: 'var(--text)',
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {faq.q}
              <span style={{
                transition: 'transform 0.2s',
                transform: open[faq.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                fontSize: '16px',
              }}>
                ▼
              </span>
            </button>
          </h3>
          {open[faq.id] && (
            <div
              id={'panel-' + faq.id}
              role="region"
              style={{ padding: '8px 16px 16px', color: 'var(--text-muted)', lineHeight: 1.6 }}
            >
              {faq.a}
            </div>
          )}
        </div>
      ))}
      <p style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)', padding: '0 16px' }}>
        Tab / Enter / Space でキーボード操作できます
      </p>
    </div>
  );
}`}
              language="tsx"
              title="キーボード対応アコーディオン"
            />

            <InfoBox type="info" title="roving tabindex パターン">
              <p>
                上のドロップダウンでは「roving tabindex」パターンを使用しています。
                グループ内で1つの要素だけが <code className="bg-muted px-1.5 py-0.5 rounded text-sm">tabIndex={'{0}'}</code> を持ち、
                他の要素は <code className="bg-muted px-1.5 py-0.5 rounded text-sm">tabIndex={'{-1}'}</code> にします。
                Tab キーでグループに入り、矢印キーでグループ内を移動し、Tab キーでグループから抜ける動作を実現します。
                タブリスト、メニュー、ラジオグループなど多くのウィジェットでこのパターンが使われます。
              </p>
            </InfoBox>
          </section>

          {/* セクション10: スクリーンリーダーのテスト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スクリーンリーダーのテスト方法</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              アクセシビリティの品質を確保するためには、実際にスクリーンリーダーでテストすることが重要です。
              自動テストツールだけでは検出できない問題（読み上げ順序の不自然さ、冗長な情報など）は
              手動でしか確認できません。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">macOS: VoiceOver</h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                  <li><kbd className="bg-muted px-1.5 py-0.5 rounded border text-xs">Cmd + F5</kbd> で起動 / 終了</li>
                  <li><kbd className="bg-muted px-1.5 py-0.5 rounded border text-xs">VO + Right Arrow</kbd> で次の要素へ</li>
                  <li><kbd className="bg-muted px-1.5 py-0.5 rounded border text-xs">VO + U</kbd> でローター（ランドマーク、見出し、リンク一覧）を表示</li>
                  <li>VO キーは <kbd className="bg-muted px-1.5 py-0.5 rounded border text-xs">Ctrl + Option</kbd></li>
                  <li>Safari との組み合わせが推奨される</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Windows: NVDA</h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                  <li>無料のオープンソーススクリーンリーダー</li>
                  <li><kbd className="bg-muted px-1.5 py-0.5 rounded border text-xs">Insert + F7</kbd> で要素リストを表示</li>
                  <li><kbd className="bg-muted px-1.5 py-0.5 rounded border text-xs">H</kbd> で次の見出しへジャンプ</li>
                  <li><kbd className="bg-muted px-1.5 py-0.5 rounded border text-xs">D</kbd> で次のランドマークへジャンプ</li>
                  <li>Firefox / Chrome との組み合わせが推奨される</li>
                </ul>
              </div>
            </div>

            <CodeBlock
              language="text"
              title="スクリーンリーダーでのテストチェックリスト"
              code={`[ ] ページタイトルが正しく読み上げられるか
[ ] 見出し一覧で論理的な構造が確認できるか（見出しジャンプ）
[ ] ランドマーク一覧でページ構造を把握できるか
[ ] すべてのインタラクティブ要素がキーボードで操作できるか
[ ] フォームのラベルが正しく関連付けられているか
[ ] 画像に適切な代替テキストがあるか
[ ] モーダルを開いたときにフォーカスが移動するか
[ ] モーダル内にフォーカスが閉じ込められるか
[ ] モーダルを閉じたときにフォーカスが元の位置に戻るか
[ ] 動的に更新されるコンテンツが読み上げられるか（aria-live）
[ ] エラーメッセージが即座に通知されるか
[ ] ナビゲーションの現在位置が分かるか（aria-current）`}
            />

            <InfoBox type="success" title="自動テストツールとの組み合わせ">
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>axe-core / @axe-core/react</strong>: 開発中にコンソールでアクセシビリティ違反を検出</li>
                <li><strong>eslint-plugin-jsx-a11y</strong>: JSX 記述時にリアルタイムで問題を警告</li>
                <li><strong>Lighthouse</strong>: Chrome DevTools でアクセシビリティスコアを測定</li>
                <li><strong>Storybook addon-a11y</strong>: Story ごとにアクセシビリティチェックを実行</li>
                <li>自動ツールで検出できるのは全体の約30%。残りは手動テストが必要</li>
              </ul>
            </InfoBox>
          </section>

          {/* 理解度チェック 1 */}
          <section>
            <Quiz
              question="aria-label と aria-labelledby の使い分けとして正しいものはどれですか？"
              options={[
                { label: 'aria-label は見出し要素にのみ使い、aria-labelledby はすべての要素に使える' },
                { label: 'aria-labelledby は画面上に既にテキストがある場合にその要素を参照し、aria-label は画面上にテキストがない場合に直接名前を指定する', correct: true },
                { label: 'aria-label はフォーム要素専用で、aria-labelledby はランドマーク要素専用' },
                { label: '両者に違いはなく、どちらを使っても同じ結果になる' },
              ]}
              explanation="aria-labelledby は画面上に表示されている別の要素のテキストを参照して名前を付けます。aria-label は画面上にテキストが存在しない場合（アイコンボタンなど）に直接文字列で名前を指定します。画面上にテキストがある場合は aria-labelledby を優先して使うことで、画面表示と支援技術への情報が一致します。"
            />
          </section>

          {/* 理解度チェック 2 */}
          <section>
            <Quiz
              question="tabindex 属性に正の値（tabindex='5' など）を設定することが推奨されない理由はどれですか？"
              options={[
                { label: 'ブラウザのパフォーマンスが低下するから' },
                { label: 'HTML の仕様で正の値は非推奨と定められているから' },
                { label: 'DOM の自然な順序とは異なるフォーカス順序になり、ユーザーの操作が混乱するから', correct: true },
                { label: 'スクリーンリーダーが正の値の tabindex を無視するから' },
              ]}
              explanation="tabindex に正の値を設定すると、その要素がすべての tabindex='0' の要素よりも先にフォーカスを受けます。複数の要素に異なる正の値を設定すると、画面上の視覚的な順序と Tab キーでのフォーカス順序が一致しなくなり、特にキーボードユーザーにとって操作が予測不能になります。DOM の自然な順序（ソースコード順）でフォーカスが移動するのが最も直感的です。"
            />
          </section>

          {/* 理解度チェック 3 */}
          <section>
            <Quiz
              question="'ARIA を使わないのが最良の ARIA' とはどういう意味ですか？"
              options={[
                { label: 'ARIA はバグが多いため、使用を完全に避けるべきだという意味' },
                { label: 'ネイティブ HTML 要素が適切なセマンティクスを持つ場合はそれを使い、ARIA は HTML だけでは表現できない場合にのみ使うべきだという意味', correct: true },
                { label: 'ARIA は古い技術であり、現代のブラウザでは不要になったという意味' },
                { label: 'ARIA よりも CSS でアクセシビリティを制御すべきだという意味' },
              ]}
              explanation="ネイティブ HTML 要素（button, nav, main, input 等）は最初から適切なロール、キーボード操作、スクリーンリーダー対応を備えています。ARIA は HTML だけではカバーできないカスタムウィジェット（タブ、アコーディオン、ツリービュー等）の状態や関係性を補足するための仕様です。ARIA を不適切に使うと、かえってアクセシビリティを悪化させる可能性があるため、まずネイティブ HTML で解決できるか検討しましょう。"
            />
          </section>

          {/* コーディングチャレンジ 1 */}
          <section>
            <CodingChallenge
              title="アクセシブルなナビゲーションを作成"
              description="ナビゲーションの ___ を埋めてください。セマンティックな要素と ARIA 属性で、スクリーンリーダーに情報を伝えます。"
              preview={true}
              initialCode={`function App() {
  return (
    <nav aria-label="メインナビゲーション">
      <ul>
        <li><a href="/">ホーム</a></li>
        <li><a href="/products" ___="page">商品一覧</a></li>
        <li><a href="/about">会社概要</a></li>
        <li><a href="/contact">お問い合わせ</a></li>
      </ul>
    </nav>
  );
}`}
              answer={`function App() {
  return (
    <nav aria-label="メインナビゲーション">
      <ul>
        <li><a href="/">ホーム</a></li>
        <li><a href="/products" aria-current="page">商品一覧</a></li>
        <li><a href="/about">会社概要</a></li>
        <li><a href="/contact">お問い合わせ</a></li>
      </ul>
    </nav>
  );
}`}
              keywords={['<nav', 'aria-current']}
              hints={[
                'ナビゲーションを表すセマンティック要素は nav です',
                '現在のページを示す ARIA 属性は aria-current です',
              ]}
            />
          </section>

          {/* コーディングチャレンジ 2 */}
          <section>
            <CodingChallenge
              title="アクセシブルなアコーディオンボタンを実装"
              description={'ボタンの ___ を埋めてください。ARIA 属性で開閉状態と制御対象のパネルを伝えます。閉じている状態です。'}
              preview={true}
              initialCode={`function App() {
  return (
    <div>
      <h3>
        <button
          ___="false"
          ___="faq-panel-1"
          onClick={toggle}
        >
          よくある質問
        </button>
      </h3>
      <div id="faq-panel-1" role="region" hidden>
        <p>回答の内容がここに表示されます...</p>
      </div>
    </div>
  );
}`}
              answer={`function App() {
  return (
    <div>
      <h3>
        <button
          aria-expanded="false"
          aria-controls="faq-panel-1"
          onClick={toggle}
        >
          よくある質問
        </button>
      </h3>
      <div id="faq-panel-1" role="region" aria-labelledby="faq-button-1" hidden>
        <p>回答の内容がここに表示されます...</p>
      </div>
    </div>
  );
}`}
              keywords={['aria-expanded', 'aria-controls']}
              hints={[
                '開閉状態を伝える ARIA 属性は aria-expanded です',
                'ボタンが制御する要素の id を指定する属性は aria-controls です',
              ]}
            />
          </section>

          {/* コーディングチャレンジ 3 */}
          <section>
            <CodingChallenge
              title="フォームのアクセシビリティ改善"
              description="フォームの ___ を埋めてください。label と input の関連付け、エラーメッセージの紐付けを行います。"
              preview={true}
              initialCode={`function App() {
  const emailError = "有効なメールアドレスを入力してください";
  return (
    <div>
      <___ htmlFor="email">メールアドレス</___>
      <input
        id="email"
        type="email"
        ___={!!emailError}
        aria-describedby={emailError ? "email-error" : undefined}
      />
      {emailError && (
        <p id="email-error" role="alert">
          {emailError}
        </p>
      )}
    </div>
  );
}`}
              answer={`function App() {
  const emailError = "有効なメールアドレスを入力してください";
  return (
    <div>
      <label htmlFor="email">メールアドレス</label>
      <input
        id="email"
        type="email"
        aria-invalid={!!emailError}
        aria-describedby={emailError ? "email-error" : undefined}
      />
      {emailError && (
        <p id="email-error" role="alert">
          {emailError}
        </p>
      )}
    </div>
  );
}`}
              keywords={['<label', 'aria-invalid']}
              hints={[
                'フォーム要素にラベルを関連付けるセマンティック要素は label です',
                'エラー状態を伝える ARIA 属性は aria-invalid です',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">セマンティック HTML</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>header, nav, main, aside, footer でページ構造を定義</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>h1-h6 の階層構造をスキップせず正しく設計</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>div/span の代わりにネイティブ要素を活用</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>画像には必ず適切な alt 属性を設定</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-3">ARIA とフォーカス管理</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>ネイティブ HTML で足りない場合にのみ ARIA を使用</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>aria-expanded, aria-live, aria-current で動的状態を通知</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>tabindex は 0 と -1 のみ使用。正の値は避ける</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#9679;</span>
                    <span>モーダルにはフォーカストラップと Escape での閉じを実装</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* ReferenceLinks */}
        <section>
          <ReferenceLinks
            links={[
              {
                title: 'WAI-ARIA Authoring Practices',
                url: 'https://www.w3.org/WAI/ARIA/apg/',
                description: 'ARIA のパターンとプラクティスの公式ガイド',
              },
              {
                title: 'MDN - ARIA',
                url: 'https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA',
                description: 'ARIA の包括的なリファレンス',
              },
              {
                title: 'WCAG 2.2 日本語訳',
                url: 'https://waic.jp/translations/WCAG22/',
                description: 'Web コンテンツアクセシビリティガイドライン',
              },
              {
                title: 'axe-core/react',
                url: 'https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react',
                description: 'React アプリのアクセシビリティ自動チェックライブラリ',
              },
            ]}
          />
        </section>

        <PageNavigation />
      </div>
    </div>
  );
}
