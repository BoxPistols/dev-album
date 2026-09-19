import { Lightbulb, Hammer, Plane } from "lucide-react";
import { Link } from "wouter";
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
    group: "サポート・問い合わせ",
    ideas: [
      {
        title: "サポートチケットのトリアージ",
        what: "担当チーム・緊急度・不満度を判定し、確信が低いものだけ人が振り分ける",
        types: ["choice", "noul", "score"],
        buildStep: 18,
        href: "/ai-ml/jev/jev-triage-app",
      },
      {
        title: "問い合わせフォームの担当自動振り分け",
        what: "送信内容から営業・技術・経理のどこに届けるかを決め、通知先を変える",
        types: ["choice"],
      },
      {
        title: "FAQ で解決できるかの一次判定",
        what: "LLM を呼ぶ前に「既存のヘルプ記事で答えられるか」を判定し、定型応答で済ませる",
        types: ["noul", "choice"],
      },
      {
        title: "チャットのエスカレーション判定",
        what: "会話の途中で「人が引き継ぐべきか」を毎ターン判定し、しきい値を超えたらオペレーターへ",
        types: ["noul", "score"],
      },
    ],
  },
  {
    group: "コミュニティ・コンテンツ",
    ideas: [
      {
        title: "投稿のモデレーション",
        what: "ガイドライン違反の確率と深刻度で、自動公開・レビュー待ち・自動非表示に分ける",
        types: ["noul", "score", "choice"],
        buildStep: 19,
        href: "/ai-ml/jev/jev-moderation-app",
      },
      {
        title: "レビュー投稿の感情とタグ付け",
        what: "感情のカテゴリと「配送」「品質」「価格」などのタグを同時に付け、集計に使う",
        types: ["choice", "noul"],
      },
      {
        title: "商品説明の禁止表現チェック",
        what: "誇大表現や法令で制限される表現を含むかを判定し、公開前に差し戻す",
        types: ["noul", "score"],
      },
      {
        title: "UI 文言のトーン一貫性チェック",
        what: "デザインシステムのライティング指針に対して、文言が敬体・簡潔さの基準を満たすかを採点する",
        types: ["score", "noul"],
      },
      {
        title: "代替テキストの妥当性採点",
        what: "画像の説明文が「装飾か」「内容を十分に伝えるか」を段階で採点し、a11y レビューの優先順位に使う",
        types: ["score", "noul"],
      },
    ],
  },
  {
    group: "運用・監視",
    ideas: [
      {
        title: "アラートの優先度付け",
        what: "複数のアラートを 1 リクエストで評価し、緊急度の期待値で並べたダッシュボードを作る",
        types: ["score", "choice"],
        buildStep: 20,
        href: "/ai-ml/jev/jev-alerts-app",
      },
      {
        title: "ログのノイズ判定",
        what: "大量のエラーログから「本当に対応が要るか」を判定し、通知を間引く",
        types: ["noul"],
      },
      {
        title: "SLO 違反の一次判定",
        what: "複数メトリクスの要約から、インシデント宣言が要る状況かどうかと深刻度を判定し、当番への呼び出しを絞る",
        types: ["score", "noul"],
      },
      {
        title: "変更内容のリスク段階付け",
        what: "デプロイ前の変更説明から、影響範囲の段階と「ロールバック手順の確認が要るか」を判定する",
        types: ["score", "noul"],
      },
    ],
  },
  {
    group: "開発・レビュー",
    ideas: [
      {
        title: "コードレビューコメントの重要度ラベル",
        what: "コメントを「必須」「提案」「質問」に分け、必須だけをマージ条件に反映する",
        types: ["choice"],
      },
      {
        title: "バグ報告の重複らしさと再現性",
        what: "新しい報告が既存の報告と同じ現象か、再現手順が揃っているかを判定して担当者の一次確認を減らす",
        types: ["noul", "score"],
      },
      {
        title: "ユーザーフィードバックの分類",
        what: "自由記述を機能要望・不具合・質問・感想に分け、確信が低いものだけ人が読む",
        types: ["choice"],
      },
      {
        title: "ドキュメントの陳腐化判定",
        what: "本文と最新のリリースノートを渡し、「記述が古くなっている疑い」を段階で採点する",
        types: ["score"],
      },
    ],
  },
  {
    group: "LLM との組み合わせ・その他",
    ideas: [
      {
        title: "LLM 回答の公開前チェック",
        what: "下書きが根拠資料と矛盾しないか、断るべき質問でないかを判定し、通過したものだけ送る",
        types: ["noul", "score"],
      },
      {
        title: "メール受信箱の自動仕分け",
        what: "件名と本文から、請求・契約・営業・個人のどれかと、今日返信すべきかを判定する",
        types: ["choice", "noul"],
      },
      {
        title: "フライトシミュレーターの自動操縦判断",
        what: "Three.js 講座で作る飛行機ゲームの各フレームの状態（障害物までの距離、天候の変化、燃料）を state にし、回避・高度変更・帰還のどれを取るかを選ぶ。応答が速く型が固定なので、ゲームループの中で呼べる",
        types: ["choice", "noul", "score"],
        href: "/threejs/game-dev/aircraft",
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
                  title: "チケットのトリアージ",
                  point:
                    "choice + noul + score を 1 リクエストで。Route Handler と React の基本形",
                  href: "/ai-ml/jev/jev-triage-app",
                },
                {
                  step: 19,
                  title: "投稿のモデレーション",
                  point:
                    "確率で「自動 / レビュー待ち / 非表示」の 3 分岐。失敗時に公開を止める設計",
                  href: "/ai-ml/jev/jev-moderation-app",
                },
                {
                  step: 20,
                  title: "アラートの優先度付け",
                  point:
                    "配列 state で複数件を一括評価し、score の期待値で並べる",
                  href: "/ai-ml/jev/jev-alerts-app",
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
            <p className="text-muted-foreground mb-4 leading-relaxed">
              下はその流れのモックアップです。教材のプレビューは API
              を呼べないので、Jev の代わりに状態から同じ形の答えを返す関数
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                fakeJev()
              </code>{" "}
              を置いています。本物に差し替えるときは、この関数を Route Handler
              経由の呼び出しに変えるだけです。 ___
              を埋めると、帰還判断が効いてループが「帰還」で止まります。
            </p>
            <CodingChallenge
              title="モックアップ: 安全に飛ばして帰還させる"
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
            <InfoBox type="info" title="本物にするときの注意">
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
