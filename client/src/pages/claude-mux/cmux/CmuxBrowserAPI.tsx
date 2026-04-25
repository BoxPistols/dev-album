import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

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
        </div>

        <div className="space-y-12 mt-8">
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
              主な操作は次の 5 つ。socket 経由のコマンドとして呼び出せる。
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
                      ax-snapshot
                    </td>
                    <td className="p-3 text-muted-foreground">
                      アクセシビリティツリーを JSON で取得
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">ref</td>
                    <td className="p-3 text-muted-foreground">
                      要素への参照（ref ID）を取得
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">click</td>
                    <td className="p-3 text-muted-foreground">
                      ref 指定でクリック
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">fill</td>
                    <td className="p-3 text-muted-foreground">
                      入力欄に値を設定
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      evaluate
                    </td>
                    <td className="p-3 text-muted-foreground">
                      任意の JavaScript を評価
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

# 2. ビルトインブラウザを開く
# Opt+Cmd+D

# 3. ブラウザで dev サーバーの URL を開く
# http://localhost:5173

# 4. アクセシビリティツリーを取得
cmux browser ax-snapshot

# 5. 取得した ref を使って要素を操作
cmux browser click --ref <ref-id>
cmux browser fill --ref <ref-id> --value "test"

# 6. 結果を JS で確認
cmux browser evaluate --code "document.title"`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              実際のコマンド名は cmux のバージョンで変わる可能性があるため、
              <code className="text-primary">cmux --help</code>{" "}
              または公式ドキュメントで確認する。
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
完了したら次のフローで動作確認してください:

1. dev サーバーを起動
2. cmux のブラウザで /login を開く
3. ax-snapshot でフォーム要素の ref を取得
4. メール欄と パスワード欄に値を fill
5. ログインボタンを click
6. evaluate で URL が /dashboard に遷移したか確認
7. 結果が想定と異なる場合は修正してから再検証`}
            />

            <p className="text-foreground mt-6 leading-relaxed">
              アクセシビリティツリー経由で操作させることで、 CSS セレクタの
              fragility（クラス名変更で壊れる）を避けられる。
              意味（「メール入力欄」「ログインボタン」）で要素を指定できる。
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
