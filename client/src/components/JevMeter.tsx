import { useId, useState } from "react";
import { Gauge, RotateCcw } from "lucide-react";

/** 入力100万トークンあたりの単価（Jev 1.13、2026-09-20時点のModelsページの値） */
const DEFAULT_PRICE_PER_MILLION_USD = 0.042;

export interface JevMeterStrategy {
  id: string;
  /** 表に出す呼び方。「1件ずつ送る」「20件を1リクエスト」など */
  label: string;
  /** 1リクエストで片付く仕事の数 */
  unitsPerRequest: number;
  /** 1リクエストあたりの実測の応答時間 */
  latencyMs: number;
  /** 1リクエストあたりの実測の入力トークン。測っていない場合は省く */
  inputTokens?: number;
  note?: string;
}

interface JevMeterProps {
  title: string;
  description: string;
  /** 仕事の単位。「判断」「案」「指標」など */
  unitLabel: string;
  /** 1つなら累計だけ、2つなら並べて比べる */
  strategies: JevMeterStrategy[];
  /** ボタンに出す増分。既定は20・100・1000 */
  steps?: number[];
  /** 実測の出どころ。「2026-09-20、jev-1.13.0で実測」など */
  measuredNote: string;
  pricePerMillionInputUsd?: number;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}秒`;
  const min = Math.floor(ms / 60000);
  const sec = Math.round((ms % 60000) / 1000);
  return `${min}分${String(sec).padStart(2, "0")}秒`;
}

function formatUsd(usd: number): string {
  if (usd === 0) return "$0";
  if (usd < 0.01) return `$${usd.toFixed(6)}`;
  if (usd < 1) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(2)}`;
}

export default function JevMeter({
  title,
  description,
  unitLabel,
  strategies,
  steps = [20, 100, 1000],
  measuredNote,
  pricePerMillionInputUsd = DEFAULT_PRICE_PER_MILLION_USD,
}: JevMeterProps) {
  const uid = useId();
  const [units, setUnits] = useState(0);

  // 実測は1リクエストあたりの値なので、リクエスト数を掛けて累計を出す
  const rows = strategies.map((s) => {
    const requests = Math.ceil(units / s.unitsPerRequest);
    const tokens =
      s.inputTokens === undefined
        ? undefined
        : Math.round(requests * s.inputTokens);
    return {
      strategy: s,
      requests,
      totalMs: requests * s.latencyMs,
      tokens,
      usd:
        tokens === undefined
          ? undefined
          : (tokens / 1_000_000) * pricePerMillionInputUsd,
    };
  });

  const hasTokens = rows.some((r) => r.tokens !== undefined);
  const compare = rows.length > 1;

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Gauge className="text-primary" size={16} aria-hidden="true" />
        </div>
        <span className="text-sm font-bold text-primary uppercase tracking-wider">
          計測パネル
        </span>
      </div>

      <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {steps.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => setUnits((n) => n + step)}
            className="rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {step.toLocaleString()}
            {unitLabel}を処理
          </button>
        ))}
        <button
          type="button"
          onClick={() => setUnits(0)}
          disabled={units === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <RotateCcw size={14} aria-hidden="true" />
          リセット
        </button>
      </div>

      <div>
        {/* 表そのものを読み上げ対象にすると毎回全体を読むので、要約だけを伝える */}
        <div role="status">
          <p className="text-sm text-muted-foreground mb-3">
            これまでに処理した{unitLabel}:{" "}
            <span className="font-mono tabular-nums font-bold text-foreground">
              {units.toLocaleString()}
            </span>
          </p>
          <p className="sr-only">
            {rows.map((r) => {
              const cost =
                r.usd === undefined ? "" : `、料金の概算は${formatUsd(r.usd)}`;
              return `${r.strategy.label}はリクエスト${r.requests.toLocaleString()}回、応答時間の合計は${formatDuration(r.totalMs)}${cost}。`;
            })}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border">
            <caption className="sr-only">
              {units.toLocaleString()}
              {unitLabel}を処理したときの、やり方ごとの累計
            </caption>
            <thead className="bg-muted">
              <tr>
                <th
                  scope="col"
                  className="text-left p-3 border-b border-border font-medium"
                >
                  やり方
                </th>
                <th
                  scope="col"
                  className="text-left p-3 border-b border-border font-medium"
                >
                  リクエスト
                </th>
                <th
                  scope="col"
                  className="text-left p-3 border-b border-border font-medium"
                >
                  応答時間の合計
                </th>
                {hasTokens && (
                  <>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border font-medium"
                    >
                      入力トークン
                    </th>
                    <th
                      scope="col"
                      className="text-left p-3 border-b border-border font-medium"
                    >
                      料金の概算
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {rows.map((r) => (
                <tr key={r.strategy.id} className="border-b border-border">
                  <th
                    scope="row"
                    className="p-3 text-left font-medium text-foreground"
                  >
                    {r.strategy.label}
                    {r.strategy.note && (
                      <span className="block text-xs font-normal text-muted-foreground">
                        {r.strategy.note}
                      </span>
                    )}
                  </th>
                  <td className="p-3 font-mono tabular-nums">
                    {r.requests.toLocaleString()}回
                  </td>
                  <td className="p-3 font-mono tabular-nums">
                    {formatDuration(r.totalMs)}
                  </td>
                  {hasTokens && (
                    <>
                      <td className="p-3 font-mono tabular-nums">
                        {r.tokens === undefined
                          ? "測っていない"
                          : r.tokens.toLocaleString()}
                      </td>
                      <td className="p-3 font-mono tabular-nums">
                        {r.usd === undefined ? "—" : formatUsd(r.usd)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {compare && units > 0 && (
        <p
          className="text-sm text-foreground mt-3 leading-relaxed"
          id={`${uid}-diff`}
        >
          差: リクエストは{rows[0].requests.toLocaleString()}回から
          {rows[1].requests.toLocaleString()}回、応答時間の合計は
          {formatDuration(rows[0].totalMs)}から{formatDuration(rows[1].totalMs)}
          になります。
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        ここで動いているのは記録の再生です。ページからJevは呼びません。1リクエストあたりの応答時間と入力トークンは
        {measuredNote}
        の値で、累計はそれにリクエスト数を掛けた概算です。応答時間はリクエストを直列に送った場合で、並列に送れば短くなります。料金は入力100万トークンあたり$
        {pricePerMillionInputUsd}
        として計算しています（出力トークンは執筆時点で無料）。単価は改定されるので、使う前に公式のModelsページで確かめてください。
      </p>
    </div>
  );
}
