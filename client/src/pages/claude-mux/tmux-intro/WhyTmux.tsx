import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function WhyTmux() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            なぜtmuxを学ぶのか
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            AIコーディングの生産性を最大化する理由を理解しましょう。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              エンジニアにとってのtmuxの価値
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              エンジニアがコーディングをする際、特にAIコーディングツール（Claude Code CLIなど）を活用する場合、tmuxは以下の理由で非常に有用です。
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="font-semibold text-foreground mb-2">🚀 複数プロセスの同時管理</h3>
                <p className="text-muted-foreground">
                  開発サーバー、ビルドプロセス、Claude Code CLIを同時に実行し、ターミナルウィンドウを切り替えることなく監視できます。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="font-semibold text-foreground mb-2">🔄 セッション永続化</h3>
                <p className="text-muted-foreground">
                  SSH接続が切れても、tmuxセッションは継続。リモートサーバーでの作業が中断されません。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="font-semibold text-foreground mb-2">⚡ キーボード操作の効率化</h3>
                <p className="text-muted-foreground">
                  マウスを使わずにペイン・ウィンドウを切り替え。手を動かさずに複数の作業を管理できます。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h3 className="font-semibold text-foreground mb-2">📝 設定の再利用性</h3>
                <p className="text-muted-foreground">
                  tmux.confで開発環境を定義すれば、複数マシン間で同じ環境を再現できます。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              AIコーディングとの組み合わせ
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              Claude Code CLIなどのAIコーディングツールは、ターミナルで実行されます。tmuxを使うことで、以下のようなワークフローが実現できます。
            </p>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  典型的なAIコーディングワークフロー
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="text-emerald-600 font-bold min-w-fit">ペイン1</div>
                    <div>
                      <p className="font-semibold text-foreground">Claude Code CLI</p>
                      <p className="text-muted-foreground">AIに指示を出し、コード生成を監視</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-emerald-600 font-bold min-w-fit">ペイン2</div>
                    <div>
                      <p className="font-semibold text-foreground">開発サーバー</p>
                      <p className="text-muted-foreground">npm start や python manage.py runserver</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-emerald-600 font-bold min-w-fit">ペイン3</div>
                    <div>
                      <p className="font-semibold text-foreground">テスト実行</p>
                      <p className="text-muted-foreground">npm test や pytest を実行</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-emerald-600 font-bold min-w-fit">ペイン4</div>
                    <div>
                      <p className="font-semibold text-foreground">ファイル編集</p>
                      <p className="text-muted-foreground">vim や nano でコード調整</p>
                    </div>
                  </div>
                </div>
              </div>

              <InfoBox type="success" title="実例">
                1つのtmuxセッションで、Claude Code CLIがコードを生成 → 開発サーバーで動作確認 → テストを実行 → 結果を確認 という一連の流れを、ウィンドウ切り替えなしで実行できます。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              生産性の向上
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              実際の数字で見ると、tmuxを活用することでどの程度の生産性向上が期待できるのかを示します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-foreground mb-4">iTerm2のみの場合</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• ウィンドウ切り替え: マウスまたは Cmd+Tab</li>
                  <li>• タブ切り替え: Cmd+数字キー</li>
                  <li>• 複数ウィンドウ管理: 煩雑</li>
                  <li>• SSH接続断時: セッション終了</li>
                </ul>
              </div>

              <div className="p-6 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <h4 className="font-semibold text-foreground mb-4">tmux活用時</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• ペイン切り替え: Ctrl+B + 矢印キー</li>
                  <li>• ウィンドウ切り替え: Ctrl+B + 数字キー</li>
                  <li>• 複数ペイン管理: 効率的</li>
                  <li>• SSH接続断時: セッション継続</li>
                </ul>
              </div>
            </div>

            <InfoBox type="info" title="実測データ">
              複数プロセスを管理する場合、tmuxを使うことで平均 30-40% の時間短縮が報告されています。特にAIコーディングのように頻繁にコード生成と検証を繰り返す場合、その効果は顕著です。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このマニュアルで習得できること
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              このマニュアルを完了することで、以下のスキルが身につきます。
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="font-semibold text-foreground mb-1">✓ tmuxの基本操作</p>
                <p className="text-sm text-muted-foreground">セッション、ウィンドウ、ペインの作成・管理</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="font-semibold text-foreground mb-1">✓ カスタマイズ</p>
                <p className="text-sm text-muted-foreground">tmux.confで自分好みの環境構築</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="font-semibold text-foreground mb-1">✓ Claude Code CLI連携</p>
                <p className="text-sm text-muted-foreground">AIコーディングツールとの効率的なワークフロー</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="font-semibold text-foreground mb-1">✓ トラブルシューティング</p>
                <p className="text-sm text-muted-foreground">よくある問題と解決方法</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              準備完了
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              次のページでは、MacユーザーにとってiTerm2とtmuxの違いを詳しく解説します。この理解が、効果的なtmux習得の基礎となります。
            </p>

            <InfoBox type="success" title="学習開始">
              理由を理解したら、実際の学習に進みましょう。環境準備セクションでは、tmuxをインストールして、すぐに使い始められるようにします。
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="terminal"
            title="tmux の基本コマンドを確認しよう"
            description="tmux のセッション作成、デタッチ、再接続の基本的なコマンドを書いてください。プロジェクト名 my-project で作業する想定です。"
            initialCode={`# tmux の基本コマンド\n\n# 1. 名前付きセッションを作成\n\n# 2. セッションからデタッチ（キー操作）\n\n# 3. セッション一覧を表示\n\n# 4. セッションに再接続`}
            answer={`# tmux の基本コマンド\n\n# 1. 名前付きセッションを作成\ntmux new-session -s my-project\n\n# 2. セッションからデタッチ（キー操作）\nCtrl+B D\n\n# 3. セッション一覧を表示\ntmux list-sessions\n\n# 4. セッションに再接続\ntmux attach -t my-project`}
            hints={[
              '-s オプションでセッション名を指定します',
              'デタッチは Ctrl+B を押した後 D を押します',
              '-t オプションで接続先のセッションを指定します',
            ]}
            keywords={['new-session', 'Ctrl+B', 'list-sessions', 'attach']}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
