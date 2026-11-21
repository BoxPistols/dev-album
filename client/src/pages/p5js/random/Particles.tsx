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

// このページの完成形。3つの規則で動く群れ。マウスに集まり、押すと散る
const HERO_SKETCH = `let boids = [];

class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(2, 3.2));
    this.acc = createVector(0, 0);
    this.near = 0;
  }

  // 「こう動きたい」向きを、いまの速度との差（舵を切る力）に変える
  steer(desired, weight) {
    if (desired.mag() == 0) return;
    desired.setMag(3.2);
    desired.sub(this.vel);
    desired.limit(0.09);
    desired.mult(weight);
    this.acc.add(desired);
  }

  flock(others) {
    let apart = createVector(0, 0);
    let heading = createVector(0, 0);
    let center = createVector(0, 0);
    let count = 0;

    for (let other of others) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other == this || d > 40) continue;
      // 分離: 近すぎる仲間から離れる向きを集める
      if (d < 20) {
        let away = p5.Vector.sub(this.pos, other.pos);
        away.div(d + 0.1);
        apart.add(away);
      }
      // 整列: 仲間の速度を集める
      heading.add(other.vel);
      // 結合: 仲間の位置を集める
      center.add(other.pos);
      count += 1;
    }

    this.near = count;
    this.steer(apart, 1.8);
    if (count > 0) {
      this.steer(heading, 1.0);
      center.div(count);
      center.sub(this.pos);
      this.steer(center, 0.5);
    }

    // ノイズで決めた向きへ、少しだけ流す。群れが1つに固まりきらない
    let a = noise(this.pos.x * 0.004, this.pos.y * 0.004, frameCount * 0.004);
    this.steer(p5.Vector.fromAngle(a * TWO_PI * 2), 0.45);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(3.2);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // 端から出たら反対側へ
    if (this.pos.x < 0) this.pos.x += width;
    if (this.pos.x > width) this.pos.x -= width;
    if (this.pos.y < 0) this.pos.y += height;
    if (this.pos.y > height) this.pos.y -= height;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    // 近くの仲間が多いほど、色相を水色からピンクへ
    fill(map(this.near, 0, 12, 190, 335, true), 65, 100);
    triangle(7, 0, -5, -3.5, -5, 3.5);
    pop();
  }
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(238, 50, 8);
  for (let i = 0; i < 150; i++) {
    boids.push(new Boid());
  }
}

function draw() {
  background(238, 50, 8, 28);

  let inside = mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
  let mouse = createVector(mouseX, mouseY);

  for (let b of boids) {
    b.flock(boids);
    if (inside) {
      // マウスへ向かう。押しているあいだは逆向きに逃げる
      let toMouse = p5.Vector.sub(mouse, b.pos);
      if (mouseIsPressed) toMouse.mult(-1);
      b.steer(toMouse, mouseIsPressed ? 2.5 : 0.5);
    }
  }
  for (let b of boids) {
    b.update();
    b.show();
  }
}`;

const CLASS_SKETCH = `let bubbles = [];

// 設計図: 泡が持つデータと、できること
class Bubble {
  // new Bubble() のときに1回だけ実行される
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(8, 46);
    this.speed = random(0.3, 1.6);
    this.hue = random(185, 335);
  }

  // 1フレームぶん動かす
  update() {
    this.y -= this.speed;
    this.x += sin(frameCount * 0.02 + this.size) * 0.5;
    // 上へ抜けたら下から出直す
    if (this.y < -this.size) this.y = height + this.size;
  }

  // 自分を描く
  show() {
    stroke(this.hue, 60, 100, 80);
    fill(this.hue, 60, 100, 12);
    circle(this.x, this.y, this.size);
  }
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(1.5);
  // 設計図から60個の泡を作り、配列に入れる
  for (let i = 0; i < 60; i++) {
    bubbles.push(new Bubble());
  }
}

function draw() {
  background(238, 50, 8);
  for (let b of bubbles) {
    b.update();
    b.show();
  }
}`;

const LIFE_SKETCH = `let particles = [];

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // random2D()は、向きがランダムで長さ1のベクトルを作る
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.2, 1.4));
    // 寿命。100から始まり、0になったら消える
    this.life = 100;
  }

  update() {
    this.pos.add(this.vel);
    this.life -= 1.5;
  }

  show() {
    // 寿命を不透明度と大きさに使う
    fill(map(this.life, 100, 0, 330, 200), 70, 100, this.life);
    circle(this.pos.x, this.pos.y, map(this.life, 100, 0, 14, 2));
  }

  isDead() {
    return this.life <= 0;
  }
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
  noStroke();
}

function draw() {
  background(238, 50, 8);

  // 粒子の出どころ。マウスが枠の外にあるあいだは自動で動く
  let ex = width / 2 + cos(frameCount * 0.021) * 210;
  let ey = height / 2 + sin(frameCount * 0.034) * 120;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    ex = mouseX;
    ey = mouseY;
  }

  // 毎フレーム4個ずつ生む
  for (let i = 0; i < 4; i++) {
    particles.push(new Particle(ex, ey));
  }

  // 後ろから前へ走査し、寿命が尽きたものを配列から取り除く
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }

  fill(0, 0, 85);
  text('particles.length = ' + particles.length, 16, 28);
}`;

const FIREWORK_SKETCH = `let sparks = [];

class Spark {
  constructor(x, y, hue) {
    this.pos = createVector(x, y);
    // 四方八方へ、ばらついた速さで飛び出す
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.4, 4.2));
    this.hue = hue + random(-12, 12);
    this.life = 100;
  }

  update() {
    // 重力で下へ引き、空気の抵抗で減速する
    this.vel.y += 0.035;
    this.vel.mult(0.975);
    this.pos.add(this.vel);
    this.life -= 1.1;
  }

  show() {
    stroke(this.hue, 50, 100, this.life * 1.4);
    point(this.pos.x, this.pos.y);
  }

  isDead() {
    return this.life <= 0;
  }
}

// 1か所から150個の火花をまとめて生む
function burst(x, y) {
  let hue = random(360);
  for (let i = 0; i < 150; i++) {
    sparks.push(new Spark(x, y, hue));
  }
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(240, 60, 6);
}

function draw() {
  background(240, 60, 6, 18);

  // 一定の間隔で、空のどこかに打ち上げる
  if (frameCount % 40 == 1) {
    burst(random(90, 510), random(70, 230));
  }

  strokeWeight(2.5);
  for (let i = sparks.length - 1; i >= 0; i--) {
    sparks[i].update();
    sparks[i].show();
    if (sparks[i].isDead()) {
      sparks.splice(i, 1);
    }
  }
}

function mousePressed() {
  // クリックした場所でも開く
  burst(mouseX, mouseY);
}`;

const RULES_SKETCH = `// 3つの規則の強さ。0にすると、その規則が働かなくなる
let separation = 1.8;
let alignment = 1.0;
let cohesion = 0.8;

let boids = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < 90; i++) {
    let vel = p5.Vector.random2D();
    vel.mult(2.5);
    boids.push({ pos: createVector(random(width), random(height)), vel: vel });
  }
}

// 「こう動きたい」向きを、舵を切る力に変えて返す
function steer(boid, desired, weight) {
  if (desired.mag() == 0) return desired;
  desired.setMag(3);
  desired.sub(boid.vel);
  desired.limit(0.08);
  desired.mult(weight);
  return desired;
}

function draw() {
  background(238, 50, 8);

  for (let b of boids) {
    let apart = createVector(0, 0);
    let heading = createVector(0, 0);
    let center = createVector(0, 0);
    let count = 0;

    for (let other of boids) {
      let d = dist(b.pos.x, b.pos.y, other.pos.x, other.pos.y);
      // 自分自身と、50より遠い相手は数えない（continueで次の相手へ進む）
      if (other == b || d > 50) continue;
      if (d < 22) {
        let away = p5.Vector.sub(b.pos, other.pos);
        away.div(d + 0.1);
        apart.add(away);
      }
      heading.add(other.vel);
      center.add(other.pos);
      count += 1;
    }

    let acc = createVector(0, 0);
    // 分離: 近すぎる仲間から離れる
    acc.add(steer(b, apart, separation));
    if (count > 0) {
      // 整列: 仲間の向きの平均に合わせる
      acc.add(steer(b, heading, alignment));
      // 結合: 仲間の位置の平均へ向かう
      center.div(count);
      center.sub(b.pos);
      acc.add(steer(b, center, cohesion));
    }
    b.acc = acc;
  }

  stroke(195, 60, 100);
  strokeWeight(2);
  for (let b of boids) {
    b.vel.add(b.acc);
    b.vel.limit(3);
    b.pos.add(b.vel);
    b.pos.x = (b.pos.x + width) % width;
    b.pos.y = (b.pos.y + height) % height;

    // 進む向きに短い線を引く
    let tail = b.vel.copy();
    tail.setMag(10);
    line(b.pos.x, b.pos.y, b.pos.x - tail.x, b.pos.y - tail.y);
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

export default function Particles() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 12</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          パーティクルと群れ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          小さな粒を多数動かす仕組みをパーティクルシステムと呼びます。煙、火花、雨、群れなど、輪郭のはっきりしないものを表すときに使います。
          このページでは、粒子1つぶんの設計図をclassで書き、配列で多数を管理し、生まれて消える流れを作ります。
          下の群れは、1匹ごとに近くの仲間だけを見て動いています。枠の中にマウスを入れると集まり、ボタンを押しているあいだは逃げます。
        </p>

        <CodePreview
          title="群れ（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          <code className={code}>this.steer(apart, 1.8)</code>
          の1.8を0.3にすると、ぶつかるほど密集した塊になります。5にすると、互いに距離を取った散らばった群れになります。
        </p>

        <WhyNowBox
          title="なぜここでclassを扱うのか"
          tags={["class", "配列", "splice()", "Boids"]}
        >
          <p>
            ベクトルと力のページでは、粒子を
            <code className={code}>{"{ pos: ..., vel: ... }"}</code>
            という入れ物にして配列に並べました。粒子に寿命や色、描き方が加わると、扱うコードがdraw()の中に散らばります。
            classを使うと、粒子が持つデータと動かし方を1か所にまとめ、draw()には「全員を更新して描く」だけを書けます。
            乱数・ノイズ・力をまとめて使う、この章の仕上げです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>classで設計図を書き、配列で多数を持つ</h2>
            <p className={para}>
              <code className={code}>class</code>
              は、同じ種類の物を作るための設計図です。設計図から作った1つ1つをインスタンスと呼びます。下のスケッチは、
              泡の設計図を1つ書き、そこから60個の泡を作って配列に入れています。泡ごとに位置・大きさ・速さ・色が違います。
            </p>
            <CodePreview
              title="泡の設計図と60個の泡"
              language="js"
              code={CLASS_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      書いたもの
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      役割
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <Row
                    name="constructor()"
                    desc="インスタンスを作るときに1回だけ実行される。最初の位置や色を決める"
                  />
                  <Row
                    name="this.x"
                    desc="そのインスタンス自身が持つ変数。泡ごとに別の値になる"
                  />
                  <Row
                    name="update()"
                    desc="1フレームぶんの動きを書いたメソッド（classの中の関数）"
                  />
                  <Row name="show()" desc="自分を描くメソッド" />
                  <Row
                    name="new Bubble()"
                    desc="設計図からインスタンスを1つ作る"
                  />
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>i &lt; 60</code>
                  の60を300にする（設計図は1つのまま、泡だけが増える）
                </li>
                <li>
                  <code className={code}>this.size = random(8, 46);</code>を
                  <code className={code}>random(2, 8)</code>
                  にする（細かい気泡になる）
                </li>
                <li>
                  show()の
                  <code className={code}>circle(...)</code>を
                  <code className={code}>square(...)</code>
                  にする（1か所の変更が全部の泡に効く）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>寿命と削除</h2>
            <p className={para}>
              粒子を生み続けるだけでは、配列が際限なく大きくなり、動きが重くなります。粒子に寿命を持たせ、尽きたものを配列から取り除きます。
              取り除くには
              <code className={code}>splice(i, 1)</code>
              （i番目から1個を削除）を使います。左上の数字で、配列の長さが一定に保たれることを確かめてください。
            </p>
            <CodePreview
              title="生まれて消える粒子"
              language="js"
              code={LIFE_SKETCH}
            />
            <InfoBox type="warning" title="削除するときは後ろから走査する">
              <p>
                配列を前から順に見ながら削除すると、削除した位置より後ろの要素が1つずつ前へ詰まります。
                次に見る番号には、詰まってきた要素の1つ先が入っているので、1個を見落とします。
                <code className={code}>
                  for (let i = particles.length - 1; i &gt;= 0; i--)
                </code>
                のように後ろから見ていけば、詰まるのはすでに見終えた側だけなので、見落としが起きません。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>this.life -= 1.5;</code>
                  を0.4にする（長く残り、太い帯になる。配列の長さも増える）
                </li>
                <li>
                  update()に
                  <code className={code}>this.vel.y -= 0.03;</code>
                  を足す（上向きの力がかかり、炎や煙のように立ちのぼる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>エミッタと力</h2>
            <p className={para}>
              粒子を生む場所や仕組みをエミッタ（emitter）と呼びます。前のスケッチは毎フレーム少しずつ生む連続型でした。
              下は、1か所から一度に多数を生む型です。飛び出した火花に重力と空気の抵抗を加えると、花火の形になります。
              力の加え方は、ベクトルと力のページと同じです。クリックした場所でも開きます。
            </p>
            <CodePreview title="花火" language="js" code={FIREWORK_SKETCH} />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>this.vel.y += 0.035;</code>
                  を0.15にする（火花がすぐ垂れ下がり、柳のような形になる）
                </li>
                <li>
                  <code className={code}>random(0.4, 4.2)</code>を
                  <code className={code}>random(3.8, 4.2)</code>
                  にする（速さがそろい、輪の形に開く）
                </li>
                <li>
                  <code className={code}>this.vel.mult(0.975);</code>
                  を消す（減速せず、大きく広がり続ける）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>Boids: 3つの規則で群れを作る</h2>
            <p className={para}>
              Boidsは、鳥や魚の群れの動きを再現するモデルです。Craig
              Reynoldsは自身の解説ページで「In 1986 I made a computer model of
              coordinated animal motion such as bird flocks and fish
              schools.」と書いており、論文「Flocks, Herds, and Schools: A
              Distributed Behavioral
              Model」として1987年のSIGGRAPHで発表されました。群れ全体を指揮する仕組みはなく、
              1匹ごとに、近くの仲間だけを見て次の3つの規則に従います。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      規則
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      Reynoldsによる定義（原文）
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      このページのコード
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    [
                      "分離（Separation）",
                      "steer to avoid crowding local flockmates",
                      "近すぎる仲間から離れる向きを足し合わせる",
                    ],
                    [
                      "整列（Alignment）",
                      "steer towards the average heading of local flockmates",
                      "近くの仲間の速度を足し合わせ、その向きに合わせる",
                    ],
                    [
                      "結合（Cohesion）",
                      "steer to move toward the average position of local flockmates",
                      "近くの仲間の位置の平均を求め、そこへ向かう",
                    ],
                  ].map(([rule, original, ours]) => (
                    <tr key={rule} className="border-t border-border">
                      <th scope="row" className="text-left p-3 font-normal">
                        {rule}
                      </th>
                      <td className="p-3" lang="en">
                        {original}
                      </td>
                      <td className="p-3">{ours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={para}>
              下のスケッチは、規則ごとの強さを先頭の3つの変数にしています。1つを0にすると、その規則が群れに何をもたらしているかが分かります。
            </p>
            <CodePreview
              title="3つの規則の強さを変える"
              language="js"
              code={RULES_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>let alignment = 1.0;</code>
                  を0にする（向きがそろわず、集まったままその場でうごめく）
                </li>
                <li>
                  <code className={code}>let cohesion = 0.8;</code>
                  を0にする（向きはそろうが、まとまらずに広がって流れる）
                </li>
                <li>
                  <code className={code}>let separation = 1.8;</code>
                  を0にする（重なり合った細い列になる）
                </li>
                <li>
                  <code className={code}>d &gt; 50</code>
                  の50を120にする（遠くの仲間まで見るようになり、大きな1つの群れにまとまる）
                </li>
              </ul>
            </InfoBox>
            <InfoBox
              type="warning"
              title="数を増やすと、目標の60回に届かなくなる"
            >
              <p>
                仕様ではdraw()は1秒に60回を目標に実行されます。実測では、Boidsの数を増やすと回数が下がります。
                理由は、1匹ごとにほかの全員との距離を計算しているためです。90匹なら約8千回、900匹なら約80万回と、数の2乗で計算が増えます。
                このページのスケッチは、表示中に動きが落ちない数に抑えています。数を増やすときは、動きの滑らかさを見ながら少しずつ試してください。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="粒子の設計図を完成させる"
              description="___ を埋めて、classから粒子を作り、動かして描けるようにしてください。作るときに1回だけ実行されるメソッドの名前と、newで作るclassの名前を入れます。"
              preview
              initialCode={`let dots = [];

class Dot {
  ___() {
    this.x = random(width);
    this.y = random(height);
    this.speed = random(1, 4);
  }

  update() {
    this.x += this.speed;
    if (this.x > width) this.x = 0;
  }

  show() {
    circle(this.x, this.y, this.speed * 4);
  }
}

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  for (let i = 0; i < 40; i++) {
    dots.push(new ___());
  }
}

function draw() {
  background(238, 50, 8);
  fill(190, 70, 100, 70);
  for (let d of dots) {
    d.update();
    d.show();
  }
}`}
              answer={`let dots = [];

class Dot {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speed = random(1, 4);
  }

  update() {
    this.x += this.speed;
    if (this.x > width) this.x = 0;
  }

  show() {
    circle(this.x, this.y, this.speed * 4);
  }
}

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  for (let i = 0; i < 40; i++) {
    dots.push(new Dot());
  }
}

function draw() {
  background(238, 50, 8);
  fill(190, 70, 100, 70);
  for (let d of dots) {
    d.update();
    d.show();
  }
}`}
              keywords={["constructor", "Dot"]}
              hints={[
                "インスタンスを作るときに1回だけ実行されるメソッドの名前はconstructorです",
                "設計図からインスタンスを作るときは、newのあとに作りたいclassの名前Dotを書きます",
              ]}
            />
            <CodingChallenge
              title="寿命が尽きた粒子を消す"
              description="___ を埋めて、寿命が0以下になった粒子が配列から取り除かれるようにしてください。配列のi番目から1個を削除するメソッドを使います。"
              preview
              initialCode={`let particles = [];

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(238, 50, 8);
  particles.push({ x: 200, y: 280, vx: random(-1, 1), life: 100 });

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y -= 2;
    p.life -= 1;
    fill(30, 80, 100, p.life);
    circle(p.x, p.y, 16);
    if (p.life <= 0) {
      particles.___(i, 1);
    }
  }
}`}
              answer={`let particles = [];

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(238, 50, 8);
  particles.push({ x: 200, y: 280, vx: random(-1, 1), life: 100 });

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y -= 2;
    p.life -= 1;
    fill(30, 80, 100, p.life);
    circle(p.x, p.y, 16);
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}`}
              keywords={["splice"]}
              hints={[
                "配列の指定した位置から要素を取り除くメソッドspliceを使います。1つ目の引数が位置、2つ目が個数です",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              冒頭の群れは、描き方と規則の強さで別の生き物に見えてきます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>background(238, 50, 8, 28)</code>
                の28を4にする。軌跡が長く残り、群れの通った道が筆の跡のように重なる
              </li>
              <li>
                show()の
                <code className={code}>triangle(7, 0, -5, -3.5, -5, 3.5)</code>
                を<code className={code}>ellipse(0, 0, 14, 4)</code>
                にする。小魚の群れのように見える
              </li>
              <li>
                flock()の最後にある、ノイズで流す行の0.45を0にする。流れがなくなり、群れは時間とともに1つの塊にまとまっていく。
                1.5にすると、見えない川に沿って流れる群れになる
              </li>
              <li>
                花火の
                <code className={code}>burst()</code>
                を、群れのBoidどうしが近づきすぎた場所で呼ぶ。2つのスケッチのclassを1つのスケッチに並べれば組み合わせられる
              </li>
            </ul>
            <InfoBox type="success" title="この章の道具は組み合わせて使う">
              <p>
                乱数で初期状態を決め、ノイズで流れを作り、力で動かし、classでまとめる。ここまでの4ページは、1つの作品の中で同時に使う道具です。
                気に入ったスケッチを1つ選び、ほかのページの技法を1つだけ足すところから始めてください。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="寿命が尽きた粒子をsplice()で削除するループを、配列の後ろから前へ回す理由は？"
              options={[
                { label: "後ろから回すほうが計算が速いから" },
                {
                  label:
                    "削除すると後ろの要素が前へ詰まり、前から回すと次の1個を見落とすから",
                  correct: true,
                },
                { label: "splice()は最後の要素しか削除できないから" },
                { label: "新しい粒子が配列の先頭に追加されるから" },
              ]}
              explanation="splice(i, 1)でi番目を削除すると、i+1番目以降が1つずつ前へ詰まります。前から回していると、次に見るi+1番目にはもとのi+2番目が入っているので、1個を飛ばします。後ろから回せば、詰まるのは見終えた側だけです。"
            />
            <Quiz
              question="Boidsの3つの規則のうち、「近くの仲間の位置の平均へ向かう」のはどれ？"
              options={[
                { label: "分離（Separation）" },
                { label: "整列（Alignment）" },
                { label: "結合（Cohesion）", correct: true },
                { label: "どれでもない" },
              ]}
              explanation="結合は仲間の位置の平均へ向かう規則、整列は仲間の向きの平均に合わせる規則、分離は近すぎる仲間から離れる規則です。3つの力を足し合わせることで、群れの動きになります。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "classは粒子の設計図。constructor()で初期値を決め、update()とshow()で動かして描く",
                  "newで作ったインスタンスを配列に入れ、for...ofでまとめて更新する",
                  "寿命が尽きた粒子は、後ろから走査してsplice()で取り除く",
                  "エミッタは粒子を生む仕組み。生まれた粒子には力を足して動きを作る",
                  "Boidsは分離・整列・結合の3つの規則を、近くの仲間だけを見て適用する",
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
                  title: "p5.js Reference: class",
                  url: "https://p5js.org/reference/p5/class/",
                  description:
                    "classの書き方。constructorとメソッド、インスタンスの作り方",
                },
                {
                  title: "Craig Reynolds: Boids",
                  url: "https://www.red3d.com/cwr/boids/",
                  description:
                    "Boidsの考案者による解説ページ。3つの規則の定義と、1987年の論文への案内がある",
                },
                {
                  title: "The Nature of Code: Chapter 4 Particle Systems",
                  url: "https://natureofcode.com/particles/",
                  description:
                    "Daniel Shiffmanによる、粒子のclass・寿命と削除・エミッタの解説",
                },
                {
                  title: "The Nature of Code: Chapter 5 Autonomous Agents",
                  url: "https://natureofcode.com/autonomous-agents/",
                  description:
                    "舵を切る力（steering）の考え方と、群れの実装の解説",
                },
                {
                  title: "MDN: Array.prototype.splice()",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
                  description: "配列から要素を取り除くメソッドの仕様",
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
