import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function ArchOverview() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 58</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          React / Next.js アーキテクチャ総論
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          「動くコード」から「良い構造のコード」へ。フロントエンドアーキテクチャの全体像を俯瞰し、
          プロジェクトの規模やチーム構成に応じた設計判断ができるようになることを目指します。
        </p>

        <WhyNowBox tags={['アーキテクチャ', 'ディレクトリ構成', '状態管理', 'Next.js設計', 'CSSライブラリ選定']}>
          <p>
            ここまでの52ステップで、React の基礎、Hooks、CSS、Next.js、Storybook と幅広く学んできました。
            個々の技術は使えるようになったけれど、「プロジェクト全体をどう設計するか？」という問いにはまだ答えられないかもしれません。
            この章では、パーツを組み合わせて「全体の設計図」を描く方法を扱います。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: フロントエンドアーキテクチャとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フロントエンドアーキテクチャとは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              「アーキテクチャ」と聞くと、建築の設計図を思い浮かべるかもしれません。
              フロントエンドのアーキテクチャも本質は同じです。
              建物が「柱の位置」「部屋の配置」「動線」で住みやすさが決まるように、
              アプリケーションも「ファイルの配置」「データの流れ」「コンポーネントの関係」で開発体験が大きく変わります。
            </p>

            <div className="rounded-lg border border-border p-5 mb-6">
              <h3 className="font-bold text-foreground mb-3">なぜ「構造」が大事なのか？</h3>
              <div className="space-y-3 text-sm text-foreground/80">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">1</span>
                  <div>
                    <p className="font-semibold text-foreground">スケーラビリティ</p>
                    <p>10ファイルのプロジェクトと1000ファイルのプロジェクトでは、必要な構造が根本的に異なります。最初から適切な構造を選べば、成長しても破綻しません。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">2</span>
                  <div>
                    <p className="font-semibold text-foreground">チームの生産性</p>
                    <p>統一されたルールがあれば、新しいメンバーが加わっても「どこに何を置くか」で迷いません。コードレビューも効率的になります。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">3</span>
                  <div>
                    <p className="font-semibold text-foreground">メンテナンス性</p>
                    <p>バグ修正や機能追加で「どのファイルを触ればいいか」がすぐ分かる。これは長期的に膨大な時間の節約になります。</p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="デザイナーにとってのアーキテクチャ">
              <p>
                デザイナーにとって、アーキテクチャを理解するメリットは大きいです。
                Figma でコンポーネントを整理するように、コードの構造を理解すれば
                「このデザイン変更はどのくらい大変？」「この UI パターンは再利用できる？」
                といった判断ができるようになります。エンジニアとの会話も格段にスムーズになります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: React のメンタルモデル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React のメンタルモデル</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              アーキテクチャを考える前に、React がどのように動くかのメンタルモデルを整理しましょう。
              これが設計判断の土台になります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">コンポーネントツリー</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React アプリは、コンポーネントが木構造（ツリー）を形成します。
              最上位の App コンポーネントから枝分かれし、末端の小さなコンポーネントに至るまで、
              親から子への一方向の関係で構成されます。
            </p>

            <CodeBlock
              language="text"
              title="コンポーネントツリーの例"
              code={`App
├── Header
│   ├── Logo
│   └── Navigation
│       ├── NavLink
│       └── NavLink
├── Main
│   ├── Sidebar
│   │   └── FilterPanel
│   └── Content
│       ├── ProductCard
│       └── ProductCard
└── Footer`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">データの流れ（単方向データフロー）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React の最も重要な設計原則は「単方向データフロー」です。
              データは親から子へ Props を通じて流れます。子から親への通知はコールバック関数を使います。
              この一方向の流れが、アプリの状態を予測可能にします。
            </p>

            <CodeBlock
              language="tsx"
              title="単方向データフローの例"
              code={`// 親コンポーネント: データを持ち、子に渡す
function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('all');

  // フィルタリングされた商品
  const filtered = products.filter(p =>
    filter === 'all' ? true : p.category === filter
  );

  return (
    <div>
      {/* 子にデータとコールバックを渡す */}
      <FilterPanel
        currentFilter={filter}
        onFilterChange={setFilter}  {/* 子→親の通知 */}
      />
      <ProductGrid products={filtered} />
    </div>
  );
}

// 子コンポーネント: 受け取ったデータを表示するだけ
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}`}
            />

            <InfoBox type="info" title="生徒の疑問: 「なぜわざわざ一方向なの？」">
              <p>
                双方向にデータが流れると、「誰がデータを変更したのか」が追えなくなります。
                たとえば A → B → C とデータが流れて、C が直接 A のデータを変更できたら、
                バグが起きたときに原因を特定するのが非常に困難になります。
                一方向なら、「データの変更元を上流にたどるだけ」で原因が見つかります。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Props Drilling と解決策</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              単方向データフローの弱点として「Props Drilling」があります。
              深い階層の子コンポーネントにデータを渡すために、間の全コンポーネントにバケツリレーで Props を渡す必要があります。
              これを解決するのが Context や状態管理ライブラリです。
            </p>

            <CodeBlock
              language="tsx"
              title="Props Drilling の問題"
              code={`// 問題: theme を末端の Button まで渡すためにバケツリレー
function App() {
  const [theme, setTheme] = useState('light');
  return <Layout theme={theme}><Page theme={theme}><Card theme={theme}><Button theme={theme} /></Card></Page></Layout>;
}

// 解決: Context を使えばバケツリレー不要
const ThemeContext = createContext<string>('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Layout><Page><Card><Button /></Card></Page></Layout>
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext); // 直接取得
  return <button className={theme}>Click</button>;
}`}
            />
          </section>

          {/* セクション 3: ディレクトリ構成パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ディレクトリ構成パターン</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              プロジェクトの「ファイルをどこに置くか」は、チームの生産性に直結します。
              代表的な4つのパターンを見ていきましょう。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. Feature-based（機能単位）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              機能ごとにフォルダを分ける構成です。「認証」「商品」「カート」など、
              ビジネスロジックの単位でまとめます。関連するコンポーネント、フック、型定義が
              一箇所に集まるため、機能の追加・削除がしやすいのが特徴です。
            </p>

            <CodeBlock
              language="text"
              title="Feature-based 構成"
              code={`src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   ├── types.ts
│   │   └── index.ts          # 公開 API
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductList.tsx
│   │   ├── hooks/
│   │   │   └── useProducts.ts
│   │   └── index.ts
│   └── cart/
│       ├── components/
│       ├── hooks/
│       └── index.ts
├── shared/                    # 機能横断の共通コード
│   ├── components/
│   ├── hooks/
│   └── utils/
└── app/                       # エントリーポイント・ルーティング`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2. Layer-based（レイヤー単位）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              技術的な役割ごとにフォルダを分ける構成です。シンプルで分かりやすく、
              小〜中規模のプロジェクトに向いています。
            </p>

            <CodeBlock
              language="text"
              title="Layer-based 構成"
              code={`src/
├── components/        # UI コンポーネント
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── pages/             # ページコンポーネント
│   ├── HomePage.tsx
│   └── ProductPage.tsx
├── hooks/             # カスタムフック
│   ├── useAuth.ts
│   └── useFetch.ts
├── api/               # API 通信
│   └── client.ts
├── types/             # 型定義
│   └── product.ts
├── utils/             # ユーティリティ関数
│   └── format.ts
└── styles/            # スタイル`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3. Atomic Design</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Brad Frost が提唱したデザイン方法論をコンポーネント設計に適用したパターンです。
              Atoms（原子）→ Molecules（分子）→ Organisms（有機体）→ Templates → Pages
              と、小さな部品を組み合わせて大きな UI を構築します。
            </p>

            <CodeBlock
              language="text"
              title="Atomic Design 構成"
              code={`src/
├── components/
│   ├── atoms/          # 最小単位（Button, Input, Label, Icon）
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Badge.tsx
│   ├── molecules/      # atoms の組み合わせ（SearchBar, FormField）
│   │   ├── SearchBar.tsx      # Input + Button
│   │   └── FormField.tsx      # Label + Input + ErrorMessage
│   ├── organisms/      # molecules の組み合わせ（Header, ProductCard）
│   │   ├── Header.tsx         # Logo + Navigation + SearchBar
│   │   └── ProductCard.tsx    # Image + Badge + Button
│   ├── templates/      # ページのレイアウト骨格
│   │   └── DashboardTemplate.tsx
│   └── pages/          # テンプレートにデータを流し込む
│       └── DashboardPage.tsx`}
            />

            <InfoBox type="warning" title="Atomic Design の注意点">
              <p>
                Atomic Design は概念として強力ですが、実際のコードに厳密に適用すると
                「これは molecule？organism？」という分類の議論に時間を取られがちです。
                考え方を参考にしつつ、チームで「atoms = 単一HTML要素レベル」「molecules = 2-3の atoms の組み合わせ」
                のように明確な基準を決めるのがコツです。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4. Bulletproof React パターン</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Alan Alickovic が提唱する、Feature-based と Layer-based のハイブリッド構成です。
              実務で最も採用されているパターンの一つで、大規模プロジェクトでも破綻しにくい設計になっています。
            </p>

            <CodeBlock
              language="text"
              title="Bulletproof React 構成"
              code={`src/
├── app/               # アプリのエントリーポイント・プロバイダー・ルーティング
│   ├── provider.tsx   # すべての Provider をラップ
│   ├── router.tsx     # ルーティング定義
│   └── index.tsx
├── features/          # 機能モジュール（Feature-based）
│   ├── auth/
│   │   ├── api/       # 機能固有の API 呼び出し
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/    # 機能固有の状態管理
│   │   ├── types/
│   │   └── index.ts   # 公開 API（バレルファイル）
│   └── dashboard/
├── components/        # 共有 UI コンポーネント
│   └── ui/
├── hooks/             # 共有フック
├── lib/               # 外部ライブラリの設定・ラッパー
├── stores/            # グローバル状態管理
├── types/             # グローバル型定義
├── utils/             # ユーティリティ関数
└── config/            # アプリ設定（定数、環境変数）`}
            />

            <div className="rounded-lg border border-border p-5 mt-6">
              <h3 className="font-bold text-foreground mb-3">パターン比較表</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">パターン</th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">最適な規模</th>
                      <th className="text-left py-2 pr-4 font-semibold text-foreground">メリット</th>
                      <th className="text-left py-2 font-semibold text-foreground">デメリット</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/80">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Feature-based</td>
                      <td className="py-2 pr-4">中〜大規模</td>
                      <td className="py-2 pr-4">機能の凝集度が高い</td>
                      <td className="py-2">共通コードの配置に迷う</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Layer-based</td>
                      <td className="py-2 pr-4">小〜中規模</td>
                      <td className="py-2 pr-4">シンプルで直感的</td>
                      <td className="py-2">大規模になると肥大化</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Atomic Design</td>
                      <td className="py-2 pr-4">デザインシステム</td>
                      <td className="py-2 pr-4">デザイナーと共通言語</td>
                      <td className="py-2">分類の境界が曖昧</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Bulletproof</td>
                      <td className="py-2 pr-4">中〜大規模</td>
                      <td className="py-2 pr-4">実績豊富・バランス良い</td>
                      <td className="py-2">初期の学習コスト</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* セクション 4: 状態管理のアーキテクチャ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">状態管理のアーキテクチャ</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              React アプリにおける状態（state）の管理は、アーキテクチャの中でも最も重要なトピックの一つです。
              「どの状態を」「どこで」「どうやって」管理するかで、アプリの複雑さが大きく変わります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">ローカル state vs グローバル state</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              まず最も重要な判断は、「その状態はどの範囲で必要か？」です。
              原則として、状態は必要な範囲で最もローカルに保つのがベストです。
            </p>

            <CodeBlock
              language="tsx"
              title="ローカル state の例"
              code={`// ローカル state: このコンポーネント内でのみ使う
function SearchBar() {
  // 検索入力値 → このコンポーネント内だけで十分
  const [query, setQuery] = useState('');
  // ドロップダウンの開閉 → UI の状態、ローカルで OK
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {isOpen && <Dropdown />}
    </div>
  );
}

// グローバル state が必要な例:
// - ログインユーザー情報（アプリ全体で使う）
// - テーマ設定（全コンポーネントに影響）
// - カートの中身（複数ページで参照）
// - 通知の一覧（ヘッダーとページ本体で参照）`}
            />

            <div className="rounded-lg border border-border p-5 mb-6">
              <h3 className="font-bold text-foreground mb-3">状態の種類と管理方法の指針</h3>
              <div className="space-y-3 text-sm text-foreground/80">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-mono text-xs">UI state</span>
                  <p>モーダルの開閉、タブの選択、入力フォームの値 → <strong>useState / useReducer</strong></p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-green-100 text-green-700 font-mono text-xs">App state</span>
                  <p>ログインユーザー、テーマ、言語設定 → <strong>Context / Zustand / Jotai</strong></p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono text-xs">Server state</span>
                  <p>APIから取得したデータ（商品一覧、ユーザー情報） → <strong>TanStack Query / SWR</strong></p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-mono text-xs">URL state</span>
                  <p>検索条件、ページネーション、フィルター → <strong>URLSearchParams / useRouter</strong></p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">Context + useReducer パターン</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              外部ライブラリを使わずに、React 標準機能だけでグローバル状態管理を実現するパターンです。
              小〜中規模のアプリや、特定の機能ドメインの状態管理に適しています。
            </p>

            <CodeBlock
              language="tsx"
              title="Context + useReducer の実装例"
              code={`// types.ts
type CartItem = { id: string; name: string; price: number; quantity: number };
type CartState = { items: CartItem[]; total: number };
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR' };

// cartReducer.ts
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      const items = existing
        ? state.items.map(i => i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 } : i)
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { items, total: items.reduce((s, i) => s + i.price * i.quantity, 0) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.id !== action.payload);
      return { items, total: items.reduce((s, i) => s + i.price * i.quantity, 0) };
    }
    case 'CLEAR':
      return { items: [], total: 0 };
  }
}

// CartContext.tsx
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// useCart.ts - カスタムフックで使いやすくラップ
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart は CartProvider 内で使用してください');
  return ctx;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">外部ライブラリ概要</h3>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-foreground">Zustand</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">おすすめ</span>
                </div>
                <p className="text-sm text-foreground/80 mb-3">
                  最小限の API でシンプルに状態管理ができるライブラリ。ボイラープレートが少なく、
                  学習コストも低い。React 以外のフレームワークでも使える。
                </p>
                <CodeBlock
                  language="tsx"
                  title="Zustand の例"
                  code={`import { create } from 'zustand';

// ストアを作成（シンプル！）
const useCounterStore = create<{
  count: number;
  increment: () => void;
  decrement: () => void;
}>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
}));

// コンポーネントで使用
function Counter() {
  const { count, increment } = useCounterStore();
  return <button onClick={increment}>{count}</button>;
}`}
                />
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-foreground">Jotai</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">アトミック</span>
                </div>
                <p className="text-sm text-foreground/80 mb-3">
                  「アトム」単位で状態を管理する、ボトムアップ型のアプローチ。
                  useState の感覚でグローバル状態を扱える。粒度の細かい状態管理に向いている。
                </p>
                <CodeBlock
                  language="tsx"
                  title="Jotai の例"
                  code={`import { atom, useAtom } from 'jotai';

// アトム（グローバルな useState のようなもの）
const countAtom = atom(0);
const doubleAtom = atom((get) => get(countAtom) * 2); // 派生アトム

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [double] = useAtom(doubleAtom); // 自動計算
  return <div>{count} × 2 = {double}</div>;
}`}
                />
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-foreground">Redux Toolkit</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">大規模</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Redux の公式推奨ツールキット。大規模アプリでの実績が豊富だが、
                  学習コストは Zustand / Jotai より高い。厳格なデータフロー（Flux アーキテクチャ）を強制するため、
                  チーム全員が規律を守る大規模プロジェクトに向いている。
                  新規プロジェクトでは Zustand や Jotai を先に検討するのが現在のトレンド。
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">Server State vs Client State</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              「サーバーから取得したデータ」と「クライアントで生成したデータ」は、
              性質が根本的に異なります。サーバーデータは「キャッシュ」であり、
              古くなる可能性があり、他のユーザーが同時に変更する可能性があります。
              この違いを認識し、適切なツールで管理することが重要です。
            </p>

            <CodeBlock
              language="tsx"
              title="TanStack Query でサーバー状態を管理"
              code={`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// データの取得（自動キャッシュ、再取得、ローディング/エラー管理）
function ProductList() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],           // キャッシュキー
    queryFn: () => fetch('/api/products').then(r => r.json()),
    staleTime: 5 * 60 * 1000,        // 5分間はキャッシュを「新鮮」とみなす
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return <Grid>{products.map(p => <ProductCard key={p.id} product={p} />)}</Grid>;
}

// データの更新（楽観的更新、自動再取得）
function AddProductButton() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newProduct: Product) =>
      fetch('/api/products', { method: 'POST', body: JSON.stringify(newProduct) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }); // キャッシュ無効化 → 再取得
    },
  });

  return <button onClick={() => mutation.mutate(newProduct)}>追加</button>;
}`}
            />

            <InfoBox type="success" title="状態管理の選び方まとめ">
              <p>
                迷ったら以下の順で検討してください。
                (1) まず useState / useReducer で済むか？
                (2) Props Drilling が辛くなったら Context を検討
                (3) サーバーデータなら TanStack Query / SWR
                (4) 複雑なクライアント状態なら Zustand（または Jotai）
                (5) 大規模チーム + 厳格なルールが必要なら Redux Toolkit。
                多くのプロジェクトでは (1)+(3) だけで十分対応できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: Next.js のアーキテクチャ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Next.js のアーキテクチャ</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Next.js（App Router）は、React のアーキテクチャに新しい次元を加えます。
              サーバーとクライアントの境界を意識した設計が求められます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">App Router の設計思想</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              App Router の核心は「サーバーファースト」です。デフォルトでは全てのコンポーネントが
              Server Component として動作し、必要な部分だけを 'use client' で Client Component にします。
              この設計により、クライアントに送る JavaScript を最小限に抑えることができます。
            </p>

            <CodeBlock
              language="text"
              title="Next.js App Router の推奨構成"
              code={`app/
├── layout.tsx              # ルートレイアウト（Server Component）
├── page.tsx                # トップページ
├── globals.css
├── (auth)/                 # Route Group（URLに影響しない）
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
├── dashboard/
│   ├── layout.tsx          # ダッシュボード共通レイアウト
│   ├── page.tsx            # /dashboard
│   ├── loading.tsx         # ローディング UI
│   ├── error.tsx           # エラー UI（'use client' 必須）
│   └── settings/
│       └── page.tsx        # /dashboard/settings
├── api/                    # Route Handlers
│   └── products/
│       └── route.ts
src/
├── components/             # 共有コンポーネント
│   ├── ui/                 # 基本 UI（Button, Input など）
│   └── layout/             # レイアウト系（Header, Footer など）
├── features/               # 機能モジュール
├── lib/                    # ユーティリティ、DB接続など
└── types/                  # 型定義`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Server Components を活かした設計</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Components の設計原則は「データの取得はサーバーで、インタラクションはクライアントで」です。
              ページの構造を Server Component で作り、インタラクティブな部分だけを Client Component として切り出します。
            </p>

            <CodeBlock
              language="tsx"
              title="Server/Client の責務分離"
              code={`// app/products/page.tsx（Server Component）
// データ取得はサーバーで行う → API キーを安全に使える
export default async function ProductsPage() {
  const products = await fetchProducts(); // サーバーで実行

  return (
    <main>
      <h1>商品一覧</h1>
      {/* 静的な表示部分は Server Component のまま */}
      <ProductDescription />

      {/* インタラクティブな部分だけ Client Component */}
      <ProductFilter />            {/* 'use client' */}
      <ProductGrid products={products} />  {/* Server Component でも OK */}
      <AddToCartButton />          {/* 'use client' */}
    </main>
  );
}

// components/ProductFilter.tsx
'use client';
// クライアントでのみ必要な状態とイベントハンドラ
export function ProductFilter() {
  const [category, setCategory] = useState('all');
  return (
    <select value={category} onChange={e => setCategory(e.target.value)}>
      <option value="all">すべて</option>
      <option value="books">書籍</option>
    </select>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">データフェッチの戦略</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Next.js App Router では、データフェッチの戦略が複数あります。
              原則として「できる限りサーバーで取得し、クライアントに渡す」のが最も効率的です。
            </p>

            <div className="rounded-lg border border-border p-5">
              <h4 className="font-bold text-foreground mb-3">データフェッチ戦略の比較</h4>
              <div className="space-y-3 text-sm text-foreground/80">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-mono text-xs">RSC</span>
                  <p><strong>Server Component で直接 fetch</strong> → 最も推奨。API キーをクライアントに露出しない。初期表示が速い。</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-green-100 text-green-700 font-mono text-xs">SA</span>
                  <p><strong>Server Actions でデータ変更</strong> → フォーム送信やデータ更新に最適。'use server' で定義。</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-mono text-xs">RH</span>
                  <p><strong>Route Handlers（API Routes）</strong> → 外部 API 向けのエンドポイント。Webhook の受け口などに。</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono text-xs">TQ</span>
                  <p><strong>TanStack Query（クライアント）</strong> → リアルタイム更新が必要な場合。チャット、通知など。</p>
                </div>
              </div>
            </div>
          </section>

          {/* セクション 6: デザインライブラリの思想と使い分け */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デザインライブラリの思想と使い分け</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              ここまでのステップで CSS Modules、styled-components、Emotion、Tailwind CSS、MUI、shadcn/ui と
              様々なスタイリング手法を学んできました。ここでは全体を俯瞰し、
              「自分のプロジェクトにはどれが最適か？」を判断するための視点を整理します。
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-foreground">CSS Modules</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">標準</span>
                </div>
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>思想:</strong> 制約なし・軽量。CSS をそのまま書きたい人向け。
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>向いているケース:</strong> 小〜中規模、CSS に慣れたチーム、外部依存を最小限にしたい。
                  Next.js との相性が良く、Server Components でも問題なく使える。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-foreground">Tailwind CSS</span>
                  <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">ユーティリティ</span>
                </div>
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>思想:</strong> ユーティリティファースト。クラスの組み合わせで UI を構築。
                  HTML を見ればスタイルが分かる。チーム全員が同じ制約の中で作業できる。
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>向いているケース:</strong> 迅速な開発、プロトタイピング、チームでの統一性。
                  デザインシステムのトークンを tailwind.config で一元管理できる。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-foreground">MUI (Material UI)</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">フルセット</span>
                </div>
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>思想:</strong> デザインシステム同梱。Material Design のガイドラインに準拠した
                  完成度の高いコンポーネントを即座に利用できる。
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>向いているケース:</strong> 業務アプリ、管理画面、短期間で完成度の高い UI が必要な場合。
                  独自デザインへのカスタマイズはテーマ機能で対応可能だが、Material Design から大きく離れるとコストが高い。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-foreground">shadcn/ui</span>
                  <span className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full">所有権</span>
                </div>
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>思想:</strong> コンポーネントのソースコードを自分のプロジェクトにコピーする。
                  npm パッケージではなく、「所有するコード」。カスタマイズの自由度が最大。
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>向いているケース:</strong> 独自デザインとの統合、Tailwind CSS 前提のプロジェクト、
                  Radix UI ベースのアクセシブルなコンポーネントが欲しい場合。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-foreground">styled-components / Emotion</span>
                  <span className="text-xs bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full">CSS-in-JS</span>
                </div>
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>思想:</strong> コンポーネントとスタイルを同じファイルに書く（コロケーション）。
                  JavaScript の機能（変数、条件分岐、関数）をスタイルに活用できる。
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>向いているケース:</strong> 動的なスタイルが多い場合、テーマ切り替え。
                  ただし Next.js App Router (Server Components) との相性に注意が必要。
                  ランタイム CSS-in-JS は Server Components では使えない場合がある。
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">選び方フローチャート</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              以下の質問に答えていくことで、最適なライブラリが見つかります。
            </p>

            <CodeBlock
              language="text"
              title="デザインライブラリ選定フローチャート"
              code={`Q1. Next.js (App Router) を使う？
├── Yes → Q2へ
└── No  → Q3へ

Q2. Server Components をフル活用する？
├── Yes → CSS Modules / Tailwind CSS（ランタイム不要）
│         └── 独自デザイン？ → Tailwind + shadcn/ui
│         └── 短期開発？   → MUI（ただしClient Componentが増える）
└── No  → Q3へ

Q3. デザイナーの独自デザインがある？
├── Yes → Q4へ
└── No  → MUI（Material Design をそのまま活用）

Q4. チームで統一的なスタイリングをしたい？
├── Yes → Tailwind CSS（+ shadcn/ui）
└── No  → CSS Modules / styled-components

まとめ:
- 迷ったら → Tailwind CSS（最も汎用的）
- 業務アプリ → MUI
- 最大の自由度 → Tailwind + shadcn/ui
- CSS が得意 → CSS Modules`}
            />

            <InfoBox type="info" title="生徒の疑問: 「結局どれを使えばいいの？」">
              <p>
                正直なところ、「正解」はありません。プロジェクトの要件によって最適解は変わります。
                ただし、2025年現在の実務的なおすすめとしては:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>個人プロジェクト・学習:</strong> Tailwind CSS + shadcn/ui</li>
                <li><strong>スタートアップ・MVP:</strong> Tailwind CSS（速度重視）</li>
                <li><strong>業務アプリ・管理画面:</strong> MUI（完成度重視）</li>
                <li><strong>大企業のプロダクト:</strong> Tailwind CSS + 独自デザインシステム</li>
                <li><strong>既存プロジェクト:</strong> 今使っているものを継続（移行コストは高い）</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション 7: プロジェクト別推奨パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プロジェクト別推奨パターン</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              ここまでの内容を統合し、具体的なプロジェクトタイプごとの推奨構成をまとめます。
            </p>

            <div className="space-y-6">
              <div className="rounded-lg border-2 border-blue-200 dark:border-blue-800 p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">パターンA: 個人ポートフォリオ / LP</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Next.js App Router</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Tailwind CSS</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Layer-based</span>
                </div>
                <p className="text-sm text-foreground/80">
                  シンプルな Layer-based 構成。状態管理は useState で十分。
                  Tailwind で高速にスタイリング。Server Components を活かして SEO も最適化。
                </p>
              </div>

              <div className="rounded-lg border-2 border-green-200 dark:border-green-800 p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">パターンB: SaaS / Webアプリ</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Next.js App Router</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Tailwind + shadcn/ui</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Feature-based</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">TanStack Query</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Zustand</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Feature-based で機能ごとに整理。サーバーデータは TanStack Query、
                  クライアント状態は Zustand。shadcn/ui でアクセシブルな UI を効率的に構築。
                </p>
              </div>

              <div className="rounded-lg border-2 border-purple-200 dark:border-purple-800 p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">パターンC: 業務アプリ / 管理画面</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">Next.js App Router</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">MUI</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">Bulletproof React</span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">TanStack Query</span>
                </div>
                <p className="text-sm text-foreground/80">
                  MUI の豊富なコンポーネント（DataGrid, DatePicker など）を活用。
                  Bulletproof React パターンで大規模化に備える。テーマカスタマイズでブランドカラーを反映。
                </p>
              </div>

              <div className="rounded-lg border-2 border-orange-200 dark:border-orange-800 p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">パターンD: デザインシステム付きプロダクト</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Next.js App Router</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Tailwind + 独自DS</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Bulletproof React</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Storybook</span>
                </div>
                <p className="text-sm text-foreground/80">
                  独自のデザインシステムを構築。Tailwind のテーマでデザイントークンを管理。
                  Storybook でコンポーネントカタログを維持。次の Step 54 で詳しく解説します。
                </p>
              </div>
            </div>

            <InfoBox type="success" title="大切なのは「一貫性」">
              <p>
                どのパターンを選んでも、チーム内で一貫性を保つことが最も重要です。
                「最高のアーキテクチャ」よりも「チーム全員が理解し、守れるアーキテクチャ」の方が
                はるかに価値があります。最初にルールを決め、ADR（Architecture Decision Record）として
                記録しておくと、後から参加するメンバーにも判断の理由を伝えられます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 8: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="rounded-lg border border-border p-6 bg-muted/30">
              <div className="space-y-3 text-foreground/80">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">1.</span>
                  <p><strong>アーキテクチャとは設計図</strong> ― ファイルの配置、データの流れ、コンポーネントの関係を定める</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">2.</span>
                  <p><strong>React は単方向データフロー</strong> ― 親→子の流れが予測可能性を生む。Props Drilling は Context で解決</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">3.</span>
                  <p><strong>ディレクトリ構成は4パターン</strong> ― Feature-based / Layer-based / Atomic Design / Bulletproof React</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">4.</span>
                  <p><strong>状態は種類で管理方法を変える</strong> ― UI state, App state, Server state, URL state</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">5.</span>
                  <p><strong>Next.js はサーバーファースト</strong> ― データ取得はサーバーで、インタラクションはクライアントで</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 text-primary font-bold">6.</span>
                  <p><strong>CSS ライブラリは要件で選ぶ</strong> ― 万能な正解はない。プロジェクト特性とチームに合わせる</p>
                </div>
              </div>
            </div>

            <p className="text-foreground/80 mt-6 leading-relaxed">
              このステップでは、フロントエンドアーキテクチャの「全体地図」を手に入れました。
              次の Step 54 では、この知識を基にして「デザインシステム」の設計と構築に踏み込みます。
              デザイナーとエンジニアが共通の言語で UI を語るための仕組みを、一緒に作っていきましょう。
            </p>
          </section>
        </div>

        {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Bulletproof React',
                  url: 'https://github.com/alan2207/bulletproof-react',
                  description: 'スケーラブルな React アプリケーションのアーキテクチャガイド',
                },
                {
                  title: 'TanStack Query',
                  url: 'https://tanstack.com/query/latest',
                  description: 'サーバーステート管理ライブラリ',
                },
                {
                  title: 'Zustand',
                  url: 'https://zustand.docs.pmnd.rs/',
                  description: '軽量なクライアントステート管理',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
