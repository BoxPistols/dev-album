import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function HelloReact() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 3</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          Hello React
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React とは何か？を理解し、プロジェクトの構成を把握して、
          最初のコード変更を行いましょう。
        </p>

        <WhyNowBox tags={['React', 'UI ライブラリ', 'コンポーネント指向', 'SPA']}>
          <p>
            React は Meta（旧 Facebook）が開発した UI ライブラリで、
            Instagram、Netflix、Airbnb、Notion など、世界中の主要なWebサービスで使われています。
            求人サイトで「フロントエンドエンジニア」を検索すると、ほぼ全てで React のスキルが求められるほど、
            業界標準の技術です。デザイナーが React を学ぶことは、デザインと実装の橋渡し能力を手に入れることを意味します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* React が生まれた背景 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">React が生まれた背景</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React が登場する前、Web の UI 開発には大きな課題がありました。
              その背景を知ることで、なぜ React が必要とされたのかが理解できます。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">jQuery 時代の限界</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              2010年代初頭、Web 開発では jQuery というライブラリが主流でした。
              jQuery は DOM（ブラウザに表示される HTML の要素ツリー）を直接操作してUIを更新する仕組みです。
              しかし、Facebook のニュースフィードのように<strong>大量のデータがリアルタイムに変化する UI</strong> では、
              「どの要素を」「どのタイミングで」「どう更新するか」をすべて手動で管理する必要があり、
              コードが複雑化し、バグが頻発しました。
            </p>

            <CodeBlock
              code={`// jQuery 時代の書き方（イメージ）
// 「通知が来たら、通知カウンターを見つけて、数字を更新して、色を変えて...」
$('#notification-count').text(newCount);
$('#notification-count').addClass('has-notification');
$('#notification-list').append('<li>' + message + '</li>');
// 管理する要素が増えるほど、コードは複雑になる...`}
              language="javascript"
              title="jQuery 時代の DOM 操作（イメージ）"
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              Facebook のエンジニアである Jordan Walke は、この問題を解決するために
              2013年に React をオープンソースとして公開しました。
              React の発想は画期的でした。「DOM を直接いじるのではなく、
              <strong>あるべき UI の状態を宣言すれば、差分は自動で計算して反映する</strong>」というものです。
            </p>

            <InfoBox type="info" title="デザイナーにとっての意味">
              <p>
                デザイナーが Figma で「通知がある状態」と「ない状態」のバリアントを作るのと同じです。
                React では「この状態のとき、UI はこう見える」と宣言するだけ。
                状態が変わったときの遷移アニメーションや DOM 操作は React が面倒を見てくれます。
                この「宣言的 UI」の考え方は、デザインツールの発想ととても相性が良いのです。
              </p>
            </InfoBox>
          </section>

          {/* React とは何か？ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">React とは何か？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React を一言で言うと、<strong>UI（ユーザーインターフェース）を構築するための JavaScript ライブラリ</strong>です。
              デザイナーにとって馴染みのある言葉で説明すると、以下の3つが React の核心です。
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-3">
                  <span className="text-blue-600 dark:text-blue-400 text-lg font-bold">1</span>
                </div>
                <h4 className="font-bold text-foreground mb-2 text-sm">コンポーネント指向</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Figma でボタンやカードを「コンポーネント」として作るように、
                  React でも UI をコンポーネント単位で構築します。
                  再利用でき、組み合わせて画面を作ります。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mb-3">
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg font-bold">2</span>
                </div>
                <h4 className="font-bold text-foreground mb-2 text-sm">宣言的</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  「この状態のとき、UIはこう見える」と宣言するだけ。
                  データが変わったときのDOM操作は React が自動でやってくれます。
                  デザイナーが「状態A のときのデザイン」を作るのと同じ発想です。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-3">
                  <span className="text-violet-600 dark:text-violet-400 text-lg font-bold">3</span>
                </div>
                <h4 className="font-bold text-foreground mb-2 text-sm">仮想 DOM</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  React は画面の変更点だけを効率的に更新します。
                  全体を再描画するのではなく、変わった部分だけを更新するので高速です。
                </p>
              </div>
            </div>

            <InfoBox type="info" title="ライブラリ vs フレームワーク">
              <p>
                React は「ライブラリ」であり、Vue.js や Angular のような「フレームワーク」とは少し違います。
                React 自体は UI の描画に特化しており、ルーティングや状態管理は別のライブラリと組み合わせます。
                この柔軟さが React の強みですが、選択肢が多すぎて迷うこともあります。
                このマニュアルでは迷わないよう、おすすめの構成をガイドします。
              </p>
            </InfoBox>
          </section>

          {/* 仮想 DOM の仕組み */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">仮想 DOM の仕組み</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React の高速さの秘密が<strong>仮想 DOM（Virtual DOM）</strong>です。
              少し技術的な話ですが、デザイナーでも理解できるようにイメージで説明します。
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-3 text-sm">通常の DOM 操作（仮想 DOM なし）</h4>
                <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <p>1. データが変わる</p>
                  <p>2. ページ全体、もしくは手動で指定した要素を更新</p>
                  <p>3. 不要な再描画が発生し、パフォーマンスが低下</p>
                  <p className="mt-2 font-medium text-red-500 dark:text-red-400">
                    例えるなら: 1文字の誤字を直すために、原稿全体を印刷し直すようなもの
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-3 text-sm">仮想 DOM あり（React）</h4>
                <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <p>1. データが変わる</p>
                  <p>2. React がメモリ上に「仮想の」DOM ツリーを作成</p>
                  <p>3. 前回の仮想 DOM と比較（差分検出 = Reconciliation）</p>
                  <p>4. 変わった部分だけを実際の DOM に反映</p>
                  <p className="mt-2 font-medium text-green-500 dark:text-green-400">
                    例えるなら: 修正箇所だけに修正テープを貼って直すようなもの
                  </p>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`// イメージ: React が裏でやっていること

// 1. 現在の仮想 DOM
const oldVDOM = {
  type: 'div',
  children: [
    { type: 'h1', text: 'カウント: 0' },  // ← ここが変わる
    { type: 'p', text: '説明文' },         // ← 変わらない
  ]
}

// 2. 状態変更後の新しい仮想 DOM
const newVDOM = {
  type: 'div',
  children: [
    { type: 'h1', text: 'カウント: 1' },  // ← 変わった！
    { type: 'p', text: '説明文' },         // ← 同じ
  ]
}

// 3. React が差分を検出し、h1 の中身だけを実際の DOM に反映する
// → p タグは触らないので高速！`}
              language="tsx"
              title="仮想 DOM の差分検出イメージ（実際のコードではありません）"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              このように、React は毎回「あるべき UI 全体」を仮想的に計算し、
              前の状態との差分だけを実際のブラウザに反映します。
              開発者は「今の状態のとき UI はこう見えるべき」と宣言するだけでよく、
              更新の最適化は React が自動で行ってくれるのです。
            </p>

            <InfoBox type="info" title="仮想 DOM は理解しなくても使える">
              <p>
                仮想 DOM の仕組みを完全に理解していなくても、React は問題なく使えます。
                大切なのは「React が効率的に画面を更新してくれる」という事実を知っておくことです。
                面接で聞かれることもあるので、イメージだけでも掴んでおくとよいでしょう。
              </p>
            </InfoBox>
          </section>

          {/* SPA とは何か */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">SPA（シングルページアプリケーション）とは</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React で作られるアプリケーションの多くは <strong>SPA</strong>（Single Page Application）と呼ばれる形式です。
              従来の Web サイトとの違いを理解しましょう。
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-3 text-sm">従来の Web サイト（MPA）</h4>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>ページ遷移のたびにサーバーから新しい HTML を取得</li>
                  <li>遷移のたびに画面が白くなる（リロード）</li>
                  <li>ページごとに独立した HTML ファイルがある</li>
                  <li>例: 会社のコーポレートサイト、ブログなど</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-3 text-sm">SPA（React アプリ）</h4>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>最初に1つの HTML を読み込み、以降は JavaScript が画面を切り替え</li>
                  <li>ページ遷移がスムーズ（リロードなし）</li>
                  <li>ネイティブアプリのような滑らかな操作感</li>
                  <li>例: Gmail、Notion、Figma の Web 版など</li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              SPA では、ブラウザが最初に空の HTML と JavaScript を読み込み、
              その後の画面遷移やデータの表示はすべて JavaScript が担当します。
              サーバーとの通信は必要なデータだけを API で取得するため、
              画面全体をリロードする必要がなく、非常にスムーズな体験を提供できます。
            </p>

            <InfoBox type="info" title="デザイナーの視点: プロトタイプとの類似性">
              <p>
                Figma のプロトタイプ機能でページ遷移をシミュレーションするとき、
                画面がスムーズに切り替わりますよね。SPA はまさにそのイメージです。
                遷移トランジションやアニメーションも自由に設定でき、
                デザイナーが意図した UX を忠実に再現できます。
              </p>
            </InfoBox>
          </section>

          {/* プロジェクト構造 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">プロジェクト構造を理解する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              STEP 2 で作成した React プロジェクトの中で、特に重要な3つのファイルを見ていきましょう。
              React アプリがどのように動いているかを理解する鍵になります。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">index.html - すべての起点</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              プロジェクトのルートにある <code className="bg-muted px-1 py-0.5 rounded text-xs">index.html</code> を開いてみてください。
            </p>
            <CodeBlock
              code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`}
              language="html"
              title="index.html"
              showLineNumbers
            />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              注目すべきは2つ。<code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;div id="root"&gt;&lt;/div&gt;</code> という空の div と、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">src/main.tsx</code> を読み込む script タグです。
              React はこの空の div の中に、JavaScript で UI を組み立てていきます。
              SPA の特徴そのものですね。HTML はほぼ空で、中身はすべて JavaScript が生成します。
            </p>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">main.tsx - React のエントリーポイント</h3>
            <CodeBlock
              code={`import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`}
              language="tsx"
              title="src/main.tsx"
              showLineNumbers
            />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              このファイルが最初に実行されます。やっていることはシンプルです。
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside ml-2">
              <li><code className="bg-muted px-1 py-0.5 rounded text-xs">document.getElementById('root')</code> で index.html の空の div を取得</li>
              <li><code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;App /&gt;</code> コンポーネントをその中に描画（レンダリング）</li>
            </ul>

            <div className="mt-4">
              <InfoBox type="info" title="React.StrictMode とは？">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">React.StrictMode</code> は開発時のみ有効なチェック機能です。
                  潜在的な問題（非推奨APIの使用、副作用のバグなど）を検出して警告を出してくれます。
                  本番環境では自動的に無効化されるため、パフォーマンスに影響はありません。
                  開発中に「なぜか2回レンダリングされる」と感じたら、それは StrictMode の仕様です。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">App.tsx - メインのコンポーネント</h3>
            <CodeBlock
              code={`import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App`}
              language="tsx"
              title="src/App.tsx"
              showLineNumbers
            />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              これが実際にブラウザに表示されているコンポーネントです。
              今は全てを理解する必要はありません。HTML のような見た目のコードが書かれていることだけ確認してください。
              この「HTML のようなもの」が <strong>JSX</strong> と呼ばれ、次の STEP 4 で詳しく学びます。
            </p>
          </section>

          {/* 最初のコード変更 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">最初のコード変更 - Hello React!</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              では、実際にコードを変更してみましょう。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">src/App.tsx</code> を開き、内容を以下のように書き換えてください。
            </p>

            <CodePreview
              code={`function App() {
  return (
    <div>
      <h1>Hello React!</h1>
      <p>はじめての React アプリケーションです。</p>
    </div>
  )
}
`}
              language="tsx"
              title="src/App.tsx（書き換え後）→ 右がブラウザ表示"
              previewHeight={160}
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              ファイルを保存すると（<code className="bg-muted px-1 py-0.5 rounded text-xs">Cmd + S</code>）、
              ブラウザが<strong>自動的に更新</strong>されて「Hello React!」と表示されるはずです。
            </p>

            <InfoBox type="success" title="HMR（ホットモジュールリプレースメント）">
              <p>
                この「保存すると自動で更新される」機能を <strong>HMR</strong>（Hot Module Replacement）と呼びます。
                Vite の HMR は非常に高速で、変更した部分だけを瞬時に反映します。
                ページ全体をリロードする必要がないため、開発効率が大幅に上がります。
                デザインツールのプレビューが即座に更新されるのと同じ感覚です。
              </p>
            </InfoBox>

            <p className="text-muted-foreground mt-4 leading-relaxed">
              ここで起きたことを振り返りましょう。あなたが行ったのは「App.tsx を書き換えて保存した」だけです。
              しかし裏では、Vite が変更を検知し、ブラウザに新しいコードを送り、
              React が仮想 DOM の差分を計算して画面を更新しました。
              この一連の流れが一瞬で行われるのが、モダン開発環境の魅力です。
            </p>
          </section>

          {/* レンダリングの流れ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">レンダリングの流れを理解する</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              React アプリが画面に表示されるまでの流れを整理しましょう。
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">ブラウザが index.html を読み込む</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    空の <code className="bg-muted px-1 py-0.5 rounded">&lt;div id="root"&gt;</code> と main.tsx への参照が含まれている
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground text-lg">&#8595;</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">main.tsx が実行される</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <code className="bg-muted px-1 py-0.5 rounded">ReactDOM.createRoot</code> で root 要素を取得し、App コンポーネントを描画
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground text-lg">&#8595;</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-violet-600 dark:text-violet-400 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">React が仮想 DOM を構築</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    App 関数が返す JSX をもとに、メモリ上に仮想 DOM ツリーを作成する
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground text-lg">&#8595;</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">実際の DOM に反映</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    仮想 DOM の内容が実際の HTML 要素として root div の中に描画される
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground text-lg">&#8595;</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">5</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">ブラウザに表示される</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    「Hello React!」がブラウザに表示される。以降、コードを変更すると HMR が差分だけ更新
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* もう少し変更してみる */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">もう少し変更してみよう</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              コードを書き換える感覚に慣れるため、もう少し変更を加えてみましょう。
              以下のように App.tsx を編集してみてください。
            </p>

            <CodePreview
              code={`function App() {
  const name = "あなたの名前"
  const today = new Date().toLocaleDateString('ja-JP')

  return (
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <h1>こんにちは、{name} さん！</h1>
      <p>今日は {today} です。</p>
      <p>React の学習をはじめましょう。</p>
    </div>
  )
}
`}
              language="tsx"
              title="変数を JSX に埋め込む → 右が結果"
              previewHeight={180}
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{name}'}</code> のように波括弧で囲むと、
              JavaScript の変数をHTMLの中に埋め込むことができます。これが JSX の強力な機能の一つです。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">"あなたの名前"</code> の部分を自分の名前に変えて、
              保存してブラウザを確認してみてください。
            </p>

            <div className="mt-4">
              <InfoBox type="warning" title="style の書き方に注意">
                <p>
                  HTML では <code className="bg-muted px-1 py-0.5 rounded text-xs">style="text-align: center"</code> と書きますが、
                  JSX では <code className="bg-muted px-1 py-0.5 rounded text-xs">style={'{'}{'{'} textAlign: 'center' {'}'}{'}'}
                  </code> と書きます。
                  ケバブケース（text-align）ではなくキャメルケース（textAlign）を使い、オブジェクト形式で指定します。
                  CSS スタイリングの詳細は STEP 17 以降で学びます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* Vite の便利機能 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">Vite の便利機能をもう少し知ろう</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React プロジェクトの開発を支えている Vite には、HMR 以外にも知っておくと便利な機能があります。
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 dark:text-amber-400 text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">高速な起動</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Vite は ESModules を活用しているため、プロジェクトの規模に関わらず数秒で開発サーバーが立ち上がります。
                    以前の主流だった webpack では、大きなプロジェクトだと起動に数十秒かかることもありました。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 dark:text-amber-400 text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">エラーオーバーレイ</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    コードにエラーがあると、ブラウザの画面上に分かりやすいエラーメッセージが表示されます。
                    ターミナルを見に行かなくても、何が間違っているかすぐに分かります。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 dark:text-amber-400 text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">TypeScript サポート</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    追加の設定なしで TypeScript（.tsx ファイル）がそのまま使えます。
                    型チェックは VS Code が担当し、Vite はトランスパイルに集中する分業体制です。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 理解度チェック: Quiz 1 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの内容を振り返って、理解度を確認しましょう。
            </p>

            <Quiz
              question="React の特徴として正しいのはどれ？"
              options={[
                { label: 'React はフレームワークであり、ルーティングや状態管理もすべて組み込まれている', correct: false },
                { label: 'React は UI の構築に特化したライブラリで、コンポーネント指向・宣言的・仮想 DOM が特徴', correct: true },
                { label: 'React は HTML をそのまま使い、JavaScript は補助的にしか使わない', correct: false },
              ]}
              explanation="React は UI ライブラリです。ルーティングや状態管理は React Router や Redux など別のライブラリと組み合わせます。コンポーネント指向、宣言的な記述、仮想 DOM による効率的な更新が React の3大特徴です。"
            />

            <Quiz
              question="仮想 DOM の説明として正しいのはどれ？"
              options={[
                { label: '仮想 DOM はブラウザに新しく追加された標準機能で、すべてのWebサイトで使われている', correct: false },
                { label: '仮想 DOM を使うと、画面全体を毎回完全に再描画するため表示が遅くなる', correct: false },
                { label: '仮想 DOM はメモリ上に UI のツリーを保持し、前回との差分だけを実際の DOM に反映する仕組み', correct: true },
              ]}
              explanation="仮想 DOM は React がメモリ上に持つ UI のコピーです。状態が変わると、新しい仮想 DOM と古い仮想 DOM を比較し（差分検出）、変わった部分だけを実際の DOM に反映します。これにより無駄な再描画を減らし、高速な更新を実現しています。"
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">チャレンジしてみよう</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              学んだことを活かして、App.tsx を自分で書き換えてみましょう。
            </p>

            <CodingChallenge
              title="App.tsx を書き換えて自己紹介を表示しよう"
              description="App コンポーネントを書き換えて、自分の名前と好きなことを表示してください。name 変数に自分の名前、hobby 変数に趣味を入れて、JSX の中で波括弧 { } を使って埋め込みましょう。"
              preview
              initialCode={`function App() {
  const name = ""
  const hobby = ""

  return (
    <div>
      <h1>自己紹介</h1>
      {/* ここに名前と趣味を表示 */}
    </div>
  )
}

export default App`}
              answer={`function App() {
  const name = "田中太郎"
  const hobby = "UIデザイン"

  return (
    <div>
      <h1>自己紹介</h1>
      <p>名前: {name}</p>
      <p>趣味: {hobby}</p>
    </div>
  )
}

export default App`}
              keywords={['{name}', '{hobby}']}
              hints={[
                'name と hobby に文字列を代入しましょう（例: "太郎"、"読書"）',
                'JSX の中で {name} のように波括弧を使うと変数の値を表示できます',
                '<p>名前: {name}</p> のように書いてみましょう',
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
                  <span>React は Facebook が開発した <strong>コンポーネント指向</strong> の UI ライブラリである</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>「宣言的 UI」の考え方で、状態に応じた見た目を定義するだけでよい</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><strong>仮想 DOM</strong> により、差分だけを効率的に更新できる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>React アプリは <strong>SPA</strong>（シングルページアプリケーション）で、ページ遷移がスムーズ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>レンダリングの流れ: <strong>index.html → main.tsx → App.tsx → 仮想 DOM → ブラウザ</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>App.tsx のコードを変更して「Hello React!」を表示できた</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><strong>HMR</strong> により、保存するだけでブラウザが自動更新される</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>JSX の中で <code className="bg-muted px-1 py-0.5 rounded">{'{ }'}</code> を使って JavaScript の値を埋め込める</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 公式: クイックスタート',
                  url: 'https://react.dev/learn',
                  description: 'React の基本概念を公式チュートリアルで学ぶ',
                },
                {
                  title: 'React 公式: React について考える',
                  url: 'https://react.dev/learn/thinking-in-react',
                  description: 'React 的な考え方を身につけるための公式ガイド',
                },
                {
                  title: 'Vite 公式ドキュメント',
                  url: 'https://vitejs.dev/guide/',
                  description: 'Vite の機能や設定について詳しく知りたい場合',
                },
                {
                  title: 'MDN: DOM の紹介',
                  url: 'https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model/Introduction',
                  description: 'DOM とは何かを基礎から理解したい場合',
                },
              ]}
            />
          </section>

          {/* よくある質問 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">よくある質問</h2>
            <Faq
              items={[
                {
                  question: 'React は難しいですか？',
                  answer: 'HTML と CSS の基礎知識があれば、React の基本は意外とスムーズに学べます。JSX は HTML に似ているため、デザイナーにとっても馴染みやすい構文です。ただし、状態管理やパフォーマンス最適化など、高度なトピックは実務経験を積みながら少しずつ身につけていくものです。このマニュアルではステップバイステップで進めるので、焦らず一つずつ理解していきましょう。',
                },
                {
                  question: 'Vue.js との違いは何ですか？',
                  answer: 'Vue.js も優れた UI ライブラリですが、いくつかの違いがあります。React は JSX という JavaScript 寄りの構文を使い、Vue はテンプレート構文（HTML に近い書き方）を使います。React はライブラリなので構成の自由度が高い反面、Vue はフレームワークとして必要な機能が最初から揃っています。求人数や学習リソースの量では React が優勢です。どちらを学んでも、もう一方への移行は比較的容易です。',
                },
                {
                  question: 'デザイナーでも React を使えるようになりますか？',
                  answer: 'もちろんです。むしろデザイナーには「コンポーネント思考」という強力な武器があります。Figma でコンポーネントやバリアントを作った経験は、React のコンポーネント設計にそのまま活かせます。また、JSX は見た目が HTML に近いため、マークアップの経験があればスムーズに書き始められます。デザイナーが React を学ぶことで、エンジニアとの協業がよりスムーズになり、プロトタイプの実装やデザインシステムの構築にも貢献できるようになります。',
                },
                {
                  question: 'TypeScript は必須ですか？',
                  answer: 'React は JavaScript（.jsx）でも TypeScript（.tsx）でも書けます。TypeScript は必須ではありませんが、現在のフロントエンド開発ではほぼ標準になっています。TypeScript を使うと、VS Code の補完が強力になり、変数の型ミスなどのバグを事前に防げます。このマニュアルでは TypeScript を使いますが、STEP 7 で基礎から説明するので心配はいりません。最初は「型のある JavaScript」くらいの認識で大丈夫です。',
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
