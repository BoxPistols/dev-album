import { Link } from "wouter";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。残像を引いて跳ね回る光。マウスに近い光は大きくなり、クリックで飛び散る
const HERO_SKETCH = `let lights = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(245, 50, 6);

  // 位置・速度・色相をひとまとめにした光を12個用意する
  for (let i = 0; i < 12; i++) {
    lights.push({
      x: random(width),
      y: random(height),
      vx: random(-4, 4),
      vy: random(-4, 4),
      hue: 170 + i * 14
    });
  }
}

function draw() {
  // 半透明の背景で塗ると、前のフレームが少し残って尾を引く
  blendMode(BLEND);
  background(245, 50, 6, 18);
  blendMode(ADD);

  for (let light of lights) {
    // 速度の分だけ位置を進める
    light.x += light.vx;
    light.y += light.vy;

    // 壁に着いたら速度の向きを反転する
    if (light.x < 0 || light.x > width) light.vx *= -1;
    if (light.y < 0 || light.y > height) light.vy *= -1;

    // マウスが枠の中にあれば、近い光ほど大きくする
    let size = 22;
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let d = dist(mouseX, mouseY, light.x, light.y);
      size = max(22, 80 - d / 3);
    }

    fill(light.hue, 75, 100, 28);
    circle(light.x, light.y, size);
    fill(light.hue, 30, 100, 70);
    circle(light.x, light.y, size * 0.4);
  }
}

function mousePressed() {
  // クリックした位置から、光を四方へ飛ばす
  for (let light of lights) {
    light.x = mouseX;
    light.y = mouseY;
    light.vx = random(-4, 4);
    light.vy = random(-4, 4);
  }
}`;

const MOVE_SKETCH = `let x = 0;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(230, 40, 10);

  // 上の円: 自分で用意した変数xを、毎フレーム2ずつ増やす
  x = x + 2;
  if (x > width) {
    x = 0;
  }
  fill(45, 80, 100);
  circle(x, 100, 40);

  // 下の円: frameCount（いま何フレーム目か）から位置を計算する
  let x2 = (frameCount * 3) % width;
  fill(190, 70, 100);
  circle(x2, 200, 40);
}`;

const BOUNCE_SKETCH = `let x = 100;
let y = 80;
let vx = 3;
let vy = 2;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(230, 40, 10);

  // 速度を位置に足す
  x += vx;
  y += vy;

  // 左右の壁に着いたら、横の速度を反転する
  if (x < 20 || x > width - 20) {
    vx = -vx;
  }
  // 上下の壁に着いたら、縦の速度を反転する
  if (y < 20 || y > height - 20) {
    vy = -vy;
  }

  fill(330, 65, 100);
  circle(x, y, 40);
}`;

const TRAIL_SKETCH = `let x = 100;
let y = 80;
let vx = 4;
let vy = 3;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(230, 40, 10);
}

function draw() {
  // 4つ目の数が不透明度。小さいほど前のフレームが長く残る
  background(230, 40, 10, 18);

  x += vx;
  y += vy;
  if (x < 20 || x > width - 20) {
    vx = -vx;
  }
  if (y < 20 || y > height - 20) {
    vy = -vy;
  }

  // 色相をframeCountで少しずつ進める
  fill(frameCount % 360, 60, 100);
  circle(x, y, 40);
}`;

const RIPPLE_SKETCH = `let rippleX = 300;
let rippleY = 150;
let rippleSize = 0;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(215, 50, 10);

  // 波紋は毎フレーム大きくなり、大きくなるほど薄くなる
  rippleSize += 4;
  noFill();
  strokeWeight(2);
  stroke(185, 55, 100, 100 - rippleSize / 5);
  circle(rippleX, rippleY, rippleSize);
  stroke(185, 55, 100, 70 - rippleSize / 5);
  circle(rippleX, rippleY, rippleSize * 0.6);
  stroke(185, 55, 100, 40 - rippleSize / 5);
  circle(rippleX, rippleY, rippleSize * 0.3);

  // mouseIsPressed: 押しているあいだずっとtrue
  if (mouseIsPressed) {
    noStroke();
    fill(45, 60, 100);
    circle(mouseX, mouseY, 16);
  }

  // 操作がないあいだは、2秒ほどの間隔で波紋が出る
  if (frameCount % 120 === 0) {
    rippleX = random(100, 500);
    rippleY = random(60, 240);
    rippleSize = 0;
  }
}

// mousePressed(): 押した瞬間に1回だけ呼ばれる
function mousePressed() {
  rippleX = mouseX;
  rippleY = mouseY;
  rippleSize = 0;
}`;

const KEY_SKETCH = `let x = 300;
let y = 150;
let hue = 160;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  textSize(14);
  background(240, 40, 9);
}

function draw() {
  background(240, 40, 9, 14);

  // keyIsDown(): そのキーを押しているあいだずっとtrue
  if (keyIsDown(LEFT_ARROW) || keyIsDown('a')) x -= 4;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown('d')) x += 4;
  if (keyIsDown(UP_ARROW) || keyIsDown('w')) y -= 4;
  if (keyIsDown(DOWN_ARROW) || keyIsDown('s')) y += 4;

  fill(hue, 65, 100);
  circle(x, y, 30);

  fill(240, 40, 9);
  rect(0, 0, width, 34);
  fill(0, 0, 85);
  text('枠をクリックしてから、矢印キーかW A S Dで移動。スペースで色替え', 12, 22);
}

// keyPressed(): キーを押した瞬間に1回だけ呼ばれる
function keyPressed() {
  if (key === ' ') {
    hue = (hue + 50) % 360;
  }
}`;

const DIST_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(235, 45, 8);

  // 基準の点。マウスが枠の外にあるあいだは自動で動く
  let px = width / 2 + cos(frameCount * 0.02) * 180;
  let py = height / 2 + sin(frameCount * 0.031) * 110;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    px = mouseX;
    py = mouseY;
  }

  // 30ピクセルおきに円を並べる
  for (let x = 30; x < width; x += 30) {
    for (let y = 20; y < height; y += 30) {
      // 基準の点からこの円までの距離
      let d = dist(px, py, x, y);

      // 近いほど大きく、色相も変える
      let size = max(4, 28 - d / 7);
      fill(200 + size * 5, 70, 100);
      circle(x, y, size);
    }
  }
}`;

export default function MotionInteraction() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 4</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          動きとインタラクション
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          図形を動かし、マウスやキーボードに反応させます。動きの正体は「draw()が呼ばれるたびに、数を少しだけ変える」ことです。
          下の枠は完成形で、光が尾を引きながら壁で跳ね返ります。マウスを近づけると光が大きくなり、クリックするとその位置から飛び散ります。
        </p>

        <CodePreview
          title="跳ね回る光（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          このスケッチには、位置を進める・壁で跳ね返す・残像を残す・マウスとの距離を測る・クリックに反応する、の5つが入っています。
          1つずつ小さなスケッチで確かめます。
        </p>

        <WhyNowBox
          title="なぜ動きをここで扱うのか"
          tags={[
            "変数",
            "frameCount",
            "mousePressed()",
            "keyIsDown()",
            "dist()",
          ]}
        >
          <p>
            前のページまでの絵は、何度描いても同じでした。位置や色を変数に入れ、フレームごとに書き換えると、
            同じ図形が動きになります。以降のページに出てくるパーティクルも、物理のシミュレーションも、ゲームも、
            「変数を少し変えて描き直す」のくり返しでできています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              変数を少しずつ変えると動く
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              円のx座標を数で直接書くと、円は止まったままです。x座標を変数にして、draw()の中で毎回少し増やすと、右へ動きます。
              変数は<code className={code}>let x = 0;</code>
              のように関数の外で用意します。draw()の中で用意すると、呼ばれるたびに0に戻ってしまうためです。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              p5.jsが用意している<code className={code}>frameCount</code>
              も使えます。スケッチが始まってから描いたフレームの数が入っていて、1フレームごとに1増えます。
              時間とともに進む量がほしいときに、変数を自分で用意せずに済みます。
            </p>
            <CodePreview
              title="自分の変数とframeCount"
              language="js"
              code={MOVE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={code}>%</code>
              は割り算の余りを求める記号です。
              <code className={code}>(frameCount * 3) % width</code>
              は、幅を超えたら0からやり直す数になります。上の円のif文と同じことを1行で書いています。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>x = x + 2</code>
                  の2を8にする（上の円が速くなる）
                </li>
                <li>
                  <code className={code}>x = x + 2</code>を
                  <code className={code}>x = x - 2</code>にし、if文を
                  <code className={code}>if (x &lt; 0) {"{ x = width; }"}</code>
                  にする（左へ進む）
                </li>
                <li>
                  <code className={code}>circle(x2, 200, 40)</code>の40を
                  <code className={code}>frameCount % 60</code>
                  にする（大きさが1秒ほどの周期でくり返し変わる）
                </li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title="フレームで測る速さと、実際の速さ">
              <p>
                「1フレームに2ピクセル」という速さは、仕様どおり1秒に60フレーム描ければ1秒に120ピクセルです。
                実測では、端末の性能や描く量によって1秒あたりのフレーム数が下がり、そのぶん動きも遅くなることがあります。
                速さをフレームではなく時間で決めているわけではないためです。作品を眺める用途ではこのままで問題になりにくく、
                時間に正確な動きが必要な場面の書き方は
                <Link
                  href="/p5js/lab/falling-bodies"
                  className="text-primary underline"
                >
                  落下と数値計算
                </Link>
                のページで扱います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              速度を持たせて、壁で跳ね返す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「1フレームに進む量」も変数にします。これが速度です。横の速度をvx、縦の速度をvyとして、毎フレーム位置に足します。
              壁に着いたら速度の符号を反転すると、進む向きが逆になり、跳ね返って見えます。
              <code className={code}>||</code>
              は「または」の意味で、左の壁か右の壁のどちらかに着いたら、という条件になります。
            </p>
            <CodePreview
              title="壁で跳ね返る円"
              language="js"
              code={BOUNCE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              条件の20は円の半径です。円の中心ではなく縁が壁に触れた時点で折り返すように、壁の位置を半径のぶんだけ内側にしています。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>let vx = 3</code>と
                  <code className={code}>let vy = 2</code>
                  を7と5にする（速くなり、跳ね返る角度も変わる）
                </li>
                <li>
                  <code className={code}>vy = -vy</code>を
                  <code className={code}>vy = -vy * 0.9</code>
                  にする（上下に跳ねるたびに縦の勢いが弱まる）
                </li>
                <li>
                  条件の<code className={code}>20</code>を4か所とも
                  <code className={code}>0</code>
                  にする（円が半分めり込んでから折り返す）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              半透明の背景で残像を残す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              background()に不透明度を付けると、前のフレームを完全には消さず、薄く覆うだけになります。
              これを毎フレームくり返すと、古い絵ほど何度も覆われて暗くなり、動く図形が尾を引きます。
              前のページの「塗り直す」と「塗り直さない」の中間です。
            </p>
            <CodePreview title="尾を引く円" language="js" code={TRAIL_SKETCH} />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>background(230, 40, 10, 18)</code>
                  の最後の18を3にする（尾が長く残り、薄い跡も消えずに残る）。50にする（尾が短くなる）
                </li>
                <li>
                  <code className={code}>frameCount % 360</code>を
                  <code className={code}>(frameCount * 4) % 360</code>
                  にする（尾が虹色の縞になる）
                </li>
                <li>
                  <code className={code}>circle(x, y, 40)</code>
                  の40を8にする（細い線で軌跡を描くようになる）
                </li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title="残像が完全には消えないことがある">
              <p>
                計算の上では、半透明の背景を重ね続ければ古い絵は背景色に限りなく近づきます。実測では、不透明度をごく小さくすると、
                薄い跡が背景色まで戻らずに残り続けることがあります。キャンバスが色を0〜255の整数で持っていて、
                1回の重ねで変わる量が小さすぎると、丸められて変化がなくなるためです。跡が気になるときは不透明度を上げるか、
                一定の間隔で不透明な背景を塗ります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              マウス: 押しているあいだと、押した瞬間
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              マウスのボタンの調べ方は2通りあります。変数
              <code className={code}>mouseIsPressed</code>
              は、押しているあいだずっとtrueです。draw()の中のif文で使い、押し続けているあいだの動作を書きます。
              関数<code className={code}>mousePressed()</code>
              は、自分で書いておくと、ボタンを押した瞬間に1回だけ呼ばれます。「クリックしたら1回だけ起きること」を書きます。
              下の枠をクリックすると、その位置から波紋が広がります。押したまま動かすと、小さな光がついてきます。
            </p>
            <CodePreview
              title="クリックで広がる波紋"
              language="js"
              code={RIPPLE_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      書き方
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      種類
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      いつ効くか
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      mouseIsPressed
                    </th>
                    <td className="p-3">変数</td>
                    <td className="p-3">ボタンを押しているあいだずっとtrue</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      mousePressed()
                    </th>
                    <td className="p-3">自分で書く関数</td>
                    <td className="p-3">ボタンを押した瞬間に1回呼ばれる</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      keyIsDown(キー)
                    </th>
                    <td className="p-3">関数</td>
                    <td className="p-3">
                      そのキーを押しているあいだずっとtrueを返す
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      keyPressed()
                    </th>
                    <td className="p-3">自分で書く関数</td>
                    <td className="p-3">キーを押した瞬間に1回呼ばれる</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>rippleSize += 4</code>
                  の4を1にする（波紋がゆっくり広がる）
                </li>
                <li>
                  <code className={code}>rippleSize * 0.6</code>
                  の0.6を0.9にする（2つ目の輪が外側の輪に近づく）
                </li>
                <li>
                  <code className={code}>background(215, 50, 10)</code>
                  に4つ目の数として20を足す（波紋と光に残像が付く）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              キーボード: keyIsDown()とkeyPressed()
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              キーボードにも同じ2通りがあります。
              <code className={code}>keyIsDown()</code>
              は、指定したキーを押しているあいだtrueを返します。押し続けて動かす操作に向きます。
              <code className={code}>keyPressed()</code>
              は、キーを押した瞬間に1回呼ばれます。押されたキーは変数
              <code className={code}>key</code>
              に文字として入っています。キー入力は、先に枠を1回クリックしてから受け付けられます。
            </p>
            <CodePreview
              title="キーで動かす光"
              language="js"
              code={KEY_SKETCH}
            />
            <InfoBox type="warning" title="外の記事と書き方が違うところ">
              <p>
                このマニュアルが使うp5.jsの2.x系では、キーを数字の番号で指定する書き方（
                <code className={code}>keyIsDown(65)</code>
                など）が使えません。公式リファレンスは「In p5.js 2.0 and newer,
                numeric keycodes (such as 88 for &apos;X&apos;) are no longer
                supported.」と書いています。
                <code className={code}>LEFT_ARROW</code>
                のような定数か、<code className={code}>&apos;a&apos;</code>
                のような文字で指定します。以前の版向けに書かれた記事のコードが動かないときは、ここを確認してください。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  4か所の<code className={code}>4</code>
                  を10にする（移動が速くなる）
                </li>
                <li>
                  <code className={code}>hue = (hue + 50) % 360</code>
                  の50を180にする（スペースを押すたびに反対の色相になる）
                </li>
                <li>
                  <code className={code}>background(240, 40, 9, 14)</code>
                  の14を2にする（動かした跡が長く残り、線を描く道具になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              dist()でマウスとの距離に反応させる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={code}>dist(x1, y1, x2, y2)</code>
              は、2つの点のあいだの距離を返します。図形ごとにマウスまでの距離を測り、その値を大きさや色に使うと、
              マウスの周りだけが反応する絵になります。下のスケッチは、同じ円を等間隔に並べ、距離が近い円ほど大きく描いています。
              円を並べるfor文は、次のページで詳しく扱います。
            </p>
            <CodePreview
              title="近づくと大きくなる点"
              language="js"
              code={DIST_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={code}>max(4, 28 - d / 7)</code>
              は、2つの数の大きいほうを返します。距離が遠くなると
              <code className={code}>28 - d / 7</code>
              は負の数になりますが、max()で下限を4にしているので、遠くの円も小さな点として残ります。
              基準の点を自動で動かしている式のcos()とsin()は、次の章で詳しく扱います。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>28 - d / 7</code>
                  の7を2にする（反応する範囲が狭くなる）。20にする（広くなる）
                </li>
                <li>
                  <code className={code}>max(4, 28 - d / 7)</code>を
                  <code className={code}>min(28, 4 + d / 7)</code>
                  にする（近い円ほど小さくなり、マウスの周りに穴があく）
                </li>
                <li>
                  <code className={code}>circle(x, y, size)</code>を
                  <code className={code}>square(x, y, size)</code>
                  に替える
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="左右の壁で跳ね返す"
              description="___ を埋めて、円が右の壁でも折り返し、左右に往復し続けるようにしてください。埋めるとプレビューが動きます。"
              preview
              initialCode={`let x = 200;
let vx = 4;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(230, 40, 10);
}

function draw() {
  background(230, 40, 10, 15);
  x += vx;
  if (x < 20 || x > ___ - 20) {
    vx *= ___;
  }
  fill(50, 70, 100);
  circle(x, 150, 40);
}`}
              answer={`let x = 200;
let vx = 4;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(230, 40, 10);
}

function draw() {
  background(230, 40, 10, 15);
  x += vx;
  if (x < 20 || x > width - 20) {
    vx *= -1;
  }
  fill(50, 70, 100);
  circle(x, 150, 40);
}`}
              keywords={["width", "-1"]}
              hints={[
                "右の壁の位置は、キャンバスの幅が入った変数widthで表せます",
                "速度に-1を掛けると、大きさはそのままで向きだけが逆になります",
              ]}
            />
            <CodingChallenge
              title="マウスが近づくと光る円"
              description="___ を埋めて、マウスと円の中心との距離を測ってください。マウスが円の中に入ると、円が明るくなります。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(240, 40, 9);
  let d = ___(mouseX, mouseY, 200, 150);
  if (d < 70) {
    fill(170, 60, 100);
  } else {
    fill(170, 60, 40);
  }
  circle(200, 150, 140);
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(240, 40, 9);
  let d = dist(mouseX, mouseY, 200, 150);
  if (d < 70) {
    fill(170, 60, 100);
  } else {
    fill(170, 60, 40);
  }
  circle(200, 150, 140);
}`}
              keywords={["dist"]}
              hints={[
                "2つの点のあいだの距離を返す関数の名前を書きます。distanceを短くした4文字です",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              冒頭の「跳ね回る光」を作り替えます。光の数、尾の長さ、色の範囲を変えるだけで、印象が大きく変わります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>i &lt; 12</code>
                の12を60にし、<code className={code}>let size = 22</code>
                を6にする。細い光の線が画面を埋めていく
              </li>
              <li>
                <code className={code}>background(245, 50, 6, 18)</code>
                の18を4にする。軌跡が長く残り、線で編んだ模様になる
              </li>
              <li>
                <code className={code}>hue: 170 + i * 14</code>を
                <code className={code}>hue: 20 + i * 3</code>
                にする。橙から黄の狭い範囲に絞った、火の粉のような配色になる
              </li>
              <li>
                draw()の中で<code className={code}>light.vy += 0.1;</code>
                を足す。下向きに引かれ、弾むボールのような動きになる
              </li>
              <li>
                mousePressed()の中身を
                <code className={code}>background(245, 50, 6);</code>
                だけにする。クリックで描き直す、軌跡の絵になる
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="クリックした瞬間に1回だけ波紋を出したい。どこに書く？"
              options={[
                { label: "draw()の中のif (mouseIsPressed) { ... }" },
                {
                  label: "function mousePressed() { ... }の中",
                  correct: true,
                },
                { label: "setup()の中" },
                { label: "draw()の中のif (frameCount === 0) { ... }" },
              ]}
              explanation="mousePressed()は、ボタンを押した瞬間に1回だけ呼ばれます。mouseIsPressedは押しているあいだずっとtrueなので、draw()のif文に書くと、押しているあいだ毎フレーム実行されます。"
            />
            <Quiz
              question="右へ動いている円を、右の壁で跳ね返らせるには？"
              options={[
                { label: "xを0に戻す" },
                { label: "横の速度vxの符号を反転する", correct: true },
                { label: "縦の速度vyの符号を反転する" },
                { label: "background()を呼ばないようにする" },
              ]}
              explanation="速度の符号を反転すると、進む向きが逆になります。左右の壁では横の速度vx、上下の壁では縦の速度vyを反転します。xを0に戻すと、跳ね返らずに左端へ瞬間移動します。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "位置を変数にして、draw()の中で少しずつ変えると動きになる。frameCountは描いたフレームの数",
                  "速度を位置に足し、壁に着いたら速度の符号を反転すると跳ね返る",
                  "background()に不透明度を付けると、前のフレームが薄く残って残像になる",
                  "mouseIsPressed・keyIsDown()は押しているあいだ、mousePressed()・keyPressed()は押した瞬間に1回",
                  "dist()で測った距離を大きさや色に使うと、マウスの周りだけが反応する",
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
                  title: "p5.js Reference: frameCount",
                  url: "https://p5js.org/reference/p5/frameCount/",
                  description: "スケッチ開始から描いたフレームの数を持つ変数",
                },
                {
                  title: "p5.js Reference: mousePressed()",
                  url: "https://p5js.org/reference/p5/mousePressed/",
                  description: "ボタンを押した瞬間に1回呼ばれる関数",
                },
                {
                  title: "p5.js Reference: mouseIsPressed",
                  url: "https://p5js.org/reference/p5/mouseIsPressed/",
                  description: "ボタンを押しているあいだtrueになる変数",
                },
                {
                  title: "p5.js Reference: keyIsDown()",
                  url: "https://p5js.org/reference/p5/keyIsDown/",
                  description:
                    "キーを押しているあいだtrueを返す関数。2.x系でのキーの指定方法も書かれている",
                },
                {
                  title: "p5.js Reference: dist()",
                  url: "https://p5js.org/reference/p5/dist/",
                  description: "2点間の距離を求める関数",
                },
                {
                  title: "p5.js Tutorials: Conditionals and Interactivity",
                  url: "https://p5js.org/tutorials/conditionals-and-interactivity/",
                  description:
                    "条件分岐とマウス操作を組み合わせる公式チュートリアル",
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
