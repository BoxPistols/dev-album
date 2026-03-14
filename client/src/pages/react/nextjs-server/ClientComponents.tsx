import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function ClientComponents() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 39</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Client Components</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          'use client' ディレクティブを使って Client Component を定義する方法と、Server Component との使い分けを学びます。
          インタラクティブな UI を構築するための重要な概念です。
        </p>

        <WhyNowBox tags={['use client', 'Hooks', 'インタラクティブ', 'コンポジション']}>
          <p>
            Server Components だけでは、ボタンのクリック、フォーム入力、アニメーションなどのインタラクティブな機能は実現できません。
            Client Component を適切に使い分けることで、パフォーマンスとインタラクティビティの両方を実現するアプリを作れます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: 'use client' ディレクティブ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">'use client' ディレクティブ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ファイルの先頭に <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> と書くことで、
              そのファイル内のコンポーネントが Client Component になります。
              Client Component は従来の React と同じように、ブラウザ上で実行されます。
            </p>

            <CodeBlock
              code={`'use client'; // ← この1行を追加するだけ

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-lg">
      <p className="text-2xl font-bold">{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        カウントアップ
      </button>
    </div>
  );
}

// 'use client' がないと以下のエラーが出る:
// Error: useState は Client Component でのみ使えます。
// ファイルの先頭に 'use client' を追加してください。`}
              language="tsx"
              title="Client Component の基本"
            />

            <InfoBox type="warning" title="'use client' の注意点">
              <p>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> はファイルの最初の文（インポートの前）に書く必要があります。
                また、<code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> を書いたファイルからインポートされるすべてのモジュールも
                Client Component として扱われます（Client 境界の伝播）。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: Client Component が必要な場面 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Client Component が必要な場面</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              以下のいずれかが必要な場合は Client Component にする必要があります。
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">React Hooks を使うとき</h3>
                <CodeBlock
                  code={`'use client';

import { useState, useEffect, useRef } from 'react';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 検索クエリが変更されたら API を呼ぶ
    if (query.length > 2) {
      fetch(\`/api/search?q=\${query}\`)
        .then(res => res.json())
        .then(data => setResults(data));
    }
  }, [query]);

  useEffect(() => {
    // コンポーネントマウント時に入力欄にフォーカス
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索..."
        className="border rounded px-3 py-2 w-full"
      />
      <ul className="mt-2">
        {results.map((r: { id: number; title: string }) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}`}
                  language="tsx"
                  title="Hooks を使うコンポーネント"
                />
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">イベントハンドラを使うとき</h3>
                <CodeBlock
                  code={`'use client';

import { useState } from 'react';

export default function ToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded"
      >
        {isOpen ? '閉じる' : 'メニュー'}
      </button>

      {isOpen && (
        <nav className="mt-2 p-4 border rounded-lg shadow-lg">
          <a href="/about" className="block py-2 hover:text-blue-600">
            会社概要
          </a>
          <a href="/services" className="block py-2 hover:text-blue-600">
            サービス
          </a>
          <a href="/contact" className="block py-2 hover:text-blue-600">
            お問い合わせ
          </a>
        </nav>
      )}
    </div>
  );
}`}
                  language="tsx"
                  title="イベントハンドラを使うコンポーネント"
                />
              </div>

              <div className="rounded-lg border border-border p-5">
                <h3 className="font-bold text-foreground mb-2">ブラウザ API を使うとき</h3>
                <CodeBlock
                  code={`'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // ブラウザの localStorage からテーマを読み込み
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-100">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}`}
                  language="tsx"
                  title="ブラウザ API を使うコンポーネント"
                />
              </div>
            </div>
          </section>

          {/* セクション 3: コンポジションパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">コンポジションパターン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Component と Client Component を組み合わせるときのパターンを学びましょう。
              最も重要なのは「Server Component を Client Component の子として渡す」パターンです。
            </p>

            <CodeBlock
              code={`// パターン 1: Server Component から Client Component を使う（基本）
// app/page.tsx (Server Component)
import { InteractiveChart } from '@/components/InteractiveChart';

export default async function Dashboard() {
  // サーバーでデータを取得
  const data = await fetch('https://api.example.com/stats').then(
    res => res.json()
  );

  return (
    <div>
      <h1>ダッシュボード</h1>
      {/* データを Props として Client Component に渡す */}
      <InteractiveChart data={data} />
    </div>
  );
}

// components/InteractiveChart.tsx (Client Component)
'use client';
import { useState } from 'react';

export function InteractiveChart({ data }: { data: number[] }) {
  const [selectedRange, setSelectedRange] = useState('week');
  // ... チャートのインタラクティブな機能
  return <div>チャート表示</div>;
}`}
              language="tsx"
              title="パターン 1: 基本的な組み合わせ"
            />

            <CodeBlock
              code={`// パターン 2: children を使って Server Component を Client Component に渡す
// これが最も重要なパターン！

// components/Sidebar.tsx (Client Component)
'use client';
import { useState, ReactNode } from 'react';

export function Sidebar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <aside className={\`\${isOpen ? 'w-64' : 'w-0'} transition-all overflow-hidden\`}>
        {children}  {/* ← Server Component の内容がここに入る */}
      </aside>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '閉じる' : '開く'}
      </button>
    </div>
  );
}

// app/dashboard/layout.tsx (Server Component)
import { Sidebar } from '@/components/Sidebar';
import { NavigationLinks } from '@/components/NavigationLinks';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // サーバーでナビゲーションデータを取得
  const navItems = await getNavItems();

  return (
    <Sidebar>
      {/* NavigationLinks は Server Component のまま */}
      <NavigationLinks items={navItems} />
    </Sidebar>
  );
}`}
              language="tsx"
              title="パターン 2: children パターン（重要）"
            />

            <InfoBox type="success" title="children パターンの威力">
              <p>
                Client Component の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">children</code> として
                Server Component を渡すと、子コンポーネントは Server Component のまま保たれます。
                これにより、インタラクティブな「枠」の中に、サーバーで取得したデータを持つコンポーネントを入れることができます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 4: Server / Client 境界のルール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Server / Client 境界のルール</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Component と Client Component の境界にはいくつかのルールがあります。
              これらを理解しておくと、エラーを避けながら効率的にアプリを構築できます。
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">できること</h4>
                <ul className="text-sm text-foreground/80 space-y-1.5">
                  <li>Server Component から Client Component をインポートして使う</li>
                  <li>Server Component から Client Component に Props（シリアライズ可能なもの）を渡す</li>
                  <li>Client Component の children に Server Component を渡す</li>
                  <li>Server Component と Client Component を同じページに混在させる</li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">できないこと</h4>
                <ul className="text-sm text-foreground/80 space-y-1.5">
                  <li>Client Component から Server Component を直接インポートして使う</li>
                  <li>Server Component に関数を Props として渡す（シリアライズできないため）</li>
                  <li>Server Component で Hooks やイベントハンドラを使う</li>
                  <li>Client Component で async コンポーネントを定義する</li>
                </ul>
              </div>
            </div>

            <CodeBlock
              code={`// NG: Client Component で Server Component をインポート
'use client';
import ServerComponent from './ServerComponent';
// → ServerComponent は Client Component として扱われ、
//   サーバー専用の機能（async、DB アクセス等）が使えなくなる

export default function ClientWrapper() {
  return <ServerComponent />; // Server Component の特性が失われる
}

// OK: children パターンを使う
'use client';
import { ReactNode } from 'react';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <div className="interactive-wrapper">{children}</div>;
}

// 親の Server Component で組み合わせる
// app/page.tsx
import ClientWrapper from './ClientWrapper';
import ServerComponent from './ServerComponent';

export default function Page() {
  return (
    <ClientWrapper>
      <ServerComponent />  {/* children として渡すのはOK */}
    </ClientWrapper>
  );
}`}
              language="tsx"
              title="境界のルールの具体例"
            />
          </section>

          {/* セクション 5: Props のシリアライズ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props のシリアライズ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Server Component から Client Component に Props を渡すとき、
              その値はネットワークを通じて送られるため「シリアライズ可能」である必要があります。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">型</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">渡せる？</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">例</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono">string, number, boolean</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">OK</td>
                    <td className="py-3 px-4 font-mono text-xs">{`name="太郎" count={42}`}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono">null, undefined</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">OK</td>
                    <td className="py-3 px-4 font-mono text-xs">{`data={null}`}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono">Array, Object（プレーン）</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">OK</td>
                    <td className="py-3 px-4 font-mono text-xs">{`items={[1, 2, 3]}`}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono">Date</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">OK</td>
                    <td className="py-3 px-4 font-mono text-xs">{`date={new Date()}`}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-mono">Function</td>
                    <td className="py-3 px-4 text-red-600 font-semibold">NG</td>
                    <td className="py-3 px-4 font-mono text-xs">{`onClick={() => {}}`}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono">Class インスタンス</td>
                    <td className="py-3 px-4 text-red-600 font-semibold">NG</td>
                    <td className="py-3 px-4 font-mono text-xs">{`user={new User()}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="関数が渡せない場合の対処法">
              <p>
                Server Component からイベントハンドラ（関数）を渡すことはできませんが、
                Server Actions を使えば Server Component からフォーム送信や更新処理を実行できます。
                Server Actions については Step 40 で詳しく学びます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 6: 判断フローチャート */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Server / Client の判断フロー</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コンポーネントを Server と Client のどちらにするか迷ったときは、以下のフローで判断しましょう。
            </p>

            <div className="rounded-lg border border-border p-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">1</span>
                <div>
                  <p className="font-semibold text-foreground">useState / useEffect / useRef を使う？</p>
                  <p className="text-sm text-muted-foreground">はい → Client Component</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">2</span>
                <div>
                  <p className="font-semibold text-foreground">onClick / onChange などのイベントを使う？</p>
                  <p className="text-sm text-muted-foreground">はい → Client Component</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">3</span>
                <div>
                  <p className="font-semibold text-foreground">window / document / localStorage を使う？</p>
                  <p className="text-sm text-muted-foreground">はい → Client Component</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex-shrink-0">4</span>
                <div>
                  <p className="font-semibold text-foreground">サードパーティのインタラクティブライブラリを使う？</p>
                  <p className="text-sm text-muted-foreground">はい → Client Component（ラッパーを作る）</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex-shrink-0">5</span>
                <div>
                  <p className="font-semibold text-foreground">上記に該当しない？</p>
                  <p className="text-sm text-muted-foreground">Server Component のまま（デフォルト）</p>
                </div>
              </div>
            </div>

            <InfoBox type="success" title="迷ったら Server Component">
              <p>
                判断に迷ったらまず Server Component として書き始め、エラーが出たり
                インタラクティブ性が必要になったタイミングで <code className="text-sm bg-muted px-1.5 py-0.5 rounded">'use client'</code> を追加しましょう。
                この「必要になるまで Client にしない」アプローチが推奨されています。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Client Components - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/rendering/client-components',
                  description: 'Client Components の使い方と制約',
                },
                {
                  title: 'Composition Patterns - Next.js',
                  url: 'https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns',
                  description: 'Server/Client Component の構成パターン',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
