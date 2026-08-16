import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import VerifiedBox from "@/components/VerifiedBox";

export default function CmuxBrowserAPI() {
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
            ビルトインブラウザと Scriptable API
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            cmux のブラウザは表示用ではなく、エージェントが操作できる API
            を持つ。 dev サーバーをエージェント側から検証するための土台。
          </p>

          <VerifiedBox
            verifiedAt="2026-08-16"
            cmuxVersion="cmux 0.64.20 (100) [14e3400b9]"
            platform="macOS (Apple Silicon)"
            officialDocs="https://github.com/manaflow-ai/cmux"
          />
        </div>

        <div className="space-y-12 mt-8">
          {/* ── 脅威モデル TL;DR ── */}
          <section>
            <InfoBox type="warning" title="脅威モデル（読む前に把握）">
              <p className="mb-2">
                <code className="text-primary">cmux browser eval</code> は開いているページに <strong>任意の JavaScript を実行</strong> します。
                <code className="text-primary">browser cookies</code> / <code className="text-primary">browser storage</code> も同様に同一オリジンのデータにフルアクセスできます。
              </p>
              <p className="mb-2">
                <strong>原則: dev サーバーと、自分が所有・管理する検証環境のみを対象にする。</strong>
                本番サイト・他人のサービス・SNS にログイン中のセッション等を開いた状態でこれらを実行しない。
              </p>
              <p>
                認証情報を <code className="text-primary">browser fill</code> に渡す場合、コマンド履歴（<code>~/.zsh_history</code> 等）や cmux のログに残らないよう、環境変数や 1Password CLI 経由で渡す。
              </p>
            </InfoBox>
          </section>

          {/* ── 位置づけ ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ブラウザの位置づけ
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              cmux のビルトインブラウザは「ターミナルの横に Web
              を表示する」だけのコンポーネントではない。
              アクセシビリティツリーのスナップショット取得、要素クリック、フォーム入力、
              JavaScript の評価などを外部から呼び出せる API を備える。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              これにより、Claude Code のようなエージェントが dev
              サーバーを実際に開き、 UI
              の状態を読み取り、操作してみる、という閉ループが組める。
              「コードを書く」だけでなく「動かして検証する」までエージェントの範囲に入る。
            </p>

            <InfoBox type="info" title="想定する使い方">
              手動テストのうち再現性の高い部分（フォーム入力、ボタン押下、結果表示の確認）を
              エージェントに委ねる。最終的な目視確認は人間が行う。
            </InfoBox>
          </section>

          {/* ── API の概要 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              API の概要
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              主な操作は次のとおり。socket 経由のコマンドとして呼び出せる。
              browser サブコマンドはこれより多く用意されているため、ここでは代表的なものを抜粋している。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      操作
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      用途
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      browser snapshot
                    </td>
                    <td className="p-3 text-muted-foreground">
                      アクセシビリティツリーを取得（--interactive / --compact / --selector / --max-depth で絞れる）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      browser click
                    </td>
                    <td className="p-3 text-muted-foreground">
                      CSS selector で要素クリック（dblclick / hover / focus / check 系も同形式）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      browser fill / type
                    </td>
                    <td className="p-3 text-muted-foreground">
                      CSS selector で入力欄に値を設定（fill は置換、type は逐次入力）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      browser eval
                    </td>
                    <td className="p-3 text-muted-foreground">
                      任意の JavaScript を評価（戻り値を返す）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      browser get / screenshot
                    </td>
                    <td className="p-3 text-muted-foreground">
                      url / title / text / html / 属性を取得、スクリーンショット保存
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      browser find
                    </td>
                    <td className="p-3 text-muted-foreground">
                      role / text / label / placeholder / alt / title / testid で要素を探す（意味ベースの指定）
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      browser console / errors
                    </td>
                    <td className="p-3 text-muted-foreground">
                      コンソール出力とページエラーの一覧取得・クリア
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      browser goto / wait
                    </td>
                    <td className="p-3 text-muted-foreground">
                      URL 遷移、selector / load-state 到達待ち
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground leading-relaxed">
              アクセシビリティツリーは DOM
              そのものではなく、スクリーンリーダーが読む構造に近い。
              そのため、エージェントが「ボタン」「テキスト入力」「見出し」などを意味で扱える。
            </p>
          </section>

          {/* ── 基本フロー ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              基本フロー
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              dev
              サーバーをブラウザに開き、要素を取得して操作するまでの一連の流れ。
            </p>

            <CodeBlock
              language="bash"
              code={`# 1. dev サーバーを起動（左ペイン）
npm run dev

# 2. ブラウザペインを右に分割して URL を開く
#    open-split の位置引数は方向ではなく URL。方向を指定するなら new-pane を使う
cmux new-pane --type browser --direction right --url http://localhost:5173

# 方向を問わないなら open-split に URL を渡すだけでよい
# cmux browser open-split http://localhost:5173

# 開いたあとに別の URL へ移動する
cmux browser goto http://localhost:5173

# 3. アクセシビリティツリーを取得（compact で要点だけ）
cmux browser snapshot --compact

# 4. CSS selector で要素を操作
cmux browser fill 'input[name="email"]' "test@example.com"
cmux browser click 'button[type="submit"]'

# 5. 結果を JS で確認
cmux browser eval "location.pathname"

# 6. スクリーンショット保存
cmux browser screenshot --out /tmp/result.png`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              全コマンドは <code className="text-primary">cmux --help</code> で確認できる。
              browser サブコマンドは <code>snapshot / goto / click / fill / type / eval / wait /
              get / is / find / screenshot / cookies / storage</code> 等が揃っている。
            </p>
          </section>

          {/* ── エージェントとの組み合わせ ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Claude Code との組み合わせ
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              Claude Code は Bash ツールを通じて cmux のコマンドを呼べる。
              エージェントに「実装 → 起動 → ブラウザで検証 →
              修正」のループを任せられる。
            </p>

            <CodeBlock
              language="markdown"
              code={`# Claude Code への指示例

ログイン画面を実装してください。
完了したら次のフローで cmux のブラウザを使って動作確認してください:

1. cmux browser goto http://localhost:5173/login
2. cmux browser snapshot --compact でフォーム構造を確認
3. cmux browser fill 'input[name="email"]' "test@example.com"
4. cmux browser fill 'input[type="password"]' "secret123"
5. cmux browser click 'button[type="submit"]'
6. cmux browser eval "location.pathname" で /dashboard に遷移したか確認
7. 想定と異なる場合は修正してから再検証`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              <code className="text-primary">click</code> / <code className="text-primary">fill</code> は CSS selector を取るため、
              クラス名の変更で壊れやすい。役割やラベルで指定したい場合は{" "}
              <code className="text-primary">browser find</code>（role / text / label / testid 等）を使う。
              引数の形は <code className="text-primary">cmux --help</code> で確認する。
              <code className="text-primary">snapshot</code> で構造を把握してから selector を決める流れも取れる。
            </p>
          </section>

          {/* ── 注意点 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              注意点とセキュリティ
            </h2>

            <div className="space-y-4">
              <InfoBox type="info" title="評価対象は dev 環境に限定する">
                evaluate は任意の JS
                を実行できるため、本番環境や他人のサイトには向けない。 自分の
                dev サーバーや明示的に許可した検証環境のみ対象にする。
              </InfoBox>

              <InfoBox type="info" title="認証情報の扱い">
                fill で入力する値が秘匿情報の場合、ログに残らないよう環境変数や
                1Password CLI 経由で渡す。 プロンプトに直書きしない。
              </InfoBox>

              <InfoBox type="info" title="完全な代替ではない">
                ビジュアルリグレッションや人間の体感（アニメーションのもたつきなど）は依然として目視確認が必要。
                cmux ブラウザはあくまで「機能要件の確認」を機械化するための層。
              </InfoBox>
            </div>
          </section>

          {/* ── 関連トピック ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              関連トピック
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground">
                  Playwright / Puppeteer との違い
                </p>
                <p className="text-sm text-muted-foreground">
                  Playwright は CI 向けの本格的な E2E ツール。cmux
                  ブラウザはローカル開発時の対話的検証用。 目的が異なる。
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground">
                  MCP サーバーとの組み合わせ
                </p>
                <p className="text-sm text-muted-foreground">
                  ブラウザ操作専用の MCP サーバーを併用する場合、cmux
                  ブラウザはローカルの dev 確認に絞り、 クロスブラウザ検証は MCP
                  側に任せると整理しやすい。
                </p>
              </div>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
