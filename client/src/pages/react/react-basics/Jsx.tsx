import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function Jsx() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">
            STEP 4
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          JSX を理解する
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          React のコードに登場する「HTML のようなもの」、それが JSX です。
          HTML との違いを知り、使いこなせるようになりましょう。
        </p>

        <WhyNowBox tags={['JSX', 'HTML との違い', '式の埋め込み', '条件分岐']}>
          <p>
            React のコードを読み書きするうえで、JSX の理解は絶対に避けて通れません。
            見た目は HTML そっくりですが、実は JavaScript です。
            この違いを理解しないと、「なぜ <code className="bg-violet-100 dark:bg-violet-900/60 px-1 rounded text-xs">class</code> じゃなくて
            <code className="bg-violet-100 dark:bg-violet-900/60 px-1 rounded text-xs">className</code> なの？」
            という疑問が解消されません。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* JSX とは何か */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">JSX とは何か？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX は <strong>JavaScript XML</strong> の略で、JavaScript の中に HTML のような構文を書ける拡張構文です。
              React のコンポーネントが「見た目」を定義するために使います。
            </p>

            <CodeBlock
              code={`// これが JSX
function Greeting() {
  return <h1>こんにちは、React！</h1>
}

// JSX は実際にはこう変換される（知識として知っておくだけでOK）
function Greeting() {
  return React.createElement('h1', null, 'こんにちは、React！')
}`}
              language="tsx"
              title="JSX の正体"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;h1&gt;こんにちは&lt;/h1&gt;</code> と書くと、
              裏側では <code className="bg-muted px-1 py-0.5 rounded text-xs">React.createElement('h1', null, 'こんにちは')</code>
              に変換されます。つまり JSX は HTML ではなく、<strong>JavaScript の関数呼び出しの糖衣構文（ショートカット）</strong>です。
            </p>

            <div className="mt-4">
              <InfoBox type="info" title="なぜ JSX を使うのか？">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">React.createElement</code> を毎回書くのは大変です。
                  JSX のおかげで、HTML を書く感覚で UI を定義できます。
                  デザイナーにとっても、JSX は HTML の知識を活かしやすい構文です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* JSX の裏側: React.createElement */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">JSX の裏側をもう少し深く</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX が <code className="bg-muted px-1 py-0.5 rounded text-xs">React.createElement</code> に変換されることは先ほど学びました。
              もう少し複雑な例で、この変換がどう行われるか見てみましょう。
              理解しておくと、JSX のルール（なぜルート要素が1つ必要か、など）が腑に落ちます。
            </p>

            <CodeBlock
              code={`// JSX で書いた場合
function Card() {
  return (
    <div className="card">
      <h2>タイトル</h2>
      <p>説明文です。</p>
    </div>
  )
}

// ↓ コンパイラ（Babel/SWC）がこう変換する ↓

function Card() {
  return React.createElement(
    'div',                          // 要素のタグ名
    { className: 'card' },          // 属性（props）
    React.createElement('h2', null, 'タイトル'),    // 子要素1
    React.createElement('p', null, '説明文です。')  // 子要素2
  )
}`}
              language="tsx"
              title="JSX → React.createElement の変換"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">React.createElement</code> は3つの引数を取ります。
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-2 list-disc list-inside ml-2">
              <li><strong>第1引数</strong>: タグ名（'div'、'h2'）またはコンポーネント（Button）</li>
              <li><strong>第2引数</strong>: 属性のオブジェクト（className、style など）。なければ null</li>
              <li><strong>第3引数以降</strong>: 子要素（テキストや他の createElement 呼び出し）</li>
            </ul>

            <p className="text-muted-foreground mt-4 leading-relaxed">
              この構造を知っておくと、「JSX は必ず1つのルート要素で囲む必要がある」というルールが理解できます。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">React.createElement</code> は1つの要素しか返せないため、
              複数の要素を返そうとするとエラーになるのです。
            </p>

            <div className="mt-4">
              <InfoBox type="info" title="最新の React では React.createElement を意識しなくてよい">
                <p>
                  React 17 以降は「新しい JSX トランスフォーム」が導入され、
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">import React from 'react'</code> を書かなくても
                  JSX が使えるようになりました。内部的には <code className="bg-muted px-1 py-0.5 rounded text-xs">jsx()</code> という
                  別の関数が使われますが、仕組みの本質は同じです。
                  普段のコーディングでは意識する必要はありません。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* HTML との違い */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">HTML との違い</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              JSX は HTML に似ていますが、いくつか重要な違いがあります。
              デザイナーが HTML を書いた経験があるなら、以下の点だけ気をつければ大丈夫です。
            </p>

            {/* className */}
            <h3 className="text-xl font-bold text-foreground mb-4">1. class → className</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              HTML の <code className="bg-muted px-1 py-0.5 rounded text-xs">class</code> 属性は、
              JSX では <code className="bg-muted px-1 py-0.5 rounded text-xs">className</code> と書きます。
              JavaScript に <code className="bg-muted px-1 py-0.5 rounded text-xs">class</code> という予約語があるためです。
            </p>
            <CodeBlock
              code={`// HTML
<div class="container">...</div>

// JSX
<div className="container">...</div>`}
              language="tsx"
              title="class → className"
            />

            {/* htmlFor */}
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. for → htmlFor</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              label タグの <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code> 属性は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">htmlFor</code> と書きます。
              こちらも JavaScript の予約語 <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code> との衝突を避けるためです。
            </p>
            <CodeBlock
              code={`// HTML
<label for="email">メールアドレス</label>
<input id="email" type="email" />

// JSX
<label htmlFor="email">メールアドレス</label>
<input id="email" type="email" />`}
              language="tsx"
              title="for → htmlFor"
            />

            {/* キャメルケース */}
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. ケバブケース → キャメルケース</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              HTML ではハイフン区切り（ケバブケース）で書く属性名が、JSX ではキャメルケースになります。
            </p>
            <CodeBlock
              code={`// HTML
<div tabindex="0" onclick="handleClick()"></div>
<input maxlength="100" />

// JSX
<div tabIndex={0} onClick={handleClick}></div>
<input maxLength={100} />`}
              language="tsx"
              title="属性名のキャメルケース化"
            />

            {/* 自己閉じタグ */}
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">4. 自己閉じタグは必須</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              HTML では <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;img&gt;</code> や
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;br&gt;</code> は閉じタグなしで書けますが、
              JSX では必ず閉じる必要があります。
            </p>
            <CodeBlock
              code={`// HTML（閉じなくてもOK）
<img src="photo.jpg">
<br>
<input type="text">
<hr>

// JSX（必ず閉じる）
<img src="photo.jpg" />
<br />
<input type="text" />
<hr />`}
              language="tsx"
              title="自己閉じタグ"
            />

            <div className="mt-6">
              <InfoBox type="warning" title="よくあるエラー">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">class</code> と書いてしまうのが初心者が最もよくやるミスです。
                  エラーにはならず警告が出るだけなので気づきにくいですが、必ず
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">className</code> を使いましょう。
                  VS Code の ESLint 拡張を入れていれば、自動で指摘してくれます。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* よくある JSX エラーと対処法 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">よくある JSX エラーと対処法</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              JSX を書き始めると、必ず遭遇するエラーがいくつかあります。
              ここで先に知っておけば、エラーに出会っても慌てずに対処できます。
            </p>

            {/* エラー1: 隣接要素エラー */}
            <h3 className="text-xl font-bold text-foreground mb-4">エラー1: 複数のルート要素</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              JSX は必ず1つのルート要素で囲む必要があります。2つ以上の要素をそのまま返すとエラーになります。
            </p>
            <CodeBlock
              code={`// NG: コンパイルエラーが発生！
function App() {
  return (
    <h1>タイトル</h1>
    <p>本文</p>
  )
}
// エラー: JSX expressions must have one parent element.

// OK: div で囲む
function App() {
  return (
    <div>
      <h1>タイトル</h1>
      <p>本文</p>
    </div>
  )
}

// ベスト: フラグメント（<> </>）で囲む（余計な DOM が増えない）
function App() {
  return (
    <>
      <h1>タイトル</h1>
      <p>本文</p>
    </>
  )
}`}
              language="tsx"
              title="隣接要素エラーの解決方法"
              showLineNumbers
            />

            {/* エラー2: JSX 内で if 文 */}
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">エラー2: JSX の中で if 文を使おうとする</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              JSX の波括弧 <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{ }'}</code> の中には「式」しか書けません。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">if</code> や <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code> は
              「文」なので直接書くことができません。
            </p>
            <CodeBlock
              code={`// NG: JSX の中に if 文は書けない！
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {if (isLoggedIn) { return <p>おかえりなさい</p> }}
    </div>
  )
}
// エラー: Unexpected token

// OK: 三項演算子を使う
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>おかえりなさい</p> : <p>ログインしてください</p>}
    </div>
  )
}

// OK: JSX の外側で if 文を使う
function Greeting({ isLoggedIn }) {
  let message
  if (isLoggedIn) {
    message = <p>おかえりなさい</p>
  } else {
    message = <p>ログインしてください</p>
  }

  return <div>{message}</div>
}`}
              language="tsx"
              title="if 文の代替手段"
              showLineNumbers
            />

            <InfoBox type="info" title="「式」と「文」の違い（覚え方）">
              <p>
                <strong>式（Expression）</strong>: 値を返すもの。変数に代入できるもの。
                例: <code className="bg-muted px-1 py-0.5 rounded text-xs">1 + 2</code>、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">isLoggedIn ? "はい" : "いいえ"</code>、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">items.map(...)</code>
                <br />
                <strong>文（Statement）</strong>: 処理の手順を記述するもの。値を返さない。
                例: <code className="bg-muted px-1 py-0.5 rounded text-xs">if (...) {'{ }'}</code>、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">for (...) {'{ }'}</code>、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">switch (...) {'{ }'}</code>
                <br />
                覚え方: 「<code className="bg-muted px-1 py-0.5 rounded text-xs">const x = ___</code> の ___ に入れられるなら式」
              </p>
            </InfoBox>

            {/* エラー3: オブジェクトの表示 */}
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">エラー3: オブジェクトをそのまま表示しようとする</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              JavaScript のオブジェクトは JSX の中でそのまま表示できません。
            </p>
            <CodeBlock
              code={`// NG: オブジェクトはそのまま表示できない
function Profile() {
  const user = { name: '田中', age: 28 }
  return <p>{user}</p>
}
// エラー: Objects are not valid as a React child

// OK: プロパティを個別に表示する
function Profile() {
  const user = { name: '田中', age: 28 }
  return (
    <p>{user.name}さん（{user.age}歳）</p>
  )
}

// デバッグ用: JSON.stringify で表示
function Profile() {
  const user = { name: '田中', age: 28 }
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}`}
              language="tsx"
              title="オブジェクト表示エラーの対処"
              showLineNumbers
            />
          </section>

          {/* 式の埋め込み */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">{'{ } で式を埋め込む'}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX の最大の特徴は、波括弧 <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{ }'}</code> を使って
              JavaScript の式（値を返す表現）を埋め込めることです。
            </p>

            <CodePreview
              code={`function Profile() {
  const name = "田中太郎"
  const age = 28
  const skills = ["Figma", "Photoshop", "React"]

  return (
    <div>
      {/* 変数の埋め込み */}
      <h1>{name}</h1>

      {/* 計算式の埋め込み */}
      <p>{age}歳（来年は{age + 1}歳）</p>

      {/* 関数の呼び出し結果を埋め込み */}
      <p>スキル: {skills.join(', ')}</p>

      {/* テンプレートリテラルの埋め込み */}
      <p>{name}さんは{skills.length}つのスキルを持っています</p>
    </div>
  )
}

function App() {
  return <Profile />
}
`}
              title="式の埋め込み例 → 右がブラウザ表示"
              previewHeight={180}
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">波括弧が使える場所</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              波括弧は、テキストの中だけでなく、属性値にも使えます。
            </p>

            <CodeBlock
              code={`function Avatar() {
  const imageUrl = "https://example.com/avatar.jpg"
  const altText = "プロフィール画像"
  const size = 80

  return (
    <img
      src={imageUrl}              {/* 属性値に変数 */}
      alt={altText}               {/* 属性値に変数 */}
      width={size}                {/* 属性値に数値 */}
      height={size}
      style={{                    {/* 属性値にオブジェクト */}
        borderRadius: '50%',
        border: '2px solid #E5E7EB',
      }}
    />
  )
}`}
              language="tsx"
              title="属性値にも波括弧が使える"
              showLineNumbers
            />
          </section>

          {/* 条件分岐 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">条件分岐（条件付きレンダリング）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「ログインしている場合はユーザー名を表示、していない場合はログインボタンを表示」
              のように、条件によって表示を切り替えたい場面は頻繁にあります。
              JSX では主に3つの方法を使います。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">方法1: 三項演算子（条件 ? A : B）</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              「Aか、さもなければB」を表現する方法です。2択の切り替えに最適です。
            </p>
            <CodePreview
              code={`function UserGreeting() {
  const isLoggedIn = true

  return (
    <div>
      {isLoggedIn ? (
        <p>おかえりなさい！</p>
      ) : (
        <p>ログインしてください。</p>
      )}
    </div>
  )
}

function App() {
  return <UserGreeting />
}
`}
              title="三項演算子による条件分岐 → 右がブラウザ表示"
              previewHeight={80}
            />

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">{'方法2: &&（論理AND）演算子'}</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              「条件がtrue のときだけ表示する」パターンに使います。false の場合は何も表示されません。
            </p>
            <CodePreview
              code={`function Notification() {
  const hasNewMessage = true
  const messageCount = 3

  return (
    <div>
      <h1>マイページ</h1>

      {/* hasNewMessage が true のときだけ表示 */}
      {hasNewMessage && (
        <div style={{ padding: '8px 16px', backgroundColor: '#EFF6FF', borderRadius: '8px', color: '#1D4ED8', marginTop: '8px' }}>
          {messageCount}件の新しいメッセージがあります
        </div>
      )}
    </div>
  )
}

function App() {
  return <Notification />
}
`}
              title="&& による条件付き表示 → 右がブラウザ表示"
              previewHeight={120}
            />

            <div className="mt-4">
              <InfoBox type="warning" title="&& 演算子の注意点">
                <p>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">{'0 && <p>表示</p>'}</code> と書くと、
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">0</code> がそのまま画面に表示されてしまいます。
                  数値を条件にする場合は
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">{'messageCount > 0 && <p>...</p>'}</code>
                  のように比較式にしましょう。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">方法3: 早期 return</h3>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              コンポーネント全体の表示を切り替える場合は、JSX を返す前に条件チェックを行う方法が読みやすいです。
            </p>
            <CodeBlock
              code={`function Dashboard({ isLoggedIn }) {
  // ログインしていなければ、ログインページを表示
  if (!isLoggedIn) {
    return (
      <div>
        <h1>ログインが必要です</h1>
        <button>ログイン</button>
      </div>
    )
  }

  // ログインしている場合のみ、ダッシュボードを表示
  return (
    <div>
      <h1>ダッシュボード</h1>
      <p>ようこそ！</p>
    </div>
  )
}`}
              language="tsx"
              title="早期 return による条件分岐"
              showLineNumbers
            />
          </section>

          {/* リストレンダリング */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">リストのレンダリング（map）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              配列のデータをリスト表示することはよくあります。
              JSX では <code className="bg-muted px-1 py-0.5 rounded text-xs">for</code> 文が使えないため、
              配列の <code className="bg-muted px-1 py-0.5 rounded text-xs">map</code> メソッドを使います。
            </p>

            <CodePreview
              code={`function SkillList() {
  const skills = ["Figma", "Photoshop", "Illustrator", "React", "TypeScript"]

  return (
    <div>
      <h2>スキル一覧</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return <SkillList />
}
`}
              title="map によるリストレンダリング → 右がブラウザ表示"
              previewHeight={200}
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">map</code> は配列の各要素を変換して新しい配列を返す関数です。
              ここでは文字列の配列を JSX 要素の配列に変換しています。
            </p>

            <div className="mt-4">
              <InfoBox type="warning" title="key 属性は必須">
                <p>
                  リストレンダリングでは、各要素に <code className="bg-muted px-1 py-0.5 rounded text-xs">key</code> 属性を
                  指定する必要があります。React が各要素を識別し、効率的に更新するために使います。
                  可能であればユニークな ID を使い、やむを得ない場合にのみ index を使いましょう。
                  key を付けないと、コンソールに警告が表示されます。
                </p>
              </InfoBox>
            </div>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">より実践的な例: オブジェクト配列のリスト表示</h3>
            <CodePreview
              code={`function TeamMembers() {
  const members = [
    { id: 1, name: "田中太郎", role: "デザイナー" },
    { id: 2, name: "鈴木花子", role: "エンジニア" },
    { id: 3, name: "佐藤次郎", role: "PM" },
  ]

  return (
    <div>
      <h2>チームメンバー</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <strong>{member.name}</strong> - {member.role}
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return <TeamMembers />
}
`}
              title="オブジェクト配列のリスト表示 → 右がブラウザ表示"
              previewHeight={180}
            />
          </section>

          {/* Fragment */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">{'フラグメント（<> </>）'}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX には「1つのルート要素で囲む」というルールがあります。
              複数の要素を並べて返したい場合、余計な <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;div&gt;</code> で囲むと
              不要な DOM 要素が増えてしまいます。そこで使うのが<strong>フラグメント</strong>です。
            </p>

            <CodeBlock
              code={`// NG: 複数の要素をそのまま返せない
function App() {
  return (
    <h1>タイトル</h1>
    <p>本文</p>
  )
  // エラー: JSX expressions must have one parent element
}

// OK: div で囲む（でも余計な div が増える）
function App() {
  return (
    <div>
      <h1>タイトル</h1>
      <p>本文</p>
    </div>
  )
}

// ベスト: フラグメントを使う（DOMに余計な要素が追加されない）
function App() {
  return (
    <>
      <h1>タイトル</h1>
      <p>本文</p>
    </>
  )
}`}
              language="tsx"
              title="フラグメントの使い方"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;&gt; &lt;/&gt;</code> は
              <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;React.Fragment&gt;</code> の省略形です。
              実際の DOM にはフラグメントは残らないので、レイアウトに影響を与えません。
            </p>

            <div className="mt-4">
              <InfoBox type="info" title="div とフラグメント、どっちを使う？">
                <p>
                  迷ったら、まずフラグメント <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;&gt; &lt;/&gt;</code> を使いましょう。
                  スタイリングのために囲む要素が必要な場合（flexbox のコンテナなど）は
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;div&gt;</code> を使います。
                  「この div は見た目のために必要か？」を判断基準にするとよいでしょう。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* JSX の中のコメント */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">JSX の中のコメント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              HTML のコメント <code className="bg-muted px-1 py-0.5 rounded text-xs">{'<!-- -->'}</code> は JSX では使えません。
              代わりに JavaScript のコメントを波括弧の中に書きます。
            </p>

            <CodeBlock
              code={`function App() {
  return (
    <div>
      {/* JSX の中のコメントはこう書く */}
      <h1>タイトル</h1>

      {/*
        複数行のコメントも
        このように書ける
      */}
      <p>本文</p>
    </div>
  )
}`}
              language="tsx"
              title="JSX のコメント"
              showLineNumbers
            />
          </section>

          {/* スタイルの書き方 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">インラインスタイルの書き方</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              JSX でインラインスタイルを指定する場合は、文字列ではなく JavaScript オブジェクトで渡します。
              プロパティ名はキャメルケースで書きます。
            </p>

            <CodeBlock
              code={`// HTML のインラインスタイル
// <div style="background-color: blue; font-size: 16px; margin-top: 20px;">

// JSX のインラインスタイル
<div style={{
  backgroundColor: 'blue',
  fontSize: '16px',
  marginTop: '20px',
}}>
  スタイル付きの要素
</div>`}
              language="tsx"
              title="インラインスタイルの違い"
            />

            <p className="text-muted-foreground mt-4 leading-relaxed">
              二重の波括弧 <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{{}}'}</code> に見えますが、
              外側は「JSX の式埋め込み」、内側は「JavaScript オブジェクトのリテラル」です。
            </p>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">よく使うスタイルプロパティの対応表</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/30">CSS プロパティ</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/30">JSX スタイル</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">background-color</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">backgroundColor</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">font-size</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">fontSize</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">margin-top</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">marginTop</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">border-radius</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">borderRadius</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">z-index</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">zIndex</code></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">box-shadow</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">boxShadow</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <InfoBox type="info" title="インラインスタイルは推奨されない">
                <p>
                  実際の開発では、インラインスタイルはあまり使いません。
                  CSS Modules、Tailwind CSS、styled-components など、より良いスタイリング手法を STEP 20 以降で学びます。
                  今は「JSX ではこう書く」ということだけ知っておけば十分です。
                </p>
              </InfoBox>
            </div>
          </section>

          {/* まとめ表 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">HTML と JSX の違い まとめ</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/30">項目</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/30">HTML</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground bg-muted/30">JSX</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">CSS クラス</td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">class</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">className</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">label の for</td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">for</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">htmlFor</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">属性名</td>
                    <td className="py-3 px-4">ケバブケース</td>
                    <td className="py-3 px-4">キャメルケース</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">自己閉じタグ</td>
                    <td className="py-3 px-4">省略可</td>
                    <td className="py-3 px-4">必須 <code className="bg-muted px-1 rounded text-xs">/&gt;</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">スタイル</td>
                    <td className="py-3 px-4">文字列</td>
                    <td className="py-3 px-4">オブジェクト</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">コメント</td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">{'<!-- -->'}</code></td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">{'{/* */}'}</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">値の埋め込み</td>
                    <td className="py-3 px-4">不可</td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">{'{変数}'}</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">条件分岐</td>
                    <td className="py-3 px-4">不可</td>
                    <td className="py-3 px-4">三項演算子、{'&&'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">リスト表示</td>
                    <td className="py-3 px-4">手動で記述</td>
                    <td className="py-3 px-4"><code className="bg-muted px-1 rounded text-xs">map()</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 理解度チェック */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="次のJSXがエラーになる原因はどれ？ ―― return ( <h1>タイトル</h1> <p>本文</p> )"
              options={[
                { label: 'h1 タグと p タグの間に改行がないから', correct: false },
                { label: 'JSX では h1 タグが使えないから', correct: false },
                { label: '複数の要素をルート要素で囲んでいないから', correct: true },
              ]}
              explanation="JSX では return で返す要素は1つのルート要素で囲む必要があります。<div> や フラグメント <> </> で囲むことで解決できます。これは JSX が React.createElement の糖衣構文であり、1つの関数呼び出しは1つの値しか返せないためです。"
            />

            <Quiz
              question="次のJSXのうち、正しい書き方はどれ？"
              options={[
                { label: '<div class="container"><img src="photo.jpg"></div>', correct: false },
                { label: '<div className="container"><img src="photo.jpg" /></div>', correct: true },
                { label: '<div className="container"><img src="photo.jpg"></div>', correct: false },
              ]}
              explanation="JSX では class ではなく className を使い、<img> のような空要素は必ず <img /> と自己閉じタグで書きます。2番目の選択肢だけが両方のルールを満たしています。"
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">チャレンジしてみよう</h2>

            <CodingChallenge
              title="条件分岐とリストを含む JSX を書こう"
              description="メンバーリストを表示するコンポーネントを完成させてください。___ の部分を埋めて、(1) showTitle が true のときだけタイトルを表示、(2) members を map でリスト表示してください。"
              preview
              initialCode={`function MemberList() {
  const members = ["田中", "鈴木", "佐藤"]
  const showTitle = true

  return (
    <div>
      {___ && <h2>メンバー一覧</h2>}

      {members.length === 0 ? (
        <p>メンバーがいません</p>
      ) : (
        <ul>
          {members.___((___, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MemberList`}
              answer={`function MemberList() {
  const members = ["田中", "鈴木", "佐藤"]
  const showTitle = true

  return (
    <div>
      {showTitle && <h2>メンバー一覧</h2>}

      {members.length === 0 ? (
        <p>メンバーがいません</p>
      ) : (
        <ul>
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MemberList`}
              keywords={['showTitle &&', 'members.map', '(member,']}
              hints={[
                '&& 演算子の左辺には条件となる変数を入れます',
                '配列をリスト表示するには .map() メソッドを使います',
                'map のコールバック引数には各要素を受け取る変数名を書きます',
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
                  <span>JSX は <strong>HTML ではなく JavaScript の拡張構文</strong>であり、React.createElement に変換される</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span><code className="bg-muted px-1 py-0.5 rounded">class</code> → <code className="bg-muted px-1 py-0.5 rounded">className</code>、
                  自己閉じタグ必須など、HTML との違いを理解した</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>波括弧 <code className="bg-muted px-1 py-0.5 rounded">{'{ }'}</code> で JavaScript の式を埋め込める（テキスト・属性値の両方）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>条件分岐は<strong>三項演算子</strong>、<strong>{'&&'} 演算子</strong>、<strong>早期 return</strong> で行う</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>リスト表示は <code className="bg-muted px-1 py-0.5 rounded">map()</code> を使い、<code className="bg-muted px-1 py-0.5 rounded">key</code> 属性を忘れない</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>フラグメント <code className="bg-muted px-1 py-0.5 rounded">&lt;&gt; &lt;/&gt;</code> で余計な DOM 要素を減らせる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold mt-0.5">&#10003;</span>
                  <span>よくあるエラー（隣接要素、if 文、オブジェクト表示）の対処法を知った</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 公式リファレンス */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'React 公式: JSX でマークアップを記述する',
                  url: 'https://react.dev/learn/writing-markup-with-jsx',
                  description: 'JSX の基本ルールを公式ドキュメントで確認',
                },
                {
                  title: 'React 公式: JSX に波括弧で JavaScript を含める',
                  url: 'https://react.dev/learn/javascript-in-jsx-with-curly-braces',
                  description: '波括弧を使った式の埋め込みについて',
                },
                {
                  title: 'React 公式: 条件付きレンダー',
                  url: 'https://react.dev/learn/conditional-rendering',
                  description: '条件分岐のパターンを詳しく学ぶ',
                },
                {
                  title: 'React 公式: リストのレンダー',
                  url: 'https://react.dev/learn/rendering-lists',
                  description: 'map と key によるリスト表示の詳細',
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
                  question: 'JSX を使わなくても React は書けますか？',
                  answer: '技術的には可能です。React.createElement を直接呼び出すことで、JSX なしでも React コンポーネントを作れます。しかし、コードの可読性が大幅に下がるため、実際のプロジェクトで JSX を使わないことはまずありません。JSX は React のデファクトスタンダードであり、すべてのチュートリアルやライブラリのドキュメントでも JSX が前提となっています。',
                },
                {
                  question: 'HTML ファイルをそのまま JSX にコピーできますか？',
                  answer: 'ほぼそのまま使えますが、いくつかの変換が必要です。class → className、for → htmlFor、style の書き方変更、自己閉じタグの追加などです。これらの変換を自動で行ってくれるオンラインツール（HTML to JSX コンバーター）もあります。VS Code でも HTML を貼り付けると自動変換してくれる拡張機能があります。',
                },
                {
                  question: 'JSX はパフォーマンスに影響しますか？',
                  answer: 'JSX 自体はパフォーマンスに影響しません。JSX はビルド時（開発中のコンパイル時）に JavaScript に変換され、ブラウザに送られるのは通常の JavaScript です。つまり、ブラウザは JSX を直接解釈しているわけではなく、実行時のオーバーヘッドはありません。パフォーマンスに影響するのは、コンポーネントの設計やレンダリングの最適化であり、JSX の構文そのものではありません。',
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
