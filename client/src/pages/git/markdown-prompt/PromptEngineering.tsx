import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import CodingChallenge from '@/components/CodingChallenge';
import WhyNowBox from '@/components/WhyNowBox';
import { useLocation } from 'wouter';

/**
 * Markdown & プロンプト - プロンプトエンジニアリング入門
 * デザイン方針: ジャーニーマップ
 * - Markdown の構造をプロンプトに応用する考え方
 * - 役割・文脈・タスク・形式の4要素
 * - Before/After 比較で具体的に見せる
 */

export default function PromptEngineering() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            STEP 10 / 27
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">
            プロンプトエンジニアリング入門
          </h1>
          <p className="text-lg text-muted-foreground">
            Markdown で学んだ「構造化」の考え方を、AI への指示に応用します。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <WhyNowBox
          title="プロンプトとは"
          tags={['AI 活用', 'ChatGPT', 'Claude', 'Cursor']}
        >
          <p>
            プロンプトは AI に渡す指示文のことです。同じ質問でも書き方によって回答の精度は大きく変わります。
          </p>
          <p>
            前のページで学んだ Markdown の見出し・箇条書き・コードブロックは、プロンプトを整理するためのツールとしてそのまま使えます。AI はテキストの構造を読み取るため、箇条書きで条件を並べると漏れが減り、コードブロックでコードを渡すと正しく解釈されます。
          </p>
          <p>
            「うまく答えてくれない」と感じるときは、多くの場合、指示の構造に問題があります。
          </p>
        </WhyNowBox>

        {/* Why Structure Matters */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            なぜ構造化された指示が効くのか
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI は会話の流れから文脈を推測します。情報が散漫だと推測が必要な部分が増え、回答がズレやすくなります。構造化されていると、何を・どの形式で求めているかが明確になり、回答の精度が上がります。
            </p>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <p className="text-sm text-foreground/80">
                <strong>例：</strong> 料理レシピを依頼するとき「和食で、魚を使って、20 分以内で、2 人前」と条件を列挙すると、「何か美味しいもの教えて」より的確な提案が返ってきます。
              </p>
            </div>

            <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-lg">
              <h3 className="font-semibold text-foreground mb-3">Markdown が役立つ場面</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong className="text-foreground">箇条書き（-）</strong> ─ 条件や要件を漏れなく列挙できる</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong className="text-foreground">見出し（#）</strong> ─ 長い指示を「背景」「タスク」「出力形式」に分けて整理できる</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong className="text-foreground">コードブロック（```）</strong> ─ コードやエラーメッセージを正確に渡せる</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong className="text-foreground">引用（&gt;）</strong> ─ 参照元のテキストを明示して「これについて〜して」と指示できる</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Basic Structure */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            プロンプトの基本構造
          </h2>
          <p className="text-muted-foreground mb-6">
            すべてのプロンプトに4要素が必要なわけではありませんが、意識しておくと整理しやすくなります。
          </p>

          <div className="space-y-6">
            {/* Role */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">役割（Role）</h3>
                  <p className="text-sm text-muted-foreground mt-1">AI にどの立場から答えてほしいか</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">書き方の例</p>
                  <CodeBlock
                    code={`あなたは初心者向けに説明するのが得意な\nエンジニアです。`}
                    language="markdown"
                    title="役割の指定"
                  />
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg w-full text-sm text-foreground/80">
                    <strong>使う場面：</strong> 専門的な説明が必要なとき、特定のトーンで書いてほしいとき（フォーマル・カジュアル）
                  </div>
                </div>
              </div>
            </div>

            {/* Context */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">文脈（Context）</h3>
                  <p className="text-sm text-muted-foreground mt-1">現在の状況や前提を伝える</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">書き方の例</p>
                  <CodeBlock
                    code={`## 状況\n- React を使った Web アプリを作っています\n- Git は使い始めたばかりです\n- エラーが出て前に進めない状態です`}
                    language="markdown"
                    title="文脈の整理"
                  />
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg w-full text-sm text-foreground/80">
                    <strong>使う場面：</strong> 技術的な問題の相談、複数ステップの作業の途中、特定の制約がある場合
                  </div>
                </div>
              </div>
            </div>

            {/* Task */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">タスク（Task）</h3>
                  <p className="text-sm text-muted-foreground mt-1">何をしてほしいかを明示する</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">書き方の例</p>
                  <CodeBlock
                    code={`以下のエラーの原因を教えてください。\n修正方法も合わせて示してください。`}
                    language="markdown"
                    title="タスクの明示"
                  />
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg w-full text-sm text-foreground/80">
                    <strong>注意：</strong> 「これ何とかして」より「原因を説明して」「修正後のコードを書いて」のように動詞を具体的にすると回答が絞られます
                  </div>
                </div>
              </div>
            </div>

            {/* Format */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">形式（Format）</h3>
                  <p className="text-sm text-muted-foreground mt-1">どのような形式で返してほしいか</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">書き方の例</p>
                  <CodeBlock
                    code={`回答は以下の形式でお願いします：\n1. 原因（1〜2 文）\n2. 修正後のコード\n3. 説明（箇条書き）`}
                    language="markdown"
                    title="形式の指定"
                  />
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-lg w-full text-sm text-foreground/80">
                    <strong>使う場面：</strong> 長い回答が不要なとき、特定の構造で受け取りたいとき、コードだけほしいとき
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Before / After：GitHub 関連の例
          </h2>
          <p className="text-muted-foreground mb-8">
            このガイドで学んだ内容に関連する場面で、プロンプトの書き方を比較します。
          </p>

          <div className="space-y-8">
            {/* Example 1 */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-3">
                <MessageSquare size={18} className="text-primary" aria-hidden="true" />
                <h3 className="font-semibold text-foreground">例 1：エラーメッセージの相談</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-destructive mb-3">× 曖昧な指示</p>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                    <p className="text-sm text-foreground font-mono">git push したらエラーが出ました。直してください。</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    エラー内容がないため、AI が推測で答えるしかない
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-secondary mb-3">✓ 構造化された指示</p>
                  <CodeBlock
                    code={`## 状況\ngit push を実行したところ、以下のエラーが\n出ました。\n\n## エラーメッセージ\n\`\`\`\nfatal: Authentication failed for\n'https://github.com/...'\n\`\`\`\n\n## 質問\n原因と対処方法を教えてください。`}
                    language="markdown"
                    title="改善後"
                  />
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-3">
                <MessageSquare size={18} className="text-primary" aria-hidden="true" />
                <h3 className="font-semibold text-foreground">例 2：README の下書き依頼</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-destructive mb-3">× 曖昧な指示</p>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                    <p className="text-sm text-foreground font-mono">README を書いてください。</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    どんなプロジェクトか不明なため、汎用的な内容しか返せない
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-secondary mb-3">✓ 構造化された指示</p>
                  <CodeBlock
                    code={`以下のプロジェクトの README.md を\nMarkdown で書いてください。\n\n## プロジェクト概要\n- 社内の業務フロー可視化ツール\n- 対象：非エンジニアのメンバー\n- 技術：React + TypeScript\n\n## 含めてほしい項目\n- プロジェクトの説明（2〜3 文）\n- セットアップ手順\n- 主な機能リスト`}
                    language="markdown"
                    title="改善後"
                  />
                </div>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-3">
                <MessageSquare size={18} className="text-primary" aria-hidden="true" />
                <h3 className="font-semibold text-foreground">例 3：コミットメッセージの作成</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-destructive mb-3">× 曖昧な指示</p>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                    <p className="text-sm text-foreground font-mono">コミットメッセージを考えてください。</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    何を変更したかが伝わらないため、意味のないメッセージが返ってくる
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-secondary mb-3">✓ 構造化された指示</p>
                  <CodeBlock
                    code={`以下の変更内容に対して、英語の\nコミットメッセージを 1 行で書いてください。\n\n## 変更内容\n- ナビゲーションに「Markdown 入門」\n  ページへのリンクを追加\n- Navigation.tsx を編集\n\n## 形式\nAdd/Fix/Update で始める形式で`}
                    language="markdown"
                    title="改善後"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            実践的なコツ
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">コードは必ずコードブロックで渡す</h4>
                  <p className="text-muted-foreground text-sm">
                    インデントや特殊文字がそのまま伝わります。コードをプレーンテキストで貼ると、AI が構造を誤認することがあります。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">一度の指示に複数の別タスクを混ぜない</h4>
                  <p className="text-muted-foreground text-sm">
                    「このコードを修正して、かつ README も書いて、さらにテストも追加して」は回答が散漫になります。タスクを分けて順番に依頼する方が結果が安定します。
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">出力形式を指定する</h4>
                  <p className="text-muted-foreground text-sm">
                    「箇条書きで」「コードのみ、説明は不要」「日本語で」など、形式を明示すると余計な出力が減ります。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">回答が意図と違ったら、補足して続ける</h4>
                  <p className="text-muted-foreground text-sm">
                    最初の回答で完璧にならなくて問題ありません。「もう少し短く」「コードではなく文章で」など、続けて修正を依頼する方が一回で全部を書くより効率的です。
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="Cursor での使い方">
              Cursor（コードエディタ）のチャット機能も同じ考え方が使えます。コードを選択して「このコードについて質問」すると、自動でコードブロックに変換されます。役割・文脈・タスクを意識して指示すると、より的確なコード補助が得られます。
            </InfoBox>
          </div>
        </section>

        {/* コーディングチャレンジ */}
        <section className="mb-12">
          <CodingChallenge
            title="構造化されたプロンプトを書いてみよう"
            description="以下の要素を含む AI への指示を Markdown で書いてください：見出し（## で状況・質問などのセクション分け）、箇条書き（条件や要件の列挙）、コードブロック（エラーメッセージやコードの引用）。テーマは自由です。"
            initialCode={`## 状況\n\n\n## 質問\n\n`}
            answer={`## 状況\n- React プロジェクトを開発中\n- git push を実行したらエラーが発生した\n\n## エラーメッセージ\n\`\`\`\nfatal: Authentication failed\n\`\`\`\n\n## 質問\nこのエラーの原因と対処方法を教えてください。`}
            hints={[
              '## で見出しを作ってセクションを分けましょう',
              '箇条書き（-）で状況や条件を整理しましょう',
              'コードブロック（```）でエラーメッセージを囲みましょう',
            ]}
            keywords={['##', '-', '```']}
            preview
            previewType="markdown"
          />
        </section>

        {/* Completion */}
        <section className="mb-12">
          <InfoBox type="success" title="プロンプトエンジニアリング入門完了">
            Markdown の構造をプロンプトに活用する基本を学びました。次は Git ワークフローの実践（Commit、Push、Pull）に進みます。
          </InfoBox>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/git/github/markdown')}>戻る</Button>
          <Button className="gap-2" onClick={() => navigate('/git/workflow/commit')}>
            次へ：ファイル作成と Commit
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
