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
            </p>

            <CodePreview
              language="tsx"
              title="Button の使い方"
              previewHeight={180}
              code={`function App() {
  const base = { border: 'none', borderRadius: 6, fontWeight: 500, cursor: 'pointer', fontSize: 14, padding: '8px 16px', transition: 'all 0.15s' };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {/* バリアント */}
      <button style={{ ...base, background: '#18181b', color: '#fff' }}>デフォルト</button>
      <button style={{ ...base, background: 'var(--bg-muted)', color: 'var(--text)' }}>セカンダリ</button>
      <button style={{ ...base, background: '#ef4444', color: '#fff' }}>削除</button>
      <button style={{ ...base, background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}>アウトライン</button>
      <button style={{ ...base, background: 'transparent', color: 'var(--text)' }}>ゴースト</button>
      <button style={{ ...base, background: 'transparent', color: 'var(--text)', textDecoration: 'underline', padding: '8px 4px' }}>リンク</button>

      {/* サイズ */}
      <button style={{ ...base, background: '#18181b', color: '#fff', fontSize: 12, padding: '4px 12px' }}>小さい</button>
      <button style={{ ...base, background: '#18181b', color: '#fff' }}>標準</button>
      <button style={{ ...base, background: '#18181b', color: '#fff', fontSize: 16, padding: '10px 24px' }}>大きい</button>

      {/* 無効 */}
      <button style={{ ...base, background: '#18181b', color: '#fff', opacity: 0.5, cursor: 'not-allowed' }} disabled>無効</button>
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
            </p>

            <CodePreview
              language="tsx"
              title="Card の使い方"
              previewHeight={250}
              code={`function App() {
  const card = { width: 320, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--bg-card)' };
  const btn = { border: 'none', borderRadius: 6, fontWeight: 500, cursor: 'pointer', fontSize: 14, padding: '8px 16px' };
  return (
    <div style={card}>
      <div style={{ padding: '20px 20px 0' }}>
        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 18 }}>プロジェクト名</h3>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: 14 }}>React と Tailwind CSS で作るポートフォリオサイト</p>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ padding: '2px 10px', background: 'var(--bg-accent)', color: 'var(--text-accent)', fontSize: 12, borderRadius: 9999 }}>React</span>
        <span style={{ padding: '2px 10px', background: 'var(--bg-success)', color: 'var(--text-success)', fontSize: 12, borderRadius: 9999 }}>Tailwind</span>
        <span style={{ padding: '2px 10px', background: '#f3e8ff', color: '#7c3aed', fontSize: 12, borderRadius: 9999 }}>TypeScript</span>
      </div>
      <div style={{ padding: '12px 20px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ ...btn, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)' }}>詳細</button>
        <button style={{ ...btn, background: '#18181b', color: '#fff' }}>デモを見る</button>
      </div>
    </div>
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

            <InfoBox type="info" title="Radix UI のアクセシビリティ">
              <p>
                shadcn/ui の Dialog は内部で Radix UI を使っており、
                Escape キーで閉じる、フォーカストラップ、スクリーンリーダー対応などが
                自動的に組み込まれています。自分で実装する必要はありません。
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
            </p>

            <CodePreview
              language="tsx"
              title="SettingsPage.tsx"
              previewHeight={400}
              code={`function App() {
  const [email, setEmail] = React.useState(false);
  const [push, setPush] = React.useState(false);
  const card = { border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', overflow: 'hidden' };
  const input = { width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: 'var(--bg)', color: 'var(--text)' };
  const label = { fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 4 };
  const toggle = (on) => ({
    width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
    background: on ? '#18181b' : 'var(--border)', position: 'relative', transition: 'background 0.2s',
  });
  const dot = (on) => ({
    width: 20, height: 20, borderRadius: '50%', background: '#fff',
    position: 'absolute', top: 2, left: on ? 22 : 2, transition: 'left 0.2s',
  });

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>設定</h1>
        <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: 14 }}>アカウントと通知の設定を管理します。</p>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      <div style={card}>
        <div style={{ padding: '16px 20px 0' }}>
          <h3 style={{ margin: 0, fontWeight: 600 }}>プロフィール</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: '2px 0 0' }}>公開される情報を編集します。</p>
        </div>
        <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><span style={label}>表示名</span><input style={input} placeholder="田中 太郎" /></div>
          <div><span style={label}>メールアドレス</span><input style={input} placeholder="taro@example.com" /></div>
        </div>
        <div style={{ padding: '8px 20px 16px' }}>
          <button style={{ background: '#18181b', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 500, cursor: 'pointer' }}>保存する</button>
        </div>
      </div>

      <div style={card}>
        <div style={{ padding: '16px 20px 0' }}>
          <h3 style={{ margin: 0, fontWeight: 600 }}>通知</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: '2px 0 0' }}>通知の受け取り方を設定します。</p>
        </div>
        <div style={{ padding: '12px 20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ fontWeight: 500, margin: 0 }}>メール通知</p><p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '2px 0 0' }}>重要な更新をメールで受け取る</p></div>
            <button onClick={() => setEmail(!email)} style={toggle(email)}><div style={dot(email)} /></button>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ fontWeight: 500, margin: 0 }}>プッシュ通知</p><p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '2px 0 0' }}>ブラウザのプッシュ通知を有効にする</p></div>
            <button onClick={() => setPush(!push)} style={toggle(push)}><div style={dot(push)} /></button>
          </div>
        </div>
      </div>
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
