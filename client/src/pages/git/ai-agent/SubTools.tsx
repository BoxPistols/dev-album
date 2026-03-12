import { ChevronLeft, CheckCircle, Sparkles, Terminal, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';

export default function SubTools() {
  const { selectedOS } = useOS();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダーバナー */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 27 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            予備ツール：Gemini CLI / Warp / Antigravity
          </h1>
          <p className="text-lg text-muted-foreground">
            メインツールのトークンが足りなくなった時に切り替えられる予備環境を揃えます。
            全て無料で導入できます。
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* ===== Gemini CLI ===== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-sans font-bold text-foreground">
              Gemini CLI
            </h2>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">ターミナル型</span>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Google が提供するターミナルベースの AI ツールです。
              Claude Code と同じ感覚で使えて、<strong className="text-foreground">1日1,000リクエストまで無料</strong>という太っ腹な無料枠が魅力です。
            </p>
            <InfoBox type="success" title="無料枠が大きい">
              Google アカウントがあれば追加登録不要。毎日1,000リクエストまで無料なので、
              Claude Code のクレジットが尽きた時の切り替え先として最適です。
            </InfoBox>
          </div>

          {/* Gemini CLI ステップ */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-6">
            <h3 className="text-xl font-semibold text-foreground">セットアップ手順</h3>

            <div className="space-y-6">
              <div>
                <p className="text-foreground font-medium mb-2">1. インストール</p>
                <CodeBlock
                  code={`# Gemini CLI をグローバルインストール
npm install -g @google/gemini-cli`}
                  language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                  title={selectedOS === 'mac' ? 'ターミナル' : 'PowerShell'}
                />
              </div>

              <div>
                <p className="text-foreground font-medium mb-2">2. 起動と認証</p>
                <CodeBlock
                  code={`# Gemini CLI を起動（初回はブラウザで Google 認証）
gemini`}
                  language={selectedOS === 'mac' ? 'bash' : 'powershell'}
                  title={selectedOS === 'mac' ? 'ターミナル' : 'PowerShell'}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  ブラウザが開くので、普段使っている Google アカウントでログインして許可します。
                </p>
              </div>

              <div>
                <p className="text-foreground font-medium mb-2">3. 動作確認</p>
                <CodeBlock
                  code={`# 簡単な質問をしてみる
> こんにちは！自己紹介してください

# リポジトリの状態を聞く
> このリポジトリの状態を教えて`}
                  language="text"
                  title="Gemini CLI の対話画面"
                />
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-amber-600 dark:text-amber-400 font-medium mb-1">終了方法</p>
              <p className="text-amber-600 dark:text-amber-400 text-sm">
                <code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">/exit</code> または{' '}
                <code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">Ctrl + C</code>
              </p>
            </div>
          </div>
        </section>

        {/* ===== Warp ===== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-sans font-bold text-foreground">
              Warp
            </h2>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">AI搭載ターミナル</span>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Warp は<strong className="text-foreground">AI 機能が組み込まれたモダンなターミナル</strong>です。
              ターミナル自体を Warp に置き換えることで、コマンド入力中に AI のサポートが受けられます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium mb-1">自然言語でコマンド生成</p>
                <p className="text-sm text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded">#</code> を打って「ファイルを検索」と入力 → AI がコマンドを生成
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4 border border-border">
                <p className="text-foreground font-medium mb-1">エラー解析</p>
                <p className="text-sm text-muted-foreground">
                  エラーが出たら右クリック →「Ask Warp AI」で原因を AI が解説
                </p>
              </div>
            </div>
          </div>

          {/* Warp ステップ */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-6">
            <h3 className="text-xl font-semibold text-foreground">セットアップ手順</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-foreground font-medium">公式サイトからダウンロード</p>
                  <p className="text-muted-foreground">
                    <a
                      href="https://www.warp.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      warp.dev
                    </a>
                    {' '}にアクセスして「Download」をクリック。{selectedOS === 'mac' ? 'Mac' : 'Windows'} 版をインストールします。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-foreground font-medium">アカウント作成</p>
                  <p className="text-muted-foreground">
                    初回起動時に Sign Up を求められます。Google アカウントや GitHub アカウントで登録できます。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-foreground font-medium">AI 機能を試す</p>
                  <p className="text-muted-foreground">
                    ターミナル上で <code className="bg-muted px-1.5 py-0.5 rounded">#</code> を入力してから日本語で指示してみましょう。
                    例: <code className="bg-muted px-1.5 py-0.5 rounded"># 現在のブランチを確認</code>
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="Warp 無料プランの AI 回数">
              無料プランでは月75回のAIリクエストが使えます（初月は150回）。
              ターミナルの基本機能（コマンド実行、タブ管理など）は全て無料で制限なく使えます。
            </InfoBox>
          </div>
        </section>

        {/* ===== Antigravity ===== */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-sans font-bold text-foreground">
              Google Antigravity
            </h2>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">クラウド IDE</span>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Google が提供する<strong className="text-foreground">ブラウザで動く AI 開発環境</strong>です。
              インストール不要で、ブラウザさえあればどの PC からでもアクセスできます。
              複数の AI エージェントを同時に動かせる「Manager View」が特徴です。
            </p>
            <InfoBox type="success" title="プレビュー期間中は無料">
              現在パブリックプレビュー中のため、個人利用は無料です。
              Gemini 3 モデルが使えるほか、Claude や GPT も選択可能です。
            </InfoBox>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-6 space-y-6">
            <h3 className="text-xl font-semibold text-foreground">始め方</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-foreground font-medium">公式サイトにアクセス</p>
                  <p className="text-muted-foreground">
                    <a
                      href="https://antigravity.google/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      antigravity.google
                    </a>
                    {' '}にアクセスします。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-foreground font-medium">Google アカウントでログイン</p>
                  <p className="text-muted-foreground">
                    普段の Google アカウントでサインインするだけ。追加の登録は不要です。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-foreground font-medium">プロジェクトを開くまたは作成</p>
                  <p className="text-muted-foreground">
                    GitHub リポジトリを接続するか、新しいプロジェクトを作成して始めます。
                    エディタ画面は VS Code とほぼ同じ操作感です。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="ローカルインストール不要">
              Antigravity はブラウザで完結するため、PC に何もインストールする必要がありません。
              出先や別の PC からでもすぐに作業を再開できるのが強みです。
            </InfoBox>
          </div>
        </section>

        {/* ===== ローテーション戦略まとめ ===== */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            <Sparkles className="w-8 h-8 inline text-primary mr-1" />
            トークン切れ時のローテーション戦略
          </h2>
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              1つのツールの無料枠を使い切っても、別のツールに切り替えれば作業を続けられます。
              以下がおすすめのローテーション順です。
            </p>

            <div className="space-y-3">
              {[
                { tool: 'Claude Code', reason: 'コード理解の精度が最も高い。メインとして使う' },
                { tool: 'Gemini CLI', reason: '無料枠が大きい（1日1,000回）。Claude の代替として最適' },
                { tool: 'Cursor', reason: 'エディタ内で AI を使いたい時。月50回のプレミアムリクエスト' },
                { tool: 'Cline + Gemini API', reason: 'VS Code 内で Gemini の無料枠を活用できる' },
                { tool: 'Warp', reason: 'ターミナル自体のAI補助。コマンドが思い出せない時に' },
                { tool: 'Antigravity', reason: 'ブラウザで完結。PC を問わず作業できる' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{item.tool}</p>
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>

            <InfoBox type="success" title="月1,000円以下で運用完了">
              上記を全て無料枠で回せば月0円。Claude Code に $5（約750円）だけ課金しても月750円。
              どちらにしても<strong>月1,000円以下</strong>で、本格的な AI コーディング環境が手に入ります。
            </InfoBox>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="Gemini CLI のインストールと起動コマンドを書いてみよう"
            description="Gemini CLI をインストールして起動するまでのコマンドを書いてください。"
            initialCode={`# 1. Gemini CLI をグローバルインストール\n\n# 2. Gemini CLI を起動\n`}
            answer={`# 1. Gemini CLI をグローバルインストール\nnpm install -g @google/gemini-cli\n\n# 2. Gemini CLI を起動\ngemini`}
            keywords={['npm install -g', 'gemini-cli', 'gemini']}
            hints={[
              'npm install -g @google/gemini-cli でグローバルインストールします',
              'gemini コマンドで起動します（初回はブラウザで Google 認証）',
            ]}
            preview
          />
        </section>

        {/* まとめ */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            このページのまとめ
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-3">
              {[
                'Gemini CLI をインストールして動作確認した',
                'Warp をインストールして AI 機能を試した',
                'Antigravity にアクセスしてプロジェクトを開いた',
                'トークン切れ時のローテーション戦略を理解した',
                '月1,000円以下の AI コーディング環境が完成した',
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
          <Button variant="outline" onClick={() => navigate('/git/ai-agent/cursor-cline')}>
            <ChevronLeft size={20} />
            前へ
          </Button>
          <Button variant="outline" onClick={() => navigate('/git')}>
            トップに戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
