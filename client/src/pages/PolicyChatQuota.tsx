// implementation-mirror: api/lib/quota.ts
import { Link } from "wouter";
import { Shield, Key, Activity, ArrowLeft } from "lucide-react";

export default function PolicyChatQuota() {
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
          AI チャット 利用ポリシー
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          dev-album の AI 学習アシスタントの無料枠と識別方法について。
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          サイト全体で何を集めているかは{" "}
          <Link
            href="/policy/privacy"
            className="text-primary underline underline-offset-2"
          >
            プライバシーについて
          </Link>{" "}
          にまとめています。
        </p>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">利用枠</h2>
          </div>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">区分</th>
                  <th className="text-left px-4 py-2 font-medium">1 日上限</th>
                  <th className="text-left px-4 py-2 font-medium">識別方法</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 text-foreground font-medium">
                    匿名
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    デプロイ時の設定値（下記の方法で確認）
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    IP + ブラウザ
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground font-medium">
                    BYOK
                  </td>
                  <td className="px-4 py-3 text-foreground">無制限</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    自前 API キー
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            匿名の上限はデプロイ時の設定値で決まるため、このページには具体的な回数を書きません。実際に適用されている値は
            ChatWidget のヘッダの「今日あと N 回」と、レスポンスの{" "}
            <code className="text-foreground bg-muted px-1.5 py-0.5 rounded">
              X-RateLimit-Limit
            </code>{" "}
            ヘッダで確認できます。
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            リセット時刻は{" "}
            <strong className="text-foreground">UTC 0 時 (JST 9 時)</strong>。
            ChatWidget のヘッダに「今日あと N 回」が表示されます。
          </p>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              セッション識別
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            利用カウントは{" "}
            <code className="text-foreground bg-muted px-1.5 py-0.5 rounded">
              SHA-256(IP + UserAgent)
            </code>{" "}
            の先頭 32 桁をセッション ID
            として集計されます。区分 (匿名 / BYOK) はセッション ID
            ではなくカウンタのキー側に含まれます。同じネットワーク・同じブラウザからの複数タブは同一セッション扱いです。
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-6">
            <li>
              IP アドレスは保存せず、上記のセッション ID
              だけを使います。カウンタは最終アクセスから 48
              時間で自動失効します
            </li>
            <li>個人を特定する情報 (氏名・メール等) は記録しません</li>
            <li>
              会話履歴はブラウザの localStorage
              にのみ保存され、サーバー側に残しません
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Key size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              BYOK (Bring Your Own Key)
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            自分の OpenAI API キー (
            <code className="text-foreground bg-muted px-1.5 py-0.5 rounded">
              sk-...
            </code>
            )
            を入力すると、サーバー側の利用枠を消費せずに無制限で利用できます。料金は
            OpenAI から直接請求されます。 キーはブラウザの localStorage
            にのみ保存され、サーバーには永続化しません。
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <Activity size={18} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              障害時の挙動
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            利用枠カウンタが障害で読めない場合は、サービス継続を優先してチャット機能はそのまま動作します
            (fail-open)。全体枠の上限に達した場合は匿名利用を一時停止し、BYOK
            の利用者のみ継続できます。
          </p>
        </section>
      </div>
    </div>
  );
}
