import { ArrowRight, ChevronLeft, Download, CheckCircle, Puzzle, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import OSToggle from '@/components/OSToggle';
import { useOS } from '@/contexts/OSContext';
import { useLocation } from 'wouter';

export default function CursorCline() {
  const { selectedOS } = useOS();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダーバナー */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 26 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            Cursor + Cline 導入
          </h1>
          <p className="text-lg text-muted-foreground">
            コードを見ながら AI に指示できるエディタ系ツール。
            GUI（画面操作）中心で使えるので、ターミナルが苦手な方にもおすすめです。
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-12 flex justify-center">
          <OSToggle />
        </div>

        {/* Cursor とは */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Cursor とは？
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cursor は、<strong className="text-foreground">AI が組み込まれたコードエディタ</strong>です。
              見た目は VS Code とほぼ同じですが、エディタの中で直接 AI と対話しながらコーディングできます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <MousePointer className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground mb-1">GUI で AI と対話</h4>
                <p className="text-sm text-muted-foreground">
                  コードを選択して右クリック → AI に質問、という直感的な操作
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4">
                <Download className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground mb-1">無料プランあり</h4>
                <p className="text-sm text-muted-foreground">
                  月50回のプレミアムリクエスト + コード補完が無料で使える
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ステップ1: Cursor 確認 */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              1
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Cursor を準備する</h3>
          </div>

          <InfoBox type="info" title="Cursor のインストールがまだの方">
            <a href="/git/environment/cursor" className="text-primary hover:underline font-medium">
              環境準備 → Cursor インストール
            </a>
            のページで、ダウンロードからアカウント作成までの手順を説明しています。先にそちらを完了してください。
          </InfoBox>

          <p className="text-muted-foreground">
            Cursor がインストール済みであれば、次のステップに進みましょう。
          </p>
        </div>

        {/* ステップ2: Cursor で AI を使ってみる */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              2
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Cursor で AI を使ってみる</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cursor でプロジェクトフォルダを開いたら、AI との対話を試してみましょう。
          </p>

          <div className="space-y-4">
            <div className="bg-muted border border-border rounded-lg p-4">
              <p className="text-foreground font-medium mb-2">方法1: チャットパネルを開く</p>
              <p className="text-muted-foreground text-sm">
                キーボードで{' '}
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  {selectedOS === 'mac' ? 'Cmd + L' : 'Ctrl + L'}
                </code>
                {' '}を押すと、右側にAIチャットパネルが開きます。
                ここに日本語で質問を入力するだけです。
              </p>
            </div>

            <div className="bg-muted border border-border rounded-lg p-4">
              <p className="text-foreground font-medium mb-2">方法2: インラインで指示する</p>
              <p className="text-muted-foreground text-sm">
                コード上で{' '}
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  {selectedOS === 'mac' ? 'Cmd + K' : 'Ctrl + K'}
                </code>
                {' '}を押すと、その場所に AI への指示を入力できます。
                例:「この関数にコメントを追加して」
              </p>
            </div>

            <div className="bg-muted border border-border rounded-lg p-4">
              <p className="text-foreground font-medium mb-2">方法3: Agent モード</p>
              <p className="text-muted-foreground text-sm">
                チャットパネルで「Agent」モードを選択すると、
                複数ファイルにまたがる変更を AI が自律的に行ってくれます。
                Claude Code に近い体験がエディタ内で得られます。
              </p>
            </div>
          </div>

          <InfoBox type="success" title="試してみよう">
            チャットパネルに「このプロジェクトの構成を教えて」と入力してみましょう。
            AI がフォルダ構造やファイルの役割を説明してくれます。
          </InfoBox>
        </div>

        {/* Cline とは */}
        <section className="mb-8">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Cline とは？
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cline は、<strong className="text-foreground">VS Code に追加できる無料の AI 拡張機能</strong>です。
              VS Code を既に使っている方は、拡張機能を入れるだけですぐに使えます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/5 rounded-lg p-4">
                <Puzzle className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground mb-1">VS Code 拡張機能</h4>
                <p className="text-sm text-muted-foreground">
                  新しいエディタ不要。いつもの VS Code にインストールするだけ
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4">
                <Puzzle className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground mb-1">API キーで動作</h4>
                <p className="text-sm text-muted-foreground">
                  Claude や Gemini の API キーを設定して使う。利用分だけ課金
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ステップ3: Cline インストール */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              3
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Cline を VS Code にインストールする</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            VS Code（または Cursor）の拡張機能マーケットプレイスからインストールします。
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                a
              </div>
              <div>
                <p className="text-foreground font-medium">拡張機能パネルを開く</p>
                <p className="text-muted-foreground">
                  VS Code で{' '}
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    {selectedOS === 'mac' ? 'Cmd + Shift + X' : 'Ctrl + Shift + X'}
                  </code>
                  {' '}を押して拡張機能パネルを開きます。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                b
              </div>
              <div>
                <p className="text-foreground font-medium">「Cline」を検索してインストール</p>
                <p className="text-muted-foreground">
                  検索バーに「Cline」と入力し、表示された拡張機能の「Install」ボタンをクリックします。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5">
                c
              </div>
              <div>
                <p className="text-foreground font-medium">API キーを設定する</p>
                <p className="text-muted-foreground">
                  インストール後、Cline のパネルが表示されます。
                  使いたい AI サービスの API キーを設定します。
                </p>
              </div>
            </div>
          </div>

          <InfoBox type="info" title="API キーはどこで取得する？">
            Claude Code 導入時に作った Anthropic アカウントの API キーをそのまま使えます。
            <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium ml-1">
              console.anthropic.com/settings/keys
            </a>
            {' '}で取得できます。
            Gemini の API キーを使えば、無料枠でも利用可能です。
          </InfoBox>
        </div>

        {/* ステップ4: Cline を使ってみる */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              4
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Cline を使ってみる</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cline のパネルが開いたら、AI に話しかけてみましょう。
          </p>

          <CodeBlock
            code={`# Cline のチャット欄に入力する例

このプロジェクトの構成を教えて

index.html の内容を確認して`}
            language="text"
            title="Cline のチャット欄"
          />

          <p className="text-muted-foreground leading-relaxed">
            Cline はファイルの作成・編集、ターミナルコマンドの実行など、
            Claude Code と同じようなことが VS Code の中でできます。
            操作の前に必ず確認画面が出るので、内容を確認して「Accept」で許可します。
          </p>

          <InfoBox type="warning" title="API利用料に注意">
            Cline は API キーで直接 AI を呼び出すため、使った分だけ課金されます。
            Gemini の API キーを設定すれば、無料枠（1日1,000リクエスト）の範囲で無料で使えます。
          </InfoBox>
        </div>

        {/* 使い分け */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Cursor と Cline、どっちを使う？
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-3 py-2.5 text-left text-foreground font-semibold">比較項目</th>
                    <th className="border border-border px-3 py-2.5 text-left text-foreground font-semibold">Cursor</th>
                    <th className="border border-border px-3 py-2.5 text-left text-foreground font-semibold">Cline</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['導入の手軽さ', 'エディタごとインストール', 'VS Code に拡張追加するだけ'],
                    ['無料枠', '月50回のプレミアムリクエスト', '拡張は無料（API キーが必要）'],
                    ['操作感', 'チャット + インライン編集', 'チャット中心'],
                    ['おすすめの人', '新しくエディタを入れてOKな人', '既に VS Code を使っている人'],
                  ].map(([item, cursor, cline], index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-muted/50'}>
                      <td className="border border-border px-3 py-2.5 font-medium text-foreground">{item}</td>
                      <td className="border border-border px-3 py-2.5 text-muted-foreground">{cursor}</td>
                      <td className="border border-border px-3 py-2.5 text-muted-foreground">{cline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              両方入れてもOKです。Cursor の無料枠を使い切ったら Cline + Gemini API に切り替える、という運用もできます。
            </p>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="Cursor のショートカットキーを確認しよう"
            description="Cursor で AI を活用するためのショートカットキー操作を書いてください（Mac の場合）。"
            initialCode={`# Cursor で AI を使うショートカット（Mac の場合）\n\n# 1. AI チャットパネルを開くキー\n\n# 2. インラインで AI に指示するキー\n\n# 3. 拡張機能パネルを開くキー\n`}
            answer={`# Cursor で AI を使うショートカット（Mac の場合）\n\n# 1. AI チャットパネルを開くキー\n# Cmd + L\n\n# 2. インラインで AI に指示するキー\n# Cmd + K\n\n# 3. 拡張機能パネルを開くキー\n# Cmd + Shift + X`}
            keywords={['Cmd + L', 'Cmd + K', 'Cmd + Shift + X']}
            hints={[
              'チャットパネルは Cmd + L で開きます',
              'インライン指示は Cmd + K で入力できます',
              '拡張機能パネルは Cmd + Shift + X で開きます',
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
                'Cursor をインストールして AI チャットを試した',
                'Cline を VS Code に追加して API キーを設定した',
                'エディタ内で AI に質問・指示ができるようになった',
                'Cursor と Cline の使い分けを理解した',
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
          <Button variant="outline" onClick={() => navigate('/git/ai-agent/claude-code-basics')}>
            <ChevronLeft size={20} />
            前へ
          </Button>
          <Button className="gap-2" onClick={() => navigate('/git/ai-agent/sub-tools')}>
            次へ：予備ツール（Gemini CLI / Warp / Antigravity）
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
