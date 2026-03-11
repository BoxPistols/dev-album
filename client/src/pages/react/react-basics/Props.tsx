import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function Props() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">
            STEP 6
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          Props
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          コンポーネントにデータを渡す仕組み「Props」を学びましょう。関数の引数のように、親コンポーネントから子コンポーネントへ情報を伝える React の基本的なデータフローです。
        </p>

        <WhyNowBox tags={['データフロー', 'コンポーネント設計', '再利用性']}>
          <p>
            前のステップでコンポーネントを作れるようになりました。しかし、同じ見た目のカードを何枚も作るとき、毎回中身を変えたコンポーネントを作るのは非効率です。Props を使えば、ひとつのコンポーネントに異なるデータを渡して、柔軟に再利用できます。
          </p>
          <p>
            デザインツールでいうと、Figma のコンポーネントプロパティと同じ考え方です。テキストや色、表示/非表示をプロパティで制御するように、React では Props でコンポーネントの振る舞いを制御します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Props とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props とは？</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props（プロパティの略）は、親コンポーネントから子コンポーネントへデータを渡す仕組みです。JavaScript の関数に引数を渡すのと同じ感覚で使えます。
            </p>
            <CodeBlock
              code={`// 関数の引数と同じ考え方
function greet(name: string) {
  return \`こんにちは、\${name}さん！\`;
}
greet('田中'); // "こんにちは、田中さん！"

// React コンポーネントでは Props として渡す
function Greeting({ name }: { name: string }) {
  return <p>こんにちは、{name}さん！</p>;
}
<Greeting name="田中" />`}
              language="tsx"
              title="Props は関数の引数と同じ"
            />
          </section>

          {/* データフローの詳細解説 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props の一方向データフロー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React のデータは常に<strong>親から子へ</strong>流れます。これを「一方向データフロー（one-way data flow）」と呼びます。水が高いところから低いところへ流れるように、データも上位のコンポーネントから下位のコンポーネントへ一方通行で流れます。
            </p>

            <div className="p-6 rounded-xl border border-border bg-card mb-6">
              <h3 className="font-bold text-foreground mb-4 text-center">Props のデータフロー図</h3>
              <div className="space-y-4">
                {/* 親コンポーネント */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4 text-center">
                  <p className="font-bold text-blue-700 dark:text-blue-300 mb-1">親コンポーネント（App）</p>
                  <p className="text-sm text-muted-foreground">データを持ち、子に渡す側</p>
                  <code className="text-xs bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded mt-2 inline-block">
                    {'const user = { name: "田中", role: "デザイナー" }'}
                  </code>
                </div>

                {/* 矢印 */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center text-primary">
                    <span className="text-2xl">↓</span>
                    <span className="text-xs font-semibold bg-primary/10 px-3 py-1 rounded-full">Props として渡す</span>
                    <span className="text-2xl">↓</span>
                  </div>
                </div>

                {/* 子コンポーネントたち */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-300 dark:border-green-700 rounded-lg p-3 text-center">
                    <p className="font-bold text-green-700 dark:text-green-300 text-sm mb-1">子A: Header</p>
                    <code className="text-xs">name="田中"</code>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-300 dark:border-green-700 rounded-lg p-3 text-center">
                    <p className="font-bold text-green-700 dark:text-green-300 text-sm mb-1">子B: ProfileCard</p>
                    <code className="text-xs">user={'{user}'}</code>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-300 dark:border-green-700 rounded-lg p-3 text-center">
                    <p className="font-bold text-green-700 dark:text-green-300 text-sm mb-1">子C: Sidebar</p>
                    <code className="text-xs">role="デザイナー"</code>
                  </div>
                </div>

                {/* 注意 */}
                <div className="flex justify-center mt-2">
                  <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                    <span className="text-2xl">✕</span>
                    <span className="text-sm font-semibold">子から親へは直接渡せない</span>
                    <span className="text-2xl">↑</span>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="なぜ一方向なのか？">
              <p>
                データの流れが一方向に限定されることで、「このデータはどこから来たのか？」が常に明確になります。双方向だとデータの出所が追いにくくなり、バグの原因になります。React はこの設計によって、大規模なアプリケーションでもデータの流れを予測しやすくしています。
              </p>
            </InfoBox>

            <CodeBlock
              code={`// 親コンポーネント: データの源泉
function App() {
  const user = { name: '田中', role: 'デザイナー' };

  return (
    <div>
      {/* 親 → 子 の方向でデータが流れる */}
      <Header userName={user.name} />
      <ProfileCard user={user} />
      <Sidebar role={user.role} />
    </div>
  );
}

// 子コンポーネント: 受け取ったデータを表示するだけ
function Header({ userName }: { userName: string }) {
  return <h1>ようこそ、{userName}さん</h1>;
}

// 子コンポーネントは受け取った Props を変更できない
function ProfileCard({ user }: { user: { name: string; role: string } }) {
  // user.name = '佐藤'; // エラー！Props は読み取り専用
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.role}</p>
    </div>
  );
}`}
              language="tsx"
              title="一方向データフローの実装例"
            />

            <InfoBox type="success" title="Figma との対比">
              <p>
                Figma でコンポーネントのプロパティを設定するとき、インスタンス側からマスターコンポーネントの定義を変更できませんよね。それと同じで、子コンポーネントは受け取った Props を変更できません。変更したい場合は、親コンポーネントのデータを更新し、新しい Props として再度渡します（これは後の useState で学びます）。
              </p>
            </InfoBox>
          </section>

          {/* 文字列・数値・真偽値を渡す */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">文字列・数値・真偽値を渡す</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props にはさまざまな型のデータを渡せます。文字列はそのまま、数値や真偽値は波括弧 <code className="text-sm bg-muted px-1.5 py-0.5 rounded">{'{}'}</code> で囲んで渡します。
            </p>
            <CodePreview
              code={`function UserBadge({ name, age, isOnline }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
      <span style={{ color: isOnline ? '#22C55E' : '#9CA3AF' }}>
        ●
      </span>
      <span style={{ fontWeight: 'bold' }}>{name}</span>
      <span style={{ fontSize: '14px', color: '#6B7280' }}>({age}歳)</span>
    </div>
  )
}

function App() {
  return (
    <div>
      <UserBadge name="佐藤花子" age={28} isOnline={true} />
      <UserBadge name="鈴木太郎" age={32} isOnline={false} />
    </div>
  )
}
`}
              title="さまざまな型の Props → 右がブラウザ表示"
              previewHeight={100}
            />
            <InfoBox type="warning" title="文字列以外は波括弧で囲む">
              <p>
                文字列は <code>name="佐藤"</code> のようにそのまま渡せますが、数値 <code>{'{28}'}</code> や真偽値 <code>{'{true}'}</code> は波括弧が必要です。<code>age="28"</code> と書くと文字列の "28" になってしまいます。
              </p>
            </InfoBox>
          </section>

          {/* オブジェクトと配列を渡す */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">オブジェクトと配列を渡す</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              より複雑なデータとして、オブジェクトや配列も Props で渡せます。
            </p>
            <CodeBlock
              code={`// オブジェクトを渡す
interface User {
  name: string;
  email: string;
  avatar: string;
}

function UserCard({ user }: { user: User }) {
  return (
    <div className="p-4 border rounded-lg">
      <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
      <h3 className="font-bold">{user.name}</h3>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
  );
}

// 使い方
const userData = {
  name: '山田太郎',
  email: 'yamada@example.com',
  avatar: '/avatars/yamada.jpg',
};

<UserCard user={userData} />`}
              language="tsx"
              title="オブジェクトを Props として渡す"
            />
            <CodePreview
              code={`function TagList({ tags }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            padding: '4px 10px',
            backgroundColor: '#DBEAFE',
            color: '#1D4ED8',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function App() {
  return <TagList tags={['React', 'TypeScript', 'デザイン']} />
}
`}
              title="配列を Props として渡す → 右がブラウザ表示"
              previewHeight={60}
            />
          </section>

          {/* children prop */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">children prop</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              特別な Props として <code className="text-sm bg-muted px-1.5 py-0.5 rounded">children</code> があります。コンポーネントの開始タグと終了タグの間に書いた内容が children として渡されます。レイアウトやラッパーコンポーネントを作るときに非常に便利です。
            </p>
            <CodePreview
              code={`function Card({ children, title }) {
  return (
    <div style={{
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '12px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  )
}

function App() {
  return (
    <div>
      <Card title="プロフィール">
        <p style={{ margin: '4px 0' }}>名前: 山田太郎</p>
        <p style={{ margin: '4px 0' }}>役職: デザイナー</p>
      </Card>
      <Card title="スキル">
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Figma</li>
          <li>React</li>
          <li>TypeScript</li>
        </ul>
      </Card>
    </div>
  )
}
`}
              title="children で柔軟なコンポーネントを作る → 右がブラウザ表示"
              previewHeight={280}
            />

            <p className="text-muted-foreground mb-4 leading-relaxed">
              children は単なるテキストだけでなく、他のコンポーネントや複雑な JSX も受け取れます。レイアウトコンポーネントを作るときに特に威力を発揮します。
            </p>

            <CodeBlock
              code={`import { ReactNode } from 'react';

// ページ全体のレイアウトを提供するコンポーネント
function PageLayout({
  children,
  sidebar,
  header,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="border-b">{header}</div>
      <div className="flex">
        <aside className="w-64 border-r p-4">{sidebar}</aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

// 使い方 - 各スロットに自由なコンテンツを配置
<PageLayout
  header={<h1>マイアプリ</h1>}
  sidebar={<nav>ナビゲーション</nav>}
>
  <p>メインコンテンツがここに入る</p>
</PageLayout>`}
              language="tsx"
              title="複数のスロットを持つレイアウトコンポーネント"
            />

            <InfoBox type="info" title="Figma のスロットと同じ">
              <p>
                children は Figma のコンポーネントで「中身を入れ替えられるスロット」を作るのと同じ考え方です。外側のレイアウト（枠、影、余白）は固定で、中身だけ変えられます。さらに、header や sidebar のように名前付きの Props で複数のスロットを作ることもできます。
              </p>
            </InfoBox>
          </section>

          {/* デフォルト Props */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">デフォルト Props</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props にデフォルト値を設定しておくと、値が渡されなかったときに自動的にその値が使われます。JavaScript のデフォルト引数と同じ仕組みです。
            </p>
            <CodePreview
              code={`function Button({ label, variant = 'primary', size = 'md' }) {
  const sizeStyles = {
    sm: { padding: '4px 12px', fontSize: '13px' },
    md: { padding: '8px 16px', fontSize: '15px' },
    lg: { padding: '12px 24px', fontSize: '17px' },
  }

  const variantStyles = {
    primary: { backgroundColor: '#2563EB', color: 'white', border: 'none' },
    secondary: { backgroundColor: '#E5E7EB', color: '#1F2937', border: 'none' },
    ghost: { backgroundColor: 'transparent', color: '#2563EB', border: '1px solid #2563EB' },
  }

  return (
    <button style={{
      ...sizeStyles[size],
      ...variantStyles[variant],
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginRight: '8px',
      marginBottom: '8px',
    }}>
      {label}
    </button>
  )
}

function App() {
  return (
    <div>
      <div><Button label="送信" /></div>
      <div><Button label="キャンセル" variant="ghost" size="sm" /></div>
      <div><Button label="保存" variant="secondary" size="lg" /></div>
    </div>
  )
}
`}
              title="デフォルト値の設定 → 右がブラウザ表示"
              previewHeight={160}
            />
          </section>

          {/* Props の分割代入 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props の分割代入（デストラクチャリング）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props はオブジェクトとして渡されるので、分割代入（デストラクチャリング）を使って個々の値を取り出します。これまでの例でもすでに使っていました。
            </p>
            <CodeBlock
              code={`// 方法1: 引数で直接分割代入（推奨）
function Greeting({ name, message }: { name: string; message: string }) {
  return <p>{message}、{name}さん！</p>;
}

// 方法2: props オブジェクトとして受け取る
function Greeting2(props: { name: string; message: string }) {
  return <p>{props.message}、{props.name}さん！</p>;
}

// 方法3: interface を別に定義する（Props が多いとき推奨）
interface GreetingProps {
  name: string;
  message: string;
  emoji?: string;
}

function Greeting3({ name, message, emoji = '👋' }: GreetingProps) {
  return <p>{emoji} {message}、{name}さん！</p>;
}`}
              language="tsx"
              title="Props の受け取り方いろいろ"
            />
            <InfoBox type="success" title="おすすめのスタイル">
              <p>
                Props が3つ以上になったら、interface を別に定義するのがおすすめです。コードが読みやすくなり、再利用もしやすくなります。
              </p>
            </InfoBox>
          </section>

          {/* Props のスプレッド構文 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Props のスプレッド構文（...props）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              スプレッド構文を使うと、オブジェクトの全プロパティを一度に Props として渡せます。また、コンポーネント側で「自分が使う Props」と「残りの Props」を分けて受け取ることもできます。
            </p>

            <CodeBlock
              code={`// 基本: オブジェクトを Props として展開する
interface UserProps {
  name: string;
  age: number;
  role: string;
}

const user: UserProps = {
  name: '田中花子',
  age: 28,
  role: 'デザイナー',
};

// 1つずつ書く場合
<UserCard name={user.name} age={user.age} role={user.role} />

// スプレッド構文で一括で渡す（同じ結果になる）
<UserCard {...user} />`}
              language="tsx"
              title="Props のスプレッド: 渡す側"
            />

            <CodeBlock
              code={`import { ButtonHTMLAttributes } from 'react';

// 実践パターン: 自分の Props + HTML 属性を受け取る
interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

function MyButton({ variant = 'primary', size = 'md', ...rest }: MyButtonProps) {
  // variant と size は自分で使い、残りはすべて <button> に渡す
  const styles = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-200 text-gray-800',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={\`rounded-lg \${styles[variant]} \${sizes[size]}\`}
      {...rest}  // onClick, disabled, type, aria-* など全部渡る
    />
  );
}

// HTML の button 属性がそのまま使える
<MyButton variant="primary" onClick={() => alert('クリック！')}>
  送信
</MyButton>
<MyButton variant="secondary" disabled type="submit" aria-label="キャンセル">
  キャンセル
</MyButton>`}
              language="tsx"
              title="rest パラメータで残りの Props を受け取る"
              showLineNumbers
            />

            <InfoBox type="warning" title="スプレッドの注意点">
              <p>
                スプレッド構文は便利ですが、意図しない Props まで渡してしまうリスクがあります。特に <code>{'<div {...props} />'}</code> のように HTML 要素に直接展開すると、不正な属性が渡される可能性があります。「自分が使う Props」と「残り」を明示的に分けて受け取るパターン（上の rest の例）が安全です。
              </p>
            </InfoBox>
          </section>

          {/* 実践的なUIコンポーネント例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践的な UI コンポーネント集</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Props の使い方を理解するために、実際のデザインシステムでよく使われるコンポーネントを作ってみましょう。それぞれの Props 設計のポイントにも注目してください。
            </p>

            {/* Alert コンポーネント */}
            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Alert コンポーネント</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユーザーに通知やエラーメッセージを表示するコンポーネントです。type で見た目を切り替え、onClose で閉じる機能を提供します。
            </p>
            <CodeBlock
              code={`import { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  closable?: boolean;
  onClose?: () => void;
}

function Alert({
  children,
  type = 'info',
  title,
  closable = false,
  onClose,
}: AlertProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'i',  // 実際にはアイコンコンポーネントを使う
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: '✓',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: '!',
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: '✕',
    },
  };

  return (
    <div className={\`p-4 border rounded-lg \${styles[type].container}\`}>
      <div className="flex items-start gap-3">
        <span className="font-bold text-lg">{styles[type].icon}</span>
        <div className="flex-1">
          {title && <h4 className="font-bold mb-1">{title}</h4>}
          <div className="text-sm">{children}</div>
        </div>
        {closable && (
          <button onClick={onClose} className="text-lg leading-none opacity-60 hover:opacity-100">
            &times;
          </button>
        )}
      </div>
    </div>
  );
}

// 使用例
<Alert type="success" title="保存完了">
  変更が正常に保存されました。
</Alert>

<Alert type="error" title="エラー" closable onClose={() => console.log('閉じた')}>
  ネットワーク接続を確認してください。
</Alert>

<Alert type="warning">
  この操作は取り消せません。
</Alert>`}
              language="tsx"
              title="Alert コンポーネント"
              showLineNumbers
            />

            {/* Badge コンポーネント */}
            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Badge コンポーネント</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ステータスやカテゴリを表示する小さなラベルです。色やサイズを Props で柔軟に切り替えられます。
            </p>
            <CodeBlock
              code={`interface BadgeProps {
  label: string;
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  size?: 'sm' | 'md';
  rounded?: boolean;  // 角丸をピルにするか
  dot?: boolean;      // 先頭にドットを表示するか
}

function Badge({
  label,
  color = 'gray',
  size = 'sm',
  rounded = false,
  dot = false,
}: BadgeProps) {
  const colorStyles = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-700',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const dotColors = {
    gray: 'bg-gray-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  return (
    <span
      className={\`
        inline-flex items-center gap-1.5 font-medium
        \${colorStyles[color]}
        \${sizeStyles[size]}
        \${rounded ? 'rounded-full' : 'rounded'}
      \`}
    >
      {dot && (
        <span className={\`w-1.5 h-1.5 rounded-full \${dotColors[color]}\`} />
      )}
      {label}
    </span>
  );
}

// 使用例
<Badge label="新着" color="blue" />
<Badge label="レビュー中" color="yellow" dot />
<Badge label="公開済み" color="green" rounded />
<Badge label="下書き" color="gray" size="md" />`}
              language="tsx"
              title="Badge コンポーネント"
              showLineNumbers
            />

            {/* Avatar コンポーネント */}
            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Avatar コンポーネント</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユーザーのプロフィール画像を表示するコンポーネントです。画像がない場合はイニシャルで代替表示します。
            </p>
            <CodeBlock
              code={`interface AvatarProps {
  src?: string;          // 画像URL（オプショナル）
  name: string;          // フォールバック用の名前
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
}

function Avatar({ src, name, size = 'md', status }: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const statusColors = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    busy: 'bg-red-400',
  };

  // 名前からイニシャルを取得（例: "田中花子" → "田"）
  const initial = name.charAt(0);

  // ランダムっぽい背景色を名前から決定
  const bgColors = [
    'bg-blue-500', 'bg-purple-500', 'bg-pink-500',
    'bg-amber-500', 'bg-teal-500', 'bg-indigo-500',
  ];
  const bgColor = bgColors[name.length % bgColors.length];

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={name}
          className={\`\${sizeStyles[size]} rounded-full object-cover\`}
        />
      ) : (
        <div
          className={\`
            \${sizeStyles[size]} \${bgColor}
            rounded-full flex items-center justify-center
            text-white font-bold
          \`}
        >
          {initial}
        </div>
      )}

      {/* ステータスインジケーター */}
      {status && (
        <span
          className={\`
            absolute bottom-0 right-0
            w-3 h-3 rounded-full border-2 border-white
            \${statusColors[status]}
          \`}
        />
      )}
    </div>
  );
}

// 使用例
<Avatar name="田中花子" src="/avatars/tanaka.jpg" status="online" />
<Avatar name="佐藤太郎" size="lg" status="busy" />  {/* 画像なし: イニシャル表示 */}
<Avatar name="鈴木" size="sm" />  {/* ステータスなし */}`}
              language="tsx"
              title="Avatar コンポーネント"
              showLineNumbers
            />

            {/* Tag コンポーネント */}
            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Tag コンポーネント</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              削除可能なタグは、フィルタリング UI やタグ入力などでよく使われるパターンです。
            </p>
            <CodeBlock
              code={`interface TagProps {
  label: string;
  onRemove?: () => void;  // 削除ハンドラがあれば削除ボタンを表示
  color?: 'default' | 'blue' | 'green' | 'red';
  icon?: ReactNode;       // タグの先頭にアイコンを表示
}

function Tag({ label, onRemove, color = 'default', icon }: TagProps) {
  const colorStyles = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <span
      className={\`
        inline-flex items-center gap-1 px-2.5 py-1
        text-sm font-medium border rounded-md
        \${colorStyles[color]}
      \`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 opacity-60 hover:opacity-100 text-base leading-none"
          aria-label={\`\${label} を削除\`}
        >
          &times;
        </button>
      )}
    </span>
  );
}

// 使用例
<Tag label="React" color="blue" />
<Tag label="TypeScript" color="blue" onRemove={() => console.log('削除')} />
<Tag label="完了" color="green" />
<Tag label="緊急" color="red" onRemove={() => handleRemove('urgent')} />`}
              language="tsx"
              title="Tag コンポーネント"
              showLineNumbers
            />

            <InfoBox type="success" title="Props 設計のポイント">
              <p>
                これらのコンポーネントに共通するパターンを整理すると: (1) 必須の Props は最小限にする、(2) オプショナル Props にはデフォルト値を設定する、(3) ユニオン型でバリエーションを制限する、(4) 関数型の Props でカスタム動作を可能にする。この4つを意識すると、使いやすいコンポーネント API が設計できます。
              </p>
            </InfoBox>
          </section>

          {/* 実践例: ProfileCard */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: ProfileCard コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまで学んだことを組み合わせて、実際のデザインで使えるプロフィールカードコンポーネントを作ってみましょう。
            </p>
            <CodeBlock
              code={`import { ReactNode } from 'react';

// Props の型定義
interface ProfileCardProps {
  name: string;
  role: string;
  avatar: string;
  bio?: string;           // オプショナル
  skills?: string[];      // オプショナル
  isAvailable?: boolean;  // デフォルト: true
  children?: ReactNode;   // 追加コンテンツ用
}

function ProfileCard({
  name,
  role,
  avatar,
  bio,
  skills = [],
  isAvailable = true,
  children,
}: ProfileCardProps) {
  return (
    <div className="max-w-sm border rounded-2xl overflow-hidden shadow-lg bg-white">
      {/* ヘッダー部分 */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-500" />

      {/* アバターとステータス */}
      <div className="px-6 -mt-12">
        <div className="relative inline-block">
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          {isAvailable && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
          )}
        </div>
      </div>

      {/* 情報部分 */}
      <div className="px-6 py-4">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>

        {bio && (
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">{bio}</p>
        )}

        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* children で追加コンテンツを表示 */}
        {children && <div className="mt-4 pt-4 border-t">{children}</div>}
      </div>
    </div>
  );
}

export default ProfileCard;`}
              language="tsx"
              title="ProfileCard.tsx - 完成版"
              showLineNumbers
            />
            <CodeBlock
              code={`// ProfileCard の使用例
import ProfileCard from './ProfileCard';

function TeamPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {/* 基本的な使い方 */}
      <ProfileCard
        name="田中花子"
        role="UI/UX デザイナー"
        avatar="/avatars/tanaka.jpg"
      />

      {/* すべての Props を渡す */}
      <ProfileCard
        name="佐藤太郎"
        role="フロントエンドエンジニア"
        avatar="/avatars/sato.jpg"
        bio="React と TypeScript が好きです。デザインシステムの構築に興味があります。"
        skills={['React', 'TypeScript', 'Figma', 'Tailwind']}
        isAvailable={true}
      />

      {/* children を使って追加コンテンツ */}
      <ProfileCard
        name="山田次郎"
        role="プロダクトマネージャー"
        avatar="/avatars/yamada.jpg"
        isAvailable={false}
      >
        <a href="/contact" className="text-blue-600 hover:underline text-sm">
          メッセージを送る
        </a>
      </ProfileCard>
    </div>
  );
}`}
              language="tsx"
              title="ProfileCard の使用例"
            />
          </section>

          {/* Quiz 1 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">理解度チェック</h2>

            <Quiz
              question="Props のデータの流れとして正しいのはどれですか？"
              options={[
                { label: '子コンポーネントから親コンポーネントへ流れる' },
                { label: '親コンポーネントから子コンポーネントへ一方向に流れる', correct: true },
                { label: '親子間で双方向にデータをやりとりできる' },
                { label: 'どのコンポーネントからでも自由にアクセスできる' },
              ]}
              explanation="React の Props は常に親から子への一方向データフロー（one-way data flow）です。子コンポーネントは受け取った Props を直接変更できません。子から親にデータを伝えたい場合は、親がコールバック関数を Props として渡し、子がその関数を呼び出すパターンを使います（イベント処理で学びます）。"
            />

            <Quiz
              question="children prop の使い方として正しいのはどれですか？"
              options={[
                { label: 'children は文字列しか受け取れない' },
                { label: 'children は props オブジェクトに含まれず、別の引数として渡される' },
                { label: 'コンポーネントの開始タグと終了タグの間に書いた内容が children として渡される', correct: true },
                { label: 'children を使うにはコンポーネント側で useChildren() を呼ぶ必要がある' },
              ]}
              explanation="children は特別な Props で、<Component>ここの内容</Component> のようにタグの間に書いた内容が自動的に children として渡されます。文字列だけでなく、JSX や他のコンポーネントも渡せます。型は ReactNode を使います。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="Badge コンポーネントを Props で柔軟にしよう"
              description="以下の Badge コンポーネントに、color（'blue' | 'green' | 'red'、デフォルト 'blue'）と size（'sm' | 'md'、デフォルト 'sm'）の Props を追加して、見た目を切り替えられるようにしてください。"
              initialCode={`interface BadgeProps {
  label: string;
  // ここに color と size の Props を追加
}

function Badge({ label }: BadgeProps) {
  return (
    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
      {label}
    </span>
  );
}`}
              answer={`interface BadgeProps {
  label: string;
  color?: 'blue' | 'green' | 'red';
  size?: 'sm' | 'md';
}

function Badge({ label, color = 'blue', size = 'sm' }: BadgeProps) {
  const colorStyles = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={\`\${colorStyles[color]} \${sizeStyles[size]} rounded\`}>
      {label}
    </span>
  );
}`}
              keywords={["color?:", "size?:", "'blue' | 'green' | 'red'", "'sm' | 'md'"]}
              hints={[
                'color と size にはそれぞれ ? をつけてオプショナルにしましょう',
                'ユニオン型（"blue" | "green" | "red"）で値を制限します',
                '分割代入のデフォルト値（color = "blue"）を設定しましょう',
                'Record やオブジェクトで、色・サイズごとのクラス名をマッピングすると綺麗です',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">Props の基本</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 親から子への一方向データフロー</li>
                  <li>- 文字列、数値、真偽値、オブジェクト、配列を渡せる</li>
                  <li>- 子コンポーネントは Props を変更できない</li>
                  <li>- children でタグ間のコンテンツを渡せる</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">実践ポイント</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- デフォルト値で使いやすい API を設計する</li>
                  <li>- children でレイアウトコンポーネントを作る</li>
                  <li>- interface で Props の型を明確にする</li>
                  <li>- スプレッド構文で HTML 属性を透過的に渡す</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Passing Props to a Component - React 公式',
                  url: 'https://react.dev/learn/passing-props-to-a-component',
                  description: 'Props の渡し方、分割代入、children、デフォルト値など基本を網羅した公式ガイド',
                },
                {
                  title: 'Thinking in React - React 公式',
                  url: 'https://react.dev/learn/thinking-in-react',
                  description: 'コンポーネント分割と Props によるデータフローの設計思想を学べる',
                },
                {
                  title: 'Component Props - TypeScript + React',
                  url: 'https://react.dev/learn/typescript#typing-component-props',
                  description: 'Props に TypeScript の型をつける方法の公式ガイド',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'props を子コンポーネントから親コンポーネントに渡せますか？',
                  answer: '直接渡すことはできません。React のデータフローは親→子の一方向です。ただし、親がコールバック関数を props として子に渡し、子がその関数を呼び出すことで、間接的に親にデータを伝えることができます。例えば onClick={() => onSelect(id)} のように、子がイベント発生時に親の関数を呼ぶパターンです。これは次のステップ「イベント処理」で詳しく学びます。',
                },
                {
                  question: 'props が多すぎる場合はどうすればいいですか？',
                  answer: 'props が 5 つ以上になったら、設計を見直すサインです。対策としては: (1) 関連する props をオブジェクトにまとめる（user={{ name, email }} など）、(2) children や合成（Composition）パターンを使う、(3) コンポーネントを分割して責務を減らす。「Props Drilling」（何階層もバケツリレーで渡す）が起きている場合は、Context API の利用を検討します。',
                },
                {
                  question: 'props と state の違いは何ですか？',
                  answer: 'props は「外から受け取る読み取り専用のデータ」、state は「コンポーネント内部で管理する変更可能なデータ」です。props は関数の引数、state は関数内のローカル変数に例えられます。親コンポーネントの state を子コンポーネントに props として渡すのが React の典型的なパターンです。state については次のステップ「useState」で詳しく学びます。',
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
