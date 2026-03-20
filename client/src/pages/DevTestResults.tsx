/**
 * CodingChallenge テスト結果ダッシュボード（開発用）
 * ローカル環境でのみアクセス: /dev/test-results
 * 全 CodingChallenge の fuzzyCheck 正当性を一覧で検証する
 */
import { useState, useEffect, useCallback } from "react";
import { fuzzyCheck } from "@/components/CodingChallenge";
import { level1Challenges, type Challenge } from "@/pages/Training";
import { level2Challenges } from "@/data/training-level2";
import { level3Challenges } from "@/data/training-level3";
import { level4Challenges } from "@/data/training-level4";

// ── チャレンジレジストリエントリ型 ──
interface ChallengeEntry {
  source: string;
  level: number;
  index: number;
  title: string;
  keywords: string[];
  initialCode: string;
  answer: string;
}

// ── テスト結果型 ──
interface TestResult {
  entry: ChallengeEntry;
  hasPlaceholder: boolean;
  // answer で answer を判定 → true であるべき
  answerPass: boolean;
  // initialCode で answer を判定 → false であるべき（穴埋め式のみ）
  initialFail: boolean | null;
}

// ── チャレンジデータを統一形式に変換 ──
function buildRegistry(): ChallengeEntry[] {
  const entries: ChallengeEntry[] = [];

  const addLevel = (
    challenges: (
      | Challenge
      | {
          id: string;
          title: string;
          description: string;
          difficulty: string;
          initialCode: string;
          answer: string;
          hints: string[];
          keywords: string[];
        }
    )[],
    level: number,
    source: string,
  ) => {
    challenges.forEach((ch, i) => {
      entries.push({
        source,
        level,
        index: i + 1,
        title: ch.title,
        keywords: ch.keywords,
        initialCode: ch.initialCode,
        answer: ch.answer,
      });
    });
  };

  addLevel(level1Challenges, 1, "Training L1");
  addLevel(level2Challenges, 2, "Training L2");
  addLevel(level3Challenges, 3, "Training L3");
  addLevel(level4Challenges, 4, "Training L4");

  return entries;
}

// ── テスト実行 ──
function runTests(entries: ChallengeEntry[]): TestResult[] {
  return entries.map((entry) => {
    const hasPlaceholder = entry.initialCode.includes("___");

    // テスト 1: answer を入力 → 正解になるべき
    const answerPass = fuzzyCheck(
      entry.answer,
      entry.answer,
      entry.keywords,
      entry.initialCode,
    );

    // テスト 2: initialCode をそのまま入力 → 不正解になるべき（穴埋め式のみ）
    let initialFail: boolean | null = null;
    if (hasPlaceholder) {
      const result = fuzzyCheck(
        entry.initialCode,
        entry.answer,
        entry.keywords,
        entry.initialCode,
      );
      initialFail = !result; // result が false なら期待通り → initialFail = true
    }

    return { entry, hasPlaceholder, answerPass, initialFail };
  });
}

// ── バッジコンポーネント ──
function PassBadge({ pass }: { pass: boolean }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
        pass
          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
      }`}
    >
      {pass ? "PASS" : "FAIL"}
    </span>
  );
}

function SkipBadge() {
  return (
    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-muted text-muted-foreground">
      SKIP
    </span>
  );
}

export default function DevTestResults() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [filterLevel, setFilterLevel] = useState<"all" | number>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "pass" | "fail">(
    "all",
  );

  const runAllTests = useCallback(() => {
    const registry = buildRegistry();
    const testResults = runTests(registry);
    setResults(testResults);
  }, []);

  // ページロード時に自動テスト実行
  useEffect(() => {
    runAllTests();
  }, [runAllTests]);

  // ── 集計 ──
  const total = results.length;
  const passed = results.filter(
    (r) => r.answerPass && (r.initialFail === null || r.initialFail),
  ).length;
  const failed = total - passed;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : "0.0";

  // ── フィルタ ──
  const filteredResults = results.filter((r) => {
    if (filterLevel !== "all" && r.entry.level !== filterLevel) return false;
    if (filterStatus === "pass") {
      return r.answerPass && (r.initialFail === null || r.initialFail);
    }
    if (filterStatus === "fail") {
      return !r.answerPass || (r.initialFail !== null && !r.initialFail);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* ── ヘッダー ── */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded">
            DEV ONLY
          </span>
          <h1 className="text-4xl font-extrabold text-foreground mt-2">
            Test Results Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            CodingChallenge の fuzzyCheck 判定結果を一覧表示
          </p>
        </div>

        {/* ── サマリー ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Total
            </p>
            <p className="text-3xl font-bold text-foreground">{total}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Passed
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {passed}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Failed
            </p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {failed}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Pass Rate
            </p>
            <p
              className={`text-3xl font-bold ${
                parseFloat(passRate) === 100
                  ? "text-green-600 dark:text-green-400"
                  : parseFloat(passRate) >= 90
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-red-600 dark:text-red-400"
              }`}
            >
              {passRate}%
            </p>
          </div>
        </div>

        {/* ── フィルタ + 再実行ボタン ── */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex gap-1">
            {(["all", 1, 2, 3, 4] as const).map((lv) => (
              <button
                key={String(lv)}
                onClick={() => setFilterLevel(lv)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  filterLevel === lv
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {lv === "all" ? "全レベル" : `L${lv}`}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {(["all", "pass", "fail"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  filterStatus === s
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s === "all"
                  ? "全結果"
                  : s === "pass"
                    ? "Pass のみ"
                    : "Fail のみ"}
              </button>
            ))}
          </div>
          <button
            onClick={runAllTests}
            className="ml-auto px-4 py-1.5 rounded text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            再テスト実行
          </button>
        </div>

        {/* ── テーブル ── */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                    #
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                    Source
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                    Title
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                    Keywords
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                    ___
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                    answer=answer
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                    initial=fail
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-muted-foreground">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((r, i) => {
                  const isRowPass =
                    r.answerPass && (r.initialFail === null || r.initialFail);
                  return (
                    <tr
                      key={`${r.entry.source}-${r.entry.index}`}
                      className={`border-t border-border transition-colors ${
                        i % 2 === 0 ? "bg-background" : "bg-muted/30"
                      } ${!isRowPass ? "bg-red-50/50 dark:bg-red-950/10" : ""}`}
                    >
                      <td className="px-4 py-2.5 font-mono text-muted-foreground">
                        {r.entry.index}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                          {r.entry.source}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-foreground font-medium max-w-[300px] truncate">
                        {r.entry.title}
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono text-muted-foreground">
                        {r.entry.keywords.length}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {r.hasPlaceholder ? (
                          <span className="text-amber-600 dark:text-amber-400 font-mono text-xs">
                            Yes
                          </span>
                        ) : (
                          <span className="text-muted-foreground font-mono text-xs">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <PassBadge pass={r.answerPass} />
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {r.initialFail !== null ? (
                          <PassBadge pass={r.initialFail} />
                        ) : (
                          <SkipBadge />
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <PassBadge pass={isRowPass} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 凡例 ── */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-1">
          <p>
            <strong>answer=answer:</strong> fuzzyCheck(answer, answer, keywords,
            initialCode) が true になるか（正解コードが正解と判定されるか）
          </p>
          <p>
            <strong>initial=fail:</strong> fuzzyCheck(initialCode, answer,
            keywords, initialCode) が false
            になるか（未変更コードが不正解と判定されるか）
          </p>
          <p>
            <strong>___:</strong> initialCode に ___
            プレースホルダーが含まれるか（穴埋め式かどうか）
          </p>
          <p>
            <strong>SKIP:</strong> 穴埋め式でないチャレンジは initial=fail
            テストをスキップ
          </p>
        </div>
      </div>
    </div>
  );
}
