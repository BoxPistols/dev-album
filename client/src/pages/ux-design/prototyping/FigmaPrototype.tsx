import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

export default function FigmaPrototype() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 11</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          Figma プロトタイピング
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Figma のプロトタイピング機能を使って、実装前にインタラクションを検証する方法を学びます。
          エンジニア視点で押さえておくべき機能と、デザインからコードへの変換ワークフローを整理します。
        </p>

        <WhyNowBox tags={['Figma', 'プロトタイプ', 'Dev Mode', 'デザイン連携']}>
          <p>
            ワイヤーフレームで構造を決め、UI デザインで見た目を固めたら、次は「動くデモ」で仮説を検証する段階です。
            実装前にプロトタイプで操作感を確認することで、手戻りを防ぎ、チーム内の認識を揃えることができます。
            Figma はデザイナーだけのツールではなく、エンジニアにとっても仕様確認の起点になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: プロトタイプの種類 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">プロトタイプの種類と使い分け</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              プロトタイプは忠実度（Fidelity）によって3段階に分類できます。
              目的に応じて適切な手法を選ぶことが、コストと品質のバランスを取る鍵です。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground border border-border">種類</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border border-border">忠実度</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border border-border">コスト</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border border-border">用途</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border border-border">ツール例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-foreground border border-border font-medium">ペーパー（紙）</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">低</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">低（数分）</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">初期アイデアの検証、画面遷移の確認</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">紙・ホワイトボード</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="px-4 py-3 text-foreground border border-border font-medium">クリック可能</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">中</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">中（数時間）</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">操作フローの検証、ステークホルダー共有</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">Figma・Adobe XD</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-foreground border border-border font-medium">コード</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">高</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">高（数日）</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">実データとの統合検証、アクセシビリティ確認</td>
                    <td className="px-4 py-3 text-muted-foreground border border-border">React・Next.js</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="どの段階から始めるか">
              <p>
                まずはペーパーで大まかな流れを確認し、Figma で操作感を検証、
                確定したらコードに起こすのが一般的な進め方です。
                いきなりコードで作り始めると、方向転換のコストが大きくなります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: Figma の基本操作（エンジニア視点） */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Figma の基本操作（エンジニア視点）</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Figma をすべて覚える必要はありません。エンジニアとして仕様を読み取り、
              デザイナーと会話するために押さえておくべき機能を厳選して紹介します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* フレーム */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">F</span>
                  </div>
                  <h3 className="font-semibold text-foreground">フレーム</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  HTML の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">div</code> に相当するコンテナ。
                  画面サイズの指定、レイアウト制約の設定に使う。
                  レスポンシブ対応の基点になるため、フレーム構造の理解は必須。
                </p>
              </div>

              {/* オートレイアウト */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">AL</span>
                  </div>
                  <h3 className="font-semibold text-foreground">オートレイアウト</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  CSS の Flexbox に対応するレイアウト機能。
                  direction、gap、padding がそのまま CSS に変換できる。
                  デザイン上のオートレイアウト設定を見ればコードの構造がわかる。
                </p>
              </div>

              {/* コンポーネント */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">C</span>
                  </div>
                  <h3 className="font-semibold text-foreground">コンポーネント</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  React コンポーネントと同じ概念。
                  マスターコンポーネントを変更するとインスタンスに反映される。
                  props で見た目を切り替えるのがバリアント。
                </p>
              </div>

              {/* Dev Mode */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">DM</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Dev Mode</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  エンジニア向けの表示モード。要素を選択すると CSS / iOS / Android のコードを確認できる。
                  スペーシング、カラーコード、フォントサイズの正確な値が取得可能。
                </p>
              </div>
            </div>

            {/* Figma → CSS の対応図 */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">Figma プロパティ → CSS 対応表</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-3 bg-card rounded-lg px-4 py-2.5 border border-border">
                  <span className="text-muted-foreground min-w-[120px]">Auto Layout direction</span>
                  <span className="text-primary font-mono">flex-direction</span>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg px-4 py-2.5 border border-border">
                  <span className="text-muted-foreground min-w-[120px]">Item spacing</span>
                  <span className="text-primary font-mono">gap</span>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg px-4 py-2.5 border border-border">
                  <span className="text-muted-foreground min-w-[120px]">Padding</span>
                  <span className="text-primary font-mono">padding</span>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg px-4 py-2.5 border border-border">
                  <span className="text-muted-foreground min-w-[120px]">Fill</span>
                  <span className="text-primary font-mono">background-color</span>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg px-4 py-2.5 border border-border">
                  <span className="text-muted-foreground min-w-[120px]">Stroke</span>
                  <span className="text-primary font-mono">border</span>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg px-4 py-2.5 border border-border">
                  <span className="text-muted-foreground min-w-[120px]">Corner radius</span>
                  <span className="text-primary font-mono">border-radius</span>
                </div>
              </div>
            </div>
          </section>

          {/* セクション 3: プロトタイピング機能 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Figma のプロトタイピング機能</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Figma のプロトタイプモードでは、画面遷移やマイクロインタラクションをコードなしで定義できます。
              ユーザーテストやステークホルダーへのデモに活用します。
            </p>

            {/* インタラクション設定 */}
            <div className="space-y-6 mb-6">
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-3">インタラクション設定</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  要素を選択し、プロトタイプタブでトリガーとアクションを設定します。
                </p>
                {/* Visual: Interaction flow */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="bg-primary/10 text-primary font-medium px-3 py-2 rounded-lg border border-primary/20">
                    トリガー
                  </div>
                  <span className="text-muted-foreground">→</span>
                  <div className="bg-muted text-foreground px-3 py-2 rounded-lg border border-border">
                    On Click / On Hover / On Drag / While Pressing
                  </div>
                  <span className="text-muted-foreground">→</span>
                  <div className="bg-primary/10 text-primary font-medium px-3 py-2 rounded-lg border border-primary/20">
                    アクション
                  </div>
                  <span className="text-muted-foreground">→</span>
                  <div className="bg-muted text-foreground px-3 py-2 rounded-lg border border-border">
                    Navigate To / Open Overlay / Back / Scroll To
                  </div>
                </div>
              </div>

              {/* スマートアニメート */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-3">スマートアニメート</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  同名のレイヤーの位置・サイズ・色の差分を自動で補間してアニメーションを生成する機能。
                  トランジションの種類に「Smart Animate」を指定するだけで、自然な遷移が実現できる。
                  タブ切り替え、カルーセル、アコーディオンの動きを表現するのに有効。
                </p>
              </div>

              {/* オーバーレイ */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-3">オーバーレイ</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  モーダル、ドロップダウンメニュー、ツールチップなど、画面の上に重ねて表示する UI を作成できる。
                  「Open Overlay」アクションで呼び出し、背景クリックで閉じる設定も可能。
                </p>
                <div className="bg-muted/30 rounded-lg p-4 text-sm">
                  <p className="text-foreground font-medium mb-2">オーバーレイの設定項目:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>表示位置（Center / Top / Bottom / Manual）</li>
                    <li>背景の暗転（Close when clicking outside）</li>
                    <li>アニメーション（Dissolve / Move In / Slide In）</li>
                  </ul>
                </div>
              </div>

              {/* 条件分岐 */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-3">条件分岐（Variables + Conditionals）</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Figma の変数機能を使い、ボタン押下時に変数を更新し、
                  その値に応じて遷移先を切り替えることができる。
                  ログイン済み / 未ログインで画面を分岐させるようなフローの表現に使う。
                  コード上の <code className="text-sm bg-muted px-1.5 py-0.5 rounded">if</code> 文に相当する概念。
                </p>
              </div>
            </div>

            {/* Visual: プロトタイプ作成フロー */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">プロトタイプの作成ステップ</h3>
              <div className="flex flex-wrap gap-3 items-center text-sm">
                {[
                  { step: '1', label: '画面を作成' },
                  { step: '2', label: 'Prototype タブを開く' },
                  { step: '3', label: '要素からドラッグで接続' },
                  { step: '4', label: 'トリガー / アクション設定' },
                  { step: '5', label: 'プレビューで確認' },
                ].map((item, i) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5">
                      <span className="text-xl font-medium text-primary/50 w-8 text-center shrink-0">
                        {item.step}
                      </span>
                      <span className="text-foreground font-medium">{item.label}</span>
                    </div>
                    {i < 4 && <span className="text-muted-foreground hidden sm:inline">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* セクション 4: Figma → コード変換ワークフロー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Figma → コード変換ワークフロー</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Figma のデザインを React コンポーネントに変換する際の実践的な手順を整理します。
              Dev Mode を活用することで、デザインとコードの齟齬を減らせます。
            </p>

            {/* Visual: Workflow diagram */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: 'Dev Mode でスペック確認',
                    desc: '要素を選択 → CSS / Tailwind クラスを取得。カラーコード、フォントサイズ、スペーシングを正確に読み取る。',
                  },
                  {
                    title: 'コンポーネント構造の把握',
                    desc: 'レイヤーパネルのツリー構造を確認 → React のコンポーネント分割を決める。バリアントは props にマッピング。',
                  },
                  {
                    title: 'スタイルの適用',
                    desc: 'Figma の値を Tailwind ユーティリティクラスに変換。デザイントークン（CSS 変数）経由で色・フォントを管理。',
                  },
                  {
                    title: 'レスポンシブ対応',
                    desc: 'Figma のフレームサイズ別デザインを確認 → Tailwind のブレークポイント（sm / md / lg）でレイアウトを切り替え。',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 text-xl font-medium text-primary/50 w-8 text-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-card border border-border rounded-lg px-4 py-3">
                      <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <InfoBox type="info" title="Tailwind CSS の出力オプション">
              <p>
                Figma の Dev Mode では、CSS の他に Tailwind CSS のクラス名を直接出力できます。
                プロジェクトで Tailwind を使っている場合は、この出力をそのまま活用すると効率的です。
                ただし、プロジェクト固有のデザイントークン（CSS 変数）がある場合は、
                Figma の生の値をトークンに読み替える必要があります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: AI を活用したプロトタイピング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">AI を活用したプロトタイピング</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AI ツールを組み合わせることで、デザインからコードへの変換を加速できます。
              それぞれのツールの得意領域を理解して使い分けることが重要です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2 text-sm">Figma AI</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Figma 内蔵の AI 機能。テキストやレイアウトの自動生成、
                  デザインの提案を行う。プロトタイプの初期段階で活用できる。
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2 text-sm">v0 (Vercel)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  テキストプロンプトから React + Tailwind のコードを生成。
                  Figma のスクリーンショットを入力として使うこともできる。
                  コードプロトタイプの作成を高速化する。
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2 text-sm">Claude + Figma MCP</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Claude Code から Figma のデザインデータを直接読み取り、
                  コンポーネントコードを生成する。Dev Mode の情報を AI が解釈してコードに変換する。
                </p>
              </div>
            </div>

            <InfoBox type="warning" title="AI 生成コードの扱い">
              <p>
                AI が生成したコードはそのまま使うのではなく、プロジェクトのコーディング規約や
                コンポーネント設計に合わせて調整する必要があります。
                特にアクセシビリティ（aria 属性、キーボード操作）は人の目で確認してください。
              </p>
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <Quiz
            question="Figma のオートレイアウトは、CSS のどのプロパティに対応しますか？"
            options={[
              { label: 'display: grid' },
              { label: 'display: flex', correct: true },
              { label: 'position: absolute' },
              { label: 'float: left' },
            ]}
            explanation="Figma のオートレイアウトは CSS の Flexbox に対応しています。direction は flex-direction、Item spacing は gap、Padding はそのまま padding に変換されます。Grid レイアウトに対応する機能は、Figma では別途「Grid layout」として提供されています。"
          />

          {/* Quiz 2 */}
          <Quiz
            question="Figma でモーダルやドロップダウンを実装する際に使用するプロトタイプアクションはどれですか？"
            options={[
              { label: 'Navigate To' },
              { label: 'Scroll To' },
              { label: 'Open Overlay', correct: true },
              { label: 'Smart Animate' },
            ]}
            explanation="モーダルやドロップダウンなど、現在の画面の上に重ねて表示する UI には「Open Overlay」アクションを使用します。Navigate To は画面遷移、Scroll To はページ内スクロール、Smart Animate はトランジションの種類です。"
          />

          {/* リファレンスリンク */}
          <ReferenceLinks
            links={[
              {
                title: 'Figma Prototyping - 公式ドキュメント',
                url: 'https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma',
                description: 'プロトタイプ機能の公式ガイド',
              },
              {
                title: 'Figma Dev Mode',
                url: 'https://www.figma.com/dev-mode/',
                description: 'エンジニア向け開発モードの概要',
              },
              {
                title: 'Figma Variables - 公式ドキュメント',
                url: 'https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma',
                description: '変数と条件分岐の設定方法',
              },
              {
                title: 'Model Context Protocol',
                url: 'https://modelcontextprotocol.io/',
                description: 'MCP の公式ドキュメント',
              },
            ]}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
