import { FileText, GitBranch, Layers, RefreshCw, CheckSquare, Scale } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function SpecDrivenDev() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            仕様駆動開発 (SDD)
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            仕様を唯一の信頼源（SSoT）として定義し、AI によるコード生成の精度と一貫性を高める開発手法。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* SDDとは */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FileText className="text-[var(--claude-primary)]" />
              SDD（Spec-Driven Development）とは
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              仕様駆動開発は、自然言語で記述した仕様書を開発の起点とし、AI がその仕様に基づいてコードを生成・検証するアプローチです。仕様が「唯一の信頼源（Single Source of Truth）」として機能し、コードは仕様の派生物として扱われます。
            </p>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h4 className="font-bold mb-4">SDD の核心</h4>
              <div className="space-y-3">
                {[
                  { label: '仕様がコードの上位', desc: 'コードではなく仕様書が設計の真実。仕様が変われば、コードは仕様に従って再生成される。' },
                  { label: '反復的な洗練', desc: '仕様 → 実装 → 検証 → 仕様修正のループを回し、仕様とコードの両方を段階的に改善する。' },
                  { label: 'AI との協働に最適', desc: 'AI は自然言語の仕様を理解してコードを生成できる。仕様が明確であるほど生成精度が高い。' },
                ].map(item => (
                  <div key={item.label} className="flex gap-3">
                    <span className="text-[var(--claude-primary)] font-bold text-sm min-w-[160px] shrink-0">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TDDとの違い */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Scale className="text-[var(--claude-primary)]" />
              TDD との違い
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              テスト駆動開発（TDD）はテストコードを起点としますが、SDD は自然言語の仕様書を起点とします。両者は排他的ではなく、SDD のワークフロー内でテストを活用できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-red-500">TDD（テスト駆動開発）</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>1. テストコードを書く</li>
                  <li>2. テストが失敗することを確認</li>
                  <li>3. テストを通す最小限のコードを書く</li>
                  <li>4. リファクタリング</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3 italic">起点: テストコード（実行可能な仕様）</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">SDD（仕様駆動開発）</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>1. 自然言語で仕様を定義する</li>
                  <li>2. 技術設計を仕様から導出する</li>
                  <li>3. AI がコードとテストを生成する</li>
                  <li>4. 検証結果を仕様にフィードバック</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3 italic">起点: 自然言語の仕様書</p>
              </div>
            </div>
            <InfoBox type="info" title="組み合わせが効果的">
              SDD の仕様書に基づいて TDD のテストコードを生成し、そのテストを検証基準として使うアプローチが実用的です。仕様 → テスト → 実装 の順に進めます。
            </InfoBox>
          </section>

          {/* ワークフロー */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="text-[var(--claude-primary)]" />
              SDD のワークフロー
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              SDD は6つのフェーズで構成されます。各フェーズの出力が次のフェーズの入力となるパイプラインです。
            </p>
            <div className="space-y-3">
              {[
                { phase: '1. 仕様定義', desc: '機能の目的、入出力、制約条件、エッジケースを自然言語で記述する。', file: 'specs/auth-flow.md' },
                { phase: '2. 技術設計', desc: '仕様からアーキテクチャ、データ構造、API設計を導出する。', file: 'specs/auth-flow-design.md' },
                { phase: '3. 実装計画', desc: '変更対象ファイル、実装順序、依存関係を明確にする。', file: 'specs/auth-flow-plan.md' },
                { phase: '4. コード生成', desc: 'AI が仕様と計画に基づいてコードを生成する。', file: 'src/auth/*.ts' },
                { phase: '5. テスト検証', desc: '生成されたコードをテストで検証する。', file: 'tests/auth/*.test.ts' },
                { phase: '6. 仕様フィードバック', desc: '実装中に発見した仕様の不備や新しい要件を仕様書に反映する。', file: 'specs/auth-flow.md（更新）' },
              ].map(item => (
                <div key={item.phase} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-[var(--claude-primary)] font-bold text-sm min-w-[120px] shrink-0">{item.phase}</span>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <code className="text-xs text-muted-foreground mt-1 block">{item.file}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CLAUDE.md との連携 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-[var(--claude-primary)]" />
              CLAUDE.md と仕様ファイルの連携
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              CLAUDE.md に仕様ファイルの参照方法とプロジェクトの規約を記載し、Claude Code が仕様を正しく解釈できるようにします。
            </p>
            <CodeBlock
              code={`# CLAUDE.md

## プロジェクト構造
- specs/ - 機能仕様書（SSoT）
- specs/README.md - 仕様書の書き方ガイド
- src/ - 実装コード（仕様の派生物）

## 開発規約
- 新機能は必ず specs/ に仕様書を作成してから実装する
- 仕様書のフォーマットは specs/README.md に従う
- 実装と仕様の乖離が見つかったら仕様書を先に修正する

## コーディング規約
- TypeScript strict mode
- テストカバレッジ 80% 以上
- API は OpenAPI 形式で仕様を記述`}
              language="markdown"
            />
            <CodeBlock
              code={`# specs/user-registration.md

## 概要
ユーザー登録フローの仕様。

## 入力
- email: string（必須、RFC 5322準拠）
- password: string（必須、8文字以上、英数字混合）
- name: string（必須、1-100文字）

## 処理フロー
1. 入力バリデーション
2. メールアドレスの重複チェック
3. パスワードのハッシュ化（bcrypt, rounds=12）
4. ユーザーレコードの作成
5. 確認メールの送信
6. 仮登録状態で返却

## エッジケース
- 既存メールアドレスでの登録 → 409 Conflict
- 弱いパスワード → 422 Unprocessable Entity
- メール送信失敗 → ユーザー作成は成功、リトライキュー登録

## 出力
- 201 Created: { id, email, name, status: "pending" }`}
              language="markdown"
            />
          </section>

          {/* Claude Code での実践 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <RefreshCw className="text-[var(--claude-primary)]" />
              Claude Code での実践
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code のモード切替と機能を活用して SDD を実践する具体的な手順です。
            </p>
            <CodeBlock
              code={`# Step 1: Plan Mode で仕様書を作成
# Shift+Tab → Plan Mode に切替
> ユーザー登録機能の仕様を specs/user-registration.md に作成して。
> 入力バリデーション、処理フロー、エッジケース、出力を含めて。

# Step 2: 仕様レビュー（引き続き Plan Mode）
> @specs/user-registration.md をレビューして。
> セキュリティ上の懸念やエッジケースの漏れを指摘して。

# Step 3: 通常モードに戻して実装
# Shift+Tab → 通常モードに切替
> @specs/user-registration.md の仕様に基づいて実装して。
> テストも書いて、全てパスすることを確認して。

# Step 4: 検証結果の仕様フィードバック
> 実装中に発見した仕様の不備があれば
> specs/user-registration.md を更新して。`}
              language="bash"
            />
            <InfoBox type="warning" title="仕様と実装の乖離に注意">
              実装後に仕様書の更新を怠ると、仕様とコードが乖離します。Claude Code に「仕様書と実装の整合性を確認して」と依頼し、定期的に検証しましょう。
            </InfoBox>
          </section>

          {/* 適用判断 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckSquare className="text-[var(--claude-primary)]" />
              適用が効果的なケース vs 過剰になるケース
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              SDD はすべてのタスクに適しているわけではありません。コストとメリットのバランスを考えて適用しましょう。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/20">
                <h4 className="font-bold text-sm mb-3 text-emerald-700 dark:text-emerald-400">効果的なケース</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>- 複数人で開発する機能</li>
                  <li>- API設計やデータモデルの策定</li>
                  <li>- 長期間メンテナンスする基幹機能</li>
                  <li>- ビジネスロジックが複雑な処理</li>
                  <li>- 外部システムとの連携仕様</li>
                  <li>- AI に繰り返し実装を依頼する機能</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20">
                <h4 className="font-bold text-sm mb-3 text-amber-700 dark:text-amber-400">過剰になるケース</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>- ワンショットのスクリプト作成</li>
                  <li>- CSS の微調整</li>
                  <li>- 明確なバグ修正（原因が特定済み）</li>
                  <li>- プロトタイプの素早い検証</li>
                  <li>- 既存パターンの単純な踏襲</li>
                  <li>- 5分以内で終わる小さな変更</li>
                </ul>
              </div>
            </div>
          </section>

          {/* まとめ */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">SDD 導入のステップ</h2>
            <div className="space-y-3">
              {[
                { step: '1', text: 'specs/ ディレクトリを作成し、仕様書のテンプレートを用意する' },
                { step: '2', text: 'CLAUDE.md に仕様駆動の開発規約を記載する' },
                { step: '3', text: '新機能は Plan Mode で仕様書を作成してから実装する習慣をつける' },
                { step: '4', text: '実装後に仕様との整合性を検証するステップを組み込む' },
                { step: '5', text: 'チーム内で仕様書レビューのプロセスを確立する' },
              ].map(item => (
                <div key={item.step} className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-sm font-bold text-[var(--claude-primary)] w-6 text-center">{item.step}</span>
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </section>
          <CodingChallenge
            preview
            previewType="markdown"
            title="機能仕様書を書いてみよう"
            description="SDD の手法に従って、ログイン機能の仕様書を Markdown で書いてください。概要、入力、処理フロー、エッジケース、出力を含めましょう。"
            initialCode={`# specs/login.md\n\n## 概要\n# ログイン機能の仕様を書いてください\n\n## 入力\n# 必要な入力フィールドを定義\n\n## 処理フロー\n# 処理の手順を番号付きリストで記述\n\n## エッジケース\n# 異常系のケースを列挙\n\n## 出力\n# 成功時のレスポンスを定義`}
            answer={`# specs/login.md\n\n## 概要\nユーザーログイン機能の仕様。メールアドレスとパスワードで認証する。\n\n## 入力\n- email: string（必須、RFC 5322準拠）\n- password: string（必須、8文字以上）\n\n## 処理フロー\n1. 入力バリデーション\n2. メールアドレスでユーザーを検索\n3. パスワードのハッシュ照合（bcrypt）\n4. JWT アクセストークンとリフレッシュトークンを生成\n5. ログイン履歴を記録\n\n## エッジケース\n- 存在しないメールアドレス → 401 Unauthorized\n- パスワード不一致 → 401 Unauthorized\n- アカウントロック（5回連続失敗）→ 423 Locked\n\n## 出力\n- 200 OK: { accessToken, refreshToken, expiresIn: 3600 }`}
            hints={[
              '入力にはフィールド名、型、バリデーション条件を明記しましょう',
              '処理フローは順番通りに番号付きリストで書きます',
              'エッジケースには HTTP ステータスコードを含めると実装時に便利です',
            ]}
            keywords={['email', 'password', 'バリデーション', 'JWT', '401']}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
