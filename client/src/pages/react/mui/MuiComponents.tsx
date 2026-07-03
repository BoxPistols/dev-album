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

            <CodeBlock
              language="tsx"
              title="Grid コンポーネント（MUI v7）"
              showLineNumbers
              code={`import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function GridExample() {
  return (
    // container でグリッドコンテナを作成
    <Grid container spacing={3}>
      {/* 12カラムシステム: size で幅を指定 */}

      {/* モバイル: 全幅、タブレット以上: 8/12 */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
          メインコンテンツ（8カラム）
        </Box>
      </Grid>

      {/* モバイル: 全幅、タブレット以上: 4/12 */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 1 }}>
          サイドバー（4カラム）
        </Box>
      </Grid>

      {/* 3等分のカード */}
      {[1, 2, 3].map((item) => (
        <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            カード {item}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="Stack コンポーネント"
              code={`import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

function StackExample() {
  return (
    <>
      {/* 横並び（デフォルト: 縦並び） */}
      <Stack direction="row" spacing={2}>
        <Button variant="contained">保存</Button>
        <Button variant="outlined">キャンセル</Button>
      </Stack>

      {/* レスポンシブに方向を変更 */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box>項目 1</Box>
        <Box>項目 2</Box>
        <Box>項目 3</Box>
      </Stack>

      {/* 両端揃え */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">タイトル</Typography>
        <Button>アクション</Button>
      </Stack>
    </>
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

            <CodeBlock
              language="tsx"
              title="TextField の使い方"
              showLineNumbers
              code={`import TextField from '@mui/material/TextField';

function TextFieldExamples() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  return (
    <Stack spacing={3}>
      {/* バリアント */}
      <TextField label="Outlined（デフォルト）" variant="outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Standard" variant="standard" />

      {/* 入力タイプ */}
      <TextField label="メールアドレス" type="email" />
      <TextField label="パスワード" type="password" />
      <TextField label="数値" type="number" />

      {/* ヘルパーテキストとエラー */}
      <TextField
        label="ユーザー名"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError(e.target.value.length < 3);
        }}
        error={error}
        helperText={error ? '3文字以上で入力してください' : 'お好きなユーザー名を入力'}
      />

      {/* 複数行（テキストエリア） */}
      <TextField
        label="自己紹介"
        multiline
        rows={4}
        placeholder="あなたについて教えてください"
      />

      {/* 全幅 */}
      <TextField label="検索" fullWidth />

      {/* サイズ */}
      <TextField label="小さい" size="small" />
    </Stack>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="Select と Checkbox"
              code={`import {
  Select, MenuItem, InputLabel, FormControl,
  Checkbox, FormControlLabel, FormGroup,
  Radio, RadioGroup, Switch,
} from '@mui/material';

function FormControls() {
  const [category, setCategory] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <Stack spacing={3}>
      {/* セレクトボックス */}
      <FormControl fullWidth>
        <InputLabel>カテゴリ</InputLabel>
        <Select
          value={category}
          label="カテゴリ"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="design">デザイン</MenuItem>
          <MenuItem value="development">開発</MenuItem>
          <MenuItem value="marketing">マーケティング</MenuItem>
        </Select>
      </FormControl>

      {/* チェックボックス */}
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
          }
          label="利用規約に同意する"
        />
      </FormGroup>

      {/* ラジオボタン */}
      <FormControl>
        <RadioGroup defaultValue="monthly">
          <FormControlLabel
            value="monthly" control={<Radio />} label="月額プラン"
          />
          <FormControlLabel
            value="yearly" control={<Radio />} label="年額プラン"
          />
        </RadioGroup>
      </FormControl>

      {/* スイッチ */}
      <FormControlLabel
        control={<Switch />}
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

            <CodeBlock
              language="tsx"
              title="Snackbar（トースト通知）"
              showLineNumbers
              code={`import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function SnackbarExample() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    // 保存処理...
    setOpen(true); // 通知を表示
  };

  return (
    <>
      <Button variant="contained" onClick={handleSave}>
        保存する
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
        >
          変更を保存しました
        </Alert>
      </Snackbar>
    </>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="Dialog（モーダル）"
              showLineNumbers
              code={`import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
} from '@mui/material';
import Button from '@mui/material/Button';

function ConfirmDialog() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    // 削除処理...
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={() => setOpen(true)}
      >
        削除する
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>本当に削除しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText>
            この操作は取り消せません。
            関連するすべてのデータが完全に削除されます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            キャンセル
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
          >
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

            <CodeBlock
              language="tsx"
              title="AppBar（ヘッダーバー）"
              showLineNumbers
              code={`import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* ハンバーガーメニュー（モバイル用） */}
        <IconButton
          edge="start"
          color="inherit"
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* ロゴ / タイトル */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>

        {/* ナビゲーションリンク（PC用） */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button color="inherit">ホーム</Button>
          <Button color="inherit">機能紹介</Button>
          <Button color="inherit">料金</Button>
          <Button variant="outlined" color="inherit">
            ログイン
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="Drawer（サイドバー）"
              showLineNumbers
              code={`import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { text: 'ホーム', icon: <HomeIcon /> },
    { text: 'プロフィール', icon: <PersonIcon /> },
    { text: '設定', icon: <SettingsIcon /> },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>メニューを開く</Button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 250 }}>
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

            <CodeBlock
              language="tsx"
              title="Dashboard.tsx"
              showLineNumbers
              code={`import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton,
  Drawer, Box, Container, Paper,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Card, CardContent, Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// 統計カード
function StatCard({ title, value, icon, color }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{
            p: 1.5, borderRadius: 2,
            bgcolor: color, color: 'white',
          }}>
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

const DRAWER_WIDTH = 240;

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stats = [
    { title: 'ユーザー数', value: '1,234', icon: <PeopleIcon />, color: '#3b82f6' },
    { title: '売上', value: '¥890K', icon: <TrendingUpIcon />, color: '#10b981' },
    { title: 'PV数', value: '45.2K', icon: <BarChartIcon />, color: '#f59e0b' },
    { title: 'コンバージョン', value: '3.2%', icon: <DashboardIcon />, color: '#8b5cf6' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* サイドバー */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
      >
        <Toolbar />
        <List>
          {['ダッシュボード', 'ユーザー', '分析', '設定'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* メインコンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">ダッシュボード</Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {stats.map((stat) => (
              <Grid key={stat.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard {...stat} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
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
