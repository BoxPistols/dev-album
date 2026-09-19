import { Lightbulb, Hammer, Plane } from "lucide-react";
import { Link } from "wouter";
import CodeBlock from "@/components/CodeBlock";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";

/**
 * サンプルアプリのアイデア 20
 * STEP 17: Jev セクション
 * - Jev の 3 つの質問型で「こんなことができる」を 20 個、概要だけ示す
 * - 講座で実際に作る 3 本を明示する（STEP 18〜20）
 */

type QuestionType = "noul" | "choice" | "score";

interface Idea {
  title: string;
  what: string;
  types: QuestionType[];
  buildStep?: number;
  href?: string;
}

interface IdeaGroup {
  group: string;
  ideas: Idea[];
}

const IDEA_GROUPS: IdeaGroup[] = [
  {
    group: "日常生活",
    ideas: [
      {
        title: "家計簿の自動仕分け",
        what: "レシートや明細の 1 行をカテゴリに仕分け、固定費かどうかと見直す価値を返す。迷ったものだけ自分で直す",
        types: ["choice", "noul", "score"],
        buildStep: 18,
        href: "/ai-ml/jev/jev-ledger-app",
      },
      {
        title: "受信トレイの返信要否",
        what: "メールや通知の本文から「今日返すべきか」「誰宛か（自分 / 家族 / 仕事）」を判定し、今日の分だけ並べる",
        types: ["noul", "choice"],
      },
      {
        title: "冷蔵庫の中身から献立の可否",
        what: "手元の食材リストとレシピ候補を state にし、作れるか・買い足しが要るかを判定して候補を絞る",
        types: ["noul", "score"],
      },
      {
        title: "予定の重なりと移動時間の無理判定",
        what: "カレンダーの隣接する予定と場所を渡し、移動が間に合うか、リスケが要るかを判定して通知する",
        types: ["noul", "score"],
      },
      {
        title: "フリマ出品文の禁止事項チェック",
        what: "出品の説明文が規約（転売禁止品、連絡先の記載など）に触れるかを投稿前に判定する",
        types: ["noul", "choice"],
      },
    ],
  },
  {
    group: "デザイナー・クリエイター",
    ideas: [
      {
        title: "UI 文言チェッカー",
        what: "ボタン・エラー・空状態の文言を、チームのライティング指針に照らして「そのまま / 直す / 出さない」に分ける",
        types: ["noul", "choice", "score"],
        buildStep: 19,
        href: "/ai-ml/jev/jev-copycheck-app",
      },
      {
        title: "代替テキストの妥当性採点",
        what: "画像の説明文が「装飾か」「内容を十分に伝えるか」を段階で採点し、a11y レビューの優先順位に使う",
        types: ["score", "noul"],
      },
      {
        title: "デザイントークン命名の一貫性",
        what: "新しいトークン名が命名規則（役割ベース / 階層）に沿うかを判定し、PR の前に直す",
        types: ["noul", "choice"],
      },
      {
        title: "デザインレビュー依頼の振り分け",
        what: "レビュー依頼の文面から、必要な観点（a11y / ビジュアル / 情報設計 / 文言）と急ぎ度を判定して担当を決める",
        types: ["choice", "score"],
      },
      {
        title: "ポートフォリオ掲載可否の一次判定",
        what: "制作物の説明が守秘義務や実名の扱いに触れないかを判定し、公開前に人が見る分を絞る",
        types: ["noul", "score"],
      },
    ],
  },
  {
    group: "プロダクト作り・チーム",
    ideas: [
      {
        title: "ユーザーの声の分類ボード",
        what: "レビューやアンケートの自由記述をまとめて「要望 / 不具合 / 使いにくさ / 称賛」に分け、深刻さ順に並べる",
        types: ["choice", "score", "noul"],
        buildStep: 20,
        href: "/ai-ml/jev/jev-feedback-app",
      },
      {
        title: "問い合わせの担当振り分け",
        what: "フォームの内容から担当チームと急ぎ度を決め、確信が低いものだけ人が振り分ける",
        types: ["choice", "noul", "score"],
      },
      {
        title: "会議メモからの決定事項抽出の可否",
        what: "メモの各段落が「決定」「宿題」「雑談」のどれかを判定し、議事録の下書きに使う段落だけ残す",
        types: ["choice"],
      },
      {
        title: "コードレビューコメントの重要度ラベル",
        what: "コメントを「必須」「提案」「質問」に分け、必須だけをマージ条件に反映する",
        types: ["choice"],
      },
    ],
  },
  {
    group: "運用・開発",
    ideas: [
      {
        title: "アラートの優先度付け",
        what: "複数のアラートを 1 リクエストで評価し、緊急度の期待値で並べる",
        types: ["score", "choice"],
      },
      {
        title: "バグ報告の重複らしさと再現性",
        what: "新しい報告が既存の報告と同じ現象か、再現手順が揃っているかを判定して一次確認を減らす",
        types: ["noul", "score"],
      },
      {
        title: "SLO 違反の一次判定",
        what: "複数メトリクスの要約から、インシデント宣言が要る状況かどうかと深刻度を判定し、当番への呼び出しを絞る",
        types: ["noul", "score"],
      },
    ],
  },
  {
    group: "ゲーム・LLM との組み合わせ",
    ideas: [
      {
        title: "フライトシミュレーターの自動操縦判断",
        what: "Three.js 講座で作る飛行機ゲームの各フレームの状態（障害物までの距離、天候の変化、燃料）を state にし、回避・高度変更・帰還のどれを取るかを選ぶ。下のコラムで実装の形を示す",
        types: ["choice", "noul", "score"],
        href: "/threejs/game-dev/aircraft",
      },
      {
        title: "LLM 回答の公開前チェック",
        what: "下書きが根拠資料と矛盾しないか、断るべき質問でないかを判定し、通過したものだけ送る",
        types: ["noul", "score"],
      },
      {
        title: "FAQ で解決できるかの一次判定",
        what: "LLM を呼ぶ前に「既存のヘルプ記事で答えられるか」を判定し、定型応答で済ませる",
        types: ["noul", "choice"],
      },
    ],
  },
];

const TYPE_LABEL: Record<QuestionType, string> = {
  noul: "noul",
  choice: "choice",
  score: "score",
};

export default function JevAppIdeas() {
  let index = 0;
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 17</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリのアイデア 20
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Jev の 3
          つの質問型で何が作れるかを、コードを書く前に一覧で眺めます。各項目は「こんなことができる」の概要だけです。
          このうち 3 つを、続く STEP 18〜20 で実際に作ります。
        </p>

        <WhyNowBox
          tags={["ユースケース", "noul", "choice", "score", "3 本を作る"]}
        >
          <p>
            型が 3
            つしかないぶん、「自分の仕事のどこに当てはまるか」は発想の問題になります。
            他人の例を 20
            個見ると、自分のサービスの中で「候補が決まっていて、繰り返し、確率で行動を変えられる判断」が見つけやすくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Hammer className="text-primary" size={28} />
              講座で作る 3 本
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              3
              本は、質問型の使い分けと構成パターンが重ならないように選んでいます。
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  step: 18,
                  title: "家計簿の自動仕分け",
                  point:
                    "日常生活の題材。choice + noul + score を 1 リクエストで。Route Handler と React の基本形",
                  href: "/ai-ml/jev/jev-ledger-app",
                },
                {
                  step: 19,
                  title: "UI 文言チェッカー",
                  point:
                    "デザイナー向け。指針を state で渡し「そのまま / 直す / 出さない」の 3 分岐。失敗時は「直す」に倒す",
                  href: "/ai-ml/jev/jev-copycheck-app",
                },
                {
                  step: 20,
                  title: "ユーザーの声の分類ボード",
                  point:
                    "プロダクト作り向け。配列 state で一括評価し、深刻さの期待値で並べる",
                  href: "/ai-ml/jev/jev-feedback-app",
                },
              ].map((app) => (
                <Link key={app.step} href={app.href} className="group block">
                  <div className="rounded-xl border border-border bg-card p-5 h-full hover:shadow-sm transition-shadow">
                    <p className="text-xs font-bold text-primary mb-1">
                      STEP {app.step}
                    </p>
                    <p className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {app.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {app.point}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Lightbulb className="text-primary" size={28} />
              アイデア一覧
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              右端は使う質問型です。「講座で作る」と付いた 3
              本は該当ページへ移動できます。
            </p>
            <div className="space-y-8">
              {IDEA_GROUPS.map((g) => (
                <div key={g.group}>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {g.group}
                  </h3>
                  <ol className="space-y-2">
                    {g.ideas.map((idea) => {
                      index += 1;
                      return (
                        <li
                          key={idea.title}
                          className="rounded-xl border border-border bg-card p-4"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                              {index}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <p className="font-semibold text-foreground">
                                  {idea.title}
                                </p>
                                {idea.buildStep && idea.href && (
                                  <Link
                                    href={idea.href}
                                    className="text-xs font-medium text-primary underline underline-offset-2"
                                  >
                                    講座で作る（STEP {idea.buildStep}）
                                  </Link>
                                )}
                                {!idea.buildStep && idea.href && (
                                  <Link
                                    href={idea.href}
                                    className="text-xs font-medium text-primary underline underline-offset-2"
                                  >
                                    関連: Three.js 講座の飛行機モデル
                                  </Link>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {idea.what}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {idea.types.map((t) => (
                                  <span
                                    key={t}
                                    className="inline-block px-2 py-0.5 rounded-full text-xs font-mono bg-muted text-foreground border border-border"
                                  >
                                    {TYPE_LABEL[t]}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
            </div>
            <InfoBox type="info" title="自分の題材を選ぶときの見方">
              一覧のどれも「候補が先に決まっている」「同じ形の判断を繰り返す」「確率で行動を変えられる」の
              3 条件を満たしています。 自分のサービスで題材を探すときも、この 3
              条件を先に確かめてから質問型を選ぶと、Jev
              に向かない仕事（文章を書く、候補を発明する）を避けられます。
            </InfoBox>
          </section>

          {/* コラム: フライトシミュレーターのモックアップ */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Plane className="text-primary" size={28} />
              コラム: フライトシミュレーターに Jev を載せるとしたら
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Three.js 講座の「飛行機モデルと操作」で作るゲームを題材に、Jev
              をゲームループの中で使う形を先に眺めます。
              毎フレーム（または数フレームに 1 回）、機体の状態を state
              にして「次に取る操作」と「今すぐ帰還すべきか」を聞き、
              安全に飛ばして基地へ戻す、という流れです。
            </p>
            <div className="rounded-xl border border-border bg-card p-6 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">
                各ティックで Jev に渡すもの / 受け取るもの
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    state（ゲーム側が持っている値の要約）
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 font-mono">
                    <li>obstacleAhead: 前方の障害物までの距離</li>
                    <li>weather: 晴れ / 強風 / 雷雨（天候は時間で変わる）</li>
                    <li>fuel: 残燃料の割合</li>
                    <li>distanceHome: 基地までの距離</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    questions
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 font-mono">
                    <li>action: choice（hold / climb / descend / turn）</li>
                    <li>returnNow: noul（今すぐ帰還すべきか）</li>
                    <li>risk: score（0 安全 〜 2 危険）</li>
                  </ul>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mt-6 mb-3">
              本物の呼び出し（Route Handler）
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              これは Jev
              のアプリです。ゲーム側は毎ティックの状態をこのエンドポイントに送り、返ってきた型付きの答えで操作を決めます。
              STEP 18〜20 と同じ jev-apps プロジェクトに置けます。
            </p>
            <CodeBlock
              language="ts"
              title="app/api/flight/route.ts"
              code={`import { choice, noul, score, TypeSafeClient, APIConnectionError } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

export interface FlightState {
  obstacleAhead: number;                 // 前方の障害物までの距離（m）
  weather: "clear" | "wind" | "storm";   // 天候（時間で変わる）
  fuel: number;                          // 残燃料 0〜1
  distanceHome: number;                  // 基地までの距離（m）
}

export async function POST(req: Request) {
  const state = (await req.json()) as FlightState;
  try {
    const { answers } = await client.systemOne(
      {
        state,
        questions: {
          action: choice("Which maneuver keeps the aircraft safe right now?", {
            hold: "Keep current heading and altitude",
            climb: "Gain altitude to clear an obstacle or turbulence",
            descend: "Lose altitude to get under weather or save fuel",
            turn: "Change heading to avoid an obstacle ahead",
          }),
          returnNow: noul("Should the aircraft turn back to base immediately?", {
            true: "Fuel or weather makes continuing unsafe",
            false: "It is safe to continue the mission",
          }),
          risk: score("How dangerous is the current situation?", [
            "Safe",
            "Caution",
            "Danger",
          ]),
        },
      },
      { timeout: 2000 }, // ゲームループなので短く。間に合わなければ前回の判断を維持する
    );
    return Response.json({
      action: answers.action.choice,
      actionConfidence: answers.action.confidence,
      returnNow: answers.returnNow.noul,
      risk: answers.risk.score,
    });
  } catch (err) {
    if (err instanceof APIConnectionError) {
      return Response.json({ error: "unavailable" }, { status: 503 });
    }
    throw err;
  }
}`}
            />
            <CodeBlock
              language="tsx"
              title="ゲーム側（React Three Fiber の useFrame から、数フレームに 1 回だけ呼ぶ）"
              code={`const RETURN_AT = 0.5;
const CALL_EVERY_FRAMES = 30; // 毎フレーム呼ばない。料金とレイテンシのため

function Autopilot({ getState, onCommand }: { getState: () => FlightState; onCommand: (c: string) => void }) {
  const frame = useRef(0);
  const inFlight = useRef(false);
  useFrame(() => {
    frame.current += 1;
    if (frame.current % CALL_EVERY_FRAMES !== 0 || inFlight.current) return;
    inFlight.current = true;
    fetch("/api/flight", { method: "POST", body: JSON.stringify(getState()) })
      .then((r) => (r.ok ? r.json() : null))
      .then((a) => {
        if (!a) return; // 判断が得られなかった: 前回のコマンドを維持
        onCommand(a.returnNow >= RETURN_AT ? "return_home" : a.action);
      })
      .finally(() => { inFlight.current = false; });
  });
  return null;
}`}
            />
            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              ブラウザ内シミュレーション
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              下はその流れのシミュレーションです。教材のプレビューは API
              を呼べないので、Jev の代わりに状態から同じ形の答えを返す関数
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                fakeJev()
              </code>{" "}
              を置いています。本物に差し替えるときは、この関数を Route Handler
              経由の呼び出しに変えるだけです。 ___
              を埋めると、帰還判断が効いてループが「帰還」で止まります。
            </p>
            <CodingChallenge
              title="シミュレーション: 安全に飛ばして帰還させる"
              description="pilot() の ___ を埋めて、returnNow の確率が RETURN_AT 以上のときに 'return_home' を返すようにしてください。プレビューには各ティックの状態と判断が表示されます。"
              preview={true}
              initialCode={`// 天候と障害物が変わっていく 6 ティック分の状態（ゲーム側から来る想定）
const ticks = [
  { t: 1, obstacleAhead: 900, weather: "clear", fuel: 0.9, distanceHome: 400 },
  { t: 2, obstacleAhead: 300, weather: "clear", fuel: 0.8, distanceHome: 450 },
  { t: 3, obstacleAhead: 120, weather: "wind", fuel: 0.7, distanceHome: 500 },
  { t: 4, obstacleAhead: 800, weather: "storm", fuel: 0.6, distanceHome: 520 },
  { t: 5, obstacleAhead: 700, weather: "storm", fuel: 0.3, distanceHome: 540 },
  { t: 6, obstacleAhead: 600, weather: "wind", fuel: 0.2, distanceHome: 560 },
];

const RETURN_AT = 0.5;

// Jev の代わり。本物は Route Handler 経由で client.systemOne() を呼ぶ
function fakeJev(s) {
  const danger = (s.obstacleAhead < 200 ? 0.5 : 0) + (s.weather === "storm" ? 0.4 : s.weather === "wind" ? 0.15 : 0);
  const action = s.obstacleAhead < 200 ? "climb" : s.weather === "storm" ? "descend" : "hold";
  const returnP = Math.min(1, (s.fuel < 0.35 ? 0.6 : 0) + (s.weather === "storm" ? 0.3 : 0));
  return {
    action: { type: "choice", choice: action, confidence: 0.85, probabilities: {} },
    returnNow: { type: "noul", noul: returnP },
    risk: { type: "score", score: Math.min(2, danger * 2), confidence: 0.8 },
  };
}

function pilot(answers) {
  if (answers.returnNow.___ >= RETURN_AT) return "return_home";
  return answers.action.choice;
}

function App() {
  const rows = [];
  for (const s of ticks) {
    const a = fakeJev(s);
    const cmd = pilot(a);
    rows.push({ ...s, cmd, risk: a.risk.score, returnP: a.returnNow.noul });
    if (cmd === "return_home") break;
  }
  const last = rows[rows.length - 1];
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr><th>tick</th><th>障害物</th><th>天候</th><th>燃料</th><th>危険度</th><th>帰還確率</th><th>操作</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.t}>
              <td style={{ padding: 4 }}>{r.t}</td>
              <td style={{ padding: 4 }}>{r.obstacleAhead}m</td>
              <td style={{ padding: 4 }}>{r.weather}</td>
              <td style={{ padding: 4 }}>{Math.round(r.fuel * 100)}%</td>
              <td style={{ padding: 4 }}>{r.risk.toFixed(1)}</td>
              <td style={{ padding: 4 }}>{Math.round(r.returnP * 100)}%</td>
              <td style={{ padding: 4, fontWeight: 600 }}>{r.cmd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{last.cmd === "return_home" ? "帰還を開始しました" : "まだ飛行中です（帰還判断が効いていません）"}</p>
    </div>
  );
}`}
              answer={`// 天候と障害物が変わっていく 6 ティック分の状態（ゲーム側から来る想定）
const ticks = [
  { t: 1, obstacleAhead: 900, weather: "clear", fuel: 0.9, distanceHome: 400 },
  { t: 2, obstacleAhead: 300, weather: "clear", fuel: 0.8, distanceHome: 450 },
  { t: 3, obstacleAhead: 120, weather: "wind", fuel: 0.7, distanceHome: 500 },
  { t: 4, obstacleAhead: 800, weather: "storm", fuel: 0.6, distanceHome: 520 },
  { t: 5, obstacleAhead: 700, weather: "storm", fuel: 0.3, distanceHome: 540 },
  { t: 6, obstacleAhead: 600, weather: "wind", fuel: 0.2, distanceHome: 560 },
];

const RETURN_AT = 0.5;

// Jev の代わり。本物は Route Handler 経由で client.systemOne() を呼ぶ
function fakeJev(s) {
  const danger = (s.obstacleAhead < 200 ? 0.5 : 0) + (s.weather === "storm" ? 0.4 : s.weather === "wind" ? 0.15 : 0);
  const action = s.obstacleAhead < 200 ? "climb" : s.weather === "storm" ? "descend" : "hold";
  const returnP = Math.min(1, (s.fuel < 0.35 ? 0.6 : 0) + (s.weather === "storm" ? 0.3 : 0));
  return {
    action: { type: "choice", choice: action, confidence: 0.85, probabilities: {} },
    returnNow: { type: "noul", noul: returnP },
    risk: { type: "score", score: Math.min(2, danger * 2), confidence: 0.8 },
  };
}

function pilot(answers) {
  if (answers.returnNow.noul >= RETURN_AT) return "return_home";
  return answers.action.choice;
}

function App() {
  const rows = [];
  for (const s of ticks) {
    const a = fakeJev(s);
    const cmd = pilot(a);
    rows.push({ ...s, cmd, risk: a.risk.score, returnP: a.returnNow.noul });
    if (cmd === "return_home") break;
  }
  const last = rows[rows.length - 1];
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr><th>tick</th><th>障害物</th><th>天候</th><th>燃料</th><th>危険度</th><th>帰還確率</th><th>操作</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.t}>
              <td style={{ padding: 4 }}>{r.t}</td>
              <td style={{ padding: 4 }}>{r.obstacleAhead}m</td>
              <td style={{ padding: 4 }}>{r.weather}</td>
              <td style={{ padding: 4 }}>{Math.round(r.fuel * 100)}%</td>
              <td style={{ padding: 4 }}>{r.risk.toFixed(1)}</td>
              <td style={{ padding: 4 }}>{Math.round(r.returnP * 100)}%</td>
              <td style={{ padding: 4, fontWeight: 600 }}>{r.cmd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{last.cmd === "return_home" ? "帰還を開始しました" : "まだ飛行中です（帰還判断が効いていません）"}</p>
    </div>
  );
}`}
              hints={["noul の答えは returnNow.noul に 0〜1 で入ります"]}
              keywords={["returnNow.noul"]}
            />
            <InfoBox type="info" title="本物で動かすときの注意">
              ゲームループは 1
              秒に何十回も回るので、毎フレーム呼ぶとリクエスト数と料金が伸びます。数フレームに
              1 回、または状態が大きく変わったときだけ呼び、
              間はゲーム側のルール（前回の判断を維持する）で埋めます。呼び出しは
              STEP 14 のとおりサーバー経由にし、ブラウザからキーを使いません。
              帰還判断のしきい値（RETURN_AT）は STEP 21
              の手順で、記録したプレイログから決めます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="「レビュー投稿に『配送』『品質』『価格』のタグを付ける（複数当てはまり得る）」に向く質問の組み方は？"
              options={[
                { label: "choice でタグを 1 つ選ばせる" },
                {
                  label: "タグごとに noul を置き、しきい値以上のものを採用する",
                  correct: true,
                },
                { label: "score で 3 段階に採点する" },
                { label: "LLM に自由記述で書かせる" },
              ]}
              explanation="choice は 1 つしか選べません。同時に当てはまり得るタグは、タグごとの noul にして確率で採否を決めます（STEP 16 の内容）。"
            />
          </section>

          <section>
            <PageSources path="/ai-ml/jev/jev-app-ideas" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
