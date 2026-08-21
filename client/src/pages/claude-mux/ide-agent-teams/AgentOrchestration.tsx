import { Users, GitBranch, MessageSquare, FolderTree, Workflow, Shield, Terminal, Layers } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function AgentOrchestration() {
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
            Agent Teams（マルチエージェント協調）
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            複数の Claude Code インスタンスを1つのチームとして協調させる公式機能。チームリードがタスクを割り振り、チームメイトが独立したコンテキストで並列作業する。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* Agent Teams とは */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="text-[var(--claude-primary)]" />
              Agent Teams とは
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Agent Teams は、複数の Claude Code インスタンスを協調動作させる公式機能。2026年2月5日に Opus 4.6 と同時に research preview として公開された。現在も experimental 扱いで既定は無効なので、使うには <code>CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1</code> を環境変数または settings.json に設定して有効化する。設定していない場合、セッション開始時にチームは作られず、Claude はチームメイトを spawn することも提案することもない。
            </p>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              1つのセッションが<strong>チームリード</strong>として機能し、他のセッション（チームメイト）にタスクを割り当てる。チームメイトはそれぞれ独立したコンテキストウィンドウを持ち、互いに直接通信しながら作業を進める。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'チームリード', desc: '全体を統括するセッション。タスクの分割・割り当て・進捗管理を行う' },
                { label: '独立コンテキスト', desc: '各チームメイトは独自のコンテキストウィンドウで動作。メモリを共有しない' },
                { label: '直接通信', desc: 'チームメイト同士が直接メッセージをやり取りし、人間の仲介なしに協調する' },
                { label: '並列実行', desc: '独立したタスクを複数のチームメイトで同時に処理し、合流時に結果を統合する' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm text-[var(--claude-primary)] mb-2">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="要件">
              Agent Teams は experimental で既定では無効。<code>settings.json</code> か環境変数に <code>CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1</code> を設定して有効化する。バージョンは <code>claude --version</code> で確認でき、npm でインストールしている場合の更新は <code>npm install -g @anthropic-ai/claude-code@latest</code>（公式ドキュメントは <code>npm update -g</code> を避けるよう案内している。インストール時の semver 範囲に従うため最新版に上がらないことがある）。ネイティブインストーラで入れた場合はバックグラウンドで自動更新される。なお非対話モード（<code>-p</code> / Agent SDK）ではチームメイトは spawn されないため、対話セッションで使う。
            </InfoBox>
          </section>

          {/* 表示モード */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-[var(--claude-primary)]" />
              2つの表示モード
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Agent Teams には 2 つの表示モードがある。作業スタイルに応じて選択する。
            </p>

            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">In-process モード（デフォルト）</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  全チームメイトがメインターミナル内で動作する。agent panel 上で修飾キーなしの上下矢印キーでチームメイトを選択し、<code>Enter</code> でそのトランスクリプトを開いて直接メッセージを送れる。選択中に <code>x</code> で停止、<code>Ctrl+T</code> でタスクリストを表示する。追加ツール不要で使える。
                </p>
                <CodeBlock language="bash" code={`# デフォルトの in-process モードで起動（特別なオプション不要）
claude

# チームリードに指示を出すと、チームメイトが同じターミナル内で起動する
# agent panel 上で上下矢印キーで選択し、Enter でトランスクリプトを開く
# 選択中に x で停止、Ctrl+T でタスクリストを表示`} />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">Split panes モード</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  各チームメイトが iTerm2 または tmux の独立ペインで動作する。複数のチームメイトの出力を同時に視認でき、大規模なチームで有用。<code>iterm2</code> 指定（v2.1.186 以降）には <code>it2</code> CLI のインストールと、iTerm2 の Settings → General → Magic → Enable Python API の有効化が必要。無い場合はインストールコマンド付きのエラーが表示される。
                </p>
                <CodeBlock language="bash" code={`# iTerm2 の split panes モードで起動（macOS）
claude --teammate-mode iterm2

# tmux を使っている場合
claude --teammate-mode tmux`} />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">cmux ネイティブ split（macOS）</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  macOS で cmux を使う場合、<code>cmux claude-teams</code> でチームメイトを cmux のネイティブ split として起動できる。内部では tmux shim（<code>~/.cmuxterm/claude-teams-bin/tmux</code>）を用意し、<code>TMUX</code> / <code>TMUX_PANE</code> を設定して Claude Code に「tmux の中にいる」と認識させ、Claude が発行する tmux コマンドを cmux の socket API 呼び出しへ翻訳している。実体としての tmux / iTerm2 のインストールは不要だが、tmux 互換レイヤーを経由する仕組みである点は押さえておく。teammate mode は auto に設定され、サイドバーのメタデータと通知で状態を可視化できる。
                </p>
                <CodeBlock language="bash" code={`# cmux ネイティブのチーム起動（teammate mode は auto に設定される）
cmux claude-teams

# サイドバーに親 + teammate が並び、各 split に独立した Claude Code が走る
# tmux 本体は不要だが、tmux shim 経由で cmux の socket API に翻訳される
# 詳細は「cmux と Agent Teams」ページを参照`} />
              </div>
            </div>

            <InfoBox type="info" title="どちらを選ぶか">
              2〜3 人なら in-process で十分。macOS ローカルで通知込みの可視化が欲しいなら cmux ネイティブ split が向く。iTerm2（または tmux）ユーザーは split panes モードも選べる。
            </InfoBox>
          </section>

          {/* 基本的な使い方 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              基本的な使い方
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Agent Teams の起動はシンプルで、チームリードに自然言語でチーム構成を指示するだけでよい。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">split panes モードでの起動例</h3>
                <CodeBlock language="bash" code={`# iTerm2 の split panes モードで Agent Teams を起動（macOS）
claude --teammate-mode iterm2

# チームリードから指示例:
# "このバグを調査して。researcher と fixer の2人のチームメイトを使って、
#  researcher はログとエラーの調査、fixer は修正の実装を担当して。"`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">in-process モードでの操作</h3>
                <CodeBlock language="bash" code={`# 通常起動（in-process モード）
claude

# チームリードへの指示例:
# "認証機能を実装して。3人のチームメイトで分担して:
#  1人目は JWT トークンの生成・検証ロジック、
#  2人目は認証ミドルウェアと API ルート、
#  3人目はテストを担当。"

# agent panel 上で上下矢印キーでチームメイトを選択、Enter でトランスクリプトを開く
# 各チームメイトの進捗をリアルタイムで確認できる`} />
              </div>
            </div>
          </section>

          {/* Subagents との違い */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderTree className="text-[var(--claude-primary)]" />
              Subagents と Agent Teams の違い
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code には「マルチエージェント」の仕組みが 2 つある。Subagents はセッション内部の分身、Agent Teams はセッション間の協調。目的に応じて使い分ける。
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">特性</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">Subagents（Agent ツール）</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">Agent Teams</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['動作範囲', '単一セッション内', '複数の独立セッション間'],
                    ['コンテキスト', '独立したコンテキストウィンドウで開始し、結果を呼び出し元に返す（会話履歴を継承するのは subagent_type: "fork" のみ）', '各チームメイトが独立したコンテキストを持ち、互いに直接通信する'],
                    ['通信', '親セッションを介して結果を返す', 'チームメイト同士が直接通信'],
                    ['起動方法', 'Claude が自動的に Agent ツールで起動（v2.1.63 で Task から改名。Task(...) はエイリアスとして残る）。@agent-<名前> のメンションや --agent での明示指定もできる', 'チームリードが指示に基づいて起動'],
                    ['適したタスク', '調査・分析・小規模な部分実装', '大規模な並列開発・複数機能の同時実装'],
                    ['可視性', 'メインセッションに結果のみ表示', 'agent panel の上下矢印キー選択または個別ペインで進捗監視可能'],
                  ].map(([feature, sub, teams]) => (
                    <tr key={feature} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap">{feature}</td>
                      <td className="px-4 py-3 text-muted-foreground">{sub}</td>
                      <td className="px-4 py-3 text-muted-foreground">{teams}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="使い分けの目安">
              「ちょっとこのファイル調べて」程度なら Subagents で十分。「3つの機能を並列で実装して」のような大きなタスクには Agent Teams が向いている。
            </InfoBox>
          </section>

          {/* ワークフローパターン */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Workflow className="text-[var(--claude-primary)]" />
              実践的なワークフローパターン
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Agent Teams が効果を発揮する代表的なパターンを 3 つ紹介する。
            </p>

            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">パターン1: 並列デバッグ</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  原因不明のバグに対して、複数の仮説を同時に検証する。5 人のチームメイトがそれぞれ異なる仮説を調査し、最初に原因を特定したメイトの結果をチームリードが採用する。
                </p>
                <CodeBlock language="bash" code={`# チームリードへの指示例:
# "本番で500エラーが断続的に発生している。5人のチームメイトで以下を同時調査して:
#  1. データベース接続プール枯渇の可能性
#  2. メモリリークの可能性（ヒープダンプを分析）
#  3. 外部APIのタイムアウトの可能性
#  4. 最近のデプロイ差分の確認
#  5. ログの時系列分析とエラーパターンの特定
#  原因を特定したら他のメイトに共有して。"`} />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">パターン2: 機能開発（分業型）</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  researcher（調査） → architect（設計） → implementer（実装）のフローで、各フェーズを専門のチームメイトが担当する。
                </p>
                <CodeBlock language="bash" code={`# チームリードへの指示例:
# "決済機能を追加して。3人体制で進めて:
#  researcher: Stripe API のドキュメントと既存コードを調査して仕様をまとめて
#  architect: researcher の調査結果を受けてインターフェース設計と型定義を作成
#  implementer: architect の設計に基づいて実装とテストを作成
#  各メイトは前のメイトの成果物を直接読んで作業を進めて。"`} />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">パターン3: レビュー＋テスト並列</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  コードレビューとテスト作成を並列で実行する。reviewer がロジックの問題を指摘し、test-writer がテストカバレッジを拡充する。両者の結果を統合して品質を担保する。
                </p>
                <CodeBlock language="bash" code={`# チームリードへの指示例:
# "src/services/ 配下の変更をレビューして。2人体制で:
#  reviewer: コードの品質・セキュリティ・パフォーマンスを確認して問題点をリスト化
#  test-writer: 変更箇所に対するユニットテストとインテグレーションテストを作成
#  reviewer が発見した問題は test-writer にも共有して、
#  エッジケースのテストを追加して。"`} />
              </div>
            </div>
          </section>

          {/* Git ワークツリーとの組み合わせ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="text-[var(--claude-primary)]" />
              Git ワークツリーとの組み合わせ
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Agent Teams のチームメイトが同じファイルを編集するとコンフリクトが発生する可能性がある。Git ワークツリーで作業領域を分離することで、安全な並列開発ができる。
            </p>

            <CodeBlock language="bash" code={`# メインリポジトリからワークツリーを作成
git worktree add ../project-auth feature/auth
git worktree add ../project-dashboard feature/dashboard

# split panes モードで Agent Teams を起動（iTerm2 の場合）
claude --teammate-mode iterm2

# チームリードへの指示例:
# "2つの機能を並列開発して:
#  チームメイト1: ../project-auth で認証機能を実装
#  チームメイト2: ../project-dashboard でダッシュボード画面を実装
#  それぞれのワークツリーで作業して、完了したらコミットして。"

# 作業完了後のマージ
git checkout main
git merge feature/auth
git merge feature/dashboard

# ワークツリーを削除
git worktree remove ../project-auth
git worktree remove ../project-dashboard`} />

            <InfoBox type="warning" title="ワークツリーなしの場合">
              Agent Teams は同一ディレクトリ内でも動作するが、チームメイト同士が同じファイルを同時に編集するとコンフリクトが起きる。明確にファイル範囲を分離するか、ワークツリーを使うことを推奨する。
            </InfoBox>
          </section>

          {/* エージェント間の通信 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MessageSquare className="text-[var(--claude-primary)]" />
              チームメイト間の通信
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Agent Teams の大きな特徴は、チームメイト同士が直接通信できること。従来のマルチインスタンス構成では人間が情報のハブになる必要があったが、Agent Teams ではチームメイトが自律的に連携する。
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'チームメイト間の直接通信',
                  desc: 'チームメイトは互いにメッセージを送受信できる。例えば researcher が発見した情報を implementer に直接伝達し、人間の介在なしに作業を継続する。',
                },
                {
                  title: 'チームリードによる調整',
                  desc: 'チームリードはタスクの進捗を監視し、必要に応じてタスクの再割り当てや優先度の変更を行う。チームメイトからの質問にも応答する。',
                },
                {
                  title: 'CLAUDE.md による共通知識',
                  desc: 'プロジェクトルートの CLAUDE.md に記述した指示は全チームメイトが共有する。アーキテクチャ方針やコーディング規約を書いておくと統一感が保てる。',
                },
                {
                  title: 'ファイルシステムを介した共有',
                  desc: 'あるチームメイトが生成したインターフェース定義や仕様書を、別のチームメイトが直接読み取って作業に活用できる。',
                },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* セッション間メッセージング */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MessageSquare className="text-[var(--claude-primary)]" />
              独立したセッション同士のメッセージング
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              Agent Teams は「Claude が生成し統括するチーム」ですが、<strong>自分でそれぞれ立ち上げた独立セッション同士</strong>もメッセージをやり取りできます。片方のセッションが加えた変更が、もう片方が作っているものを壊すとき、こちらが気づく前に Claude が警告を送れます。
            </p>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              Claude は <code>ListAgents</code> で到達できる相手を探し、<code>SendMessage</code> で名前を指定して送ります。ツールは Claude が呼ぶので、こちらは「相手に何を知らせたいか」を伝えるだけです。送れるのは<strong>テキストだけ</strong>で、会話履歴やファイルは渡りません。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { label: '発見の受け渡し', desc: '破壊的変更や決定事項を、影響を受ける側のセッションに要約して伝える。同じ説明を 2 回しなくて済む。' },
                { label: '並列 worktree の調整', desc: '同じリポジトリを別 worktree で触っているセッションに、何がマージされたかを知らせる。' },
                { label: '長時間処理の報告', desc: 'マイグレーションやテスト実行に、見ている側のセッションへ結果を報告させる。' },
                { label: 'マシンをまたぐ連絡', desc: '別マシンや Web 上の自分のセッションにも届く。' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm text-[var(--claude-primary)] mb-2">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <InfoBox type="info" title="似た機能との使い分け">
              1 つの会話を別ターミナルで続けたいなら<strong>セッションの再開</strong>、Claude が生成・統括するチームなら <strong>Agent Teams</strong>、多数のセッションを 1 画面で見るなら <strong>agent view</strong>、スマホ等から自分で操作するなら <strong>Remote Control</strong>、CI 結果など外部イベントを流し込むなら <strong>channels</strong>。メッセージングは「自分で立てた独立セッション同士の連絡」に使います。要件は v2.1.224 以降（macOS / Linux、ネイティブ Windows は v2.1.234 以降）で、満たしていれば有効化の操作は不要です。
            </InfoBox>
          </section>

          {/* ベストプラクティス */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Shield className="text-[var(--claude-primary)]" />
              ベストプラクティス
            </h2>

            <div className="space-y-3">
              {[
                { title: 'ファイル操作の分離を徹底する', desc: '各チームメイトが編集するファイルの範囲を明確に指示する。「Aは src/auth/ 配下、Bは src/dashboard/ 配下」のように。同一ファイルの同時編集は避ける。' },
                { title: 'インターフェースを先に定義する', desc: '複数メイトが連携する場合、先にインターフェースや型定義を確定させる。これにより各メイトが独立して実装を進められる。' },
                { title: '小さく始めて段階的に拡大する', desc: 'まず2人のチームメイトで試し、ワークフローが安定してから人数を増やす。管理コストはメイト数に対して線形以上に増加する。' },
                { title: 'split panes モードで可視性を確保する', desc: '4人以上のチームメイトを使う場合は split panes モード（iTerm2 等）や cmux ネイティブ split を使って各メイトの出力を同時に監視する。' },
                { title: '定期的にチームリードの進捗確認を促す', desc: 'チームリードに「各メイトの進捗を確認して、問題があれば対処して」と明示的に指示すると、タスクが停滞しにくい。' },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <CodingChallenge
            preview
            previewType="terminal"
            title="Agent Teams のワークフローを設計しよう"
            description="E コマースサイトに「商品レビュー機能」を追加する想定で、Agent Teams の構成と起動コマンドを記述してください。チームリードへの指示、チームメイトの役割分担、Git ワークツリーの準備を含めてください。"
            initialCode={`# Agent Teams で商品レビュー機能を実装する\n\n# 1. Git ワークツリーを作成（API用とUI用）:\ngit ___ add ../project-review-api feature/review-api  # ← ここを埋める\ngit ___ add ../project-review-ui feature/review-ui\n\n# 2. Agent Teams を split panes モードで起動（iTerm2）:\nclaude ___ iterm2  # ← ここを埋める\n\n# 3. チームリードへの指示:\n# "商品レビュー機能を実装して。2人のチームメイトで分担:"\n\n# 4. 作業完了後のマージ手順:\ngit checkout main\ngit merge feature/review-api\ngit merge feature/review-ui\ngit worktree remove ../project-review-api\ngit worktree remove ../project-review-ui`}
            answer={`# Agent Teams で商品レビュー機能を実装する\n\n# 1. Git ワークツリーを作成（API用とUI用）:\ngit worktree add ../project-review-api feature/review-api\ngit worktree add ../project-review-ui feature/review-ui\n\n# 2. Agent Teams を split panes モードで起動（iTerm2）:\nclaude --teammate-mode iterm2\n\n# 3. チームリードへの指示（チームメイトの役割分担を含む）:\n# "商品レビュー機能を実装して。2人のチームメイトで分担:\n#  api-dev: ../project-review-api でレビューの CRUD API とバリデーションを実装\n#  ui-dev: ../project-review-ui でレビュー投稿フォームと一覧表示コンポーネントを実装\n#  api-dev が型定義を作成したら ui-dev に共有して。"\n\n# 4. 作業完了後のマージ手順:\ngit checkout main\ngit merge feature/review-api\ngit merge feature/review-ui\ngit worktree remove ../project-review-api\ngit worktree remove ../project-review-ui`}
            hints={[
              'git worktree add でAPI用とUI用の作業ディレクトリを分離する',
              '--teammate-mode iterm2 で split panes モードを有効にする',
              'チームリードへの指示には各メイトの担当範囲とワークツリーのパスを明記する',
              '作業完了後は git merge で各ブランチを統合し、ワークツリーを削除する',
            ]}
            keywords={['worktree', '--teammate-mode']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
