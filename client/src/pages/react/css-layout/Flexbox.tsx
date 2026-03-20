import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';

export default function Flexbox() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 61</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Flexbox 完全ガイド</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          CSS Flexbox は、1次元のレイアウトを柔軟に制御するための仕組みです。
          ヘッダーのナビゲーション配置、カードの横並び、フォームの入力欄の整列など、
          日常的なレイアウトのほとんどを Flexbox で解決できます。
          このページでは基礎から実務の落とし穴まで網羅的に解説します。
        </p>

        <div className="space-y-12 mt-8">
          {/* セクション1: 基本概念 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Flexbox の基本概念</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Flexbox は <strong>Flex Container（親要素）</strong> と <strong>Flex Item（子要素）</strong> の
              2つの役割で成り立ちます。親要素に <code className="bg-muted px-1.5 py-0.5 rounded text-sm">display: flex</code> を
              指定するだけで、子要素は自動的に Flex Item になります。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-foreground mb-3">主軸（Main Axis）と交差軸（Cross Axis）</h3>
              <div className="space-y-2 text-foreground/80 text-sm">
                <p><strong>主軸（Main Axis）</strong> --- Flex Item が並ぶ方向。デフォルトは水平方向（左から右）。</p>
                <p><strong>交差軸（Cross Axis）</strong> --- 主軸に対して垂直な方向。デフォルトは垂直方向（上から下）。</p>
                <p><strong>justify-content</strong> は主軸方向の配置を制御し、<strong>align-items</strong> は交差軸方向の配置を制御します。</p>
              </div>
            </div>

            <CodePreview
              language="tsx"
              title="Flexbox の最小構成"
              code={`function FlexDemo() {
  return (
    <div>
      <p style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '8px' }}>display: flex を指定するだけで子要素が横並びになる</p>
      <div style={{ display: 'flex', gap: '12px', padding: '16px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div style={{ background: 'var(--bg-accent)', padding: '16px 24px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontWeight: 600 }}>Item 1</div>
        <div style={{ background: 'var(--bg-accent)', padding: '16px 24px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontWeight: 600 }}>Item 2</div>
        <div style={{ background: 'var(--bg-accent)', padding: '16px 24px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontWeight: 600 }}>Item 3</div>
      </div>
    </div>
  );
}`}
            />
          </section>

          {/* セクション2: flex-direction / flex-wrap / flex-flow */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. flex-direction / flex-wrap / flex-flow</h2>

            <CodePreview
              language="tsx"
              title="flex-direction の4方向"
              code={`function DirectionDemo() {
  const boxStyle = { background: 'var(--bg-accent)', padding: '8px 16px', borderRadius: '6px', textAlign: 'center', color: 'var(--text)', fontSize: '13px', fontWeight: 600 };
  const labelStyle = { fontSize: '11px', color: 'var(--text)', opacity: 0.6, marginBottom: '4px', fontFamily: 'monospace' };
  const containerStyle = { display: 'flex', gap: '8px', padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px dashed var(--border)' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <div>
        <p style={labelStyle}>row（デフォルト: 左→右）</p>
        <div style={{ ...containerStyle, flexDirection: 'row' }}>
          <div style={boxStyle}>A</div><div style={boxStyle}>B</div><div style={boxStyle}>C</div>
        </div>
      </div>
      <div>
        <p style={labelStyle}>row-reverse（右→左）</p>
        <div style={{ ...containerStyle, flexDirection: 'row-reverse' }}>
          <div style={boxStyle}>A</div><div style={boxStyle}>B</div><div style={boxStyle}>C</div>
        </div>
      </div>
      <div>
        <p style={labelStyle}>column（上→下）</p>
        <div style={{ ...containerStyle, flexDirection: 'column' }}>
          <div style={boxStyle}>A</div><div style={boxStyle}>B</div><div style={boxStyle}>C</div>
        </div>
      </div>
      <div>
        <p style={labelStyle}>column-reverse（下→上）</p>
        <div style={{ ...containerStyle, flexDirection: 'column-reverse' }}>
          <div style={boxStyle}>A</div><div style={boxStyle}>B</div><div style={boxStyle}>C</div>
        </div>
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="column + wrap の注意点">
              <p>
                <code>flex-direction: column</code> と <code>flex-wrap: wrap</code> を組み合わせると、
                縦方向に並べた後に横に折り返しますが、Container に明示的な高さを設定しないと折り返しが発生しません。
                横並びの折り返し（<code>row wrap</code>）の方が直感的で、実務でもよく使われます。
              </p>
            </InfoBox>
          </section>

          {/* セクション3: justify-content / align-items / align-content */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. justify-content / align-items / align-content</h2>

            <CodePreview
              language="tsx"
              title="justify-content（主軸方向の配置）"
              code={`function JustifyContentDemo() {
  const boxStyle = { background: 'var(--bg-accent)', padding: '6px 14px', borderRadius: '6px', textAlign: 'center', color: 'var(--text)', fontSize: '12px', fontWeight: 600 };
  const labelStyle = { fontSize: '11px', color: 'var(--text)', opacity: 0.6, fontFamily: 'monospace', marginBottom: '2px' };
  const rowStyle = { display: 'flex', padding: '8px', background: 'var(--bg)', borderRadius: '6px', border: '1px dashed var(--border)' };

  const values = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {values.map(v => (
        <div key={v}>
          <p style={labelStyle}>{v}</p>
          <div style={{ ...rowStyle, justifyContent: v }}>
            <div style={boxStyle}>A</div>
            <div style={boxStyle}>B</div>
            <div style={boxStyle}>C</div>
          </div>
        </div>
      ))}
    </div>
  );
}`}
            />

            <div className="bg-muted/30 border border-border rounded-lg p-6 my-4">
              <h3 className="font-semibold text-foreground mb-3">space-between vs space-around vs space-evenly</h3>
              <div className="space-y-2 text-foreground/80 text-sm font-mono">
                <p><strong>space-between:</strong> |A----B----C| (両端は端に張り付く)</p>
                <p><strong>space-around:</strong>  |-A---B---C-| (各 Item の左右に同じ余白。端は半分)</p>
                <p><strong>space-evenly:</strong>  |--A--B--C--| (すべての隙間が完全に等しい)</p>
              </div>
            </div>

            <CodePreview
              language="tsx"
              title="align-items（交差軸方向の配置）"
              code={`function AlignItemsDemo() {
  const boxStyle = (h) => ({ background: 'var(--bg-accent)', padding: '6px 14px', borderRadius: '6px', textAlign: 'center', color: 'var(--text)', fontSize: '12px', fontWeight: 600, height: h });
  const labelStyle = { fontSize: '11px', color: 'var(--text)', opacity: 0.6, fontFamily: 'monospace', marginBottom: '2px' };
  const rowStyle = { display: 'flex', gap: '8px', padding: '8px', background: 'var(--bg)', borderRadius: '6px', border: '1px dashed var(--border)', height: '80px' };

  const values = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {values.map(v => (
        <div key={v}>
          <p style={labelStyle}>{v}</p>
          <div style={{ ...rowStyle, alignItems: v }}>
            <div style={boxStyle(v === 'stretch' ? undefined : '30px')}>A</div>
            <div style={boxStyle(v === 'stretch' ? undefined : '45px')}>B</div>
            <div style={boxStyle(v === 'stretch' ? undefined : '25px')}>C</div>
          </div>
        </div>
      ))}
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="よくある組み合わせパターン"
              code={`function CombinationDemo() {
  const boxStyle = { background: 'var(--bg-accent)', padding: '8px 16px', borderRadius: '6px', color: 'var(--text)', fontSize: '12px', fontWeight: 600 };
  const labelStyle = { fontSize: '11px', color: 'var(--text)', opacity: 0.6, fontFamily: 'monospace', marginBottom: '4px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={labelStyle}>完全な中央配置（justify-content: center + align-items: center）</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', background: 'var(--bg)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
          <div style={boxStyle}>中央に配置</div>
        </div>
      </div>
      <div>
        <p style={labelStyle}>ヘッダー: ロゴ左・ナビ右・縦中央（space-between + center）</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '56px', padding: '0 16px', background: 'var(--bg)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
          <div style={{ ...boxStyle, fontWeight: 700 }}>Logo</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: 'var(--text)', fontSize: '13px' }}>About</span>
            <span style={{ color: 'var(--text)', fontSize: '13px' }}>Blog</span>
            <span style={{ color: 'var(--text)', fontSize: '13px' }}>Contact</span>
          </div>
        </div>
      </div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="align-content（複数行の行間配置 / flex-wrap: wrap 時のみ有効）"
              code={`.multi-line {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;    /* 行を先頭に詰める */
  /* center / space-between / stretch（デフォルト）なども指定可能 */
}`}
            />

            <InfoBox type="info" title="align-items と align-content の違い">
              <p>
                <strong>align-items</strong> は各行の中での Item の配置を制御し、
                <strong>align-content</strong> は行そのものの配置を制御します。
                1行しかない場合は align-items だけで十分です。
              </p>
            </InfoBox>
          </section>

          {/* セクション4: flex-grow / flex-shrink / flex-basis */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. flex-grow / flex-shrink / flex-basis</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              この3つは Flex Item のサイズ制御の核です。
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">flex</code> ショートハンドで
              まとめて指定するのが一般的ですが、個別の意味を正確に理解しておくことが重要です。
            </p>

            <CodePreview
              language="tsx"
              title="flex-grow の比率"
              code={`function FlexGrowDemo() {
  const boxStyle = (grow) => ({
    flexGrow: grow,
    background: 'var(--bg-accent)',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    color: 'var(--text)',
    fontSize: '13px',
    fontWeight: 600,
  });
  const labelStyle = { fontSize: '11px', color: 'var(--text)', opacity: 0.6, fontFamily: 'monospace', marginBottom: '4px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <p style={labelStyle}>flex-grow: 0（吸収しない）/ 1（1/3 吸収）/ 2（2/3 吸収）</p>
        <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
          <div style={boxStyle(0)}>grow: 0</div>
          <div style={boxStyle(1)}>grow: 1</div>
          <div style={boxStyle(2)}>grow: 2</div>
        </div>
      </div>
      <div>
        <p style={labelStyle}>flex-shrink: 0 の Item は縮まない</p>
        <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px dashed var(--border)', width: '100%' }}>
          <div style={{ flexShrink: 1, flexBasis: '200px', background: 'var(--bg-accent)', padding: '16px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontSize: '13px', fontWeight: 600 }}>shrink: 1（縮む）</div>
          <div style={{ flexShrink: 1, flexBasis: '200px', background: 'var(--bg-accent)', padding: '16px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontSize: '13px', fontWeight: 600 }}>shrink: 1（縮む）</div>
          <div style={{ flexShrink: 0, flexBasis: '200px', background: 'var(--bg-accent)', padding: '16px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontSize: '13px', fontWeight: 600, border: '2px solid var(--border)' }}>shrink: 0（固定）</div>
        </div>
      </div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="flex ショートハンド（実務ではこれを使う）"
              code={`/* flex: grow shrink basis */
.item { flex: 0 1 auto; }    /* デフォルト: 伸びない・縮む・自動サイズ */
.item { flex: 1; }            /* = flex: 1 1 0% → 均等に伸びる */
.item { flex: auto; }         /* = flex: 1 1 auto → 内容に応じて伸縮 */
.item { flex: none; }         /* = flex: 0 0 auto → 固定サイズ */

/* 実務でよく使うパターン */
.sidebar { flex: 0 0 280px; }       /* 固定幅サイドバー */
.main-content { flex: 1; }          /* 残りの幅をすべて使う */
.equal-columns > * { flex: 1; }     /* 均等幅のカラム */
.card { flex: 1 1 300px; }          /* 最小 300px で均等に伸びる */`}
            />

            <InfoBox type="warning" title="flex-basis: 0 vs auto のよくある誤解">
              <p>
                <code>flex: 1</code>（basis: 0%）はコンテンツ量に関係なく均等幅になります。
                <code>flex: 1 1 auto</code>（basis: auto）はコンテンツの量に応じて幅が変わります。
                「均等幅にしたい」なら <code>flex: 1</code>、
                「コンテンツに応じて伸ばしたい」なら <code>flex: auto</code> を使いましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション5: order / align-self */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. order / align-self</h2>

            <CodeBlock
              language="css"
              title="order と align-self（Item 単体に指定）"
              code={`/* --- order: 表示順序の変更（デフォルトは 0）--- */
/* HTML: A, B, C → 表示: B, C, A */
.item-a { order: 2; }
.item-b { order: 0; }
.item-c { order: 1; }

/* レスポンシブでの使い所 */
@media (max-width: 768px) {
  .sidebar { order: 2; }       /* サイドバーを下に移動 */
  .main-content { order: 1; }  /* メインを先に表示 */
}

/* --- align-self: 個別の Item だけ交差軸の配置を変更 --- */
.container {
  display: flex;
  align-items: center;  /* 全体は中央揃え */
  height: 200px;
}
.special { align-self: flex-end; }  /* この Item だけ下揃え */

/* 定番テクニック: margin-top: auto でフッターを最下部に固定 */
.card { display: flex; flex-direction: column; }
.card-footer { margin-top: auto; }  /* 縦方向の余白を吸収 */`}
            />

            <InfoBox type="info" title="margin: auto の特別な振る舞い">
              <p>
                Flexbox 内では <code>margin: auto</code> が余白を吸収します。
                <code>margin-left: auto</code> で右寄せ、<code>margin-top: auto</code> で最下部配置。
                カード内のフッターを最下部に固定する定番パターンです。
              </p>
            </InfoBox>
          </section>

          {/* セクション6: gap */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. gap プロパティ</h2>

            <CodeBlock
              language="css"
              title="gap vs margin による隙間"
              code={`/* gap: Item 間の隙間を指定（モダンな方法） */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;             /* 行間・列間ともに 16px */
  /* gap: 24px 16px; */  /* 行間 24px、列間 16px と個別指定も可能 */
}
/* メリット: Item 間だけにスペースが入る（最初と最後にはつかない） */

/* --- 旧来の margin 方式（参考）--- */
.container-old {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;  /* ネガティブマージンで外側を相殺 */
}
.container-old > .item {
  margin: 8px;   /* 最初・最後にも margin がつく問題がある */
}`}
            />

            <InfoBox type="success" title="gap は全モダンブラウザ対応済み">
              <p>
                Flexbox の gap は Chrome 84+、Firefox 63+、Safari 14.1+、Edge 84+ でサポートされています。
                古い記事では margin による方法が紹介されていることがありますが、
                2025年現在は gap を使いましょう。
              </p>
            </InfoBox>
          </section>

          {/* セクション7: 実務頻出レイアウト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. 実務頻出レイアウトパターン</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">パターン1: ヘッダー（ロゴ + ナビ + アクション）</h3>
            <CodePreview
              language="tsx"
              title="ヘッダーレイアウト"
              code={`function HeaderLayout() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: '64px',
      background: 'var(--bg)',
      borderRadius: '8px',
      border: '1px solid var(--border)',
    }}>
      <div style={{ flexShrink: 0, fontWeight: 700, fontSize: '18px', color: 'var(--text)' }}>MyApp</div>
      <nav style={{ display: 'flex', gap: '24px' }}>
        <a style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px' }}>Home</a>
        <a style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px' }}>About</a>
        <a style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px' }}>Blog</a>
      </nav>
      <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
        <button style={{ padding: '6px 16px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: '13px' }}>Login</button>
        <button style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: 'var(--bg-accent)', color: 'var(--text)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Sign Up</button>
      </div>
    </div>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">パターン2: カードの横並び均等配置</h3>
            <CodePreview
              language="tsx"
              title="カードグリッド（Flexbox 版）"
              code={`function CardGridDemo() {
  const cardStyle = {
    flex: '1 1 140px',
    maxWidth: '200px',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} style={cardStyle}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-accent)', margin: '0 auto 8px' }} />
          <p style={{ color: 'var(--text)', fontWeight: 600, fontSize: '14px', margin: '0 0 4px' }}>Card {i}</p>
          <p style={{ color: 'var(--text)', opacity: 0.6, fontSize: '12px', margin: 0 }}>flex: 1 1 140px</p>
        </div>
      ))}
    </div>
  );
}`}
            />

            <InfoBox type="info" title="カードの均等配置は Grid の方が適切な場合も">
              <p>
                <code>grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))</code> の方がシンプルで、
                最終行の問題も発生しません。「Item 幅を柔軟に変えたい」なら Flexbox、
                「固定カラム数や均等幅が欲しい」なら Grid を検討しましょう。
              </p>
            </InfoBox>

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">パターン3: Sticky フッター</h3>
            <CodeBlock
              language="css"
              title="コンテンツが少なくてもフッターが最下部に来る"
              code={`.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page-header { flex-shrink: 0; }
.page-main   { flex: 1; }         /* 余白をすべて吸収 */
.page-footer { flex-shrink: 0; }`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">パターン4: サイドバー + メインコンテンツ</h3>
            <CodePreview
              language="tsx"
              title="サイドバーレイアウト"
              code={`function SidebarLayout() {
  return (
    <div style={{ display: 'flex', height: '200px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <aside style={{ flex: '0 0 160px', background: 'var(--bg-accent)', padding: '16px', borderRight: '1px solid var(--border)' }}>
        <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '12px' }}>Sidebar</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Dashboard', 'Settings', 'Profile'].map(item => (
            <div key={item} style={{ padding: '6px 10px', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)', fontSize: '12px' }}>{item}</div>
          ))}
        </div>
        <p style={{ fontSize: '10px', color: 'var(--text)', opacity: 0.5, marginTop: '8px', fontFamily: 'monospace' }}>flex: 0 0 160px</p>
      </aside>
      <main style={{ flex: 1, minWidth: 0, padding: '16px', background: 'var(--bg)' }}>
        <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '8px' }}>Main Content</p>
        <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '12px', lineHeight: 1.6 }}>flex: 1 で残りの幅をすべて使う。min-width: 0 で長いテキストのはみ出しを防止。</p>
        <p style={{ fontSize: '10px', color: 'var(--text)', opacity: 0.5, marginTop: '8px', fontFamily: 'monospace' }}>flex: 1; min-width: 0;</p>
      </main>
    </div>
  );
}`}
            />
          </section>

          {/* セクション8: よくある落とし穴 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Flexbox のよくある落とし穴</h2>

            <h3 className="text-lg font-semibold text-foreground mb-3">落とし穴1: min-width: 0 問題と text-overflow</h3>
            <CodeBlock
              language="css"
              title="テキストがはみ出す / 省略記号が効かない問題"
              code={`/* Flex Item のデフォルト min-width は auto */
/* = コンテンツの最小幅より小さくならない */
/* → overflow: hidden や text-overflow: ellipsis が効かない */

/* NG: min-width: 0 がない */
.flex-item-ng {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* → テキストがコンテナからはみ出す！ */
}

/* OK: min-width: 0 を追加 */
.flex-item-ok {
  flex: 1;
  min-width: 0;             /* これが鍵 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">落とし穴2: flex: 1 vs flex: 1 1 auto</h3>
            <CodeBlock
              language="css"
              title="basis の値でレイアウトが変わる"
              code={`/* Item A: 短いテキスト、Item B: 長いテキスト */

/* flex: 1 (= flex: 1 1 0%) → 完全に均等幅 */
/* basis が 0 なので、コンテンツ量は無視される */

/* flex: 1 1 auto → コンテンツに応じた幅 */
/* テキストが長い B の方が広くなる */

/* 判断基準:
   - 均等分割 → flex: 1 (basis: 0)
   - コンテンツに応じた分配 → flex: 1 1 auto
*/`}
            />

            <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">落とし穴3: IE11 の Flexbox バグ（歴史的文脈）</h3>
            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                IE11 は Flexbox をサポートしていましたが、多くのバグがありました。
                2025年現在 IE11 サポートはほぼ不要ですが、レガシーコードの理解に役立ちます。
              </p>
              <ul className="space-y-1 text-foreground/80 text-sm">
                <li><strong>flex ショートハンドのバグ:</strong> <code className="bg-muted px-1 rounded">flex: 1</code> の解釈が異なり、個別指定が必要だった</li>
                <li><strong>min-height の無視:</strong> Flex Container の min-height が効かないバグ</li>
                <li><strong>align-items: center の縦はみ出し:</strong> Item がコンテナの上にはみ出す</li>
              </ul>
            </div>

            <InfoBox type="info" title="IE11 時代のワークアラウンドに出会ったら">
              <p>
                古いコードで <code>flex: 1 0 auto</code> のような冗長な指定を見つけたら、
                IE11 対応のワークアラウンドの可能性があります。
                IE11 非対応のプロジェクトでは <code>flex: 1</code> にシンプル化して問題ありません。
              </p>
            </InfoBox>
          </section>

          {/* セクション9: Flexbox vs Grid */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Flexbox vs Grid の判断基準</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-3 py-3 text-left font-semibold">観点</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">Flexbox</th>
                    <th className="border border-border px-3 py-3 text-left font-semibold">Grid</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">次元</td>
                    <td className="border border-border px-3 py-2">1次元（行 or 列）</td>
                    <td className="border border-border px-3 py-2">2次元（行 and 列）</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">レイアウトの起点</td>
                    <td className="border border-border px-3 py-2">コンテンツ起点（内から外へ）</td>
                    <td className="border border-border px-3 py-2">レイアウト起点（外から内へ）</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 font-medium">得意なこと</td>
                    <td className="border border-border px-3 py-2">要素の配置・整列・分配</td>
                    <td className="border border-border px-3 py-2">ページ全体の構造定義</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border border-border px-3 py-2 font-medium">適したユースケース</td>
                    <td className="border border-border px-3 py-2">ナビバー、ボタングループ、タグリスト</td>
                    <td className="border border-border px-3 py-2">ダッシュボード、カード一覧、フォーム</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              language="css"
              title="組み合わせの実例: Grid で大枠、Flexbox で中身"
              code={`/* Grid: ダッシュボード全体 */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 64px 1fr;
  min-height: 100vh;
}

/* Flexbox: ヘッダー内部の配置 */
.dashboard-header {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}`}
            />

            <InfoBox type="success" title="迷ったときのルール">
              <p>
                「1行（または1列）で並べるだけなら Flexbox、行と列の両方を制御するなら Grid」。
                1つのページで両方を併用するのが一般的です。
                Grid でページ構造を定義し、各セクション内部は Flexbox で制御する組み合わせが最も実践的です。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Flex Container 内で、特定の Item だけを交差軸方向の末尾に配置したい場合、どのプロパティを使いますか？"
              options={[
                { label: 'justify-self: flex-end' },
                { label: 'align-self: flex-end', correct: true },
                { label: 'align-items: flex-end' },
                { label: 'order: -1' },
              ]}
              explanation="align-self は個々の Flex Item に対して交差軸方向の配置を上書きするプロパティです。align-items は Container 全体の設定であり、個別の Item の上書きには使えません。justify-self は Flexbox では無効です（Grid では有効）。order は表示順序を変更するだけで配置方向は変わりません。"
            />
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="Flex Item 内のテキストに text-overflow: ellipsis が効かない場合、まず確認すべきプロパティはどれですか？"
              options={[
                { label: 'flex-direction が column になっていないか' },
                { label: 'flex-wrap が nowrap になっていないか' },
                { label: 'min-width: 0 が設定されているか', correct: true },
                { label: 'flex-grow が 0 になっていないか' },
              ]}
              explanation="Flex Item のデフォルトの min-width は auto で、コンテンツの最小幅より小さくなりません。そのため overflow: hidden が効かず、text-overflow: ellipsis も機能しません。min-width: 0 を明示して Item がコンテンツ幅より小さくなることを許可する必要があります。"
            />
          </section>

          {/* CodingChallenge 1 */}
          <section>
            <CodingChallenge
              title="ヘッダーレイアウトを Flexbox で作る"
              description="ヘッダーの ___ を埋めてください。Flexbox で横並び・中央揃え・両端配置のレイアウトを作ります。"
              preview={true}
              initialCode={`function Header() {
  return (
    <div style={{
      display: '___', // ← ここを埋める（レイアウトモード）
      alignItems: '___', // ← ここを埋める（交差軸の配置）
      justifyContent: '___', // ← ここを埋める（主軸の配置）
      height: '64px',
      padding: '0 24px',
      gap: '16px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
    }}>
      <div style={{ fontWeight: 700, color: 'var(--text)' }}>Logo</div>
      <nav style={{ display: 'flex', gap: '16px' }}>
        <span style={{ color: 'var(--text)', fontSize: '14px' }}>Home</span>
        <span style={{ color: 'var(--text)', fontSize: '14px' }}>About</span>
      </nav>
      <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-accent)', color: 'var(--text)' }}>Login</button>
    </div>
  );
}`}
              answer={`function Header() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      padding: '0 24px',
      gap: '16px',
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
    }}>
      <div style={{ fontWeight: 700, color: 'var(--text)' }}>Logo</div>
      <nav style={{ display: 'flex', gap: '16px' }}>
        <span style={{ color: 'var(--text)', fontSize: '14px' }}>Home</span>
        <span style={{ color: 'var(--text)', fontSize: '14px' }}>About</span>
      </nav>
      <button style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-accent)', color: 'var(--text)' }}>Login</button>
    </div>
  );
}`}
              keywords={["'flex'", "'center'", "'space-between'"]}
              hints={[
                '子要素を横並びにするレイアウトモードは flex です',
                '交差軸の中央揃えは center です',
                '両端に配置する値は space-between です',
              ]}
            />
          </section>

          {/* CodingChallenge 2 */}
          <section>
            <CodingChallenge
              title="サイドバー + メインの2カラムレイアウト"
              description="2カラムレイアウトの ___ を埋めてください。sidebar は固定幅、main は残りの幅を使います。"
              preview={true}
              initialCode={`function TwoColumn() {
  return (
    <div style={{
      display: 'flex',
      height: '180px',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <aside style={{
        flex: '___', // ← ここを埋める（伸びない・縮まない・150px固定）
        background: 'var(--bg-accent)',
        padding: '16px',
        borderRight: '1px solid var(--border)',
      }}>
        <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '14px' }}>Sidebar</p>
      </aside>
      <main style={{
        flex: ___, // ← ここを埋める（残りの幅をすべて使う）
        minWidth: 0,
        background: 'var(--bg)',
        padding: '16px',
      }}>
        <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '14px' }}>Main Content</p>
        <p style={{ color: 'var(--text)', opacity: 0.6, fontSize: '12px' }}>残りの幅をすべて使うエリア</p>
      </main>
    </div>
  );
}`}
              answer={`function TwoColumn() {
  return (
    <div style={{
      display: 'flex',
      height: '180px',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <aside style={{
        flex: '0 0 150px',
        background: 'var(--bg-accent)',
        padding: '16px',
        borderRight: '1px solid var(--border)',
      }}>
        <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '14px' }}>Sidebar</p>
      </aside>
      <main style={{
        flex: 1,
        minWidth: 0,
        background: 'var(--bg)',
        padding: '16px',
      }}>
        <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '14px' }}>Main Content</p>
        <p style={{ color: 'var(--text)', opacity: 0.6, fontSize: '12px' }}>残りの幅をすべて使うエリア</p>
      </main>
    </div>
  );
}`}
              keywords={["'0 0 150px'", 'flex: 1']}
              hints={[
                'flex: "0 0 150px" は grow(0) shrink(0) basis(150px) の短縮形です',
                'flex: 1 で残りの余白をすべて使います',
              ]}
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-3">Flexbox 早見表</h3>
              <div className="space-y-3 text-foreground/80 text-sm">
                <div>
                  <strong className="text-foreground">Container プロパティ（親に指定）:</strong>
                  <p className="ml-4 mt-1">display: flex / flex-direction / flex-wrap / justify-content / align-items / align-content / gap</p>
                </div>
                <div>
                  <strong className="text-foreground">Item プロパティ（子に指定）:</strong>
                  <p className="ml-4 mt-1">flex (grow, shrink, basis) / order / align-self</p>
                </div>
                <div>
                  <strong className="text-foreground">頻出パターン:</strong>
                  <p className="ml-4 mt-1">
                    中央配置 = justify-content: center + align-items: center /
                    両端揃え = space-between /
                    固定+可変 = flex: 0 0 Npx + flex: 1 /
                    Sticky フッター = column + flex: 1
                  </p>
                </div>
                <div>
                  <strong className="text-foreground">落とし穴:</strong>
                  <p className="ml-4 mt-1">
                    テキストはみ出し → min-width: 0 /
                    flex: 1 と flex: auto → basis が 0% か auto か
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="success" title="次のステップ">
              <p>
                Flexbox は Web レイアウトの基盤です。
                ヘッダー、フッター、サイドバー、カードの配置など日常的なレイアウトをカバーできます。
                2次元の制御が必要になったら CSS Grid と組み合わせましょう。
                実際のプロジェクトでは Flexbox と Grid を適材適所で使い分けることが大切です。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
