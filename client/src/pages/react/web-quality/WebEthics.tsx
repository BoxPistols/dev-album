import CodeBlock from '@/components/CodeBlock';
import CodePreview from '@/components/CodePreview';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';

export default function WebEthics() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 69</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">ダークパターン回避と技術倫理</h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          技術者は「何を作れるか」だけでなく「何を作るべきか」を考える責任があります。
          ユーザーを騙すダークパターンの手法を理解し、アクセシビリティ・公益性・透明性を
          備えた倫理的な Web 開発の実践方法を学びます。
        </p>

        <WhyNowBox tags={['ダークパターン', '技術倫理', 'アクセシビリティ', 'WCAG', '公益性', 'Core Web Vitals']}>
          <p>
            フロントエンド開発の技術力が上がるほど、ユーザーの行動を誘導する力も強くなります。
            その力をユーザーの利益のために使うか、企業の短期的な利益のために使うかは、
            技術者の倫理観にかかっています。
            EU の GDPR やデジタルサービス法、日本の特定商取引法改正など、
            ダークパターンに対する法規制は世界的に強化されています。
            「知らなかった」では済まされない時代に、基本的な知識を確認します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* セクション 1: ダークパターンとは */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">ダークパターンとは</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ダークパターン（Dark Patterns）とは、ユーザーが意図しない行動をとるよう巧妙に設計された
              UI/UX パターンのことです。2010 年に UX デザイナーの Harry Brignull が提唱し、
              現在は「Deceptive Design Patterns（欺瞞的デザインパターン）」とも呼ばれています。
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              ダークパターンは一時的にコンバージョン率を上げることがありますが、
              長期的にはユーザーの信頼を失い、ブランド価値を毀損します。
              さらに法的リスクも高まっており、EU のデジタルサービス法（DSA）では
              ダークパターンの使用が明確に禁止されています。
            </p>

            <InfoBox type="warning" title="法的規制の動向">
              <p>
                2022 年の EU デジタルサービス法（DSA）はダークパターンを明示的に禁止しました。
                米国 FTC もダークパターンに対する取り締まりを強化しており、
                2023 年には大手企業に対して数百万ドル規模の制裁金を科しています。
                日本でも 2022 年の特定商取引法改正により、
                通信販売における誤認させるような表示が規制対象となりました。
                技術者も「言われた通りに実装しただけ」では責任を免れない時代です。
              </p>
            </InfoBox>
          </section>

          {/* セクション 2: 代表的なダークパターン 10 種 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">代表的なダークパターン 10 種</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              Harry Brignull が分類した代表的なダークパターンを解説します。
              それぞれの手法を知ることで、自分のプロダクトに同様のパターンが
              紛れ込んでいないかチェックできるようになります。
            </p>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">1. Trick Questions（誤解させる質問）</h3>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                フォームの質問文を紛らわしく書くことで、ユーザーが意図しない選択をするよう誘導します。
                二重否定やチェックボックスの意味の反転が典型的な手口です。
              </p>
              <CodeBlock
                language="html"
                title="悪い例 vs 倫理的な実装"
                code={`<!-- ダークパターン: 二重否定 -->
<label>
  <input type="checkbox" name="no-unsubscribe" />
  メールマガジンの配信を停止しないことに同意しない場合は
  チェックを外してください
</label>

<!-- 倫理的な実装: 明確な意思表示 -->
<label>
  <input type="checkbox" name="subscribe" />
  メールマガジンを受け取る
</label>`}
              />
            </div>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">2. Sneak into Basket（こっそりカートに追加）</h3>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                ユーザーが選択していない商品やサービスを購入プロセスの途中でカートに追加します。
                保険や延長保証が事前にチェック済みで表示されるケースが該当します。
              </p>
              <CodeBlock
                language="tsx"
                title="悪い例 vs 倫理的な実装"
                code={`// ダークパターン: 追加商品がデフォルトでチェック済み
function CheckoutPage() {
  const [warranty, setWarranty] = useState(true); // デフォルト true
  return (
    <small style={{ color: '#999' }}>
      <input type="checkbox" checked={warranty}
        onChange={() => setWarranty(!warranty)} />
      延長保証（+3,000円）
    </small>
  );
}

// 倫理的な実装: オプションはデフォルト OFF、明確に表示
function EthicalCheckout() {
  const [warranty, setWarranty] = useState(false); // デフォルト false
  return (
    <section aria-label="オプションサービス">
      <h3>オプションサービス</h3>
      <label className="flex items-center gap-2 p-3 border rounded">
        <input type="checkbox" checked={warranty}
          onChange={() => setWarranty(!warranty)} />
        <span>延長保証を追加する（+3,000円/年）</span>
      </label>
    </section>
  );
}`}
              />
            </div>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">3. Roach Motel（入りやすく抜けにくい）</h3>
              <p className="text-foreground/80 leading-relaxed">
                サービスへの登録は簡単なのに、退会・解約の手続きが極端に複雑で見つけにくいパターンです。
                アカウント削除を設定画面の奥深くに隠したり、電話でしか解約を受け付けないケースが該当します。
                EU の GDPR は「同意の撤回は同意と同じくらい簡単であるべき」と明記しています。
              </p>
            </div>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">4. Privacy Zuckering（プライバシー設定の複雑化）</h3>
              <p className="text-foreground/80 leading-relaxed">
                プライバシー設定を意図的に複雑にし、ユーザーが想定以上の個人情報を共有してしまうよう仕向けます。
                設定画面を何階層にも分け、デフォルトで「全公開」にしておく手法が典型的です。
                名前の由来は Facebook（現 Meta）の CEO に因みます。
              </p>
            </div>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">5. Price Comparison Prevention（比較困難にする）</h3>
              <p className="text-foreground/80 leading-relaxed">
                商品やプランの価格を比較しにくくするパターンです。
                異なる単位（月額 vs 年額 vs 日割り）で表示したり、プランごとに含まれる機能の表記を微妙に変えたりします。
                倫理的な設計では、全プランを同じ単位で並べて比較表を提供します。
              </p>
            </div>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">6. Misdirection（注意をそらす）</h3>
              <p className="text-foreground/80 leading-relaxed">
                大きなボタンや派手なアニメーションで注意を引きつけ、その裏で追加料金の説明やチェックボックスをさりげなく配置します。
                視覚的な階層構造（ビジュアルヒエラルキー）を悪用したデザインです。
              </p>
            </div>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">7. Hidden Costs（隠れたコスト）</h3>
              <p className="text-foreground/80 leading-relaxed">
                購入プロセスの最終段階で初めて手数料・送料・サービス料を表示するパターンです。
                ユーザーがすでに購入の意思決定をしているというサンクコスト効果を利用しています。
                倫理的な設計では、商品一覧の段階から総額を表示します。
              </p>
            </div>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">8. Bait and Switch（おとり商法）</h3>
              <p className="text-foreground/80 leading-relaxed">
                ユーザーがある操作を期待してアクションを起こすと、実際には別の結果になるパターンです。
                「閉じる」ボタンを押すとアプリがインストールされたり、「無料で始める」をクリックすると有料プランの申込ページに遷移したりします。
              </p>
            </div>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">9. Confirmshaming（断ることを恥ずかしくさせる）</h3>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                オファーを断る選択肢に、罪悪感や恥ずかしさを感じさせる文言を使うパターンです。
              </p>
              <CodeBlock
                language="tsx"
                title="悪い例 vs 倫理的な実装"
                code={`// ダークパターン: 拒否を恥ずかしくさせる
<button className="btn-primary btn-large">
  はい、お得に買い物したいです！
</button>
<button className="btn-text btn-small text-gray-400">
  いいえ、定価で買いたいです...
</button>

// 倫理的な実装: 対等な選択肢
<div className="flex gap-3">
  <button className="btn-primary">登録する</button>
  <button className="btn-secondary">今はやめておく</button>
</div>`}
              />
              <CodePreview
                code={`function ConfirmshamingComparison() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px' }}>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-danger)', fontWeight: 'bold', marginBottom: '8px' }}>NG: Confirmshaming</p>
        <div style={{ background: 'var(--bg-muted)', padding: '20px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>期間限定 30% OFF!</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>今だけの特別オファーです</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <button style={{ padding: '12px 32px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', width: '100%', maxWidth: '300px' }}>はい、お得に買い物したいです!</button>
            <button style={{ padding: '6px 12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', opacity: 0.6 }}>いいえ、定価で損してもいいです...</button>
          </div>
        </div>
      </div>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-success)', fontWeight: 'bold', marginBottom: '8px' }}>OK: 対等な選択肢</p>
        <div style={{ background: 'var(--bg-muted)', padding: '20px', borderRadius: '8px', textAlign: 'center', color: 'var(--text)' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>期間限定 30% OFF!</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>今だけの特別オファーです</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button style={{ padding: '10px 24px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>クーポンを受け取る</button>
            <button style={{ padding: '10px 24px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', background: 'var(--bg)', color: 'var(--text)' }}>今はやめておく</button>
          </div>
        </div>
      </div>
    </div>
  );
}`}
                language="tsx"
                title="Confirmshaming: ダークパターン vs 対等な選択肢"
              />
            </div>

            <div className="rounded-lg border border-border p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">10. Forced Continuity（自動継続課金）</h3>
              <p className="text-foreground/80 leading-relaxed">
                無料トライアル終了後、明確な通知なしに有料プランへ自動移行するパターンです。
                解約方法を分かりにくくしたり、終了日を目立たない場所にだけ表示します。
                倫理的な実装では、終了数日前にリマインドメールを送り、ワンクリックで解約できる導線を提供します。
              </p>
            </div>

            <InfoBox type="info" title="ダークパターンの見分け方">
              <p>
                「ユーザーが本当にこの操作を意図しているか？」を常に問いかけましょう。
                もしユーザーが UI の仕組みを完全に理解していたら同じ行動をとるか、
                という観点で自分の実装を振り返ることが重要です。
                deceptive.design（旧 darkpatterns.org）には実例のデータベースがあり、セルフチェックに役立ちます。
              </p>
            </InfoBox>
          </section>

          {/* セクション 3: Cookie バナーのダークパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Cookie バナーのダークパターン</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              GDPR の施行以降、Cookie 同意バナーは Web サイトに不可欠な要素となりましたが、
              多くのサイトでダークパターンが使われています。
              「全て受け入れる」ボタンだけを目立つ色で大きく表示し、
              「拒否」を小さなテキストリンクにしたり、拒否するために何段階もの設定画面を操作させるケースが典型です。
            </p>

            <CodeBlock
              language="tsx"
              title="Cookie バナー: ダークパターン vs 倫理的な実装"
              code={`// ダークパターン: 受諾だけ目立たせ、拒否を隠す
function DarkCookieBanner() {
  return (
    <div className="fixed bottom-0 w-full bg-white p-4 shadow-lg">
      <p className="text-sm">当サイトでは Cookie を使用しています。</p>
      <button className="bg-blue-600 text-white px-6 py-3 text-lg font-bold">
        すべて受け入れる
      </button>
      <button className="text-xs text-gray-400 underline">設定を管理</button>
      {/* 「すべて拒否」ボタンが存在しない */}
    </div>
  );
}

// 倫理的な実装: 受諾と拒否を対等に扱う
function EthicalCookieBanner() {
  return (
    <div className="fixed bottom-0 w-full bg-white p-4 shadow-lg"
         role="dialog" aria-label="Cookie の設定">
      <p className="text-sm mb-3">
        当サイトでは分析・広告目的で Cookie を使用しています。
        <a href="/privacy" className="underline">プライバシーポリシー</a>
      </p>
      <div className="flex gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          すべて受け入れる
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
          すべて拒否する
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded">
          設定をカスタマイズ
        </button>
      </div>
    </div>
  );
}`}
            />

            <CodePreview
              code={`function CookieBannerComparison() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px' }}>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-danger)', fontWeight: 'bold', marginBottom: '8px' }}>NG: ダークパターン</p>
        <div style={{ background: 'var(--bg-muted)', padding: '16px', borderRadius: '8px', fontSize: '14px', color: 'var(--text)' }}>
          <p style={{ marginBottom: '12px' }}>Cookie を使用しています</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ padding: '10px 24px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>すべて受け入れる</button>
            <button style={{ padding: '10px 12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>設定</button>
          </div>
        </div>
      </div>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-success)', fontWeight: 'bold', marginBottom: '8px' }}>OK: 公平なデザイン</p>
        <div style={{ background: 'var(--bg-muted)', padding: '16px', borderRadius: '8px', fontSize: '14px', color: 'var(--text)' }}>
          <p style={{ marginBottom: '12px' }}>Cookie を使用しています</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button style={{ padding: '10px 24px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', background: 'var(--bg)', color: 'var(--text)', fontSize: '14px' }}>必要なもののみ</button>
            <button style={{ padding: '10px 24px', background: 'var(--text-accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>すべて受け入れる</button>
            <button style={{ padding: '10px 24px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', background: 'var(--bg)', color: 'var(--text)', fontSize: '14px' }}>設定</button>
          </div>
        </div>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="Cookie バナー: ダークパターン vs 公平なデザイン"
            />

            <InfoBox type="warning" title="フランスの CNIL による制裁事例">
              <p>
                フランスのデータ保護機関 CNIL は、Cookie バナーで「すべて拒否」ボタンを
                「すべて受け入れる」と同等の目立ちやすさで提供しなかったとして、
                Google に 1 億 5,000 万ユーロ、Facebook に 6,000 万ユーロの制裁金を科しました。
                Cookie バナーの設計は法的リスクに直結する問題です。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック 1 */}
          <section>
            <Quiz
              question="以下のうち、ダークパターン『Confirmshaming（断ることを恥ずかしくさせる）』に該当するものはどれですか？"
              options={[
                { label: '無料トライアル終了後に通知なしで有料プランに移行する' },
                { label: '購入手続きの最終段階で初めて送料を表示する' },
                { label: 'オファーを断るボタンに「いいえ、損してもいいです」と書く', correct: true },
                { label: 'プライバシー設定をデフォルトで全公開にする' },
              ]}
              explanation="Confirmshaming は、ユーザーがオファーを断る際に罪悪感や恥ずかしさを感じさせる文言を使うパターンです。「いいえ、損してもいいです」のような文言は典型例です。他の選択肢はそれぞれ Forced Continuity、Hidden Costs、Privacy Zuckering に該当します。"
            />
          </section>

          {/* セクション 4: 技術者としての倫理観 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">技術者としての倫理観</h2>

            <h3 className="text-xl font-semibold text-foreground mb-3">アクセシビリティは権利であり、オプションではない</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Web アクセシビリティは「あると嬉しい機能」ではなく、すべてのユーザーがデジタル情報にアクセスするための基本的な権利です。
              世界人口の約 15%（約 10 億人）が何らかの障害を持っているとされ、高齢化社会においてその重要性は増す一方です。
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">WCAG 2.2 準拠の意義</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Web Content Accessibility Guidelines（WCAG）は、W3C が策定した Web アクセシビリティの国際標準です。
              WCAG 2.2 は 2023 年 10 月に勧告され、4 つの主要原則に基づいています。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-bold text-foreground mb-2">1. 知覚可能（Perceivable）</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  情報と UI コンポーネントが、ユーザーが知覚できる方法で提示されること。
                  画像の代替テキスト、動画の字幕、十分なコントラスト比の確保など。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-bold text-foreground mb-2">2. 操作可能（Operable）</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  UI コンポーネントとナビゲーションが操作可能であること。
                  キーボードのみで全機能を操作可能、十分な操作時間の確保など。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-bold text-foreground mb-2">3. 理解可能（Understandable）</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  情報と UI の操作が理解可能であること。
                  読みやすいテキスト、予測可能な動作、入力エラー時の支援など。
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-bold text-foreground mb-2">4. 堅牢（Robust）</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  コンテンツが支援技術を含む多様なユーザーエージェントで確実に解釈できること。
                  正しい HTML マークアップ、ARIA の適切な使用など。
                </p>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              title="アクセシビリティを考慮したフォーム実装"
              showLineNumbers
              code={`function AccessibleForm() {
  const [error, setError] = useState('');

  return (
    <form aria-label="お問い合わせフォーム" noValidate>
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">
          メールアドレス
          <span aria-label="必須" className="text-red-600 ml-1">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          aria-required="true"
          aria-describedby={error ? 'email-error' : 'email-hint'}
          aria-invalid={error ? 'true' : undefined}
          className="w-full border rounded p-2"
        />
        <p id="email-hint" className="text-sm text-gray-600 mt-1">
          確認メールを送信します
        </p>
        {error && (
          <p id="email-error" role="alert" className="text-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        送信する
      </button>
    </form>
  );
}`}
            />

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">障害者差別解消法との関係</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              日本の障害者差別解消法は 2024 年 4 月の改正法施行により、民間事業者にも合理的配慮の提供が義務化されました。
              Web サービスにおいてアクセシビリティ対応を怠ることは、合理的配慮の不提供として法的問題となる可能性があります。
              デジタル庁は「ウェブアクセシビリティ導入ガイドブック」を公開しており、
              公共機関の Web サイトでは WCAG 2.1 AA 以上の準拠が実質的な要件です。
            </p>

            <InfoBox type="info" title="合理的配慮とは">
              <p>
                合理的配慮とは、障害のある人が他の人と同等にサービスを利用できるよう、
                過度な負担にならない範囲で必要な調整を行うことです。
                スクリーンリーダー対応、キーボード操作対応、適切なコントラスト比の確保などが具体例です。
                「予算がない」「工数がない」は合理的配慮を拒否する正当な理由にはなりにくいとされています。
              </p>
            </InfoBox>
          </section>

          {/* セクション 5: 公共性と公益性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">公共性と公益性</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Web はその誕生以来「すべての人に開かれた情報空間」であることを理念としてきました。
              特に公共サービスの Web サイトは、全市民が平等にアクセスできることが大前提です。
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">多言語対応と低速回線への配慮</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              日本に住む外国籍の住民は約 300 万人（2024 年時点）であり、
              公共サービスが日本語のみで提供されていることは大きな障壁です。
              また、地方のモバイル回線や古いデバイスを使用しているユーザーにとって、重いページは事実上アクセス不能になります。
            </p>

            <CodeBlock
              language="tsx"
              title="多言語対応と画像の最適化"
              showLineNumbers
              code={`// 言語切替: ページの情報をすべてのユーザーに届ける
function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();
  return (
    <nav aria-label={t('languageSelector')}>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}
        aria-label={t('selectLanguage')}>
        <option value="ja">日本語</option>
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="ko">한국어</option>
        <option value="pt">Portugues</option>
        <option value="vi">Tieng Viet</option>
      </select>
    </nav>
  );
}

// 画像の最適化: 低速回線でも閲覧可能に
function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <picture>
      <source srcSet={\`\${src}?w=800&format=avif\`} type="image/avif" />
      <source srcSet={\`\${src}?w=600&format=webp\`} type="image/webp" />
      <img src={\`\${src}?w=400&quality=75\`} alt={alt}
        loading="lazy" decoding="async" className="w-full h-auto" />
    </picture>
  );
}`}
            />

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">パフォーマンスバジェットの考え方</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              パフォーマンスバジェットとは、ページの読み込み速度に関する上限値をチームで事前に設定する手法です。
              「JavaScript の合計サイズは 200KB 以下」「LCP は 2.5 秒以内」のように具体的な数値で上限を定め、
              それを超える変更は差し戻す仕組みを作ります。
            </p>

            <CodeBlock
              language="json"
              title="パフォーマンスバジェットの設定例"
              code={`{
  "budgets": [
    { "resourceType": "script", "budget": 200, "unit": "KB" },
    { "resourceType": "image", "budget": 500, "unit": "KB" },
    { "metric": "largest-contentful-paint", "budget": 2500, "unit": "ms" },
    { "metric": "cumulative-layout-shift", "budget": 0.1 },
    { "metric": "total-blocking-time", "budget": 300, "unit": "ms" }
  ]
}`}
            />

            <InfoBox type="info" title="Web は公共インフラである">
              <p>
                Tim Berners-Lee（Web の発明者）は「Web は人類全体のためのもの」と繰り返し述べています。
                行政手続きのオンライン化が進む中、Web サイトのパフォーマンスやアクセシビリティの問題は
                「デジタルデバイド（情報格差）」に直結します。
              </p>
            </InfoBox>
          </section>

          {/* 理解度チェック 2 */}
          <section>
            <Quiz
              question="WCAG 2.2 の 4 つの主要原則に含まれないものはどれですか？"
              options={[
                { label: '知覚可能（Perceivable）' },
                { label: '効率的（Efficient）', correct: true },
                { label: '理解可能（Understandable）' },
                { label: '堅牢（Robust）' },
              ]}
              explanation="WCAG 2.2 の 4 つの主要原則は「知覚可能（Perceivable）」「操作可能（Operable）」「理解可能（Understandable）」「堅牢（Robust）」です。頭文字をとって POUR と覚えます。「効率的（Efficient）」は WCAG の原則には含まれていません。効率性はユーザビリティの指標としては重要ですが、アクセシビリティの基本原則とは別の概念です。"
            />
          </section>

          {/* セクション 6: 実装で避けるべきパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実装で避けるべきパターン</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              以下は、技術的には実装可能でも倫理的に避けるべきパターンです。
              ビジネス側から要求された場合でも、ユーザーの利益を守る立場から代替案を提案する姿勢が求められます。
            </p>

            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10 p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">解約を電話でしか受け付けない</h3>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                オンラインで登録できるサービスの解約を電話のみに限定するのは Roach Motel パターンの典型です。
              </p>
              <CodeBlock
                language="tsx"
                title="倫理的な解約フロー"
                code={`function CancelSubscription() {
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div>
      <h2>サブスクリプションの解約</h2>
      <label htmlFor="cancel-reason">解約理由（任意）</label>
      <select id="cancel-reason" value={reason}
        onChange={(e) => setReason(e.target.value)}>
        <option value="">選択してください</option>
        <option value="expensive">料金が高い</option>
        <option value="not-using">利用頻度が低い</option>
      </select>

      <label className="flex items-center gap-2 mt-4">
        <input type="checkbox" checked={confirmed}
          onChange={() => setConfirmed(!confirmed)} />
        特典が失われることを理解しました
      </label>

      <button disabled={!confirmed}
        className="bg-red-600 text-white px-4 py-2 rounded mt-4">
        解約する
      </button>
      <p className="text-sm text-gray-600 mt-2">
        解約後も今月末までサービスをご利用いただけます。
      </p>
    </div>
  );
}`}
              />
              <CodePreview
                code={`function CancelFlowComparison() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px' }}>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-danger)', fontWeight: 'bold', marginBottom: '8px' }}>NG: 解約ボタンを隠す</p>
        <div style={{ background: 'var(--bg-muted)', padding: '20px', borderRadius: '8px', color: 'var(--text)' }}>
          <p style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>アカウント設定</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: '6px', fontSize: '14px', border: '1px solid var(--border)' }}>プロフィール編集</div>
            <div style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: '6px', fontSize: '14px', border: '1px solid var(--border)' }}>通知設定</div>
            <div style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: '6px', fontSize: '14px', border: '1px solid var(--border)' }}>支払い情報</div>
            <details style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
              <summary style={{ cursor: 'pointer' }}>その他のオプション...</summary>
              <div style={{ marginTop: '8px', paddingLeft: '12px' }}>
                <details style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  <summary style={{ cursor: 'pointer' }}>アカウントについて</summary>
                  <p style={{ marginTop: '6px', fontSize: '10px', color: 'var(--text-muted)', opacity: 0.5 }}>解約はお電話のみ受付: 0120-XXX-XXX（平日10-17時）</p>
                </details>
              </div>
            </details>
          </div>
        </div>
      </div>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-success)', fontWeight: 'bold', marginBottom: '8px' }}>OK: 明確な解約導線</p>
        <div style={{ background: 'var(--bg-muted)', padding: '20px', borderRadius: '8px', color: 'var(--text)' }}>
          <p style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>アカウント設定</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: '6px', fontSize: '14px', border: '1px solid var(--border)' }}>プロフィール編集</div>
            <div style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: '6px', fontSize: '14px', border: '1px solid var(--border)' }}>通知設定</div>
            <div style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: '6px', fontSize: '14px', border: '1px solid var(--border)' }}>支払い情報</div>
            <div style={{ borderTop: '1px solid var(--border)', marginTop: '8px', paddingTop: '12px' }}>
              <button style={{ padding: '10px 20px', background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>サブスクリプションを解約する</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`}
                language="tsx"
                title="解約フロー: 隠されたボタン vs 明確な導線"
              />
            </div>

            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10 p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">無限スクロールで「底」を見せない</h3>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                フッターのプライバシーポリシーや利用規約にアクセスできなくなり、
                「終わり」を認識できないためスクリーン時間の過度な増加を招きます。
              </p>
              <CodeBlock
                language="tsx"
                title="倫理的なフィード: 明示的な追加読み込み"
                code={`function EthicalFeed({ items }: { items: Item[] }) {
  const [page, setPage] = useState(1);
  const perPage = 20;
  const displayed = items.slice(0, page * perPage);
  const hasMore = displayed.length < items.length;

  return (
    <div>
      <ul>
        {displayed.map((item) => (
          <li key={item.id}><FeedItem item={item} /></li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={() => setPage(page + 1)}
          className="w-full py-3 border rounded mt-4">
          さらに {perPage} 件を表示（残り {items.length - displayed.length} 件）
        </button>
      )}
      <footer className="mt-8 py-4 border-t">
        <a href="/privacy">プライバシーポリシー</a>
        <a href="/terms">利用規約</a>
      </footer>
    </div>
  );
}`}
              />
            </div>

            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10 p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">通知の過剰表示</h3>
              <p className="text-foreground/80 leading-relaxed">
                「通知を許可しますか？」のダイアログをページ表示直後に出したり、通知頻度をユーザーが制御できなかったりするケースです。
                倫理的な実装では、ユーザーが価値を理解してから通知の許可を求め、頻度や種類を細かく設定できるようにします。
              </p>
            </div>

            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10 p-5 mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">ダークモード未対応で目に負担をかける</h3>
              <p className="text-foreground/80 mb-3 leading-relaxed">
                ダークモードは単なるデザインの好みではなく、目の疲れの軽減、OLED ディスプレイでのバッテリー節約、光過敏症のユーザーへの配慮です。
              </p>
              <CodeBlock
                language="css"
                title="システム設定に応じたダークモード・モーション軽減対応"
                code={`:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a2e;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a2e;
    --text-primary: #e2e8f0;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
              />
            </div>

            <InfoBox type="warning" title="ビジネス要件との向き合い方">
              <p>
                「解約率を下げるために解約フローを複雑にしてほしい」といった要求を受けることがあります。
                そのような場合は、短期的な数値改善と長期的なユーザー信頼の喪失をデータで比較して代替案を提示しましょう。
                法的リスクを具体的に示すことも効果的です。
                それでも要求が変わらない場合は、書面で記録を残しておくことが自身を守る手段になります。
              </p>
            </InfoBox>
          </section>

          {/* セクション 7: 技術選定の倫理 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">技術選定の倫理</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              技術選定そのものにも倫理的な側面があります。
              不要なライブラリの導入、過度なトラッキング、サードパーティスクリプトの無秩序な追加は、
              ユーザー体験を劣化させ、プライバシーを侵害する可能性があります。
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">不要な JavaScript の肥大化</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              JavaScript のバンドルサイズが増加すると Core Web Vitals（LCP、INP、CLS）が悪化します。
              低スペックデバイスや低速回線のユーザーにとって、巨大な JavaScript は深刻なアクセシビリティの問題です。
            </p>

            <CodeBlock
              language="tsx"
              title="バンドルサイズを意識した実装"
              showLineNumbers
              code={`// 悪い例: 巨大ライブラリをまるごとインポート
import _ from 'lodash';           // ~70KB gzipped
import moment from 'moment';      // ~67KB gzipped
const formatted = moment().format('YYYY-MM-DD');

// 倫理的な実装: ネイティブ API で代替
const formatted = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());

// どうしても必要なら tree-shakeable なものを選ぶ
import { format } from 'date-fns'; // ~2KB
const formatted2 = format(new Date(), 'yyyy-MM-dd');

// 重いコンポーネントは動的インポート
const Chart = lazy(() => import('./Chart'));`}
            />

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">トラッキングの透明性</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              どのようなデータを収集し、何の目的で使用するかをユーザーに明示せずにトラッキングすることは倫理的に問題です。
              必要以上に詳細なデータを収集する「データの過剰収集」も避けるべきです。
            </p>

            <CodeBlock
              language="tsx"
              title="透明性のあるアナリティクス実装"
              showLineNumbers
              code={`function useEthicalAnalytics() {
  const { consent } = useCookieConsent();

  const track = useCallback((event: string, data?: Record<string, unknown>) => {
    // 明示的に同意していない場合はトラッキングしない
    if (!consent.analytics) return;

    // 個人を特定できる情報は送信しない
    const sanitizedData = { ...data };
    analytics.track(event, sanitizedData);
  }, [consent]);

  return { track };
}

// プライバシーに配慮した代替ツール:
// - Plausible: Cookie 不使用、GDPR 準拠
// - Fathom: シンプルでプライバシーファースト
// - umami: セルフホスト可能、軽量`}
            />

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">サードパーティスクリプトの責任</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              広告、アナリティクス、チャットウィジェットなどのサードパーティスクリプトは
              パフォーマンスに大きな影響を与えます。
              ユーザーデータが第三者に送信されていないか、セキュリティリスクがないかを確認する責任がサイト運営者にはあります。
            </p>

            <CodeBlock
              language="ts"
              title="Content Security Policy でスクリプトの出所を制限"
              code={`const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' https://cdn.example-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "connect-src 'self' https://api.example-analytics.com",
    ].join('; '),
  },
];

// 定期的に監査すべき項目:
// 1. 各スクリプトの転送サイズとメインスレッドのブロック時間
// 2. 送信先ドメインのリスト（意図しないデータ送信がないか）
// 3. Cookie の種類と有効期限
// 4. スクリプト更新時の変更内容`}
            />

            <InfoBox type="info" title="技術選定チェックリスト">
              <p>新しいライブラリやサービスを導入する前に、以下を確認しましょう。</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>このライブラリは本当に必要か？ネイティブ API で代替できないか？</li>
                <li>バンドルサイズへの影響はどの程度か？（bundlephobia.com で確認）</li>
                <li>Tree-shaking は可能か？</li>
                <li>収集するデータは必要最小限か？</li>
                <li>ユーザーの同意なしにデータが第三者に送信されていないか？</li>
                <li>低速回線・低スペックデバイスでの動作は許容範囲か？</li>
                <li>アクセシビリティに悪影響を与えないか？</li>
              </ul>
            </InfoBox>
          </section>

          {/* 理解度チェック 3 */}
          <section>
            <Quiz
              question="サードパーティスクリプトの管理において、技術者が確認すべき事項として最も適切でないものはどれですか？"
              options={[
                { label: 'スクリプトの転送サイズとメインスレッドのブロック時間' },
                { label: 'ユーザーデータが意図しない第三者に送信されていないか' },
                { label: 'スクリプト提供元の企業の株価と時価総額', correct: true },
                { label: 'Content Security Policy で出所を制限しているか' },
              ]}
              explanation="サードパーティスクリプトの管理では、パフォーマンスへの影響、プライバシーリスク、セキュリティ対策を確認する必要があります。提供元企業の株価や時価総額は技術的な管理責任とは直接関係がありません。企業の信頼性評価にはセキュリティポリシーやデータ処理契約の内容が適切です。"
            />
          </section>

          {/* セクション 8: まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ: 技術者の倫理的責任</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Web 技術者は、コードを書くという行為を通じて社会に大きな影響を与える立場にあります。
              ダークパターンの知識は「使うため」ではなく「見抜いて避けるため」に必要です。
              アクセシビリティは追加機能ではなく基本要件であり、パフォーマンスの最適化はすべてのユーザーへの敬意の表れです。
            </p>

            <div className="rounded-lg border border-border bg-muted/30 p-6 mb-6">
              <h3 className="font-bold text-foreground mb-4">倫理的な Web 開発の 5 原則</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <p className="font-semibold text-foreground">透明性</p>
                    <p className="text-sm text-foreground/80">ユーザーに対して何をしているか、なぜしているかを常に明示する</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <p className="font-semibold text-foreground">対等性</p>
                    <p className="text-sm text-foreground/80">「同意」と「拒否」、「登録」と「解約」を同じ容易さで提供する</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <p className="font-semibold text-foreground">包摂性</p>
                    <p className="text-sm text-foreground/80">障害、言語、デバイス、回線速度に関わらず、すべてのユーザーがアクセスできる</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <p className="font-semibold text-foreground">節度</p>
                    <p className="text-sm text-foreground/80">必要最小限のデータ収集、必要最小限のリソース消費を心がける</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">5</span>
                  <div>
                    <p className="font-semibold text-foreground">責任</p>
                    <p className="text-sm text-foreground/80">「要求されたから」ではなく、自分の実装がユーザーに与える影響に責任を持つ</p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="success" title="技術者としての心構え">
              <p>
                「この実装を、自分の家族や友人が使うとしたら、同じように作るだろうか？」
                この問いかけは、倫理的な判断の最もシンプルな基準です。
                技術力は中立的な道具であり、それをどう使うかは私たち技術者次第です。
                ユーザーの信頼を裏切らない、公正で透明な Web を一緒に作っていきましょう。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}