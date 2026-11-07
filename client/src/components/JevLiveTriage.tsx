import { useId, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Link } from "wouter";
import { useJevTriage } from "@/hooks/useJevTriage";
import JevTriageOutcome, { type JevTriageRecord } from "./JevTriageOutcome";
import { MAX_JEV_MESSAGE_CHARS } from "../../../api/lib/jevRequest";

interface JevLiveTriageProps {
  record: JevTriageRecord;
  recordHref: string;
  recordLinkLabel: string;
}

/** 読者の入力を/api/jevへ送り、実際の判定を表示する */
export default function JevLiveTriage({
  record,
  recordHref,
  recordLinkLabel,
}: JevLiveTriageProps) {
  const uid = useId();
  const [message, setMessage] = useState("");
  const { state, run } = useJevTriage();

  const tooLong = message.length > MAX_JEV_MESSAGE_CHARS;
  const canRun =
    message.trim().length > 0 && !tooLong && state.status !== "running";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (canRun) void run(message);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-6">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor={`${uid}-message`}
          className="block text-sm font-semibold text-foreground mb-2"
        >
          問い合わせの文章
        </label>
        <textarea
          id={`${uid}-message`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          aria-invalid={tooLong}
          aria-describedby={`${uid}-count ${uid}-notice`}
          placeholder="例: 今月の請求が2回引き落とされています。"
          className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <p id={`${uid}-count`} className="text-sm text-muted-foreground mt-1">
          {message.length.toLocaleString()} /{" "}
          {MAX_JEV_MESSAGE_CHARS.toLocaleString()}文字
          {tooLong && "（上限を超えています）"}
        </p>
        <p id={`${uid}-notice`} className="text-sm text-muted-foreground mt-2">
          入力した文章は、判定のためにサーバーを経由してTypeSafeのAPIへ送られます。氏名や連絡先などの個人情報は入れないでください。実行するとAIチャットと共通の利用枠を1回使います。詳しくは
          <Link
            href="/policy/privacy"
            className="text-primary underline underline-offset-2"
          >
            プライバシーについて
          </Link>
          を見てください。
        </p>
        <button
          type="submit"
          disabled={!canRun}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary disabled:opacity-40 disabled:hover:bg-muted disabled:hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Send size={14} aria-hidden="true" />
          {state.status === "running" ? "実行中" : "Jevに送って判定する"}
        </button>
      </form>

      <div role="status" aria-live="polite" className="mt-4 empty:mt-0">
        <JevTriageOutcome
          state={state}
          record={record}
          recordHref={recordHref}
          recordLinkLabel={recordLinkLabel}
        />
      </div>
    </div>
  );
}
