import { Terminal, History, Settings, BarChart3, Wrench, MessageSquare } from 'lucide-react';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function SlashCommands() {
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
            スラッシュコマンド
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude CodeのREPL内で使用できるビルトインコマンドの全一覧。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* コア操作コマンド */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              コア操作コマンド
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              日常的に最も使用頻度の高いコマンドです。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { cmd: '/help', desc: '利用可能な全コマンドの一覧とヘルプを表示します。' },
                { cmd: '/init', desc: 'プロジェクトルートに CLAUDE.md を生成します。CLAUDE_CODE_NEW_INIT=1 で skill / hook / 個人 memory を含む対話セットアップに切替。' },
                { cmd: '/clear', desc: '空のコンテキストで新しい会話を開始。前の会話は /resume から復帰可能。文脈を維持して開放したい場合は /compact を使用。エイリアス: /reset, /new。' },
                { cmd: '/compact [instructions]', desc: '会話を要約してコンテキストを開放（同セッション継続）。フォーカス指示で残したい観点を指定可能。' },
                { cmd: '/model [model]', desc: 'モデルを切替。引数なしでピッカー、左右キーで effort level も調整可能。確認後すぐ反映（応答完了を待たない）。' },
                { cmd: '/effort [level|auto]', desc: 'モデルの effort level を変更。low / medium / high / xhigh / max（モデル依存）。引数なしでスライダー、auto でモデル既定値にリセット。' },
                { cmd: '/exit (/quit)', desc: 'REPLを終了してシェルに戻ります。Ctrl+D でも終了可能。' },
              ].map(item => (
                <div key={item.cmd} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-[var(--claude-primary)] font-bold text-sm">{item.cmd}</code>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* セッション管理 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <History className="text-[var(--claude-primary)]" />
              セッション管理
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              複数の作業を並行して行う際に有用な、セッションの保存・復元コマンドです。
            </p>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { cmd: '/resume [session]', desc: 'ID または名前で過去セッションを再開。引数なしでピッカー表示。エイリアス: /continue。CLI からは claude --continue / claude --resume <id> でも復帰可能。' },
                  { cmd: '/branch [name]', desc: '現在の会話の分岐ポイントを作成。分岐後も元セッションは /resume から戻れる。/fork は別コマンド（会話を引き継いだ background subagent を起動）。' },
                  { cmd: '/rewind', desc: '会話・コードを以前のポイントへ復元、または途中以降を要約。Esc×2 でも起動。restore code / conversation / both / summarize from here の 4 アクション。エイリアス: /checkpoint, /undo。' },
                  { cmd: '/rename [name]', desc: 'セッションに識別名を付与。引数なしで会話履歴から自動生成。プロンプトバーに表示。' },
                  { cmd: '/export [filename]', desc: '対話履歴をプレーンテキストで書き出し。引数なしでクリップボード/ファイル選択ダイアログ。' },
                  { cmd: '/copy [N]', desc: '最後のアシスタント応答をクリップボードへ。N で N 番目以前を指定可能（例: /copy 2 で 2 つ前）。コードブロック単位の選択も可能。' },
                  { cmd: '/diff', desc: '未コミット差分とターン毎の差分をインタラクティブに表示。左右で git diff と各ターンを切替、上下でファイル間移動。' },
                ].map(item => (
                  <div key={item.cmd} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <code className="text-[var(--claude-primary)] font-bold text-sm min-w-[160px] shrink-0">{item.cmd}</code>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* コスト・コンテキスト監視 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="text-[var(--claude-primary)]" />
              コスト・コンテキスト監視
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/usage</code>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed"><strong>セッションコスト・プラン使用制限・アクティビティ統計</strong>を表示。Session タブは API ユーザー向け（金額はローカル推定値）、サブスク利用者にはプラン使用バーと統計が表示される。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/cost / /stats</code>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed"><code>/usage</code> のエイリアス。<code>/stats</code> は Stats タブを開いた状態で起動。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/context</code>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">現在のコンテキスト使用量を<strong>カラーグリッド</strong>で表示。コンテキスト過多のツール、memory bloat、容量警告に対する最適化提案も。</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">/usage-credits</code>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">レート制限到達後も作業を継続するための usage credits を構成（旧 /extra-usage）。</p>
              </div>
            </div>
            <InfoBox type="info" title="/cost は /usage の別名（v2.x 系で統合）">
              旧来は別コマンドとして説明されていたが、現在は <code>/cost</code> と <code>/stats</code> はどちらも <code>/usage</code> のエイリアス。<code>/usage</code> 1 画面で「セッションコスト」「プラン残量」「アクティビティ」がタブで切替できる。サブスク（Pro / Max）ではセッションの $ 表示は課金には関係しない（プラン使用バーの方を見る）。
            </InfoBox>
          </section>

          {/* 設定・診断 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="text-[var(--claude-primary)]" />
              設定・診断
            </h2>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { cmd: '/config', desc: 'theme / model / output style など Settings UI を開く。エイリアス: /settings。' },
                  { cmd: '/permissions', desc: 'allow / ask / deny ルールをスコープ別に管理する対話ダイアログ。エイリアス: /allowed-tools。' },
                  { cmd: '/memory', desc: 'CLAUDE.md memory ファイル編集、auto-memory の有効/無効、auto-memory エントリ閲覧。' },
                  { cmd: '/mcp', desc: 'MCP サーバー接続と OAuth 認証を管理。' },
                  { cmd: '/hooks', desc: 'ツールイベントに対する hook 設定を表示。' },
                  { cmd: '/doctor', desc: 'インストール状態を診断、ステータスアイコンで結果表示。f キーで Claude に修正させる。' },
                  { cmd: '/debug [description]', desc: 'バンドル skill。セッションのデバッグログを取り込みトラブルシュート。Claude --debug を後付けで開始する用途。' },
                  { cmd: '/status', desc: 'バージョン / モデル / アカウント / 接続を Status タブに表示。応答中でも開ける。' },
                  { cmd: '/theme', desc: 'カラーテーマを変更。auto / light / dark / 色覚サポート / ANSI / カスタムテーマから選択。' },
                  { cmd: '/keybindings', desc: 'キーバインド設定ファイルを開く（または新規作成）。' },
                  { cmd: '/terminal-setup', desc: 'Shift+Enter 等のキーバインドをターミナルへインストール。VS Code / Cursor / Windsurf / Alacritty / Zed のみ表示。' },
                  { cmd: '/heapdump', desc: 'JS ヒープスナップショットとメモリ内訳を ~/Desktop に書き出し（高メモリ使用時の診断用）。' },
                ].map(item => (
                  <div key={item.cmd} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <code className="text-[var(--claude-primary)] font-bold text-sm min-w-[160px] shrink-0">{item.cmd}</code>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 開発ワークフロー */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Wrench className="text-[var(--claude-primary)]" />
              開発ワークフロー
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { cmd: '/review [PR]', desc: 'カレントセッション内で PR をローカルレビュー。深いクラウドレビューには /ultrareview。' },
                { cmd: '/security-review', desc: 'カレントブランチの差分を解析し、injection / 認証問題 / データ露出などのセキュリティリスクを検出。' },
                { cmd: '/plan [description]', desc: 'プロンプトから直接プランモードに突入。説明を渡すと即そのタスクで開始（例: /plan fix the auth bug）。' },
                { cmd: '/agents', desc: 'subagent（agent）設定を管理。' },
                { cmd: '/skills', desc: '利用可能な skill 一覧を表示。t キーでトークン数ソート。' },
                { cmd: '/tasks', desc: 'バックグラウンドタスクを一覧・管理。エイリアス: /bashes。' },
                { cmd: '/simplify [focus]', desc: 'バンドル skill。変更コードの再利用性 / 単純化 / 効率 / 抽象度を 4 つの review agent で並列分析し修正を適用。' },
                { cmd: '/loop [interval] [prompt]', desc: 'バンドル skill。プロンプトをセッション内で繰り返し実行（例: /loop 5m check if the deploy finished）。エイリアス: /proactive。' },
                { cmd: '/ultrareview [PR]', desc: 'クラウドサンドボックスで多 agent コードレビューを実行。' },
                { cmd: '/insights', desc: 'これまでのセッションを分析し、領域 / インタラクションパターン / 摩擦点をレポート化。' },
              ].map(item => (
                <div key={item.cmd} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-[var(--claude-primary)] font-bold text-sm">{item.cmd}</code>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* その他のコマンド */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MessageSquare className="text-[var(--claude-primary)]" />
              その他のユーティリティ
            </h2>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { cmd: '/login (/logout)', desc: 'Anthropic アカウントの認証 / サインアウト。' },
                  { cmd: '/desktop', desc: '現在のセッションを Claude Code Desktop アプリで継続（macOS / Windows のみ）。エイリアス: /app。' },
                  { cmd: '/teleport', desc: 'Claude Code on the web のセッションを現在のターミナルへ取り込み、ブランチと会話を取得。エイリアス: /tp。要 claude.ai サブスク。' },
                  { cmd: '/remote-control', desc: 'claude.ai からこのセッションを遠隔操作可能に。エイリアス: /rc。' },
                  { cmd: '/ide', desc: 'IDE 統合の管理とステータス表示。' },
                  { cmd: '/add-dir <path>', desc: '現セッションのファイルアクセス対象ディレクトリを追加。.claude/skills/ は読み込まれるが他の .claude/ 設定は対象外。' },
                  { cmd: '/recap', desc: '現セッションの 1 行サマリをオンデマンド生成。' },
                  { cmd: '/feedback (/bug)', desc: 'Claude Code に関するフィードバックを送信。' },
                  { cmd: '/release-notes', desc: 'チェンジログをバージョンピッカー UI で表示。' },
                  { cmd: '/fast [on|off]', desc: 'fast mode の切替（応答高速化）。' },
                  { cmd: '/btw <question>', desc: '会話に追加せず、サイド質問だけを投げる。' },
                  { cmd: '/focus', desc: 'フォーカスビュー（最新プロンプト + ツール呼び出し要約 + 最終応答のみ表示）の切替。fullscreen モード時のみ。' },
                ].map(item => (
                  <div key={item.cmd} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <code className="text-[var(--claude-primary)] font-bold text-sm min-w-[160px] shrink-0">{item.cmd}</code>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 頻出コマンド詳細解説 */}
          <section>
            <h2 className="text-3xl font-bold mb-2">頻出コマンドの詳細</h2>
            <p className="text-sm text-muted-foreground mb-6">
              日常的に使う <code>/resume</code> / <code>/usage</code> / <code>/effort</code> / <code>/rewind</code> の挙動を、公式ドキュメント準拠で深掘りします。
            </p>

            <div className="space-y-6">
              {/* /resume */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-xl font-bold mb-2">
                  <code className="text-[var(--claude-primary)]">/resume [session]</code>
                  <span className="text-xs font-normal text-muted-foreground ml-2">エイリアス: /continue</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  会話を ID または名前で再開、または引数なしでセッションピッカーを開く。デフォルトでは現在の worktree のセッションが表示され、キーボードショートカットで他 worktree やプロジェクトに広げられる。
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5 mb-3">
                  <li>同じ session ID に追記され、新メッセージは既存会話に連結される。<strong>session-scoped permissions は復元されない</strong>ため再承認が必要。</li>
                  <li>CLI からは <code>claude --continue</code>（直前を即再開）、<code>claude --resume &lt;id&gt;</code>（指定 ID）も等価。</li>
                  <li>同じセッションを複数ターミナルで再開すると、両方のメッセージが時系列に交互記録される（壊れないが混在する）。並列なら <code>claude --continue --fork-session</code> で分岐推奨。</li>
                  <li>会話ファイルの実体は <code>~/.claude/projects/</code> 配下の JSONL。チェックポイント含めデフォルト 30 日で自動掃除。</li>
                </ul>
                <pre className="text-xs bg-slate-100 dark:bg-slate-950 rounded p-3 overflow-x-auto"><code>{`# REPL 内
/resume                # ピッカー
/resume my-feature     # 名前で再開
/continue              # 同じ意味

# シェルから
claude --continue
claude --resume <id>
claude --continue --fork-session  # 分岐`}</code></pre>
              </div>

              {/* /usage */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-xl font-bold mb-2">
                  <code className="text-[var(--claude-primary)]">/usage</code>
                  <span className="text-xs font-normal text-muted-foreground ml-2">エイリアス: /cost, /stats</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  セッションコスト・プラン使用制限・アクティビティ統計を 1 画面で確認。<code>/cost</code> と <code>/stats</code> はどちらも <code>/usage</code> のエイリアス（<code>/stats</code> は Stats タブを開いた状態で起動）。
                </p>
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left p-2 font-bold">表示項目</th>
                        <th className="text-left p-2 font-bold">内容</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono">Total cost</td>
                        <td className="p-2">セッションのトークン課金見積（ローカル計算、実請求と差が出る可能性あり）</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono">Total duration (API)</td>
                        <td className="p-2">API リクエスト合計時間</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono">Total duration (wall)</td>
                        <td className="p-2">セッション総経過時間</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono">Code changes</td>
                        <td className="p-2">追加 / 削除行数</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono">Plan usage</td>
                        <td className="p-2">サブスク利用者向け：プラン使用バー（5 時間ウィンドウ / 週次など）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>注意</strong>: Claude Max / Pro はサブスクに含まれるため、Session タブの $ 表示は課金には関係しない。プラン残量を見るには Plan タブのバーを参照する。権威ある請求情報は <code>console.anthropic.com</code> の Usage ページ。
                </p>
              </div>

              {/* /effort */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-xl font-bold mb-2">
                  <code className="text-[var(--claude-primary)]">/effort [level|auto]</code>
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  モデルの effort level（adaptive reasoning の強度）を切替。引数なしでスライダー、<code>auto</code> でモデル既定値にリセット。<strong>応答完了を待たず即時反映</strong>。<code>/model</code> 内でも左右キーで調整可能。
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  対応モデル: Fable 5 / Sonnet 5 / Opus 4.8 / 4.7 / 4.6 / Sonnet 4.6 など（既定は <code>high</code>、Opus 4.7 のみ <code>xhigh</code>）
                </p>
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left p-2 font-bold">Level</th>
                        <th className="text-left p-2 font-bold">用途</th>
                        <th className="text-left p-2 font-bold">対応モデル</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono">low</td>
                        <td className="p-2">短く、影響範囲が限定された、レイテンシ重視のタスク</td>
                        <td className="p-2">全対応</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono">medium</td>
                        <td className="p-2">コスト重視で、知能を多少犠牲にできる場合</td>
                        <td className="p-2">全対応</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono">high</td>
                        <td className="p-2">トークンと知能のバランス。知能要求あるタスクの最低ライン</td>
                        <td className="p-2">全対応</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono">xhigh</td>
                        <td className="p-2">より深い推論を高トークン消費で。Opus 4.7 の既定</td>
                        <td className="p-2">Fable 5 / Sonnet 5 / Opus 4.8 / 4.7</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono">max</td>
                        <td className="p-2">最深推論。出力トークンに上限なし。<strong>セッション限定</strong>（環境変数経由を除く）。過剰思考になりがちなので採用前に検証</td>
                        <td className="p-2">全対応</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5 mb-3">
                  <li><code>low</code> / <code>medium</code> / <code>high</code> / <code>xhigh</code> はセッション越しに永続化、<code>max</code> はセッション限り。</li>
                  <li>未対応 level を指定すると、対応モデルでサポートされる最高 level に自動降格（例: Opus 4.6 で <code>xhigh</code> → <code>high</code>）。</li>
                  <li>1 ターンだけ深く考えさせたい場合は、<strong>level を上げず</strong>プロンプトに「ultrathink」を含める（API には effort 値を送らずプロンプトレベルで指示）。</li>
                  <li>優先順位: 環境変数 <code>CLAUDE_CODE_EFFORT_LEVEL</code> &gt; 設定値 &gt; モデル既定。skill / subagent frontmatter の <code>effort</code> はその skill / subagent 実行時のみ上書き。</li>
                </ul>
                <pre className="text-xs bg-slate-100 dark:bg-slate-950 rounded p-3 overflow-x-auto"><code>{`/effort              # スライダー UI
/effort high         # 直接指定
/effort auto         # モデル既定にリセット

# 起動時
claude --effort xhigh

# 永続設定（settings.json）
{ "effortLevel": "high" }`}</code></pre>
              </div>

              {/* /rewind */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-xl font-bold mb-2">
                  <code className="text-[var(--claude-primary)]">/rewind</code>
                  <span className="text-xs font-normal text-muted-foreground ml-2">エイリアス: /checkpoint, /undo / ショートカット: Esc Esc</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  チェックポイントは Claude のファイル編集ツールが書き込む直前に自動取得され、ユーザーの各プロンプト時点でも作成される。セッション越しにも保持され、デフォルト 30 日で自動掃除。
                </p>
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left p-2 font-bold">アクション</th>
                        <th className="text-left p-2 font-bold">挙動</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono whitespace-nowrap">Restore code and conversation</td>
                        <td className="p-2">コードと会話の両方をその時点に戻す</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono whitespace-nowrap">Restore conversation</td>
                        <td className="p-2">会話のみ巻き戻し、現在のコードは保持</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono whitespace-nowrap">Restore code</td>
                        <td className="p-2">ファイル変更のみ巻き戻し、会話は維持</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono whitespace-nowrap">Summarize from here</td>
                        <td className="p-2">選択メッセージ以降のみ要約に圧縮（前半は full text 保持）。/compact のターゲット版</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono whitespace-nowrap">Never mind</td>
                        <td className="p-2">何もせず一覧に戻る</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
                  <li><strong>制約</strong>: bash コマンド経由のファイル変更（<code>rm</code> / <code>mv</code> / <code>cp</code> 等）は追跡されない。Claude のファイル編集ツール経由の編集のみ。</li>
                  <li>外部からの変更（手動編集、別セッションの編集）は同じファイルに触れた場合を除き取り込まれない。</li>
                  <li>git の代替ではない。コミット・ブランチは別途 git で管理する。</li>
                </ul>
              </div>

              {/* /clear vs /compact */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-xl font-bold mb-2"><code className="text-[var(--claude-primary)]">/clear</code> と <code className="text-[var(--claude-primary)]">/compact</code> の使い分け</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left p-2 font-bold">コマンド</th>
                        <th className="text-left p-2 font-bold">用途</th>
                        <th className="text-left p-2 font-bold">エイリアス</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-slate-100 dark:border-slate-900">
                        <td className="p-2 font-mono">/clear</td>
                        <td className="p-2">空コンテキストで新しい会話を開始。前会話は <code>/resume</code> から戻れる。<strong>タスクが切替わる時</strong>。</td>
                        <td className="p-2">/reset, /new</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono">/compact [focus]</td>
                        <td className="p-2">同じ会話を続けたままコンテキストだけ開放。フォーカス指示で残したい観点を指定可能（例: <code>/compact focus on the API changes</code>）。</td>
                        <td className="p-2">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  CLAUDE.md に <code># Compact instructions</code> セクションを追加すれば、<code>/compact</code> の挙動を毎回固定化できる。
                </p>
              </div>
            </div>
          </section>

          {/* 廃止コマンドの注記 */}
          <InfoBox type="warning" title="削除されたコマンド（移行情報）">
            <ul className="space-y-1 text-sm">
              <li><code>/vim</code> は v2.1.92 で削除。Vim / Normal の切替は <code>/config</code> → Editor mode で行う。</li>
              <li><code>/pr-comments</code> は v2.1.91 で削除。PR コメントは Claude に直接「PR のコメント見て」と指示する形式に変更。<code>gh</code> CLI を使って自分でフェッチする形でも可。</li>
            </ul>
          </InfoBox>

          {/* カスタムコマンド */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">カスタムコマンド</h2>
            <p className="text-sm text-muted-foreground mb-6">
              ビルトインコマンドに加え、独自のスラッシュコマンドを定義できます。
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-1">プロジェクトコマンド</h4>
                <p className="text-xs text-muted-foreground"><code>.claude/commands/</code> にMarkdownファイルを配置 → ファイル名がそのまま <code>/コマンド名</code> になる（例: review.md → /review）。チーム共有可能。</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-1">ユーザーコマンド</h4>
                <p className="text-xs text-muted-foreground"><code>~/.claude/commands/</code> にMarkdownファイルを配置 → <code>/コマンド名</code> で全プロジェクトから呼び出し可能。カスタムコマンドは Skills に統合されており、<code>.claude/skills/&lt;name&gt;/SKILL.md</code> でも同じコマンドを定義できる。</p>
              </div>
            </div>
          </section>

          {/* クイック入力 */}
          <section className="p-8 rounded-2xl border border-[var(--claude-primary)]/20 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 text-[var(--claude-primary)]">クイック入力プレフィックス</h2>
            <p className="text-sm text-muted-foreground mb-6">
              REPL内でプロンプトの先頭に特定の文字を入力することで、素早い操作が可能です。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <code className="text-2xl font-bold text-[var(--claude-primary)]">/</code>
                <p className="text-xs text-muted-foreground mt-2">コマンド / Skill呼び出し</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <code className="text-2xl font-bold text-[var(--claude-primary)]">!</code>
                <p className="text-xs text-muted-foreground mt-2">Bashモード（直接シェル実行）</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                <code className="text-2xl font-bold text-[var(--claude-primary)]">@</code>
                <p className="text-xs text-muted-foreground mt-2">ファイルパス補完</p>
              </div>
            </div>
          </section>

          <CodingChallenge
            preview
            previewType="terminal"
            title="カスタムコマンドを作成しよう"
            description="プロジェクトの .claude/commands/ ディレクトリに配置するカスタムスラッシュコマンドのMarkdownファイルを書いてください。コードレビューを実行するコマンドで、セキュリティとパフォーマンスの観点からレビューを行い、結果をマークダウンで出力するものです。"
            initialCode={`# review.md - /review で呼び出されるコマンド\n\n___ HEAD~1 の変更をレビューしてください。  # ← ここを埋める（差分取得コマンド）\n\n## レビュー観点\n1. ___: 入力バリデーション、認証・認可の不備  # ← ここを埋める\n2. ___: N+1クエリ、不要な再レンダリング  # ← ここを埋める\n\n## 出力形式\n- 重要度（High/Medium/Low）\n- 対象ファイルと行番号\n- 問題の説明と修正案`}
            answer={`# review.md - /review で呼び出されるコマンド\n\ngit diff HEAD~1 の変更をレビューしてください。\n\n## レビュー観点\n1. セキュリティ: 入力バリデーション、認証・認可の不備\n2. パフォーマンス: N+1クエリ、不要な再レンダリング\n\n## 出力形式\n- 重要度（High/Medium/Low）\n- 対象ファイルと行番号\n- 問題の説明と修正案`}
            hints={[
              'カスタムコマンドはMarkdownファイルで、内容がそのままプロンプトとして送信されます',
              'git diff を使って変更差分を参照するよう指示しましょう',
              'レビュー観点と出力形式を明確に定義すると効果的です',
            ]}
            keywords={['git diff', 'セキュリティ', 'パフォーマンス']}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
