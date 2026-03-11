import { ArrowRight, ChevronLeft, FolderGit2, GitBranch, Eye, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';

export default function ClaudeCodeBasics() {
  const { selectedOS } = useOS();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダーバナー */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            AI AGENT 3 / 5
          </div>
          <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
            Claude Code 基本操作
          </h1>
          <p className="text-lg text-muted-foreground">
            Claude Code でリポジトリと接続し、最新の状態を取得して、自分の画面で確認するまでの流れを学びます。
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* ゴールの説明 */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            このページのゴール
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <FolderGit2 className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">1. リポジトリと接続</h4>
                <p className="text-sm text-muted-foreground">自分のリポジトリで Claude Code を使う</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">2. fetch / pull する</h4>
                <p className="text-sm text-muted-foreground">最新のコードを取得する</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">3. 画面で確認する</h4>
                <p className="text-sm text-muted-foreground">ブラウザで結果を確認する</p>
              </div>
            </div>
          </div>
        </section>

        {/* ステップ1: リポジトリに移動して Claude Code を起動 */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              1
            </div>
            <h3 className="text-2xl font-semibold text-foreground">リポジトリに移動して Claude Code を起動する</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Claude Code は「今いるフォルダ」を作業対象として認識します。
            まず、操作したいリポジトリのフォルダに移動してから起動しましょう。
          </p>

          {selectedOS === 'mac' ? (
            <CodeBlock
              code={`# 例: 自分のリポジトリフォルダに移動
cd ~/projects/my-repo

# Claude Code を起動
claude`}
              language="bash"
              title="ターミナル"
            />
          ) : (
            <CodeBlock
              code={`# 例: 自分のリポジトリフォルダに移動
cd C:\\Users\\YourName\\projects\\my-repo

# Claude Code を起動
claude`}
              language="powershell"
              title="PowerShell"
            />
          )}

          <InfoBox type="info" title="フォルダの場所がわからない場合">
            Cursor や VSCode でプロジェクトを開いている場合は、エディタ内のターミナルを使うと
            自動的にプロジェクトフォルダにいる状態になっています。そのまま <code>claude</code> と入力するだけでOKです。
          </InfoBox>

          <div className="bg-muted border border-border rounded-lg p-4">
            <p className="text-foreground font-medium mb-2">Claude Code が認識する範囲</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Claude Code は起動時のフォルダ以下のファイルを読み取れます。
              Git リポジトリのルート（<code>.git</code> フォルダがある場所）で起動するのがベストです。
            </p>
          </div>
        </div>

        {/* ステップ2: リポジトリの状態を確認する */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              2
            </div>
            <h3 className="text-2xl font-semibold text-foreground">リポジトリの状態を確認してもらう</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Claude Code にリポジトリの状態を確認してもらいましょう。
            自然な言葉で頼むだけでOKです。
          </p>

          <CodeBlock
            code={`# リポジトリの状態を確認
> このリポジトリの状態を教えて

# Claude が以下のような情報を教えてくれます:
# - 現在のブランチ名
# - 未コミットの変更があるか
# - リモートとの差分があるか`}
            language="text"
            title="Claude Code の対話画面"
          />

          <CodeBlock
            code={`# もっと詳しく聞いてみましょう
> このプロジェクトの構成を教えて。どんなファイルがある？`}
            language="text"
            title="Claude Code の対話画面"
          />

          <InfoBox type="info">
            Claude Code は <code>git status</code>、<code>git log</code> などのコマンドを自動的に実行して、
            結果をわかりやすく説明してくれます。コマンドを覚える必要はありません。
          </InfoBox>
        </div>

        {/* ステップ3: 最新の状態を取得する（fetch / pull） */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              3
            </div>
            <h3 className="text-2xl font-semibold text-foreground">最新の状態を取得する（fetch / pull）</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            チームメンバーやリモートで変更があった場合、それを自分のローカルに取り込む必要があります。
            Claude Code に頼むだけで、fetch と pull を実行してくれます。
          </p>

          <CodeBlock
            code={`# リモートの最新情報を確認（fetch）
> リモートに新しい変更があるか確認して`}
            language="text"
            title="Claude Code の対話画面"
          />

          <CodeBlock
            code={`# 最新の変更を取り込む（pull）
> リモートの最新の変更を取り込んで（pull して）`}
            language="text"
            title="Claude Code の対話画面"
          />

          <div className="bg-muted border border-border rounded-lg p-6 space-y-3">
            <p className="text-foreground font-medium">fetch と pull の違い（おさらい）</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="font-semibold text-foreground mb-1">
                  <GitBranch className="w-4 h-4 inline mr-1" />
                  git fetch
                </p>
                <p className="text-sm text-muted-foreground">
                  リモートの情報を「確認」するだけ。自分のファイルは変わらない。安全な操作。
                </p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="font-semibold text-foreground mb-1">
                  <RefreshCw className="w-4 h-4 inline mr-1" />
                  git pull
                </p>
                <p className="text-sm text-muted-foreground">
                  リモートの変更を「取り込む」。自分のファイルが更新される。
                </p>
              </div>
            </div>
          </div>

          <InfoBox type="warning" title="pull するタイミング">
            pull する前に、自分の未コミットの変更がないか確認しましょう。
            Claude Code に「pull しても大丈夫？」と聞くと、
            状態を確認してからアドバイスしてくれます。
          </InfoBox>
        </div>

        {/* ステップ4: 画面で確認する */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              4
            </div>
            <h3 className="text-2xl font-semibold text-foreground">画面で確認する</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            pull で最新の状態を取り込んだら、実際にブラウザやエディタで確認してみましょう。
            Web プロジェクトの場合は開発サーバーを起動して確認できます。
          </p>

          <CodeBlock
            code={`# 開発サーバーの起動を Claude Code に頼む
> 開発サーバーを起動して

# Claude が package.json を確認して、適切なコマンドを実行してくれます
# 例: npm run dev, pnpm dev など`}
            language="text"
            title="Claude Code の対話画面"
          />

          <InfoBox type="info" title="ブラウザで確認">
            開発サーバーが起動したら、表示される URL（通常は <code>http://localhost:5173</code> など）を
            ブラウザで開いて確認します。
          </InfoBox>

          <p className="text-muted-foreground leading-relaxed">
            もちろん、Claude Code を使わずに自分でコマンドを実行してもOKです。
            Claude Code はあくまでアシスタントなので、慣れてきたら自分で直接コマンドを打つ場面も出てきます。
          </p>

          {selectedOS === 'mac' ? (
            <CodeBlock
              code={`# 自分で直接実行する場合の例
npm run dev

# または
pnpm dev`}
              language="bash"
              title="ターミナル（Claude Code を使わない場合）"
            />
          ) : (
            <CodeBlock
              code={`# 自分で直接実行する場合の例
npm run dev

# または
pnpm dev`}
              language="powershell"
              title="PowerShell（Claude Code を使わない場合）"
            />
          )}
        </div>

        {/* ステップ5: よく使う操作まとめ */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              5
            </div>
            <h3 className="text-2xl font-semibold text-foreground">よく使う Claude Code 操作まとめ</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            覚えておくと便利な Claude Code の使い方をまとめます。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">やりたいこと</th>
                  <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Claude Code への頼み方</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['リポジトリの状態確認', 'このリポジトリの状態を教えて'],
                  ['最新の変更を取得', 'リモートの最新を pull して'],
                  ['変更の差分を確認', '今の変更内容を見せて'],
                  ['開発サーバー起動', '開発サーバーを起動して'],
                  ['ファイルの中身を確認', 'index.html の内容を見せて'],
                  ['変更の取り消し', '直前の変更を元に戻して'],
                ].map(([action, command], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-muted/50'}>
                    <td className="border border-border px-4 py-3 text-foreground">{action}</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{command}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-amber-600 dark:text-amber-400 font-medium mb-2">Claude Code の基本コマンド</p>
            <div className="space-y-2 text-amber-600 dark:text-amber-400 text-sm">
              <p><code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">claude</code> — Claude Code を起動</p>
              <p><code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">/exit</code> — Claude Code を終了</p>
              <p><code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">/help</code> — ヘルプを表示</p>
              <p><code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">/clear</code> — 会話履歴をクリア</p>
              <p><code className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">Ctrl + C</code> — 処理を中断 / 終了</p>
            </div>
          </div>
        </div>

        {/* 実践チャレンジ */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            実践チャレンジ
          </h2>
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-border rounded-lg p-8 space-y-4">
            <p className="text-lg text-foreground font-medium">
              以下の操作を Claude Code を使って実際にやってみましょう:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>自分のリポジトリフォルダで <code className="bg-muted px-1.5 py-0.5 rounded text-sm">claude</code> を起動する</li>
              <li>「このリポジトリのブランチ一覧を教えて」と聞く</li>
              <li>「リモートの最新を pull して」と頼む</li>
              <li>「開発サーバーを起動して」と頼む</li>
              <li>ブラウザで画面を確認する</li>
              <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">/exit</code> で Claude Code を終了する</li>
            </ol>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="CLAUDE.md を書いてみよう"
            description="Claude Code がプロジェクトのルールを認識するための CLAUDE.md ファイルを書いてください。プロジェクト名、使用言語、コミットメッセージのルールを含めましょう。"
            initialCode={`# プロジェクト名\n\n## 基本方針\n\n`}
            answer={`# My Project\n\n## 基本方針\n\n- 言語: 日本語でコミュニケーション\n- TypeScript を使用\n\n## Git ワークフロー\n\n- コミットメッセージは日本語で簡潔に\n- push 前に必ずビルド確認`}
            hints={[
              'CLAUDE.md は Markdown 形式で書きます',
              '見出し（##）でセクションを分けましょう',
              '箇条書き（-）でルールを列挙すると Claude が理解しやすくなります',
            ]}
            keywords={['#', '##', '-']}
            preview
            previewType="markdown"
          />
        </section>

        {/* まとめ */}
        <section className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-6">
            このページのまとめ
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-3">
              {[
                'リポジトリフォルダで Claude Code を起動できた',
                'Claude Code にリポジトリの状態を確認してもらえた',
                'fetch / pull で最新の変更を取り込めた',
                '開発サーバーを起動してブラウザで確認できた',
                'Claude Code のよく使う操作を把握した',
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
          <Button variant="outline" onClick={() => navigate('/git/ai-agent/claude-code-setup')}>
            <ChevronLeft size={20} />
            前へ
          </Button>
          <Button className="gap-2" onClick={() => navigate('/git/ai-agent/cursor-cline')}>
            次へ：Cursor + Cline 導入
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
