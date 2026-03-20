import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';

export default function CssGrid() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 62</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">CSS Grid 完全ガイド</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          CSS Grid は2次元レイアウトのための強力な仕組みです。行と列を同時に制御できるため、
          複雑なページレイアウトやダッシュボード、カードギャラリーなど、実務で頻出するレイアウトを
          宣言的かつ柔軟に構築できます。
        </p>

        <div className="space-y-12 mt-8">
          {/* ================================================================
              セクション1: Grid の基本概念
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Grid の基本概念</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CSS Grid を理解するには、まず専用の用語を押さえることが重要です。
              これらの用語はプロパティ名やデバッグ時に頻繁に登場します。
            </p>

            <CodeBlock
              language="css"
              title="Grid の主要用語"
              code={`/* Grid Container: display: grid を指定した要素 */
.container {
  display: grid;
}

/* Grid Item: Grid Container の直接の子要素 */
/* Grid Track: 行（row）または列（column）の1本分 */
/* Grid Cell: 行と列が交差する1マス */
/* Grid Area: 1つ以上のセルで構成される矩形領域 */
/* Grid Line: トラックの境界線（番号で参照できる） */

/*
  列番号:  1    2    3    4
           |    |    |    |
  行番号1 ─ ┌────┬────┬────┐
           │ A  │ B  │ C  │  ← 行トラック1
  行番号2 ─ ├────┼────┼────┤
           │ D  │ E  │ F  │  ← 行トラック2
  行番号3 ─ └────┴────┴────┘
           ↑         ↑
       列トラック1  列トラック3
*/`}
            />

            <InfoBox type="info" title="Grid Line の番号">
              <p>
                Grid Line は1から始まります。3列のグリッドには列ラインが4本（1, 2, 3, 4）あります。
                負の番号も使え、-1 は最後のラインを指します。
                この番号はアイテムの配置指定で重要な役割を果たします。
              </p>
            </InfoBox>
          </section>

          {/* ================================================================
              セクション2: grid-template-columns / rows
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">grid-template-columns / rows の全指定方法</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              グリッドのトラックサイズを定義する最も基本的なプロパティです。
              様々な単位や関数を組み合わせて、柔軟なレイアウトを構築できます。
            </p>

            <CodePreview
              language="tsx"
              title="基本的な 3 カラムグリッド（fr 単位）"
              code={`function GridFrDemo() {
  var boxStyle = { background: 'var(--bg-accent)', padding: '16px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontSize: '14px' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px' }}>
      {/* 均等 3 列 */}
      <div>
        <div style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '8px', fontWeight: 600 }}>repeat(3, 1fr) — 均等 3 列</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[1,2,3,4,5,6].map(function(n) { return <div key={n} style={boxStyle}>{n}</div> })}
        </div>
      </div>
      {/* 1:2:1 比率 */}
      <div>
        <div style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '8px', fontWeight: 600 }}>1fr 2fr 1fr — 1:2:1 比率</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '12px' }}>
          <div style={boxStyle}>1fr</div>
          <div style={boxStyle}>2fr</div>
          <div style={boxStyle}>1fr</div>
        </div>
      </div>
      {/* 固定幅 + fr */}
      <div>
        <div style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '8px', fontWeight: 600 }}>120px 1fr — サイドバー + メイン</div>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px' }}>
          <div style={Object.assign({}, boxStyle, { background: 'var(--bg-muted)' })}>Sidebar</div>
          <div style={boxStyle}>Main</div>
        </div>
      </div>
    </div>
  );
}`}
            />

            <div className="mt-4" />

            <CodePreview
              language="tsx"
              title="auto-fill vs auto-fit 比較"
              code={`function AutoFillFitDemo() {
  var boxStyle = { background: 'var(--bg-accent)', padding: '14px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontSize: '13px' };
  var items = [1, 2, 3];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px' }}>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '8px', fontWeight: 600 }}>
          auto-fill — 空トラックがスペースを保持
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', border: '2px dashed var(--border)', padding: '10px', borderRadius: '8px' }}>
          {items.map(function(n) { return <div key={n} style={boxStyle}>Item {n}</div> })}
        </div>
      </div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '8px', fontWeight: 600 }}>
          auto-fit — 空トラックを潰してアイテムが伸びる
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', border: '2px dashed var(--border)', padding: '10px', borderRadius: '8px' }}>
          {items.map(function(n) { return <div key={n} style={boxStyle}>Item {n}</div> })}
        </div>
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text)', opacity: 0.7, padding: '0 4px' }}>
        ※ アイテムが少ない場合の違いに注目。auto-fit はアイテムが残りの空間を埋めます。
      </div>
    </div>
  );
}`}
            />

            <InfoBox type="warning" title="auto-fill と auto-fit の違い">
              <p>
                アイテム数がコンテナを埋め尽くすほど多い場合、両者の挙動は同じです。
                違いが出るのはアイテムが少ない場合です。
              </p>
              <ul className="list-disc pl-4 space-y-1 mt-2">
                <li><strong>auto-fill</strong>: 空のトラックもサイズを保持するため、アイテムは左寄せされたように見える</li>
                <li><strong>auto-fit</strong>: 空のトラックが0幅に潰され、既存アイテムが残り空間を埋めるように伸びる</li>
              </ul>
            </InfoBox>

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="行トラックの定義"
              code={`/* 行の高さも同様に指定可能 */
.grid-rows {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 80px 1fr 60px;
  /* ヘッダー80px、メイン可変、フッター60px */
  height: 100vh;
}`}
            />
          </section>

          {/* ================================================================
              セクション3: grid-template-areas
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">grid-template-areas による視覚的レイアウト定義</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              grid-template-areas を使うと、ASCII アートのような直感的な記法でレイアウトを定義できます。
              コードを見るだけでレイアウト構造が一目で分かるため、チームでの開発でも理解しやすいのが利点です。
            </p>

            <CodePreview
              language="tsx"
              title="grid-template-areas レイアウト"
              code={`function GridAreasDemo() {
  var areaStyle = function(bg, label) {
    return { background: bg, padding: '12px', borderRadius: '6px', color: 'var(--text)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  };
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '100px 1fr 100px',
      gridTemplateRows: '50px 120px 40px',
      gridTemplateAreas: '"header header header" "sidebar content aside" "footer footer footer"',
      gap: '6px',
      padding: '12px',
      height: '240px'
    }}>
      <div style={Object.assign({ gridArea: 'header' }, areaStyle('var(--bg-accent)'))}>Header</div>
      <div style={Object.assign({ gridArea: 'sidebar' }, areaStyle('var(--bg-muted)'))}>Sidebar</div>
      <div style={Object.assign({ gridArea: 'content' }, areaStyle('var(--bg-accent)'))}>Content</div>
      <div style={Object.assign({ gridArea: 'aside' }, areaStyle('var(--bg-muted)'))}>Aside</div>
      <div style={Object.assign({ gridArea: 'footer' }, areaStyle('var(--bg-accent)'))}>Footer</div>
    </div>
  );
}`}
            />

            <InfoBox type="info" title="grid-template-areas のルール">
              <ul className="list-disc pl-4 space-y-1">
                <li>各行は同じ数のセル名を持つ必要がある</li>
                <li>エリアは矩形でなければならない（L字型などは不可）</li>
                <li>ピリオド（.）で空セルを表現できる</li>
                <li>エリア名はクォーテーションで囲んだ文字列の中にスペース区切りで記述する</li>
              </ul>
            </InfoBox>
          </section>

          {/* ================================================================
              セクション4: gap
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">gap, row-gap, column-gap</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              グリッドアイテム間の余白を設定するプロパティです。
              margin を使わずにアイテム間の間隔を統一的に制御できます。
            </p>

            <CodeBlock
              language="css"
              title="gap の使い方"
              code={`/* 行・列ともに同じ間隔 */
.grid-gap-uniform {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* 行と列で異なる間隔 */
.grid-gap-different {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 24px;
  column-gap: 16px;
  /* gap の短縮記法: gap: 24px 16px; (行 列) */
}

/* 注意: gap はアイテム間にのみ適用され、
   コンテナの外側には余白が付かない。
   外側の余白が必要な場合は padding を使う */
.grid-with-padding {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
}`}
            />
          </section>

          {/* ================================================================
              セクション5: 配置プロパティ
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">配置プロパティ（justify / align）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Grid にはアイテムの配置を制御する6つのプロパティがあります。
              コンテナ全体の配置とセル内のアイテム配置を区別することが重要です。
            </p>

            <CodeBlock
              language="css"
              title="セル内でのアイテム配置（items 系）"
              showLineNumbers
              code={`/* justify-items: セル内の水平方向の配置 */
/* align-items: セル内の垂直方向の配置 */
/* place-items: align-items justify-items の短縮形 */

.grid-center-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 各セル内でアイテムを中央配置 */
  place-items: center;
  /* place-items: center center; と同じ */
}

/* 値: start | end | center | stretch（デフォルト） */

.grid-items-example {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  justify-items: start;  /* 各セル内で左寄せ */
  align-items: center;   /* 各セル内で垂直中央 */
}`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="グリッド全体の配置（content 系）"
              showLineNumbers
              code={`/* justify-content: グリッド全体の水平方向の配置 */
/* align-content: グリッド全体の垂直方向の配置 */
/* place-content: align-content justify-content の短縮形 */

/* グリッドがコンテナより小さい場合に効果がある */
.grid-center-content {
  display: grid;
  grid-template-columns: repeat(3, 200px); /* 固定幅 */
  height: 500px;
  /* グリッド全体をコンテナの中央に配置 */
  place-content: center;
}

/* 値: start | end | center | stretch |
       space-between | space-around | space-evenly */

.grid-spread {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  justify-content: space-between;
  /* 列の間にスペースを均等配分 */
}`}
            />

            <InfoBox type="info" title="items と content の違い">
              <p>
                <strong>items 系</strong>はセルの中でアイテムをどう配置するか（ミクロ視点）、
                <strong>content 系</strong>はグリッド全体をコンテナ内でどう配置するか（マクロ視点）を制御します。
                fr 単位を使っている場合、グリッドはコンテナいっぱいに広がるため content 系の効果は現れません。
              </p>
            </InfoBox>
          </section>

          {/* ================================================================
              セクション6: grid-column / grid-row
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">grid-column / grid-row によるアイテム配置</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              個々のアイテムに対して、グリッドライン番号を指定して配置位置を制御できます。
              span キーワードを使えば、複数のトラックにまたがる配置も簡単です。
            </p>

            <CodePreview
              language="tsx"
              title="span によるアイテム配置"
              code={`function GridSpanDemo() {
  var baseStyle = { borderRadius: '8px', padding: '12px', fontSize: '12px', fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '60px', gap: '8px', padding: '16px' }}>
      <div style={Object.assign({}, baseStyle, { gridColumn: 'span 2', background: 'var(--bg-accent)' })}>
        span 2 (横2列)
      </div>
      <div style={Object.assign({}, baseStyle, { gridRow: 'span 2', background: 'var(--bg-muted)' })}>
        span 2 (縦2行)
      </div>
      <div style={Object.assign({}, baseStyle, { background: 'var(--bg-accent)' })}>1x1</div>
      <div style={Object.assign({}, baseStyle, { background: 'var(--bg-accent)' })}>1x1</div>
      <div style={Object.assign({}, baseStyle, { gridColumn: '1 / -1', background: 'var(--bg-muted)' })}>
        grid-column: 1 / -1 (全幅)
      </div>
      <div style={Object.assign({}, baseStyle, { gridColumn: 'span 2', gridRow: 'span 2', background: 'var(--bg-accent)' })}>
        2x2 ブロック
      </div>
      <div style={Object.assign({}, baseStyle, { background: 'var(--bg-muted)' })}>1x1</div>
      <div style={Object.assign({}, baseStyle, { background: 'var(--bg-muted)' })}>1x1</div>
    </div>
  );
}`}
            />

            <InfoBox type="warning" title="grid-area の短縮記法の順序">
              <p>
                grid-area の値の順序は <code>row-start / column-start / row-end / column-end</code> です。
                margin や padding の「上右下左」とは異なる順序なので注意が必要です。
                混乱しやすい場合は、grid-column と grid-row を個別に指定するほうが可読性が高くなります。
              </p>
            </InfoBox>
          </section>

          {/* ================================================================
              セクション7: 暗黙的グリッドと明示的グリッド
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">暗黙的グリッドと明示的グリッド</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              grid-template-columns / rows で定義したトラックは「明示的グリッド」です。
              定義した範囲を超えてアイテムが配置される場合、ブラウザは自動的に「暗黙的グリッド」のトラックを生成します。
            </p>

            <CodeBlock
              language="css"
              title="暗黙的グリッドの制御"
              showLineNumbers
              code={`/* 3列を定義（行は未定義） */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 行は指定なし → アイテム数に応じて暗黙的に行が追加される */

  /* 暗黙的に生成される行の高さを指定 */
  grid-auto-rows: 150px;

  /* minmax と組み合わせると柔軟になる */
  grid-auto-rows: minmax(100px, auto);
  /* 最小100px、コンテンツに応じて自動で伸びる */
}

/* 暗黙的な列の制御（あまり使わないが知っておくと良い） */
.grid-auto-cols {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column; /* アイテムを列方向に配置 */
  grid-auto-columns: 200px;
}

/* grid-auto-flow: アイテムの自動配置方向 */
.grid-dense {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: dense;
  /* 隙間を埋めるように小さいアイテムを前方に詰める */
  /* 注意: 視覚的な順序とDOM順序がずれるため
     アクセシビリティに影響する可能性あり */
}`}
            />

            <InfoBox type="info" title="実務では暗黙的グリッドが活躍する">
              <p>
                カードリストのように、アイテム数が動的に変わるレイアウトでは、
                列だけ定義して行は暗黙的に任せるのが一般的です。
                <code>grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))</code> と
                <code>grid-auto-rows: minmax(100px, auto)</code> の組み合わせは非常によく使います。
              </p>
            </InfoBox>
          </section>

          {/* ================================================================
              セクション8: subgrid
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">subgrid の概念と対応状況</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              subgrid は、ネストされたグリッドが親グリッドのトラック定義を継承できる機能です。
              カードの中身を親グリッドのラインに揃えたい場合などに威力を発揮します。
            </p>

            <CodeBlock
              language="css"
              title="subgrid の使い方"
              showLineNumbers
              code={`/* 親グリッド */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* 各カード: 親の行トラックを継承 */
.card {
  display: grid;
  /* 行方向で親のトラック定義を継承 */
  grid-row: span 3;
  grid-template-rows: subgrid;
  /* これにより、全カードの「タイトル行」「本文行」「ボタン行」の
     高さが揃う */
  gap: 0;
}

.card-title   { /* 1行目: タイトル */ }
.card-body    { /* 2行目: 本文 */ }
.card-actions { /* 3行目: アクション */ }

/* subgrid なしの場合、各カードが独立したグリッドとなり
   カード間でタイトルや本文の高さが揃わない問題が起きる */`}
            />

            <InfoBox type="success" title="subgrid のブラウザ対応">
              <p>
                2024年以降、主要ブラウザ（Chrome 117+, Firefox 71+, Safari 16+, Edge 117+）で
                subgrid がサポートされています。
                Can I Use で最新の対応状況を確認しつつ、実務で積極的に採用できる段階に入っています。
              </p>
            </InfoBox>
          </section>

          {/* ================================================================
              Quiz 1
              ================================================================ */}
          <Quiz
            question="repeat(auto-fill, minmax(200px, 1fr)) と repeat(auto-fit, minmax(200px, 1fr)) の違いとして正しいものはどれですか？"
            options={[
              { label: 'auto-fill はレスポンシブに列数が変わるが、auto-fit は固定列数になる' },
              { label: 'アイテムが少ない場合、auto-fill は空トラックを保持し、auto-fit は空トラックを潰してアイテムを伸ばす', correct: true },
              { label: 'auto-fit は minmax を無視してすべて 1fr として扱う' },
              { label: 'auto-fill はIEでも動作するが、auto-fit はモダンブラウザのみ対応' },
            ]}
            explanation="auto-fill と auto-fit の違いはアイテム数が少ない場合に現れます。auto-fill は空のトラックをそのまま残し、auto-fit は空トラックを0幅に潰すため、既存アイテムが残りの空間を埋めるように伸びます。"
          />

          {/* ================================================================
              セクション9: 実務頻出レイアウト
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実務頻出レイアウト</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここからは、実際のプロジェクトで頻繁に使われる Grid レイアウトパターンを紹介します。
              そのまま使えるコードなので、必要に応じてコピーして活用してください。
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">ダッシュボードグリッド</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              管理画面でよく見る、サイズの異なるウィジェットを配置するレイアウトです。
              grid-template-areas を使うとウィジェットの位置関係が一目瞭然になります。
            </p>

            <CodePreview
              language="tsx"
              title="ダッシュボードレイアウト"
              code={`function DashboardDemo() {
  var widget = function(label, bg) {
    return { background: bg || 'var(--bg-accent)', borderRadius: '8px', padding: '12px', color: 'var(--text)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  };
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: '50px 100px 80px',
      gridTemplateAreas: '"stats1 stats2 stats3 stats4" "chart chart chart activity" "table table recent recent"',
      gap: '8px',
      padding: '12px'
    }}>
      <div style={Object.assign({ gridArea: 'stats1' }, widget())}>Stats 1</div>
      <div style={Object.assign({ gridArea: 'stats2' }, widget())}>Stats 2</div>
      <div style={Object.assign({ gridArea: 'stats3' }, widget())}>Stats 3</div>
      <div style={Object.assign({ gridArea: 'stats4' }, widget())}>Stats 4</div>
      <div style={Object.assign({ gridArea: 'chart' }, widget(null, 'var(--bg-muted)'))}>Chart (3 cols)</div>
      <div style={Object.assign({ gridArea: 'activity' }, widget(null, 'var(--bg-muted)'))}>Activity</div>
      <div style={Object.assign({ gridArea: 'table' }, widget())}>Table (2 cols)</div>
      <div style={Object.assign({ gridArea: 'recent' }, widget())}>Recent (2 cols)</div>
    </div>
  );
}`}
            />

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">レスポンシブカードギャラリー</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              メディアクエリなしでカード数が画面幅に応じて自動調整される、
              最も実用的なグリッドパターンの1つです。
            </p>

            <CodePreview
              language="tsx"
              title="レスポンシブカードギャラリー"
              code={`function CardGalleryDemo() {
  var colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
      gap: '12px',
      padding: '16px'
    }}>
      {colors.map(function(color, i) {
        return (
          <div key={i} style={{ background: 'var(--bg-accent)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ height: '60px', background: color, opacity: 0.8 }} />
            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>Card {i + 1}</div>
              <div style={{ fontSize: '11px', color: 'var(--text)', opacity: 0.6 }}>auto-fill + minmax</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}`}
            />

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">Holy Grail Layout</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ヘッダー、フッター、メインコンテンツ、左右サイドバーを持つ古典的なWebページレイアウトです。
              CSS Grid を使えばシンプルに実装できます。
            </p>

            <CodePreview
              language="tsx"
              title="Holy Grail Layout"
              code={`function HolyGrailDemo() {
  var section = function(bg) {
    return { background: bg, padding: '10px 14px', color: 'var(--text)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  };
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr 90px',
      gridTemplateRows: '40px 1fr 36px',
      gridTemplateAreas: '"header header header" "nav main aside" "footer footer footer"',
      height: '260px',
      gap: '4px',
      padding: '8px',
      background: 'var(--border)',
      borderRadius: '10px'
    }}>
      <div style={Object.assign({ gridArea: 'header', borderRadius: '6px' }, section('var(--bg-accent)'))}>Header</div>
      <div style={Object.assign({ gridArea: 'nav', borderRadius: '6px' }, section('var(--bg-muted)'))}>Nav</div>
      <div style={Object.assign({ gridArea: 'main', borderRadius: '6px' }, section('var(--bg-accent)'))}>Main Content</div>
      <div style={Object.assign({ gridArea: 'aside', borderRadius: '6px' }, section('var(--bg-muted)'))}>Aside</div>
      <div style={Object.assign({ gridArea: 'footer', borderRadius: '6px' }, section('var(--bg-accent)'))}>Footer</div>
    </div>
  );
}`}
            />

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">雑誌風レイアウト</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              メインの大きな記事と小さな記事を組み合わせた、雑誌やニュースサイトでよく見るレイアウトです。
              span を活用してアイテムごとにサイズを変えます。
            </p>

            <CodeBlock
              language="css"
              title="雑誌風レイアウト"
              showLineNumbers
              code={`.magazine {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 16px;
}

/* メイン記事: 大きく表示 */
.article-featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* 横長の記事 */
.article-wide {
  grid-column: span 2;
}

/* 縦長の記事 */
.article-tall {
  grid-row: span 2;
}

/* 通常の記事: 1x1 のまま */
.article-normal {
  /* 特にグリッド配置の指定なし */
}

/* 隙間を自動で埋める */
.magazine-dense {
  grid-auto-flow: dense;
  /* 小さなアイテムが隙間に配置される */
}`}
            />
          </section>

          {/* ================================================================
              CodingChallenge 1
              ================================================================ */}
          <CodingChallenge
            title="レスポンシブカードグリッドを作成しよう"
            description="カードグリッドの ___ を埋めてください。auto-fill と minmax で画面幅に応じて自動的にカード数が変わるレスポンシブグリッドを作ります。"
            preview={true}
            initialCode={`function CardGrid() {
  var items = [1, 2, 3, 4, 5, 6];
  var cardStyle = { background: 'var(--bg-accent)', padding: '20px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontWeight: 600 };
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(___, minmax(100px, ___))', // ← ここを埋める
      gap: '16px',
      padding: '16px'
    }}>
      {items.map(function(n) {
        return <div key={n} style={cardStyle}>Card {n}</div>;
      })}
    </div>
  );
}`}
            answer={`function CardGrid() {
  var items = [1, 2, 3, 4, 5, 6];
  var cardStyle = { background: 'var(--bg-accent)', padding: '20px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)', fontWeight: 600 };
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '16px',
      padding: '16px'
    }}>
      {items.map(function(n) {
        return <div key={n} style={cardStyle}>Card {n}</div>;
      })}
    </div>
  );
}`}
            keywords={['auto-fill', '1fr']}
            hints={[
              'コンテナに収まるだけ列を自動生成するキーワードは auto-fill です',
              '残りの幅をすべて使う単位は 1fr です',
            ]}
          />

          {/* ================================================================
              セクション10: Grid vs Flexbox
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Grid vs Flexbox の判断フローチャート</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Grid と Flexbox はどちらもレイアウトのための仕組みですが、得意な場面が異なります。
              「どちらを使うべきか」を判断するための考え方を整理します。
            </p>

            <CodeBlock
              language="text"
              title="判断フローチャート"
              code={`レイアウトを作りたい
  |
  +-- 1次元（横一列 or 縦一列）？
  |     |
  |     +-- はい → Flexbox を使う
  |     |     例: ナビバー、ボタングループ、タグリスト、
  |     |         カード内のコンテンツ配置
  |     |
  |     +-- いいえ（2次元: 行と列の両方を制御したい）
  |           |
  |           +-- Grid を使う
  |                 例: ページ全体のレイアウト、ダッシュボード、
  |                     カードギャラリー、フォーム
  |
  +-- コンテンツ駆動？ レイアウト駆動？
        |
        +-- コンテンツのサイズに合わせたい → Flexbox
        |     例: テキスト量に応じて幅が変わるタグ
        |
        +-- 決められたレイアウトに当てはめたい → Grid
              例: 12カラムグリッド、固定レイアウト`}
            />

            <div className="mt-4" />

            <CodeBlock
              language="css"
              title="Grid と Flexbox の組み合わせ（実務の典型パターン）"
              showLineNumbers
              code={`/* ページ全体のレイアウト: Grid */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  min-height: 100vh;
}

/* ヘッダー内のナビゲーション: Flexbox */
.header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

/* カードグリッド: Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* カード内のレイアウト: Flexbox */
.card {
  display: flex;
  flex-direction: column;
}
.card-body {
  flex: 1; /* 本文が伸びてフッターを下に押す */
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`}
            />

            <InfoBox type="success" title="Grid と Flexbox は対立しない">
              <p>
                実務では Grid と Flexbox を組み合わせて使うのが一般的です。
                ページ全体のレイアウト（マクロ）には Grid を、コンポーネント内部のレイアウト（ミクロ）には
                Flexbox を使う、という棲み分けが多くのプロジェクトで採用されています。
                「どちらか一方だけ」と考える必要はありません。
              </p>
            </InfoBox>
          </section>

          {/* ================================================================
              Quiz 2
              ================================================================ */}
          <Quiz
            question="次のうち、CSS Grid ではなく Flexbox の使用が適しているケースはどれですか？"
            options={[
              { label: 'ダッシュボードの複数ウィジェットを2次元に配置する' },
              { label: 'ヘッダー内のロゴ、ナビリンク、ユーザーアイコンを横一列に並べる', correct: true },
              { label: 'ページ全体をヘッダー、サイドバー、メイン、フッターに分割する' },
              { label: 'カードギャラリーで画面幅に応じて列数を自動変更する' },
            ]}
            explanation="ヘッダー内の要素を横一列に並べるケースは典型的な1次元レイアウトであり、Flexbox が最適です。justify-content: space-between や align-items: center など、Flexbox のプロパティで直感的に実装できます。"
          />

          {/* ================================================================
              セクション11: よくある落とし穴
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">よくある落とし穴と対処法</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CSS Grid は強力ですが、いくつか直感に反する挙動があります。
              実務でハマりやすいポイントとその解決策を紹介します。
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">1. overflow 問題</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Grid アイテムのコンテンツがセルからはみ出す問題は最もよく遭遇するトラブルの1つです。
            </p>

            <CodeBlock
              language="css"
              title="overflow 問題と解決策"
              showLineNumbers
              code={`/* 問題: 長いテキストや画像がグリッドセルからはみ出す */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.item {
  /* グリッドアイテムのデフォルト min-width は auto
     → コンテンツの最小サイズ以下に縮まない */
}

/* 解決策1: min-width: 0 を設定 */
.item {
  min-width: 0;
  /* これでコンテンツがセル幅に収まるように縮小される */
}

/* 解決策2: overflow: hidden を設定 */
.item {
  overflow: hidden;
}

/* 解決策3: テキストの場合は word-break も併用 */
.item {
  min-width: 0;
  word-break: break-word;
  overflow-wrap: break-word;
}`}
            />

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2. 1fr が期待通りにならないケース</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              1fr は「残り空間の1等分」ですが、コンテンツの最小サイズがそれより大きい場合、
              期待通りに均等にならないことがあります。
            </p>

            <CodeBlock
              language="css"
              title="1fr の落とし穴と minmax(0, 1fr)"
              showLineNumbers
              code={`/* 問題: 2列均等にしたいのに、コンテンツ量によって幅が変わる */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* 1fr = minmax(auto, 1fr) と同等
   → auto が最小サイズ制約となり、コンテンツが長いと均等にならない */

/* 解決策: minmax(0, 1fr) を使う */
.grid-fixed {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  /* 最小サイズが0になるため、確実に均等分割される */
}

/* よくある場面: サイドバー + メインコンテンツ */
.layout {
  display: grid;
  /* メインコンテンツ内に長い URL やコードブロックがある場合 */
  grid-template-columns: 250px minmax(0, 1fr);
  /* minmax(0, 1fr) により、メイン領域が
     コンテンツに引き伸ばされるのを防ぐ */
}`}
            />

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3. その他の注意点</h3>

            <CodeBlock
              language="css"
              title="その他の落とし穴"
              showLineNumbers
              code={`/* 落とし穴: gap が古いブラウザで grid-gap */
.grid {
  gap: 16px;       /* 推奨: 現在の標準 */
  grid-gap: 16px;  /* 旧構文: 古いブラウザ用 */
}

/* 落とし穴: グリッドアイテムの margin collapse が起きない */
/* Flexbox と同様、Grid でも隣接マージンの相殺は発生しない */
.grid-item {
  margin: 16px; /* 隣り合うアイテム間は 32px になる（相殺されない） */
  /* → margin より gap を使うべき理由の1つ */
}

/* 落とし穴: position: absolute との組み合わせ */
.grid {
  display: grid;
  position: relative;
}
.overlay {
  /* position: absolute なアイテムはグリッドレイアウトから外れる */
  position: absolute;
  inset: 0;
  /* グリッドの配置プロパティ（grid-column 等）は無効になる */
}

/* 落とし穴: height: 100% が効かない */
/* Grid アイテムはデフォルトで stretch されるため、
   明示的な height: 100% は不要な場合が多い。
   むしろ align-items や align-self で制御する */`}
            />

            <InfoBox type="warning" title="min-width: 0 を忘れずに">
              <p>
                Grid アイテムの <code>min-width</code> のデフォルト値は <code>auto</code> です。
                これはコンテンツの最小固有サイズ以下に縮まないことを意味します。
                テーブル、画像、長い URL を含む要素がはみ出す場合は、
                まず <code>min-width: 0</code> を試してください。
                これは Grid を使う上で最も頻繁に遭遇する問題です。
              </p>
            </InfoBox>
          </section>

          {/* ================================================================
              CodingChallenge 2
              ================================================================ */}
          <CodingChallenge
            title="grid-template-areas でダッシュボードを作ろう"
            description="ダッシュボードの ___ を埋めてください。gridTemplateAreas でエリア名を定義し、各要素の gridArea で配置先を指定します。"
            preview={true}
            initialCode={`function Dashboard() {
  var area = function(label, bg) {
    return { background: bg, padding: '12px', borderRadius: '6px', color: 'var(--text)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  };
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '100px 1fr 1fr',
      gridTemplateRows: '40px 100px 40px',
      gridTemplateAreas: '"header header header" "nav ___ ___" "footer footer footer"', // ← ここを埋める
      gap: '6px',
      padding: '12px'
    }}>
      <div style={Object.assign({ gridArea: '___' }, area('Header', 'var(--bg-accent)'))}>Header</div>
      <div style={Object.assign({ gridArea: 'nav' }, area('Nav', 'var(--bg-muted)'))}>Nav</div>
      <div style={Object.assign({ gridArea: 'main' }, area('Main', 'var(--bg-accent)'))}>Main</div>
      <div style={Object.assign({ gridArea: '___' }, area('Footer', 'var(--bg-muted)'))}>Footer</div>
    </div>
  );
}`}
            answer={`function Dashboard() {
  var area = function(label, bg) {
    return { background: bg, padding: '12px', borderRadius: '6px', color: 'var(--text)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  };
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '100px 1fr 1fr',
      gridTemplateRows: '40px 100px 40px',
      gridTemplateAreas: '"header header header" "nav main main" "footer footer footer"',
      gap: '6px',
      padding: '12px'
    }}>
      <div style={Object.assign({ gridArea: 'header' }, area('Header', 'var(--bg-accent)'))}>Header</div>
      <div style={Object.assign({ gridArea: 'nav' }, area('Nav', 'var(--bg-muted)'))}>Nav</div>
      <div style={Object.assign({ gridArea: 'main' }, area('Main', 'var(--bg-accent)'))}>Main</div>
      <div style={Object.assign({ gridArea: 'footer' }, area('Footer', 'var(--bg-muted)'))}>Footer</div>
    </div>
  );
}`}
            keywords={['nav main main', "gridArea: 'header'", "gridArea: 'footer'"]}
            hints={[
              '2行目は nav が1列、main が2列を占めるので "nav main main" です',
              '各要素の gridArea はテンプレートで定義したエリア名と一致させます',
            ]}
          />

          {/* ================================================================
              Quiz 3
              ================================================================ */}
          <Quiz
            question="グリッドアイテムのコンテンツ（長い URL など）がセルからはみ出す問題の最も一般的な解決策はどれですか？"
            options={[
              { label: 'grid-template-columns を px 単位に変更する' },
              { label: 'アイテムに min-width: 0 を設定する', correct: true },
              { label: 'コンテナに overflow: scroll を設定する' },
              { label: 'fr 単位の代わりに % を使う' },
            ]}
            explanation="Grid アイテムの min-width のデフォルトは auto（コンテンツの最小固有サイズ）です。min-width: 0 を設定すると、コンテンツがセル幅に収まるように縮小されます。これは Grid で最も頻繁に遭遇する問題とその解決策です。"
          />

          {/* ================================================================
              まとめ
              ================================================================ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CSS Grid はモダンなWebレイアウトの中核となる技術です。
              このページで学んだ内容を振り返りましょう。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">プロパティ / 概念</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">用途</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">実務での頻度</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">grid-template-columns</td>
                    <td className="py-3 px-4">列のトラックサイズ定義</td>
                    <td className="py-3 px-4">非常に高い</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">repeat(auto-fill, minmax())</td>
                    <td className="py-3 px-4">レスポンシブグリッド</td>
                    <td className="py-3 px-4">非常に高い</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">grid-template-areas</td>
                    <td className="py-3 px-4">視覚的なレイアウト定義</td>
                    <td className="py-3 px-4">高い</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">gap</td>
                    <td className="py-3 px-4">アイテム間の余白</td>
                    <td className="py-3 px-4">非常に高い</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">grid-column / grid-row</td>
                    <td className="py-3 px-4">個別アイテムの配置</td>
                    <td className="py-3 px-4">高い</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">place-items / place-content</td>
                    <td className="py-3 px-4">アイテムの整列</td>
                    <td className="py-3 px-4">中程度</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">grid-auto-rows</td>
                    <td className="py-3 px-4">暗黙トラックの制御</td>
                    <td className="py-3 px-4">高い</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium text-foreground">subgrid</td>
                    <td className="py-3 px-4">親グリッドのトラック継承</td>
                    <td className="py-3 px-4">増加中</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-foreground">minmax(0, 1fr)</td>
                    <td className="py-3 px-4">overflow 防止テクニック</td>
                    <td className="py-3 px-4">高い</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="次のステップ">
              <p>
                CSS Grid の基礎を理解したら、実際のプロジェクトで積極的に使ってみましょう。
                ブラウザの DevTools（Firefox の Grid Inspector が特に優秀）でグリッドラインや
                エリアを可視化しながら開発すると、理解が深まります。
                Grid と Flexbox を適材適所で組み合わせることで、
                あらゆるレイアウトを効率的に構築できるようになります。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
