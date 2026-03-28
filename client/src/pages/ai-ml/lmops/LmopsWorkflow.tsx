import { Settings, GitBranch, DollarSign, Activity, ShieldCheck } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';

/**
 * LMOps ワークフロー
 * STEP 10: LMOps セクション
 * - LMOps の概念と MLOps との比較
 * - プロンプト管理・評価・ガードレール・コスト最適化
 * - RAG パイプラインの実装例
 * - ファインチューニング vs RAG vs プロンプトエンジニアリング
 * - コスト管理とモデル選択
 * - 監視・ログ
 * - AI 倫理
 */

export default function LmopsWorkflow() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">
            STEP 10
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          LMOps ワークフロー
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          LLM をプロダクション環境で安定的に運用するための実践知識を学びます。
          プロンプト管理、評価、コスト最適化、RAG パイプラインの実装まで扱います。
        </p>

        <WhyNowBox tags={['LMOps', 'RAG 実装', '評価', 'コスト管理', 'モニタリング']}>
          <p>
            LLM を API で呼び出すだけなら簡単ですが、プロダクションで安定運用するには
            プロンプトの管理、出力の品質評価、コスト制御、ハルシネーション対策など、
            多くの運用課題に対応する必要があります。
          </p>
          <p>
            LMOps は、これらの課題を体系的に扱うための実践フレームワークです。
            MLOps の考え方をベースに、LLM 特有の要件に対応しています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* LMOps とは */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Settings className="text-primary" size={28} />
              LMOps とは
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              LMOps（Large Model Operations）は、LLM をプロダクションで運用するための実践体系です。
              従来の MLOps をベースに、LLM 特有の要件（プロンプト管理、出力評価、ハルシネーション対策など）を取り入れています。
            </p>

            {/* MLOps vs LMOps 比較 */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-lg font-bold text-foreground mb-4">MLOps</h3>
                <div className="space-y-2">
                  {['データ収集', '特徴量エンジニアリング', 'モデル学習', 'デプロイ', '監視'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-muted-foreground font-bold text-xs">{i + 1}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  モデルの学習・デプロイ・監視のサイクル
                </p>
              </div>
              <div className="rounded-xl border border-primary/30 bg-card p-5">
                <h3 className="text-lg font-bold text-primary mb-4">LMOps</h3>
                <div className="space-y-2">
                  {['プロンプト設計', '評価（Evals）', 'デプロイ', 'モニタリング', '改善'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-xs">{i + 1}</span>
                      </div>
                      <span className="text-sm text-foreground">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  プロンプト中心のイテレーションサイクル
                </p>
              </div>
            </div>

            <InfoBox type="info" title="MLOps との違い">
              MLOps ではモデルの学習自体が中心ですが、LMOps では既に学習済みの LLM を「どう使うか」が中心です。
              プロンプトの設計・管理・評価が、従来のモデル学習パイプラインに代わる重要な工程になります。
            </InfoBox>
          </section>

          {/* LMOps の主要要素 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <GitBranch className="text-primary" size={28} />
              LMOps の主要要素
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              LLM の運用を安定させるために押さえるべき 4 つの要素を紹介します。
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* 1. プロンプト管理 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">プロンプト管理</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- Git でプロンプトをバージョン管理</li>
                  <li>- テンプレート化して再利用可能に</li>
                  <li>- A/B テストで効果を比較検証</li>
                </ul>
              </div>

              {/* 2. 評価 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">評価（Evals）</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- 出力の正確性を自動テスト</li>
                  <li>- 安全性チェック（有害コンテンツ検出）</li>
                  <li>- 出力の一貫性をモニタリング</li>
                </ul>
              </div>

              {/* 3. ガードレール */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">ガードレール</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- 有害な出力の検出とフィルタリング</li>
                  <li>- PII（個人情報）の自動マスキング</li>
                  <li>- 出力フォーマットの検証</li>
                </ul>
              </div>

              {/* 4. コスト最適化 */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold text-sm">4</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">コスト最適化</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>- トークン使用量の追跡と管理</li>
                  <li>- タスクに応じた適切なモデル選択</li>
                  <li>- キャッシュによる重複リクエスト削減</li>
                </ul>
              </div>
            </div>
          </section>

          {/* RAG パイプラインの実装 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Activity className="text-primary" size={28} />
              RAG パイプラインの実装例
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              LangChain と Chroma を使って、シンプルな RAG パイプラインを構築する例を紹介します。
              ドキュメントの分割、ベクトル化、検索、LLM による回答生成までの一連の流れです。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">1. 必要なパッケージのインストール</h3>
            <CodeBlock
              code={`pip install langchain langchain-anthropic langchain-community
pip install chromadb sentence-transformers`}
              language="bash"
              title="RAG に必要なパッケージ"
            />
            <p className="text-muted-foreground mt-3 mb-8 leading-relaxed">
              LangChain は LLM アプリケーション開発のフレームワーク、Chroma はローカルで動作するベクトル DB、
              sentence-transformers は Embedding モデルを提供します。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">2. ドキュメントの分割（チャンキング）</h3>
            <CodeBlock
              code={`from langchain_text_splitters import RecursiveCharacterTextSplitter

# ドキュメントを適切なサイズに分割
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,       # 1チャンクの最大文字数
    chunk_overlap=50,     # チャンク間の重複文字数
    separators=["\\n\\n", "\\n", "。", " "]
)

chunks = splitter.split_documents(documents)`}
              language="python"
              title="ドキュメントのチャンク分割"
            />
            <p className="text-muted-foreground mt-3 mb-8 leading-relaxed">
              長い文書をそのままベクトル化すると検索精度が下がるため、適切なサイズに分割します。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">chunk_overlap</code> を設定すると、
              チャンクの境界で文脈が途切れるのを緩和できます。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">3. ベクトル DB に保存</h3>
            <CodeBlock
              code={`from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

# Embedding モデルの初期化
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# チャンクをベクトル化して Chroma に保存
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)`}
              language="python"
              title="ベクトル DB へのデータ格納"
            />
            <p className="text-muted-foreground mt-3 mb-8 leading-relaxed">
              各チャンクを Embedding モデルでベクトル化し、Chroma に保存します。
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">persist_directory</code> を指定するとディスクに永続化されます。
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">4. 検索 + LLM で回答生成</h3>
            <CodeBlock
              code={`from langchain_anthropic import ChatAnthropic

# 検索用のリトリーバーを作成
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}  # 上位3件を取得
)

# LLM の初期化
llm = ChatAnthropic(model="claude-sonnet-4-20250514")

# 質問に関連するドキュメントを検索
query = "プロジェクトのデプロイ手順を教えて"
relevant_docs = retriever.invoke(query)

# 検索結果をコンテキストとして LLM に渡す
context = "\\n\\n".join([doc.page_content for doc in relevant_docs])
prompt = f"""以下のドキュメントを参考に質問に回答してください。
ドキュメントにない情報は「記載がありません」と回答してください。

ドキュメント:
{context}

質問: {query}"""

response = llm.invoke(prompt)
print(response.content)`}
              language="python"
              title="検索結果を使った回答生成"
            />
            <p className="text-muted-foreground mt-3 leading-relaxed">
              リトリーバーが質問に関連する文書を検索し、その内容をプロンプトに含めて LLM に渡します。
              「ドキュメントにない情報は回答しない」と指示することで、ハルシネーションを抑制できます。
            </p>
          </section>

          {/* ファインチューニング vs RAG vs プロンプト */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">手法の比較: ファインチューニング vs RAG vs プロンプトエンジニアリング</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              LLM の出力をカスタマイズする 3 つの手法を比較します。
              多くの場合、プロンプトエンジニアリングから始め、必要に応じて RAG を導入するのが効率的です。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">観点</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">プロンプトエンジニアリング</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">RAG</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">ファインチューニング</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">コスト</td>
                    <td className="py-3 px-4 text-primary font-medium">低い</td>
                    <td className="py-3 px-4 text-muted-foreground">中程度</td>
                    <td className="py-3 px-4 text-muted-foreground">高い</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">実装難易度</td>
                    <td className="py-3 px-4 text-primary font-medium">簡単</td>
                    <td className="py-3 px-4 text-muted-foreground">中程度</td>
                    <td className="py-3 px-4 text-muted-foreground">高い</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">精度</td>
                    <td className="py-3 px-4 text-muted-foreground">タスクによる</td>
                    <td className="py-3 px-4 text-muted-foreground">高い（関連データがある場合）</td>
                    <td className="py-3 px-4 text-muted-foreground">高い（十分なデータがある場合）</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">データ要件</td>
                    <td className="py-3 px-4 text-muted-foreground">不要</td>
                    <td className="py-3 px-4 text-muted-foreground">検索対象の文書</td>
                    <td className="py-3 px-4 text-muted-foreground">大量の学習データ</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">更新しやすさ</td>
                    <td className="py-3 px-4 text-primary font-medium">即時</td>
                    <td className="py-3 px-4 text-primary font-medium">即時（DB 更新のみ）</td>
                    <td className="py-3 px-4 text-muted-foreground">再学習が必要</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="推奨アプローチ">
              まずプロンプトエンジニアリングで目標精度に達するか試す。
              達しない場合は RAG を導入して外部知識を活用する。
              それでも足りない特定のタスクについてのみファインチューニングを検討する。
              この順番で進めるのがコスト効率の面で合理的です。
            </InfoBox>
          </section>

          {/* コスト管理 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <DollarSign className="text-primary" size={28} />
              コスト管理
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              LLM API の利用料金はトークン数に基づいて計算されます。
              コストを管理するには、トークンの仕組みを理解し、適切なモデルを選択することが重要です。
            </p>

            {/* トークンの概念 */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">トークンとコスト</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                1 トークンは概ね英語 4 文字、日本語 0.5〜1 文字に相当します。
                入力トークンと出力トークンそれぞれに料金が発生し、一般に出力トークンの方が高価です。
              </p>
              <div className="rounded-lg border border-border bg-muted p-5">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground w-28 flex-shrink-0">英語 100 単語</span>
                    <span className="text-foreground font-mono">≈ 130 トークン</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground w-28 flex-shrink-0">日本語 100 文字</span>
                    <span className="text-foreground font-mono">≈ 100〜200 トークン</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground w-28 flex-shrink-0">コード 100 行</span>
                    <span className="text-foreground font-mono">≈ 500〜1000 トークン</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ※ 実際のトークン数はモデルのトークナイザによって異なります。日本語は英語より多くのトークンを消費する傾向があります。
                </p>
              </div>
            </div>

            {/* モデル選択の指針 */}
            <h3 className="text-xl font-bold text-foreground mb-4">モデル選択の指針</h3>
            <div className="overflow-x-auto rounded-xl border border-border mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 font-bold text-foreground">モデル</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">特徴</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">コスト</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">適したタスク</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">Haiku</td>
                    <td className="py-3 px-4 text-muted-foreground">高速、軽量</td>
                    <td className="py-3 px-4 text-primary font-medium">最も安価</td>
                    <td className="py-3 px-4 text-muted-foreground">分類、抽出、簡単な Q&A</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">Sonnet</td>
                    <td className="py-3 px-4 text-muted-foreground">バランス型</td>
                    <td className="py-3 px-4 text-muted-foreground">中程度</td>
                    <td className="py-3 px-4 text-muted-foreground">コード生成、RAG、対話</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="py-3 px-4 font-medium text-foreground">Opus</td>
                    <td className="py-3 px-4 text-muted-foreground">最高性能</td>
                    <td className="py-3 px-4 text-muted-foreground">最も高価</td>
                    <td className="py-3 px-4 text-muted-foreground">複雑な推論、分析、創造的タスク</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* トークン数カウント */}
            <h3 className="text-xl font-bold text-foreground mb-4">トークン数の確認</h3>
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

# レスポンスからトークン使用量を確認
print(f"入力トークン: {message.usage.input_tokens}")
print(f"出力トークン: {message.usage.output_tokens}")
print(f"合計トークン: {message.usage.input_tokens + message.usage.output_tokens}")`}
              language="python"
              title="API レスポンスからトークン使用量を確認"
            />
          </section>

          {/* 監視・ログ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">監視とログ</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              LLM の出力は確率的であり、同じ入力でも異なる出力が返ることがあります。
              プロダクション環境では、出力品質の継続的なモニタリングが不可欠です。
            </p>

            {/* なぜ監視が必要か */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="text-xl font-bold text-foreground mb-4">なぜ LLM の出力監視が重要か</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <div>
                    <span className="font-medium text-foreground">ハルシネーション</span>
                    <span className="text-muted-foreground"> — 事実と異なる情報を自信を持って出力する場合がある</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <div>
                    <span className="font-medium text-foreground">品質のばらつき</span>
                    <span className="text-muted-foreground"> — モデルの更新やプロンプトの微妙な変更で出力品質が変動する</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <div>
                    <span className="font-medium text-foreground">コストの急増</span>
                    <span className="text-muted-foreground"> — 想定外の長い出力や無限ループがコストを押し上げることがある</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">-</span>
                  <div>
                    <span className="font-medium text-foreground">安全性の問題</span>
                    <span className="text-muted-foreground"> — 有害なコンテンツや機密情報が出力に含まれるリスク</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* ツール紹介 */}
            <h3 className="text-xl font-bold text-foreground mb-4">主要な LLM 監視ツール</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-2">Langfuse</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  オープンソースの LLM オブザーバビリティ。トレース、評価、コスト追跡を一元管理。
                  セルフホスト可能。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-2">LangSmith</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  LangChain 開発元が提供。プロンプトのデバッグ、テスト、モニタリングに特化。
                  LangChain との統合が容易。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-bold text-foreground mb-2">Weights & Biases</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ML 実験管理の定番ツール。LLM のファインチューニングや評価結果の記録・比較に適用。
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="RAG パイプラインで最初にやるべきことは？"
              options={[
                { label: 'LLM にプロンプトを送信する' },
                { label: 'ドキュメントをチャンク分割してベクトル化する', correct: true },
                { label: 'ファインチューニングを開始する' },
                { label: 'コサイン類似度を計算する' },
              ]}
              explanation="RAG パイプラインでは、まず対象のドキュメントを適切なサイズにチャンク分割し、Embedding モデルでベクトル化してベクトル DB に格納します。検索と回答生成はその後のステップです。"
            />

            <Quiz
              question="コストを抑えつつ十分な精度を得るためのアプローチとして適切なのは？"
              options={[
                { label: '常に Opus（最高性能モデル）を使用する' },
                { label: 'ファインチューニングから始める' },
                { label: 'まず軽量モデル + RAG で試し、必要に応じてモデルを上げる', correct: true },
                { label: 'max_tokens を最小限に設定する' },
              ]}
              explanation="軽量モデル（Haiku など）と RAG を組み合わせることで、低コストで高い精度を実現できるケースが多くあります。必要に応じてモデルを Sonnet や Opus にスケールアップするのが効率的です。"
            />
          </section>

          {/* AI 倫理 */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ShieldCheck className="text-primary" size={28} />
              AI 倫理と安全性
            </h2>

            <InfoBox type="warning" title="LLM 運用で考慮すべき倫理的課題">
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground mb-1">ハルシネーション対策</p>
                  <p className="text-sm">
                    LLM は事実と異なる情報を自信を持って出力することがあります。
                    RAG による根拠の明示、出力の検証ステップ、ユーザーへの注意書きの表示が有効です。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">バイアスへの配慮</p>
                  <p className="text-sm">
                    学習データに含まれる偏りが出力に反映される場合があります。
                    評価データセットの多様性を確保し、定期的にバイアスチェックを実施することが重要です。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">プライバシーとデータ保護</p>
                  <p className="text-sm">
                    API に送信するデータに個人情報が含まれないよう、入力時の PII フィルタリングを実装します。
                    データの保持ポリシーも API プロバイダーごとに確認が必要です。
                  </p>
                </div>
              </div>
            </InfoBox>
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Anthropic API Documentation',
                  url: 'https://docs.anthropic.com/',
                  description: 'Claude API の公式ドキュメント。料金体系、モデル仕様の詳細。',
                },
                {
                  title: 'LangChain Documentation',
                  url: 'https://python.langchain.com/docs/introduction/',
                  description: 'LLM アプリケーション開発フレームワーク。RAG パイプラインの構築ガイド。',
                },
                {
                  title: 'Chroma Documentation',
                  url: 'https://docs.trychroma.com/',
                  description: 'オープンソースのベクトルデータベース。ローカル環境での RAG 開発に。',
                },
                {
                  title: 'Langfuse Documentation',
                  url: 'https://langfuse.com/docs',
                  description: 'オープンソースの LLM オブザーバビリティプラットフォーム。',
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
