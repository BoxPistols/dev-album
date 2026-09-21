import { Plane, Gauge, ShieldAlert } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodePreview from "@/components/CodePreview";
import CodingChallenge from "@/components/CodingChallenge";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import PageSources from "@/components/PageSources";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";

/**
 * サンプルアプリ5: フライトの自動操縦
 * STEP 22: Jevセクション
 * - 制御ループの中で判断を使う。判断の周期と描画の周期を分ける
 * - 判断だけでは衝突し、コード側の即時回避を足すと到達することを実測で示す
 * - 数値と経路は2026-09-20にjev-1.13.0を実際に呼んで得たもの
 */

export default function JevFlightApp() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 22</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          サンプルアプリ5: フライトの自動操縦
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          地形を避けて目標へ向かう機体を、Jevの判断で操縦します。ここまでの4本と違い、判断が1回で終わりません。飛んでいる間ずっと繰り返されます。判断の周期と描画の周期をどう分けるか、そして安全に関わる分岐をどちらが持つかが主題です。
        </p>

        <WhyNowBox tags={["制御ループ", "choice", "noul", "Three.js", "実測値つき"]}>
          <p>
            操縦は、状況を見て次の操作を選ぶことの繰り返しです。1回あたりの判断は人でも数秒で決められますが、飛んでいる間は何度も繰り返されます。判断が速くて安ければ、この繰り返しの中に置けます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Plane className="text-primary" size={28} />
              1. 飛ばしてみる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              実際にJevで操縦した記録を再生します。赤は判断だけで飛んだ機体、青はコード側の即時回避を足した機体です。薄い面は高度の上限で、赤みがかった山はその上限より高く、越えられません。
            </p>
            <CodePreview
              title="実際の判断の記録を再生する（ブラウザからJevは呼ばない）"
              previewHeight={420}
              code={`// 実際にJevで操縦した記録を再生する（ブラウザからJevは呼ばない）。
// 赤は判断だけで飛んだ機体、青はコード側の即時回避を足した機体。
// 判断は2秒ごと、描画は毎フレーム。間はコードが補間する
const DECISIONS = {
  raw: [[0,200,0,0],[0,236,-120,0],[0,272,-240,0],[0,308,-360,0],[0,344,-480,0]],
  guard: [[0,200,0,0],[0,236,-120,0],[0,272,-240,0],[0,308,-360,0],[-50,308,-465,-48],
          [-139,320,-546,-48],[-184,320,-653,0],[-134,320,-759,48],[-40,320,-860,48]],
};
const MOUNTAINS = [
  { x: -40, z: -280, r: 90, h: 240 },
  { x: 60, z: -560, r: 120, h: 420 },
  { x: -120, z: -760, r: 90, h: 300 },
];
const CEILING = 320;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1020);
scene.fog = new THREE.Fog(0x0b1020, 400, 1600);

// プレビューの枠は縦に長くなることがある。高さを抑えて画角を保つ
const W = window.innerWidth;
const H = Math.max(240, Math.min(window.innerHeight, 400));

const camera = new THREE.PerspectiveCamera(50, W / H, 1, 4000);
camera.position.set(430, 400, 250);
camera.lookAt(-50, 150, -470);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(W, H);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
document.body.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xaec6ff, 0x222c4d, 1.6));
const sun = new THREE.DirectionalLight(0xffffff, 0.8);
sun.position.set(300, 600, 200);
scene.add(sun);

// 地面と、越えられる高さの目安になる面
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(2400, 2400),
  new THREE.MeshStandardMaterial({ color: 0x232e52 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(1400, 1400),
  new THREE.MeshBasicMaterial({ color: 0x7f8cff, transparent: true, opacity: 0.14, side: THREE.DoubleSide })
);
ceiling.rotation.x = -Math.PI / 2;
ceiling.position.set(0, CEILING, -450);
scene.add(ceiling);

// 地形。上限より高い山だけ色を変える
for (const m of MOUNTAINS) {
  const tall = m.h > CEILING;
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(m.r, m.h, 32),
    new THREE.MeshStandardMaterial({ color: tall ? 0x8f5566 : 0x46598a })
  );
  cone.position.set(m.x, m.h / 2, m.z);
  scene.add(cone);
}

// 目標
const target = new THREE.Mesh(
  new THREE.TorusGeometry(46, 7, 8, 32),
  new THREE.MeshStandardMaterial({ color: 0x5ce0a0 })
);
target.position.set(0, 120, -900);
scene.add(target);

function makePlane(color) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.ConeGeometry(13, 52, 8), new THREE.MeshStandardMaterial({ color }));
  body.rotation.x = Math.PI / 2;
  const wing = new THREE.Mesh(new THREE.BoxGeometry(72, 3, 15), new THREE.MeshStandardMaterial({ color }));
  g.add(body, wing);
  scene.add(g);
  return g;
}

function makeTrail(color) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(3000), 3));
  geo.setDrawRange(0, 0);
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color }));
  scene.add(line);
  return line;
}

const RED = 0xff6b81, BLUE = 0x6bb6ff;
const planes = { raw: makePlane(RED), guard: makePlane(BLUE) };
const trails = { raw: makeTrail(RED), guard: makeTrail(BLUE) };
const counts = { raw: 0, guard: 0 };

// 2秒ごとの判断の間を、描画の側で補間する
function sample(list, t) {
  const i = Math.min(list.length - 2, Math.floor(t));
  const f = Math.min(1, Math.max(0, t - i));
  const a = list[i], b = list[i + 1];
  return { x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, z: a[2] + (b[2] - a[2]) * f,
           h: a[3] + (b[3] - a[3]) * f };
}

const CRASH_AT = DECISIONS.raw.length - 1.35; // 高さ420mの山に触れるところ
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.006;
  const loop = DECISIONS.guard.length - 1;
  if (t > loop) { t = 0; counts.raw = 0; counts.guard = 0; trails.raw.geometry.setDrawRange(0, 0); trails.guard.geometry.setDrawRange(0, 0); }
  for (const key of ["raw", "guard"]) {
    const list = DECISIONS[key];
    const stopped = key === "raw" && t > CRASH_AT;
    const p = sample(list, stopped ? CRASH_AT : Math.min(t, list.length - 1));
    const g = planes[key];
    g.position.set(p.x, p.y, p.z);
    g.rotation.y = (-p.h * Math.PI) / 180;
    g.visible = !(stopped && Math.floor(t * 4) % 2 === 0); // 衝突後は点滅させる
    if (!stopped) {
      const pos = trails[key].geometry.attributes.position;
      const n = counts[key];
      if (n < 1000) {
        pos.array[n * 3] = p.x; pos.array[n * 3 + 1] = p.y; pos.array[n * 3 + 2] = p.z;
        counts[key] = n + 1;
        pos.needsUpdate = true;
        trails[key].geometry.setDrawRange(0, counts[key]);
      }
    }
  }
  target.rotation.z += 0.01;
  renderer.render(scene, camera);
}
animate();`}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              赤の機体は、高さ420mの山に向かって上昇を選び続け、高度の上限320mで頭打ちになって衝突しました。青の機体は、同じ場面でコードが旋回に切り替えています。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Gauge className="text-primary" size={28} />
              2. 判断の周期と描画の周期を分ける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Jevの応答は0.3〜1.0秒です。毎フレーム呼ぶことはできません。判断は2秒ごとに行い、その間はコードが決めた操作を毎フレーム適用します。描画は滑らかなまま、判断だけが間隔を空けて入ります。
            </p>
            <CodeBlock
              language="ts"
              title="制御ループの骨格"
              code={`const DECISION_EVERY = 2.0; // 秒。判断を求める間隔
const TICK = 0.1;           // 秒。物理の刻み

while (!crashed && !reached) {
  // 状況をコードが作る。距離も方位差も計算で出す
  const state = {
    高度: Math.round(plane.y),
    高度の上限: CEILING,
    目標までの距離: distanceTo(TARGET),
    目標の方位差: bearingDiff(plane, TARGET),
    前方の地形: ahead(plane) ?? "無し",
    速度: SPEED,
  };

  const decision = await decide(state); // 0.3〜1.0秒

  // 決めた操作を次の2秒間、毎フレーム適用する
  for (let t = 0; t < DECISION_EVERY; t += TICK) {
    apply(plane, decision.maneuver, TICK);
    step(plane, TICK);
  }
}`}
            />
            <InfoBox type="info" title="仕様では操作を選び、実測では0.3〜1.0秒かかる">
              手元の測定では、7回の判断の平均が400ms、最長が738msでした。2秒ごとの判断なら、応答を待つ間も機体は前の操作で飛び続けます。間隔を詰めるほど反応は良くなりますが、応答時間より短くはできません。
            </InfoBox>
            <CodeBlock
              language="ts"
              title="質問は2つ。次の操作と、危険が迫っているか"
              code={`const QUESTIONS = {
  maneuver: {
    type: "choice",
    instructions: "次の2秒で機体に与える操作",
    criteria: {
      climb: "上昇する。高度の上限までしか上がれない",
      descend: "降下する",
      turn_left: "左へ旋回して迂回する",
      turn_right: "右へ旋回して迂回する",
      hold: "現在の高度と進路を保つ",
    },
  },
  danger: {
    type: "noul",
    instructions: "このままの高度と進路では、前方の地形に衝突する",
  },
} as const;`}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <ShieldAlert className="text-primary" size={28} />
              3. 安全に関わる分岐はコードが持つ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              判断だけで飛ばした結果です。4回目の判断で、高さ420mの山（高度の上限320mでは越えられない）に対して上昇を選び、そのまま衝突しました。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  判断だけで飛ばした記録（2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="text-left p-3 border-b border-border">経過</th>
                    <th scope="col" className="text-left p-3 border-b border-border">高度</th>
                    <th scope="col" className="text-left p-3 border-b border-border">前方の地形</th>
                    <th scope="col" className="text-left p-3 border-b border-border">選んだ操作</th>
                    <th scope="col" className="text-left p-3 border-b border-border">危険の判定</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">0秒</td>
                    <td className="p-3 border-b border-border">200m</td>
                    <td className="p-3 border-b border-border">283m先・高さ240m</td>
                    <td className="p-3 border-b border-border">上昇</td>
                    <td className="p-3 border-b border-border">0.78</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">2秒</td>
                    <td className="p-3 border-b border-border">236m</td>
                    <td className="p-3 border-b border-border">165m先・高さ240m</td>
                    <td className="p-3 border-b border-border">上昇</td>
                    <td className="p-3 border-b border-border">0.84</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">4秒</td>
                    <td className="p-3 border-b border-border">272m</td>
                    <td className="p-3 border-b border-border">57m先・高さ240m</td>
                    <td className="p-3 border-b border-border">上昇</td>
                    <td className="p-3 border-b border-border">0.58</td>
                  </tr>
                  <tr>
                    <td className="p-3">6秒</td>
                    <td className="p-3">308m</td>
                    <td className="p-3">209m先・<strong className="text-foreground">高さ420m</strong></td>
                    <td className="p-3">上昇</td>
                    <td className="p-3">0.78</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              注目すべきは、危険の判定が0.78と高く出ていることです。「衝突する」という判定は当たっていて、選んだ操作だけが噛み合っていません。判定を読んで動きを決めるのは、コードの仕事として残っています。
            </p>
            <CodeBlock
              language="ts"
              title="越えられない地形が近いときは、判断を待たずに旋回する"
              code={`let applied = decision.maneuver;

// 高度の上限より高い地形が近くにあるのに、上昇か維持を選んだら、
// コードが旋回に差し替える。どちらへ曲がるかは地形の位置で決まる
if (
  obstacle &&
  obstacle.height > CEILING &&
  obstacle.distance < 260 &&
  (applied === "climb" || applied === "hold")
) {
  applied = obstacle.bearing >= 0 ? "turn_left" : "turn_right";
}`}
            />
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm border border-border">
                <caption className="text-left text-muted-foreground mb-2">
                  同じ地形での結果（2026-09-20、jev-1.13.0で実測）
                </caption>
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="text-left p-3 border-b border-border">設計</th>
                    <th scope="col" className="text-left p-3 border-b border-border">結果</th>
                    <th scope="col" className="text-left p-3 border-b border-border">判断の回数</th>
                    <th scope="col" className="text-left p-3 border-b border-border">コードが差し替えた回数</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="p-3 border-b border-border">判断だけ</td>
                    <td className="p-3 border-b border-border">衝突</td>
                    <td className="p-3 border-b border-border">4</td>
                    <td className="p-3 border-b border-border">0</td>
                  </tr>
                  <tr>
                    <td className="p-3">コード側の即時回避あり</td>
                    <td className="p-3">目標に到達</td>
                    <td className="p-3">8</td>
                    <td className="p-3">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              差し替えは8回のうち1回だけです。残りの7回は判断のとおりに飛んでいます。全部をコードで書くのではなく、取り返しがつかない場面だけをコードが持つ形になります。
            </p>
            <InfoBox type="warning" title="確信が低いまま飛び続ける">
              操作のconfidenceは0.08〜0.43で、終始低いままでした。選択肢のうち複数が同じくらいの確率だったということです。確信が低いときに止まれない仕事では、既定の動作をコードが持っておく必要があります。この例では、迷いが続いても機体は飛び続けます。
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              4. 回避の条件を書く
            </h2>
            <CodingChallenge
              title="シミュレーション: 越えられない地形を避ける（Jevは呼ばない）"
              description="guard関数の ___ を埋めて、高度の上限より高い地形が近いときに旋回へ差し替えてください。埋めるまではどの行も「判断のとおり」になります。"
              preview={true}
              initialCode={`// 実際の記録（シミュレーション用。値は実測）
const CEILING = 320;
const log = [
  { t: 0, maneuver: "climb", obstacle: { distance: 283, height: 240, bearing: -8 } },
  { t: 2, maneuver: "climb", obstacle: { distance: 165, height: 240, bearing: -14 } },
  { t: 4, maneuver: "climb", obstacle: { distance: 57, height: 240, bearing: -45 } },
  { t: 6, maneuver: "climb", obstacle: { distance: 209, height: 420, bearing: 17 } },
];

const LIMITS = { ceiling: CEILING, near: 260 };

function guard(maneuver, obstacle) {
  if (
    obstacle &&
    obstacle.height > LIMITS.___ &&
    obstacle.distance < LIMITS.near &&
    (maneuver === "climb" || maneuver === "hold")
  ) {
    return obstacle.bearing >= 0 ? "turn_left" : "turn_right";
  }
  return maneuver;
}

function App() {
  return (
    <ul style={{ fontFamily: "sans-serif", fontSize: 14, paddingLeft: 18 }}>
      {log.map((r) => {
        const applied = guard(r.maneuver, r.obstacle);
        const changed = applied !== r.maneuver;
        return (
          <li key={r.t} style={{ marginBottom: 8 }}>
            {r.t}秒: 前方{r.obstacle.distance}m・高さ{r.obstacle.height}m
            <div style={{ color: changed ? "var(--text-danger)" : "var(--text-muted)" }}>
              {r.maneuver}{changed ? " → " + applied + "（コードが差し替え）" : "（判断のとおり）"}
            </div>
          </li>
        );
      })}
    </ul>
  );
}`}
              answer={`// 実際の記録（シミュレーション用。値は実測）
const CEILING = 320;
const log = [
  { t: 0, maneuver: "climb", obstacle: { distance: 283, height: 240, bearing: -8 } },
  { t: 2, maneuver: "climb", obstacle: { distance: 165, height: 240, bearing: -14 } },
  { t: 4, maneuver: "climb", obstacle: { distance: 57, height: 240, bearing: -45 } },
  { t: 6, maneuver: "climb", obstacle: { distance: 209, height: 420, bearing: 17 } },
];

const LIMITS = { ceiling: CEILING, near: 260 };

function guard(maneuver, obstacle) {
  if (
    obstacle &&
    obstacle.height > LIMITS.ceiling &&
    obstacle.distance < LIMITS.near &&
    (maneuver === "climb" || maneuver === "hold")
  ) {
    return obstacle.bearing >= 0 ? "turn_left" : "turn_right";
  }
  return maneuver;
}

function App() {
  return (
    <ul style={{ fontFamily: "sans-serif", fontSize: 14, paddingLeft: 18 }}>
      {log.map((r) => {
        const applied = guard(r.maneuver, r.obstacle);
        const changed = applied !== r.maneuver;
        return (
          <li key={r.t} style={{ marginBottom: 8 }}>
            {r.t}秒: 前方{r.obstacle.distance}m・高さ{r.obstacle.height}m
            <div style={{ color: changed ? "var(--text-danger)" : "var(--text-muted)" }}>
              {r.maneuver}{changed ? " → " + applied + "（コードが差し替え）" : "（判断のとおり）"}
            </div>
          </li>
        );
      })}
    </ul>
  );
}`}
              hints={[
                "比べるのは高度の上限です。LIMITSのどのキーに入っているかを見ます。",
              ]}
              keywords={["LIMITS.ceiling"]}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">確認クイズ</h2>
            <Quiz
              question="自動操縦で、危険の判定が0.78と高いのに、選ばれた操作は「上昇」のままで衝突しました。最初に直すのはどこですか？"
              options={[
                { label: "確信度のしきい値を上げて、低い判断を捨てる" },
                {
                  label: "越えられない地形が近いときは、判断を待たずにコードが旋回へ差し替える",
                  correct: true,
                },
                { label: "判断の間隔を0.5秒に縮める" },
                { label: "選択肢からclimbを外す" },
              ]}
              explanation="取り返しがつかない場面の分岐は、判断の結果を待つ側ではなくコードが持ちます。実測では、差し替えを1回入れるだけで目標に到達しました。判断の間隔を縮めても応答時間より短くはできず、climbを外すと越えられる地形も迂回することになります。"
            />
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "TypeSafe AI Docs — Confidence",
                  url: "https://docs.typesafe.ai/confidence",
                  description: "確信が低いときに何に任せるかの考え方。",
                },
                {
                  title: "TypeSafe AI Docs — Intent routing",
                  url: "https://docs.typesafe.ai/patterns/intent-routing",
                  description: "判断の結果で処理の行き先を分ける組み立て方。",
                },
                {
                  title: "Three.jsドキュメント",
                  url: "https://threejs.org/docs/",
                  description: "このページの再生に使っている描画ライブラリ。",
                },
              ]}
            />
            <PageSources path="/ai-ml/jev/jev-flight-app" />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
