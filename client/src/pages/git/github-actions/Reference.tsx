import {
  Zap,
  Braces,
  FunctionSquare,
  Package,
  Shield,
  Cpu,
  Terminal as TerminalIcon,
} from "lucide-react";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import WhyNowBox from "@/components/WhyNowBox";
import CodingChallenge from "@/components/CodingChallenge";
import ReferenceLinks from "@/components/ReferenceLinks";

function CheatTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-medium text-foreground border-b border-border whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="bg-card hover:bg-muted/30 transition-colors">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 align-top ${
                    j === 0
                      ? "font-mono font-bold text-primary whitespace-nowrap"
                      : "text-muted-foreground"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Reference() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
            GitHub Actions リファレンス（パラメータ一覧）
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ここまでの5ページで扱ったトリガー・コンテキスト・アクション・権限・
            ランナーを、日常的に引ける早見表としてまとめます。書きながら都度
            検索する代わりに、このページをブックマークして参照してください。
          </p>
        </div>

        <WhyNowBox tags={["早見表", "コンテキスト", "式", "permissions"]}>
          <p>
            YAML を書くとき、実際に手が止まるのは「概念が分からない」ときより
            「あのキーの正確な綴りと値が思い出せない」ときです。
            このページは概念の説明ではなく、<strong>検索して当てはめる</strong>
            ための一覧です。ここまでの内容を実務で使いこなせる 「Git
            フロー中級者」になるための最後のピースとして、
            手元に置いておく前提でまとめています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* トリガー一覧 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Zap size={22} className="text-primary" aria-hidden="true" />
              on — トリガーイベント一覧
            </h2>
            <CheatTable
              headers={["イベント", "主な用途", "フォークからの PR"]}
              rows={[
                [
                  "push",
                  "ブランチへの push で起動。main への push で CI/CD を回す定番",
                  "—",
                ],
                [
                  "pull_request",
                  "PR の作成・更新で起動。lint/test/build の検査に使う",
                  "書き込み権限なしのトークンで実行",
                ],
                [
                  "pull_request_target",
                  "ベースリポジトリの権限で実行。labeler など書き込みが要る処理向け",
                  "書き込み権限あり（フォークのコードは実行しない）",
                ],
                [
                  "workflow_dispatch",
                  "Actions タブから手動実行。input で引数を受け取れる",
                  "—",
                ],
                [
                  "workflow_call",
                  "他のワークフローから呼び出される「部品」として定義",
                  "—",
                ],
                ["schedule", "cron 式で定期実行。時刻は常に UTC", "—"],
                [
                  "issues",
                  "Issue の opened/labeled 等で起動。自動アサイン等に使う",
                  "—",
                ],
                [
                  "issue_comment",
                  "Issue/PR のコメントで起動。@claude 等のメンション運用に使う",
                  "コメント本文は検証してから使う",
                ],
                ["release", "リリース作成で起動。公開ビルドの配布に使う", "—"],
                [
                  "workflow_run",
                  "別ワークフローの完了で起動。段階的なパイプラインに使う",
                  "—",
                ],
                [
                  "repository_dispatch",
                  "外部システムから API 経由で起動する拡張ポイント",
                  "—",
                ],
              ]}
            />
          </section>

          {/* コンテキスト一覧 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Braces size={22} className="text-primary" aria-hidden="true" />
              コンテキスト — {"${{ }}"} で参照する値
            </h2>
            <CheatTable
              headers={["コンテキスト", "よく使う値", "説明"]}
              rows={[
                [
                  "github",
                  "github.ref / github.sha / github.actor / github.event_name",
                  "実行中のリポジトリ・イベントに関する情報",
                ],
                ["env", "env.NODE_ENV", "env: で定義した環境変数"],
                [
                  "vars",
                  "vars.STAGING_URL",
                  "リポジトリ / 組織の変数（Variables）",
                ],
                [
                  "secrets",
                  "secrets.DEPLOY_TOKEN",
                  "登録済みの秘密情報。ログでは自動マスク",
                ],
                ["job", "job.status", "現在のジョブの状態"],
                [
                  "steps",
                  "steps.<id>.outputs.<name>",
                  "前の step の出力を後続 step で使う",
                ],
                [
                  "runner",
                  "runner.os / runner.temp",
                  "実行中のランナーに関する情報",
                ],
                [
                  "strategy / matrix",
                  "matrix.node-version",
                  "マトリクス展開時の各組み合わせの値",
                ],
                [
                  "needs",
                  "needs.<job-id>.outputs.<name>",
                  "依存先ジョブの出力",
                ],
                [
                  "inputs",
                  "inputs.node-version",
                  "workflow_dispatch / workflow_call の入力値",
                ],
              ]}
            />
          </section>

          {/* 式・関数 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <FunctionSquare
                size={22}
                className="text-primary"
                aria-hidden="true"
              />
              式で使う関数
            </h2>
            <CheatTable
              headers={["関数", "例", "用途"]}
              rows={[
                [
                  "contains()",
                  "contains(github.ref, 'refs/tags/')",
                  "文字列 / 配列に含まれるか判定",
                ],
                [
                  "startsWith() / endsWith()",
                  "startsWith(github.ref, 'refs/heads/release/')",
                  "前方 / 後方一致の判定",
                ],
                ["join()", "join(matrix.*, ', ')", "配列を区切り文字で連結"],
                [
                  "toJson() / fromJson()",
                  "fromJson(needs.build.outputs.list)",
                  "JSON との相互変換",
                ],
                [
                  "hashFiles()",
                  "hashFiles('**/package-lock.json')",
                  "キャッシュキー生成に使うハッシュ値",
                ],
                [
                  "success()",
                  "if: success()",
                  "直前までの step / job が全て成功したか（既定の暗黙条件）",
                ],
                [
                  "failure()",
                  "if: failure()",
                  "いずれかが失敗したか。失敗時だけの通知や artifact 保存に使う",
                ],
                [
                  "always()",
                  "if: always()",
                  "成否に関わらず必ず実行（後片付け step 等）",
                ],
                [
                  "cancelled()",
                  "if: cancelled()",
                  "ワークフローがキャンセルされたか",
                ],
              ]}
            />
          </section>

          {/* よく使う公式アクション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Package size={22} className="text-primary" aria-hidden="true" />
              よく使う公式・準公式アクション
            </h2>
            <CheatTable
              headers={["アクション", "用途"]}
              rows={[
                [
                  "actions/checkout@v4",
                  "リポジトリをランナーへ取り出す。ほぼ全ジョブの最初の step",
                ],
                [
                  "actions/setup-node@v4",
                  "Node.js のセットアップ。cache: npm で依存キャッシュも兼ねる",
                ],
                [
                  "actions/cache@v4",
                  "任意のパスを自前でキャッシュ（setup-node で足りない場合）",
                ],
                [
                  "actions/upload-artifact@v4 / download-artifact@v4",
                  "ジョブ間・実行間で成果物を受け渡す",
                ],
                ["actions/labeler@v5", "変更パスに応じてラベルを自動付与"],
                [
                  "actions/stale@v9",
                  "放置された Issue / PR にラベル付け・自動クローズ",
                ],
                [
                  "actions/add-to-project@v2",
                  "Issue / PR を GitHub Projects へ自動追加（v1 系は @v1.0.2 のようにパッチ版まで指定する。@v1 という浮動タグは存在しない）",
                ],
                [
                  "dependabot/fetch-metadata@v2",
                  "Dependabot PR の更新種別（patch/minor/major）を取得",
                ],
                [
                  "actions/github-script@v7",
                  "JS を直接書いて GitHub API を叩く（gh CLI で足りないとき）",
                ],
                [
                  "aws-actions/configure-aws-credentials@v4",
                  "OIDC で AWS への一時認証情報を取得",
                ],
              ]}
            />
          </section>

          {/* permissions スコープ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Shield size={22} className="text-primary" aria-hidden="true" />
              permissions — GITHUB_TOKEN のスコープ
            </h2>
            <CheatTable
              headers={["スコープ", "read の意味", "write が必要な場面"]}
              rows={[
                [
                  "contents",
                  "コードの読み取り",
                  "自動コミット・タグ / リリース作成",
                ],
                [
                  "pull-requests",
                  "PR の一覧・詳細取得",
                  "ラベル付け・コメント・自動マージ",
                ],
                [
                  "issues",
                  "Issue の一覧・詳細取得",
                  "ラベル付け・アサイン・コメント",
                ],
                [
                  "id-token",
                  "（read のみでは意味を持たない）",
                  "OIDC トークン発行（クラウド認証）",
                ],
                [
                  "actions",
                  "ワークフロー実行状況の取得",
                  "他の実行のキャンセル・再実行",
                ],
                [
                  "checks",
                  "チェック結果の取得",
                  "カスタムチェックの作成・更新",
                ],
                ["packages", "パッケージの取得", "GitHub Packages への公開"],
                [
                  "security-events",
                  "コードスキャン結果の取得",
                  "CodeQL 結果のアップロード",
                ],
              ]}
            />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              2023 年 2 月以降に作成されたリポジトリ・組織では既定が read-only
              になっていますが、それ以前から存在するリポジトリでは read/write
              のままの場合があります。いずれの場合もトップレベルで{" "}
              <code>contents: read</code>{" "}
              のように絞り、必要なジョブだけ個別に足すのが安全な書き方です。
            </p>
          </section>

          {/* ランナーラベル */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Cpu size={22} className="text-primary" aria-hidden="true" />
              runs-on — ランナーラベルと課金倍率
            </h2>
            <CheatTable
              headers={["ラベル", "OS", "無料枠の消費倍率"]}
              rows={[
                ["ubuntu-latest（24.04 相当）", "Linux", "1 倍"],
                [
                  "ubuntu-22.04 / ubuntu-24.04 / ubuntu-26.04（public preview）",
                  "Linux（バージョン固定）",
                  "1 倍",
                ],
                ["windows-latest", "Windows", "2 倍"],
                ["macos-latest", "macOS", "10 倍"],
                [
                  "macos-14 など（Apple Silicon 指定）",
                  "macOS（バージョン固定）",
                  "10 倍",
                ],
                [
                  "self-hosted",
                  "自前のマシン",
                  "課金対象外（インフラ費用は別途）",
                ],
              ]}
            />
          </section>

          {/* gh CLI */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <TerminalIcon
                size={22}
                className="text-primary"
                aria-hidden="true"
              />
              gh CLI — 運用でよく使うコマンド
            </h2>
            <CheatTable
              headers={["コマンド", "用途"]}
              rows={[
                ["gh run list", "直近のワークフロー実行を一覧表示"],
                ["gh run watch", "実行中のワークフローをリアルタイムで追跡"],
                [
                  "gh run view <id> --log-failed",
                  "失敗した step のログだけを絞って表示",
                ],
                [
                  "gh workflow run <file> -f key=value",
                  "workflow_dispatch を CLI から手動実行",
                ],
                [
                  "gh pr merge <number> --auto --squash",
                  "条件が揃ったら自動で squash マージ",
                ],
                ["gh pr edit <number> --add-label bug", "PR にラベルを付与"],
                ["gh pr edit <number> --add-assignee @me", "PR に担当者を追加"],
                [
                  "gh api graphql -f query=...",
                  "REST に対応する endpoint が無い操作や、複数リソースを 1 リクエストで取得したい場合に GraphQL で実行",
                ],
              ]}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              手を動かす — 早見表から組み立てる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              main への push 時だけ動く条件式と、失敗時にだけログを保存する step
              を、上の早見表を見ながら埋めてください。
            </p>

            <CodingChallenge
              preview
              previewType="terminal"
              title="早見表を使ってジョブを完成させよう"
              description="mainブランチへのpushだけに絞る条件式と、失敗時にだけ実行するartifact保存stepを埋めます。"
              initialCode={`jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == '___'
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test
      - name: 失敗時にログを保存
        if: ___()
        uses: actions/upload-artifact@v4
        with:
          name: logs
          path: logs/`}
              answer={`jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test
      - name: 失敗時にログを保存
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: logs
          path: logs/`}
              hints={[
                "push イベントを指す event_name の値は 'push'（文字列）",
                "直前の step / job が失敗したかを判定する関数は failure()",
              ]}
              keywords={["push", "failure"]}
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Contexts reference",
                  url: "https://docs.github.com/actions/reference/workflows-and-actions/contexts",
                  description:
                    "github / env / secrets / matrix など全コンテキストの公式一覧",
                },
                {
                  title: "Expressions reference",
                  url: "https://docs.github.com/actions/reference/workflows-and-actions/expressions",
                  description:
                    "contains / hashFiles / success 等の関数リファレンス",
                },
                {
                  title: "GITHUB_TOKEN permissions",
                  url: "https://docs.github.com/actions/tutorials/authenticate-with-github_token",
                  description: "permissions で指定できるスコープの全一覧",
                },
                {
                  title: "About GitHub-hosted runners",
                  url: "https://docs.github.com/actions/concepts/runners/github-hosted-runners",
                  description: "runs-on のラベルと仕様の公式リファレンス",
                },
                {
                  title: "gh CLI マニュアル",
                  url: "https://cli.github.com/manual/",
                  description:
                    "gh run / gh pr / gh api 等、全サブコマンドのリファレンス",
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
