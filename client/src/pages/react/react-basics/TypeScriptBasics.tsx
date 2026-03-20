import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function TypeScriptBasics() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 7</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          TypeScript で型をつける
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Figma のプロパティパネルを思い出してください。ボタンコンポーネントに「テキスト」「バリアント（Primary / Secondary）」「サイズ（S / M / L）」「Disabled（ON / OFF）」と設定しますよね。TypeScript の型定義は、まさにコード版のプロパティパネルです。
        </p>

        <WhyNowBox tags={['Figma × コード', 'デザインシステム', '型 = プロパティパネル', 'バリアント定義']}>
          <p>
            Props を学んだ今こそ TypeScript の出番です。型があると「このコンポーネントには何を渡せるか」がエディタ上で一目瞭然になり、Figma のプロパティパネルと同じ役割を果たします。
          </p>
          <p>
            デザイナーが TypeScript を理解すると、エンジニアとの「このプロパティの型は？」という会話がスムーズになり、デザインシステムの品質が格段に上がります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* Figma → TypeScript の対応 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Figma のプロパティ = TypeScript の型</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Figma でコンポーネントのプロパティを設定するとき、「テキスト」「真偽値（Boolean）」「バリアント」を選びます。TypeScript でも同じことをコードで表現します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-3 text-sm">Figma のプロパティパネル</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /> Label → <strong>テキスト</strong></li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> Disabled → <strong>Boolean</strong></li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500" /> Size → <strong>バリアント (S / M / L)</strong></li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500" /> Icon → <strong>インスタンスの入れ替え</strong></li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-3 text-sm">TypeScript の型定義</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /> label: <code className="text-xs bg-muted px-1 rounded">string</code></li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> disabled: <code className="text-xs bg-muted px-1 rounded">boolean</code></li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500" /> size: <code className="text-xs bg-muted px-1 rounded">'sm' | 'md' | 'lg'</code></li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500" /> icon: <code className="text-xs bg-muted px-1 rounded">ReactNode</code></li>
                </ul>
              </div>
            </div>
            <InfoBox type="info" title="型があると何が嬉しい？">
              <p>
                Figma で Boolean プロパティに「テキスト」を入力しようとしてもできないように、TypeScript でも <code>disabled</code> に文字列を渡そうとするとエラーになります。間違った使い方をコードを書いている段階で防いでくれるのが型の力です。
              </p>
            </InfoBox>
          </section>

          {/* Badge コンポーネントで体験する基本の型 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Badge で型を体験しよう</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              まずはシンプルな Badge コンポーネントで、型がどう使われるか体験しましょう。<strong>コードを編集して</strong>、label や variant の値を変えてみてください。
            </p>
            <CodePreview
              code={`// interface = Figma のプロパティパネルの定義
// 「このコンポーネントに何を渡せるか」を宣言する

function Badge({ label, variant = 'default', size = 'md' }) {
  const colors = {
    default: { bg: '#e5e7eb', text: '#374151' },
    primary: { bg: '#dbeafe', text: '#1d4ed8' },
    success: { bg: '#dcfce7', text: '#15803d' },
    warning: { bg: '#fef3c7', text: '#92400e' },
    danger:  { bg: '#fee2e2', text: '#991b1b' },
  };
  const sizes = {
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '4px 12px', fontSize: '13px' },
    lg: { padding: '6px 16px', fontSize: '15px' },
  };
  const c = colors[variant] || colors.default;
  const s = sizes[size] || sizes.md;

  return (
    <span style={{
      ...s, backgroundColor: c.bg, color: c.text,
      borderRadius: '9999px', fontWeight: 600,
      display: 'inline-block', fontFamily: 'system-ui',
    }}>
      {label}
    </span>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge label="デフォルト" />
      <Badge label="新着" variant="primary" />
      <Badge label="公開中" variant="success" />
      <Badge label="確認待ち" variant="warning" />
      <Badge label="エラー" variant="danger" />
      <Badge label="小さい" variant="primary" size="sm" />
      <Badge label="大きい" variant="success" size="lg" />
    </div>
  );
}`}
              language="tsx"
              title="Badge - variant と size を変えてみよう"
              previewHeight={80}
            />
            <CodeBlock
              code={`// 上の Badge を TypeScript で型定義すると...

// Figma の「バリアント」 = ユニオン型
type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
type BadgeSize = 'sm' | 'md' | 'lg';

// Figma の「プロパティパネル」 = interface
interface BadgeProps {
  label: string;              // テキストプロパティ（必須）
  variant?: BadgeVariant;     // バリアント（?でオプショナル = Figma のデフォルト値あり）
  size?: BadgeSize;           // サイズ（省略可 → デフォルトは 'md'）
}

function Badge({ label, variant = 'default', size = 'md' }: BadgeProps) {
  // ...
}`}
              language="tsx"
              title="TypeScript の型定義 = Figma プロパティパネルのコード版"
            />
          </section>

          {/* interface と type */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">interface と type の使い分け</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              型を定義する書き方は2種類あります。<strong>interface</strong>（コンポーネントの Props に使う）と <strong>type</strong>（バリアントやユニオン型に使う）です。
            </p>
            <CodeBlock
              code={`// ── type: 選択肢（バリアント）の定義 ──
// Figma のバリアントプロパティに対応
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

// ── interface: コンポーネントの Props 定義 ──
// Figma のプロパティパネル全体に対応
interface ButtonProps {
  children: ReactNode;         // ボタンの中身（テキストやアイコン）
  variant?: ButtonVariant;     // バリアント（省略可 → デフォルト 'primary'）
  size?: ButtonSize;           // サイズ（省略可 → デフォルト 'md'）
  disabled?: boolean;          // 無効状態（省略可 → デフォルト false）
  fullWidth?: boolean;         // 全幅表示（省略可）
  onClick?: () => void;        // クリック時の処理
}

// 使い分けルール:
// 1. コンポーネントの Props → interface
// 2. バリアントの選択肢 → type
// 3. 迷ったら interface`}
              language="tsx"
              title="type = 選択肢、interface = プロパティ全体"
            />
            <InfoBox type="success" title="プロジェクト内で統一が大事">
              <p>
                interface と type はほぼ同じことができます。大事なのはプロジェクト内で統一すること。このマニュアルでは「Props は interface、選択肢は type」で統一しています。
              </p>
            </InfoBox>
          </section>

          {/* Card コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Card コンポーネントで実践する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              デザインシステムでよく見る Card コンポーネントを作ってみましょう。Props を変えてバリエーションが生まれる様子を確認してください。
            </p>
            <CodePreview
              code={`function Card({ title, description, variant = 'elevated', image, tag }) {
  const variants = {
    elevated: {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06)',
      border: 'none',
    },
    outlined: {
      boxShadow: 'none',
      border: '1px solid #e5e7eb',
    },
    filled: {
      boxShadow: 'none',
      border: 'none',
      backgroundColor: '#f3f4f6',
    },
  };
  const v = variants[variant] || variants.elevated;

  return (
    <div style={{
      ...v, borderRadius: '12px', overflow: 'hidden',
      backgroundColor: v.backgroundColor || '#fff', maxWidth: '280px',
    }}>
      {image && (
        <div style={{ height: '140px', background: image, backgroundSize: 'cover' }} />
      )}
      <div style={{ padding: '16px' }}>
        {tag && (
          <span style={{
            fontSize: '11px', fontWeight: 600, color: '#2563eb',
            backgroundColor: '#dbeafe', padding: '2px 8px', borderRadius: '9999px',
          }}>{tag}</span>
        )}
        <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '8px 0 4px', color: '#111827' }}>{title}</h3>
        {description && (
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{description}</p>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card
        title="Elevated カード"
        description="影で浮いて見えるスタイル。デフォルト。"
        tag="デフォルト"
        image="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      />
      <Card
        title="Outlined カード"
        description="ボーダーで区切るスタイル。"
        variant="outlined"
        tag="outlined"
        image="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      />
      <Card
        title="Filled カード"
        description="背景色で区切るスタイル。"
        variant="filled"
        tag="filled"
        image="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      />
    </div>
  );
}`}
              language="tsx"
              title="Card - variant / image / tag を変えてみよう"
              previewHeight={300}
            />
            <CodeBlock
              code={`// この Card の TypeScript 型定義

interface CardProps {
  title: string;                                    // 必須: カードタイトル
  description?: string;                             // 省略可: 説明文
  variant?: 'elevated' | 'outlined' | 'filled';     // 省略可: スタイル
  image?: string;                                   // 省略可: 背景画像（CSS gradient OK）
  tag?: string;                                     // 省略可: タグラベル
}

// ? がついた Props = Figma でデフォルト値があるプロパティ
// ? がない Props = Figma で「必須」マークがついているプロパティ`}
              language="tsx"
              title="Card の型定義"
            />
          </section>

          {/* 型推論 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">型推論 ー 全部書かなくていい</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TypeScript は賢いので、多くの場面で型を自動推論してくれます。「書かなくても推論できる場面」と「明示的に書くべき場面」を知っておきましょう。
            </p>
            <CodeBlock
              code={`// ✅ 型を書かなくてOK（自動推論される）
const brandColor = '#2563eb';        // string と推論
const spacing = 16;                   // number と推論
const isVisible = true;               // boolean と推論
const variants = ['sm', 'md', 'lg'];  // string[] と推論

// ✅ 関数の戻り値も推論される
function getLabel(count: number) {
  return count === 0 ? 'なし' : \`\${count}件\`;  // string と推論
}

// ⚠️ 型を書くべき場面
// 1. 関数の引数 → 推論できないので必須
function Badge({ label, variant }: BadgeProps) { ... }

// 2. 空の配列 → 中身がわからない
const items: string[] = [];

// 3. useState で null から始める場合
const [user, setUser] = useState<User | null>(null);`}
              language="tsx"
              title="型推論: 書く場面と書かない場面"
            />
            <InfoBox type="info" title="VS Code で確認しよう">
              <p>
                変数にマウスカーソルを合わせると推論された型が表示されます。推論が正しければ型を書く必要はありません。「推論結果が意図と違う」場合だけ明示しましょう。
              </p>
            </InfoBox>
          </section>

          {/* Alert コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Alert コンポーネントを作ろう</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              type（種類）によって色とアイコンが変わる Alert コンポーネントです。<strong>type の値を "info" / "warning" / "error" / "success" に変えて</strong>、見た目の変化を確認してください。
            </p>
            <CodePreview
              code={`function Alert({ title, message, type = 'info', closable = false }) {
  const styles = {
    info:    { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af', icon: 'ℹ️' },
    success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534', icon: '✓' },
    warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e', icon: '⚠' },
    error:   { bg: '#fef2f2', border: '#fecaca', text: '#991b1b', icon: '✕' },
  };
  const s = styles[type] || styles.info;

  return (
    <div style={{
      padding: '12px 16px', borderRadius: '8px', border: '1px solid ' + s.border,
      backgroundColor: s.bg, display: 'flex', gap: '12px', alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '16px', lineHeight: '24px', flexShrink: 0 }}>{s.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 700, fontSize: '14px', color: s.text, margin: 0 }}>{title}</p>
        <p style={{ fontSize: '13px', color: s.text, opacity: 0.85, margin: '2px 0 0' }}>{message}</p>
      </div>
      {closable && (
        <button style={{
          background: 'none', border: 'none', color: s.text, opacity: 0.5,
          cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: 0, flexShrink: 0,
        }}>×</button>
      )}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '480px' }}>
      <Alert title="保存しました" message="変更内容が正常に保存されました。" type="success" />
      <Alert title="ヒント" message="Cmd+S で素早く保存できます。" type="info" />
      <Alert title="注意" message="この操作は取り消せません。" type="warning" closable />
      <Alert title="エラー" message="ネットワーク接続を確認してください。" type="error" closable />
    </div>
  );
}`}
              language="tsx"
              title="Alert - type と closable を変えてみよう"
              previewHeight={240}
            />
          </section>

          {/* ジェネリクス（簡潔に） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ジェネリクス ー 型の引数</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ジェネリクスは「型の引数」です。難しく聞こえますが、日常で使う場面は限られています。<strong>useState で null から始める場合</strong> だけ覚えておけば最初は十分です。
            </p>
            <CodeBlock
              code={`// ジェネリクスを使う場面（ほぼこの2パターンだけ）

// 1. useState で初期値が null のとき
interface User {
  id: number;
  name: string;
  avatar: string;
}
const [user, setUser] = useState<User | null>(null);
//                                ^^^^^^^^^^^
// 「User か null のどちらか」を明示

// 2. 空配列の型を指定するとき
interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}
const [todos, setTodos] = useState<TodoItem[]>([]);
//                                 ^^^^^^^^^^
// 「TodoItem の配列」を明示

// 初期値がある場合は自動推論されるのでジェネリクス不要
const [count, setCount] = useState(0);        // number と推論
const [name, setName] = useState('');          // string と推論
const [isOpen, setIsOpen] = useState(false);   // boolean と推論`}
              language="tsx"
              title="ジェネリクス: useState で使う2パターン"
            />
            <InfoBox type="info" title="最初は覚えなくて大丈夫">
              <p>
                ジェネリクスは TypeScript の中でも難しい概念です。ライブラリのドキュメントで <code>{'<T>'}</code> が出てきたら「ここに具体的な型が入る」と理解できれば OK です。
              </p>
            </InfoBox>
          </section>

          {/* 便利な型ユーティリティ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">便利な型ユーティリティ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              既存の型を変換して新しい型を作る仕組みがあります。デザインシステムの「すべて必須の Props」から「更新時は一部だけ渡す」型を作るときに便利です。
            </p>
            <CodeBlock
              code={`interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

// Partial<T> → 全プロパティを省略可にする
// 使い道: プロフィール編集（一部だけ更新）
type ProfileUpdate = Partial<UserProfile>;
// { name?: string; email?: string; avatar?: string; bio?: string; }

// Pick<T, K> → 必要なプロパティだけ取り出す
// 使い道: ユーザー一覧では名前とアバターだけ表示
type UserPreview = Pick<UserProfile, 'name' | 'avatar'>;
// { name: string; avatar: string; }

// Omit<T, K> → 不要なプロパティを除外する
// 使い道: 新規作成時は ID 不要
type CreateInput = Omit<UserProfile, 'id'>;`}
              language="tsx"
              title="Partial / Pick / Omit ー 型の変換"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2 text-sm">{'Partial<T>'}</h3>
                <p className="text-xs text-muted-foreground">全プロパティを省略可に。部分更新やフォームの初期値に。</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2 text-sm">{'Pick<T, K>'}</h3>
                <p className="text-xs text-muted-foreground">指定プロパティだけ抜き出す。一覧やサマリーに。</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2 text-sm">{'Omit<T, K>'}</h3>
                <p className="text-xs text-muted-foreground">指定プロパティを除外。新規作成時の入力型に。</p>
              </div>
            </div>
          </section>

          {/* 実践: デザインシステム Button */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践: デザインシステムの Button</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの知識を使って、Figma で設計するようなバリアント・サイズ・状態を持つ Button を作ります。<strong>variant / size / disabled の値を変えて</strong>デザインバリエーションを確認してください。
            </p>
            <CodePreview
              code={`function Button({ children, variant = 'primary', size = 'md', disabled = false, onClick }) {
  const variantStyles = {
    primary:   { backgroundColor: '#2563eb', color: '#fff', border: 'none' },
    secondary: { backgroundColor: '#f3f4f6', color: '#374151', border: 'none' },
    outline:   { backgroundColor: 'transparent', color: '#2563eb', border: '1.5px solid #2563eb' },
    ghost:     { backgroundColor: 'transparent', color: '#6b7280', border: 'none' },
    danger:    { backgroundColor: '#ef4444', color: '#fff', border: 'none' },
  };
  const sizeStyles = {
    sm: { padding: '6px 14px', fontSize: '13px', borderRadius: '6px' },
    md: { padding: '8px 18px', fontSize: '14px', borderRadius: '8px' },
    lg: { padding: '12px 24px', fontSize: '16px', borderRadius: '10px' },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variantStyles[variant], ...sizeStyles[size],
        fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1, fontFamily: 'system-ui',
        transition: 'opacity 0.15s',
      }}
    >{children}</button>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled</Button>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="Button - デザインシステムのバリアント一覧"
              previewHeight={180}
            />
            <CodeBlock
              code={`// この Button の完全な TypeScript 型定義

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;           // ボタンの中身
  variant?: ButtonVariant;       // バリアント（省略可 → 'primary'）
  size?: ButtonSize;             // サイズ（省略可 → 'md'）
  disabled?: boolean;            // 無効状態（省略可 → false）
  onClick?: () => void;          // クリックハンドラ
}

// Figma のプロパティパネルと 1:1 で対応している
// → デザイナーとエンジニアが同じ言葉で会話できる`}
              language="tsx"
              title="Button の型定義 = Figma プロパティパネルのコード版"
            />
          </section>

          {/* React の組み込み型（簡潔に） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よく使う React の型</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React の型で覚えておくべきものは3つだけです。
            </p>
            <CodeBlock
              code={`import { ReactNode, CSSProperties } from 'react';

// 1. ReactNode → 子要素の型（最頻出）
// テキスト、数値、JSX、null、配列すべて含む万能型
interface CardProps {
  children: ReactNode;
}

// 2. CSSProperties → インラインスタイルの型
interface BoxProps {
  style?: CSSProperties;
}

// 3. イベントハンドラの型
interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// おまけ: React.FC は使わない（旧式の書き方）
// ❌ const Card: React.FC<CardProps> = ({ children }) => { ... }
// ✅ function Card({ children }: CardProps) { ... }`}
              language="tsx"
              title="覚えるのは ReactNode / CSSProperties / イベント型の3つ"
            />
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">理解度チェック</h2>

            <Quiz
              question="Figma で「バリアント: Primary / Secondary / Ghost」を設定しました。TypeScript ではどう書きますか？"
              options={[
                { label: "variant: string" },
                { label: "variant: 'Primary' | 'Secondary' | 'Ghost'", correct: true },
                { label: "variant: boolean" },
                { label: "variant: number" },
              ]}
              explanation="バリアントは「決まった選択肢の中から1つ」なので、ユニオン型（ | で区切る）で表現します。string だと何でも入ってしまうので、選択肢を限定するのが型の強みです。"
            />

            <Quiz
              question="次のうち、? をつけて省略可能にすべき Props はどれですか？"
              options={[
                { label: "ボタンの label（テキスト）" },
                { label: "カードの title（タイトル）" },
                { label: "アバターの size（サイズ）。デフォルトは 48px", correct: true },
                { label: "入力フォームの onChange（変更ハンドラ）" },
              ]}
              explanation="size はデフォルト値（48px）があるので省略可能です。省略された場合にデフォルト値が使われます。label や title のように「なければ表示できない」ものは必須（?なし）にします。"
            />
          </section>

          {/* CodingChallenge */}
          <section>
            <CodingChallenge
              title="Figma のプロパティパネルを TypeScript で書こう"
              description="StatusBadge の interface を完成させてください。___ の部分を埋めて、label（必須 string）、status（必須ユニオン型）、size（省略可ユニオン型）を定義しましょう。"
              preview
              initialCode={`import { ReactNode } from 'react';

interface StatusBadgeProps {
  label: ___;  // ← ここを埋める（型名）
  status: 'active' | 'inactive' | 'pending';
  ___: 'sm' | 'lg';  // ← ここを埋める（省略可能にする）
}

function StatusBadge({ label, status, size = 'sm' }: StatusBadgeProps) {
  const colors = {
    active: '#16a34a',
    inactive: '#9ca3af',
    pending: '#f59e0b',
  };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: size === 'lg' ? '6px 14px' : '3px 10px',
      fontSize: size === 'lg' ? '14px' : '12px',
      fontWeight: 600, borderRadius: '9999px',
      backgroundColor: colors[status] + '20',
      color: colors[status],
    }}>
      <span style={{
        width: '6px', height: '6px', borderRadius: '50%',
        backgroundColor: colors[status],
      }} />
      {label}
    </span>
  );
}`}
              answer={`import { ReactNode } from 'react';

interface StatusBadgeProps {
  label: string;
  status: 'active' | 'inactive' | 'pending';
  size?: 'sm' | 'lg';
}

function StatusBadge({ label, status, size = 'sm' }: StatusBadgeProps) {
  const colors = {
    active: '#16a34a',
    inactive: '#9ca3af',
    pending: '#f59e0b',
  };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: size === 'lg' ? '6px 14px' : '3px 10px',
      fontSize: size === 'lg' ? '14px' : '12px',
      fontWeight: 600, borderRadius: '9999px',
      backgroundColor: colors[status] + '20',
      color: colors[status],
    }}>
      <span style={{
        width: '6px', height: '6px', borderRadius: '50%',
        backgroundColor: colors[status],
      }} />
      {label}
    </span>
  );
}`}
              keywords={['label: string', 'size?:']}
              hints={[
                'label にはテキストが入るので、型は string です',
                'size はデフォルト値があり省略可能なので ? をつけます（size?: ...）',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2 text-sm">Figma → TypeScript 対応表</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>テキストプロパティ → <code className="text-xs bg-muted px-1 rounded">string</code></li>
                  <li>Boolean プロパティ → <code className="text-xs bg-muted px-1 rounded">boolean</code></li>
                  <li>バリアント → <code className="text-xs bg-muted px-1 rounded">'a' | 'b' | 'c'</code></li>
                  <li>デフォルト値あり → <code className="text-xs bg-muted px-1 rounded">?</code>（省略可）</li>
                  <li>子要素（Slot） → <code className="text-xs bg-muted px-1 rounded">ReactNode</code></li>
                  <li>プロパティパネル全体 → <code className="text-xs bg-muted px-1 rounded">interface</code></li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2 text-sm">実践のコツ</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>Props は interface で定義する</li>
                  <li>バリアントはユニオン型で表現</li>
                  <li>型推論に任せ、必要なところだけ書く</li>
                  <li>ジェネリクスは useState{'<T | null>'}(null) で慣れる</li>
                  <li>React.FC は使わない</li>
                  <li>迷ったらエディタにマウスホバーで確認</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Using TypeScript - React 公式',
                  url: 'https://react.dev/learn/typescript',
                  description: 'React 公式の TypeScript ガイド。Props の型付け、Hooks の型、イベントの型など',
                },
                {
                  title: 'TypeScript Handbook',
                  url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
                  description: 'TypeScript 公式ハンドブック。基本型からジェネリクスまで体系的に学べる',
                },
                {
                  title: 'React TypeScript Cheatsheet',
                  url: 'https://react-typescript-cheatsheet.netlify.app/',
                  description: 'React + TypeScript のパターン集。実務でよく使う型の書き方がまとまっている',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'デザイナーも TypeScript を書けるようになるべきですか？',
                  answer: '読めるようになることが重要です。Props の interface を見れば「このコンポーネントに何を渡せるか」がわかります。Figma のプロパティパネルと同じ情報がコードに書かれているので、デザイナーにとっても実は読みやすい形式です。書くことは必須ではありませんが、読めるとエンジニアとのコミュニケーションが格段にスムーズになります。',
                },
                {
                  question: 'any 型は使ってもいいですか？',
                  answer: 'any を使うと TypeScript の型チェックが無効になり、型を使うメリットがなくなります。プロトタイプ段階で一時的に使い、後で正しい型に置き換えるのは現実的なアプローチですが、本番コードでは避けましょう。「型がわからない」ときは unknown を使うのが安全です。',
                },
                {
                  question: 'interface と type はどちらを使うべきですか？',
                  answer: 'チーム内で統一されていればどちらでもOKです。おすすめは「Props は interface、バリアントの選択肢は type」という使い分けです。interface は extends で拡張しやすく、エラーメッセージも読みやすいメリットがあります。',
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
