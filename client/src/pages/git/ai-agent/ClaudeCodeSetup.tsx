import { ArrowRight, ChevronLeft, Terminal, User, CreditCard, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';

export default function ClaudeCodeSetup() {
  const { selectedOS } = useOS();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダーバナー */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            AI AGENT 2 / 5
          </div>
          <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
            Claude Code 導入
          </h1>
          <p className="text-lg text-muted-foreground">
            AIエージェント「Claude Code」をインストールして、ターミナルからAIと対話できる環境を作ります。
            まずは無料プランで始めましょう。
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* Claude Code とは */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            Claude Code とは？
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Claude Code は、Anthropic が提供するターミナルベースのAIエージェントです。
              コマンドラインから直接AIと対話でき、コードの生成・修正・質問への回答などが行えます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <Terminal className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground mb-1">ターミナルで動作</h4>
                <p className="text-sm text-muted-foreground">ブラウザ不要。いつものターミナルでAIと対話</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4">
                <Download className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground mb-1">リポジトリ理解</h4>
                <p className="text-sm text-muted-foreground">プロジェクトのコードを読み、文脈を理解して回答</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4">
                <CreditCard className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground mb-1">無料で開始可能</h4>
                <p className="text-sm text-muted-foreground">無料プランでも十分な機能を体験できる</p>
              </div>
            </div>
          </div>
        </section>

        {/* ステップ1: Anthropic アカウント作成 */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              1
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Anthropic アカウントを作成する</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Claude Code を使うには、Anthropic（アンソロピック）のアカウントが必要です。
            まだアカウントを持っていない場合は、以下の手順で作成します。
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                a
              </div>
              <div>
                <p className="text-foreground font-medium">Anthropic の公式サイトにアクセス</p>
                <p className="text-muted-foreground">
                  ブラウザで{' '}
                  <a
                    href="https://console.anthropic.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    console.anthropic.com
                  </a>
                  {' '}を開きます。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                b
              </div>
              <div>
                <p className="text-foreground font-medium">「Sign Up」をクリック</p>
                <p className="text-muted-foreground">
                  Google アカウントまたはメールアドレスで登録できます。
                  Google アカウントでの登録が簡単です。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                c
              </div>
              <div>
                <p className="text-foreground font-medium">メール認証を完了</p>
                <p className="text-muted-foreground">
                  メールアドレスで登録した場合は、届いた確認メールのリンクをクリックして認証を完了します。
                </p>
              </div>
            </div>
          </div>

          <InfoBox type="info" title="無料プランについて">
            Claude Code は Anthropic のAPIを利用します。新規登録すると無料クレジットが付与されるため、
            まずは無料で始められます。クレジットが尽きた場合でも、
            使った分だけ課金される従量課金制です（最初は $5 程度のクレジット追加で十分使えます）。
          </InfoBox>
        </div>

        {/* ステップ2: Node.js の確認 */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              2
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Node.js がインストール済みか確認する</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Claude Code は Node.js（v18 以上）が必要です。
            このマニュアルの「環境準備」で既にインストール済みの方はそのままでOKです。
          </p>

          {selectedOS === 'mac' ? (
            <CodeBlock
              code={`# Node.js のバージョンを確認
node --version
# v18.0.0 以上が表示されればOK`}
              language="bash"
              title="ターミナル"
            />
          ) : (
            <CodeBlock
              code={`# Node.js のバージョンを確認
node --version
# v18.0.0 以上が表示されればOK`}
              language="powershell"
              title="PowerShell"
            />
          )}

          <InfoBox type="warning" title="Node.js が未インストールの場合">
            バージョンが表示されない、またはv18未満の場合は、
            先に「<a href="/git/environment/nodejs" className="text-primary hover:underline">Node.js インストール</a>」ページの手順を完了してください。
          </InfoBox>
        </div>

        {/* ステップ3: Claude Code インストール */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              3
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Claude Code をインストールする</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            npm（Node.js に付属するパッケージマネージャー）を使って、Claude Code をグローバルインストールします。
          </p>

          {selectedOS === 'mac' ? (
            <CodeBlock
              code={`# Claude Code をグローバルインストール
npm install -g @anthropic-ai/claude-code`}
              language="bash"
              title="ターミナル"
            />
          ) : (
            <CodeBlock
              code={`# Claude Code をグローバルインストール
npm install -g @anthropic-ai/claude-code`}
              language="powershell"
              title="PowerShell（管理者権限不要）"
            />
          )}

          <p className="text-muted-foreground leading-relaxed">
            インストールが完了したら、以下のコマンドでバージョンを確認します。
          </p>

          <CodeBlock
            code={`# バージョン確認
claude --version`}
            language={selectedOS === 'mac' ? 'bash' : 'powershell'}
            title={selectedOS === 'mac' ? 'ターミナル' : 'PowerShell'}
          />

          <InfoBox type="success" title="インストール成功">
            バージョン番号（例: <code>1.x.x</code>）が表示されればインストール完了です。
          </InfoBox>

          {selectedOS === 'windows' && (
            <InfoBox type="info" title="Windows の場合の注意">
              PowerShell でインストールがうまくいかない場合は、PowerShell を「管理者として実行」してからもう一度試してみてください。
              または、このマニュアルの WSL2 環境を使ってインストールすることもできます。
            </InfoBox>
          )}
        </div>

        {/* ステップ4: 初回認証 */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              4
            </div>
            <h3 className="text-2xl font-semibold text-foreground">初回認証（ログイン）</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Claude Code を初めて起動すると、Anthropic アカウントでの認証が求められます。
            ブラウザが自動的に開くので、画面の指示に従ってログインしてください。
          </p>

          <CodeBlock
            code={`# Claude Code を起動（初回は認証画面が開く）
claude`}
            language={selectedOS === 'mac' ? 'bash' : 'powershell'}
            title={selectedOS === 'mac' ? 'ターミナル' : 'PowerShell'}
          />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                a
              </div>
              <div>
                <p className="text-foreground font-medium">ブラウザが自動で開く</p>
                <p className="text-muted-foreground">
                  Anthropic の認証ページがブラウザに表示されます。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                b
              </div>
              <div>
                <p className="text-foreground font-medium">ログインして許可する</p>
                <p className="text-muted-foreground">
                  ステップ1で作成したアカウントでログインし、Claude Code へのアクセスを許可します。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                c
              </div>
              <div>
                <p className="text-foreground font-medium">ターミナルに戻る</p>
                <p className="text-muted-foreground">
                  認証完了後、ターミナルに戻ると Claude Code が使えるようになっています。
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm mx-1">&gt;</code>
                  のプロンプトが表示されれば成功です。
                </p>
              </div>
            </div>
          </div>

          <InfoBox type="info" title="認証方式について">
            Claude Code は OAuth（ブラウザ経由のログイン）で認証を行います。
            APIキーを手動で設定する必要はありません。
          </InfoBox>
        </div>

        {/* ステップ5: Hello World */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              5
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Hello World - 最初の対話</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Claude Code が起動した状態で、簡単な質問をしてみましょう。
            これが最初の AI との対話です！
          </p>

          <CodeBlock
            code={`# Claude Code が起動した状態で、以下のように入力してみましょう

> こんにちは！自己紹介してください`}
            language="text"
            title="Claude Code の対話画面"
          />

          <p className="text-muted-foreground leading-relaxed">
            Claude が自己紹介をしてくれるはずです。続けていくつか試してみましょう。
          </p>

          <CodeBlock
            code={`# もう少し試してみましょう

> 今いるディレクトリのファイル一覧を教えて

> この場所に hello.txt というファイルを作って、中に「Hello World!」と書いて`}
            language="text"
            title="Claude Code の対話画面"
          />

          <InfoBox type="success" title="おめでとうございます！">
            Claude Code と対話できました！ AIがファイル操作の許可を求めてきた場合は、
            内容を確認して「Yes」で許可してください。
            これが AI エージェントの基本的な動作です。
          </InfoBox>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-amber-600 dark:text-amber-400 font-medium mb-2">Claude Code の終了方法</p>
            <p className="text-amber-600 dark:text-amber-400 text-sm">
              対話を終了するには <code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">/exit</code> と入力するか、
              <code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">Ctrl + C</code> を押します。
            </p>
          </div>
        </div>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="Claude Code のインストールと起動コマンドを書いてみよう"
            description="Node.js のバージョン確認、Claude Code のインストール、バージョン確認、起動までのコマンドを書いてください。"
            initialCode={`# 1. Node.js のバージョンを確認\n\n# 2. Claude Code をグローバルインストール\n\n# 3. Claude Code のバージョンを確認\n\n# 4. Claude Code を起動\n`}
            answer={`# 1. Node.js のバージョンを確認\nnode --version\n\n# 2. Claude Code をグローバルインストール\nnpm install -g @anthropic-ai/claude-code\n\n# 3. Claude Code のバージョンを確認\nclaude --version\n\n# 4. Claude Code を起動\nclaude`}
            keywords={['node --version', 'npm install -g', 'claude-code', 'claude --version', 'claude']}
            hints={[
              'node --version で Node.js のバージョンを確認します',
              'npm install -g @anthropic-ai/claude-code でグローバルインストールします',
              'claude --version でバージョン確認、claude で起動します',
            ]}
            preview
          />
        </section>

        {/* このページのまとめ */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            このページのまとめ
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-3">
              {[
                'Anthropic アカウントを作成した',
                'Node.js v18 以上がインストールされていることを確認した',
                'npm で Claude Code をインストールした',
                '初回認証（ブラウザでログイン）を完了した',
                'Claude Code と「Hello World」の対話ができた',
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
          <Button variant="outline" onClick={() => navigate('/git/ai-agent/overview')}>
            <ChevronLeft size={20} />
            前へ
          </Button>
          <Button className="gap-2" onClick={() => navigate('/git/ai-agent/claude-code-basics')}>
            次へ：Claude Code 基本操作
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
