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
          <span className="step-badge">STEP 25</span>
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
                Tailwind の多くのユーティリティは、クラス名が CSS の値と直接対応しています。
                <code>p-6</code> は <code>padding: 1.5rem</code>、<code>text-xl</code> は <code>font-size: 1.25rem</code>（あわせて <code>line-height</code> も出力されます）といった具合です。
                <code>sr-only</code> のように 1 つのクラスが複数のプロパティを出すものもありますが、対応関係を覚えるとクラス名からスタイルを読み取れるようになります。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: Vite プロジェクトへのインストール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Vite プロジェクトへのインストール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Vite プロジェクトでは、以下の手順で Tailwind CSS v4 をセットアップできます。
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
              previewHeight={520}
              libs={['tailwind']}
              code={`function App() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">パディング（内側の余白）— 青い部分がパディング</p>
      <div className="p-4 bg-blue-200 rounded w-fit">
        <div className="bg-white text-blue-900 rounded px-2 py-1">p-4（全方向 16px）</div>
      </div>
      <div className="px-6 bg-blue-200 rounded w-fit">
        <div className="bg-white text-blue-900 rounded px-2 py-1">px-6（左右 24px）</div>
      </div>
      <div className="py-2 bg-blue-200 rounded w-fit">
        <div className="bg-white text-blue-900 rounded px-2 py-1">py-2（上下 8px）</div>
      </div>
      <div className="pt-8 bg-blue-200 rounded w-fit">
        <div className="bg-white text-blue-900 rounded px-2 py-1">pt-8（上だけ 32px）</div>
      </div>

      <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mt-2">マージン（外側の余白）— 破線とのすき間がマージン</p>
      <div className="border border-dashed border-gray-400 rounded w-fit">
        <div className="m-4 bg-blue-200 text-blue-900 rounded px-2 py-1">m-4（全方向 16px）</div>
      </div>
      <div className="border border-dashed border-gray-400 rounded">
        <div className="mx-auto w-fit bg-blue-200 text-blue-900 rounded px-2 py-1">mx-auto（左右中央）</div>
      </div>
      <div className="border border-dashed border-gray-400 rounded w-fit">
        <div className="mb-6 bg-blue-200 text-blue-900 rounded px-2 py-1">mb-6（下だけ 24px）</div>
      </div>
    </div>
  );
}`}
            />

            <CodePreview
              language="tsx"
              title="幅と高さ"
              previewHeight={260}
              libs={['tailwind']}
              code={`function App() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="w-full bg-blue-200 text-blue-900 rounded px-2 py-1">w-full（幅 100%）</div>
      <div className="w-1/2 bg-blue-200 text-blue-900 rounded px-2 py-1">w-1/2（幅 50%）</div>
      <div className="w-64 bg-blue-200 text-blue-900 rounded px-2 py-1">w-64（幅 256px）</div>
      <div className="max-w-4xl w-full bg-blue-200 text-blue-900 rounded px-2 py-1">max-w-4xl（最大幅 896px）</div>
      <div className="h-16 bg-blue-100 text-blue-900 rounded px-2 py-1">h-16（高さ 64px）</div>
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
              previewHeight={340}
              libs={['tailwind']}
              code={`function App() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="bg-white border border-gray-200 rounded p-3 flex flex-col gap-1">
        <p className="text-gray-900">text-gray-900: ほぼ黒のテキスト</p>
        <p className="text-blue-600">text-blue-600: 青いテキスト</p>
        <p className="text-red-500">text-red-500: 赤いテキスト</p>
      </div>

      <div className="bg-white text-gray-900 border border-gray-200 rounded px-3 py-2">bg-white: 白い背景</div>
      <div className="bg-gray-100 text-gray-900 rounded px-3 py-2">bg-gray-100: 薄いグレーの背景</div>
      <div className="bg-blue-500 text-white rounded px-3 py-2">bg-blue-500: 青い背景</div>

      <div className="border border-gray-300 bg-white text-gray-900 rounded px-3 py-2">border-gray-300: グレーのボーダー</div>
      <div className="border-2 border-blue-500 bg-white text-gray-900 rounded px-3 py-2">border-2 border-blue-500: 太い青ボーダー</div>
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
              previewHeight={620}
              libs={['tailwind']}
              code={`function App() {
  return (
    <div className="bg-white text-gray-900 rounded-lg p-4 flex flex-col gap-1">
      <p className="text-xs font-semibold text-gray-500">フォントサイズ</p>
      <p className="text-xs">text-xs: 極小テキスト（12px）</p>
      <p className="text-sm">text-sm: 小さいテキスト（14px）</p>
      <p className="text-base">text-base: 標準テキスト（16px）</p>
      <p className="text-lg">text-lg: 少し大きめ（18px）</p>
      <p className="text-xl">text-xl: 大きめ（20px）</p>
      <p className="text-2xl">text-2xl: 見出し（24px）</p>
      <p className="text-4xl">text-4xl: 大見出し（36px）</p>

      <p className="text-xs font-semibold text-gray-500 mt-3">フォントウェイト</p>
      <p className="font-normal">font-normal: 普通（400）</p>
      <p className="font-medium">font-medium: ミディアム（500）</p>
      <p className="font-semibold">font-semibold: セミボールド（600）</p>
      <p className="font-bold">font-bold: ボールド（700）</p>
      <p className="font-extrabold">font-extrabold: エクストラボールド（800）</p>

      <p className="text-xs font-semibold text-gray-500 mt-3">テキスト装飾・配置</p>
      <p className="underline">underline: 下線</p>
      <p className="line-through">line-through: 取り消し線</p>
      <p className="text-center">text-center: 中央揃え</p>
      <p className="text-right">text-right: 右揃え</p>
    </div>
  );
}`}
            />
          </section>

          {/* セクション6: Flexbox と Grid */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Flexbox と Grid</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              レイアウトでよく使う Flexbox と Grid も、Tailwind ならクラス名だけで表現できます。
            </p>

            <CodePreview
              language="tsx"
              title="Flexbox レイアウト"
              previewHeight={340}
              libs={['tailwind']}
              code={`function App() {
  return (
    <div className="flex flex-col gap-5 text-sm">
      <div>
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">flex items-center gap-4（横並び・中央揃え）</p>
        <div className="flex items-center gap-4 bg-white text-gray-900 rounded-lg p-3">
          <div className="w-10 h-10 rounded-full bg-violet-300" />
          <span className="font-medium">ユーザー名</span>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">flex justify-between items-center（両端揃え）</p>
        <div className="flex justify-between items-center bg-gray-100 text-gray-900 rounded-lg px-3 py-2">
          <span className="font-bold text-lg">ロゴ</span>
          <span className="text-gray-500">ナビ</span>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">flex flex-wrap gap-2（折り返しタグ）</p>
        <div className="flex flex-wrap gap-2 bg-white rounded-lg p-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full">タグ1</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full">タグ2</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full">タグ3</span>
        </div>
      </div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Grid レイアウト"
              previewHeight={260}
              libs={['tailwind']}
              code={`function App() {
  return (
    <div className="flex flex-col gap-5 text-sm">
      <div>
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">grid grid-cols-3 gap-4（3カラムグリッド）</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 text-gray-900 rounded p-4 text-center">1</div>
          <div className="bg-gray-100 text-gray-900 rounded p-4 text-center">2</div>
          <div className="bg-gray-100 text-gray-900 rounded p-4 text-center">3</div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">grid grid-cols-4 + col-span-3（メイン + サイドバー）</p>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 bg-blue-100 text-blue-900 rounded p-4 text-center">メイン（col-span-3）</div>
          <div className="bg-blue-100 text-blue-900 rounded p-4 text-center">サイド</div>
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
              previewHeight={240}
              libs={['tailwind']}
              code={`function App() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer">
        hover:bg-blue-600（ホバーで暗くなる）
      </button>

      <button className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 py-2 rounded-md transition-colors cursor-pointer">
        active:bg-green-700（押すと更に暗くなる）
      </button>

      <input
        className="border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white text-gray-900 rounded-md px-3 py-2"
        placeholder="focus:border-blue-500（クリックで枠が青に）"
      />

      <button className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed" disabled>
        disabled:opacity-50（無効なボタン）
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
                  url: 'https://tailwindcss.com/docs/installation/using-vite',
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
