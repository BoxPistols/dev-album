import { Workflow, Target, FolderSearch, RotateCcw, Zap, AlertTriangle } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function EffectiveWorkflows() {
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
            効果的なワークフロー
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude Code の能力を引き出すための作業フロー設計と実践的なプロンプティング手法。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* 検証可能な指示 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="text-[var(--claude-primary)]" />
              検証可能な指示を与える
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code が自律的に品質を確認できるよう、検証手段を含んだ指示を与えることが重要です。テスト、型チェック、スクリーンショット確認など、成功基準を明示することで修正ループの精度が向上します。
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'テストで検証',
                  example: '「この関数のユニットテストを書いてから実装して。テストが全てパスすることを確認して」',
                  desc: 'テストの成否という客観的基準で品質を判定できる。',
                },
                {
                  title: 'スクリーンショットで検証',
                  example: '「UIを変更したらスクリーンショットを撮って見せて」',
                  desc: 'MCP経由のスクリーンショットツールで視覚的な確認が可能。',
                },
                {
                  title: '期待出力で検証',
                  example: '「このコマンドを実行して、出力に "OK" が含まれることを確認して」',
                  desc: 'コマンド出力の文字列マッチで成功を判定する。',
                },
                {
                  title: '型チェックで検証',
                  example: '「変更後に npx tsc --noEmit を実行して型エラーがないことを確認して」',
                  desc: 'コンパイラの出力で型安全性を保証する。',
                },
              ].map(item => (
                <div key={item.title} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                  <p className="text-xs text-[var(--claude-primary)] italic mb-2">{item.example}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <InfoBox type="info" title="自己修正ループ">
              検証手段を伴う指示では、Claude Code がエラーを検出すると自動的に修正を試みます。テストの失敗メッセージやコンパイラエラーが次のアクションへのフィードバックとして機能します。
            </InfoBox>
          </section>

          {/* 4フェーズワークフロー */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Workflow className="text-[var(--claude-primary)]" />
              Explore → Plan → Implement → Commit
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              公式ドキュメントが推奨する4フェーズのワークフローです。各フェーズで明確な目的を持つことで、的確な成果物を得られます。
            </p>
            <div className="space-y-4">
              <div className="p-5 rounded-r-xl border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-white bg-blue-500 rounded px-2 py-0.5">Phase 1</span>
                  <h4 className="font-bold">Explore（探索）</h4>
                </div>
                <p className="text-sm text-muted-foreground">コードベースの理解を深める。関連ファイルの特定、既存パターンの把握、依存関係の確認を行う。</p>
              </div>
              <div className="p-5 rounded-r-xl border-l-4 border-purple-500 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-white bg-purple-500 rounded px-2 py-0.5">Phase 2</span>
                  <h4 className="font-bold">Plan（計画）</h4>
                </div>
                <p className="text-sm text-muted-foreground">実装方針を策定する。Plan Mode（Shift+Tab）に切り替え、変更対象のファイルと手順を明確にする。</p>
              </div>
              <div className="p-5 rounded-r-xl border-l-4 border-emerald-500 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-white bg-emerald-500 rounded px-2 py-0.5">Phase 3</span>
                  <h4 className="font-bold">Implement（実装）</h4>
                </div>
                <p className="text-sm text-muted-foreground">計画に基づいてコードを変更する。テスト実行やリンターでの検証を含めて指示する。</p>
              </div>
              <div className="p-5 rounded-r-xl border-l-4 border-amber-500 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-white bg-amber-500 rounded px-2 py-0.5">Phase 4</span>
                  <h4 className="font-bold">Commit（記録）</h4>
                </div>
                <p className="text-sm text-muted-foreground">変更内容を適切な粒度でコミットする。Claude Code にコミットメッセージの生成も任せられる。</p>
              </div>
            </div>
            <CodeBlock
              code={`# Phase 1: Explore
$ claude
> このプロジェクトの認証周りの実装を調べて。
> 関連ファイルと現在のパターンを教えて。

# Phase 2: Plan（Shift+Tab で Plan Mode に切替）
> OAuth対応を追加したい。実装計画を作って。

# Phase 3: Implement（Shift+Tab で通常モードに戻す）
> 上の計画に沿って実装して。テストも書いて。

# Phase 4: Commit
> 変更をコミットして。`}
              language="bash"
            />
          </section>

          {/* コンテキストの提供 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderSearch className="text-[var(--claude-primary)]" />
              具体的なコンテキストを提供する
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code に十分なコンテキストを与えることで、正確な応答を得られます。ファイル参照、画像の貼り付け、パイプ入力など複数の手段があります。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">@ によるファイル参照</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">プロンプト内で <code>@filename</code> と記述するとファイルの内容がコンテキストに追加されます。Tab補完に対応。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">画像のペースト</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">スクリーンショットやデザインモックをターミナルにペーストすると、画像として認識されます。UIの修正指示に有効です。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">パイプ入力</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">コマンド出力を直接パイプで渡せます。エラーログの分析や差分の確認に便利です。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">URL の参照</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">GitHub Issue や PR の URL を貼ると、内容を取得して参照します。</p>
              </div>
            </div>
            <CodeBlock
              code={`# パイプでエラーログを渡す
$ npm run build 2>&1 | claude "このビルドエラーを修正して"

# Git差分を渡してレビューを依頼
$ git diff HEAD~3 | claude "この変更をレビューして"

# ファイル参照（セッション内）
> @src/auth/login.ts のバリデーションロジックを改善して

# 画像ペースト（ターミナルに直接画像をドラッグ）
> [画像] このデザインに合わせてCSSを修正して`}
              language="bash"
            />
          </section>

          {/* セッション管理 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <RotateCcw className="text-[var(--claude-primary)]" />
              セッション管理
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              長時間の作業ではコンテキストウィンドウが圧迫されます。適切なセッション管理で品質を維持しましょう。
            </p>
            <div className="space-y-3">
              {[
                {
                  cmd: '/clear',
                  desc: '会話履歴をリセットして新しいタスクを開始。コンテキストが汚染された場合に使用。',
                },
                {
                  cmd: '/compact',
                  desc: '会話履歴を要約して圧縮。コンテキストウィンドウの使用量が多い場合に実行。カスタム指示も指定可能。',
                },
                {
                  cmd: '/rewind',
                  desc: '直前のターンを取り消し。誤った方向に進んだ場合のやり直しに使用。',
                },
                {
                  cmd: 'チェックポイント',
                  desc: 'Claude Code は自動的にチェックポイントを作成。git diff で変更前の状態に戻れる。',
                },
                {
                  cmd: 'セッション復帰',
                  desc: 'claude --resume で直前のセッションを再開。--continue で最後のセッションを継続。',
                },
              ].map(item => (
                <div key={item.cmd} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-[var(--claude-primary)] font-bold text-sm min-w-[140px] shrink-0">{item.cmd}</code>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
            <CodeBlock
              code={`# コンテキストが膨らんだら圧縮
> /compact

# カスタム指示付きで圧縮
> /compact 認証機能の実装に関する内容だけ保持して

# セッションの復帰
$ claude --resume          # セッション選択画面
$ claude --continue        # 最後のセッションを即座に継続`}
              language="bash"
            />
          </section>

          {/* Fast Mode */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-[var(--claude-primary)]" />
              Fast Mode の活用
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Shift+Tab でパーミッションモードを切り替える際に、Fast Mode（Haiku）を選択できます。単純なタスクには高速・低コストのモデルを使い、複雑な設計にはデフォルトの Sonnet を使う、という切り替えが効率的です。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3">Fast Mode が適するタスク</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>- ファイル名の一括リネーム</li>
                  <li>- 簡単な文字列置換</li>
                  <li>- ボイラープレートコードの生成</li>
                  <li>- コマンドの実行と結果確認</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3">デフォルトモードが適するタスク</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>- アーキテクチャの設計・判断</li>
                  <li>- 複雑なバグの調査</li>
                  <li>- リファクタリングの計画</li>
                  <li>- セキュリティに関わる変更</li>
                </ul>
              </div>
            </div>
            <InfoBox type="info" title="モデル切替のショートカット">
              セッション中に <code>Shift+Tab</code> を押すとモード選択メニューが表示されます。Fast Mode は同じ Claude Opus モデルを高速出力モードで使用するため、モデル自体は変わりません。
            </InfoBox>
          </section>

          {/* アンチパターン */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="text-[var(--claude-primary)]" />
              よくあるアンチパターン
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              効果的に Claude Code を使うために避けるべきパターンを紹介します。
            </p>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
                <h4 className="font-bold text-sm mb-2 text-red-700 dark:text-red-400">Kitchen Sink セッション</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  1つのセッションに無関係な複数のタスクを詰め込むこと。コンテキストが混在し、精度が低下します。
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  対策: タスクごとにセッションを分ける。終わったら <code>/clear</code> で新しいタスクを開始する。
                </p>
              </div>
              <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
                <h4 className="font-bold text-sm mb-2 text-red-700 dark:text-red-400">過剰修正（Over-correcting）</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Claudeの出力が不満な場合に、細かい修正指示を何度も繰り返すこと。コンテキストを浪費し、結果的に品質も劣化します。
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  対策: <code>/rewind</code> で戻り、より具体的な指示で再試行する。3回以上失敗したらアプローチを変える。
                </p>
              </div>
              <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
                <h4 className="font-bold text-sm mb-2 text-red-700 dark:text-red-400">膨張した CLAUDE.md</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  CLAUDE.md にあらゆる情報を詰め込むこと。毎回のプロンプトに含まれるため、トークンコストが増加し、重要な指示が埋もれます。
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  対策: CLAUDE.md は簡潔に保つ。詳細な仕様は別ファイルにし、必要時に <code>@</code> で参照する。
                </p>
              </div>
              <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
                <h4 className="font-bold text-sm mb-2 text-red-700 dark:text-red-400">曖昧な指示</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  「いい感じにして」「きれいにして」のような抽象的な指示。Claude Code は具体的な基準がないと独自の判断で広範な変更を行う可能性があります。
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  対策: 変更対象、期待する結果、制約条件を明示する。「src/components/Button.tsx のパディングを 8px から 12px に変更して」のように具体的に。
                </p>
              </div>
            </div>
          </section>

          <CodingChallenge
            preview
            previewType="markdown"
            title="CLAUDE.md を書いてみよう"
            description="プロジェクトルートに配置する CLAUDE.md を作成してください。TypeScript + React プロジェクトで、テストは Vitest、コミットメッセージは日本語、という基本ルールを定義してください。"
            initialCode={`# CLAUDE.md\n\n## プロジェクト概要\n\n## 技術スタック\n\n## コーディング規約\n\n## テスト\n\n## Git ルール`}
            answer={`# CLAUDE.md\n\n## プロジェクト概要\nこのプロジェクトはTypeScript + Reactで構築されたWebアプリケーションです。\n\n## 技術スタック\n- 言語: TypeScript\n- フレームワーク: React\n- テスト: Vitest\n- パッケージマネージャ: npm\n\n## コーディング規約\n- 関数コンポーネントを使用する\n- 型定義を明示的に記述する\n- コメントは日本語で記述する\n\n## テスト\n- テストフレームワーク: Vitest\n- テスト実行: npm run test\n- 変更後は必ず関連テストを実行する\n\n## Git ルール\n- コミットメッセージは日本語で簡潔に記述する\n- 1コミット1機能を原則とする`}
            hints={[
              'CLAUDE.md はプロジェクトのルールブックです。Claude Code が毎回参照します',
              '技術スタック（TypeScript, React, Vitest）を明記しましょう',
              'コミットメッセージの言語とテスト実行コマンドを具体的に指定しましょう',
            ]}
            keywords={['TypeScript', 'React', 'Vitest', '日本語', 'コミット']}
          />

          {/* ベストプラクティスまとめ */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">ワークフロー設計のチェックリスト</h2>
            <div className="space-y-3">
              {[
                'タスクを1つのセッションに1つに限定しているか',
                '検証手段（テスト、型チェック等）を指示に含めているか',
                '具体的なファイル名やパスを指定しているか',
                'コンテキストが膨らんだら /compact で圧縮しているか',
                'CLAUDE.md は簡潔に保たれているか',
                '複雑なタスクでは Plan Mode で事前に計画を立てているか',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-700 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
