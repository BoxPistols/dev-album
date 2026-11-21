import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";
const h2 = "text-3xl font-bold text-foreground mb-6";
const para = "text-muted-foreground mb-4 leading-relaxed";

// このページの完成形。引力源へ向かう力だけで、多数の粒子が軌道を描く
const HERO_SKETCH = `let movers = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(245, 60, 5);

  for (let i = 0; i < 260; i++) {
    // 中心からの角度と距離をばらつかせて置く
    let angle = random(TWO_PI);
    let r = random(36, 190);
    let pos = createVector(300 + r * cos(angle), 200 + r * sin(angle));

    // 中心へ向かう向きと直角に初速を与えると、落ちずに回り続ける
    let vel = createVector(-sin(angle), cos(angle));
    vel.mult(sqrt(500 / r) * random(0.8, 1.08));

    movers.push({ pos: pos, vel: vel, hue: map(r, 36, 190, 185, 335) });
  }
}

function draw() {
  // 薄く塗り重ねて、通った跡を残す
  blendMode(BLEND);
  background(245, 60, 5, 5);

  // 引力源はキャンバスの中央。マウスが枠の中にあればマウスの位置
  let center = createVector(width / 2, height / 2);
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    center.set(mouseX, mouseY);
  }

  blendMode(ADD);
  strokeWeight(1.6);
  for (let m of movers) {
    // 粒子から引力源へ向かうベクトル
    let force = p5.Vector.sub(center, m.pos);
    // 近いほど強く引く。近すぎるときに力が大きくなりすぎないよう距離を制限する
    let d = constrain(force.mag(), 25, 400);
    force.setMag(500 / (d * d));

    let px = m.pos.x;
    let py = m.pos.y;
    // 力を速度に足し、速度を位置に足す
    m.vel.add(force);
    m.pos.add(m.vel);

    stroke(m.hue, 65, 80, 80);
    line(px, py, m.pos.x, m.pos.y);
  }

  noStroke();
  fill(45, 30, 100);
  circle(center.x, center.y, 5);
}`;

const ARROW_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

function draw() {
  background(235, 35, 10);

  let start = createVector(width / 2, height / 2);
  // 目標はマウス。枠の外にあるあいだは自動で動く
  let target = createVector(
    width / 2 + cos(frameCount * 0.017) * 220,
    height / 2 + sin(frameCount * 0.023) * 130
  );
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    target.set(mouseX, mouseY);
  }

  // 引き算: startからtargetへ向かうベクトル
  let v = p5.Vector.sub(target, start);
  drawArrow(start, v, 190);

  // 向きはそのままで、長さだけを60にそろえたベクトル
  let unit = v.copy();
  unit.setMag(60);
  drawArrow(start, unit, 330);

  noStroke();
  fill(190, 70, 100);
  text('v.x = ' + round(v.x) + '   v.y = ' + round(v.y), 16, 28);
  text('v.mag() = ' + round(v.mag()), 16, 50);
  fill(330, 70, 100);
  text('setMag(60)', 16, 72);
}

function drawArrow(base, vec, hue) {
  push();
  stroke(hue, 70, 100);
  strokeWeight(3);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  // 矢じり。heading()はベクトルの向きを角度で返す
  translate(vec.x, vec.y);
  rotate(vec.heading());
  line(0, 0, -10, -5);
  line(0, 0, -10, 5);
  pop();
}`;

const MOVER_SKETCH = `let pos;
let vel;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
  pos = createVector(300, 200);
  vel = createVector(0, 0);
}

function draw() {
  background(235, 35, 10, 25);

  // 目標はマウス。枠の外にあるあいだは自動で動く
  let target = createVector(
    width / 2 + cos(frameCount * 0.013) * 200,
    height / 2 + sin(frameCount * 0.021) * 120
  );
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    target.set(mouseX, mouseY);
  }

  // 加速度: 目標の方向へ、大きさ0.25
  let acc = p5.Vector.sub(target, pos);
  acc.setMag(0.25);

  // 加速度を速度に足し、速度を位置に足す
  vel.add(acc);
  // 速さが6を超えないようにする
  vel.limit(6);
  pos.add(vel);

  noStroke();
  fill(0, 0, 60);
  circle(target.x, target.y, 6);
  // 速いほど色相が進む
  fill(map(vel.mag(), 0, 6, 190, 335), 70, 100);
  circle(pos.x, pos.y, 14);
}`;

const FORCES_SKETCH = `let balls = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < 9; i++) {
    let mass = random(1, 6);
    balls.push({
      pos: createVector(50 + i * 62, 60),
      vel: createVector(0, 0),
      acc: createVector(0, 0),
      mass: mass
    });
  }
}

// 力を質量で割って、加速度に足す
function applyForce(ball, force) {
  let a = p5.Vector.div(force, ball.mass);
  ball.acc.add(a);
}

function draw() {
  background(235, 35, 10);

  // 4秒ごとに、自動ではじき直す
  if (frameCount % 240 == 0) kick();

  // 風: 横向きの力。強さと向きがゆっくり変わる
  let wind = createVector(0.12 * sin(frameCount * 0.02), 0);

  noStroke();
  for (let b of balls) {
    // 重力: 質量に比例した下向きの力
    let gravity = createVector(0, 0.25 * b.mass);
    applyForce(b, gravity);
    applyForce(b, wind);

    b.vel.add(b.acc);
    // 摩擦を簡略化: 毎フレーム、速度を少し減らす
    b.vel.mult(0.995);
    b.pos.add(b.vel);
    // 加速度は毎フレーム0に戻す
    b.acc.mult(0);

    // 床と壁で跳ね返る
    let r = b.mass * 6;
    if (b.pos.y > height - r) {
      b.pos.y = height - r;
      b.vel.y *= -0.9;
    }
    if (b.pos.x < r) {
      b.pos.x = r;
      b.vel.x *= -0.9;
    }
    if (b.pos.x > width - r) {
      b.pos.x = width - r;
      b.vel.x *= -0.9;
    }

    fill(map(b.mass, 1, 6, 190, 335), 65, 100, 80);
    circle(b.pos.x, b.pos.y, r * 2);
  }
}

function kick() {
  // 全部の球を上へはじく
  for (let b of balls) {
    b.vel.y = random(-10, -6);
  }
}

function mousePressed() {
  // クリックではじく
  kick();
}`;

const ORBIT_SKETCH = `let planets = [];
let sun;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(245, 60, 5);
  sun = createVector(width / 2, height / 2);

  for (let i = 0; i < 6; i++) {
    planets.push({
      // 太陽の右に並べ、下向きの初速を与える
      pos: createVector(350 + i * 22, 200),
      vel: createVector(0, 2.9 - i * 0.29),
      hue: 185 + i * 28
    });
  }
}

function draw() {
  background(245, 60, 5, 4);

  noStroke();
  fill(45, 60, 100);
  circle(sun.x, sun.y, 20);

  for (let p of planets) {
    // 太陽へ向かう力。強さは距離の2乗に反比例する
    let force = p5.Vector.sub(sun, p.pos);
    let d = constrain(force.mag(), 20, 400);
    force.setMag(400 / (d * d));

    p.vel.add(force);
    p.pos.add(p.vel);

    fill(p.hue, 70, 100);
    circle(p.pos.x, p.pos.y, 5);
  }
}`;

function Row({ name, desc }: { name: string; desc: string }) {
  return (
    <tr className="border-t border-border">
      <th scope="row" className="text-left p-3 font-mono font-normal">
        {name}
      </th>
      <td className="p-3">{desc}</td>
    </tr>
  );
}

export default function VectorsForces() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 9</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          ベクトルと力
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ベクトルは、xとyの2つの数を1組にして「向きと大きさ」として扱うものです。位置・速度・加速度をベクトルで持つと、
          重力や引力のような力を足し算だけで表せます。
          下の作品は、粒子ごとに「引力源へ向かう力を速度に足し、速度を位置に足す」をくり返しているだけです。枠の中にマウスを入れると、引力源がマウスに移ります。
        </p>

        <CodePreview
          title="引力源をめぐる粒子（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          <code className={code}>random(0.8, 1.08)</code>を
          <code className={code}>random(0.4, 0.6)</code>
          にすると初速が足りなくなり、細長い軌道で中心をかすめる粒子が増えます。
        </p>

        <WhyNowBox
          title="なぜここでベクトルを扱うのか"
          tags={["createVector()", "p5.Vector", "速度と加速度", "力"]}
        >
          <p>
            これまでは位置をxとy、速さをvxとvyのように別々の変数で持ってきました。物が増え、力が増えると変数の数が倍々に増えます。
            ベクトルにまとめると「位置に速度を足す」が1行で書け、力をいくつ重ねても同じ形のコードのままです。
            このあとのパーティクル、群れ、落下や建物の揺れのシミュレーションは、すべてこの書き方の上に組み立てます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>ベクトルは向きと大きさを持つ矢印</h2>
            <p className={para}>
              <code className={code}>createVector(3, 4)</code>
              は、xが3、yが4のベクトルを作ります。「右へ3、下へ4進む矢印」と考えると、動きを扱いやすくなります。
              2つの位置を引き算すると、一方からもう一方へ向かう矢印が得られます。下のスケッチの水色の矢印は、
              中央から目標へ向かうベクトルです。ピンクの矢印は、同じ向きのまま長さだけを60にしたものです。
            </p>
            <CodePreview
              title="引き算で矢印を作る"
              language="js"
              code={ARROW_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      書き方
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      すること
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <Row name="a.add(b)" desc="aにbを足す（aが書き換わる）" />
                  <Row name="a.sub(b)" desc="aからbを引く（aが書き換わる）" />
                  <Row
                    name="p5.Vector.sub(a, b)"
                    desc="a - bを新しいベクトルとして返す（aもbも変わらない）"
                  />
                  <Row
                    name="a.mult(2)"
                    desc="長さを2倍にする。向きは変わらない"
                  />
                  <Row name="a.mag()" desc="長さ（大きさ）を数で返す" />
                  <Row
                    name="a.normalize()"
                    desc="向きはそのままで、長さを1にする"
                  />
                  <Row
                    name="a.setMag(5)"
                    desc="向きはそのままで、長さを5にする"
                  />
                  <Row
                    name="a.limit(5)"
                    desc="長さが5を超えていたら5に縮める。5以下ならそのまま"
                  />
                </tbody>
              </table>
            </div>
            <InfoBox
              type="warning"
              title="書き換わる書き方と、新しく作る書き方"
            >
              <p>
                <code className={code}>a.sub(b)</code>
                はa自身を書き換えます。位置どうしの差を求めたいときにこれを使うと、位置そのものが変わってしまいます。
                もとのベクトルを残したいときは、
                <code className={code}>p5.Vector.sub(a, b)</code>
                のように、p5.Vectorから呼ぶ書き方（新しいベクトルを返す）か、
                <code className={code}>a.copy()</code>
                で写しを作ってから使います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>位置・速度・加速度</h2>
            <p className={para}>
              動く物は3つのベクトルで表します。位置は「いまどこにいるか」、速度は「1フレームでどれだけ動くか」、
              加速度は「1フレームで速度がどれだけ変わるか」です。毎フレーム、加速度を速度に足し、速度を位置に足します。
              下のスケッチは、目標の方向へ一定の大きさの加速度をかけ続けています。目標を通り過ぎてから戻ってくる、勢いのある動きになります。
            </p>
            <CodePreview
              title="目標へ加速する"
              language="js"
              code={MOVER_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>acc.setMag(0.25)</code>
                  の0.25を1にする（すぐ向きを変えられるようになり、目標にまとわりつく）
                </li>
                <li>
                  <code className={code}>vel.limit(6)</code>
                  の6を2にする（ゆっくり追いかける）。この行を消す（速さに上限がなくなり、大きく行き過ぎる）
                </li>
                <li>
                  <code className={code}>vel.add(acc);</code>
                  を消す（速度が0のままなので動かない）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>力を加える</h2>
            <p className={para}>
              物理では、力と加速度の関係を運動の第2法則（力 = 質量 ×
              加速度）で表します。Daniel ShiffmanのThe Nature of
              Codeは、これを「acceleration is equal to the sum of all forces
              divided by
              mass」と言い換えています。コードでは、力を質量で割って加速度に足す関数を1つ用意し、
              かけたい力の数だけ呼びます。足し終えた加速度を速度に足したら、加速度は0に戻します。
            </p>
            <CodePreview
              title="重力・風・摩擦"
              language="js"
              code={FORCES_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      力
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      このスケッチでの表し方
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <Row
                    name="重力"
                    desc="下向きで、質量に比例する力。質量で割ると同じ加速度になるので、大きい球も小さい球も同じ速さで落ちる"
                  />
                  <Row
                    name="風"
                    desc="横向きで、質量によらない力。質量で割るので、軽い球ほど大きく流される"
                  />
                  <Row
                    name="摩擦"
                    desc="速度に0.995を掛けて少しずつ減らす。向きと大きさを計算する本来の式を簡略化したもの"
                  />
                </tbody>
              </table>
            </div>
            <InfoBox
              type="warning"
              title="スケッチの0.25は、地上の重力の値ではない"
            >
              <p>
                仕様（物理）では、力の大きさにはニュートン、加速度にはメートル毎秒毎秒といった単位があります。
                スケッチの中の0.25や0.12は「1フレームあたり何ピクセル」という単位で、見た目がちょうどよくなるように選んだ数です。
                理由は、画面の1ピクセルが何メートルか、1フレームが何秒かを決めていないためです。実際の単位と時間で計算する方法は、
                落下のシミュレーションのページで扱います。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>0.12 * sin(...)</code>
                  の0.12を0.6にする（風が強くなり、軽い球が左右に大きく流される）
                </li>
                <li>
                  <code className={code}>b.vel.mult(0.995)</code>
                  の0.995を0.95にする（水の中のように、すぐ勢いがなくなる）
                </li>
                <li>
                  <code className={code}>0.25 * b.mass</code>を
                  <code className={code}>-0.05 * b.mass</code>
                  にする（上向きの力になり、風船のように浮く）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>引力と軌道</h2>
            <p className={para}>
              引力は「相手へ向かう向き」で「近いほど強い」力です。向きは位置の引き算で、強さは距離から決めます。
              万有引力の法則では、強さは距離の2乗に反比例します。下のスケッチはこの関係だけを取り入れたものです。
              まっすぐ下向きの初速を与えているだけですが、太陽へ引かれ続けることで軌道が曲がり、周回します。
            </p>
            <CodePreview
              title="引力で回る軌道"
              language="js"
              code={ORBIT_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>createVector(0, 2.9 - i * 0.29)</code>
                  の2.9を1.8にする（初速が足りず、細長いだ円で太陽の近くを通る）
                </li>
                <li>2.9を4にする（速すぎて、戻ってこない軌道が出る）</li>
                <li>
                  <code className={code}>400 / (d * d)</code>を
                  <code className={code}>8 / d</code>
                  にする（距離に反比例する力になり、軌道が花びらのようにずれていく）
                </li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title="距離を制限している理由">
              <p>
                式のうえでは、距離が0に近づくと力は限りなく大きくなります。スケッチは時間を1フレームずつ飛び飛びに進めるので、
                近づいた瞬間に大きな力がかかると、次のフレームで遠くへはじき飛ばされます。
                <code className={code}>constrain(force.mag(), 20, 400)</code>
                は、計算に使う距離に下限を設けてこれを避けています。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="速度と加速度をつなぐ"
              description="___ を埋めて、球が重力で落ち、床で跳ね返るようにしてください。毎フレーム、加速度を速度に足し、速度を位置に足します。"
              preview
              initialCode={`let pos;
let vel;
let acc;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  pos = createVector(200, 40);
  vel = createVector(2, 0);
  acc = createVector(0, 0.3);
}

function draw() {
  background(235, 35, 10);
  vel.add(___);
  pos.add(___);
  if (pos.y > 280) {
    pos.y = 280;
    vel.y *= -0.9;
  }
  if (pos.x < 20 || pos.x > 380) {
    vel.x *= -1;
  }
  noStroke();
  fill(320, 70, 100);
  circle(pos.x, pos.y, 40);
}`}
              answer={`let pos;
let vel;
let acc;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  pos = createVector(200, 40);
  vel = createVector(2, 0);
  acc = createVector(0, 0.3);
}

function draw() {
  background(235, 35, 10);
  vel.add(acc);
  pos.add(vel);
  if (pos.y > 280) {
    pos.y = 280;
    vel.y *= -0.9;
  }
  if (pos.x < 20 || pos.x > 380) {
    vel.x *= -1;
  }
  noStroke();
  fill(320, 70, 100);
  circle(pos.x, pos.y, 40);
}`}
              keywords={["acc", "vel"]}
              hints={[
                "速度に足すのは、速度の変化を表す加速度accです",
                "位置に足すのは、1フレームの移動を表す速度velです",
              ]}
            />
            <CodingChallenge
              title="マウスに引き寄せられる"
              description="___ を埋めて、球がマウスの方向へ大きさ0.3の力で引かれるようにしてください。"
              preview
              initialCode={`let pos;
let vel;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
  pos = createVector(200, 150);
  vel = createVector(0, 0);
}

function draw() {
  background(235, 35, 10, 10);
  let mouse = createVector(mouseX, mouseY);
  let force = p5.Vector.___(mouse, pos);
  force.___(0.3);
  vel.add(force);
  vel.limit(6);
  pos.add(vel);
  noStroke();
  fill(190, 70, 100);
  circle(pos.x, pos.y, 16);
}`}
              answer={`let pos;
let vel;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
  pos = createVector(200, 150);
  vel = createVector(0, 0);
}

function draw() {
  background(235, 35, 10, 10);
  let mouse = createVector(mouseX, mouseY);
  let force = p5.Vector.sub(mouse, pos);
  force.setMag(0.3);
  vel.add(force);
  vel.limit(6);
  pos.add(vel);
  noStroke();
  fill(190, 70, 100);
  circle(pos.x, pos.y, 16);
}`}
              keywords={["sub", "setMag"]}
              hints={[
                "球からマウスへ向かうベクトルは、マウスの位置から球の位置を引くsubで求めます",
                "向きを保ったまま長さを0.3にするには、setMagを使います",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              冒頭の作品は、力の式・初速・描き方のどれか1つを替えると別の絵になります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>background(245, 60, 5, 5)</code>
                の行を消す。軌跡が消えなくなり、時間をかけて線が積もった1枚の絵になる
              </li>
              <li>
                <code className={code}>force.setMag(500 / (d * d))</code>を
                <code className={code}>force.setMag(6 / d)</code>
                にする。軌道が少しずつ回転し、花びらのような模様になる
              </li>
              <li>
                <code className={code}>vel.mult(...)</code>の次の行に
                <code className={code}>if (i % 2 == 0) vel.mult(-1);</code>
                を足す。半数が逆回りになり、すれ違う流れができる
              </li>
              <li>
                引力源を2つにする。centerと同じ計算を、別の位置のベクトルに対してもう1回行い、両方の力をvelに足す。
                2つのあいだを行き来する粒子が現れる
              </li>
            </ul>
            <InfoBox type="success" title="力は足し算で重ねられる">
              <p>
                引力、風、摩擦、次のページ以降で扱うノイズの流れは、どれも「ベクトルを速度に足す」という同じ形です。
                1つの粒子にいくつ足しても、コードの形は変わりません。気になる力を1つずつ足して、動きがどう変わるかを見てください。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="毎フレームの更新の順番として、このページで使ったものは？"
              options={[
                { label: "位置を速度に足し、速度を加速度に足す" },
                {
                  label: "加速度を速度に足し、速度を位置に足す",
                  correct: true,
                },
                { label: "加速度を位置に足し、位置を速度に足す" },
                { label: "速度を加速度に足し、加速度を位置に足す" },
              ]}
              explanation="加速度は速度の変化、速度は位置の変化です。vel.add(acc)のあとにpos.add(vel)を行います。"
            />
            <Quiz
              question="posからtargetへ向かう、長さ0.5のベクトルを作るコードは？"
              options={[
                {
                  label: "let f = p5.Vector.sub(target, pos); f.setMag(0.5);",
                  correct: true,
                },
                { label: "let f = p5.Vector.sub(pos, target); f.limit(0.5);" },
                { label: "let f = pos.add(target); f.mult(0.5);" },
                { label: "let f = target.mag(); f.setMag(0.5);" },
              ]}
              explanation="「AからBへ向かうベクトル」はB - Aです。p5.Vector.sub(target, pos)で向きを求め、setMag(0.5)で長さを0.5にします。subの順番を逆にすると、目標から遠ざかる向きになります。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "ベクトルはxとyを1組にした、向きと大きさを持つ矢印。createVector()で作る",
                  "位置の引き算で「相手へ向かう矢印」が得られ、setMag()やlimit()で長さを整えられる",
                  "毎フレーム、加速度を速度に足し、速度を位置に足す",
                  "力は質量で割って加速度に足す。いくつでも足して重ねられる",
                  "距離に応じて強さを変えた「相手へ向かう力」が引力になり、初速と合わさって軌道ができる",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="text-primary font-bold mt-0.5"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "p5.js Reference: createVector()",
                  url: "https://p5js.org/reference/p5/createVector/",
                  description: "ベクトルを作る関数の仕様と、ベクトルの考え方",
                },
                {
                  title: "p5.js Reference: p5.Vector",
                  url: "https://p5js.org/reference/p5/p5.Vector/",
                  description:
                    "add・sub・mult・mag・setMag・limitなど、ベクトルの操作の一覧",
                },
                {
                  title: "The Nature of Code: Chapter 1 Vectors",
                  url: "https://natureofcode.com/vectors/",
                  description:
                    "Daniel Shiffmanによる、位置・速度・加速度をベクトルで扱う解説",
                },
                {
                  title: "The Nature of Code: Chapter 2 Forces",
                  url: "https://natureofcode.com/forces/",
                  description:
                    "力を加速度に足す書き方、重力・摩擦・引力の作り方。このページの力の扱いはこの章に沿っている",
                },
                {
                  title: "The Coding Train: The Nature of Code 2",
                  url: "https://thecodingtrain.com/tracks/the-nature-of-code-2",
                  description: "同じ内容を動画で追える、著者による講座",
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
