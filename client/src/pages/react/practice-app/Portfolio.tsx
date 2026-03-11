import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 30</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">ポートフォリオサイト制作</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          これまで学んだすべてのスキルを組み合わせて、本格的なポートフォリオサイトを制作しましょう。
          プロジェクト設計からヒーローセクション、プロジェクトギャラリー、お問い合わせフォーム、レスポンシブ対応まで完成させます。
        </p>

        <WhyNowBox tags={['ポートフォリオ', 'React', 'Tailwind CSS', 'React Router', 'レスポンシブ', '総まとめ']}>
          <p>
            ここまで React の基本、状態管理、フック、CSS スタイリング、API 連携、ルーティングを学んできました。
            最終ステップでは、これらすべてを実際のプロジェクトとして統合します。
            デザイナーにとってポートフォリオサイトは自分のスキルを証明する最も重要なツールです。
            自分で作れるようになることで、更新の自由度も格段に上がります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション1: プロジェクト設計 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プロジェクト設計</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              いきなりコードを書き始めるのではなく、まずはサイトの全体設計を行いましょう。
              デザイナーとして普段やっているワイヤーフレームと同じ考え方です。
            </p>

            <CodeBlock
              language="text"
              title="サイトマップとページ構成"
              code={`ポートフォリオサイト構成:

/ (トップページ)
├── ヒーローセクション — 名前・肩書き・キャッチコピー
├── スキルセクション   — 使用可能な技術スタック
├── プロジェクトギャラリー — 制作実績（一部を表示）
└── CTA（お問い合わせへの導線）

/projects (プロジェクト一覧)
├── フィルター機能（カテゴリ別）
└── プロジェクトカード一覧

/projects/:id (プロジェクト詳細)
├── サムネイル画像
├── 説明文
├── 使用技術
└── リンク（GitHub / デモ）

/contact (お問い合わせ)
├── お問い合わせフォーム
└── SNS リンク`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="bash"
              title="プロジェクトのセットアップ"
              code={`# Vite + React + TypeScript で新規プロジェクト作成
pnpm create vite@latest my-portfolio -- --template react-ts

cd my-portfolio

# 必要なパッケージをインストール
pnpm add react-router
pnpm add -D tailwindcss @tailwindcss/vite

# 開発サーバー起動
pnpm dev`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="text"
              title="推奨フォルダ構成"
              code={`src/
├── components/          # 再利用可能なコンポーネント
│   ├── layout/
│   │   ├── Header.tsx   # ヘッダー・ナビゲーション
│   │   ├── Footer.tsx   # フッター
│   │   └── Layout.tsx   # 共通レイアウト
│   ├── ui/
│   │   ├── Button.tsx   # ボタン
│   │   ├── Card.tsx     # カード
│   │   └── Badge.tsx    # バッジ
│   └── sections/
│       ├── Hero.tsx     # ヒーローセクション
│       ├── Skills.tsx   # スキルセクション
│       └── Projects.tsx # プロジェクトプレビュー
├── pages/
│   ├── Home.tsx         # トップページ
│   ├── ProjectList.tsx  # プロジェクト一覧
│   ├── ProjectDetail.tsx # プロジェクト詳細
│   └── Contact.tsx      # お問い合わせ
├── data/
│   └── projects.ts      # プロジェクトデータ
├── types/
│   └── index.ts         # 型定義
├── App.tsx
├── main.tsx
└── index.css`}
            />

            <InfoBox type="info" title="デザイナーへのヒント">
              <p>
                フォルダ構成は Figma のコンポーネント整理と同じ発想です。
                再利用する部品は <code>components/</code> に、ページ単位のものは <code>pages/</code> に。
                最初からきちんと整理しておくと、後からの変更が圧倒的に楽になります。
              </p>
            </InfoBox>
          </section>

          {/* セクション2: 型定義とデータ準備 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">型定義とデータ準備</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              まずはプロジェクトデータの型を定義し、ダミーデータを用意しましょう。
              TypeScript の型定義はデータの設計図です。Figma でコンポーネントのプロパティを定義するのと同じ感覚です。
            </p>

            <CodeBlock
              language="tsx"
              title="src/types/index.ts — 型定義"
              showLineNumbers
              code={`// プロジェクトのカテゴリ
export type ProjectCategory = 'web' | 'mobile' | 'branding' | 'ui-ux';

// プロジェクトデータの型
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: ProjectCategory;
  tags: string[];
  year: number;
  links: {
    demo?: string;
    github?: string;
    figma?: string;
  };
  details: {
    challenge: string;
    solution: string;
    result: string;
  };
}

// スキルデータの型
export interface Skill {
  name: string;
  icon: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

// お問い合わせフォームの型
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/data/projects.ts — プロジェクトデータ"
              showLineNumbers
              code={`import type { Project, Skill } from '../types';

export const projects: Project[] = [
  {
    id: 'recipe-app',
    title: 'レシピ検索アプリ',
    description: '食材や料理名から簡単にレシピを検索できる Web アプリ。お気に入り機能付き。',
    thumbnail: '/images/recipe-app.jpg',
    category: 'web',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'API'],
    year: 2025,
    links: {
      demo: 'https://recipe-app.example.com',
      github: 'https://github.com/username/recipe-app',
    },
    details: {
      challenge: '大量のレシピデータを高速に検索・フィルターする仕組みが必要でした。',
      solution: 'デバウンスを使ったインクリメンタルサーチと、カテゴリ別のフィルターを実装しました。',
      result: '平均検索時間が 200ms 以下になり、ユーザーの離脱率が 30% 改善しました。',
    },
  },
  {
    id: 'design-system',
    title: 'デザインシステム',
    description: 'チーム全体で使えるデザインシステムを Figma から React コンポーネントとして実装。',
    thumbnail: '/images/design-system.jpg',
    category: 'ui-ux',
    tags: ['React', 'Storybook', 'shadcn/ui', 'Figma'],
    year: 2025,
    links: {
      demo: 'https://design-system.example.com',
      figma: 'https://figma.com/file/xxx',
    },
    details: {
      challenge: 'デザイナーとエンジニアの間で UI の認識がずれることが多く、手戻りが発生していました。',
      solution: 'Figma のコンポーネントと 1:1 対応する React コンポーネントライブラリを構築しました。',
      result: 'デザインの手戻りが 60% 削減され、開発速度が 2 倍になりました。',
    },
  },
  {
    id: 'weather-dashboard',
    title: '天気ダッシュボード',
    description: '位置情報を使ったリアルタイム天気表示アプリ。週間予報とグラフ表示対応。',
    thumbnail: '/images/weather-dashboard.jpg',
    category: 'web',
    tags: ['React', 'Chart.js', 'OpenWeather API', 'MUI'],
    year: 2024,
    links: {
      demo: 'https://weather.example.com',
      github: 'https://github.com/username/weather-app',
    },
    details: {
      challenge: '天気データを視覚的にわかりやすく表示する必要がありました。',
      solution: 'Chart.js でグラフを描画し、アイコンアニメーションで天気を直感的に表現しました。',
      result: 'ユーザーから「見やすい」と高評価を得て、日間アクティブユーザー 500 人を達成しました。',
    },
  },
  {
    id: 'brand-identity',
    title: 'ブランドアイデンティティ',
    description: 'スタートアップ企業のロゴ、カラーパレット、タイポグラフィをデザイン。',
    thumbnail: '/images/brand-identity.jpg',
    category: 'branding',
    tags: ['Figma', 'Illustrator', 'ブランディング'],
    year: 2024,
    links: {
      figma: 'https://figma.com/file/yyy',
    },
    details: {
      challenge: '「革新的だけど親しみやすい」というブランドイメージを表現する必要がありました。',
      solution: '幾何学的な形状と暖色系のカラーパレットを組み合わせたデザインシステムを提案しました。',
      result: 'クライアントから一発承認をいただき、ブランド認知度の向上に貢献しました。',
    },
  },
];

export const skills: Skill[] = [
  { name: 'React', icon: '⚛️', level: 'advanced' },
  { name: 'TypeScript', icon: '📘', level: 'intermediate' },
  { name: 'Tailwind CSS', icon: '🎨', level: 'advanced' },
  { name: 'Figma', icon: '🖌️', level: 'advanced' },
  { name: 'Next.js', icon: '▲', level: 'intermediate' },
  { name: 'Git', icon: '🔀', level: 'intermediate' },
];

export const categories = [
  { value: 'all', label: 'すべて' },
  { value: 'web', label: 'Web アプリ' },
  { value: 'mobile', label: 'モバイル' },
  { value: 'branding', label: 'ブランディング' },
  { value: 'ui-ux', label: 'UI/UX' },
] as const;`}
            />
          </section>

          {/* セクション3: 共通レイアウト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">共通レイアウトとヘッダー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              すべてのページで共通のヘッダーとフッターを表示するレイアウトコンポーネントを作ります。
              React Router の <code>Outlet</code> と組み合わせて使います。
            </p>

            <CodeBlock
              language="tsx"
              title="src/components/layout/Header.tsx"
              showLineNumbers
              code={`import { useState } from 'react';
import { NavLink } from 'react-router';

const navItems = [
  { to: '/', label: 'ホーム' },
  { to: '/projects', label: 'プロジェクト' },
  { to: '/contact', label: 'お問い合わせ' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <NavLink to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Portfolio
          </NavLink>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  \`text-sm font-medium transition-colors \${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }\`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span className={\`block h-0.5 bg-gray-600 dark:bg-gray-400 transition-transform \${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }\`} />
              <span className={\`block h-0.5 bg-gray-600 dark:bg-gray-400 transition-opacity \${
                isMenuOpen ? 'opacity-0' : ''
              }\`} />
              <span className={\`block h-0.5 bg-gray-600 dark:bg-gray-400 transition-transform \${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }\`} />
            </div>
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  \`block py-2 text-sm font-medium \${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }\`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/components/layout/Layout.tsx — Outlet を使った共通レイアウト"
              showLineNumbers
              code={`import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Footer.tsx
function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              GitHub
            </a>
            <a href="https://twitter.com" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              X (Twitter)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/App.tsx — ルーティング設定"
              showLineNumbers
              code={`import { Routes, Route } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-700">404</h1>
        <p className="text-xl text-gray-500 mt-4">ページが見つかりません</p>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="sticky ヘッダーのポイント">
              <p>
                <code>sticky top-0</code> と <code>backdrop-blur-md</code> を組み合わせることで、
                スクロールしてもヘッダーが画面上部に固定され、背景がぼかされたガラスのような効果が得られます。
                <code>z-50</code> でヘッダーが他の要素の上に表示されるようにしています。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: ヒーローセクション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ヒーローセクション</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ポートフォリオサイトの第一印象を決めるヒーローセクションを作りましょう。
              名前、肩書き、キャッチコピー、CTA ボタンを配置します。
            </p>

            <CodeBlock
              language="tsx"
              title="src/components/sections/Hero.tsx"
              showLineNumbers
              code={`import { Link } from 'react-router';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景のグラデーション装飾 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* テキスト部分 */}
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
              こんにちは、私は
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              山田 太郎
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-500 dark:text-gray-400 mb-6">
              UI/UX デザイナー &amp; フロントエンドエンジニア
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg">
              デザインとコードの両方を使って、ユーザーにとって
              使いやすく美しいプロダクトを作ることが得意です。
            </p>

            {/* CTA ボタン */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                プロジェクトを見る
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>

          {/* プロフィール画像 */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-2xl" />
              <img
                src="/images/profile.jpg"
                alt="プロフィール画像"
                className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`}
            />

            <InfoBox type="warning" title="画像の準備について">
              <p>
                実際のプロジェクトでは <code>public/images/</code> フォルダに画像を配置します。
                開発中はプレースホルダー画像サービス（例: <code>https://placehold.co/400x400</code>）を使うと便利です。
                画像の <code>alt</code> 属性は必ず設定しましょう。アクセシビリティの基本です。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: スキルセクション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">スキルセクション</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              使用できる技術スタックを視覚的に表示するセクションです。
              データを配列で管理し、<code>map</code> で描画するパターンを活用します。
            </p>

            <CodeBlock
              language="tsx"
              title="src/components/sections/Skills.tsx"
              showLineNumbers
              code={`import { skills } from '../../data/projects';

const levelLabels = {
  beginner: '学習中',
  intermediate: '実務レベル',
  advanced: '得意',
};

const levelColors = {
  beginner: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  advanced: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

export default function Skills() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            スキル & ツール
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            デザインと開発の両方で使用しているツールと技術です。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">{skill.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {skill.name}
                </p>
                <span className={\`text-xs px-2 py-0.5 rounded-full font-medium \${levelColors[skill.level]}\`}>
                  {levelLabels[skill.level]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`}
            />
          </section>

          {/* セクション6: プロジェクトギャラリー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プロジェクトギャラリー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              制作実績を一覧表示するギャラリーを作ります。
              カテゴリフィルター機能を付けて、見たいプロジェクトを素早く見つけられるようにしましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="src/components/ui/Card.tsx — プロジェクトカード"
              showLineNumbers
              code={`import { Link } from 'react-router';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={\`/projects/\${project.id}\`}
      className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
    >
      {/* サムネイル */}
      <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 情報 */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {project.year}
          </span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
            {project.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {project.description}
        </p>

        {/* タグ */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="src/pages/ProjectList.tsx — フィルター付き一覧ページ"
              showLineNumbers
              code={`import { useState } from 'react';
import { projects, categories } from '../data/projects';
import ProjectCard from '../components/ui/Card';
import type { ProjectCategory } from '../types';

export default function ProjectList() {
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all');

  // フィルター処理
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          プロジェクト
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          これまでに制作したプロジェクトの一覧です。
        </p>
      </div>

      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value as 'all' | ProjectCategory)}
            className={\`px-4 py-2 rounded-full text-sm font-medium transition-colors \${
              activeCategory === cat.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }\`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* プロジェクトグリッド */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* フィルター結果が空の場合 */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            このカテゴリのプロジェクトはまだありません。
          </p>
        </div>
      )}
    </div>
  );
}`}
            />

            <InfoBox type="info" title="group ホバーの仕組み">
              <p>
                Tailwind CSS の <code>group</code> クラスを使うと、親要素のホバー状態に応じて
                子要素のスタイルを変更できます。カードのどこにマウスを乗せても、
                画像のズームやタイトルの色変更が起きるのはこの仕組みのおかげです。
                Figma のプロトタイプでホバー状態を設定するのと同じ発想です。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: プロジェクト詳細ページ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プロジェクト詳細ページ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code>useParams</code> で URL からプロジェクト ID を取得し、データを表示する詳細ページです。
              Step 29 で学んだ動的ルーティングを活用します。
            </p>

            <CodeBlock
              language="tsx"
              title="src/pages/ProjectDetail.tsx"
              showLineNumbers
              code={`import { useParams, Link } from 'react-router';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  // プロジェクトが見つからない場合
  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          プロジェクトが見つかりません
        </h1>
        <Link to="/projects" className="text-blue-600 hover:underline">
          一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      {/* パンくずナビ */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">
          ホーム
        </Link>
        <span>/</span>
        <Link to="/projects" className="hover:text-gray-700 dark:hover:text-gray-300">
          プロジェクト
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{project.title}</span>
      </nav>

      {/* メイン画像 */}
      <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* タイトルと基本情報 */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-sm text-gray-500">{project.year}</span>
          <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            {project.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* 使用技術 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 詳細: 課題・解決策・結果 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">課題</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.details.challenge}
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">解決策</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.details.solution}
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">結果</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.details.result}
          </p>
        </div>
      </div>

      {/* リンク */}
      <div className="flex flex-wrap gap-4">
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            デモを見る
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            GitHub
          </a>
        )}
        {project.links.figma && (
          <a
            href={project.links.figma}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Figma
          </a>
        )}
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション8: お問い合わせフォーム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">お問い合わせフォーム</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Step 11 で学んだフォームの知識を活かして、バリデーション付きのお問い合わせフォームを作ります。
              状態管理とイベント処理の総復習です。
            </p>

            <CodeBlock
              language="tsx"
              title="src/pages/Contact.tsx"
              showLineNumbers
              code={`import { useState } from 'react';
import type { ContactForm } from '../types';

const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // バリデーション
  const validate = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!form.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }
    if (!form.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }
    if (!form.subject.trim()) {
      newErrors.subject = '件名を入力してください';
    }
    if (!form.message.trim()) {
      newErrors.message = 'メッセージを入力してください';
    } else if (form.message.length < 10) {
      newErrors.message = '10文字以上入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 入力ハンドラー
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 入力時にエラーをクリア
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // API 送信をシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setForm(initialForm);
  };

  // 送信成功画面
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          送信完了しました
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          お問い合わせありがとうございます。2営業日以内にご返信いたします。
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          新しいメッセージを送る
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        お問い合わせ
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        お仕事のご依頼やご質問は、以下のフォームからお気軽にどうぞ。
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 名前 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            お名前 *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={\`w-full px-4 py-2.5 rounded-lg border \${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors\`}
            placeholder="田中 花子"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* メール */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            メールアドレス *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={\`w-full px-4 py-2.5 rounded-lg border \${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors\`}
            placeholder="tanaka@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* 件名 */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            件名 *
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            className={\`w-full px-4 py-2.5 rounded-lg border \${
              errors.subject
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors\`}
            placeholder="Web サイト制作のご相談"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* メッセージ */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            メッセージ *
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            className={\`w-full px-4 py-2.5 rounded-lg border \${
              errors.message
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors resize-none\`}
            placeholder="ご依頼内容やご質問をお書きください..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            {form.message.length} / 1000 文字
          </p>
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </button>
      </form>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="フォームバリデーションの設計">
              <p>
                バリデーションは「送信時」に全項目をチェックし、「入力時」にはそのフィールドのエラーだけをクリアしています。
                これにより、ユーザーが入力を修正するとすぐにエラーが消える自然な UX が実現できます。
                実際のプロジェクトでは <code>react-hook-form</code> + <code>zod</code> の組み合わせが定番です。
              </p>
            </InfoBox>
          </section>

          {/* セクション9: レスポンシブデザイン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">レスポンシブ対応のポイント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Step 23 で学んだレスポンシブデザインの知識を活かして、
              ポートフォリオサイト全体をモバイル対応にしましょう。
            </p>

            <CodeBlock
              language="tsx"
              title="レスポンシブ対応のパターン集"
              showLineNumbers
              code={`{/* パターン1: グリッドのレスポンシブ切り替え */}
{/* モバイル: 1列 → タブレット: 2列 → デスクトップ: 3列 */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>

{/* パターン2: フレックスの方向切り替え */}
{/* モバイル: 縦並び → デスクトップ: 横並び */}
<div className="flex flex-col md:flex-row gap-8 items-center">
  <div className="w-full md:w-1/2">
    <img src="..." alt="..." className="rounded-xl" />
  </div>
  <div className="w-full md:w-1/2">
    <h2>テキストコンテンツ</h2>
  </div>
</div>

{/* パターン3: 文字サイズのレスポンシブ */}
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
  見出しテキスト
</h1>

{/* パターン4: パディングのレスポンシブ */}
<div className="px-4 md:px-8 py-12 md:py-20">
  コンテンツ
</div>

{/* パターン5: モバイルでは非表示 */}
<span className="hidden md:inline">
  デスクトップ専用テキスト
</span>

{/* パターン6: モバイルのみ表示 */}
<button className="md:hidden">
  モバイルメニュー
</button>`}
            />

            <InfoBox type="warning" title="モバイルファーストを忘れずに">
              <p>
                Tailwind CSS はモバイルファースト設計です。クラス名をそのまま書くとモバイル向けになり、
                <code>md:</code> や <code>lg:</code> で大きい画面の表示を上書きします。
                デザインは必ずモバイル画面から確認しましょう。Chrome DevTools の
                デバイスモードで実機に近い確認ができます。
              </p>
            </InfoBox>
          </section>

          {/* セクション10: トップページの組み立て */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">トップページの組み立て</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまで作ったセクションコンポーネントを組み合わせて、トップページを完成させましょう。
              コンポーネント分割のおかげで、ページの構成が一目でわかります。
            </p>

            <CodeBlock
              language="tsx"
              title="src/pages/Home.tsx — トップページ"
              showLineNumbers
              code={`import { Link } from 'react-router';
import Hero from '../components/sections/Hero';
import Skills from '../components/sections/Skills';
import ProjectCard from '../components/ui/Card';
import { projects } from '../data/projects';

export default function Home() {
  // トップページでは最新3件のプロジェクトだけ表示
  const featuredProjects = projects.slice(0, 3);

  return (
    <div>
      {/* ヒーローセクション */}
      <Hero />

      {/* スキルセクション */}
      <Skills />

      {/* プロジェクトプレビュー */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                最新のプロジェクト
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                最近取り組んだプロジェクトをご紹介します。
              </p>
            </div>
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              すべて見る →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* モバイル向け「すべて見る」リンク */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              すべてのプロジェクトを見る
            </Link>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            一緒にプロジェクトを始めませんか？
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            デザインから実装まで、一貫してお手伝いします。
            まずはお気軽にご相談ください。
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="コンポーネント設計の考え方">
              <p>
                トップページの <code>Home.tsx</code> を見てみると、<code>Hero</code>、<code>Skills</code>、
                プロジェクトプレビュー、CTA の4つのセクションで構成されていることが一目でわかります。
                各セクションを独立したコンポーネントにすることで、順番の入れ替えや内容の修正が簡単にできます。
                これが React のコンポーネント設計の真価です。
              </p>
            </InfoBox>
          </section>

          {/* セクション11: 仕上げとデプロイ準備 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">仕上げとデプロイ準備</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最後に、メタデータの設定、パフォーマンス最適化、ダークモード対応など、
              公開前の仕上げ作業を行いましょう。
            </p>

            <CodeBlock
              language="html"
              title="index.html — メタデータの設定"
              showLineNumbers
              code={`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- 基本メタデータ -->
  <title>山田太郎 | UI/UX デザイナー & フロントエンドエンジニア</title>
  <meta name="description" content="UI/UX デザインとフロントエンド開発のポートフォリオサイトです。" />

  <!-- OGP（SNS シェア時の表示） -->
  <meta property="og:title" content="山田太郎 | ポートフォリオ" />
  <meta property="og:description" content="デザインとコードで、使いやすく美しいプロダクトを作ります。" />
  <meta property="og:image" content="https://example.com/og-image.jpg" />
  <meta property="og:url" content="https://example.com" />
  <meta property="og:type" content="website" />

  <!-- Twitter カード -->
  <meta name="twitter:card" content="summary_large_image" />

  <!-- ファビコン -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="パフォーマンス最適化 — ページの遅延読み込み"
              showLineNumbers
              code={`import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import Layout from './components/layout/Layout';

// 遅延読み込み（必要になったときに初めて読み込む）
const Home = lazy(() => import('./pages/Home'));
const ProjectList = lazy(() => import('./pages/ProjectList'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));

// ローディング表示
function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Suspense>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="tsx"
              title="ダークモード対応のトグルボタン"
              showLineNumbers
              code={`import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // ローカルストレージから設定を復元
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // OS の設定に従う
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // html 要素に dark クラスを付け外し
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="テーマを切り替え"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="bash"
              title="ビルドとデプロイ"
              code={`# プロダクションビルド
pnpm build

# ビルド結果をプレビュー
pnpm preview

# Vercel にデプロイ（Vercel CLI を使う場合）
npx vercel

# Netlify にデプロイ
npx netlify deploy --prod --dir dist`}
            />

            <InfoBox type="success" title="ポートフォリオサイト制作の完了">
              <p>
                おめでとうございます！ React の基本から始まり、状態管理、フック、
                スタイリング（Tailwind CSS / MUI）、API 連携、ルーティングを経て、
                ついに本格的なポートフォリオサイトを完成させることができました。
                ここで学んだスキルは、あらゆる Web アプリ開発の基盤になります。
                自分のポートフォリオを継続的に更新して、スキルの成長を記録していきましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション12: 次のステップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">この先の学習ロードマップ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              このマニュアルで React の基礎は身につきました。ここからさらにステップアップするための
              ロードマップをご紹介します。
            </p>

            <CodeBlock
              language="text"
              title="学習ロードマップ"
              code={`[完了] 基礎編
  ├── React の基本（JSX, コンポーネント, Props）
  ├── 状態管理とイベント（useState, フォーム）
  ├── フック（useEffect, useContext, useReducer, useMemo, カスタムフック）
  └── スタイリング（CSS, CSS-in-JS, Tailwind CSS, MUI）

[完了] 実践編
  ├── API 連携（fetch, axios）
  ├── ルーティング（React Router）
  └── ポートフォリオサイト制作

[次の目標] 応用編
  ├── Next.js — サーバーサイドレンダリング、ファイルベースルーティング
  ├── テスト — Vitest, React Testing Library
  ├── 状態管理ライブラリ — Zustand, Jotai, TanStack Query
  ├── フォームライブラリ — React Hook Form + Zod
  ├── アニメーション — Framer Motion
  └── デプロイ・CI/CD — Vercel, GitHub Actions

[将来的に] 発展編
  ├── TypeScript の高度な型活用
  ├── アクセシビリティ（WCAG, ARIA）
  ├── パフォーマンス最適化（Lighthouse, Core Web Vitals）
  ├── デザインシステム構築
  └── モノレポ・マイクロフロントエンド`}
            />

            <InfoBox type="success" title="全 30 ステップ完了">
              <p>
                React マニュアルの全 30 ステップを完了しました。
                デザイナーとしての強みを活かしながら、React でのフロントエンド開発ができるようになっています。
                学んだことを実際のプロジェクトで使い、アウトプットを続けることが一番の上達法です。
                このマニュアルにいつでも戻ってきて、復習してください。
              </p>
            </InfoBox>
          </section>
        </div>

        {/* ReferenceLinks */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Vite 公式ドキュメント',
                  url: 'https://vite.dev/guide/',
                  description: 'Vite プロジェクトの作成と設定',
                },
                {
                  title: 'Tailwind CSS 公式ドキュメント',
                  url: 'https://tailwindcss.com/docs',
                  description: 'Tailwind CSS のユーティリティクラスリファレンス',
                },
              ]}
            />
          </section>

        <PageNavigation />
      </div>
    </div>
  );
}
