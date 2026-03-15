import { useState } from 'react';
import CodingChallenge from '@/components/CodingChallenge';
import { level2Challenges as l2Raw } from '@/data/training-level2';
import { level3Challenges as l3Raw } from '@/data/training-level3';
import { level4Challenges as l4Raw } from '@/data/training-level4';

// ── 型定義 ──
export interface Challenge {
  title: string;
  description: string;
  initialCode: string;
  answer: string;
  hints: string[];
  keywords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

// ── 難易度バッジ ──
function DifficultyBadge({ difficulty }: { difficulty: Challenge['difficulty'] }) {
  const config = {
    easy: { label: 'Easy', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
    medium: { label: 'Medium', bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
    hard: { label: 'Hard', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
  };
  const c = config[difficulty];
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

// ══════════════════════════════════════════════════════════════
// レベル 1: 基本レイアウト
// ══════════════════════════════════════════════════════════════
export const level1Challenges: Challenge[] = [
  // ── 1. 要素の中央寄せ（Flexbox）──
  {
    title: '要素の中央寄せ（Flexbox）',
    description: 'Flexbox を使って "Center me" テキストを親要素の中央に配置してください。',
    difficulty: 'easy',
    initialCode: `function CenterFlex() {
  return (
    <div style={{
      // ここにスタイルを追加
      minHeight: '200px',
      background: 'var(--bg)',
      border: '2px dashed var(--border)',
      borderRadius: '8px',
    }}>
      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center me</span>
    </div>
  );
}`,
    answer: `function CenterFlex() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      background: 'var(--bg)',
      border: '2px dashed var(--border)',
      borderRadius: '8px',
    }}>
      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center me</span>
    </div>
  );
}`,
    hints: [
      'display: "flex" で Flex Container にします',
      'justifyContent: "center" で水平方向の中央寄せ',
      'alignItems: "center" で垂直方向の中央寄せ',
    ],
    keywords: ['display', 'flex', 'alignItems', 'center', 'justifyContent', 'center'],
  },

  // ── 2. 要素の中央寄せ（Grid）──
  {
    title: '要素の中央寄せ（Grid）',
    description: 'CSS Grid を使って "Center me" テキストを親要素の中央に配置してください。Flexbox より短く書けます。',
    difficulty: 'easy',
    initialCode: `function CenterGrid() {
  return (
    <div style={{
      // ここにスタイルを追加
      minHeight: '200px',
      background: 'var(--bg)',
      border: '2px dashed var(--border)',
      borderRadius: '8px',
    }}>
      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center me</span>
    </div>
  );
}`,
    answer: `function CenterGrid() {
  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: '200px',
      background: 'var(--bg)',
      border: '2px dashed var(--border)',
      borderRadius: '8px',
    }}>
      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center me</span>
    </div>
  );
}`,
    hints: [
      'display: "grid" で Grid Container にします',
      'placeItems は align-items と justify-items の一括指定です',
      'placeItems: "center" だけで縦横中央寄せが完成します',
    ],
    keywords: ['display', 'grid', 'placeItems', 'center'],
  },

  // ── 3. 要素の中央寄せ（absolute + transform）──
  {
    title: '要素の中央寄せ（absolute + transform）',
    description: 'position: absolute と transform を使って子要素を中央に配置してください。親要素には position: relative が設定済みです。',
    difficulty: 'easy',
    initialCode: `function CenterAbsolute() {
  return (
    <div style={{
      position: 'relative',
      minHeight: '200px',
      background: 'var(--bg)',
      border: '2px dashed var(--border)',
      borderRadius: '8px',
    }}>
      <span style={{
        // ここにスタイルを追加
        color: 'var(--text)',
        fontWeight: 600,
        background: 'var(--bg-accent)',
        padding: '8px 16px',
        borderRadius: '6px',
      }}>Center me</span>
    </div>
  );
}`,
    answer: `function CenterAbsolute() {
  return (
    <div style={{
      position: 'relative',
      minHeight: '200px',
      background: 'var(--bg)',
      border: '2px dashed var(--border)',
      borderRadius: '8px',
    }}>
      <span style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'var(--text)',
        fontWeight: 600,
        background: 'var(--bg-accent)',
        padding: '8px 16px',
        borderRadius: '6px',
      }}>Center me</span>
    </div>
  );
}`,
    hints: [
      'position: "absolute" で要素を通常フローから外します',
      'top: "50%", left: "50%" で親の中央に基準点を移動',
      'transform: "translate(-50%, -50%)" で自身のサイズ分ずらして完全な中央に',
    ],
    keywords: ['position', 'absolute', 'top', '50%', 'left', '50%', 'transform', 'translate(-50%, -50%)'],
  },

  // ── 4. カードの横並び（均等配置）──
  {
    title: 'カードの横並び（均等配置）',
    description: '3枚のカードを横並びにして均等な幅で配置してください。カード間には 16px の隙間を入れます。',
    difficulty: 'easy',
    initialCode: `function CardRow() {
  var cardStyle = {
    // ここにスタイルを追加
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
  };
  return (
    <div style={{
      // ここにスタイルを追加
    }}>
      <div style={cardStyle}>
        <p style={{ color: 'var(--text)', fontWeight: 600, margin: 0 }}>Card 1</p>
      </div>
      <div style={cardStyle}>
        <p style={{ color: 'var(--text)', fontWeight: 600, margin: 0 }}>Card 2</p>
      </div>
      <div style={cardStyle}>
        <p style={{ color: 'var(--text)', fontWeight: 600, margin: 0 }}>Card 3</p>
      </div>
    </div>
  );
}`,
    answer: `function CardRow() {
  var cardStyle = {
    flex: 1,
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
  };
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
    }}>
      <div style={cardStyle}>
        <p style={{ color: 'var(--text)', fontWeight: 600, margin: 0 }}>Card 1</p>
      </div>
      <div style={cardStyle}>
        <p style={{ color: 'var(--text)', fontWeight: 600, margin: 0 }}>Card 2</p>
      </div>
      <div style={cardStyle}>
        <p style={{ color: 'var(--text)', fontWeight: 600, margin: 0 }}>Card 3</p>
      </div>
    </div>
  );
}`,
    hints: [
      'display: "flex" で横並びにします',
      'gap: "16px" でカード間のスペースを設定',
      '各カードに flex: 1 を指定すると均等幅になります',
    ],
    keywords: ['display', 'flex', 'gap', 'flex: 1'],
  },

  // ── 5. ヘッダーレイアウト（ロゴ + ナビ + ボタン）──
  {
    title: 'ヘッダーレイアウト（ロゴ + ナビ + ボタン）',
    description: 'ロゴを左端、ナビを中央付近、ボタンを右端に配置する典型的なヘッダーを作ってください。',
    difficulty: 'easy',
    initialCode: `function Header() {
  return (
    <div style={{
      // ここにスタイルを追加
      padding: '0 20px',
      height: '56px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
    }}>
      <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text)' }}>MyApp</div>
      <nav style={{ display: 'flex', gap: '16px' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Home</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>About</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Blog</span>
      </nav>
      <button style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: 'var(--bg-accent)', color: 'var(--text)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Sign Up</button>
    </div>
  );
}`,
    answer: `function Header() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      height: '56px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
    }}>
      <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text)' }}>MyApp</div>
      <nav style={{ display: 'flex', gap: '16px' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Home</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>About</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Blog</span>
      </nav>
      <button style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: 'var(--bg-accent)', color: 'var(--text)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Sign Up</button>
    </div>
  );
}`,
    hints: [
      'display: "flex" で子要素を横並びに',
      'justifyContent: "space-between" で左端・中央・右端に要素を配置',
      'alignItems: "center" で垂直方向の中央揃え',
    ],
    keywords: ['display', 'flex', 'justifyContent', 'space-between', 'alignItems', 'center'],
  },

  // ── 6. Sticky フッター ──
  {
    title: 'Sticky フッター',
    description: 'コンテンツが少なくてもフッターが画面の最下部に張り付くレイアウトを作ってください。',
    difficulty: 'medium',
    initialCode: `function StickyFooter() {
  return (
    <div style={{
      // ここにスタイルを追加
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <header style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-muted)' }}>
        <span style={{ color: 'var(--text)', fontWeight: 700 }}>Header</span>
      </header>
      <main style={{
        // ここにスタイルを追加
        padding: '20px',
      }}>
        <p style={{ color: 'var(--text)', margin: 0 }}>短いコンテンツ</p>
      </main>
      <footer style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-muted)' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Footer - 常に最下部に表示</span>
      </footer>
    </div>
  );
}`,
    answer: `function StickyFooter() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '300px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <header style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-muted)' }}>
        <span style={{ color: 'var(--text)', fontWeight: 700 }}>Header</span>
      </header>
      <main style={{
        flex: 1,
        padding: '20px',
      }}>
        <p style={{ color: 'var(--text)', margin: 0 }}>短いコンテンツ</p>
      </main>
      <footer style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-muted)' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Footer - 常に最下部に表示</span>
      </footer>
    </div>
  );
}`,
    hints: [
      'wrapper に display: "flex" と flexDirection: "column" を設定',
      'minHeight を指定して最低限の高さを確保（実務では "100vh"）',
      'main に flex: 1 を指定すると残りの空間を全て占有し、footer が下に押し出されます',
    ],
    keywords: ['display', 'flex', 'flexDirection', 'column', 'minHeight', 'flex: 1'],
  },

  // ── 7. 2カラムレイアウト（サイドバー + メイン）──
  {
    title: '2カラムレイアウト（サイドバー + メイン）',
    description: '左にサイドバー（幅200px固定）、右にメインコンテンツ（残り全幅）の2カラムレイアウトを作ってください。',
    difficulty: 'easy',
    initialCode: `function TwoColumn() {
  return (
    <div style={{
      // ここにスタイルを追加
      height: '200px',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <aside style={{
        // ここにスタイルを追加
        background: 'var(--bg-muted)',
        padding: '16px',
        borderRight: '1px solid var(--border)',
      }}>
        <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '14px', margin: 0 }}>Sidebar</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '8px 0 0' }}>width: 200px</p>
      </aside>
      <main style={{
        // ここにスタイルを追加
        background: 'var(--bg)',
        padding: '16px',
      }}>
        <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '14px', margin: 0 }}>Main Content</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '8px 0 0' }}>flex: 1 で残り全幅</p>
      </main>
    </div>
  );
}`,
    answer: `function TwoColumn() {
  return (
    <div style={{
      display: 'flex',
      height: '200px',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <aside style={{
        width: '200px',
        flexShrink: 0,
        background: 'var(--bg-muted)',
        padding: '16px',
        borderRight: '1px solid var(--border)',
      }}>
        <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '14px', margin: 0 }}>Sidebar</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '8px 0 0' }}>width: 200px</p>
      </aside>
      <main style={{
        flex: 1,
        background: 'var(--bg)',
        padding: '16px',
      }}>
        <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '14px', margin: 0 }}>Main Content</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '8px 0 0' }}>flex: 1 で残り全幅</p>
      </main>
    </div>
  );
}`,
    hints: [
      'display: "flex" で横並びにします',
      'sidebar に width: "200px" と flexShrink: 0 で固定幅に',
      'main に flex: 1 で残りの幅を全て使います',
    ],
    keywords: ['display', 'flex', 'width', '200px', 'flex: 1'],
  },

  // ── 8. カードグリッド（auto-fill）──
  {
    title: 'カードグリッド（auto-fill）',
    description: '6枚のカードをレスポンシブなグリッドで配置してください。各カードは最小150px、最大1frで自動的に折り返します。',
    difficulty: 'medium',
    initialCode: `function CardGrid() {
  var cards = [1, 2, 3, 4, 5, 6];
  return (
    <div style={{
      // ここにスタイルを追加
    }}>
      {cards.map(function(n) {
        return (
          <div key={n} style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-accent)', margin: '0 auto 8px' }} />
            <p style={{ color: 'var(--text)', fontWeight: 600, fontSize: '14px', margin: 0 }}>Card {n}</p>
          </div>
        );
      })}
    </div>
  );
}`,
    answer: `function CardGrid() {
  var cards = [1, 2, 3, 4, 5, 6];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '12px',
    }}>
      {cards.map(function(n) {
        return (
          <div key={n} style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-accent)', margin: '0 auto 8px' }} />
            <p style={{ color: 'var(--text)', fontWeight: 600, fontSize: '14px', margin: 0 }}>Card {n}</p>
          </div>
        );
      })}
    </div>
  );
}`,
    hints: [
      'display: "grid" で Grid Container にします',
      'gridTemplateColumns に repeat(auto-fill, minmax(150px, 1fr)) を使います',
      'gap: "12px" でカード間のスペースを設定',
    ],
    keywords: ['display', 'grid', 'gridTemplateColumns', 'repeat', 'auto-fill', 'minmax', 'gap'],
  },

  // ── 9. テキストの折り返しと省略 ──
  {
    title: 'テキストの折り返しと省略',
    description: '長いテキストを1行で省略表示（末尾に ... を表示）してください。固定幅のボックス内に収めます。',
    difficulty: 'easy',
    initialCode: `function TextTruncate() {
  return (
    <div style={{
      width: '250px',
      padding: '16px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
    }}>
      <p style={{
        // ここにスタイルを追加
        color: 'var(--text)',
        fontSize: '14px',
        margin: 0,
      }}>
        これはとても長いテキストで、ボックスの幅に収まりきらないので省略表示する必要があります。
      </p>
    </div>
  );
}`,
    answer: `function TextTruncate() {
  return (
    <div style={{
      width: '250px',
      padding: '16px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
    }}>
      <p style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'var(--text)',
        fontSize: '14px',
        margin: 0,
      }}>
        これはとても長いテキストで、ボックスの幅に収まりきらないので省略表示する必要があります。
      </p>
    </div>
  );
}`,
    hints: [
      'overflow: "hidden" ではみ出た部分を隠します',
      'textOverflow: "ellipsis" で省略記号（...）を表示',
      'whiteSpace: "nowrap" で改行を防ぎ、1行に収めます',
    ],
    keywords: ['overflow', 'hidden', 'textOverflow', 'ellipsis', 'whiteSpace', 'nowrap'],
  },

  // ── 10. Flex の折り返し（タグ一覧）──
  {
    title: 'Flex の折り返し（タグ一覧）',
    description: '8個のタグバッジを横並びにして、収まりきらない場合は次の行に折り返すようにしてください。',
    difficulty: 'easy',
    initialCode: `function TagList() {
  var tags = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'GraphQL', 'Prisma', 'Vercel'];
  var tagStyle = {
    padding: '4px 12px',
    borderRadius: '9999px',
    background: 'var(--bg-accent)',
    color: 'var(--text)',
    fontSize: '13px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  };
  return (
    <div style={{
      // ここにスタイルを追加
      padding: '16px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
    }}>
      {tags.map(function(tag) {
        return <span key={tag} style={tagStyle}>{tag}</span>;
      })}
    </div>
  );
}`,
    answer: `function TagList() {
  var tags = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'GraphQL', 'Prisma', 'Vercel'];
  var tagStyle = {
    padding: '4px 12px',
    borderRadius: '9999px',
    background: 'var(--bg-accent)',
    color: 'var(--text)',
    fontSize: '13px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  };
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      padding: '16px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
    }}>
      {tags.map(function(tag) {
        return <span key={tag} style={tagStyle}>{tag}</span>;
      })}
    </div>
  );
}`,
    hints: [
      'display: "flex" で横並びにします',
      'flexWrap: "wrap" で折り返しを有効に',
      'gap: "8px" でタグ間のスペースを設定',
    ],
    keywords: ['display', 'flex', 'flexWrap', 'wrap', 'gap'],
  },
];

// レベル 2-4 は別エージェントが追加する想定。空配列を export しておく
// 外部データを Challenge 型に変換（型互換のため）
const level2Challenges: Challenge[] = l2Raw.map(c => ({ title: c.title, description: c.description, initialCode: c.initialCode, answer: c.answer, hints: c.hints, keywords: c.keywords, difficulty: c.difficulty }));
const level3Challenges: Challenge[] = l3Raw.map(c => ({ title: c.title, description: c.description, initialCode: c.initialCode, answer: c.answer, hints: c.hints, keywords: c.keywords, difficulty: c.difficulty }));
const level4Challenges: Challenge[] = l4Raw.map(c => ({ title: c.title, description: c.description, initialCode: c.initialCode, answer: c.answer, hints: c.hints, keywords: c.keywords, difficulty: c.difficulty }));

// ── レベル定義 ──
const levels = [
  { id: 1, label: 'レベル1', subtitle: '基本レイアウト', challenges: level1Challenges },
  { id: 2, label: 'レベル2', subtitle: '装飾・インタラクション', challenges: level2Challenges },
  { id: 3, label: 'レベル3', subtitle: 'コンポーネント再現', challenges: level3Challenges },
  { id: 4, label: 'レベル4', subtitle: '実践レイアウト', challenges: level4Challenges },
] as const;

type FilterLevel = 'all' | 1 | 2 | 3 | 4;

// ══════════════════════════════════════════════════════════════
// ページ本体
// ══════════════════════════════════════════════════════════════
export default function Training() {
  const [filter, setFilter] = useState<FilterLevel>('all');

  const filterTabs: { value: FilterLevel; label: string }[] = [
    { value: 'all', label: '全て' },
    { value: 1, label: 'レベル1' },
    { value: 2, label: 'レベル2' },
    { value: 3, label: 'レベル3' },
    { value: 4, label: 'レベル4' },
  ];

  const visibleLevels = levels.filter(
    (lv) => lv.challenges.length > 0 && (filter === 'all' || filter === lv.id),
  );

  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* ── ページヘッダー ── */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3">
          UI トレーニング
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          よくある UI パターンを、手を動かして再現するトレーニング
        </p>

        {/* ── レベルフィルタ ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={String(tab.value)}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === tab.value
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── チャレンジ一覧 ── */}
        <div className="space-y-16">
          {visibleLevels.map((lv) => (
            <section key={lv.id}>
              {/* セクションヘッダー */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    {lv.label}:
                  </span>
                  <span className="text-xl text-muted-foreground font-medium">
                    {lv.subtitle}
                  </span>
                </div>
                <span className="ml-auto text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {lv.challenges.length} 問
                </span>
              </div>

              {/* チャレンジカード */}
              <div className="space-y-8">
                {lv.challenges.map((ch, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">
                        #{i + 1}
                      </span>
                      <DifficultyBadge difficulty={ch.difficulty} />
                    </div>
                    <CodingChallenge
                      title={ch.title}
                      description={ch.description}
                      preview={true}
                      initialCode={ch.initialCode}
                      answer={ch.answer}
                      hints={ch.hints}
                      keywords={ch.keywords}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* フィルタ結果が空の場合 */}
          {visibleLevels.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                このレベルのチャレンジはまだ追加されていません。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
