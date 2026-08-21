import {
  Chrome,
  MonitorSmartphone,
  ListOrdered,
  ShieldAlert,
  Camera,
  ExternalLink,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodingChallenge from "@/components/CodingChallenge";
import VerifiedBox from "@/components/VerifiedBox";

export default function BrowserVerification() {
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
            ブラウザと画面での検証
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            「実際に描画されているか」を Claude 自身に確かめさせる手段。Claude
            in Chrome と computer use の使い分け。
          </p>
          <VerifiedBox
            verifiedAt="2026-08-22"
            cmuxVersion="Claude Code 2.1.239"
            platform="macOS (Apple Silicon)"
            officialDocs="https://code.claude.com/docs/en/chrome"
            officialDocsLabel="公式: Use Claude Code with Chrome"
          />
        </div>

        <div className="space-y-12 mt-8">
          {/* 位置づけ */}
          <section>
            <h2 className="text-3xl font-bold mb-6">
              検証ループを閉じる最後のピース
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              テストとビルドが通ることと、UI
              が意図どおり描画されることは別です。前ページで扱った「Claude
              が自分で回せるチェック」を<strong>見た目の領域まで広げる</strong>
              のが、ブラウザ連携と画面操作です。Claude
              が自分でページを開き、スクリーンショットを撮り、コンソールエラーを読んで、そのまま原因のコードを直せます。
            </p>
            <InfoBox type="info" title="Claude が道具を選ぶ順序">
              公式は、精密な手段から順に試すと説明しています。
              <strong>
                MCP サーバーがあればそれ → シェルで済むなら Bash →
                ブラウザ作業で Chrome 連携があればそれ →
                どれも当てはまらなければ computer use
              </strong>
              。画面操作は最も広範で最も遅いため、他の手段で届かないもの（ネイティブアプリ、シミュレータ、API
              を持たないツール）のために取っておきます。
            </InfoBox>
          </section>

          {/* Claude in Chrome */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Chrome className="text-[var(--claude-primary)]" />
              Claude in Chrome（Web アプリ向け）
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              Chrome 拡張と接続すると、ブラウザ操作とコーディングを 1
              つのワークフローで繋げられます。コンソールエラーと DOM
              を直接読んで原因のコードを直す、Figma のモックから作った UI
              を実際に開いて一致を確かめる、といった往復ができます。
            </p>
            <CodeBlock
              code={`# Chrome 連携を有効にして起動
$ claude --chrome

# 初回は連携の説明とサイト権限のダイアログが出る（Enter で継続）
# 以降フラグなしで有効にする設定も用意されている

# 指示の例
> localhost:3000 のチェックアウト画面を開いて、
> コンソールエラーを確認して原因を直して
> スクリーンショットを撮ってディスクに保存して`}
              language="bash"
            />
            <div className="mt-6 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h4 className="font-bold text-sm mb-3">前提条件</h4>
              <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-5">
                <li>Chrome / Edge などの Chromium 系ブラウザ</li>
                <li>Claude in Chrome 拡張（バージョン 1.0.36 以上）</li>
                <li>
                  <strong>
                    Anthropic の直接プラン（Pro / Max / Team / Enterprise）
                  </strong>
                  と <code>/login</code> でのサインイン
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3">
                API キーや <code>claude setup-token</code>{" "}
                の長期トークンで認証したセッションでは、<code>--chrome</code>{" "}
                を渡しても連携は無効のままになります（拡張がその資格情報で認証できないため）。Amazon
                Bedrock などのサードパーティプロバイダ経由でも利用できません。
              </p>
            </div>
          </section>

          {/* computer use */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MonitorSmartphone className="text-[var(--claude-primary)]" />
              computer use（ネイティブアプリ・シミュレータ向け）
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              GUI が必要な作業（ネイティブアプリのビルド検証、iOS
              シミュレータの操作、API を持たないツールの操作）を Claude
              が画面上で行います。Swift
              アプリを書いてコンパイルし、起動して各コントロールをクリックして確認する、といった流れを同じ会話の中で完結できます。
            </p>
            <CodeBlock
              code={`# ビルトイン MCP サーバー computer-use として提供される（既定は無効）
> /mcp
# サーバー一覧の computer-use を選び Enable
# 設定はプロジェクト単位で永続化されるので、初回に一度だけ

# 指示の例
> モーダルが小さいウィンドウで見切れる。
> ウィンドウをリサイズして再現し、スクショを撮って CSS を直して`}
              language="bash"
            />
            <InfoBox type="warning" title="research preview の制約">
              computer use は <strong>macOS の research preview</strong> で、
              <strong>Pro / Max プランが必要</strong>です（Team / Enterprise
              では利用不可）。対話セッション専用で、<code>-p</code>{" "}
              の非対話モードでは使えません。同時に動かせるのは 1
              セッションのみで、Claude の作業中は対象アプリが隠されます。
            </InfoBox>
          </section>

          {/* 使い分け */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ListOrdered className="text-[var(--claude-primary)]" />
              どれを使うか
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      検証したいもの
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      手段
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    [
                      "ロジック・データ変換の正しさ",
                      "テストスイート（最も速く確実）",
                    ],
                    [
                      "ブラウザ上の描画・コンソールエラー・ユーザーフロー",
                      "Claude in Chrome",
                    ],
                    [
                      "ヘッドレスで再現可能な E2E をコードとして残したい",
                      "Playwright MCP（MCP のページを参照）",
                    ],
                    [
                      "ネイティブアプリ・シミュレータ・GUI 専用ツール",
                      "computer use",
                    ],
                  ].map(([what, how]) => (
                    <tr key={what} className="bg-white dark:bg-slate-900">
                      <td className="px-4 py-3 text-muted-foreground">
                        {what}
                      </td>
                      <td className="px-4 py-3 font-bold text-[var(--claude-primary)]">
                        {how}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 証拠を残す */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Camera className="text-[var(--claude-primary)]" />
              証拠をファイルとして残す
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              スクリーンショットはディスクに保存させられます。Claude
              が保存先のパスを報告するので、あとから自分で確認したり、PR
              に添付したりできます。前ページの「主張ではなく証拠で受け取る」を、見た目の領域でも成立させられます。
            </p>
            <CodeBlock
              code={`> チェックアウト画面のスクリーンショットを撮って、ディスクに保存して

# 修正前後の比較を証拠として残す指示
> 修正前のスクショを撮って保存 → 修正 → 修正後のスクショを撮って保存 →
> 2 枚の差分を説明して`}
              language="bash"
            />
          </section>

          {/* 信頼境界 */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <ShieldAlert className="text-[var(--claude-primary)]" />
              信頼境界に注意する
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              ブラウザ連携も画面操作も、
              <strong>Claude が読む対象に外部のコンテンツが入ってきます</strong>
              。Web
              ページの内容がそのまま指示のように振る舞う可能性（プロンプトインジェクション）があるため、扱う範囲は意識して絞ります。
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-5">
              <li>
                Chrome
                連携にはサイト単位の権限管理がある。信頼できるサイトに限定する
              </li>
              <li>
                ログイン済みのアプリ（メール・ドキュメント等）を触らせるときは、その資格情報でできることすべてが操作範囲になると考える
              </li>
              <li>
                computer use
                は画面全体に触れる。実行中は他の作業を止め、必要な範囲が終わったら止める
              </li>
            </ul>
          </section>

          <CodingChallenge
            preview
            previewType="terminal"
            title="見た目の検証まで含む指示を書こう"
            description="ローカルの Web アプリのレイアウト崩れを、再現・修正・確認まで Claude に任せる一連のコマンドと指示を書いてください。"
            initialCode={`# 1. ブラウザ連携を有効にして起動\nclaude ___  # ← ここを埋める\n\n# 2. 再現と修正の指示\n# > localhost:3000 を開いて、幅 800px でヘッダーが折り返す問題を再現して。\n#   ___ を読んでエラーが出ていないかも確認して。  # ← ここを埋める（ブラウザ側の情報源）\n\n# 3. 証拠を残す指示\n# > 修正前後の___を撮ってディスクに保存して、差分を説明して。  # ← ここを埋める`}
            answer={`# 1. ブラウザ連携を有効にして起動\nclaude --chrome\n\n# 2. 再現と修正の指示\n# > localhost:3000 を開いて、幅 800px でヘッダーが折り返す問題を再現して。\n#   コンソールログ を読んでエラーが出ていないかも確認して。\n\n# 3. 証拠を残す指示\n# > 修正前後のスクリーンショットを撮ってディスクに保存して、差分を説明して。`}
            hints={[
              "--chrome フラグで Chrome 連携を有効にして起動します",
              "Chrome 連携ではコンソールログと DOM の状態を Claude が直接読めます",
              "スクリーンショットはディスクに保存させ、保存先パスを報告させると証拠として残ります",
            ]}
            keywords={["--chrome", "コンソール", "スクリーンショット"]}
          />

          {/* 参考リンク */}
          <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  label: "Use Claude Code with Chrome（公式）",
                  url: "https://code.claude.com/docs/en/chrome",
                },
                {
                  label: "Let Claude use your computer from the CLI（公式）",
                  url: "https://code.claude.com/docs/en/computer-use",
                },
                {
                  label: "Best practices — 検証手段を与える（公式）",
                  url: "https://code.claude.com/docs/en/best-practices",
                },
              ].map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--claude-primary)] underline underline-offset-2"
                  >
                    {item.label}
                    <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
