import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function MuiIntro() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 28</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">MUI 7 入門</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Material UI（MUI）は Google の Material Design をベースにした、世界で最も利用されている React コンポーネントライブラリです。
          豊富なコンポーネントと強力なテーマ機能を学びましょう。
        </p>

        <WhyNowBox tags={['MUI', 'Material Design', 'コンポーネントライブラリ', 'テーマ']}>
          <p>
            Tailwind CSS と shadcn/ui はユーティリティファーストのアプローチでしたが、
            MUI は完全に異なるアプローチをとります。
            コンポーネントの見た目・動き・アクセシビリティが最初から組み込まれており、
            デザインシステムの「Material Design」に沿った一貫性のある UI を素早く構築できます。
            エンタープライズアプリやダッシュボードの開発で特に力を発揮します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: MUI とは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">MUI とは</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              MUI（旧称 Material-UI）は、Google の Material Design ガイドラインに基づいた React コンポーネントライブラリです。
              2014 年から開発が続けられており、npm で週 400 万回以上ダウンロードされています。
            </p>

            <CodeBlock
              language="tsx"
              title="MUI の基本的な考え方"
              code={`// MUI のコンポーネントは「すぐ使える」状態で提供される
// アクセシビリティ、アニメーション、レスポンシブ対応が組み込み済み

import { Button, TextField, Card } from '@mui/material';

// 1行でプロフェッショナルなボタンが使える
<Button variant="contained" color="primary">
  送信する
</Button>

// テキスト入力もバリデーション表示が最初から対応
<TextField
  label="メールアドレス"
  type="email"
  helperText="example@mail.com"
/>

// カードコンポーネントも構造化されている
<Card>
  <CardContent>...</CardContent>
</Card>`}
            />

            <InfoBox type="info" title="MUI のパッケージ構成">
              <ul className="list-disc pl-4 space-y-1">
                <li><code>@mui/material</code> - メインのコンポーネントライブラリ</li>
                <li><code>@emotion/react</code> / <code>@emotion/styled</code> - スタイリングエンジン</li>
                <li><code>@mui/icons-material</code> - Material Icons（オプション）</li>
                <li><code>@mui/x-data-grid</code> - データグリッド（オプション）</li>
                <li><code>@mui/x-date-pickers</code> - 日付ピッカー（オプション）</li>
              </ul>
            </InfoBox>
          </section>

          {/* セクション2: インストール */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">インストール</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              MUI をプロジェクトに追加しましょう。メインパッケージと、スタイリングエンジンの Emotion が必要です。
            </p>

            <CodeBlock
              language="bash"
              title="必須パッケージのインストール"
              code={`npm install @mui/material @emotion/react @emotion/styled`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="bash"
              title="アイコンパッケージ（推奨）"
              code={`npm install @mui/icons-material`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="html"
              title="Roboto フォントの読み込み（index.html に追記）"
              code={`<head>
  <!-- Material Design が推奨する Roboto フォント -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
  />
</head>`}
            />

            <InfoBox type="warning" title="日本語プロジェクトでのフォント">
              <p>
                日本語プロジェクトでは Roboto の代わりに Noto Sans JP を使うことが多いです。
                テーマでフォントを変更する方法は Step 27 で詳しく解説します。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: ThemeProvider のセットアップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ThemeProvider のセットアップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              MUI のテーマ機能を使うには、アプリのルートに <code>ThemeProvider</code> を配置します。
              これにより、すべてのコンポーネントが統一されたデザイントークンを参照するようになります。
            </p>

            <CodeBlock
              language="tsx"
              title="src/theme.ts"
              showLineNumbers
              code={`import { createTheme } from '@mui/material/styles';

// デフォルトテーマを作成
const theme = createTheme({
  // ここでカスタマイズ（Step 27 で詳しく解説）
});

export default theme;`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/main.tsx"
              showLineNumbers
              code={`import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline: ブラウザのデフォルトスタイルをリセット */}
    <CssBaseline />
    <App />
  </ThemeProvider>
);`}
            />

            <InfoBox type="info" title="CssBaseline とは">
              <p>
                <code>CssBaseline</code> は CSS リセット（normalize.css に相当）です。
                ブラウザ間のスタイル差異を吸収し、Material Design に最適化された基本スタイルを適用します。
                余白のリセット、フォントの設定、box-sizing の統一などを行います。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: Button コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Button コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              MUI の Button は3つのバリアント（contained / outlined / text）と複数のカラーを持ちます。
              クリック時のリップルエフェクトも自動的に適用されます。
            </p>

            <CodePreview
              language="tsx"
              title="Button の使い方"
              previewHeight={240}
              code={`function App() {
  const contained = (bg) => ({ background: bg, color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5 });
  const outlined = (c) => ({ background: 'transparent', color: c, border: '1px solid ' + c, borderRadius: 4, padding: '5px 15px', fontSize: 14, fontWeight: 500, cursor: 'pointer' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <button style={contained('#1976d2')}>塗りつぶし</button>
        <button style={outlined('#1976d2')}>アウトライン</button>
        <button style={{ background: 'transparent', border: 'none', color: '#1976d2', padding: '6px 8px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>テキスト</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <button style={contained('#1976d2')}>プライマリ</button>
        <button style={contained('#9c27b0')}>セカンダリ</button>
        <button style={contained('#2e7d32')}>成功</button>
        <button style={contained('#d32f2f')}>エラー</button>
        <button style={contained('#ed6c02')}>警告</button>
        <button style={contained('#0288d1')}>情報</button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{ ...contained('#1976d2'), padding: '4px 10px', fontSize: 13 }}>小</button>
        <button style={contained('#1976d2')}>中</button>
        <button style={{ ...contained('#1976d2'), padding: '8px 22px', fontSize: 15 }}>大</button>
      </div>
      <div>
        <button style={{ ...contained('#1976d2'), opacity: 0.5, cursor: 'not-allowed' }} disabled>無効なボタン</button>
      </div>
      <button style={{ ...contained('#1976d2'), width: '100%', textAlign: 'center' }}>全幅ボタン</button>
    </div>
  );
}`}
            />
          </section>

          {/* セクション5: Typography */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Typography コンポーネント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              MUI の Typography はテキストの見た目を統一するためのコンポーネントです。
              見出しから本文まで、一貫したタイポグラフィスケールを提供します。
            </p>

            <CodePreview
              language="tsx"
              title="Typography の使い方"
              previewHeight={340}
              code={`function App() {
  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h1 style={{ fontSize: 40, fontWeight: 300, margin: 0 }}>h1 見出し</h1>
      <h2 style={{ fontSize: 32, fontWeight: 300, margin: 0 }}>h2 見出し</h2>
      <h3 style={{ fontSize: 26, fontWeight: 400, margin: 0 }}>h3 見出し</h3>
      <h4 style={{ fontSize: 22, fontWeight: 400, margin: 0 }}>h4 見出し</h4>
      <h5 style={{ fontSize: 18, fontWeight: 400, margin: 0 }}>h5 見出し</h5>
      <h6 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>h6 見出し</h6>
      <p style={{ fontSize: 16, margin: '8px 0 0' }}>body1 - 標準の本文テキスト（16px）</p>
      <p style={{ fontSize: 14, margin: 0 }}>body2 - 少し小さい本文（14px）</p>
      <span style={{ fontSize: 12, color: '#666', display: 'block', marginTop: 8 }}>caption（小さいテキスト）</span>
      <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#666', display: 'block' }}>overline</span>
      <p style={{ color: '#1976d2', margin: '8px 0 0' }}>プライマリカラー</p>
      <p style={{ color: '#666', margin: 0 }}>セカンダリテキスト</p>
      <p style={{ color: '#d32f2f', margin: 0 }}>エラーカラー</p>
    </div>
  );
}`}
            />
          </section>

          {/* セクション6: Box と Container */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Box と Container</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>Box</code> は MUI のレイアウトの基本要素で、<code>sx</code> prop でスタイリングします。
              <code>Container</code> はコンテンツの最大幅を制限するラッパーです。
            </p>

            <CodeBlock
              language="tsx"
              title="Box の使い方"
              code={`import Box from '@mui/material/Box';

function BoxExamples() {
  return (
    <>
      {/* 基本的なスタイリング */}
      <Box
        sx={{
          p: 2,              // padding: 16px（8px × 2）
          m: 1,              // margin: 8px
          bgcolor: 'grey.100',
          borderRadius: 1,   // 4px × 1 = 4px
        }}
      >
        スタイリングされた Box
      </Box>

      {/* Flexbox レイアウト */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box>アイテム 1</Box>
        <Box>アイテム 2</Box>
      </Box>

      {/* レスポンシブ対応 */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },  // モバイル: 100%, タブレット以上: 50%
          p: { xs: 2, md: 4 },               // モバイル: 16px, タブレット以上: 32px
        }}
      >
        レスポンシブな Box
      </Box>

      {/* HTML 要素の変更 */}
      <Box component="section" sx={{ p: 3 }}>
        section 要素として描画される
      </Box>
    </>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="Container の使い方"
              code={`import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function PageLayout() {
  return (
    <>
      {/* 最大幅 lg（1200px）のコンテナ */}
      <Container maxWidth="lg">
        <Typography variant="h4">ページタイトル</Typography>
        <Typography variant="body1">コンテンツがここに入ります。</Typography>
      </Container>

      {/* maxWidth のオプション */}
      {/* xs: 444px, sm: 600px, md: 900px, lg: 1200px, xl: 1536px */}
      <Container maxWidth="sm">
        狭いコンテナ（フォームなどに最適）
      </Container>
    </>
  );
}`}
            />
          </section>

          {/* セクション7: sx prop */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">sx prop の詳細</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>sx</code> prop は MUI で最もよく使うスタイリング手法です。
              テーマの値を参照でき、レスポンシブ対応も簡単にできます。
            </p>

            <CodeBlock
              language="tsx"
              title="sx prop の便利な機能"
              showLineNumbers
              code={`import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function SxPropExamples() {
  return (
    <>
      {/* スペーシングの略記 */}
      <Box sx={{
        p: 2,    // padding: 16px（テーマの spacing × 2）
        px: 3,   // padding-left + padding-right: 24px
        py: 1,   // padding-top + padding-bottom: 8px
        m: 2,    // margin: 16px
        mt: 4,   // margin-top: 32px
        mb: 'auto', // margin-bottom: auto
      }} />

      {/* テーマのカラーパレットを参照 */}
      <Box sx={{
        color: 'primary.main',
        bgcolor: 'grey.100',
        borderColor: 'divider',
      }} />

      {/* 疑似クラス */}
      <Button sx={{
        '&:hover': {
          bgcolor: 'primary.dark',
          transform: 'scale(1.05)',
        },
        '&:disabled': {
          opacity: 0.5,
        },
      }}>
        ホバーでスケールアップ
      </Button>

      {/* レスポンシブ（ブレイクポイント対応） */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 1, md: 3 },
        fontSize: { xs: '0.875rem', md: '1rem' },
      }}>
        レスポンシブなレイアウト
      </Box>

      {/* MUI のスペーシング単位 */}
      {/* 1 = 8px, 2 = 16px, 3 = 24px, 4 = 32px */}
      {/* Tailwind の 4px 刻みと違い、8px 刻みなので注意 */}
    </>
  );
}`}
            />

            <InfoBox type="warning" title="sx prop とインラインスタイルの違い">
              <p>
                <code>sx</code> prop は React の <code>style</code> prop とは異なります。
                <code>sx</code> はテーマ参照、レスポンシブ対応、疑似クラスが使えますが、
                <code>style</code> prop は純粋な CSS オブジェクトです。
                MUI では <code>sx</code> prop を優先して使いましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション8: 実践 — 簡単なページ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：ウェルカムページ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの基本コンポーネントを組み合わせて、シンプルなウェルカムページを作ってみましょう。
            </p>

            <CodePreview
              language="tsx"
              title="WelcomePage.tsx"
              previewHeight={340}
              code={`function App() {
  const btnContained = { background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontSize: 15, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 };
  const btnOutlined = { background: 'transparent', color: '#1976d2', border: '1px solid #1976d2', borderRadius: 4, padding: '9px 23px', fontSize: 15, fontWeight: 500, cursor: 'pointer' };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, background: '#fafafa', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: 500 }}>
        {/* アイコン */}
        <div style={{ display: 'inline-flex', padding: 16, borderRadius: '50%', background: '#1976d2', color: '#fff', marginBottom: 24, fontSize: 28, fontWeight: 700 }}>
          {'</>'}
        </div>

        {/* タイトル */}
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px', color: '#1a1a2e' }}>
          React アプリへようこそ
        </h1>

        {/* 説明文 */}
        <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8, margin: '0 auto 28px', maxWidth: 460 }}>
          MUI を使って美しく機能的な UI を構築しましょう。Material Design のガイドラインに沿った、一貫性のあるデザインを簡単に実現できます。
        </p>

        {/* ボタン */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={btnContained}>はじめる →</button>
          <button style={btnOutlined}>ドキュメントを読む</button>
        </div>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="success" title="MUI の基本を押さえました">
              <p>
                <code>Button</code>、<code>Typography</code>、<code>Box</code>、<code>Container</code> は
                MUI の最も基本的なコンポーネントです。
                次のステップでは、より多くのコンポーネント（TextField、Card、AppBar など）を使った
                実践的な UI の構築方法を学びます。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Material UI 公式ドキュメント',
                  url: 'https://mui.com/material-ui/getting-started/',
                  description: 'Material UI のセットアップと基本概念',
                },
                {
                  title: 'Material Design',
                  url: 'https://m3.material.io/',
                  description: 'Google の Material Design 3 ガイドライン',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
