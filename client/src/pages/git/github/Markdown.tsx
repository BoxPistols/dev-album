import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import WhyNowBox from '@/components/WhyNowBox';
import { useLocation } from 'wouter';

/**
 * GitHub 基礎 - Markdown 入門
 * デザイン方針: ジャーニーマップ
 * - Markdown とは何か、なぜ必要か
 * - 基本的な書き方（見出し、リスト、リンク、コードブロック等）
 * - 使われている場所とプラットフォームごとの違い
 */

export default function MarkdownGuide() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 9 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            Markdown を覚えよう
          </h1>
          <p className="text-lg text-muted-foreground">
            開発者・AI との共通言語「Markdown」を身につけましょう。覚えることは少ないのに、活用範囲は広いです。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <WhyNowBox
          title="Markdown とは"
          tags={['README', 'GitHub 全般', 'Notion / Obsidian']}
        >
          <p>
            Markdown は、記号を使ってテキストに見出しや太字・リストを付ける記法です。GitHub の README やコメント欄で使われています。
          </p>
          <p>
            Word で太字にするには Ctrl+B を押しますが、Markdown では <code className="text-xs bg-muted px-1 py-0.5 rounded">**太字**</code> と書きます。HTML タグより短く、プレーンテキストとして読んでも意味が通ります。Notion や Obsidian でも同じ記法が使えます。
          </p>
          <p>
            ChatGPT や Claude の回答も Markdown で書かれているため、基本的な記法を知っておくと読みやすくなります。
          </p>
        </WhyNowBox>

        {/* Why Markdown */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            なぜ Markdown を覚えるべきなのか
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              リポジトリを作成したとき、最初に目にするファイルが <strong className="text-foreground">README.md</strong> です。この「.md」がまさに Markdown ファイルを示す拡張子です。
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Markdown は<strong className="text-foreground">テキストに簡単な記号を付けるだけで、見出し・リスト・リンク・コードブロックなどを表現できる軽量な書式ルール</strong>です。HTML のように複雑なタグを書く必要はなく、覚えるルールもごくわずかです。
            </p>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">Markdown を覚えるメリット</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong className="text-foreground">AI との対話がスムーズになる</strong> ─ ChatGPT や Claude は Markdown で回答します。あなたも Markdown で指示を出すと、正確に意図が伝わります</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong className="text-foreground">GitHub で必須</strong> ─ README、Issue、Pull Request、コメントすべてが Markdown で書かれています</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong className="text-foreground">覚えることが極めて少ない</strong> ─ 基本記法は 10 個程度。15 分で一通り使えるようになります</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong className="text-foreground">どこでも使える</strong> ─ Notion、Slack、Qiita、Zenn、技術ブログなど、多くのサービスが対応しています</span>
                </li>
              </ul>
            </div>

            <InfoBox type="info" title="AI 時代の共通言語">
              AI ツール（ChatGPT、Claude、GitHub Copilot など）は Markdown 形式でやり取りするのが標準です。「見出しで構造を示す」「リストで箇条書きにする」「コードブロックでコードを囲む」─ これだけで AI への指示精度が大きく向上します。Markdown は人間と AI の共通言語と言えます。
            </InfoBox>
          </div>
        </section>

        {/* Where Markdown is Used */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Markdown が使われている場所
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">1</span>
                  <div>
                    <h4 className="font-semibold text-foreground">GitHub</h4>
                    <p className="text-sm text-muted-foreground">README、Issue、Pull Request、Wiki、コメント</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">2</span>
                  <div>
                    <h4 className="font-semibold text-foreground">AI チャット</h4>
                    <p className="text-sm text-muted-foreground">ChatGPT、Claude、Gemini などの入出力</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">3</span>
                  <div>
                    <h4 className="font-semibold text-foreground">ドキュメント・ノート</h4>
                    <p className="text-sm text-muted-foreground">Notion、Obsidian、HackMD、Scrapbox</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">4</span>
                  <div>
                    <h4 className="font-semibold text-foreground">技術ブログ</h4>
                    <p className="text-sm text-muted-foreground">Qiita、Zenn、DEV.to、Medium</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">5</span>
                  <div>
                    <h4 className="font-semibold text-foreground">チャットツール</h4>
                    <p className="text-sm text-muted-foreground">Slack、Discord（一部対応）</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">6</span>
                  <div>
                    <h4 className="font-semibold text-foreground">静的サイト生成</h4>
                    <p className="text-sm text-muted-foreground">Jekyll、Hugo、Astro、VitePress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Syntax */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            基本の書き方
          </h2>

          <div className="space-y-8">
            {/* Headings */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  見出し（Headings）
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                「#」の数で見出しのレベルを指定します。# が少ないほど大きい見出しです。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Markdown（入力）</p>
                  <CodeBlock
                    code={`# 見出し 1（最大）\n## 見出し 2\n### 見出し 3\n#### 見出し 4`}
                    language="markdown"
                    title="見出しの書き方"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">表示結果（イメージ）</p>
                  <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-2">
                    <p className="text-2xl font-bold text-foreground">見出し 1（最大）</p>
                    <p className="text-xl font-bold text-foreground">見出し 2</p>
                    <p className="text-lg font-bold text-foreground">見出し 3</p>
                    <p className="text-base font-bold text-foreground">見出し 4</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Decoration */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  テキスト装飾（太字・斜体・取り消し線）
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Markdown（入力）</p>
                  <CodeBlock
                    code={`**太字（ボールド）**\n*斜体（イタリック）*\n~~取り消し線~~\n***太字かつ斜体***`}
                    language="markdown"
                    title="テキスト装飾"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">表示結果（イメージ）</p>
                  <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-2">
                    <p className="text-foreground"><strong>太字（ボールド）</strong></p>
                    <p className="text-foreground"><em>斜体（イタリック）</em></p>
                    <p className="text-foreground"><s>取り消し線</s></p>
                    <p className="text-foreground"><strong><em>太字かつ斜体</em></strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lists */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  リスト（箇条書き・番号付き）
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Markdown（入力）</p>
                  <CodeBlock
                    code={`- 項目 A\n- 項目 B\n  - サブ項目 B-1\n  - サブ項目 B-2\n- 項目 C`}
                    language="markdown"
                    title="箇条書きリスト"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">表示結果（イメージ）</p>
                  <div className="bg-muted/30 border border-border rounded-lg p-4">
                    <ul className="list-disc list-inside space-y-1 text-foreground">
                      <li>項目 A</li>
                      <li>項目 B
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>サブ項目 B-1</li>
                          <li>サブ項目 B-2</li>
                        </ul>
                      </li>
                      <li>項目 C</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <CodeBlock
                    code={`1. 手順 1\n2. 手順 2\n3. 手順 3`}
                    language="markdown"
                    title="番号付きリスト"
                  />
                </div>
                <div>
                  <div className="bg-muted/30 border border-border rounded-lg p-4 mt-6 md:mt-0">
                    <ol className="list-decimal list-inside space-y-1 text-foreground">
                      <li>手順 1</li>
                      <li>手順 2</li>
                      <li>手順 3</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Links & Images */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  リンクと画像
                </h3>
              </div>

              <CodeBlock
                code={`[表示テキスト](https://example.com)\n\n![代替テキスト](画像のURL)`}
                language="markdown"
                title="リンクと画像の書き方"
              />

              <p className="text-muted-foreground mt-4">
                リンクは <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">[テキスト](URL)</code>、画像は先頭に <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">!</code> を付けるだけです。
              </p>

              <InfoBox type="info">
                GitHub の Issue やコメントでは、画像をドラッグ＆ドロップするだけで自動的に Markdown の画像記法に変換してくれます。
              </InfoBox>
            </div>

            {/* Code */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  コード（インラインとブロック）
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                コードを共有するときに最も重要な記法です。AI にコードを見せるときも、必ずコードブロックで囲みましょう。
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">インラインコード（文中に埋め込む）</p>
                  <CodeBlock
                    code={"`git status` コマンドを実行してください"}
                    language="markdown"
                    title="インラインコード"
                  />
                  <div className="bg-muted/30 border border-border rounded-lg p-4 mt-2">
                    <p className="text-foreground"><code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">git status</code> コマンドを実行してください</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">コードブロック（複数行のコード）</p>
                  <CodeBlock
                    code={"```javascript\nconst greeting = 'Hello!';\nconsole.log(greeting);\n```"}
                    language="markdown"
                    title="コードブロック"
                  />
                  <p className="text-muted-foreground mt-2 text-sm">
                    バッククォート3つ（```）で囲み、言語名を指定するとシンタックスハイライト（色付け）されます。
                  </p>
                </div>
              </div>

              <InfoBox type="info" title="AI への質問時のコツ">
                AI にコードについて質問するときは、必ずコードブロック（```）で囲んで渡しましょう。AI がコードの構造を正しく理解でき、より的確な回答が得られます。
              </InfoBox>
            </div>

            {/* Blockquote */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  6
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  引用（Blockquote）
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <CodeBlock
                    code={`> これは引用文です。\n> 他の人の言葉を引用するときに使います。`}
                    language="markdown"
                    title="引用の書き方"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">表示結果（イメージ）</p>
                  <div className="bg-muted/30 border border-border rounded-lg p-4">
                    <blockquote className="border-l-4 border-primary/40 pl-4 text-foreground/80 italic">
                      これは引用文です。他の人の言葉を引用するときに使います。
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Rule */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  7
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  水平線（区切り線）
                </h3>
              </div>

              <CodeBlock
                code={`セクション 1 の内容\n\n---\n\nセクション 2 の内容`}
                language="markdown"
                title="水平線の書き方"
              />
              <p className="text-muted-foreground mt-2 text-sm">
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">---</code> または <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">***</code> で水平線を引けます。セクションの区切りに便利です。
              </p>
            </div>
          </div>
        </section>

        {/* Advanced Syntax */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            よく使う応用記法
          </h2>

          <div className="space-y-8">
            {/* Tables */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">
                  A
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  テーブル（表）
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <CodeBlock
                    code={`| コマンド | 説明 |\n| --- | --- |\n| git add | ステージング |\n| git commit | 変更を記録 |\n| git push | リモートに送信 |`}
                    language="markdown"
                    title="テーブルの書き方"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">表示結果（イメージ）</p>
                  <div className="bg-muted/30 border border-border rounded-lg p-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 font-semibold text-foreground">コマンド</th>
                          <th className="text-left py-2 font-semibold text-foreground">説明</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b border-border">
                          <td className="py-2 pr-4">git add</td>
                          <td className="py-2">ステージング</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 pr-4">git commit</td>
                          <td className="py-2">変更を記録</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">git push</td>
                          <td className="py-2">リモートに送信</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkboxes / Task Lists */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">
                  B
                </div>
                <h3 className="text-2xl font-semibold text-foreground self-center">
                  チェックボックス（タスクリスト）
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <CodeBlock
                    code={`- [x] Git をインストール\n- [x] GitHub アカウント作成\n- [ ] 最初の Commit\n- [ ] Push を実行`}
                    language="markdown"
                    title="チェックボックスの書き方"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">表示結果（イメージ）</p>
                  <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-2">
                    <label className="flex items-center gap-2 text-foreground">
                      <input type="checkbox" checked readOnly className="rounded" />
                      <span>Git をインストール</span>
                    </label>
                    <label className="flex items-center gap-2 text-foreground">
                      <input type="checkbox" checked readOnly className="rounded" />
                      <span>GitHub アカウント作成</span>
                    </label>
                    <label className="flex items-center gap-2 text-foreground">
                      <input type="checkbox" readOnly className="rounded" />
                      <span>最初の Commit</span>
                    </label>
                    <label className="flex items-center gap-2 text-foreground">
                      <input type="checkbox" readOnly className="rounded" />
                      <span>Push を実行</span>
                    </label>
                  </div>
                </div>
              </div>

              <InfoBox type="warning" title="チェックボックスはプラットフォームによって対応が異なります">
                チェックボックス（タスクリスト）は <strong>GitHub Flavored Markdown（GFM）</strong> の拡張機能です。GitHub の Issue・Pull Request では使えますが、すべての Markdown 環境で表示されるわけではありません。詳しくは次のセクションで説明します。
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Platform Compatibility */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            プラットフォームごとの対応状況
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Markdown には「標準の記法」と「拡張記法」があります。基本的な見出し・リスト・リンク・コードブロックはどこでも使えますが、一部の記法はプラットフォームによって対応状況が異なります。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">記法</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">GitHub</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Notion</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Slack</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Qiita/Zenn</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">見出し（#）</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">非対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">太字・斜体</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">コードブロック</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">テーブル</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-amber-600 dark:text-amber-400">独自形式</td>
                    <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">非対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">チェックボックス</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-amber-600 dark:text-amber-400">独自形式</td>
                    <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">非対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">取り消し線</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">数式（LaTeX）</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                    <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">非対応</td>
                    <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">対応</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="GitHub Flavored Markdown（GFM）とは">
              GitHub が標準の Markdown を独自に拡張したものです。テーブル、チェックボックス、取り消し線、自動リンクなどの便利な機能が追加されています。GitHub 上では GFM が標準なので、このマニュアルで紹介した記法はすべて GitHub で使えます。
            </InfoBox>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">覚えておきたいポイント</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1</span>
                  <span><strong className="text-foreground">基本記法（見出し・リスト・太字・リンク・コードブロック）はほぼどこでも使える</strong>ので、迷わず使ってOK</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2</span>
                  <span><strong className="text-foreground">テーブルやチェックボックスは拡張記法</strong>なので、環境によっては表示が崩れることがある</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3</span>
                  <span><strong className="text-foreground">Slack は独自の記法</strong>を持っており、標準の Markdown とは書き方が異なる部分がある（例：太字は <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">*テキスト*</code> ではなく独自の方式）</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practice: Write a README */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            実践：README.md を書いてみよう
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              前のステップで作成したリポジトリの README.md を、Markdown を使って書き換えてみましょう。以下は README のテンプレートです。
            </p>

            <CodeBlock
              code={`# My First Project\n\nGitHub と Git の学習用リポジトリです。\n\n## このリポジトリについて\n\nこのリポジトリでは、以下の内容を学習しています：\n\n- Git の基本操作（add, commit, push）\n- GitHub でのリポジトリ管理\n- Markdown の書き方\n\n## 使い方\n\n\`\`\`bash\ngit clone git@github.com:your-username/my-first-project.git\ncd my-first-project\n\`\`\`\n\n## 学習の進捗\n\n- [x] GitHub アカウント作成\n- [x] リポジトリ作成\n- [x] Markdown の基本を学習\n- [ ] 最初の Commit\n- [ ] Push を実行\n\n## メモ\n\n> Markdown は覚えることが少ないのに、使える場所がとても多い便利な記法です。`}
              language="markdown"
              title="README.md のテンプレート"
            />

            <InfoBox type="info" title="README.md のコツ">
              README は「プロジェクトの顔」です。何のプロジェクトか、どう使うか、を簡潔に書くことを意識しましょう。最初は完璧でなくて大丈夫です。後からいくらでも更新できます。
            </InfoBox>
          </div>
        </section>

        {/* Cheat Sheet */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Markdown 早見表
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <p className="text-muted-foreground mb-6">
              よく使う記法をまとめました。最初はこの表を見ながら書いてみてください。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">やりたいこと</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">書き方</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">見出し</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs"># テキスト</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">太字</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">**テキスト**</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">斜体</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">*テキスト*</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">取り消し線</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">~~テキスト~~</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">箇条書き</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">- 項目</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">番号リスト</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">1. 項目</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">リンク</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">[テキスト](URL)</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">画像</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">![代替テキスト](画像URL)</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">インラインコード</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">`コード`</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">コードブロック</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">```言語名 ... ```</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">引用</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">&gt; テキスト</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">水平線</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">---</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">チェックボックス</td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">- [ ] / - [x]</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="Markdown で自己紹介を書いてみよう"
            description="以下の要素を含む Markdown を書いてください：見出し（# または ##）、箇条書きリスト（- で始まる項目を2つ以上）、太字（**テキスト**）。内容は自由です。"
            initialCode={`# \n\n- \n- `}
            answer={`# 自己紹介\n\n**名前**: テスト太郎\n\n- Git を学習中\n- Markdown が書けるようになった`}
            hints={[
              '見出しは # の後にスペースを入れて書きます',
              '箇条書きは - の後にスペースを入れて書きます',
              '太字は **テキスト** のように、アスタリスク2つで囲みます',
            ]}
            keywords={['#', '-', '**']}
            preview
            previewType="markdown"
          />
        </section>

        {/* Completion */}
        <section className="mb-12">
          <InfoBox type="success" title="Markdown 入門完了！">
            Markdown の基本を学びました。これで GitHub の README や Issue を書けるだけでなく、AI とのやり取りにも活用できます。次は、Markdown の構造を AI プロンプトに応用する方法を見ていきます。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/github/first-repo')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/markdown-prompt/prompt-engineering')}>
            次へ：プロンプトエンジニアリング入門
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
