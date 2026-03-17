import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import CodingChallenge from '@/components/CodingChallenge';
import ReferenceLinks from '@/components/ReferenceLinks';
import Faq from '@/components/Faq';

export default function TableDesign() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 67</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Table 設計の全課題</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          テーブルは最も古くからある HTML 要素のひとつですが、
          正しく設計するのは驚くほど難しいコンポーネントです。
          セマンティクス、アクセシビリティ、レスポンシブ対応、テキストの溢れ、
          横スクロール、操作 UI まで、テーブル設計で直面するすべての課題と解決策を網羅します。
        </p>

        <WhyNowBox tags={['table', 'アクセシビリティ', 'レスポンシブ', 'overflow', 'scope', 'caption']}>
          <p>
            管理画面、ダッシュボード、データ一覧など、テーブルは実務で頻繁に登場します。
            しかし「とりあえず div で組む」「ellipsis で切り詰める」「入れ子テーブルで階層を表現する」
            といった安易な実装は、アクセシビリティの崩壊やレスポンシブ不可の原因になります。
            ここでテーブル設計の全体像を把握し、どんなデータにも対応できる方法を確認します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ======================================== */}
          {/* セクション1: テーブルの正しい HTML 構造 */}
          {/* ======================================== */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. テーブルの正しい HTML 構造</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テーブルの HTML にはセマンティクスを表現するための要素が豊富に用意されています。
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">div</code> と
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">span</code> でテーブルを
              自作するのは、スクリーンリーダーがデータの構造を理解できなくなるため避けてください。
            </p>

            <CodeBlock
              language="html"
              title="正しいテーブル構造の全要素"
              showLineNumbers
              code={`<table>
  <!-- caption: テーブルの目的を説明する（スクリーンリーダーが最初に読む） -->
  <caption>2024年度 四半期売上レポート</caption>

  <!-- thead: ヘッダー行のグループ -->
  <thead>
    <tr>
      <th scope="col">四半期</th>
      <th scope="col">売上高</th>
      <th scope="col">前年比</th>
      <th scope="col">達成率</th>
    </tr>
  </thead>

  <!-- tbody: データ行のグループ -->
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>1,200万円</td>
      <td>+12%</td>
      <td>98%</td>
    </tr>
    <tr>
      <th scope="row">Q2</th>
      <td>1,450万円</td>
      <td>+8%</td>
      <td>105%</td>
    </tr>
  </tbody>

  <!-- tfoot: フッター行のグループ（合計、集計など） -->
  <tfoot>
    <tr>
      <th scope="row">合計</th>
      <td>2,650万円</td>
      <td>+10%</td>
      <td>101%</td>
    </tr>
  </tfoot>
</table>`}
            />

            <CodePreview
              code={`function TableDemo() {
  return (
    <div style={{ padding: '16px', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <caption style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>2024年度 四半期売上レポート</caption>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th scope="col" style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text)', fontWeight: 600 }}>四半期</th>
            <th scope="col" style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--text)', fontWeight: 600 }}>売上高</th>
            <th scope="col" style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--text)', fontWeight: 600 }}>前年比</th>
            <th scope="col" style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--text)', fontWeight: 600 }}>達成率</th>
          </tr>
        </thead>
        <tbody>
          {[
            { q: 'Q1', sales: '1,200万円', yoy: '+12%', rate: '98%', color: '#ef4444' },
            { q: 'Q2', sales: '1,450万円', yoy: '+8%', rate: '105%', color: '#22c55e' },
            { q: 'Q3', sales: '1,100万円', yoy: '-3%', rate: '92%', color: '#ef4444' },
            { q: 'Q4', sales: '1,600万円', yoy: '+15%', rate: '110%', color: '#22c55e' },
          ].map((d, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <th scope="row" style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text)', fontWeight: 500 }}>{d.q}</th>
              <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--text)' }}>{d.sales}</td>
              <td style={{ textAlign: 'right', padding: '10px 12px', color: d.yoy.startsWith('+') ? '#22c55e' : '#ef4444' }}>{d.yoy}</td>
              <td style={{ textAlign: 'right', padding: '10px 12px' }}>
                <span style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', background: parseInt(d.rate) >= 100 ? 'var(--bg-success, #dcfce7)' : 'var(--bg-warning, #fef3c7)', color: parseInt(d.rate) >= 100 ? 'var(--text-success, #166534)' : 'var(--text-warning, #92400e)' }}>{d.rate}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: '2px solid var(--border)', fontWeight: 'bold' }}>
            <th scope="row" style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text)' }}>合計</th>
            <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--text)' }}>5,350万円</td>
            <td style={{ textAlign: 'right', padding: '10px 12px', color: '#22c55e' }}>+8%</td>
            <td style={{ textAlign: 'right', padding: '10px 12px', color: 'var(--text)' }}>101%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}`}
              language="tsx"
              title="アクセシブルなテーブル構造（caption, scope, thead/tbody/tfoot）"
            />

            <div className="bg-muted/30 border border-border rounded-lg p-6 my-4">
              <h3 className="font-semibold text-foreground mb-3">各要素の役割</h3>
              <div className="space-y-2 text-foreground/80 text-sm">
                <p><strong>caption</strong> -- テーブルの説明。画面には表示されなくても支援技術がテーブルの目的を伝える</p>
                <p><strong>thead / tbody / tfoot</strong> -- 行の論理グループ。CSS でのスタイリングや印刷時のヘッダー繰り返しに使われる</p>
                <p><strong>th</strong> -- ヘッダーセル。scope 属性で「列のヘッダー」か「行のヘッダー」かを明示する</p>
                <p><strong>td</strong> -- データセル</p>
                <p><strong>scope="col"</strong> -- この th は列方向のヘッダーであることを示す</p>
                <p><strong>scope="row"</strong> -- この th は行方向のヘッダーであることを示す</p>
              </div>
            </div>

            <InfoBox type="warning" title="div でテーブルを作らない">
              <p>
                <code>display: grid</code> や <code>display: flex</code> でテーブル風の見た目を作ることは
                技術的に可能ですが、スクリーンリーダーは「これがテーブルである」ことを認識できません。
                データの行列関係を表現するコンテンツには、必ず <code>table</code> 要素を使用してください。
                CSS Grid で自由なレイアウトを作りたい場合でも、<code>role="table"</code>、
                <code>role="row"</code>、<code>role="cell"</code> などの ARIA ロールを付与する方法がありますが、
                ネイティブ HTML 要素が使えるなら ARIA よりもネイティブ要素を優先するのが原則です。
              </p>
            </InfoBox>

            <CodeBlock
              language="html"
              title="悪い例: div で作ったテーブル"
              code={`<!-- 悪い例: 見た目はテーブルだが、支援技術はテーブルとして認識しない -->
<div class="table">
  <div class="table-header">
    <div class="table-cell">名前</div>
    <div class="table-cell">メール</div>
  </div>
  <div class="table-row">
    <div class="table-cell">田中太郎</div>
    <div class="table-cell">tanaka@example.com</div>
  </div>
</div>

<!-- 良い例: セマンティックな HTML テーブル -->
<table>
  <thead>
    <tr>
      <th scope="col">名前</th>
      <th scope="col">メール</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>田中太郎</td>
      <td>tanaka@example.com</td>
    </tr>
  </tbody>
</table>`}
            />
          </section>

          {/* ======================================== */}
          {/* セクション2: セル内の大量テキスト問題 */}
          {/* ======================================== */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. セル内の大量テキスト問題</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テーブルのセルに長いテキストが入ると、レイアウトが崩れます。
              多くの開発者が最初に手を伸ばすのが <code className="bg-muted px-1.5 py-0.5 rounded text-sm">text-overflow: ellipsis</code> ですが、
              これは万能な解決策ではありません。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">text-overflow: ellipsis を安易に多用すべきでない理由</h3>

            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-4">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-3">ellipsis の問題点</h4>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-400">
                <li><strong>情報の損失:</strong> ユーザーは切り詰められた部分を読むことができない。「東京都港区...」の先が住所の重要な部分かもしれない</li>
                <li><strong>識別不能:</strong> 類似したデータが同じ切り詰め位置で切れると、どれがどれか区別できなくなる</li>
                <li><strong>アクセシビリティ:</strong> スクリーンリーダーは CSS の ellipsis を無視し全文を読み上げるが、視覚的なユーザーは全文を確認できない</li>
                <li><strong>検索・コピーの妨げ:</strong> ユーザーがセルのテキストをコピーしようとしても、表示上は切り詰められた状態</li>
              </ul>
            </div>

            <CodePreview
              code={`function TextOverflowDemo() {
  const data = [
    { id: 'EMP-001', name: '田中太郎', address: '東京都港区六本木1-2-3 六本木ヒルズ森タワー 42階 株式会社サンプル開発部' },
    { id: 'EMP-002', name: '鈴木花子', address: '大阪府大阪市北区梅田3-1-1 大阪ステーションシティ サウスゲートビルディング 15階' },
    { id: 'EMP-003', name: '佐藤次郎', address: '神奈川県横浜市西区みなとみらい2-3-5 クイーンズタワーC棟 8階 マーケティング室' },
  ];
  return (
    <div style={{ padding: '16px' }}>
      <p style={{ fontSize: '13px', color: 'var(--text-muted, #64748b)', marginBottom: '12px', fontWeight: 600 }}>ellipsis で切り詰め（情報が失われる）</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', tableLayout: 'fixed', marginBottom: '24px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th style={{ width: '70px', textAlign: 'left', padding: '8px', color: 'var(--text)', fontWeight: 600 }}>ID</th>
            <th style={{ width: '80px', textAlign: 'left', padding: '8px', color: 'var(--text)', fontWeight: 600 }}>名前</th>
            <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text)', fontWeight: 600 }}>住所</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px', color: 'var(--text-muted, #64748b)', whiteSpace: 'nowrap' }}>{d.id}</td>
              <td style={{ padding: '8px', color: 'var(--text)' }}>{d.name}</td>
              <td style={{ padding: '8px', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: '13px', color: 'var(--text-muted, #64748b)', marginBottom: '12px', fontWeight: 600 }}>折り返し表示（全文が読める）</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', tableLayout: 'fixed' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th style={{ width: '70px', textAlign: 'left', padding: '8px', color: 'var(--text)', fontWeight: 600 }}>ID</th>
            <th style={{ width: '80px', textAlign: 'left', padding: '8px', color: 'var(--text)', fontWeight: 600 }}>名前</th>
            <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text)', fontWeight: 600 }}>住所</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px', color: 'var(--text-muted, #64748b)', whiteSpace: 'nowrap' }}>{d.id}</td>
              <td style={{ padding: '8px', color: 'var(--text)' }}>{d.name}</td>
              <td style={{ padding: '8px', color: 'var(--text)', whiteSpace: 'normal', overflowWrap: 'break-word' }}>{d.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`}
              language="tsx"
              title="ellipsis vs 折り返し: テキスト溢れの比較"
            />

            <CodeBlock
              language="css"
              title="ellipsis の典型的な実装（使いどころを慎重に選ぶべき）"
              code={`/* 1行に切り詰め */
.cell-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;  /* 必ず幅の制限が必要 */
}

/* 複数行で切り詰め（-webkit-line-clamp） */
.cell-line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* text-overflow: ellipsis は不要（line-clamp が自動で付ける） */
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ellipsis の代替アプローチ</h3>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">1. ツールチップ（ellipsis + ホバーで全文表示）</h4>
                <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                  ellipsis を使う場合は、必ず title 属性やカスタムツールチップで全文を確認できるようにします。
                  ただし、モバイルではホバーが使えないため、タッチデバイスへの配慮が必要です。
                </p>
                <CodeBlock
                  language="tsx"
                  title="ツールチップ付き ellipsis セル"
                  code={`function EllipsisCell({ text, maxWidth = 200 }: {
  text: string;
  maxWidth?: number;
}) {
  return (
    <td
      title={text}  // ネイティブツールチップ（最低限の対応）
      style={{
        maxWidth,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {text}
    </td>
  );
}`}
                />
              </div>

              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">2. 展開表示（クリックで全文を表示）</h4>
                <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                  行をクリックまたは「もっと見る」ボタンで全文を展開するパターンです。
                  モバイルでも使えるため、ツールチップより汎用的です。
                </p>
                <CodeBlock
                  language="tsx"
                  title="展開可能なセル"
                  code={`function ExpandableCell({ text, previewLength = 50 }: {
  text: string;
  previewLength?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = text.length > previewLength;

  return (
    <td>
      <span>{expanded ? text : text.slice(0, previewLength)}</span>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-xs ml-1 underline"
        >
          {expanded ? '閉じる' : '...もっと見る'}
        </button>
      )}
    </td>
  );
}`}
                />
              </div>

              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">3. セル内折り返し（white-space: normal）</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  テキストが重要で切り詰めが許容されない場合は、セル内で折り返すのが最もシンプルな解決策です。
                  行の高さが不揃いになりますが、全文が表示される確実な方法です。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">4. 詳細リンク（別ページ / モーダルへ遷移）</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  テーブルにはキーとなる情報だけを表示し、全文は詳細ページやモーダルで確認させるパターンです。
                  データ量が多い管理画面では最も実用的なアプローチです。
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">white-space の判断基準</h3>

            <CodeBlock
              language="css"
              title="white-space プロパティの比較"
              code={`/* nowrap: 折り返しなし。ellipsis と組み合わせる場合に使う */
/* 用途: ID、日付、ステータスなど短いデータが確実なカラム */
.cell-nowrap {
  white-space: nowrap;
}

/* normal: 通常の折り返し（デフォルト）。単語の区切りで改行 */
/* 用途: 説明文、住所、コメントなど長いテキストを表示するカラム */
.cell-normal {
  white-space: normal;
}

/* break-spaces / pre-wrap: 連続する空白も保持して折り返す */
/* 用途: コードやフォーマット済みテキストを表示する場合 */
.cell-prewrap {
  white-space: pre-wrap;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">word-break: break-all の危険性</h3>

            <InfoBox type="warning" title="word-break: break-all は日本語で問題を起こす">
              <p>
                <code>word-break: break-all</code> はすべての文字位置で改行を許可します。
                英語のテキストでは長い URL やハッシュ値を折り返すのに有効ですが、
                日本語のテキストでは元々任意の位置で改行されるため、
                助詞の直前で改行されるなど可読性が低下するケースがあります。
                日本語コンテンツが含まれるテーブルでは <code>overflow-wrap: break-word</code>
                を使う方が安全です。これは単語がセル幅を超える場合にのみ折り返しを行います。
              </p>
            </InfoBox>

            <CodeBlock
              language="css"
              title="break-all vs break-word の違い"
              code={`/* 危険: すべての文字間で改行を許可 */
.cell-break-all {
  word-break: break-all;
  /* "東京都港区六本木" が "東京都港" + "区六本木" のように
     意味のない位置で分割される可能性がある */
}

/* 安全: 単語がはみ出す場合にのみ折り返す */
.cell-break-word {
  overflow-wrap: break-word;
  /* 長い URL やメールアドレスがセルからはみ出す場合に折り返す
     通常の日本語テキストには影響しない */
}

/* 推奨: テーブルセルの汎用設定 */
.table-cell-text {
  white-space: normal;
  overflow-wrap: break-word;
  min-width: 100px;   /* セルが極端に狭くならないようにする */
}`}
            />
          </section>

          {/* ======================================== */}
          {/* セクション3: テーブルの横スクロール */}
          {/* ======================================== */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. テーブルの横スクロール</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              カラム数が多いテーブルは、狭いビューポートに収まりきらないことがあります。
              横スクロールはこの問題に対する最も一般的なアプローチですが、
              ユーザーがスクロール可能であることに気づけるよう設計する必要があります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">横スクロールを導入する判断基準</h3>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li><strong>カラム数が 5 以上</strong>で、各カラムに最低限必要な幅がある場合</li>
                <li><strong>テーブルの最小幅が 768px 以上</strong>になる場合（モバイルに収まらない）</li>
                <li><strong>カラムを非表示にすると情報が失われる</strong>場合（すべてのカラムが重要）</li>
                <li><strong>印刷やエクスポートが不要</strong>で、画面上での閲覧が主目的の場合</li>
              </ul>
            </div>

            <CodeBlock
              language="css"
              title="横スクロールの正しい実装（wrapper div パターン）"
              showLineNumbers
              code={`/* 横スクロールのラッパー */
.table-scroll-wrapper {
  overflow-x: auto;        /* 横スクロールを有効化 */
  -webkit-overflow-scrolling: touch;  /* iOS のスムーズスクロール */
  max-width: 100%;
}

/* テーブル本体には最小幅を設定 */
.table-scroll-wrapper table {
  min-width: 800px;        /* これ以下にはならない */
  width: 100%;
  border-collapse: collapse;
}

/* 重要: table 要素自体に overflow をかけても効かない */
/* 必ず wrapper div を使う */`}
            />

            <CodeBlock
              language="tsx"
              title="React でのラッパーパターン"
              code={`function ScrollableTable({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ minWidth: 800, width: '100%', borderCollapse: 'collapse' }}>
        {children}
      </table>
    </div>
  );
}

// 使用例
<ScrollableTable>
  <thead>
    <tr>
      <th>ID</th>
      <th>名前</th>
      <th>メール</th>
      <th>部署</th>
      <th>入社日</th>
      <th>ステータス</th>
    </tr>
  </thead>
  <tbody>{/* ... */}</tbody>
</ScrollableTable>`}
            />

            <CodePreview
              code={`function ScrollTableDemo() {
  const cols = ['ID','名前','メール','部署','役職','入社日','ステータス','最終ログイン'];
  const rows = [
    ['001','田中太郎','tanaka@example.com','開発部','リードエンジニア','2020-04-01','稼働中','2024-03-14'],
    ['002','鈴木花子','suzuki@example.com','デザイン部','シニアデザイナー','2019-08-15','稼働中','2024-03-13'],
    ['003','佐藤次郎','sato@example.com','営業部','マネージャー','2018-01-10','休暇中','2024-03-10'],
    ['004','山田美咲','yamada@example.com','人事部','採用担当','2021-06-01','稼働中','2024-03-14'],
  ];
  const ref = React.useRef(null);
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(true);
  const onScroll = (e) => {
    const el = e.target;
    setShowLeft(el.scrollLeft > 4);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };
  React.useEffect(() => {
    if (ref.current) {
      setShowRight(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, []);
  return (
    <div style={{ padding: '16px' }}>
      <p style={{ fontSize: '13px', color: 'var(--text-muted, #64748b)', marginBottom: '8px' }}>横にスクロールしてください（影がインジケータになります）</p>
      <div style={{ position: 'relative' }}>
        {showLeft && <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(to right, rgba(0,0,0,0.08), transparent)', pointerEvents: 'none', zIndex: 2 }} />}
        {showRight && <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(to left, rgba(0,0,0,0.08), transparent)', pointerEvents: 'none', zIndex: 2 }} />}
        <div ref={ref} onScroll={onScroll} style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ minWidth: '900px', width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                {cols.map((c, i) => (
                  <th key={i} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text)', fontWeight: 600, whiteSpace: 'nowrap' }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '8px 12px', color: j === 0 ? 'var(--text-muted, #64748b)' : 'var(--text)', whiteSpace: 'nowrap' }}>
                      {j === 6 ? (
                        <span style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', background: cell === '稼働中' ? 'var(--bg-success, #dcfce7)' : 'var(--bg-warning, #fef3c7)', color: cell === '稼働中' ? 'var(--text-success, #166534)' : 'var(--text-warning, #92400e)' }}>{cell}</span>
                      ) : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="横スクロール + グラデーション影インジケータ"
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">スクロール可能であることの視覚的インジケータ</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ユーザーはテーブルが横にスクロールできることに気づかないことがあります。
              グラデーションの影を使って「まだコンテンツがある」ことを視覚的に示しましょう。
            </p>

            <CodeBlock
              language="css"
              title="スクロールインジケータ（グラデーション影）"
              showLineNumbers
              code={`/* テーブルラッパーの親要素 */
.table-container {
  position: relative;
}

/* 右端のグラデーション: 「右にまだある」を示す */
.table-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to left, white, transparent);
  pointer-events: none;  /* クリックを透過 */
  opacity: 1;
  transition: opacity 0.3s;
}

/* JavaScript でスクロール位置を監視し、
   右端に到達したらグラデーションを非表示にする */
.table-container.scrolled-to-end::after {
  opacity: 0;
}

/* 左端のグラデーション: 「左にもある」を示す */
.table-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to right, white, transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
}

.table-container.scrolled-from-start::before {
  opacity: 1;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">固定カラム + スクロール（position: sticky）</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              左端のカラム（ID や名前など）を固定し、残りのカラムをスクロールさせるパターンです。
              ユーザーがどの行を見ているか常に把握でき、データの関連性を失いません。
            </p>

            <CodeBlock
              language="css"
              title="固定カラムの CSS"
              showLineNumbers
              code={`/* 横スクロール可能なラッパー */
.table-wrapper {
  overflow-x: auto;
}

.table-wrapper table {
  min-width: 1000px;
  border-collapse: separate;   /* sticky の場合は separate が必要 */
  border-spacing: 0;
}

/* 最初のカラムを固定 */
.table-wrapper th:first-child,
.table-wrapper td:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
  background: white;     /* 背景色がないと下のセルが透けて見える */
}

/* 固定カラムの右に影を付ける */
.table-wrapper th:first-child::after,
.table-wrapper td:first-child::after {
  content: '';
  position: absolute;
  top: 0;
  right: -6px;
  bottom: 0;
  width: 6px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
}

/* ダークモード対応 */
[data-theme="dark"] .table-wrapper th:first-child,
[data-theme="dark"] .table-wrapper td:first-child {
  background: #1e293b;
}`}
            />

            <CodePreview
              code={`function StickyColumnDemo() {
  const headers = ['名前','Q1 売上','Q2 売上','Q3 売上','Q4 売上','年間合計','前年比','達成率'];
  const data = [
    ['田中太郎','320万','410万','380万','450万','1,560万','+12%','104%'],
    ['鈴木花子','280万','350万','420万','390万','1,440万','+8%','96%'],
    ['佐藤次郎','190万','220万','260万','310万','980万','+22%','98%'],
    ['山田美咲','410万','380万','350万','420万','1,560万','+5%','102%'],
    ['高橋一郎','150万','180万','200万','240万','770万','+15%','88%'],
  ];
  return (
    <div style={{ padding: '16px' }}>
      <p style={{ fontSize: '13px', color: 'var(--text-muted, #64748b)', marginBottom: '8px' }}>左端の「名前」列が固定されます。横にスクロールしてみてください。</p>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ minWidth: '800px', width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={{
                  textAlign: i === 0 ? 'left' : 'right',
                  padding: '8px 12px',
                  color: 'var(--text)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  borderBottom: '2px solid var(--border)',
                  background: 'var(--bg-muted, #f8fafc)',
                  ...(i === 0 ? { position: 'sticky', left: 0, zIndex: 2, boxShadow: '2px 0 4px rgba(0,0,0,0.06)' } : {}),
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{
                    textAlign: j === 0 ? 'left' : 'right',
                    padding: '8px 12px',
                    color: j === 0 ? 'var(--text)' : 'var(--text-muted, #64748b)',
                    fontWeight: j === 0 ? 500 : 400,
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid var(--border)',
                    background: 'var(--bg-card, #fff)',
                    ...(j === 0 ? { position: 'sticky', left: 0, zIndex: 1, boxShadow: '2px 0 4px rgba(0,0,0,0.06)' } : {}),
                  }}>
                    {j === 6 ? (
                      <span style={{ color: cell.startsWith('+') ? '#22c55e' : '#ef4444' }}>{cell}</span>
                    ) : j === 7 ? (
                      <span style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', background: parseInt(cell) >= 100 ? '#dcfce7' : '#fef3c7', color: parseInt(cell) >= 100 ? '#166534' : '#92400e' }}>{cell}</span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="固定カラム（sticky）+ 横スクロール"
            />

            <InfoBox type="info" title="border-collapse と sticky の互換性">
              <p>
                <code>border-collapse: collapse</code> と <code>position: sticky</code> を
                組み合わせると、ブラウザによっては sticky が正しく機能しません。
                固定カラムを使う場合は <code>border-collapse: separate; border-spacing: 0;</code>
                に設定し、ボーダーは個別のセルに適用してください。
              </p>
            </InfoBox>
          </section>

          {/* ======================================== */}
          {/* セクション4: レスポンシブテーブルの戦略 */}
          {/* ======================================== */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. レスポンシブテーブルの戦略</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テーブルのレスポンシブ対応にはいくつかのアプローチがあり、
              データの性質やカラム数に応じて使い分けます。
              「唯一の正解」はなく、テーブルの内容に応じた選択が必要です。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">戦略 A: カード化パターン</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              モバイル幅ではテーブルの各行をカード形式に変換するパターンです。
              カラム数が少なく（3〜5列）、各行がひとつのエンティティを表す場合に有効です。
            </p>

            <CodeBlock
              language="css"
              title="@media でテーブルをカードに変換"
              showLineNumbers
              code={`/* デスクトップ: 通常のテーブル表示 */
.responsive-table {
  width: 100%;
  border-collapse: collapse;
}

.responsive-table th,
.responsive-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}

/* モバイル: テーブルをカード化 */
@media (max-width: 768px) {
  .responsive-table thead {
    display: none;   /* ヘッダー行を隠す */
  }

  .responsive-table tbody tr {
    display: block;
    margin-bottom: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    background: white;
  }

  .responsive-table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .responsive-table tbody td:last-child {
    border-bottom: none;
  }

  /* data-label 属性でカラム名を表示 */
  .responsive-table tbody td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #64748b;
    flex-shrink: 0;
    margin-right: 16px;
  }
}`}
            />

            <CodeBlock
              language="html"
              title="data-label 属性を使った HTML"
              code={`<table class="responsive-table">
  <thead>
    <tr>
      <th>名前</th>
      <th>部署</th>
      <th>メール</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="名前">田中太郎</td>
      <td data-label="部署">開発部</td>
      <td data-label="メール">tanaka@example.com</td>
    </tr>
    <tr>
      <td data-label="名前">鈴木花子</td>
      <td data-label="部署">デザイン部</td>
      <td data-label="メール">suzuki@example.com</td>
    </tr>
  </tbody>
</table>`}
            />

            <CodePreview
              code={`function ResponsiveCardTable() {
  const members = [
    { name: '田中太郎', dept: '開発部', email: 'tanaka@example.com', status: '稼働中' },
    { name: '鈴木花子', dept: 'デザイン部', email: 'suzuki@example.com', status: '休暇中' },
    { name: '佐藤次郎', dept: '営業部', email: 'sato@example.com', status: '稼働中' },
  ];
  const [isMobile, setIsMobile] = React.useState(false);
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
        <button onClick={() => setIsMobile(false)} style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '12px', border: '1px solid var(--border)', background: !isMobile ? 'var(--bg-primary, #3b82f6)' : 'transparent', color: !isMobile ? '#fff' : 'var(--text)', cursor: 'pointer' }}>Desktop</button>
        <button onClick={() => setIsMobile(true)} style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '12px', border: '1px solid var(--border)', background: isMobile ? 'var(--bg-primary, #3b82f6)' : 'transparent', color: isMobile ? '#fff' : 'var(--text)', cursor: 'pointer' }}>Mobile (Card)</button>
      </div>
      {!isMobile ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>名前</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>部署</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>メール</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>ステータス</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 12px', color: 'var(--text)', fontWeight: 500 }}>{m.name}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-muted, #64748b)' }}>{m.dept}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-muted, #64748b)' }}>{m.email}</td>
                <td style={{ padding: '8px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', background: m.status==='稼働中' ? '#dcfce7' : '#fef3c7', color: m.status==='稼働中' ? '#166534' : '#92400e' }}>{m.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {members.map((m, i) => (
            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', background: 'var(--bg-card, #fff)' }}>
              {[['名前', m.name], ['部署', m.dept], ['メール', m.email], ['ステータス', m.status]].map(([label, val], j) => (
                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: j < 3 ? '1px solid var(--border-light, #f1f5f9)' : 'none' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-muted, #64748b)', fontSize: '13px' }}>{label}</span>
                  <span style={{ color: 'var(--text)', fontSize: '13px' }}>
                    {label === 'ステータス' ? (
                      <span style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', background: val==='稼働中' ? '#dcfce7' : '#fef3c7', color: val==='稼働中' ? '#166534' : '#92400e' }}>{val}</span>
                    ) : val}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              title="レスポンシブテーブル: Desktop vs Mobile カード表示"
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">戦略 B: 優先カラム表示</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              カラム数が多い場合に、モバイルでは重要度の高いカラムだけを表示し、
              残りは非表示にするパターンです。非表示にしたカラムは「詳細」リンクや
              展開ボタンで確認できるようにします。
            </p>

            <CodeBlock
              language="css"
              title="優先カラム表示"
              code={`/* すべてのカラムにデータ属性で優先度を設定 */
/* priority="1" は常に表示、priority="2" は md 以上、priority="3" は lg 以上 */

@media (max-width: 768px) {
  [data-priority="2"],
  [data-priority="3"] {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  [data-priority="3"] {
    display: none;
  }
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">戦略 C: 横スクロール + 固定列</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              前のセクションで解説した横スクロール + position: sticky のパターンです。
              すべてのカラムが重要で、どれも非表示にできない場合に最適です。
              データの比較が必要な分析ダッシュボードなどで多用されます。
            </p>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-4">
              <h4 className="font-semibold text-foreground mb-3">戦略の選び方</h4>
              <div className="space-y-2 text-foreground/80 text-sm">
                <p><strong>カード化</strong> -- カラム 3〜5 列、各行が独立したエンティティ（ユーザー一覧、商品一覧）</p>
                <p><strong>優先カラム表示</strong> -- カラム 6 列以上、一部のカラムは省略可能（管理画面のログ一覧など）</p>
                <p><strong>横スクロール + 固定列</strong> -- すべてのカラムが必要、データの横比較が必要（財務データ、比較表）</p>
              </div>
            </div>

            <InfoBox type="info" title="React での動的カラム非表示">
              <p>
                React で優先カラム表示を実装する場合は、CSS の <code>display: none</code> よりも
                JavaScript で「表示するカラムのリスト」を管理し、条件付きレンダリングする方が制御しやすいです。
                <code>useMediaQuery</code> フックでブレークポイントを検出し、
                カラム定義に <code>priority</code> フィールドを持たせるアプローチが一般的です。
              </p>
            </InfoBox>
          </section>

          {/* ======================================== */}
          {/* セクション5: 入れ子テーブルを避ける */}
          {/* ======================================== */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. 入れ子テーブルを避ける</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テーブルのセル内に別のテーブルをネストする「入れ子テーブル」は、
              階層的なデータを表現する手段として一見便利に思えますが、
              実際には深刻な問題を引き起こします。
            </p>

            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-4">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-3">入れ子テーブルが問題である理由</h4>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-400">
                <li><strong>アクセシビリティの崩壊:</strong> スクリーンリーダーは入れ子テーブルの「どのヘッダーがどのデータに対応するか」を正しく伝えられない。ユーザーは構造を理解できず迷子になる</li>
                <li><strong>認知負荷:</strong> 視覚的にも「テーブルの中のテーブル」は情報の階層を把握しにくい。特に入れ子が 2 段以上になると壊滅的</li>
                <li><strong>レスポンシブ不可:</strong> 入れ子テーブルはどのレスポンシブ戦略（カード化、優先カラム、横スクロール）とも相性が悪い</li>
                <li><strong>パフォーマンス:</strong> DOM ノードが爆発的に増え、レンダリングコストが高くなる</li>
              </ul>
            </div>

            <CodeBlock
              language="html"
              title="悪い例: 入れ子テーブル"
              code={`<!-- 悪い例: 注文テーブルの中に明細テーブルをネスト -->
<table>
  <thead>
    <tr>
      <th>注文ID</th>
      <th>顧客名</th>
      <th>明細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ORD-001</td>
      <td>田中太郎</td>
      <td>
        <!-- 入れ子テーブル: 避けるべき -->
        <table>
          <tr><td>商品A</td><td>3個</td><td>9,000円</td></tr>
          <tr><td>商品B</td><td>1個</td><td>5,000円</td></tr>
        </table>
      </td>
    </tr>
  </tbody>
</table>`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">代替案</h3>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">1. アコーディオン行</h4>
                <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                  親行をクリックすると子行が展開されるパターン。
                  同じテーブル内で階層を表現でき、DOM 構造もフラットに保てます。
                </p>
                <CodeBlock
                  language="tsx"
                  title="アコーディオン行パターン"
                  code={`function OrderTable({ orders }: { orders: Order[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">注文ID</th>
          <th scope="col">顧客名</th>
          <th scope="col">合計</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <Fragment key={order.id}>
            {/* 親行 */}
            <tr>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td>
                <button onClick={() => setExpandedId(
                  expandedId === order.id ? null : order.id
                )}>
                  {expandedId === order.id ? '閉じる' : '明細を見る'}
                </button>
              </td>
            </tr>
            {/* 子行（展開時のみ表示） */}
            {expandedId === order.id && order.items.map((item) => (
              <tr key={item.id} style={{ backgroundColor: '#f8fafc' }}>
                <td></td>
                <td>{item.name}</td>
                <td>{item.quantity}個</td>
                <td>{item.price}円</td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}`}
                />

                <CodePreview
                  code={`function AccordionTableDemo() {
  const [expandedId, setExpandedId] = React.useState(null);
  const orders = [
    { id: 'ORD-001', customer: '田中太郎', total: '14,000円', items: [{ name: '商品A', qty: 3, price: '9,000円' }, { name: '商品B', qty: 1, price: '5,000円' }] },
    { id: 'ORD-002', customer: '鈴木花子', total: '23,500円', items: [{ name: '商品C', qty: 2, price: '12,000円' }, { name: '商品D', qty: 1, price: '8,500円' }, { name: '商品E', qty: 1, price: '3,000円' }] },
    { id: 'ORD-003', customer: '佐藤次郎', total: '6,800円', items: [{ name: '商品F', qty: 1, price: '6,800円' }] },
  ];
  return (
    <div style={{ padding: '16px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th style={{ width: '36px', padding: '8px' }}></th>
            <th scope="col" style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>注文ID</th>
            <th scope="col" style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>顧客名</th>
            <th scope="col" style={{ textAlign: 'right', padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>合計</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <tr style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: expandedId === order.id ? 'var(--bg-muted, #f8fafc)' : 'transparent' }} onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}>
                <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-muted, #64748b)', fontSize: '16px' }}>{expandedId === order.id ? '\u25BC' : '\u25B6'}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-muted, #64748b)', fontFamily: 'monospace' }}>{order.id}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text)', fontWeight: 500 }}>{order.customer}</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--text)', fontWeight: 600 }}>{order.total}</td>
              </tr>
              {expandedId === order.id && order.items.map((item, j) => (
                <tr key={j} style={{ borderBottom: '1px solid var(--border-light, #f1f5f9)', background: 'var(--bg-muted, #f1f5f9)' }}>
                  <td></td>
                  <td style={{ padding: '6px 12px', color: 'var(--text-muted, #94a3b8)', fontSize: '12px' }}></td>
                  <td style={{ padding: '6px 12px', color: 'var(--text-muted, #64748b)', fontSize: '12px' }}>{item.name} x {item.qty}</td>
                  <td style={{ padding: '6px 12px', textAlign: 'right', color: 'var(--text-muted, #64748b)', fontSize: '12px' }}>{item.price}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}`}
                  language="tsx"
                  title="アコーディオン行: 入れ子テーブルの代替"
                />
              </div>

              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">2. マスター / ディテールパターン</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  左側にテーブル（一覧）、右側に詳細パネルを配置するレイアウト。
                  行を選択すると詳細パネルの内容が切り替わります。
                  管理画面やメールクライアントでよく見られるパターンです。
                </p>
              </div>

              <div className="rounded-lg border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">3. ツリービュー</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  ファイルシステムのような階層構造が必要な場合は、
                  テーブルではなく専用のツリービューコンポーネントを使います。
                  テーブルの枠に無理やり階層を押し込むより、
                  適切な UI パターンを選ぶことが重要です。
                </p>
              </div>
            </div>
          </section>

          {/* ======================================== */}
          {/* セクション6: テーブルのアクセシビリティ */}
          {/* ======================================== */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. テーブルのアクセシビリティ</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              テーブルはスクリーンリーダーにとって最もナビゲーションが難しい要素のひとつです。
              正しいマークアップがあれば、支援技術はセルとヘッダーの関係を伝えてくれますが、
              マークアップが不適切だと、ユーザーはテーブルの中で迷子になります。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">scope 属性の必須性</h3>

            <CodeBlock
              language="html"
              title="scope 属性の正しい使い方"
              code={`<table>
  <caption>社員名簿</caption>
  <thead>
    <tr>
      <!-- scope="col": この th は列全体のヘッダー -->
      <th scope="col">社員番号</th>
      <th scope="col">名前</th>
      <th scope="col">部署</th>
      <th scope="col">入社年</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <!-- scope="row": この th は行のヘッダー -->
      <th scope="row">EMP-001</th>
      <td>田中太郎</td>
      <td>開発部</td>
      <td>2020</td>
    </tr>
    <tr>
      <th scope="row">EMP-002</th>
      <td>鈴木花子</td>
      <td>デザイン部</td>
      <td>2021</td>
    </tr>
  </tbody>
</table>

<!-- スクリーンリーダーの読み上げ例:
  "社員番号 EMP-001、名前 田中太郎、部署 開発部、入社年 2020"
  scope があるからこそ、各セルがどのヘッダーに対応するかが伝わる -->`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">caption 要素の重要性</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">caption</code> はテーブルの目的や内容を要約するテキストです。
              スクリーンリーダーのユーザーがテーブルに到達したとき、最初に読み上げられるのが caption です。
              caption がないと、ユーザーは「このテーブルが何のデータなのか」を
              ヘッダーセルを 1 つずつ読み上げるまで把握できません。
            </p>

            <CodeBlock
              language="css"
              title="caption を視覚的に非表示にしつつ支援技術には提供する"
              code={`/* caption を視覚的に隠す（スクリーンリーダーには読める） */
table caption {
  /* visually-hidden パターン */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* もしくは見出しとして堂々と表示する */
table caption.visible {
  position: static;
  width: auto;
  height: auto;
  padding: 12px 16px;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  text-align: left;
  font-weight: 600;
  font-size: 1.125rem;
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">aria-sort でソート状態を示す</h3>

            <CodeBlock
              language="tsx"
              title="ソート可能なテーブルヘッダーのアクセシビリティ"
              code={`type SortDirection = 'ascending' | 'descending' | 'none';

function SortableHeader({
  label,
  sortDirection,
  onSort,
}: {
  label: string;
  sortDirection: SortDirection;
  onSort: () => void;
}) {
  return (
    <th
      scope="col"
      aria-sort={sortDirection}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      <button
        onClick={onSort}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          font: 'inherit', color: 'inherit', display: 'flex',
          alignItems: 'center', gap: 4,
        }}
      >
        {label}
        <span aria-hidden="true">
          {sortDirection === 'ascending' && ' ▲'}
          {sortDirection === 'descending' && ' ▼'}
          {sortDirection === 'none' && ' ▲▼'}
        </span>
      </button>
    </th>
  );
}

// aria-sort の値:
// "ascending"  — 昇順でソート中
// "descending" — 降順でソート中
// "none"       — ソートされていない
// "other"      — 上記以外のソート順`}
            />

            <CodePreview
              code={`function SortableTableDemo() {
  const [sortKey, setSortKey] = React.useState('name');
  const [sortDir, setSortDir] = React.useState('asc');
  const rawData = [
    { name: '田中太郎', dept: '開発部', year: 2020, sales: 1560 },
    { name: '鈴木花子', dept: 'デザイン部', year: 2019, sales: 1440 },
    { name: '佐藤次郎', dept: '営業部', year: 2021, sales: 980 },
    { name: '山田美咲', dept: '人事部', year: 2018, sales: 1820 },
    { name: '高橋一郎', dept: '開発部', year: 2022, sales: 770 },
  ];
  const data = [...rawData].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
  const handleSort = (key) => {
    if (sortKey === key) { setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }
    else { setSortKey(key); setSortDir('asc'); }
  };
  const cols = [
    { key: 'name', label: '名前', align: 'left' },
    { key: 'dept', label: '部署', align: 'left' },
    { key: 'year', label: '入社年', align: 'right' },
    { key: 'sales', label: '年間売上(万)', align: 'right' },
  ];
  const arrow = (key) => sortKey === key ? (sortDir === 'asc' ? ' \\u25B2' : ' \\u25BC') : ' \\u25B2\\u25BC';
  return (
    <div style={{ padding: '16px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <caption style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)', fontSize: '14px' }}>社員パフォーマンス（ヘッダーをクリックでソート）</caption>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            {cols.map((col) => (
              <th key={col.key} scope="col" aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'} style={{ textAlign: col.align, padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>
                <button onClick={() => handleSort(col.key)} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: sortKey === col.key ? 'var(--text-primary, #3b82f6)' : 'inherit', fontWeight: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}>
                  {col.label}
                  <span aria-hidden="true" style={{ fontSize: '10px', opacity: sortKey === col.key ? 1 : 0.4 }}>{arrow(col.key)}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px 12px', color: 'var(--text)', fontWeight: 500 }}>{d.name}</td>
              <td style={{ padding: '8px 12px', color: 'var(--text-muted, #64748b)' }}>{d.dept}</td>
              <td style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--text-muted, #64748b)' }}>{d.year}</td>
              <td style={{ padding: '8px 12px', textAlign: 'right', color: 'var(--text)', fontWeight: 600 }}>{d.sales.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`}
              language="tsx"
              title="ソート可能なテーブル（aria-sort 付き）"
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">空セルの取り扱い</h3>

            <InfoBox type="warning" title="空セルを放置しない">
              <p>
                データがない空のセルは、スクリーンリーダーが「空白」としか読み上げないため、
                ユーザーは「データがないのか」「まだ読み込み中なのか」「エラーなのか」を判断できません。
                空セルには <code>aria-label="データなし"</code> を付与するか、
                視覚的にも「-」「N/A」「未設定」などのプレースホルダーを表示してください。
              </p>
            </InfoBox>

            <CodeBlock
              language="tsx"
              title="空セルの適切な処理"
              code={`function DataCell({ value }: { value: string | null }) {
  if (value === null || value === '') {
    return (
      <td aria-label="データなし" style={{ color: '#94a3b8' }}>
        -
      </td>
    );
  }
  return <td>{value}</td>;
}`}
            />
          </section>

          {/* ======================================== */}
          {/* セクション7: テーブルの操作 UI */}
          {/* ======================================== */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. テーブルの操作 UI</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              データテーブルは表示するだけでなく、ソート、フィルター、ページネーション、
              行選択などの操作機能が求められることが多いです。
              これらの操作 UI を適切に設計する指針を示します。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">ソートとフィルター</h3>

            <CodeBlock
              language="tsx"
              title="基本的なソート機能"
              showLineNumbers
              code={`type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

function useTableSort<T>(data: T[], config: SortConfig): T[] {
  return useMemo(() => {
    if (!config) return data;

    return [...data].sort((a, b) => {
      const aVal = a[config.key as keyof T];
      const bVal = b[config.key as keyof T];

      if (aVal < bVal) return config.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return config.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, config]);
}

// 使用例
function UserTable({ users }: { users: User[] }) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const sortedUsers = useTableSort(users, sortConfig);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key && prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th scope="col" onClick={() => handleSort('name')}>名前</th>
          <th scope="col" onClick={() => handleSort('email')}>メール</th>
          <th scope="col" onClick={() => handleSort('createdAt')}>登録日</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">ページネーション</h3>

            <CodeBlock
              language="tsx"
              title="テーブルのページネーション"
              code={`function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <nav aria-label="テーブルのページナビゲーション">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="前のページ"
        >
          前へ
        </button>

        <span aria-live="polite">
          {currentPage} / {totalPages} ページ
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="次のページ"
        >
          次へ
        </button>
      </div>
    </nav>
  );
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">行選択（チェックボックス）</h3>

            <CodeBlock
              language="tsx"
              title="行選択パターン"
              code={`function SelectableTable({ rows }: { rows: RowData[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allSelected = selectedIds.size === rows.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(rows.map((r) => r.id)));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => { if (el) el.indeterminate = someSelected; }}
              onChange={toggleAll}
              aria-label="すべての行を選択"
            />
          </th>
          <th scope="col">名前</th>
          <th scope="col">メール</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.has(row.id)}
                onChange={() => toggleRow(row.id)}
                aria-label={\`\${row.name} を選択\`}
              />
            </td>
            <td>{row.name}</td>
            <td>{row.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// 注目ポイント:
// 1. indeterminate 状態（一部選択）をチェックボックスに反映
// 2. 各チェックボックスに aria-label で対象を明示
// 3. 選択状態を Set で管理（O(1) の追加・削除・参照）`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">インライン編集の是非</h3>

            <InfoBox type="warning" title="インライン編集は慎重に">
              <p>
                テーブルのセルを直接クリックして編集できる「インライン編集」は、
                一見便利ですが以下の問題があります。
                (1) 誤操作で意図しない変更が発生しやすい。
                (2) 変更の確認・取り消しの UI が複雑になる。
                (3) バリデーションエラーの表示場所が限られる。
                (4) アクセシビリティの実装が非常に複雑。
                インライン編集を導入する場合は、明確な「編集モード」への切り替え、
                変更のプレビュー、Undo 機能の提供を検討してください。
                多くの場合、行をクリックして別パネルやモーダルで編集する方が安全です。
              </p>
            </InfoBox>
          </section>

          {/* ======================================== */}
          {/* セクション8: CSS テーブルレイアウトの制御 */}
          {/* ======================================== */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. CSS テーブルレイアウトの制御</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              CSS にはテーブルのレイアウトを制御するプロパティがいくつかあります。
              これらを正しく使い分けることで、意図したレイアウトを実現できます。
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">table-layout: fixed vs auto</h3>

            <CodeBlock
              language="css"
              title="table-layout の違い"
              showLineNumbers
              code={`/* auto（デフォルト）: すべてのセルの内容を見てから幅を決定 */
.table-auto {
  table-layout: auto;
  width: 100%;
  /* メリット: 内容に応じて最適な幅が自動計算される */
  /* デメリット: すべてのセルを読むまで描画が始まらない（大量行で遅延） */
  /* デメリット: 内容によって幅が変わるため予測が難しい */
}

/* fixed: 最初の行（ヘッダー）の幅指定だけで幅が確定 */
.table-fixed {
  table-layout: fixed;
  width: 100%;
  /* メリット: 1行目を読んだだけで描画開始（パフォーマンス良好） */
  /* メリット: カラム幅が安定し、予測可能なレイアウトになる */
  /* デメリット: 内容がはみ出す可能性がある（overflow の対策が必要） */
}

/* table-layout: fixed では、th の width が尊重される */
.table-fixed th:nth-child(1) { width: 80px; }    /* ID */
.table-fixed th:nth-child(2) { width: 200px; }   /* 名前 */
.table-fixed th:nth-child(3) { width: auto; }     /* 残りの幅 */
.table-fixed th:nth-child(4) { width: 120px; }   /* 日付 */`}
            />

            <div className="bg-muted/30 border border-border rounded-lg p-6 my-4">
              <h4 className="font-semibold text-foreground mb-3">table-layout の使い分け指針</h4>
              <div className="space-y-2 text-foreground/80 text-sm">
                <p><strong>auto を使う場合:</strong> データが少ない（〜100行）、カラム幅が内容に依存する、レイアウトの柔軟性が重要</p>
                <p><strong>fixed を使う場合:</strong> データが多い（100行以上）、カラム幅を厳密に制御したい、パフォーマンスが重要</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">min-width, max-width の効き方</h3>

            <CodeBlock
              language="css"
              title="テーブルセルの幅制御"
              code={`/* table-layout: auto の場合 */
/* min-width は効くが、max-width は無視されることがある */
.table-auto td {
  min-width: 100px;   /* 最低幅は保証される */
  max-width: 300px;   /* 他のカラムが小さければ無視されることがある */
}

/* table-layout: fixed の場合 */
/* width が優先され、min-width / max-width の挙動が変わる */
.table-fixed td {
  width: 200px;       /* この幅が強制される */
  overflow: hidden;   /* はみ出す内容を隠す */
}

/* 推奨: fixed + overflow-wrap の組み合わせ */
.table-fixed td.text-cell {
  overflow-wrap: break-word;  /* 長い単語を折り返す */
  overflow: hidden;           /* はみ出しを防止 */
  white-space: normal;        /* 折り返しを許可 */
}`}
            />

            <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">border-collapse vs border-spacing</h3>

            <CodeBlock
              language="css"
              title="ボーダーモデルの比較"
              showLineNumbers
              code={`/* border-collapse: collapse */
/* セル同士のボーダーが統合される（最も一般的） */
.table-collapse {
  border-collapse: collapse;
  /* メリット: スッキリした見た目、ボーダーの重複なし */
  /* デメリット: border-radius がテーブルに効かない */
  /* デメリット: position: sticky と相性が悪い場合がある */
}

.table-collapse th,
.table-collapse td {
  border: 1px solid #e2e8f0;
  padding: 12px 16px;
}

/* border-collapse: separate + border-spacing */
/* セル同士の間にスペースが入る */
.table-separate {
  border-collapse: separate;
  border-spacing: 0;  /* 0 にすると collapse と見た目が近い */
  /* border-spacing: 4px;  セル間に隙間を入れる場合 */
  /* メリット: border-radius が効く */
  /* メリット: position: sticky と互換性がある */
  /* メリット: セル間のスペースを自由に制御できる */
}

.table-separate th,
.table-separate td {
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  padding: 12px 16px;
}

/* border-radius を使ったテーブル（separate が必要） */
.table-rounded {
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;  /* 角丸の外をクリップ */
}`}
            />

            <InfoBox type="info" title="sticky ヘッダーを使う場合の注意">
              <p>
                縦に長いテーブルで <code>thead</code> を <code>position: sticky; top: 0;</code> で
                固定する場合、<code>border-collapse: collapse</code> だとヘッダーのボーダーが
                スクロール時に消えることがあります（ブラウザの実装差異）。
                sticky ヘッダーを使う場合は <code>border-collapse: separate</code> を使い、
                ヘッダーセルに個別にボーダーと背景色を設定するのが安全です。
              </p>
            </InfoBox>

            <CodeBlock
              language="css"
              title="sticky ヘッダーの安全な実装"
              code={`/* sticky ヘッダー + separate ボーダー */
.sticky-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.sticky-table thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #f8fafc;      /* 背景色は必須（透過させない） */
  border-bottom: 2px solid #e2e8f0;
  padding: 12px 16px;
  font-weight: 600;
  text-align: left;
}

.sticky-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}`}
            />
          </section>

          {/* ======================================== */}
          {/* セクション9: まとめチェックリスト */}
          {/* ======================================== */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テーブル設計チェックリスト</h2>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
              <div className="space-y-3 text-foreground/80 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>セマンティックな HTML（table, thead, tbody, th, td）を使っているか</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>caption 要素でテーブルの目的を示しているか</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>th に scope="col" / scope="row" を付与しているか</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>長いテキストの処理方針を決めているか（折り返し / ellipsis + ツールチップ / 展開）</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>横スクロールが必要な場合、wrapper div でラップしているか</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>スクロール可能であることが視覚的に示されているか</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>レスポンシブ戦略を選択しているか（カード化 / 優先カラム / 横スクロール）</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>入れ子テーブルを使わず、アコーディオンや詳細パネルで代替しているか</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>空セルに適切なプレースホルダーまたは aria-label を設定しているか</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">&#9744;</span>
                  <span>ソート状態が aria-sort で支援技術に伝わるか</span>
                </div>
              </div>
            </div>
          </section>

          {/* ======================================== */}
          {/* Quiz 1 */}
          {/* ======================================== */}
          <section>
            <Quiz
              question="テーブルのヘッダーセル（th）に scope='col' を付ける主な目的はどれですか？"
              options={[
                { label: 'ヘッダーの文字を太字にするため' },
                { label: 'スクリーンリーダーがヘッダーとデータセルの関係を正しく伝えるため', correct: true },
                { label: 'CSS でヘッダー行にスタイルを適用しやすくするため' },
                { label: 'テーブルのソート機能を有効にするため' },
              ]}
              explanation="scope='col' は、その th がどの方向のヘッダーであるかを支援技術に伝えます。これにより、スクリーンリーダーがデータセルを読み上げる際に「名前: 田中太郎」のように対応するヘッダーを合わせて伝えることができます。視覚的なスタイルには影響しません。"
            />
          </section>

          {/* ======================================== */}
          {/* Quiz 2 */}
          {/* ======================================== */}
          <section>
            <Quiz
              question="text-overflow: ellipsis を使う際に、セットで指定が必要な CSS プロパティの組み合わせはどれですか？"
              options={[
                { label: 'display: block と font-size' },
                { label: 'white-space: nowrap と overflow: hidden', correct: true },
                { label: 'word-break: break-all と max-height' },
                { label: 'position: relative と z-index' },
              ]}
              explanation="text-overflow: ellipsis を機能させるには、(1) white-space: nowrap でテキストを1行に制限し、(2) overflow: hidden ではみ出した部分を隠す必要があります。この3つのプロパティがセットで揃って初めて、はみ出した部分が「...」で表示されます。加えて、要素に幅の制限（width や max-width）が必要です。"
            />
          </section>

          {/* ======================================== */}
          {/* Quiz 3 */}
          {/* ======================================== */}
          <section>
            <Quiz
              question="position: sticky で固定カラムを実装する際に、border-collapse: collapse ではなく border-collapse: separate を使うべき理由はどれですか？"
              options={[
                { label: 'separate の方がレンダリングが高速だから' },
                { label: 'collapse と sticky を組み合わせるとボーダーが正しく表示されないことがあるから', correct: true },
                { label: 'separate でないとセルに padding を設定できないから' },
                { label: 'collapse は IE でしかサポートされていないから' },
              ]}
              explanation="border-collapse: collapse の場合、ボーダーはセル間で共有されるためセル自体の「辺」ではなくなります。position: sticky でセルを固定すると、共有されたボーダーがスクロール時に正しく追従せず、消えたりズレたりすることがあります。border-collapse: separate; border-spacing: 0; を使えば、各セルが独自のボーダーを持つため、sticky と正常に連動します。"
            />
          </section>

          {/* ======================================== */}
          {/* Quiz 4 */}
          {/* ======================================== */}
          <section>
            <Quiz
              question="入れ子テーブル（テーブルのセル内に別のテーブルを配置する）を避けるべき最も重要な理由はどれですか？"
              options={[
                { label: 'CSS のスタイルが適用しにくくなるから' },
                { label: 'HTML の仕様で入れ子テーブルは禁止されているから' },
                { label: 'スクリーンリーダーがヘッダーとデータの対応関係を正しく伝えられなくなるから', correct: true },
                { label: 'ブラウザのレンダリングが遅くなるから' },
              ]}
              explanation="入れ子テーブルは HTML の仕様上は許可されていますが、スクリーンリーダーにとって非常に困難なナビゲーション体験を生みます。外側のテーブルと内側のテーブルのヘッダーが混在し、「このセルはどのヘッダーに対応するのか」が不明確になります。代替案として、アコーディオン行やマスター/ディテールパターンを使いましょう。"
            />
          </section>

          {/* ======================================== */}
          {/* CodingChallenge 1 */}
          {/* ======================================== */}
          <section>
            <CodingChallenge
              preview={true}
              title="アクセシブルなテーブルを作る"
              description="以下の要件を満たすセマンティックな HTML テーブルを作成してください。(1) caption で「月別売上レポート」と表示、(2) thead のヘッダーに scope='col' を付与、(3) 各行の最初のセルを th にして scope='row' を付与、(4) カラムは「月」「売上」「目標」の3列。データは1月と2月の2行。"
              initialCode={`<!-- ここにテーブルを記述 -->
<table>

</table>`}
              answer={`<table>
  <caption>月別売上レポート</caption>
  <thead>
    <tr>
      <th scope="col">月</th>
      <th scope="col">売上</th>
      <th scope="col">目標</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1月</th>
      <td>500万円</td>
      <td>480万円</td>
    </tr>
    <tr>
      <th scope="row">2月</th>
      <td>520万円</td>
      <td>500万円</td>
    </tr>
  </tbody>
</table>`}
              keywords={['caption', 'scope="col"', 'scope="row"', 'thead', 'tbody', '<th']}
              hints={[
                'caption 要素は table の直下、thead の前に配置します',
                '列ヘッダーには scope="col"、行ヘッダーには scope="row" を使います',
                '行ヘッダー（月の名前）は td ではなく th 要素にします',
              ]}
            />
          </section>

          {/* ======================================== */}
          {/* CodingChallenge 2 */}
          {/* ======================================== */}
          <section>
            <CodingChallenge
              preview={true}
              title="横スクロール + 固定カラムの CSS"
              description="以下の要件を満たす CSS を記述してください。(1) .table-wrapper に横スクロールを設定、(2) table に最小幅 900px を設定、(3) 最初のカラム（th:first-child, td:first-child）を position: sticky で左端に固定、(4) 固定カラムに背景色 white を設定（下のセルが透けないように）。border-collapse は separate、border-spacing は 0 にしてください。"
              initialCode={`.table-wrapper {
  /* 横スクロールの設定 */
}

.table-wrapper table {
  /* テーブルの基本設定 */
}

.table-wrapper th:first-child,
.table-wrapper td:first-child {
  /* 固定カラムの設定 */
}`}
              answer={`.table-wrapper {
  overflow-x: auto;
}

.table-wrapper table {
  min-width: 900px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table-wrapper th:first-child,
.table-wrapper td:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
  background: white;
}`}
              keywords={['overflow-x: auto', 'min-width: 900px', 'position: sticky', 'left: 0', 'background: white', 'border-collapse: separate']}
              hints={[
                '横スクロールは overflow-x: auto をラッパーに設定します',
                'sticky カラムには left: 0 で左端に固定する位置を指定します',
                '背景色がないと、スクロール時に下のセルが透けて見えます',
                'sticky と border-collapse: collapse は相性が悪いので、separate を使います',
              ]}
            />
          </section>

          {/* ======================================== */}
          {/* CodingChallenge 3 */}
          {/* ======================================== */}
          <section>
            <CodingChallenge
              preview={true}
              title="レスポンシブテーブルのカード化 CSS"
              description="モバイル幅（max-width: 768px）でテーブルをカード形式に変換する CSS を記述してください。(1) thead を非表示にする、(2) 各 tr を display: block にして margin-bottom, border, border-radius, padding を設定、(3) 各 td を display: flex, justify-content: space-between にする、(4) td::before で content: attr(data-label) を使いカラム名を表示する。"
              initialCode={`@media (max-width: 768px) {
  /* ここにカード化の CSS を記述 */
}`}
              answer={`@media (max-width: 768px) {
  .responsive-table thead {
    display: none;
  }

  .responsive-table tbody tr {
    display: block;
    margin-bottom: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
  }

  .responsive-table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }

  .responsive-table tbody td::before {
    content: attr(data-label);
    font-weight: 600;
  }
}`}
              keywords={['display: none', 'display: block', 'display: flex', 'justify-content: space-between', 'attr(data-label)']}
              hints={[
                'thead を display: none で非表示にします',
                'tr を display: block にすることでテーブルの行レイアウトを解除します',
                'td を display: flex にして、ラベルとデータを横並びにします',
                'CSS の attr() 関数で HTML の data-label 属性の値を取得できます',
              ]}
            />
          </section>

          {/* ======================================== */}
          {/* リファレンスリンク */}
          {/* ======================================== */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'MDN - <table>: The Table element',
                  url: 'https://developer.mozilla.org/ja/docs/Web/HTML/Element/table',
                  description: 'HTML テーブル要素の公式リファレンス。セマンティクスとアクセシビリティの解説が充実',
                },
                {
                  title: 'MDN - table-layout',
                  url: 'https://developer.mozilla.org/ja/docs/Web/CSS/table-layout',
                  description: 'table-layout: auto / fixed の詳細な仕様と挙動の解説',
                },
                {
                  title: 'WAI - Tables Tutorial',
                  url: 'https://www.w3.org/WAI/tutorials/tables/',
                  description: 'W3C のアクセシブルなテーブル設計チュートリアル。scope, headers, caption の実践例',
                },
                {
                  title: 'MDN - CSS overflow',
                  url: 'https://developer.mozilla.org/ja/docs/Web/CSS/overflow',
                  description: 'overflow-x: auto による横スクロールの仕様と注意点',
                },
              ]}
            />
          </section>

          {/* ======================================== */}
          {/* FAQ */}
          {/* ======================================== */}
          <section>
            <Faq
              items={[
                {
                  question: 'table-layout: fixed と auto はどう使い分ければいいですか？',
                  answer: 'データ量が少なく（〜100行）カラム幅を内容に合わせたい場合は auto（デフォルト）を使います。データ量が多い場合や、カラム幅を厳密に制御したい場合は fixed を使います。fixed はヘッダー行だけでレイアウトが確定するため、大量データのレンダリングが高速です。ただし、fixed ではセルの内容がはみ出す可能性があるため、overflow の対策が必要です。',
                },
                {
                  question: 'テーブルにカラムが 10 列以上あります。レスポンシブ対応はどうすべきですか？',
                  answer: 'カラムが10列以上の場合、カード化パターンは情報量が多すぎて破綻します。横スクロール + 固定列（position: sticky で左端1〜2列を固定）が最も実用的です。加えて、ユーザーが表示カラムを選択できる「カラム設定」機能を提供すると、各ユーザーが必要なカラムだけを表示できます。',
                },
                {
                  question: 'React でテーブルを実装するとき、TanStack Table のようなライブラリは使うべきですか？',
                  answer: 'ソート、フィルター、ページネーション、仮想スクロール、カラムのリサイズなど複雑な機能が必要な場合は TanStack Table（旧 React Table）の利用を推奨します。ライブラリはヘッドレス（UI なし）なので、スタイルは自由に制御できます。一方、単純な表示だけのテーブルなら、ライブラリなしでネイティブの table 要素を使う方がシンプルです。',
                },
                {
                  question: 'テーブルの行数が 1,000 行を超えます。パフォーマンスの対策は？',
                  answer: 'DOM に1,000行以上のテーブルをレンダリングするとパフォーマンスが低下します。主な対策は (1) ページネーションで表示行数を制限する、(2) 仮想スクロール（react-window, TanStack Virtual）で画面に見えている行だけをレンダリングする、(3) table-layout: fixed でレイアウト計算を高速化する、の3つです。まずはページネーションを検討し、「全行を一覧したい」要件がある場合に仮想スクロールを導入してください。',
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
