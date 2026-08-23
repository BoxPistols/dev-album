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
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">MUI 入門</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Material UI（MUI）は Google の Material Design をベースにした React コンポーネントライブラリです。
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
                テーマでフォントを変更する方法は Step 30 で詳しく解説します。
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
  // ここでカスタマイズ（Step 30 で詳しく解説）
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
                <code>CssBaseline</code> はグローバルなスタイルリセットを行うコンポーネントです。
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
              previewHeight={320}
              code={`import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <Stack spacing={2}>
      {/* バリアント */}
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button variant="contained">塗りつぶし</Button>
        <Button variant="outlined">アウトライン</Button>
        <Button variant="text">テキスト</Button>
      </Stack>
      {/* カラー */}
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button variant="contained" color="primary">プライマリ</Button>
        <Button variant="contained" color="secondary">セカンダリ</Button>
        <Button variant="contained" color="success">成功</Button>
        <Button variant="contained" color="error">エラー</Button>
        <Button variant="contained" color="warning">警告</Button>
        <Button variant="contained" color="info">情報</Button>
      </Stack>
      {/* サイズ */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="contained" size="small">小</Button>
        <Button variant="contained" size="medium">中</Button>
        <Button variant="contained" size="large">大</Button>
      </Stack>
      {/* 無効状態と全幅 */}
      <div>
        <Button variant="contained" disabled>無効なボタン</Button>
      </div>
      <Button variant="contained" fullWidth>全幅ボタン</Button>
    </Stack>
  );
}`}
            />

            <InfoBox type="info" title="ライブプレビューの実行環境">
              <p>
                このページのプレビューは CDN 配信（UMD ビルド）の MUI をブラウザ内で直接実行しています。
                ボタンをクリックすると、MUI 本来のリップルエフェクトも確認できます。
                手元のプロジェクトでは npm でインストールしたバージョンを使ってください。
              </p>
            </InfoBox>
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
              previewHeight={480}
              code={`import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <Stack spacing={0.5}>
      {/* 見出しバリアント（サイズはテーマのデフォルト値） */}
      <Typography variant="h3" component="h1">h3 見出し</Typography>
      <Typography variant="h4" component="h2">h4 見出し</Typography>
      <Typography variant="h5" component="h3">h5 見出し</Typography>
      <Typography variant="h6" component="h4">h6 見出し</Typography>

      {/* 本文バリアント */}
      <Typography variant="body1" sx={{ mt: 1 }}>body1 - 標準の本文テキスト（16px）</Typography>
      <Typography variant="body2">body2 - 少し小さい本文（14px）</Typography>
      <Typography variant="caption" sx={{ mt: 1 }}>caption（小さいテキスト）</Typography>
      <Typography variant="overline">overline</Typography>

      {/* カラー指定 */}
      <Typography color="primary" sx={{ mt: 1 }}>プライマリカラー</Typography>
      <Typography color="text.secondary">セカンダリテキスト</Typography>
      <Typography color="error">エラーカラー</Typography>
    </Stack>
  );
}`}
            />

            <InfoBox type="info" title="variant と component の使い分け">
              <p>
                <code>variant</code> は見た目、<code>component</code> は実際に描画される HTML 要素を決めます。
                「デザイン上は h3 サイズだが、文書構造上はページの h1」のように、
                見た目とセマンティクスを分離できるのが Typography の重要な機能です。
                h1 / h2 のデフォルトサイズ（96px / 60px）はランディングページ向けに大きいため、
                アプリでは <code>variant="h4"</code> 程度を h1 として使うことがよくあります。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: Box と Container */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Box と Container</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>Box</code> は MUI のレイアウトの基本要素で、<code>sx</code> prop でスタイリングします。
              <code>Container</code> はコンテンツの最大幅を制限するラッパーです。
            </p>

            <CodePreview
              language="tsx"
              title="Box の使い方"
              previewHeight={320}
              code={`import Box from '@mui/material/Box';

function App() {
  return (
    <>
      {/* 基本的なスタイリング: p: 2 は padding 16px（8px × 2） */}
      <Box sx={{ p: 2, mb: 2, bgcolor: 'grey.100', color: 'grey.900', borderRadius: 1 }}>
        スタイリングされた Box
      </Box>

      {/* Flexbox レイアウト */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Box sx={{ p: 1.5, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
          アイテム 1
        </Box>
        <Box sx={{ p: 1.5, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
          アイテム 2
        </Box>
      </Box>

      {/* レスポンシブ対応: モバイル 100% / md 以上 50%（プレビュー幅を変えると変化） */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          p: { xs: 2, md: 4 },
          mb: 2,
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        レスポンシブな Box
      </Box>

      {/* HTML 要素の変更 */}
      <Box component="section" sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
        section 要素として描画される
      </Box>
    </>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Container の使い方（maxWidth で幅制限）"
              previewHeight={340}
              code={`import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* maxWidth="xs"（444px）: 中央寄せの狭いカラム */}
      <Box sx={{ bgcolor: 'grey.100', py: 1, borderRadius: 1 }}>
        <Container maxWidth="xs">
          <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 1.5, borderRadius: 1, textAlign: 'center' }}>
            maxWidth="xs"（444px）
          </Box>
        </Container>
      </Box>

      {/* maxWidth="sm"（600px） */}
      <Box sx={{ bgcolor: 'grey.100', py: 1, borderRadius: 1 }}>
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 1.5, borderRadius: 1, textAlign: 'center' }}>
            maxWidth="sm"（600px）
          </Box>
        </Container>
      </Box>

      {/* maxWidth="md"（900px） */}
      <Box sx={{ bgcolor: 'grey.100', py: 1, borderRadius: 1 }}>
        <Container maxWidth="md">
          <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 1.5, borderRadius: 1, textAlign: 'center' }}>
            maxWidth="md"（900px）
          </Box>
        </Container>
      </Box>

      {/* maxWidth に false を指定すると制限なし（親いっぱいに広がる） */}
      <Box sx={{ bgcolor: 'grey.100', py: 1, borderRadius: 1 }}>
        <Container maxWidth={false}>
          <Box sx={{ bgcolor: 'grey.700', color: '#fff', p: 1.5, borderRadius: 1, textAlign: 'center' }}>
            maxWidth に false（制限なし）
          </Box>
        </Container>
      </Box>
    </Box>
  );
}`}
            />

            <InfoBox type="info" title="Container の maxWidth">
              <p>
                <code>Container</code> はコンテンツを中央寄せし、指定した幅で頭打ちにします。
                <code>maxWidth</code> ごとの幅は xs: 444px / sm: 600px / md: 900px / lg: 1200px / xl: 1536px です。
                このうち xs だけがブレイクポイント値と異なります。既定のブレイクポイント値は xs: 0 / sm: 600 / md: 900 / lg: 1200 / xl: 1536（px）で、
                Container の実装が <code>Math.max(theme.breakpoints.values.xs, 444)</code> としているため、xs のときだけ 444px が使われます。
                上のプレビューはヘッダー右上の拡大アイコンで全幅表示にすると、maxWidth ごとのカラム幅の差がはっきり分かります。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: sx prop */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">sx prop の詳細</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>sx</code> prop は MUI で最もよく使うスタイリング手法です。
              テーマの値を参照でき、レスポンシブ対応も簡単にできます。
            </p>

            <CodePreview
              language="tsx"
              title="sx prop の便利な機能"
              previewHeight={420}
              code={`import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Stack spacing={2}>
      {/* スペーシング: 数値は 8px 単位（p: 2 は padding 16px） */}
      <Box sx={{ p: 2, bgcolor: 'grey.100', color: 'grey.900', borderRadius: 1 }}>
        <Typography variant="body2">p: 2 → padding 16px（8px 単位。Tailwind の 4px 刻みと違う）</Typography>
      </Box>

      {/* テーマのカラーパレットを参照 */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Box sx={{ px: 2, py: 1, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>primary.main</Box>
        <Box sx={{ px: 2, py: 1, bgcolor: 'success.main', color: '#fff', borderRadius: 1 }}>success.main</Box>
        <Box sx={{ px: 2, py: 1, bgcolor: 'error.main', color: '#fff', borderRadius: 1 }}>error.main</Box>
        <Box sx={{ px: 2, py: 1, border: '2px solid', borderColor: 'primary.main', color: 'primary.main', borderRadius: 1 }}>borderColor</Box>
      </Box>

      {/* 疑似クラス: ホバーで色とサイズが変わる（実際に動く） */}
      <Button
        variant="contained"
        sx={{
          alignSelf: 'flex-start',
          transition: 'transform 150ms, background-color 150ms',
          '&:hover': { bgcolor: 'secondary.main', transform: 'scale(1.05)' },
        }}
      >
        ホバーで色が変わるボタン
      </Button>

      {/* 疑似クラス（Box 版）: ホバーで背景がプライマリ色に変わる */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'grey.100',
          color: 'grey.900',
          borderRadius: 1,
          cursor: 'pointer',
          transition: 'background-color 150ms',
          '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' },
        }}
      >
        この行にホバーすると背景色が変わる
      </Box>

      {/* レスポンシブ: 幅で並びが変わる（拡大/縮小で確認） */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ flex: 1, p: 1.5, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1, textAlign: 'center' }}>A</Box>
        <Box sx={{ flex: 1, p: 1.5, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1, textAlign: 'center' }}>B</Box>
        <Box sx={{ flex: 1, p: 1.5, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1, textAlign: 'center' }}>C</Box>
      </Box>
    </Stack>
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
              previewHeight={360}
              code={`import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: 500 }}>
        {/* アイコン */}
        <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 3, fontWeight: 700 }}>
          {'</>'}
        </Avatar>

        {/* タイトル */}
        <Typography variant="h4" component="h1" fontWeight={800} gutterBottom>
          React アプリへようこそ
        </Typography>

        {/* 説明文 */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.8 }}>
          MUI を使って美しく機能的な UI を構築しましょう。Material Design のガイドラインに沿った、一貫性のあるデザインを簡単に実現できます。
        </Typography>

        {/* ボタン */}
        <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" useFlexGap>
          <Button variant="contained" size="large">はじめる</Button>
          <Button variant="outlined" size="large">ドキュメントを読む</Button>
        </Stack>
      </Box>
    </Box>
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
