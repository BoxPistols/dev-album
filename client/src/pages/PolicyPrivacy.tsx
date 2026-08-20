import { Link } from "wouter";
import {
  ArrowLeft,
  BarChart3,
  Gauge,
  HardDrive,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

// 最終更新日。内容を変えたらここも更新する。
const UPDATED_AT = "2026-08-21";

// Vercel Web Analytics が 1 データポイントごとに保存しうる項目。
// 出典: https://vercel.com/docs/analytics/privacy-policy
const ANALYTICS_FIELDS = [
  { name: "発生時刻", example: "2026-08-21 09:06:30" },
  { name: "URL", example: "/git/flow-automation/notifications" },
  { name: "ルート（動的パス）", example: "/git/:section/:page" },
  { name: "参照元", example: "https://example.com/" },
  { name: "クエリパラメータ（絞り込み後）", example: "?ref=newsletter" },
  { name: "地域", example: "JP, Tokyo" },
  { name: "OS とバージョン", example: "macOS 15" },
  { name: "ブラウザとバージョン", example: "Chrome 140 (Blink)" },
  { name: "デバイス種別", example: "Desktop / Mobile / Tablet" },
  { name: "計測スクリプトのバージョン", example: "2.0.1" },
];

// Vercel Speed Insights が保存する項目。
// 出典: https://vercel.com/docs/speed-insights/privacy-policy
const SPEED_FIELDS = [
  { name: "ルート / URL", example: "/react/mui/intro" },
  { name: "回線速度", example: "4g（slow-2g / 2g / 3g）" },
  { name: "ブラウザ", example: "Chrome 140 (Blink)" },
  { name: "デバイス種別・OS", example: "Desktop / macOS 15" },
  { name: "国（ISO 3166-1 alpha-2）", example: "JP" },
  { name: "Web Vitals の値", example: "FCP 1.0s" },
  { name: "値に寄与した要素", example: "html>body img.header" },
  { name: "SDK のバージョン", example: "@vercel/speed-insights 2.0.0" },
  { name: "サーバー受信時刻", example: "2026-08-21 09:06:30" },
];

// ブラウザの localStorage に置いているもの。
// ここに「保存する」ことと「サーバーへ送る」ことは別。AI チャットだけは
// 回答を作るために内容がサーバーを経由する（履歴の保存先はブラウザのまま）。
const LOCAL_STORAGE = [
  { key: "bookmarked-pages", detail: "ブックマークしたページ" },
  { key: "completed-pages", detail: "学習の進捗（読了したページ）" },
  { key: "streak-data", detail: "連続して学習した日数の記録" },
  { key: "achievements", detail: "獲得した実績" },
  { key: "page-note:<パス>", detail: "ページごとに書いたメモ" },
  {
    key: "chat-history / chat-settings / chat-panel-size",
    detail:
      "AI チャットの会話履歴と表示設定。履歴の保存先はブラウザだけだが、送信した内容は回答を作るためにサーバーを経由する",
  },
  {
    key: "theme / theme-mode / font-size / layout-mode",
    detail: "テーマ・文字サイズ・レイアウトの設定",
  },
  { key: "platform / selectedOS", detail: "コード例を出し分ける OS の選択" },
];

export default function PolicyPrivacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft size={14} />
          トップに戻る
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          プライバシーについて
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          dev-album が何を集めて、何を集めないかをまとめています。最終更新{" "}
          {UPDATED_AT}。
        </p>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">要点</h2>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-6 leading-relaxed">
            <li>
              アカウント登録はありません。氏名・メールアドレスは集めません
            </li>
            <li>
              アクセス解析と表示速度の計測に Vercel
              のサービスを使っています。どちらも Cookie
              を使わず、個人を特定できる形ではデータを保存しません
            </li>
            <li>
              学習の進捗・ブックマーク・メモは
              <strong>あなたのブラウザの中</strong>
              にだけ保存され、サーバーへは送りません
            </li>
            <li>
              AI チャットだけは例外で、送信した内容が回答を作るために
              サーバーを経由します。会話履歴そのものの保存先はブラウザです
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              アクセス解析
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            どのページが読まれているかを把握するために{" "}
            <strong>Vercel Web Analytics</strong>{" "}
            を使っています。公式ドキュメントによれば、第三者 Cookie
            を使わず、訪問者はリクエストから作られたハッシュで識別されます。
            その識別は永続化されず、24 時間で自動的に破棄されます。
            ページを開いたときだけでなく、サイト内でページを移動したときも
            計測の対象になります。
          </p>
          <div
            className="rounded-xl border border-border bg-card overflow-x-auto mb-3"
            tabIndex={0}
            role="region"
            aria-label="アクセス解析で保存される項目（横スクロールできます）"
          >
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">項目</th>
                  <th className="text-left px-4 py-2 font-medium">例</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ANALYTICS_FIELDS.map((f) => (
                  <tr key={f.name}>
                    <td className="px-4 py-2.5 text-foreground align-top">
                      {f.name}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground align-top">
                      {f.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            IP アドレスそのものは保存されません。 このサイトの URL
            には個人を特定する値を含めていないため、
            上の「URL」から誰かが特定されることもありません。
          </p>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Gauge size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              表示速度の計測
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            ページの表示が遅くなっていないかを見るために{" "}
            <strong>Vercel Speed Insights</strong>{" "}
            を使っています。ブラウザ標準の API から Web Vitals
            の値を読み取って送るもので、こちらも個人の閲覧をページをまたいで
            つなぎ直せる情報は集めません。
          </p>
          <div
            className="rounded-xl border border-border bg-card overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="表示速度の計測で保存される項目（横スクロールできます）"
          >
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">項目</th>
                  <th className="text-left px-4 py-2 font-medium">例</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SPEED_FIELDS.map((f) => (
                  <tr key={f.name}>
                    <td className="px-4 py-2.5 text-foreground align-top">
                      {f.name}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground align-top">
                      {f.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <HardDrive size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              ブラウザに保存するもの
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            以下はブラウザの localStorage
            に保存されます。ブラウザの設定から消せば、いつでも全部消えます。
            保存先がブラウザであることと、サーバーへ送るかどうかは別の話です。
            AI チャットは送信した内容が回答を作るためにサーバーを経由し、
            それ以外はサーバーへ送りません。
          </p>
          <div
            className="rounded-xl border border-border bg-card overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="ブラウザに保存する項目（横スクロールできます）"
          >
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">キー</th>
                  <th className="text-left px-4 py-2 font-medium">内容</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {LOCAL_STORAGE.map((s) => (
                  <tr key={s.key}>
                    <td className="px-4 py-2.5 align-top">
                      <code className="text-foreground bg-muted px-1.5 py-0.5 rounded whitespace-nowrap">
                        {s.key}
                      </code>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground align-top">
                      {s.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              AI チャット
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            会話の内容は回答を生成するためにサーバーを経由しますが、履歴は
            ブラウザにだけ残ります。利用枠の集計には IP
            アドレスそのものではなくハッシュ化したセッション ID を使い、48
            時間で失効します。詳しくは{" "}
            <Link
              href="/policy/chat-quota"
              className="text-primary underline underline-offset-2"
            >
              AI チャット 利用ポリシー
            </Link>{" "}
            を参照してください。
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              気になることがあれば
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            記載内容の確認や削除の依頼は{" "}
            <Link
              href="/bug-report"
              className="text-primary underline underline-offset-2"
            >
              バグ報告フォーム
            </Link>{" "}
            から連絡してください。各サービスの詳細は{" "}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Vercel Web Analytics のプライバシー方針
            </a>{" "}
            と{" "}
            <a
              href="https://vercel.com/docs/speed-insights/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Speed Insights のプライバシー方針
            </a>{" "}
            にあります。
          </p>
        </section>
      </div>
    </div>
  );
}
