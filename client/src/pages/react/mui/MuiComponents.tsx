import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function MuiComponents() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 29</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">MUI コンポーネント活用</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          MUI の豊富なコンポーネントを使いこなしましょう。レイアウト、入力、フィードバック、ナビゲーション、データ表示まで網羅します。
        </p>

        <WhyNowBox tags={['Grid', 'TextField', 'AppBar', 'Dialog', 'Table']}>
          <p>
            前のステップで MUI の基礎（Button, Typography, Box）を学びました。
            ここでは実際のアプリで必要となるコンポーネントを一通り押さえます。
            全てを暗記する必要はありません。「こういうコンポーネントがある」と知っておけば、
            必要なときに MUI の公式ドキュメントから素早く見つけて使えるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: レイアウト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レイアウト：Grid, Stack, Container</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              MUI のレイアウトコンポーネントを使えば、レスポンシブなグリッドやフレックスレイアウトを簡単に構築できます。
            </p>

            <CodePreview
              language="tsx"
              title="Grid コンポーネント"
              previewHeight={300}
              code={`import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function App() {
  // 文字色は背景ごとの contrastText に任せる（dark では primary.main が淡色になる）
  const cell = { p: 2, borderRadius: 1 };
  return (
    <Grid container spacing={2}>
      {/* 12 カラム制。item の xs で常に幅を分割する */}
      {/* 8 : 4 の 2 カラム */}
      <Grid item xs={8}>
        <Box sx={{ ...cell, bgcolor: 'primary.main', color: 'primary.contrastText' }}>メインコンテンツ（8 カラム）</Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ ...cell, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>サイド（4 カラム）</Box>
      </Grid>

      {/* 3 等分（4 + 4 + 4） */}
      {[1, 2, 3].map((n) => (
        <Grid item xs={4} key={n}>
          <Box sx={{ ...cell, bgcolor: 'grey.700', color: 'common.white' }}>カード {n}</Box>
        </Grid>
      ))}
    </Grid>
  );
}`}
            />

            <InfoBox type="info" title="レスポンシブと MUI v7 の記法">
              <p>
                幅はブレークポイントごとに変えられます。たとえば{' '}
                <code>{'<Grid item xs={12} md={8}>'}</code> は「モバイルでは全幅、md（900px）以上で 8 カラム」。
                プレビュー右上の目のアイコンで表示幅を広げると切り替わりが見えます。
                なお MUI v7 では <code>item</code> を書かず{' '}
                <code>{'<Grid size={{ xs: 12, md: 8 }}>'}</code> と書きます（結果は同じ。プレビューは UMD 配布のある v5 記法）。
              </p>
            </InfoBox>

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Stack コンポーネント"
              previewHeight={280}
              code={`import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Stack spacing={3}>
      {/* 横並び（デフォルトは縦並び、direction="row" で横並び） */}
      <Stack direction="row" spacing={2}>
        <Button variant="contained">保存</Button>
        <Button variant="outlined">キャンセル</Button>
      </Stack>

      {/* レスポンシブに方向を変更 + 区切り線 */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box>項目 1</Box>
        <Box>項目 2</Box>
        <Box>項目 3</Box>
      </Stack>

      {/* 両端揃え（見出しとアクションを左右に配置） */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">タイトル</Typography>
        <Button>アクション</Button>
      </Stack>
    </Stack>
  );
}`}
            />
          </section>

          {/* セクション2: 入力コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">入力：TextField, Select, Checkbox</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              フォーム関連のコンポーネントは、ラベル、バリデーション表示、ヘルパーテキストが組み込まれています。
            </p>

            <CodePreview
              language="tsx"
              title="TextField の使い方"
              previewHeight={460}
              code={`import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function App() {
  const [name, setName] = useState('');
  // 入力値の長さからエラー状態を導出（1〜2 文字ならエラー）
  const error = name.length > 0 && name.length < 3;

  return (
    <Stack spacing={2.5}>
      {/* バリアント 3 種 */}
      <TextField label="Outlined（デフォルト）" variant="outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Standard" variant="standard" />

      {/* 入力タイプ */}
      <TextField label="メールアドレス" type="email" />
      <TextField label="パスワード" type="password" />
      <TextField label="数値" type="number" />

      {/* エラー表示（入力に連動して helperText が切り替わる） */}
      <TextField
        label="ユーザー名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
        helperText={error ? '3文字以上で入力してください' : 'お好きなユーザー名を入力'}
      />

      {/* 複数行（テキストエリア） */}
      <TextField label="自己紹介" multiline rows={3} placeholder="あなたについて教えてください" />

      {/* 全幅・サイズ */}
      <TextField label="検索" fullWidth />
      <TextField label="小さいサイズ" size="small" />
    </Stack>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Select と Checkbox"
              previewHeight={380}
              code={`import {
  Select, MenuItem, InputLabel, FormControl,
  Checkbox, FormControlLabel, FormGroup,
  Radio, RadioGroup, Switch, Stack,
} from '@mui/material';

function App() {
  const [category, setCategory] = useState('');
  const [agree, setAgree] = useState(false);
  const [plan, setPlan] = useState('monthly');
  const [notify, setNotify] = useState(true);

  return (
    <Stack spacing={2.5}>
      {/* セレクトボックス（value と onChange を state に連動） */}
      <FormControl fullWidth>
        <InputLabel>カテゴリ</InputLabel>
        <Select value={category} label="カテゴリ" onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="design">デザイン</MenuItem>
          <MenuItem value="development">開発</MenuItem>
          <MenuItem value="marketing">マーケティング</MenuItem>
        </Select>
      </FormControl>

      {/* チェックボックス */}
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
          label="利用規約に同意する"
        />
      </FormGroup>

      {/* ラジオボタン */}
      <FormControl>
        <RadioGroup value={plan} onChange={(e) => setPlan(e.target.value)}>
          <FormControlLabel value="monthly" control={<Radio />} label="月額プラン" />
          <FormControlLabel value="yearly" control={<Radio />} label="年額プラン" />
        </RadioGroup>
      </FormControl>

      {/* スイッチ */}
      <FormControlLabel
        control={<Switch checked={notify} onChange={(e) => setNotify(e.target.checked)} />}
        label="通知を有効にする"
      />
    </Stack>
  );
}`}
            />
          </section>

          {/* セクション3: フィードバック */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フィードバック：Alert, Snackbar, Dialog</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユーザーに情報を伝えるためのコンポーネントです。
              操作の結果や確認のダイアログを適切に表示しましょう。
            </p>

            <CodePreview
              language="tsx"
              title="Alert コンポーネント"
              previewHeight={420}
              code={`import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <Stack spacing={1.5}>
      {/* severity で色とアイコンが決まる */}
      <Alert severity="success">保存が完了しました。</Alert>
      <Alert severity="info">新しいバージョンが利用可能です。</Alert>
      <Alert severity="warning">ストレージの残量が少なくなっています。</Alert>
      <Alert severity="error">ネットワークエラーが発生しました。</Alert>

      {/* タイトル付き */}
      <Alert severity="success">
        <AlertTitle>成功</AlertTitle>
        プロフィールの更新が完了しました。
      </Alert>

      {/* バリアント */}
      <Alert severity="success" variant="filled">塗りつぶしスタイル (filled)</Alert>
      <Alert severity="info" variant="outlined">アウトラインスタイル (outlined)</Alert>
    </Stack>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Snackbar（トースト通知）"
              previewHeight={240}
              code={`import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function App() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    // 保存処理を実行したあと通知を表示
    setOpen(true);
  };

  return (
    <>
      {/* ボタンを押すと下部にトーストが開き、4 秒で自動的に閉じる */}
      <Button variant="contained" onClick={handleSave}>
        保存する
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
          変更を保存しました
        </Alert>
      </Snackbar>
    </>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Dialog（モーダル）"
              previewHeight={240}
              code={`import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Button,
} from '@mui/material';

function App() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    // 削除処理を実行してからモーダルを閉じる
    setOpen(false);
  };

  return (
    <>
      {/* ボタンを押すとモーダルが開く */}
      <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
        削除する
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>本当に削除しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText>
            この操作は取り消せません。関連するすべてのデータが完全に削除されます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}`}
            />
          </section>

          {/* セクション4: ナビゲーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ナビゲーション：AppBar, Drawer, Tabs</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              アプリのナビゲーション構造を作るためのコンポーネントです。
              ヘッダー、サイドバー、タブ切り替えなど、よくあるパターンをカバーします。
            </p>

            <CodePreview
              language="tsx"
              title="AppBar（ヘッダーバー）"
              previewHeight={240}
              code={`import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function App() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* ハンバーガーメニュー（実プロジェクトでは MenuIcon を使う） */}
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          ☰
        </IconButton>

        {/* ロゴ / タイトル。flexGrow で残り幅を占有し右側を押し出す */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>

        {/* ナビゲーションリンク */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit">ホーム</Button>
          <Button color="inherit">料金</Button>
          <Button variant="outlined" color="inherit">ログイン</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Drawer（サイドバー）"
              previewHeight={320}
              code={`import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function App() {
  const [open, setOpen] = useState(false);

  // 実プロジェクトでは @mui/icons-material のアイコンを使う
  const menuItems = [
    { text: 'ホーム', icon: '🏠' },
    { text: 'プロフィール', icon: '👤' },
    { text: '設定', icon: '⚙️' },
  ];

  return (
    <>
      {/* ボタンを押すと左からサイドバーがスライドインする */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        メニューを開く
      </Button>

      <Drawer variant="temporary" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Tabs（タブ切り替え）"
              previewHeight={200}
              code={`import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function App() {
  const [tab, setTab] = useState(0);
  const contents = [
    '商品の概要がここに表示されます。',
    'スペック情報がここに表示されます。',
    'レビューがここに表示されます。',
  ];
  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="概要" />
        <Tab label="スペック" />
        <Tab label="レビュー" />
      </Tabs>
      <Box sx={{ p: 3 }}>{contents[tab]}</Box>
    </Box>
  );
}`}
            />
          </section>

          {/* セクション5: データ表示 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">データ表示：Table, Card, List</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              データを見やすく表示するためのコンポーネントです。テーブル、カード、リストの使い方を見ていきましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="Table コンポーネント"
              showLineNumbers
              code={`import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip,
} from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

function UserTable({ users }: { users: User[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            <TableCell>メール</TableCell>
            <TableCell>役職</TableCell>
            <TableCell>ステータス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              hover
              sx={{ '&:last-child td': { border: 0 } }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Chip
                  label={user.status === 'active' ? '有効' : '無効'}
                  color={user.status === 'active' ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="Card コンポーネント"
              previewHeight={320}
              code={`import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* 実プロジェクトでは CardMedia + 画像 URL を使う */}
      <Box
        sx={{
          height: 140,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <Typography variant="body2">画像エリア</Typography>
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom>React 入門ガイド</Typography>
        <Typography variant="body2" color="text.secondary">
          React の基礎から実践までを解説する初心者向けのガイドです。
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">もっと読む</Button>
        <Button size="small" color="inherit">シェア</Button>
      </CardActions>
    </Card>
  );
}`}
            />
          </section>

          {/* セクション6: 実践 — ダッシュボードレイアウト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践：ダッシュボードレイアウト</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまで学んだコンポーネントを組み合わせて、管理画面風のダッシュボードを作ってみましょう。
            </p>

            <CodePreview
              language="tsx"
              title="Dashboard.tsx"
              previewHeight={480}
              code={`import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton,
  Drawer, Box, Container,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Card, CardContent, Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';

// 統計カード（アイコンは絵文字で代替）
function StatCard({ title, value, icon, color }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5 }}>{value}</Typography>
          </Box>
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: color, fontSize: 22, lineHeight: 1 }}>
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stats = [
    { title: 'ユーザー数', value: '1,234', icon: '👥', color: '#dbeafe' },
    { title: '売上', value: '¥890K', icon: '📈', color: '#dcfce7' },
    { title: 'PV数', value: '45.2K', icon: '📊', color: '#fef3c7' },
    { title: 'コンバージョン', value: '3.2%', icon: '🎯', color: '#ede9fe' },
  ];

  const menu = ['ダッシュボード', 'ユーザー', '分析', '設定'];

  return (
    <Box>
      {/* ヘッダーバー */}
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
            ☰
          </IconButton>
          <Typography variant="h6">ダッシュボード</Typography>
        </Toolbar>
      </AppBar>

      {/* サイドバー（☰ をクリックで開く） */}
      <Drawer variant="temporary" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {menu.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>📊</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* 統計カードのグリッド（v5 記法: container + item + xs/sm/md） */}
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}`}
            />

            <InfoBox type="success" title="MUI コンポーネントの強み">
              <p>
                MUI の強みは、こうした管理画面やダッシュボードを素早く構築できることです。
                Grid、Card、AppBar、Drawer を組み合わせるだけで、プロフェッショナルなレイアウトが完成します。
                次のステップでは、テーマのカスタマイズ方法を学び、ブランドに合わせた独自のデザインを適用しましょう。
              </p>
            </InfoBox>
          </section>
        </div>

          {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'MUI コンポーネント一覧',
                  url: 'https://mui.com/material-ui/all-components/',
                  description: '全コンポーネントの一覧と API リファレンス',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
