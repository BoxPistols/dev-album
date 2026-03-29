import { Brain, Cpu, MessageSquare, Search, ArrowRight, Database } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

/**
 * LLM の仕組みと活用
 * STEP 10: LMOps セクション
 * - Transformer / トークン化の概要
 * - 主要 LLM の比較
 * - API 活用 (Anthropic API)
 * - プロンプトエンジニアリング基本テクニック
 * - RAG の仕組みと処理フロー
 * - ベクトル検索の基本
 */

export default function LlmBasics() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">
            STEP 10
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          LLM の仕組みと活用
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          大規模言語モデル（LLM）がどのように動作し、API を通じてどう活用するかを理解します。
          RAG やベクトル検索を使って、LLM の能力を拡張する方法も扱います。
        </p>

        <WhyNowBox tags={['LLM', 'API', 'プロンプトエンジニアリング', 'RAG', 'ベクトル検索']}>
          <p>
            Web 開発者にとって LLM は、もはや研究者だけのものではありません。
            API を通じてアプリケーションに組み込むことで、チャットボット、要約、コード生成など
            多様な機能を実装できます。
          </p>
          <p>
            内部の仕組みを完全に理解する必要はありませんが、基本的な動作原理を知っておくと
            API の使い方やプロンプトの設計で的確な判断ができるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* LLM とは */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Brain className="text-primary" size={28} />
              LLM とは
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              LLM（Large Language Model）は、大量のテキストデータで学習された言語モデルです。
              入力されたテキストに対して、次に来る可能性が高いテキストを予測して生成します。
            </p>

            {/* Transformer の説明 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Transformer アーキテクチャ</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                現在の LLM の基盤となっている仕組みが Transformer です。
                2017 年に Google が発表した「Attention Is All You Need」という論文で提案されました。
              </p>
              <div className="rounded-lg border border-border bg-muted p-5 mb-4">
                <h4 className="font-bold text-foreground mb-3 text-sm">Self-Attention の直感的な理解</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  「彼はリンゴを食べた。それは美味しかった。」という文で、
                  「それ」が「リンゴ」を指していることを人間は自然に理解します。
                  Self-Attention は、文中の各単語が他のどの単語と関連が強いかを数値的に計算する仕組みです。
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">彼は</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">リンゴを</span>
                  <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">食べた</span>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-bold border border-primary/30">それは</span>
                  <ArrowRight size={14} className="text-primary" />
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">リンゴ</span>
                  <span className="text-xs text-muted-foreground ml-1">（Attention が高い）</span>
                </div>
              </div>
            </div>

            {/* トークン化 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">トークン化の仕組み</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                LLM はテキストをそのまま処理するのではなく、まず「トークン」という単位に分割します。
                トークンは単語や部分語（サブワード）に対応する数値 ID です。
              </p>

              {/* Visual: トークン化のイメージ */}
              <div className="rounded-lg border border-border bg-muted p-5">
                <p className="text-xs font-semibold text-muted-foreground mb-3">トークン化のイメージ</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-16 flex-shrink-0">入力</span>
                    <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground font-mono text-sm">
                      こんにちは世界
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-16 flex-shrink-0">トークン</span>
                    <div className="flex gap-1 flex-wrap">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono border border-primary/20">こん</span>
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono border border-primary/20">にち</span>
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono border border-primary/20">は</span>
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono border border-primary/20">世界</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-16 flex-shrink-0">数値 ID</span>
                    <div className="flex gap-1 flex-wrap">
                      <span className="px-2 py-1 rounded bg-muted text-foreground text-xs font-mono border border-border">12458</span>
                      <span className="px-2 py-1 rounded bg-muted text-foreground text-xs font-mono border border-border">8832</span>
                      <span className="px-2 py-1 rounded bg-muted text-foreground text-xs font-mono border border-border">649</span>
                      <span className="px-2 py-1 rounded bg-muted text-foreground text-xs font-mono border border-border">19765</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ※ 実際のトークン分割はモデルによって異なります。日本語は英語より多くのトークンを消費する傾向があります。
                </p>
              </div>
            </div>

            {/* コンテキストウィンドウ */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">コンテキストウィンドウ</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                LLM が一度に処理できるトークン数の上限をコンテキストウィンドウと呼びます。
                入力プロンプトと出力を合わせた合計がこの上限に収まる必要があります。
              </p>
              <div className="rounded-lg border border-border bg-muted p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-foreground">入力トークン</span>
                      <span className="text-xs text-muted-foreground">（プロンプト + コンテキスト）</span>
                    </div>
                    <div className="h-4 bg-primary/20 rounded-l-full rounded-r-sm" style={{ width: '60%' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-foreground">出力トークン</span>
                      <span className="text-xs text-muted-foreground">（生成テキスト）</span>
                    </div>
                    <div className="h-4 bg-primary/40 rounded-l-sm rounded-r-full" style={{ width: '40%' }} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Claude は最大 200K トークンのコンテキストウィンドウに対応しており、長い文書全体を入力に含めることが可能です。
                </p>
              </div>
            </div>
          </section>

          {/* 主要 LLM の比較 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Cpu className="text-primary" size={28} />
              主要な LLM の比較
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              現在利用可能な主要 LLM とその特徴を比較します。
              それぞれ得意分野やライセンス形態が異なるため、用途に応じた選択が重要です。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">モデル</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">提供元</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">特徴</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">用途</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-primary">Claude</td>
                    <td className="py-3 px-4 text-muted-foreground">Anthropic</td>
                    <td className="py-3 px-4 text-muted-foreground">長文コンテキスト、コーディング能力、安全性重視の設計</td>
                    <td className="py-3 px-4 text-muted-foreground">コード生成、長文分析、対話</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">GPT-4o</td>
                    <td className="py-3 px-4 text-muted-foreground">OpenAI</td>
                    <td className="py-3 px-4 text-muted-foreground">マルチモーダル対応、広範な知識ベース、高速な推論</td>
                    <td className="py-3 px-4 text-muted-foreground">汎用タスク、画像理解、音声</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">Gemini</td>
                    <td className="py-3 px-4 text-muted-foreground">Google</td>
                    <td className="py-3 px-4 text-muted-foreground">Google サービス統合、マルチモーダル、長いコンテキスト</td>
                    <td className="py-3 px-4 text-muted-foreground">検索連携、ドキュメント処理</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">Llama</td>
                    <td className="py-3 px-4 text-muted-foreground">Meta</td>
                    <td className="py-3 px-4 text-muted-foreground">オープンソース、ローカル実行可能、カスタマイズ性が高い</td>
                    <td className="py-3 px-4 text-muted-foreground">オンプレミス、研究、カスタムモデル</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="モデル選択の考え方">
              プロジェクトの要件（精度、コスト、データのプライバシー、レイテンシ）によって適切なモデルは変わります。
              まずは API が使いやすいサービスで試し、要件に応じて切り替えるのが実践的です。
            </InfoBox>
          </section>

          {/* API 活用 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <MessageSquare className="text-primary" size={28} />
              Anthropic API の実践
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Anthropic の Claude API を例に、LLM を API として利用する基本的な流れを紹介します。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">1. SDK のインストール</h3>
            <CodeBlock
              code="pip install anthropic"
              language="bash"
              title="Anthropic SDK のインストール"
            />
            <p className="text-muted-foreground mt-3 mb-8 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">ANTHROPIC_API_KEY</code> 環境変数に API キーを設定しておくと、SDK が自動で読み取ります。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">2. 基本的な API 呼び出し</h3>
            <CodeBlock
              code={`import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Pythonの特徴を3つ教えて"}
    ]
)

print(message.content[0].text)`}
              language="python"
              title="Claude API の基本呼び出し"
            />
            <p className="text-muted-foreground mt-3 mb-8 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">messages.create()</code> にモデル名、最大トークン数、メッセージを渡すだけで応答が得られます。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">max_tokens</code> は出力の最大長を制御するパラメータです。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">3. システムプロンプトの活用</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              システムプロンプトを使うと、モデルの振る舞いや回答のスタイルを制御できます。
            </p>
            <CodeBlock
              code={`message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    system="あなたはシニアのWeb開発エンジニアです。初心者にも分かりやすく、具体的なコード例を交えて回答してください。",
    messages=[
        {"role": "user", "content": "ReactでAPIからデータを取得する方法を教えてください"}
    ]
)

print(message.content[0].text)`}
              language="python"
              title="システムプロンプトの設定"
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">system</code> パラメータに役割や制約を記述することで、回答のトーンや形式を一貫させることができます。
              ユーザーメッセージとは別に、モデルへの「前提条件」として機能します。
            </p>
          </section>

          {/* プロンプトエンジニアリング */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              プロンプトエンジニアリングの基本テクニック
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じ質問でも、指示の書き方（プロンプト）によって回答の品質は大きく変わります。
              ここでは代表的な 3 つのテクニックを紹介します。
            </p>

            {/* Zero-shot */}
            <div className="rounded-xl border border-border bg-card p-6 mb-4">
              <h3 className="text-lg font-bold text-foreground mb-3">Zero-shot プロンプティング</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                例示なしで直接タスクを依頼する方法です。シンプルなタスクに向いています。
              </p>
              <CodeBlock
                code={`以下のテキストの感情を「ポジティブ」「ネガティブ」「中立」で分類してください。

テキスト: "このレストランの料理は素晴らしかった"`}
                language="markdown"
                title="Zero-shot の例"
              />
            </div>

            {/* Few-shot */}
            <div className="rounded-xl border border-border bg-card p-6 mb-4">
              <h3 className="text-lg font-bold text-foreground mb-3">Few-shot プロンプティング</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                いくつかの入出力例を示してからタスクを依頼する方法です。
                モデルにパターンを学習させることで、より正確な出力が得られます。
              </p>
              <CodeBlock
                code={`以下の例に従って、テキストの感情を分類してください。

テキスト: "最高の一日だった" → ポジティブ
テキスト: "電車が遅延して困った" → ネガティブ
テキスト: "今日は火曜日です" → 中立

テキスト: "新機能のリリースが待ち遠しい" → `}
                language="markdown"
                title="Few-shot の例"
              />
            </div>

            {/* Chain-of-Thought */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Chain-of-Thought（思考の連鎖）</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                「ステップごとに考えてください」と指示することで、推論を段階的に行わせるテクニックです。
                複雑な問題で精度が向上します。
              </p>
              <CodeBlock
                code={`以下の問題をステップごとに考えて回答してください。

問題: ECサイトのカート機能で、クーポン適用後の合計金額を計算するロジックを設計してください。
条件:
- 商品ごとに異なる税率がある
- クーポンは税抜き価格に適用する
- 送料は合計が5000円以上なら無料

ステップごとに考えてください。`}
                language="markdown"
                title="Chain-of-Thought の例"
              />
            </div>
          </section>

          {/* RAG の仕組み */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Search className="text-primary" size={28} />
              RAG（Retrieval-Augmented Generation）の仕組み
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              RAG は、LLM の回答精度を向上させるために外部の知識ベースから関連情報を検索し、
              それをプロンプトに含めて回答を生成する手法です。
              LLM が学習していない最新情報や社内データに基づいた回答を可能にします。
            </p>

            {/* なぜ RAG が必要か */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">なぜ RAG が必要なのか</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                LLM は学習時のデータに基づいて回答を生成します。そのため以下の限界があります。
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>学習データのカットオフ以降の最新情報を知らない</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>社内文書や非公開データにアクセスできない</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <span>根拠のない情報を生成することがある（ハルシネーション）</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                RAG はこれらの問題に対して、外部データソースから関連情報を取得し LLM に渡すことで、
                正確で根拠のある回答を生成させるアプローチです。
              </p>
            </div>

            {/* RAG フロー図 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <p className="text-sm font-semibold text-foreground mb-4">RAG の処理フロー</p>
              <div className="space-y-3">
                {[
                  { step: '1', label: 'ユーザーの質問', desc: '質問を受け取る' },
                  { step: '2', label: '質問をベクトル化', desc: 'Embedding モデルで質問を数値ベクトルに変換' },
                  { step: '3', label: 'ベクトル DB で検索', desc: '類似度の高い文書チャンクを検索' },
                  { step: '4', label: 'LLM にコンテキストとして渡す', desc: '検索結果 + 質問をプロンプトに結合' },
                  { step: '5', label: '回答生成', desc: 'LLM が文書に基づいて回答を生成' },
                ].map((item, i) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    {i < 4 && (
                      <ArrowRight size={14} className="text-muted-foreground flex-shrink-0 mt-2 hidden md:block rotate-90 md:rotate-0" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                RAG により、LLM の学習データに含まれない社内文書やリアルタイムの情報を活用した回答が可能になります。
              </p>
            </div>

            <InfoBox type="info" title="RAG vs ファインチューニング">
              <p className="mb-2">
                ファインチューニング（モデルの再学習）と比べて、RAG には以下の利点があります。
              </p>
              <ul className="space-y-1 text-sm">
                <li>- 実装コストが低い（モデルの再学習が不要）</li>
                <li>- データの更新が即座に反映される（ベクトル DB を更新するだけ）</li>
                <li>- 回答の根拠を明示できる（参照した文書を提示可能）</li>
              </ul>
              <p className="mt-2">
                まず RAG を検討し、それで精度が足りない場合にファインチューニングを検討するのが一般的です。
              </p>
            </InfoBox>
          </section>

          {/* ベクトル検索の基本 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Database className="text-primary" size={28} />
              ベクトル検索（Vector Search）の基本
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              RAG の中核をなすのがベクトル検索です。テキストを数値ベクトル（Embedding）に変換し、
              意味的に類似した文書を高速に検索する仕組みです。
            </p>

            {/* Embedding とは */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Embedding（埋め込み）とは</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Embedding は、テキストの意味を数百次元の数値ベクトルに変換する処理です。
                意味が近いテキスト同士は、ベクトル空間上で近い位置に配置されます。
              </p>

              {/* Visual: ベクトル化のイメージ */}
              <div className="rounded-lg border border-border bg-muted p-5">
                <p className="text-xs font-semibold text-muted-foreground mb-3">意味が近い単語はベクトルも近い</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium text-sm min-w-[3rem] text-center">"猫"</span>
                    <ArrowRight size={14} className="text-muted-foreground" />
                    <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground font-mono text-xs">[0.2, 0.8, 0.1, 0.5, ...]</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium text-sm min-w-[3rem] text-center">"犬"</span>
                    <ArrowRight size={14} className="text-muted-foreground" />
                    <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground font-mono text-xs">[0.3, 0.7, 0.2, 0.4, ...]</span>
                    <span className="text-xs text-primary font-medium">← 類似度が高い</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-medium text-sm min-w-[3rem] text-center">"車"</span>
                    <ArrowRight size={14} className="text-muted-foreground" />
                    <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground font-mono text-xs">[0.9, 0.1, 0.7, 0.2, ...]</span>
                    <span className="text-xs text-muted-foreground">← 類似度が低い</span>
                  </div>
                </div>
              </div>
            </div>

            {/* コサイン類似度 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">コサイン類似度</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                2 つのベクトルがどれだけ「同じ方向」を向いているかを測る指標です。
                値は -1 から 1 の範囲で、1 に近いほど意味が似ていることを示します。
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-border bg-muted p-4 text-center">
                  <p className="text-2xl font-bold text-primary mb-1">1.0</p>
                  <p className="text-xs text-muted-foreground">完全に同じ方向</p>
                  <p className="text-xs text-muted-foreground">（意味が同じ）</p>
                </div>
                <div className="rounded-lg border border-border bg-muted p-4 text-center">
                  <p className="text-2xl font-bold text-foreground mb-1">0.0</p>
                  <p className="text-xs text-muted-foreground">直交</p>
                  <p className="text-xs text-muted-foreground">（無関係）</p>
                </div>
                <div className="rounded-lg border border-border bg-muted p-4 text-center">
                  <p className="text-2xl font-bold text-muted-foreground mb-1">-1.0</p>
                  <p className="text-xs text-muted-foreground">正反対の方向</p>
                  <p className="text-xs text-muted-foreground">（意味が逆）</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                ベクトル検索では、クエリのベクトルと各文書のベクトルのコサイン類似度を計算し、
                類似度が高い順に文書を返します。キーワードの完全一致ではなく「意味の近さ」で検索できるのが特徴です。
              </p>
            </div>

            {/* 主要なベクトル DB */}
            <h3 className="text-xl font-bold text-foreground mb-4">主要なベクトルデータベース</h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">ベクトル DB</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">種類</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">特徴</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">適したユースケース</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">Pinecone</td>
                    <td className="py-3 px-4 text-muted-foreground">マネージド</td>
                    <td className="py-3 px-4 text-muted-foreground">フルマネージド、スケーラブル、運用不要</td>
                    <td className="py-3 px-4 text-muted-foreground">本番環境、大規模データ</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">Chroma</td>
                    <td className="py-3 px-4 text-muted-foreground">ローカル / OSS</td>
                    <td className="py-3 px-4 text-muted-foreground">セットアップが簡単、Python ネイティブ</td>
                    <td className="py-3 px-4 text-muted-foreground">プロトタイプ、ローカル開発</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">pgvector</td>
                    <td className="py-3 px-4 text-muted-foreground">PostgreSQL 拡張</td>
                    <td className="py-3 px-4 text-muted-foreground">既存の PostgreSQL に追加可能、SQL で操作</td>
                    <td className="py-3 px-4 text-muted-foreground">既存 DB との統合</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">Qdrant</td>
                    <td className="py-3 px-4 text-muted-foreground">OSS / マネージド</td>
                    <td className="py-3 px-4 text-muted-foreground">Rust 製で高速、フィルタリング機能が強力</td>
                    <td className="py-3 px-4 text-muted-foreground">高速検索、メタデータフィルタ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="LLM が学習データにない最新情報に回答するには、どのアプローチが適切か？"
              options={[
                { label: 'プロンプトを長くする' },
                { label: 'RAG（外部データを検索して LLM に渡す）', correct: true },
                { label: 'max_tokens を増やす' },
                { label: 'temperature を下げる' },
              ]}
              explanation="RAG（Retrieval-Augmented Generation）は、外部の知識ベースから関連情報を検索してプロンプトに含めることで、LLM が学習していない情報にも正確に回答できるようにする手法です。"
            />

            <Quiz
              question="テキストをベクトルに変換する処理を何と呼ぶ？"
              options={[
                { label: 'Tokenization（トークン化）' },
                { label: 'Embedding（埋め込み）', correct: true },
                { label: 'Chunking（チャンク分割）' },
                { label: 'Normalization（正規化）' },
              ]}
              explanation="Embedding（埋め込み）は、テキストの意味を数値ベクトルに変換する処理です。Tokenization はテキストをトークンに分割する処理、Chunking はドキュメントを小さな単位に分割する処理で、それぞれ異なります。"
            />

            <Quiz
              question="Few-shot プロンプティングとは？"
              options={[
                { label: 'モデルを少量のデータでファインチューニングする手法' },
                { label: 'プロンプト内にいくつかの入出力例を示してからタスクを依頼する手法', correct: true },
                { label: 'レスポンスの文字数を制限する手法' },
                { label: 'API の呼び出し回数を最小化する手法' },
              ]}
              explanation="Few-shot プロンプティングは、プロンプト内に少数の入出力例（数ショット）を含めることで、モデルにタスクのパターンを示す手法です。例示なしの Zero-shot と比べて、より正確な出力が期待できます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Anthropic API Documentation',
                  url: 'https://docs.anthropic.com/',
                  description: 'Claude API の公式ドキュメント。認証、エンドポイント、パラメータの詳細。',
                },
                {
                  title: 'Anthropic Prompt Engineering Guide',
                  url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
                  description: 'Anthropic 公式のプロンプトエンジニアリングガイド。',
                },
                {
                  title: 'LangChain Documentation',
                  url: 'https://python.langchain.com/docs/introduction/',
                  description: 'LLM アプリケーション開発フレームワーク。RAG パイプラインの構築に活用。',
                },
                {
                  title: 'Attention Is All You Need (原論文)',
                  url: 'https://arxiv.org/abs/1706.03762',
                  description: 'Transformer アーキテクチャを提案した 2017 年の論文。',
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
