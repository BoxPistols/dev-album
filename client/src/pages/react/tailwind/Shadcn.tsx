import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Shadcn() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 27</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">shadcn/ui</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          コピー&ペーストで使える美しい UI コンポーネント集。Tailwind CSS と Radix UI をベースにした、完全にカスタマイズ可能なコンポーネントを学びましょう。
        </p>

        <WhyNowBox tags={['shadcn/ui', 'Radix UI', 'コンポーネントライブラリ', 'カスタマイズ']}>
          <p>
            shadcn/ui は「ライブラリ」ではなく「コピー&ペーストで使うコンポーネント集」です。
            npm でインストールする従来のライブラリと違い、コードが自分のプロジェクトに直接コピーされるため、
            完全に自由にカスタマイズできます。Tailwind CSS の知識をそのまま活かせるので、
            デザイナーがデザインシステムを構築するのに最適です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: shadcn/ui とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">shadcn/ui とは</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui は Vercel のエンジニア shadcn が作った、再利用可能な UI コンポーネント集です。
              重要なのは<strong>「ライブラリではない」</strong>という点です。
            </p>

            <CodeBlock
              language="tsx"
              title="従来のライブラリとの違い"
              code={`// ❌ 従来のコンポーネントライブラリ（例: MUI）
// → npm install でインストール
// → node_modules にコードがある
// → カスタマイズに制限がある
import { Button } from '@mui/material';

// ✅ shadcn/ui
// → CLI でコンポーネントをプロジェクトにコピー
// → src/components/ui/ にコードがある
// → 完全に自由にカスタマイズできる
import { Button } from '@/components/ui/button';`}
            />

            <InfoBox type="info" title="shadcn/ui の特徴">
              <ul className="list-disc pl-4 space-y-1">
                <li>Tailwind CSS でスタイリングされている</li>
                <li>Radix UI をベースにアクセシビリティ対応済み</li>
                <li>コードが自分のプロジェクトにコピーされるため完全カスタマイズ可能</li>
                <li>必要なコンポーネントだけを追加できる（バンドルサイズが小さい）</li>
                <li>TypeScript で型安全</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション2: インストール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">インストールとセットアップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Vite + React プロジェクトに shadcn/ui をセットアップしましょう。
            </p>

            <CodeBlock
              language="bash"
              title="1. 新規プロジェクト作成（既存プロジェクトの場合はスキップ）"
              code={`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="bash"
              title="2. shadcn/ui の初期化"
              code={`npx shadcn@latest init`}
            />

            <p className="text-muted-foreground my-4 leading-relaxed">
              初期化時にいくつかの質問が表示されます。
            </p>

            <CodeBlock
              language="bash"
              title="初期化時の質問と推奨回答"
              code={`# shadcn/ui の最新 CLI では質問が簡略化されています
# プロジェクトに応じて設定が自動検出されます
? Which color would you like to use as the base color? → Neutral
? Would you like to use CSS variables for theming? → Yes`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="bash"
              title="3. コンポーネントの追加"
              code={`# 個別にコンポーネントを追加
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add select

# 複数同時に追加
npx shadcn@latest add button card dialog input select`}
            />

            <InfoBox type="info" title="追加されるファイル">
              <p>
                コンポーネントは <code>src/components/ui/</code> ディレクトリにコピーされます。
                例えば <code>button.tsx</code>、<code>card.tsx</code> のように、
                通常の React コンポーネントとして追加されます。自由に中身を編集できます。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: Button コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Button コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui の Button はバリアント（種類）とサイズを props で切り替えられます。
              実物は <code>npx shadcn@latest add button</code> で生成されます。
              下のプレビューでは、仕組みが見えるよう cva（class-variance-authority）を
              「variant → クラス文字列のマップ」に単純化した抜粋を定義して動かしています。
            </p>

            <CodePreview
              language="tsx"
              title="Button の使い方"
              previewHeight={200}
              libs={['tailwind']}
              code={`// 簡略版 Button — 実物は npx shadcn@latest add button で生成される
// 仕組みが見えるよう cva を「variant → クラス文字列のマップ」に単純化した抜粋
// 本来は bg-primary 等の CSS 変数を使うが、プレビュー用に具体色（zinc 系）へ置き換えている
const buttonVariants = {
  variant: {
    default: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700',
    destructive: 'bg-red-600 text-zinc-50 hover:bg-red-700',
    outline: 'border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-800',
    ghost: 'bg-transparent text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800',
    link: 'bg-transparent text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50',
  },
  size: {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
  },
};

function Button({ variant = 'default', size = 'default', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50';
  return (
    <button
      className={[base, buttonVariants.variant[variant], buttonVariants.size[size], className].join(' ')}
      {...props}
    />
  );
}

function App() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* バリアント */}
      <Button>デフォルト</Button>
      <Button variant="secondary">セカンダリ</Button>
      <Button variant="destructive">削除</Button>
      <Button variant="outline">アウトライン</Button>
      <Button variant="ghost">ゴースト</Button>
      <Button variant="link">リンク</Button>

      {/* サイズ */}
      <Button size="sm">小さい</Button>
      <Button>標準</Button>
      <Button size="lg">大きい</Button>

      {/* 無効 */}
      <Button disabled>無効</Button>
    </div>
  );
}`}
            />
          </section>

          {/* セクション4: Card コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Card コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Card は複数のサブコンポーネント（Header、Title、Content、Footer）を組み合わせて使います。
              プレビューには <code>npx shadcn@latest add card</code> で生成される実装を単純化した抜粋を定義しています。
            </p>

            <CodePreview
              language="tsx"
              title="Card の使い方"
              previewHeight={300}
              libs={['tailwind']}
              code={`// 簡略版 Card / Button — 実物は npx shadcn@latest add card button で生成される
// 本来の bg-card 等の CSS 変数はプレビュー用に具体色（zinc 系）へ置き換えている
function Card({ className = '', ...props }) {
  return (
    <div
      className={
        'rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 ' +
        className
      }
      {...props}
    />
  );
}
function CardHeader({ className = '', ...props }) {
  return <div className={'flex flex-col gap-1.5 p-6 ' + className} {...props} />;
}
function CardTitle({ className = '', ...props }) {
  return <h3 className={'text-lg font-semibold leading-none tracking-tight ' + className} {...props} />;
}
function CardDescription({ className = '', ...props }) {
  return <p className={'text-sm text-zinc-500 dark:text-zinc-400 ' + className} {...props} />;
}
function CardContent({ className = '', ...props }) {
  return <div className={'p-6 pt-0 ' + className} {...props} />;
}
function CardFooter({ className = '', ...props }) {
  return <div className={'flex items-center p-6 pt-0 ' + className} {...props} />;
}
function Button({ variant = 'default', className = '', ...props }) {
  const variants = {
    default: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200',
    outline: 'border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-800',
  };
  return (
    <button
      className={
        'inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ' +
        variants[variant] + ' ' + className
      }
      {...props}
    />
  );
}

function App() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>プロジェクト名</CardTitle>
        <CardDescription>React と Tailwind CSS で作るポートフォリオサイト</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">React</span>
        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300">Tailwind</span>
        <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-950 dark:text-purple-300">TypeScript</span>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">詳細</Button>
        <Button>デモを見る</Button>
      </CardFooter>
    </Card>
  );
}`}
            />
          </section>

          {/* セクション5: Dialog コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Dialog（モーダル）コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Dialog はモーダルウィンドウを作るためのコンポーネントです。
              Radix UI ベースなので、キーボード操作やアクセシビリティに対応済みです。
            </p>

            <CodeBlock
              language="tsx"
              title="Dialog の使い方"
              showLineNumbers
              code={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function DeleteConfirmDialog() {
  return (
    <Dialog>
      {/* トリガー（モーダルを開くボタン） */}
      <DialogTrigger asChild>
        <Button variant="destructive">アカウント削除</Button>
      </DialogTrigger>

      {/* モーダルの中身 */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>本当に削除しますか？</DialogTitle>
          <DialogDescription>
            この操作は取り消せません。すべてのデータが完全に削除されます。
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-2">
            確認のため「DELETE」と入力してください
          </p>
          <Input placeholder="DELETE" />
        </div>

        <DialogFooter>
          <Button variant="outline">キャンセル</Button>
          <Button variant="destructive">削除する</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`}
            />

            <InfoBox type="info" title="ヘッドレスプリミティブのアクセシビリティ">
              <p>
                shadcn/ui の Dialog は内部でヘッドレスプリミティブを使っています。2026 年 7 月以降の既定は Base UI で、
                <code>npx shadcn init -b radix</code> で Radix UI も選べます。
                Base UI の Dialog は開いたときにフォーカスをダイアログ内へ移し、Tab / Shift+Tab を内側でループさせ、Esc で閉じる要求を受け取ります。
                スクリーンリーダー向けのラベルは <code>Dialog.Title</code> と <code>Dialog.Description</code> で与えます。
                具体的な保証内容は、採用したプリミティブの公式ドキュメントで確認してください。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: CSS 変数によるテーマカスタマイズ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS 変数によるテーマカスタマイズ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui は CSS 変数でテーマを管理しています。
              これを変更するだけで、すべてのコンポーネントの見た目を統一的に変更できます。
            </p>

            <CodeBlock
              language="css"
              title="テーマの CSS 変数（src/index.css） ※ OKLCH 形式"
              showLineNumbers
              code={`/* shadcn/ui は現在 OKLCH カラー形式を使用しています */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0.004 285.823);

  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0.004 285.823);

  --primary: oklch(0.205 0.006 285.885);
  --primary-foreground: oklch(0.985 0.002 247.839);

  --secondary: oklch(0.97 0.001 247.882);
  --secondary-foreground: oklch(0.205 0.006 285.885);

  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0.002 247.839);

  --border: oklch(0.922 0.004 264.052);
  --ring: oklch(0.708 0.005 264.364);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0.004 285.823);
  --foreground: oklch(0.985 0.002 247.839);

  --primary: oklch(0.985 0.002 247.839);
  --primary-foreground: oklch(0.205 0.006 285.885);
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="ブランドカラーにカスタマイズする例"
              code={`:root {
  /* プライマリカラーをブランドカラーに変更 */
  --primary: 250 80% 55%;         /* 紫系のブランドカラー */
  --primary-foreground: 0 0% 100%;

  /* 角丸をブランドに合わせる */
  --radius: 0.75rem;              /* 少し大きめの角丸 */
}

/* これだけで Button, Card, Dialog 全てのプライマリカラーが変わる */`}
            />

            <InfoBox type="success" title="デザイナーにとっての利点">
              <p>
                Figma のデザインシステムで定義したカラートークンを、
                そのまま CSS 変数として設定できます。
                shadcn/ui の公式サイトにはテーマジェネレーターもあり、
                ビジュアルでカラーを調整してコピー&ペーストできます。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: 実践 — 完成された UI の構築 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：設定画面の構築</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui のコンポーネントを組み合わせて、実用的な設定画面を作ってみましょう。
              プレビューでは前のセクションと同じ簡略版の Button / Card に加えて、
              Input / Label / Switch / Separator の簡略版を定義して組み立てています。
              実際のプロジェクトでは <code>npx shadcn@latest add</code> で生成した実物を
              <code>@/components/ui/</code> から import します。
            </p>

            <CodePreview
              language="tsx"
              title="SettingsPage.tsx"
              previewHeight={660}
              libs={['tailwind']}
              code={`// 簡略版の Button / Card / Input / Label / Switch / Separator を定義して組み立てる
// 実物は npx shadcn@latest add button card input label switch separator で生成される
// 本来の CSS 変数ベースの色はプレビュー用に具体色（zinc 系）へ置き換えている
function Card({ className = '', ...props }) {
  return <div className={'rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 ' + className} {...props} />;
}
function CardHeader({ className = '', ...props }) {
  return <div className={'flex flex-col gap-1.5 p-6 ' + className} {...props} />;
}
function CardTitle({ className = '', ...props }) {
  return <h3 className={'text-lg font-semibold leading-none tracking-tight ' + className} {...props} />;
}
function CardDescription({ className = '', ...props }) {
  return <p className={'text-sm text-zinc-500 dark:text-zinc-400 ' + className} {...props} />;
}
function CardContent({ className = '', ...props }) {
  return <div className={'p-6 pt-0 ' + className} {...props} />;
}
function CardFooter({ className = '', ...props }) {
  return <div className={'flex items-center p-6 pt-0 ' + className} {...props} />;
}
function Button({ className = '', ...props }) {
  return <button className={'inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 ' + className} {...props} />;
}
function Input({ className = '', ...props }) {
  return <input className={'flex h-9 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-1 text-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-600 dark:placeholder:text-zinc-500 ' + className} {...props} />;
}
function Label({ className = '', ...props }) {
  return <label className={'text-sm font-medium leading-none ' + className} {...props} />;
}
// Switch は role="switch" + aria-checked で支援技術にオン/オフを伝える
function Switch({ checked, onCheckedChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={
        'inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ' +
        (checked ? 'bg-zinc-900 dark:bg-zinc-50' : 'bg-zinc-300 dark:bg-zinc-600')
      }
    >
      <span
        className={
          'pointer-events-none block h-4 w-4 rounded-full bg-white shadow transition-transform ' +
          (checked ? 'translate-x-4 dark:bg-zinc-900' : 'translate-x-1')
        }
      />
    </button>
  );
}
function Separator() {
  return <div role="separator" className="h-px w-full bg-zinc-200 dark:bg-zinc-700" />;
}

function App() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 text-zinc-900 dark:text-zinc-50">
      <div>
        <h1 className="text-2xl font-bold">設定</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">アカウントと通知の設定を管理します。</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>プロフィール</CardTitle>
          <CardDescription>公開される情報を編集します。</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">表示名</Label>
            <Input id="name" placeholder="田中 太郎" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mail">メールアドレス</Label>
            <Input id="mail" type="email" placeholder="taro@example.com" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>保存する</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>通知</CardTitle>
          <CardDescription>通知の受け取り方を設定します。</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">メール通知</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">重要な更新をメールで受け取る</p>
            </div>
            <Switch checked={email} onCheckedChange={setEmail} />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">プッシュ通知</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">ブラウザのプッシュ通知を有効にする</p>
            </div>
            <Switch checked={push} onCheckedChange={setPush} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`}
            />
          </section>

          {/* セクション8: MUI との比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">MUI との比較</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              shadcn/ui と MUI はどちらも優れたコンポーネント集ですが、アプローチが大きく異なります。
              プロジェクトに合わせて選びましょう。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">項目</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">shadcn/ui</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">MUI</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">インストール</td>
                    <td className="py-3 px-4">コードをコピー</td>
                    <td className="py-3 px-4">npm パッケージ</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">スタイリング</td>
                    <td className="py-3 px-4">Tailwind CSS</td>
                    <td className="py-3 px-4">Emotion / sx prop</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">カスタマイズ</td>
                    <td className="py-3 px-4">ソースコードを直接編集</td>
                    <td className="py-3 px-4">テーマオーバーライド</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">デザイン言語</td>
                    <td className="py-3 px-4">ニュートラル / 自由</td>
                    <td className="py-3 px-4">Material Design ベース</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">バンドルサイズ</td>
                    <td className="py-3 px-4">必要な分だけ（小さい）</td>
                    <td className="py-3 px-4">比較的大きい</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">コンポーネント数</td>
                    <td className="py-3 px-4">40+ 個</td>
                    <td className="py-3 px-4">60+ 個</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">おすすめ場面</td>
                    <td className="py-3 px-4">独自デザインのプロジェクト</td>
                    <td className="py-3 px-4">Material Design 準拠</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="どちらを選ぶべき？">
              <p>
                <strong>shadcn/ui がおすすめ:</strong> Tailwind CSS を使っている、独自のデザインシステムがある、バンドルサイズを小さくしたい場合。
              </p>
              <p className="mt-2">
                <strong>MUI がおすすめ:</strong> Material Design のルールに沿いたい、豊富なコンポーネントがすぐに必要、大規模なエンタープライズアプリの場合。
              </p>
              <p className="mt-2">
                次のステップでは MUI について詳しく学びます。両方の特徴を理解して、プロジェクトに合った選択ができるようにしましょう。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'shadcn/ui 公式ドキュメント',
                  url: 'https://ui.shadcn.com/',
                  description: 'コンポーネントの一覧と使い方',
                },
                {
                  title: 'Radix UI Primitives',
                  url: 'https://www.radix-ui.com/primitives',
                  description: 'shadcn/ui の基盤となるヘッドレス UI',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
