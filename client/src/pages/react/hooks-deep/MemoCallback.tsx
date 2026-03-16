import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function MemoCallback() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 15</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">useMemo / useCallback</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          パフォーマンス最適化のための 2 つの Hook。重い計算をキャッシュする useMemo と、関数の再生成を防ぐ useCallback を学びます。
          React.memo と組み合わせることで、不要な再レンダーを減らしてアプリを高速に保てます。
        </p>

        <WhyNowBox tags={['useMemo', 'useCallback', 'React.memo', 'パフォーマンス']}>
          <p>
            React はデフォルトで「親が再レンダーされたら子も再レンダーする」という仕組みです。
            小さいアプリでは問題になりませんが、リストが長くなったり、重い計算が入ると目に見えてもたつくことがあります。
            この 3 つのツール（useMemo、useCallback、React.memo）を正しく使えば、
            <strong>必要な部分だけを効率よく更新する</strong>アプリが作れます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 再レンダーの基礎知識 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まず知っておくこと: React の再レンダー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最適化を学ぶ前に、React がいつ再レンダーするかを正確に理解しましょう。
            </p>
            <CodeBlock
              language="tsx"
              title="再レンダーが起きるタイミング"
              code={`// 再レンダーが起きるのはこの 3 つのとき:
// 1. state が更新されたとき
// 2. 親コンポーネントが再レンダーされたとき
// 3. useContext で購読している値が変わったとき

function Parent() {
  const [count, setCount] = useState(0);

  // count が変わると Parent が再レンダー
  // → Child も再レンダーされる（props が変わっていなくても！）
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Child name="太郎" /> {/* props は同じなのに毎回再レンダー */}
    </div>
  );
}

function Child({ name }: { name: string }) {
  console.log('Child がレンダーされた'); // 毎回ログが出る
  return <p>こんにちは、{name}さん</p>;
}`}
            />
            <div className="mt-6 mb-6">
              <InfoBox type="info" title="再レンダー = 悪いこと、ではない">
                <p>
                  React の再レンダーは非常に高速で、ほとんどの場合は問題になりません。
                  「まず動くものを作り、遅いと感じたら最適化する」が正しいアプローチです。
                  最適化はコードの複雑さを増すので、必要になるまでやらないのがベストプラクティスです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 2: React.memo */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React.memo: コンポーネントのメモ化</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React.memo でコンポーネントをラップすると、「props が前回と同じなら再レンダーをスキップする」ようになります。
            </p>
            <CodeBlock
              language="tsx"
              title="React.memo の使い方"
              showLineNumbers
              code={`import { memo, useState } from 'react';

// memo でラップすると、props が変わらない限り再レンダーされない
const ExpensiveChild = memo(function ExpensiveChild({
  name,
}: {
  name: string;
}) {
  console.log('ExpensiveChild がレンダーされた');
  // 重い描画処理があると想像してください
  return <p>こんにちは、{name}さん</p>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        カウント: {count}
      </button>
      {/* name は "太郎" のまま変わらないので、再レンダーされない */}
      <ExpensiveChild name="太郎" />
    </div>
  );
}`}
            />

            <CodePreview
              title="React.memo の効果 → +1を押してレンダー回数を比較"
              previewHeight={240}
              code={`function NormalChild({ name }) {
  const renderCount = React.useRef(0)
  renderCount.current += 1
  return (
    <div style={{ padding: '8px 12px', border: '1px solid #FCA5A5', borderRadius: '6px', marginBottom: '6px', backgroundColor: '#FEF2F2' }}>
      <span style={{ fontSize: '13px' }}>通常の子 (memo なし): こんにちは、{name}さん</span>
      <span style={{ float: 'right', fontSize: '12px', color: '#EF4444', fontWeight: 'bold' }}>レンダー: {renderCount.current}回</span>
    </div>
  )
}

const MemoChild = React.memo(function MemoChild({ name }) {
  const renderCount = React.useRef(0)
  renderCount.current += 1
  return (
    <div style={{ padding: '8px 12px', border: '1px solid #86EFAC', borderRadius: '6px', marginBottom: '6px', backgroundColor: '#F0FDF4' }}>
      <span style={{ fontSize: '13px' }}>memo 付きの子: こんにちは、{name}さん</span>
      <span style={{ float: 'right', fontSize: '12px', color: '#22C55E', fontWeight: 'bold' }}>レンダー: {renderCount.current}回</span>
    </div>
  )
})

function App() {
  const [count, setCount] = React.useState(0)
  return (
    <div style={{ padding: '16px' }}>
      <button onClick={() => setCount(count + 1)} style={{ padding: '6px 16px', borderRadius: '8px', backgroundColor: '#3B82F6', color: 'white', border: 'none', cursor: 'pointer', fontSize: '14px', marginBottom: '12px' }}>
        親のカウント: {count}（+1）
      </button>
      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>name props は変わらないのに...</p>
      <NormalChild name="太郎" />
      <MemoChild name="太郎" />
    </div>
  )
}
`}
            />
            <div className="mt-6 mb-6">
              <InfoBox type="warning" title="memo の落とし穴: オブジェクトと関数">
                <p>
                  React.memo は props を「浅い比較（===）」で判定します。
                  プリミティブ値（文字列、数値）は問題ありませんが、オブジェクトや関数は毎回新しい参照が作られるため、
                  memo が効きません。ここで useMemo と useCallback が必要になります。
                </p>
              </InfoBox>
            </div>

            <CodeBlock
              language="tsx"
              title="memo が効かないケース"
              code={`function Parent() {
  const [count, setCount] = useState(0);

  // レンダーのたびに新しいオブジェクトが作られる
  const style = { color: 'red', fontSize: 16 };

  // レンダーのたびに新しい関数が作られる
  const handleClick = () => {
    console.log('クリック');
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      {/* style と handleClick が毎回新しいので memo が効かない！ */}
      <MemoizedChild style={style} onClick={handleClick} />
    </div>
  );
}`}
            />
          </section>

          {/* セクション 3: useMemo */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useMemo: 計算結果のキャッシュ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useMemo は「依存する値が変わらない限り、前回の計算結果を使い回す」Hook です。
              重い計算やオブジェクトの生成をキャッシュするのに使います。
            </p>
            <CodeBlock
              language="tsx"
              title="useMemo の基本構文"
              code={`import { useMemo } from 'react';

const memoizedValue = useMemo(
  () => {
    // 重い計算
    return expensiveCalculation(a, b);
  },
  [a, b] // a または b が変わったときだけ再計算
);`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実例 1: 重いフィルター処理</h3>
            <CodePreview
              title="useMemo でフィルタリング → 検索・ソートしてみよう"
              previewHeight={280}
              code={`const sampleProducts = [
  { id: 1, name: 'ワイヤレスマウス', category: 'PC周辺機器', price: 3980 },
  { id: 2, name: 'メカニカルキーボード', category: 'PC周辺機器', price: 12800 },
  { id: 3, name: 'USB-C ハブ', category: 'PC周辺機器', price: 4500 },
  { id: 4, name: 'モニターアーム', category: 'デスク', price: 8900 },
  { id: 5, name: 'デスクマット', category: 'デスク', price: 2480 },
  { id: 6, name: 'ウェブカメラ', category: 'PC周辺機器', price: 6800 },
  { id: 7, name: 'スタンディングデスク', category: 'デスク', price: 45000 },
  { id: 8, name: 'ヘッドセット', category: 'オーディオ', price: 15800 },
]

function ProductList() {
  const [query, setQuery] = React.useState('')
  const [sortBy, setSortBy] = React.useState('name')
  const computeCount = React.useRef(0)

  const filteredProducts = React.useMemo(() => {
    computeCount.current += 1
    const filtered = sampleProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    )
    return filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      return a.name.localeCompare(b.name)
    })
  }, [query, sortBy])

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="商品を検索..." style={{ flex: 1, minWidth: '120px', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '6px 10px', fontSize: '13px' }} />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ border: '1px solid #D1D5DB', borderRadius: '6px', padding: '6px 8px', fontSize: '13px' }}>
          <option value="name">名前順</option>
          <option value="price">価格順</option>
        </select>
      </div>
      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>{filteredProducts.length} 件の商品 | useMemo 計算回数: {computeCount.current}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filteredProducts.map((p) => (
          <li key={p.id} style={{ padding: '6px 0', borderBottom: '1px solid #F3F4F6', fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
            <span>{p.name}</span>
            <span style={{ color: '#6B7280' }}>{p.price.toLocaleString()}円</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return <ProductList />
}
`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実例 2: オブジェクト props のメモ化</h3>
            <CodeBlock
              language="tsx"
              title="memo + useMemo の組み合わせ"
              code={`import { memo, useMemo, useState } from 'react';

// memo でラップされた子コンポーネント
const Chart = memo(function Chart({
  data,
}: {
  data: { labels: string[]; values: number[] };
}) {
  console.log('Chart がレンダーされた');
  return (
    <div>
      {data.labels.map((label, i) => (
        <div key={label}>
          {label}: {'|'.repeat(data.values[i])}
        </div>
      ))}
    </div>
  );
});

function Dashboard() {
  const [count, setCount] = useState(0);
  const [sales] = useState([100, 200, 150, 300, 250]);

  // useMemo でオブジェクトの参照を安定させる
  const chartData = useMemo(
    () => ({
      labels: ['月', '火', '水', '木', '金'],
      values: sales,
    }),
    [sales]
  );

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        カウント: {count}
      </button>
      {/* chartData の参照が安定しているので、
          count が変わっても Chart は再レンダーされない */}
      <Chart data={chartData} />
    </div>
  );
}`}
            />
          </section>

          {/* セクション 4: useCallback */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">useCallback: 関数のメモ化</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useCallback は「依存する値が変わらない限り、前回と同じ関数を使い回す」Hook です。
              React.memo でラップされた子コンポーネントに関数を渡すときに特に重要です。
            </p>
            <CodeBlock
              language="tsx"
              title="useCallback の基本構文"
              code={`import { useCallback } from 'react';

const memoizedFunction = useCallback(
  (arg: string) => {
    // 何かの処理
    doSomething(arg);
  },
  [/* 依存配列 */]
);

// useMemo との関係:
// useCallback(fn, deps) は useMemo(() => fn, deps) と同じ`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">実例: リストアイテムへのコールバック</h3>
            <CodeBlock
              language="tsx"
              title="useCallback + memo でリストを最適化"
              showLineNumbers
              code={`import { memo, useState, useCallback } from 'react';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// memo でラップ: props が変わらなければ再レンダーしない
const TodoItem = memo(function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  console.log(\`TodoItem \${id} がレンダーされた\`);

  return (
    <li className="flex items-center gap-3 p-2 border rounded">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span className={completed ? 'line-through text-gray-400' : ''}>
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="ml-auto text-red-500"
      >
        削除
      </button>
    </li>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'デザインレビュー', completed: false },
    { id: 2, text: 'プロトタイプ作成', completed: true },
    { id: 3, text: 'ユーザーテスト', completed: false },
  ]);

  // useCallback で関数をメモ化
  // → todos が変わっても関数の参照は同じ
  const handleToggle = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []); // setTodos の関数形式を使うので依存配列は空でOK

  const handleDelete = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="success" title="setTodos の関数形式がポイント">
                <p>
                  <code>setTodos(prev =&gt; ...)</code> のように関数形式で state を更新すると、
                  コールバック関数が <code>todos</code> を直接参照しなくて済みます。
                  そのため useCallback の依存配列を空にでき、関数が再生成されなくなります。
                  これは非常によく使われるテクニックです。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 5: React DevTools Profiler での計測方法 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React DevTools Profiler で計測する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              パフォーマンス最適化は「勘」で行うべきではありません。
              React DevTools の Profiler を使えば、どのコンポーネントがいつ再レンダーされ、
              どれだけ時間がかかっているかを正確に計測できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Profiler の使い方</h3>
            <div className="bg-muted/30 rounded-xl p-6 mb-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground">
                  <strong>React DevTools 拡張機能をインストール</strong>。
                  Chrome Web Store または Firefox Add-ons から「React Developer Tools」を追加します。
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground">
                  <strong>DevTools を開き「Profiler」タブを選択</strong>。
                  Components タブの右隣にあります。
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground">
                  <strong>録画ボタン（青い丸）をクリック</strong>してから操作し、再度クリックして停止。
                  フレームグラフが表示されます。
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground">
                  <strong>フレームグラフを分析</strong>。黄色やオレンジのバーは再レンダーが重いコンポーネントを示します。
                  グレーのバーは再レンダーがスキップされたコンポーネントです。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="Profiler で確認すべきポイント"
              code={`// Profiler で以下の点を確認する:

// 1. 不要な再レンダーがないか
//    → 変わっていない子コンポーネントが毎回レンダーされていないか
//    → React.memo + useCallback/useMemo で解決

// 2. レンダー時間が長いコンポーネントはないか
//    → 1回のレンダーに 16ms 以上かかると 60fps を下回る
//    → useMemo で重い計算をキャッシュ

// 3. 再レンダーの原因を特定する
//    Profiler の「Why did this render?」機能で原因がわかる
//    （設定でオンにする必要がある）`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="Highlight Updates を活用する">
                <p>
                  React DevTools の Components タブにある設定で「Highlight updates when components render」
                  をオンにすると、再レンダーされたコンポーネントが画面上で光ります。
                  これにより、どの操作でどのコンポーネントが再レンダーされるかを視覚的に確認できます。
                  過剰に光るコンポーネントが最適化の候補です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 6: 過剰な最適化のアンチパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">過剰な最適化のアンチパターン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              useMemo と useCallback は強力なツールですが、使いすぎるとむしろ逆効果になります。
              「すべてをメモ化する」のはアンチパターンです。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">アンチパターン 1: 軽い計算のメモ化</h3>
            <CodeBlock
              language="tsx"
              title="NG: useMemo のコストの方が高い"
              code={`// NG: こんな軽い計算に useMemo は不要
const fullName = useMemo(
  () => \`\${firstName} \${lastName}\`,
  [firstName, lastName]
);

// OK: ただの変数で十分
const fullName = \`\${firstName} \${lastName}\`;

// NG: 短い配列のマップに useMemo は不要
const options = useMemo(
  () => items.map((item) => ({ value: item.id, label: item.name })),
  [items]
);

// OK: items が数十件なら直接計算しても十分高速
const options = items.map((item) => ({ value: item.id, label: item.name }));`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">アンチパターン 2: memo なしの useCallback</h3>
            <CodeBlock
              language="tsx"
              title="NG: 子が memo されていないのに useCallback"
              code={`// NG: Child が memo されていないなら useCallback は無意味
// 親が再レンダーされれば Child は必ず再レンダーされる
function Parent() {
  const handleClick = useCallback(() => {
    console.log('クリック');
  }, []);

  return <Child onClick={handleClick} />; // Child は memo なし
}

function Child({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>クリック</button>;
}

// OK: Child が memo されていないなら普通の関数で十分
function Parent() {
  const handleClick = () => {
    console.log('クリック');
  };

  return <Child onClick={handleClick} />;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">アンチパターン 3: すべてをメモ化する</h3>
            <div className="mb-6">
              <InfoBox type="warning" title="過剰な最適化は害になる">
                <p>
                  useMemo / useCallback 自体にもコスト（メモリ使用量・比較処理）があります。
                  以下の場合は使わないほうがよいです:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>計算が軽い（単純な算術、短い配列の処理）</li>
                  <li>子コンポーネントが React.memo されていない</li>
                  <li>パフォーマンスの問題が実際に起きていない</li>
                  <li>依存配列が頻繁に変わる（メモ化が毎回無効になる）</li>
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* セクション 7: いつ使うべきか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">いつ使うべき？ 判断フローチャート</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最適化を「とりあえず」入れるのは逆効果です。以下の基準で判断しましょう。
            </p>

            <div className="bg-muted/30 rounded-xl p-6 space-y-4 mb-6">
              <h3 className="font-bold text-foreground">useMemo を使う場面</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>計算に明らかに時間がかかる（大量データのフィルター・ソート）</li>
                <li>React.memo された子に渡すオブジェクト props を安定させたい</li>
                <li>useEffect の依存配列に入れるオブジェクトの参照を安定させたい</li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 space-y-4 mb-6">
              <h3 className="font-bold text-foreground">useCallback を使う場面</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>React.memo された子に渡す関数 props を安定させたい</li>
                <li>useEffect の依存配列に入れる関数の参照を安定させたい</li>
                <li>カスタム Hook から返す関数を安定させたい</li>
              </ul>
            </div>
          </section>

          {/* セクション 8: React Compiler の紹介 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">React Compiler: メモ化の自動化</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React チームは <strong>React Compiler</strong>（旧称 React Forget）を開発しています。
              これはビルド時にコードを解析し、useMemo や useCallback を自動的に挿入してくれるコンパイラです。
            </p>

            <div className="bg-muted/30 rounded-xl p-6 mb-6 space-y-3">
              <h3 className="font-bold text-foreground">React Compiler のポイント</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  <strong>手動のメモ化が不要になる</strong>: useMemo, useCallback, React.memo を書かなくても、
                  コンパイラが自動的にメモ化してくれる
                </li>
                <li>
                  <strong>React 19 以降で利用可能</strong>: 既に Meta 社内（Instagram など）で使われており、
                  段階的にオープンソースとして公開されている
                </li>
                <li>
                  <strong>既存のコードと互換性あり</strong>: 手動で書いた useMemo/useCallback があっても問題なく動作する
                </li>
                <li>
                  <strong>コンポーネントのルールに従うことが前提</strong>: 純粋でない関数やルール違反のコードでは
                  最適化がスキップされる
                </li>
              </ul>
            </div>

            <CodeBlock
              language="tsx"
              title="React Compiler 導入前後の比較"
              code={`// React Compiler 導入前: 手動でメモ化が必要
function TodoList({ todos, onToggle }: TodoListProps) {
  const handleToggle = useCallback((id: number) => {
    onToggle(id);
  }, [onToggle]);

  const sortedTodos = useMemo(
    () => [...todos].sort((a, b) => a.text.localeCompare(b.text)),
    [todos]
  );

  return (
    <ul>
      {sortedTodos.map((todo) => (
        <MemoizedTodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </ul>
  );
}

// React Compiler 導入後: シンプルに書くだけでOK
// コンパイラが自動的にメモ化してくれる
function TodoList({ todos, onToggle }: TodoListProps) {
  const sortedTodos = [...todos].sort((a, b) => a.text.localeCompare(b.text));

  return (
    <ul>
      {sortedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
}`}
            />

            <div className="mt-6 mb-6">
              <InfoBox type="info" title="今 useMemo/useCallback を学ぶべき？">
                <p>
                  React Compiler が普及すれば手動のメモ化は減りますが、今学ぶ価値は十分あります。
                  (1) 多くの既存プロジェクトではまだ手動メモ化が必要、
                  (2) コンパイラが何をしているかを理解するには基礎知識が必要、
                  (3) 「なぜメモ化が必要か」を理解することで React の再レンダーの仕組みが深く理解できます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* セクション 9: 実践パターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: 検索フィルター付きの商品一覧</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              3 つのツールを組み合わせた、実用的な例を見てみましょう。
            </p>
            <CodeBlock
              language="tsx"
              title="最適化された商品一覧"
              showLineNumbers
              code={`import { memo, useState, useMemo, useCallback } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// 1. React.memo で子コンポーネントをメモ化
const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (id: number) => void;
}) {
  console.log(\`ProductCard \${product.id} がレンダーされた\`);

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.price.toLocaleString()}円</p>
      <p className="text-sm text-gray-400">{product.category}</p>
      <button
        onClick={() => onAddToCart(product.id)}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        カートに追加
      </button>
    </div>
  );
});

function ProductCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState<number[]>([]);

  // 2. useMemo で重いフィルター処理をキャッシュ
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesQuery = p.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          category === 'all' || p.category === category;
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => a.price - b.price);
  }, [products, query, category]);

  // 3. useCallback でコールバックをメモ化
  const handleAddToCart = useCallback((productId: number) => {
    setCart((prev) => [...prev, productId]);
  }, []);

  // カテゴリ一覧も useMemo でキャッシュ
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="商品を検索..."
          className="border rounded px-3 py-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'すべて' : cat}
            </option>
          ))}
        </select>
        <span className="py-2">カート: {cart.length} 点</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="React.memo でラップしたコンポーネントに、親から毎回新しいオブジェクトを props として渡すとどうなりますか？"
              options={[
                { label: 'React.memo が深い比較を行い、値が同じなら再レンダーをスキップする' },
                { label: 'オブジェクトの参照が毎回変わるため、memo が効かず毎回再レンダーされる', correct: true },
                { label: 'React がエラーを出す' },
                { label: 'React.memo が自動的に useMemo を適用する' },
              ]}
              explanation="React.memo は props を浅い比較（===）で判定します。オブジェクトは毎回新しい参照が作られるため === で false となり、memo が効きません。この問題を解決するには、親コンポーネントで useMemo を使ってオブジェクトの参照を安定させる必要があります。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="useCallback の依存配列を空 [] にしたとき、コールバック内で state の最新値を使うにはどうすべきですか？"
              options={[
                { label: '依存配列に state を追加する' },
                { label: 'state 更新関数の関数形式（prev => ...）を使う', correct: true },
                { label: 'useRef で state を参照する' },
                { label: 'useCallback を使わずに通常の関数として定義する' },
              ]}
              explanation="setTodos(prev => prev.filter(...)) のように関数形式で state を更新すると、コールバック関数が state 変数を直接参照せずに済むため、依存配列を空にできます。これにより関数の参照が安定し、React.memo された子コンポーネントの不要な再レンダーを防げます。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="重い計算のメモ化とフィルタリング"
              description="10,000件の数値配列 numbers を受け取り、(1) query に一致する数値をフィルタリングし、(2) フィルタリング結果の合計を計算するコンポーネントを完成させてください。filteredNumbers と total の両方を useMemo でメモ化してください。query が変わらない限り再計算されないようにします。"
              initialCode={`function NumberFilter({ numbers }: { numbers: number[] }) {
  const [query, setQuery] = useState('');

  // ここに useMemo でフィルタリングを実装
  const filteredNumbers = numbers; // TODO: useMemo で実装

  // ここに useMemo で合計を計算
  const total = 0; // TODO: useMemo で実装

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="数値で絞り込み..."
      />
      <p>件数: {filteredNumbers.length} / 合計: {total}</p>
      <ul>
        {filteredNumbers.slice(0, 100).map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}`}
              answer={`function NumberFilter({ numbers }: { numbers: number[] }) {
  const [query, setQuery] = useState('');

  const filteredNumbers = useMemo(() => {
    if (!query) return numbers;
    return numbers.filter((n) =>
      String(n).includes(query)
    );
  }, [numbers, query]);

  const total = useMemo(() => {
    return filteredNumbers.reduce((sum, n) => sum + n, 0);
  }, [filteredNumbers]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="数値で絞り込み..."
      />
      <p>件数: {filteredNumbers.length} / 合計: {total}</p>
      <ul>
        {filteredNumbers.slice(0, 100).map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}`}
              keywords={['useMemo(', 'filteredNumbers', '.reduce(', '[numbers, query]']}
              hints={[
                'useMemo(() => { ... }, [依存値]) の形で filteredNumbers を計算します。依存値は numbers と query です。',
                'total は filteredNumbers に依存するので、filteredNumbers を依存配列に入れた別の useMemo で計算します。',
                'reduce で合計を計算: filteredNumbers.reduce((sum, n) => sum + n, 0)',
              ]}
            />
          </section>

          {/* セクション 10: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="bg-muted/30 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">1</span>
                <p className="text-muted-foreground"><strong>React.memo</strong> はコンポーネントをメモ化。props が変わらなければ再レンダーをスキップ</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">2</span>
                <p className="text-muted-foreground"><strong>useMemo</strong> は計算結果をキャッシュ。重いフィルターやオブジェクト props の安定化に使う</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">3</span>
                <p className="text-muted-foreground"><strong>useCallback</strong> は関数をメモ化。React.memo された子への関数 props を安定化させる</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">4</span>
                <p className="text-muted-foreground"><strong>React DevTools Profiler</strong> で計測してから最適化する。勘ではなくデータに基づいて判断</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">5</span>
                <p className="text-muted-foreground"><strong>過剰な最適化は逆効果</strong>。軽い計算のメモ化や、memo なし子への useCallback は不要</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">6</span>
                <p className="text-muted-foreground"><strong>React Compiler</strong> が将来的に自動メモ化を実現する。今の知識は基礎として重要</p>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'useMemo - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react/useMemo',
                  description: 'useMemo の API 仕様、使い方、注意点を網羅した公式ドキュメント',
                },
                {
                  title: 'useCallback - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react/useCallback',
                  description: 'useCallback の API 仕様と useMemo との関係を解説',
                },
                {
                  title: 'memo - React 公式リファレンス',
                  url: 'https://ja.react.dev/reference/react/memo',
                  description: 'React.memo の使い方とカスタム比較関数の設定方法',
                },
                {
                  title: 'React Compiler - React 公式ドキュメント',
                  url: 'https://ja.react.dev/learn/react-compiler',
                  description: 'React Compiler の概要、導入方法、現在の状況',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'useMemo と useCallback の違いは何ですか？',
                  answer: 'useMemo は「計算結果の値」をキャッシュし、useCallback は「関数自体」をキャッシュします。実は useCallback(fn, deps) は useMemo(() => fn, deps) と同じ動作です。useCallback は関数のメモ化に特化した便利な書き方と考えてください。',
                },
                {
                  question: 'React.memo のカスタム比較関数はどう使いますか？',
                  answer: 'memo の第2引数に比較関数を渡せます。例えば memo(Component, (prevProps, nextProps) => prevProps.id === nextProps.id) のように書くと、id が同じなら再レンダーをスキップします。ただし、カスタム比較は複雑になりがちなので、通常はデフォルトの浅い比較 + useMemo/useCallback で十分です。',
                },
                {
                  question: 'React Compiler はいつ使えるようになりますか？',
                  answer: 'React Compiler は React 19 以降で利用可能で、既にオープンソースとして公開されています。babel-plugin-react-compiler をインストールすることで導入できます。ただし安定版としての成熟度はプロジェクトによって判断が必要です。React 公式ブログやドキュメントで最新の状況を確認してください。',
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
