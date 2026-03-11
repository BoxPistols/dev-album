import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function TailwindIntro() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 22</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Tailwind CSS 入門</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ユーティリティファーストという新しい CSS の書き方を学びましょう。クラス名を組み合わせるだけで、デザインカンプを素早く再現できます。
        </p>

        <WhyNowBox tags={['Tailwind CSS', 'ユーティリティファースト', 'Vite']}>
          <p>
            CSS-in-JS やプレーン CSS を学んできましたが、現在のフロントエンド開発で最も人気のあるスタイリング手法が Tailwind CSS です。
            デザイナーにとっては、Figma のプロパティパネルに近い感覚で UI を組み立てられるのが最大のメリットです。
            CSS ファイルを行き来する必要がなく、HTML（JSX）の中で完結するため、コンポーネントの見た目を即座に把握できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: ユーティリティファースト CSS とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ユーティリティファースト CSS とは</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              従来の CSS では「コンポーネントに名前をつけて、そのクラスにスタイルを書く」というアプローチが主流でした。
              ユーティリティファーストは逆の発想で、<strong>「1つのクラスが1つのスタイルを担当する」</strong>という考え方です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">従来の CSS との比較</h3>
            <CodeBlock
              language="css"
              title="従来の CSS"
              code={`/* styles.css */
.card {
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="Tailwind CSS（ユーティリティファースト）"
              code={`// CSS ファイル不要！クラス名だけでスタイリング
<div className="p-6 rounded-lg bg-white shadow-sm">
  <h2 className="text-xl font-bold text-gray-800">
    カードタイトル
  </h2>
</div>`}
            />

            <InfoBox type="info" title="デザイナーにとってのメリット">
              <p>
                Tailwind のクラス名は CSS プロパティと1対1で対応しています。
                <code>p-6</code> は <code>padding: 1.5rem</code>、<code>text-xl</code> は <code>font-size: 1.25rem</code> のように、
                覚えてしまえば CSS を書くよりも圧倒的に速くスタイリングできます。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: Vite プロジェクトへのインストール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Vite プロジェクトへのインストール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind CSS v4 は Vite との統合がさらに簡単になりました。以下の手順でセットアップできます。
            </p>

            <CodeBlock
              language="bash"
              title="1. パッケージのインストール"
              code={`npm install -D tailwindcss @tailwindcss/vite`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="typescript"
              title="2. vite.config.ts に追加"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="3. src/index.css に追記"
              code={`@import "tailwindcss";`}
            />

            <InfoBox type="success" title="セットアップ完了">
              <p>
                たったこれだけで Tailwind CSS が使えるようになります。
                Tailwind v4 では <code>tailwind.config.js</code> が不要になり、CSS ファイル内で直接設定できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: 基本クラス — スペーシング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">基本クラス：スペーシング</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind のスペーシングは <code>4px (0.25rem)</code> 刻みの一貫したスケールを使います。
              デザイントークンとして非常に合理的な体系です。
            </p>

            <CodePreview
              language="tsx"
              title="パディングとマージン"
              previewHeight={340}
              code={`function App() {
  const box = (label, style) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
      <div style={{ background: 'var(--bg-accent)', borderRadius: 4, ...style }}>
        <div style={{ background: 'var(--bg-accent-light)', borderRadius: 2, padding: '4px 8px', fontSize: 13 }}>{label}</div>
      </div>
      <code style={{ color: 'var(--text-muted)', fontSize: 12 }}>{Object.entries(style).map(([k,v]) => k + ': ' + v).join(', ')}</code>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <strong style={{ fontSize: 13, color: 'var(--text)' }}>パディング（内側の余白）</strong>
      {box('p-4: 全方向 16px', { padding: 16 })}
      {box('px-6: 左右 24px', { paddingLeft: 24, paddingRight: 24 })}
      {box('py-2: 上下 8px', { paddingTop: 8, paddingBottom: 8 })}
      {box('pt-8: 上だけ 32px', { paddingTop: 32 })}
      <strong style={{ fontSize: 13, color: 'var(--text)', marginTop: 4 }}>マージン（外側の余白）</strong>
      {box('m-4: 全方向 16px', { margin: 16 })}
      {box('mx-auto: 左右 auto', { marginLeft: 'auto', marginRight: 'auto' })}
      {box('mb-6: 下だけ 24px', { marginBottom: 24 })}
    </div>
  );
}`}
            />

            <CodePreview
              language="tsx"
              title="幅と高さ"
              previewHeight={200}
              code={`function App() {
  const row = (label, style) => (
    <div style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ background: 'var(--bg-accent)', borderRadius: 4, padding: '4px 8px', textAlign: 'center', ...style }}>{label}</div>
      <code style={{ color: 'var(--text-muted)', fontSize: 11 }}>{Object.entries(style).map(([k,v]) => k + ': ' + v).join(', ')}</code>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {row('w-full: 幅 100%', { width: '100%' })}
      {row('w-1/2: 幅 50%', { width: '50%' })}
      {row('w-64: 幅 256px', { width: 256 })}
      {row('max-w-4xl: 最大幅 896px', { maxWidth: 896, width: '100%' })}
    </div>
  );
}`}
            />
          </section>

          {/* セクション4: 基本クラス — カラー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">基本クラス：カラー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind は豊富なカラーパレットを内蔵しています。
              各色は 50〜950 までの階調があり、デザインシステムで使いやすい構成です。
            </p>

            <CodePreview
              language="tsx"
              title="テキストと背景の色"
              previewHeight={280}
              code={`function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* テキスト色 */}
      <p style={{ color: 'var(--text)', margin: 0 }}>ほぼ黒のテキスト (text-gray-900)</p>
      <p style={{ color: 'var(--text-accent)', margin: 0 }}>青いテキスト (text-blue-600)</p>
      <p style={{ color: 'var(--text-danger)', margin: 0 }}>赤いテキスト (text-red-500)</p>

      {/* 背景色 */}
      <div style={{ background: 'var(--bg-card)', padding: '8px 12px', borderRadius: 4 }}>白い背景 (bg-white)</div>
      <div style={{ background: 'var(--bg-muted)', padding: '8px 12px', borderRadius: 4 }}>薄いグレーの背景 (bg-gray-100)</div>
      <div style={{ background: '#3b82f6', color: '#fff', padding: '8px 12px', borderRadius: 4 }}>青い背景 (bg-blue-500)</div>

      {/* ボーダー色 */}
      <div style={{ border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 4 }}>グレーのボーダー</div>
      <div style={{ border: '2px solid var(--text-accent)', padding: '8px 12px', borderRadius: 4 }}>太い青ボーダー</div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="カラーの数値ルール">
              <p>
                数値が小さいほど薄く、大きいほど濃くなります。
                50（ほぼ白）→ 500（標準）→ 950（ほぼ黒）。
                背景には 50〜200、テキストには 600〜900 を使うのが一般的です。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: 基本クラス — タイポグラフィ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">基本クラス：タイポグラフィ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              文字サイズ、太さ、行間、文字揃えなど、テキストに関するユーティリティを見ていきましょう。
            </p>

            <CodePreview
              language="tsx"
              title="テキストのスタイリング"
              previewHeight={420}
              code={`function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <strong style={{ fontSize: 13, color: 'var(--text)' }}>フォントサイズ</strong>
      <p style={{ fontSize: 12, margin: 0 }}>text-xs: 12px - 極小テキスト</p>
      <p style={{ fontSize: 14, margin: 0 }}>text-sm: 14px - 小さいテキスト</p>
      <p style={{ fontSize: 16, margin: 0 }}>text-base: 16px - 標準テキスト</p>
      <p style={{ fontSize: 18, margin: 0 }}>text-lg: 18px - 少し大きめ</p>
      <p style={{ fontSize: 20, margin: 0 }}>text-xl: 20px - 大きめ</p>
      <p style={{ fontSize: 24, margin: 0 }}>text-2xl: 24px - 見出し</p>
      <p style={{ fontSize: 36, margin: 0 }}>text-4xl: 36px - 大見出し</p>

      <strong style={{ fontSize: 13, color: 'var(--text)', marginTop: 8 }}>フォントウェイト</strong>
      <p style={{ fontWeight: 400, margin: 0 }}>font-normal: 普通（400）</p>
      <p style={{ fontWeight: 500, margin: 0 }}>font-medium: ミディアム（500）</p>
      <p style={{ fontWeight: 600, margin: 0 }}>font-semibold: セミボールド（600）</p>
      <p style={{ fontWeight: 700, margin: 0 }}>font-bold: ボールド（700）</p>
      <p style={{ fontWeight: 800, margin: 0 }}>font-extrabold: エクストラボールド（800）</p>

      <strong style={{ fontSize: 13, color: 'var(--text)', marginTop: 8 }}>テキスト装飾・配置</strong>
      <p style={{ textDecoration: 'underline', margin: 0 }}>underline: 下線</p>
      <p style={{ textDecoration: 'line-through', margin: 0 }}>line-through: 取り消し線</p>
      <p style={{ textAlign: 'center', margin: 0 }}>text-center: 中央揃え</p>
      <p style={{ textAlign: 'right', margin: 0 }}>text-right: 右揃え</p>
    </div>
  );
}`}
            />
          </section>

          {/* セクション6: Flexbox と Grid */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Flexbox と Grid</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              レイアウトに不可欠な Flexbox と Grid も、Tailwind ならクラス名だけで表現できます。
            </p>

            <CodePreview
              language="tsx"
              title="Flexbox レイアウト"
              previewHeight={240}
              code={`function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 横並び（中央揃え） */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#c4b5fd' }} />
        <span style={{ fontWeight: 500 }}>ユーザー名</span>
      </div>

      {/* 両端揃え */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-muted)', borderRadius: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 18 }}>ロゴ</span>
        <span style={{ color: 'var(--text-muted)' }}>ナビ</span>
      </div>

      {/* 折り返しタグ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ padding: '4px 12px', background: 'var(--bg-accent)', borderRadius: 9999, fontSize: 14 }}>タグ1</span>
        <span style={{ padding: '4px 12px', background: 'var(--bg-accent)', borderRadius: 9999, fontSize: 14 }}>タグ2</span>
        <span style={{ padding: '4px 12px', background: 'var(--bg-accent)', borderRadius: 9999, fontSize: 14 }}>タグ3</span>
      </div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Grid レイアウト"
              previewHeight={240}
              code={`function App() {
  const cell = { background: 'var(--bg-muted)', padding: 16, borderRadius: 4, textAlign: 'center', fontSize: 14 };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 3カラムグリッド */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 8px', color: 'var(--text)' }}>3カラムグリッド (grid-cols-3 gap-4)</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div style={cell}>1</div>
          <div style={cell}>2</div>
          <div style={cell}>3</div>
        </div>
      </div>

      {/* メイン + サイドバー */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 8px', color: 'var(--text)' }}>メイン + サイドバー (grid-cols-4)</p>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 16 }}>
          <div style={{ ...cell, background: 'var(--bg-accent)' }}>メインコンテンツ（3/4）</div>
          <div style={{ ...cell, background: 'var(--bg-accent)' }}>サイドバー（1/4）</div>
        </div>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション7: hover / focus ステート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ホバーとフォーカスの状態</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tailwind では疑似クラス（:hover, :focus など）をプレフィックスとして表現します。
              インタラクティブな UI を直感的に作れます。
            </p>

            <CodePreview
              language="tsx"
              title="状態のプレフィックス"
              previewHeight={200}
              code={`function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button
        style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', transition: 'background 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
        onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}
      >
        ホバーで暗くなるボタン
      </button>

      <button
        style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', transition: 'background 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
        onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}
      >
        押すと更に暗くなるボタン
      </button>

      <button style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'not-allowed', opacity: 0.5 }} disabled>
        無効なボタン
      </button>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="よく使うステートプレフィックス">
              <p>
                <code>hover:</code> マウスオーバー時 / <code>focus:</code> フォーカス時 /
                <code>active:</code> クリック中 / <code>disabled:</code> 無効時 /
                <code>group-hover:</code> 親ホバー時 / <code>first:</code> 最初の子要素 /
                <code>last:</code> 最後の子要素
              </p>
            </InfoBox>
          </section>

          {/* セクション8: 実践 — カードコンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：カードコンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの知識を総合して、実用的なカードコンポーネントを作ってみましょう。
              デザイナーが Figma でよく作るカード UI を、Tailwind で再現します。
            </p>

            <CodeBlock
              language="tsx"
              title="ProductCard.tsx"
              showLineNumbers
              code={`interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  tag?: string;
}

export default function ProductCard({
  image,
  title,
  description,
  price,
  tag,
}: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm
                    border border-gray-100 overflow-hidden
                    hover:shadow-lg transition-shadow duration-300">
      {/* 画像エリア */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover
                     group-hover:scale-105 transition-transform duration-300"
        />
        {tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1
                           bg-blue-500 text-white text-xs font-semibold
                           rounded-full">
            {tag}
          </span>
        )}
      </div>

      {/* コンテンツエリア */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1
                       group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ¥{price.toLocaleString()}
          </span>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm
                             font-medium rounded-lg
                             hover:bg-blue-600 active:bg-blue-700
                             transition-colors duration-200">
            カートに追加
          </button>
        </div>
      </div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="使い方"
              code={`// 商品一覧ページ
export default function ProductList() {
  const products = [
    {
      image: '/images/product1.jpg',
      title: 'ワイヤレスヘッドホン',
      description: 'ノイズキャンセリング搭載。長時間の使用でも快適。',
      price: 12800,
      tag: '新着',
    },
    {
      image: '/images/product2.jpg',
      title: 'レザーウォレット',
      description: '上質な本革を使用したミニマルデザインの財布。',
      price: 8500,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">商品一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="success" title="Tailwind のポイントまとめ">
              <p>
                Tailwind CSS を使えば、CSS ファイルを一切書かずに洗練された UI を構築できます。
                最初はクラス名が多く感じますが、慣れるとデザインカンプから直接コードに変換する感覚で作業できるようになります。
                次のステップでは、レスポンシブデザインとダークモードを学びましょう。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Tailwind CSS 公式ドキュメント',
                  url: 'https://tailwindcss.com/docs',
                  description: 'Tailwind CSS のユーティリティクラスリファレンス',
                },
                {
                  title: 'Tailwind CSS インストール（Vite）',
                  url: 'https://tailwindcss.com/docs/installation/using-vite',
                  description: 'Vite プロジェクトでの Tailwind CSS セットアップ',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
