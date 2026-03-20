import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function CssInJs() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 21</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">CSS-in-JS の考え方</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          JavaScript の中に CSS を書く「CSS-in-JS」という考え方を学びます。
          なぜ生まれたのか、どんなメリット・デメリットがあるのかを他のアプローチと比較しながら理解しましょう。
        </p>

        <WhyNowBox tags={['CSS-in-JS', 'styled-components', 'Emotion', '設計思想']}>
          <p>
            前のステップでプレーン CSS と CSS Modules を学びました。
            しかし、React のコンポーネント指向と CSS を完全に統合するアプローチとして CSS-in-JS が生まれました。
            コンポーネントのロジック・構造・スタイルを1つのファイルに凝集させるこの考え方は、
            React エコシステムで広く採用されています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: CSS-in-JS とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS-in-JS とは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS-in-JS は、JavaScript（または TypeScript）のコード内にスタイルを記述するアプローチの総称です。
              スタイルはコンポーネントと同じファイル内に書かれ、JavaScript の力を使って動的にスタイルを生成します。
            </p>

            <CodePreview
              language="tsx"
              title="CSS-in-JS の基本的なイメージ"
              code={`function App() {
  const buttonBase = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginRight: 8,
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button style={{ ...buttonBase, backgroundColor: 'var(--bg-muted)', color: 'var(--text)' }}>
        通常ボタン
      </button>
      <button style={{ ...buttonBase, backgroundColor: '#3b82f6', color: 'white' }}>
        プライマリボタン
      </button>
    </div>
  );
}`}
              previewHeight={80}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">CSS-in-JS が生まれた背景</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              2014年、Facebook の Christopher Chedeau（vjeux）が「CSS の7つの問題」を提唱しました。
              これが CSS-in-JS ムーブメントのきっかけです。
              「なぜ普通の CSS では駄目なのか」を理解するために、この歴史的背景は重要です。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-3">CSS の7つの問題</h4>
              <ol className="space-y-2 text-foreground/80 text-sm list-decimal list-inside">
                <li><strong>グローバルスコープ</strong> — すべてのスタイルがグローバルに適用される</li>
                <li><strong>依存関係</strong> — コンポーネントとスタイルの依存関係が不明確</li>
                <li><strong>デッドコードの除去</strong> — 使われていないスタイルの検出が困難</li>
                <li><strong>圧縮</strong> — クラス名の圧縮が難しい</li>
                <li><strong>定数の共有</strong> — CSS と JS で値を共有できない</li>
                <li><strong>非決定的な解決</strong> — スタイルの適用順序が予測不能</li>
                <li><strong>分離</strong> — スタイルの分離・カプセル化が困難</li>
              </ol>
            </div>

            <p className="text-foreground/80 mt-4 mb-4 leading-relaxed">
              デザイナーにとってこの文脈は非常に重要です。
              Figma でコンポーネント単位でデザインするように、コードでもコンポーネント単位でスタイルを管理したい
              という欲求が CSS-in-JS を生みました。
              「見た目の責任はコンポーネントが持つべき」という React の哲学と、CSS-in-JS は深く結びついています。
            </p>
          </section>

          {/* セクション2: 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS アプローチ比較</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              React で使える主要な CSS アプローチを比較します。
              それぞれの特徴を理解して、プロジェクトに最適なアプローチを選びましょう。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-3 py-3 text-left font-semibold">特徴</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">プレーン CSS</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">CSS Modules</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">CSS-in-JS</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">Utility-first (Tailwind)</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">スコープ</td>
                    <td className="border border-border px-3 py-2">グローバル</td>
                    <td className="border border-border px-3 py-2">ファイル単位</td>
                    <td className="border border-border px-3 py-2">コンポーネント単位</td>
                    <td className="border border-border px-3 py-2">ユーティリティクラス</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">記述場所</td>
                    <td className="border border-border px-3 py-2">.css ファイル</td>
                    <td className="border border-border px-3 py-2">.module.css ファイル</td>
                    <td className="border border-border px-3 py-2">.tsx ファイル内</td>
                    <td className="border border-border px-3 py-2">className 属性</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">動的スタイル</td>
                    <td className="border border-border px-3 py-2">CSS 変数のみ</td>
                    <td className="border border-border px-3 py-2">クラス切替</td>
                    <td className="border border-border px-3 py-2">JS で自由自在</td>
                    <td className="border border-border px-3 py-2">クラス切替</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">TypeScript 対応</td>
                    <td className="border border-border px-3 py-2">なし</td>
                    <td className="border border-border px-3 py-2">型定義が必要</td>
                    <td className="border border-border px-3 py-2">ネイティブ対応</td>
                    <td className="border border-border px-3 py-2">なし</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">テーマ対応</td>
                    <td className="border border-border px-3 py-2">CSS 変数</td>
                    <td className="border border-border px-3 py-2">CSS 変数</td>
                    <td className="border border-border px-3 py-2">ThemeProvider</td>
                    <td className="border border-border px-3 py-2">設定ファイル</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">ランタイムコスト</td>
                    <td className="border border-border px-3 py-2">なし</td>
                    <td className="border border-border px-3 py-2">なし</td>
                    <td className="border border-border px-3 py-2">あり（一部ゼロランタイムも）</td>
                    <td className="border border-border px-3 py-2">なし</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">バンドルサイズ</td>
                    <td className="border border-border px-3 py-2">CSS のみ</td>
                    <td className="border border-border px-3 py-2">CSS のみ</td>
                    <td className="border border-border px-3 py-2">ライブラリ + CSS</td>
                    <td className="border border-border px-3 py-2">最適化された CSS</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">SSR 対応</td>
                    <td className="border border-border px-3 py-2">問題なし</td>
                    <td className="border border-border px-3 py-2">問題なし</td>
                    <td className="border border-border px-3 py-2">追加設定が必要</td>
                    <td className="border border-border px-3 py-2">問題なし</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">学習コスト</td>
                    <td className="border border-border px-3 py-2">低い</td>
                    <td className="border border-border px-3 py-2">低い</td>
                    <td className="border border-border px-3 py-2">中程度</td>
                    <td className="border border-border px-3 py-2">中程度</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">デザイナーとの連携</td>
                    <td className="border border-border px-3 py-2">容易</td>
                    <td className="border border-border px-3 py-2">容易</td>
                    <td className="border border-border px-3 py-2">JS 知識が必要</td>
                    <td className="border border-border px-3 py-2">クラス名の理解が必要</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* セクション3: メリット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS-in-JS のメリット</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. コロケーション（同じ場所にまとめる）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              コンポーネントのロジック、マークアップ、スタイルがすべて1つのファイルにまとまります。
              コンポーネントを削除すれば、関連するスタイルも自動的に消えます。
            </p>

            <CodePreview
              language="tsx"
              title="すべてが1ファイルに凝集"
              code={`function App() {
  var _s = React.useState(0);
  var count = _s[0];
  var setCount = _s[1];

  return (
    <div style={{ padding: 24, borderRadius: 12, background: 'white' }}>
      <span style={{
        fontSize: '3rem', fontWeight: 'bold', display: 'block', marginBottom: 12,
        color: count < 0 ? '#ef4444' : '#10b981',
      }}>
        {count}
      </span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={function() { setCount(count + 1); }}
          style={{ padding: '8px 16px', border: 'none', borderRadius: 6, background: 'var(--bg-muted)', cursor: 'pointer', fontWeight: 600 }}
        >+1</button>
        <button
          onClick={function() { setCount(count - 1); }}
          style={{ padding: '8px 16px', border: 'none', borderRadius: 6, background: 'var(--bg-muted)', cursor: 'pointer', fontWeight: 600 }}
        >-1</button>
      </div>
    </div>
  );
}`}
              previewHeight={160}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2. 動的スタイル</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              JavaScript の変数や props を使って、スタイルを動的に変更できます。
              CSS だけでは実現が難しい条件分岐やアニメーションも自然に書けます。
            </p>

            <CodePreview
              language="tsx"
              title="props に基づく動的スタイル"
              code={`function ProgressBar({ value, color }) {
  return (
    <div style={{ width: '100%', height: 8, background: 'var(--bg-muted)', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: Math.min(100, Math.max(0, value)) + '%',
        background: color || '#3b82f6',
        borderRadius: 4,
        transition: 'width 0.3s ease',
      }} />
    </div>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>75%</span>
        <ProgressBar value={75} />
      </div>
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>30%</span>
        <ProgressBar value={30} color="#10b981" />
      </div>
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>90%</span>
        <ProgressBar value={90} color="#f59e0b" />
      </div>
    </div>
  );
}`}
              previewHeight={140}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3. テーミング</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              アプリケーション全体のテーマ（色、フォント、スペーシングなど）を
              JavaScript オブジェクトとして定義し、すべてのコンポーネントから参照できます。
            </p>

            <CodeBlock
              language="tsx"
              title="テーマを使ったスタイリング"
              code={`import { ThemeProvider } from 'styled-components';

// テーマを JavaScript オブジェクトとして定義
const lightTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: 'var(--bg)',
    text: '#1e293b',
    muted: '#64748b',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
};

const darkTheme = {
  ...lightTheme,
  colors: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    background: '#0f172a',
    text: '#f1f5f9',
    muted: '#94a3b8',
  },
};

// テーマを参照するコンポーネント
const Card = styled.div\`
  background: \${(props) => props.theme.colors.background};
  color: \${(props) => props.theme.colors.text};
  padding: \${(props) => props.theme.spacing.lg};
  border-radius: \${(props) => props.theme.borderRadius.lg};
\`;

// ThemeProvider でテーマを注入
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Card>テーマに応じてスタイルが変わる</Card>
    </ThemeProvider>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4. TypeScript との統合</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS-in-JS では、スタイルの props に型を付けられます。
              存在しない props を渡そうとするとコンパイルエラーになるため、安全です。
            </p>

            <CodePreview
              language="tsx"
              title="型安全なスタイル props（プレビュー）"
              code={`function App() {
  var sizeMap = {
    sm: { padding: '6px 12px', fontSize: '0.75rem' },
    md: { padding: '8px 16px', fontSize: '0.875rem' },
    lg: { padding: '12px 24px', fontSize: '1rem' },
  };
  var colorMap = {
    primary: '#3b82f6',
    secondary: '#6b7280',
    danger: '#ef4444',
  };

  function StyledButton({ variant, size, fullWidth, children }) {
    return React.createElement('button', {
      style: {
        padding: sizeMap[size].padding,
        fontSize: sizeMap[size].fontSize,
        backgroundColor: colorMap[variant],
        color: 'white',
        border: 'none',
        borderRadius: 6,
        width: fullWidth ? '100%' : 'auto',
        cursor: 'pointer',
        fontWeight: 600,
      }
    }, children);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <StyledButton variant="primary" size="sm">Small Primary</StyledButton>
        <StyledButton variant="secondary" size="md">Medium Secondary</StyledButton>
        <StyledButton variant="danger" size="lg">Large Danger</StyledButton>
      </div>
      <StyledButton variant="primary" size="md" fullWidth>全幅ボタン</StyledButton>
    </div>
  );
}`}
              previewHeight={120}
            />
          </section>

          {/* セクション4: デメリット */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS-in-JS のデメリット</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">1. ランタイムコスト</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              styled-components や Emotion はランタイムでスタイルを生成します。
              コンポーネントがレンダリングされるたびに CSS を解析し、
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;style&gt;</code> タグに挿入するため、パフォーマンスに影響があります。
            </p>

            <CodeBlock
              language="tsx"
              title="ランタイムコストのイメージ"
              code={`// レンダリングごとにこの処理が走る:
// 1. テンプレートリテラルを解析
// 2. props を展開して CSS 文字列を生成
// 3. CSS をハッシュ化してクラス名を生成
// 4. <style> タグに CSS を挿入
// 5. コンポーネントにクラス名を適用

const Box = styled.div\`
  padding: \${(props) => props.$padding}px;  // レンダリングごとに評価
  color: \${(props) => props.theme.colors.text};  // テーマ変更で再評価
\`;`}
            />

            <InfoBox type="warning" title="パフォーマンスへの影響">
              <p>
                大量のコンポーネントが頻繁に再レンダリングされるアプリケーション（データテーブル、アニメーションなど）では、
                ランタイム CSS-in-JS がボトルネックになることがあります。
                ベンチマークでは、CSS Modules や Tailwind と比べて数倍遅いケースも報告されています。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2. バンドルサイズ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS-in-JS ライブラリ自体のサイズがバンドルに追加されます。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-3">ライブラリサイズの目安（gzip 圧縮後）</h4>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li><strong>styled-components:</strong> 約 12.7 kB</li>
                <li><strong>@emotion/react + @emotion/styled:</strong> 約 11.2 kB</li>
                <li><strong>CSS Modules:</strong> 0 kB（ビルド時に処理）</li>
                <li><strong>Tailwind CSS:</strong> 0 kB（CSS のみ、JS ライブラリ不要）</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3. 学習コスト</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Tagged Template Literals、props ベースのスタイリング、テーマの設定など、
              CSS だけの知識では使いこなせない概念が必要です。
              特にデザイナーがコードに触れる場合、学習のハードルになることがあります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4. SSR との相性</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              サーバーサイドレンダリング（Next.js など）では、追加の設定が必要です。
              ランタイム CSS-in-JS はサーバーでスタイルを抽出してHTMLに埋め込む処理が必要で、
              React Server Components との互換性にも制約があります。
            </p>

            <InfoBox type="info" title="React Server Components との関係">
              <p>
                Next.js の App Router で使われる React Server Components は、
                ランタイム CSS-in-JS（styled-components, Emotion）と直接は互換性がありません。
                Client Components 内でのみ使用する必要があります。
                これが近年ゼロランタイム CSS-in-JS や Tailwind CSS への移行が進む背景です。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: ゼロランタイム CSS-in-JS 詳解 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ゼロランタイム CSS-in-JS の台頭</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ランタイム CSS-in-JS のパフォーマンス問題を解決するために、
              「ビルド時にすべてのスタイルを静的 CSS に変換する」ゼロランタイムアプローチが登場しました。
              CSS-in-JS の開発体験（DX）を維持しながら、パフォーマンスは CSS Modules 並みという「いいとこ取り」を目指します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">vanilla-extract</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              vanilla-extract は TypeScript でスタイルを書き、ビルド時に完全な CSS ファイルを生成します。
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.css.ts</code> という独自の拡張子を使うのが特徴です。
            </p>

            <CodeBlock
              language="typescript"
              title="src/components/Button.css.ts（vanilla-extract）"
              code={`import { style, styleVariants } from '@vanilla-extract/css';

// ベーススタイル — TypeScript オブジェクトとして記述
export const base = style({
  padding: '10px 20px',
  border: 'none',
  borderRadius: 8,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  // 擬似セレクタもオブジェクトで書ける
  ':hover': {
    opacity: 0.9,
  },
  ':focus-visible': {
    outline: '2px solid #3b82f6',
    outlineOffset: 2,
  },
});

// バリアント — Record 型で型安全なスタイルマップを生成
export const variant = styleVariants({
  primary: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  secondary: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
  },
  danger: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
});

// ビルド時に以下のような CSS ファイルが生成される:
// .base_abc123 { padding: 10px 20px; ... }
// .variant_primary_def456 { background-color: #3b82f6; ... }
// ランタイムの JavaScript は一切含まれない！`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/components/Button.tsx（vanilla-extract）"
              code={`import { base, variant } from './Button.css';

type ButtonVariant = keyof typeof variant;

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

function Button({ variant: v = 'primary', children }: ButtonProps) {
  return (
    // 通常の className として使う
    <button className={\`\${base} \${variant[v]}\`}>
      {children}
    </button>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Panda CSS</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Panda CSS は「CSS-in-JS のような書き心地で Tailwind のような軽量さ」を実現する新世代ツールです。
              静的解析によりビルド時にコードから使われているスタイルを抽出し、最適な CSS を生成します。
            </p>

            <CodeBlock
              language="tsx"
              title="Panda CSS の使い方"
              code={`import { css } from '../styled-system/css';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={css({
      background: 'white',
      borderRadius: 'lg',      // トークンから解決
      padding: '6',            // spacing.6 → 24px
      boxShadow: 'md',         // shadows.md
      transition: 'all 0.2s',
      _hover: {                // 擬似セレクタは _ プレフィックス
        boxShadow: 'lg',
        transform: 'translateY(-2px)',
      },
    })}>
      <h3 className={css({
        fontSize: 'xl',
        fontWeight: 'bold',
        marginBottom: '2',
      })}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ビルド時に静的解析され、使われているスタイルのみが CSS として出力される`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Linaria</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Linaria は styled-components とほぼ同じ API を提供しながら、ビルド時にすべてのスタイルを
              静的な CSS に変換するライブラリです。既存の styled-components コードからの移行が比較的容易です。
            </p>

            <CodeBlock
              language="tsx"
              title="Linaria — styled-components と同じ書き心地"
              code={`import { styled } from '@linaria/react';
import { css } from '@linaria/core';

// styled-components とほぼ同じ API
const Button = styled.button\`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
\`;

// css タグリテラルでクラス名を生成
const heading = css\`
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
\`;

function App() {
  return (
    <div>
      <h1 className={heading}>タイトル</h1>
      <Button>クリック</Button>
    </div>
  );
}

// ビルド後: JavaScript には静的なクラス名の文字列のみが残る
// スタイルは別の CSS ファイルに抽出される`}
            />
          </section>

          {/* セクション6: パフォーマンス比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">パフォーマンス比較</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS-in-JS のパフォーマンスは、ランタイムかゼロランタイムかで大きく異なります。
              以下は各アプローチの特性を比較した表です。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-3 py-3 text-left font-semibold">ライブラリ</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">種類</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">初回レンダリング</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">再レンダリング</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">バンドルサイズ</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">CSS Modules</td>
                    <td className="border border-border px-3 py-2">ビルド時</td>
                    <td className="border border-border px-3 py-2">高速</td>
                    <td className="border border-border px-3 py-2">高速</td>
                    <td className="border border-border px-3 py-2">0 kB</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">Tailwind CSS</td>
                    <td className="border border-border px-3 py-2">ビルド時</td>
                    <td className="border border-border px-3 py-2">高速</td>
                    <td className="border border-border px-3 py-2">高速</td>
                    <td className="border border-border px-3 py-2">0 kB</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">vanilla-extract</td>
                    <td className="border border-border px-3 py-2">ゼロランタイム</td>
                    <td className="border border-border px-3 py-2">高速</td>
                    <td className="border border-border px-3 py-2">高速</td>
                    <td className="border border-border px-3 py-2">約 0.5 kB</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">Panda CSS</td>
                    <td className="border border-border px-3 py-2">ゼロランタイム</td>
                    <td className="border border-border px-3 py-2">高速</td>
                    <td className="border border-border px-3 py-2">高速</td>
                    <td className="border border-border px-3 py-2">約 0.3 kB</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">Emotion</td>
                    <td className="border border-border px-3 py-2">ランタイム</td>
                    <td className="border border-border px-3 py-2">やや遅い</td>
                    <td className="border border-border px-3 py-2">遅い場合あり</td>
                    <td className="border border-border px-3 py-2">約 11.2 kB</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">styled-components</td>
                    <td className="border border-border px-3 py-2">ランタイム</td>
                    <td className="border border-border px-3 py-2">やや遅い</td>
                    <td className="border border-border px-3 py-2">遅い場合あり</td>
                    <td className="border border-border px-3 py-2">約 12.7 kB</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="パフォーマンスの実際の影響">
              <p>
                多くのアプリケーションでは、ランタイム CSS-in-JS のパフォーマンス差は体感できないレベルです。
                問題になるのは「数百行のデータテーブル」「60fps のアニメーション」「頻繁な state 更新」など、
                大量のコンポーネントが頻繁に再レンダリングされる場面に限られます。
                アプリの特性に合わせて選択しましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: SSR 時の課題 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">SSR 時の課題と対策</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              サーバーサイドレンダリング（SSR）では、サーバーで HTML を生成してクライアントに送信します。
              ランタイム CSS-in-JS はブラウザの <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;style&gt;</code> タグにスタイルを注入するため、
              サーバー側でスタイルを抽出する追加処理が必要です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">FOUC（Flash of Unstyled Content）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              SSR で CSS-in-JS を正しく設定しないと、ページ読み込み時に一瞬スタイルが適用されていない状態（FOUC）が発生します。
              HTML はサーバーから届いているのに、スタイルは JavaScript の実行を待っている状態です。
            </p>

            <CodeBlock
              language="text"
              title="FOUC が起きる流れ"
              code={`1. サーバーが HTML を生成して送信
   → <div class="sc-abc123">カード</div>  ← クラス名はあるがスタイルがない

2. ブラウザが HTML を表示
   → スタイルなしの素のテキストが一瞬表示される（FOUC）

3. JavaScript がロード・実行される
   → styled-components がスタイルを <style> タグに注入

4. スタイルが適用される
   → やっと正しい見た目になる`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">対策: サーバーでスタイルを事前抽出</h3>
            <CodeBlock
              language="tsx"
              title="styled-components の SSR 対策（概要）"
              code={`// サーバー側のレンダリング処理
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';

const sheet = new ServerStyleSheet();
try {
  // アプリをレンダリングしながらスタイルを収集
  const html = renderToString(
    sheet.collectStyles(<App />)
  );

  // 収集したスタイルを <style> タグとして取得
  const styleTags = sheet.getStyleTags();

  // HTML にスタイルを埋め込んで送信
  res.send(\`
    <html>
      <head>\${styleTags}</head>
      <body><div id="root">\${html}</div></body>
    </html>
  \`);
} finally {
  sheet.seal();
}`}
            />

            <InfoBox type="info" title="ゼロランタイムなら SSR の問題はない">
              <p>
                vanilla-extract や Panda CSS のようなゼロランタイム CSS-in-JS は、
                ビルド時に静的な CSS ファイルを生成するため、SSR 時の特別な処理は不要です。
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;link rel="stylesheet"&gt;</code> で
                通常の CSS として読み込むだけで済みます。
                React Server Components とも問題なく動作します。
              </p>
            </InfoBox>
          </section>

          {/* セクション8: ライブラリ概観 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">主要な CSS-in-JS ライブラリ</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">ランタイム CSS-in-JS</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ブラウザ上（ランタイム）でスタイルを生成するライブラリです。
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h4 className="font-bold text-foreground mb-2">styled-components</h4>
                <p className="text-sm text-foreground/80 mb-3">
                  最も人気のある CSS-in-JS ライブラリ。Tagged Template Literals を使ったAPIで、
                  CSS の書き心地をそのままにコンポーネントを作れます。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">人気No.1</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">豊富なドキュメント</span>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h4 className="font-bold text-foreground mb-2">Emotion</h4>
                <p className="text-sm text-foreground/80 mb-3">
                  styled-components と似た API に加え、css prop というシンプルな記法も提供。
                  柔軟性が高く、ライブラリのサイズも若干小さいです。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">柔軟な API</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">css prop</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">ゼロランタイム CSS-in-JS</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ビルド時にスタイルを静的な CSS ファイルに変換するライブラリです。
              ランタイムコストがゼロで、パフォーマンスと開発体験の両立を目指します。
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h4 className="font-bold text-foreground mb-2">vanilla-extract</h4>
                <p className="text-sm text-foreground/80 mb-3">
                  TypeScript でスタイルを書き、ビルド時に CSS ファイルを生成。
                  完全な型安全性とゼロランタイムを両立します。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">ゼロランタイム</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">型安全</span>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h4 className="font-bold text-foreground mb-2">Panda CSS</h4>
                <p className="text-sm text-foreground/80 mb-3">
                  CSS-in-JS の開発体験と Tailwind の軽量さを組み合わせた新世代ツール。
                  ビルド時に最適化された CSS を生成します。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">ゼロランタイム</span>
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">新世代</span>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-5">
                <h4 className="font-bold text-foreground mb-2">Linaria</h4>
                <p className="text-sm text-foreground/80 mb-3">
                  styled-components と同じ API でゼロランタイムを実現。
                  既存プロジェクトからの移行が容易です。
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">ゼロランタイム</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">移行容易</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">各ライブラリの API 比較</h3>
            <CodeBlock
              language="tsx"
              title="同じコンポーネントを各ライブラリで書いた場合"
              code={`// === styled-components ===
import styled from 'styled-components';

const Card = styled.div\`
  padding: 24px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
\`;


// === Emotion (styled) ===
import styled from '@emotion/styled';

const Card = styled.div\`
  padding: 24px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
\`;


// === Emotion (css prop) ===
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Card({ children }) {
  return (
    <div css={css\`
      padding: 24px;
      border-radius: 12px;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    \`}>
      {children}
    </div>
  );
}


// === vanilla-extract ===
// Card.css.ts（.css.ts 拡張子が必要）
import { style } from '@vanilla-extract/css';

export const card = style({
  padding: 24,
  borderRadius: 12,
  background: 'white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

// Card.tsx
import { card } from './Card.css';

function Card({ children }) {
  return <div className={card}>{children}</div>;
}


// === Panda CSS ===
import { css } from '../styled-system/css';

function Card({ children }) {
  return (
    <div className={css({
      padding: '24px',
      borderRadius: '12px',
      background: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    })}>
      {children}
    </div>
  );
}`}
            />
          </section>

          {/* セクション9: いつ CSS-in-JS を使うか */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS-in-JS を選ぶべき場面</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">CSS-in-JS が向いている場合</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>コンポーネントライブラリの開発</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>複雑な動的スタイルが多い</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>テーマの切り替え機能が必要</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>TypeScript との統合を重視</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    <span>SPA（Single Page Application）</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">他のアプローチが良い場合</h3>
                <ul className="space-y-2 text-foreground/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>パフォーマンスが最優先</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>Next.js App Router（Server Components）がメイン</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>バンドルサイズを極力抑えたい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>デザイナーが直接 CSS を編集する体制</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">&#10007;</span>
                    <span>スタイルが静的でほとんど変化しない</span>
                  </li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="業界のトレンド">
              <p>
                2024-2025年のトレンドとしては、ランタイム CSS-in-JS から Tailwind CSS やゼロランタイム CSS-in-JS への移行が進んでいます。
                しかし、styled-components や Emotion は依然として多くのプロジェクトで使われており、
                既存コードの保守や理解のために学ぶ価値は十分にあります。
                次のステップでは、最も人気のある styled-components を実際に使ってみましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション10: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>

            <div className="bg-muted/30 border border-border rounded-lg p-6">
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">1.</span>
                  <span><strong>CSS-in-JS</strong> は JavaScript 内に CSS を書くアプローチで、コンポーネントとスタイルの完全な統合を実現する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">2.</span>
                  <span><strong>メリット:</strong> コロケーション、動的スタイル、テーミング、TypeScript 対応</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">3.</span>
                  <span><strong>デメリット:</strong> ランタイムコスト、バンドルサイズ増加、学習コスト、SSR との複雑さ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">4.</span>
                  <span><strong>ランタイム</strong>（styled-components, Emotion）と<strong>ゼロランタイム</strong>（vanilla-extract, Panda CSS, Linaria）の2種類がある</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1 font-bold">5.</span>
                  <span>プロジェクトの要件（パフォーマンス、チーム構成、フレームワーク）に応じて最適なアプローチを選ぶ</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 理解度チェック 1 */}
          <section>
            <Quiz
              question="ランタイム CSS-in-JS（styled-components, Emotion）の主な課題はどれですか？"
              options={[
                { label: 'CSS のネスト記法が使えないこと' },
                { label: 'レンダリングのたびにスタイルを生成・挿入するため、パフォーマンスに影響がある', correct: true },
                { label: 'TypeScript と組み合わせて使えないこと' },
                { label: 'テーマ機能がサポートされていないこと' },
              ]}
              explanation="ランタイム CSS-in-JS は、コンポーネントがレンダリングされるたびに CSS 文字列の解析、ハッシュの計算、<style> タグへの注入を行うため、パフォーマンスコストがあります。これが大量のコンポーネントで問題になる場合があり、ゼロランタイム CSS-in-JS や Tailwind CSS への移行の動機になっています。"
            />
          </section>

          {/* 理解度チェック 2 */}
          <section>
            <Quiz
              question="ゼロランタイム CSS-in-JS（vanilla-extract, Panda CSS）の特徴として正しいのはどれですか？"
              options={[
                { label: 'ブラウザ上でリアルタイムにスタイルを生成する' },
                { label: 'CSS ファイルが不要で、すべて JavaScript として配信される' },
                { label: 'ビルド時にスタイルが静的な CSS ファイルに変換され、ランタイムコストがゼロになる', correct: true },
                { label: 'サーバーサイドレンダリングに対応していない' },
              ]}
              explanation="ゼロランタイム CSS-in-JS は、ビルドプロセスの中ですべてのスタイルを解析・変換し、通常の CSS ファイルを出力します。ブラウザでは普通の CSS として読み込まれるため、ランタイムの JavaScript 処理が不要で、SSR との相性も優れています。"
            />
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <CodingChallenge
              title="CSS-in-JS の概念理解"
              description="vanilla-extract の card スタイルの ___ を埋めてください。CSS プロパティをキャメルケースで書き、擬似セレクタを文字列キーで指定します。"
              initialCode={`import { style } from '@vanilla-extract/css';

export const card = style({
  padding: 24,
  ___: 12, // ← ここを埋める（角丸のプロパティ名）
  background: 'white',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'box-shadow 0.2s ease',
  '___': { // ← ここを埋める（擬似セレクタ）
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
});`}
              answer={`import { style } from '@vanilla-extract/css';

export const card = style({
  padding: 24,
  borderRadius: 12,
  background: 'white',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'box-shadow 0.2s ease',
  ':hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
});`}
              keywords={['borderRadius', "':hover'"]}
              hints={[
                'CSS の border-radius はキャメルケースで borderRadius になります',
                '擬似セレクタは文字列キーで :hover のように指定します',
              ]}
            />
          </section>

          {/* リファレンスリンク */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'State of CSS 2024 - CSS-in-JS セクション',
                  url: 'https://2024.stateofcss.com/en-US/css-in-js/',
                  description: '毎年実施される大規模調査による CSS-in-JS ライブラリの利用率・満足度データ',
                },
                {
                  title: 'vanilla-extract 公式ドキュメント',
                  url: 'https://vanilla-extract.style/',
                  description: 'ゼロランタイム CSS-in-JS の代表格。TypeScript ファーストな API ドキュメント',
                },
                {
                  title: 'Panda CSS 公式ドキュメント',
                  url: 'https://panda-css.com/',
                  description: 'ゼロランタイム CSS-in-JS の新世代ツール。Chakra UI チームによる開発',
                },
                {
                  title: 'Why We are Breaking Up with CSS-in-JS (Sam Magura)',
                  url: 'https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b',
                  description: 'Emotion メンテナーによる CSS-in-JS からの脱却理由の分析記事',
                },
              ]}
            />
          </section>

          {/* FAQ */}
          <section>
            <Faq
              items={[
                {
                  question: 'CSS-in-JS は今から新しいプロジェクトで使うべきですか？',
                  answer: 'プロジェクトの要件次第です。SPA で動的スタイルが多い場合は styled-components や Emotion は依然として良い選択です。SSR（Next.js App Router）を使う場合や、パフォーマンスを重視する場合は、ゼロランタイム CSS-in-JS（vanilla-extract, Panda CSS）、Tailwind CSS、または CSS Modules を検討してください。',
                },
                {
                  question: 'styled-components と Emotion、どちらを選べばいいですか？',
                  answer: 'どちらも非常に似た機能を持っています。styled API だけで統一したいなら styled-components、css prop も活用したいなら Emotion がおすすめです。MUI（Material UI）v5 を使う場合は Emotion がデフォルトのスタイリングエンジンとして内蔵されています。次のステップで両方を詳しく学びます。',
                },
                {
                  question: 'vanilla-extract や Panda CSS はなぜ「ゼロランタイム」と呼ばれるのですか？',
                  answer: 'ビルド時にすべてのスタイルが静的な CSS ファイルに変換されるためです。ブラウザではその CSS ファイルを読み込むだけで、JavaScript によるスタイル生成処理が一切発生しません。結果として、CSS Modules と同等のパフォーマンスが得られます。',
                },
                {
                  question: 'CSS-in-JS を使うとデザイナーとの協業が難しくなりますか？',
                  answer: 'ランタイム CSS-in-JS は JavaScript のコード内にスタイルを書くため、CSS のみの知識ではコードを読み書きしづらくなります。デザイナーが直接コードを触る場合は、CSS Modules や Tailwind CSS の方が馴染みやすいでしょう。一方で、Figma のデザイントークンを JavaScript オブジェクトとして管理する場合は、CSS-in-JS のテーマ機能と相性が良いです。',
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
