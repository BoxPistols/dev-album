import { ArrowRight, Sparkles, DollarSign, Layers, CheckCircle, Terminal, Code, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InfoBox from '@/components/InfoBox';
import { useLocation } from 'wouter';

export default function AIAgentOverview() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダーバナー */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 23 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            AI コーディング環境の全体像
          </h1>
          <p className="text-lg text-muted-foreground">
            無料〜月1,000円以下で、AIと一緒にコーディングできる環境を構築します。
            複数のツールを組み合わせて、トークン切れでも作業が止まらない体制を作りましょう。
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">

        {/* AI コーディングツールとは */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            AI コーディングツールって何？
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI コーディングツールとは、<strong className="text-foreground">AIに話しかけるだけでコードを書いたり、修正したり、質問に答えてもらえる</strong>ツールのことです。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              例えば、こんなことができます:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium mb-1">「ボタンの色を赤に変えて」</p>
                <p className="text-sm text-muted-foreground">→ AI がコードを見つけて自動で修正</p>
              </div>
              <div className="bg-muted rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium mb-1">「このエラーの原因は？」</p>
                <p className="text-sm text-muted-foreground">→ AI がコードを分析して原因を説明</p>
              </div>
              <div className="bg-muted rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium mb-1">「最新のコードを取得して」</p>
                <p className="text-sm text-muted-foreground">→ AI が git pull を実行してくれる</p>
              </div>
              <div className="bg-muted rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium mb-1">「ログインページを作って」</p>
                <p className="text-sm text-muted-foreground">→ AI がファイルを作成してコードを生成</p>
              </div>
            </div>
            <InfoBox type="info" title="コマンドを覚えなくてOK">
              Git コマンドやプログラミング言語の文法を完璧に覚えていなくても、
              日本語で指示するだけで AI が代わりにやってくれます。
              コーディングに参加するハードルが大幅に下がります。
            </InfoBox>
          </div>
        </section>

        {/* ツールの種類 */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            ツールは3タイプある
          </h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">ターミナル型</h3>
                  <p className="text-sm text-muted-foreground">コマンドラインで AI と対話する</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                ターミナル（黒い画面）で AI に話しかけるタイプ。シンプルで軽量。
                既存のエディタと組み合わせて使います。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">Claude Code</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">Gemini CLI</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">Warp（AI搭載ターミナル）</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">エディタ拡張型</h3>
                  <p className="text-sm text-muted-foreground">普段のエディタに AI 機能を追加する</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                VS Code や Cursor などのエディタ内で AI と対話するタイプ。
                コードを見ながら指示できるので直感的。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">Cursor（AI搭載エディタ）</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">Cline（VS Code 拡張）</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">クラウド IDE 型</h3>
                  <p className="text-sm text-muted-foreground">ブラウザで完結する AI 開発環境</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                ブラウザ上で動く開発環境。インストール不要で始められるのが利点。
                複数の AI エージェントを同時に動かせるものもあります。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">Google Antigravity</span>
              </div>
            </div>
          </div>
        </section>

        {/* 無料枠戦略 */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            <DollarSign className="w-8 h-8 inline text-primary mr-1" />
            ローコストで始める方法
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              各ツールには<strong className="text-foreground">無料枠</strong>があります。
              1つのツールの無料枠を使い切ったら別のツールに切り替える
              「<strong className="text-foreground">ローテーション戦略</strong>」で、ほぼ無料〜最小限のコストで運用できます。
            </p>

            {/* 比較表 */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-3 py-2.5 text-left text-foreground font-semibold">ツール</th>
                    <th className="border border-border px-3 py-2.5 text-left text-foreground font-semibold">タイプ</th>
                    <th className="border border-border px-3 py-2.5 text-left text-foreground font-semibold">無料枠</th>
                    <th className="border border-border px-3 py-2.5 text-left text-foreground font-semibold">対応 OS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Claude Code', 'ターミナル', '初回クレジット付与（$5相当）', 'Mac / Win / Linux'],
                    ['Gemini CLI', 'ターミナル', '1日1,000リクエスト無料', 'Mac / Win / Linux'],
                    ['Cursor', 'エディタ', '月50回のプレミアムリクエスト + 補完', 'Mac / Win / Linux'],
                    ['Cline', 'VS Code 拡張', '拡張自体は無料（APIキー必要）', 'Mac / Win / Linux'],
                    ['Warp', 'ターミナル', '月75回のAIリクエスト', 'Mac / Win / Linux'],
                    ['Antigravity', 'クラウド IDE', 'プレビュー期間中は無料', 'ブラウザ（OS不問）'],
                  ].map(([tool, type, free, os], index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-muted/50'}>
                      <td className="border border-border px-3 py-2.5 font-medium text-foreground">{tool}</td>
                      <td className="border border-border px-3 py-2.5 text-muted-foreground">{type}</td>
                      <td className="border border-border px-3 py-2.5 text-muted-foreground">{free}</td>
                      <td className="border border-border px-3 py-2.5 text-muted-foreground">{os}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="success" title="コスト例：月0〜750円">
              <strong>完全無料パターン:</strong> Gemini CLI（無料枠大）+ Cursor 無料枠 + Antigravity（プレビュー無料）を組み合わせれば月0円。
              <br />
              <strong>少し課金パターン:</strong> Claude Code のAPIクレジットを $5（約750円）だけ追加。
              使った分だけの従量課金なので、ライトな使い方なら月数百円で収まります。
            </InfoBox>
          </div>
        </section>

        {/* おすすめの始め方 */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            <Sparkles className="w-8 h-8 inline text-primary mr-1" />
            おすすめの始め方
          </h2>
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              以下の順番で進めることをおすすめします。
              このマニュアルでは、この順番でそれぞれのセットアップを解説していきます。
            </p>

            <div className="space-y-4">
              {[
                {
                  step: 'STEP 1',
                  title: 'Claude Code を導入する（メインツール）',
                  desc: 'まずはこれ。ターミナルから AI と対話でき、Git操作もお任せできる。コード理解の精度が最も高い。',
                  link: '/ai-agent/claude-code-setup',
                },
                {
                  step: 'STEP 2',
                  title: 'Claude Code でリポジトリ操作を体験する',
                  desc: '自分のリポジトリと接続して、fetch/pull から画面確認まで。AI コーディングの基本フローを習得。',
                  link: '/ai-agent/claude-code-basics',
                },
                {
                  step: 'STEP 3',
                  title: 'Cursor + Cline を導入する（エディタ系）',
                  desc: 'コードを見ながらAIに指示できるエディタ環境。GUI 派にはこちらがおすすめ。',
                  link: '/ai-agent/cursor-cline',
                },
                {
                  step: 'STEP 4',
                  title: '予備ツールを揃える（Gemini CLI / Warp / Antigravity）',
                  desc: 'トークン切れ対策の予備ツール。全部入れても無料。',
                  link: '/ai-agent/sub-tools',
                },
              ].map((item, index) => (
                <div key={index} className="bg-card rounded-lg p-5 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-primary mb-1">{item.step}</div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 最終的なゴール */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            このセクションのゴール
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-3">
              {[
                'AI コーディングツールの種類と特徴を理解した',
                'Claude Code をインストールして AI と対話できる',
                '自分のリポジトリに接続して fetch / pull できる',
                'ブラウザで画面を確認できる',
                '複数ツールの無料枠を活用して、月1,000円以下で運用できる',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ナビゲーション */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/advanced/integration')}>
            前へ
          </Button>
          <Button className="gap-2" onClick={() => navigate('/git/ai-agent/claude-code-setup')}>
            次へ：Claude Code 導入
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
