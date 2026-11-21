import { Link } from "wouter";
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

// このページの完成形。円充填・限定パレット・余白・粒状感を1枚にまとめたポスター
const HERO_SKETCH = `// パレット。paperは地の色、inkは文字の色、mainは主役の色、accentは差し色
let palettes = [
  { paper: '#f1e9d8', ink: '#1f3a5f', main: ['#1f3a5f', '#3d6b8c', '#a8c3c9'], accent: '#d1495b' },
  { paper: '#efe6dd', ink: '#2b2a28', main: ['#2b2a28', '#7a8b6f', '#c9c2a6'], accent: '#e07a3f' },
  { paper: '#ece5ee', ink: '#3b2a55', main: ['#3b2a55', '#8a6fb0', '#d3bfdc'], accent: '#e2a93b' },
  { paper: '#16202e', ink: '#e9e1cf', main: ['#e9e1cf', '#5f86a6', '#2f4a66'], accent: '#f08a4b' },
];
let seed = 1;
let pal;
let circles = [];
let grain;

function setup() {
  createCanvas(440, 560);
  grain = createGraphics(width, height);
  restart();
}

function restart() {
  randomSeed(seed);
  pal = random(palettes);
  circles = [];
  // 粒: 明るい点と暗い点を、別の画像に1回だけまいておく
  grain.clear();
  grain.noStroke();
  for (let i = 0; i < 18000; i++) {
    grain.fill(random() < 0.5 ? 0 : 255, 26);
    grain.circle(random(width), random(height), random(0.6, 1.7));
  }
}

function draw() {
  background(pal.paper);

  // 1フレームに40回、新しい円の置き場所を試す
  if (circles.length < 700) {
    for (let i = 0; i < 40; i++) tryAdd();
  }

  for (let c of circles) {
    // 現れた円は、決めた半径まで少しずつ育つ
    c.shown = lerp(c.shown, c.r, 0.12);
    if (c.ring) {
      noFill();
      stroke(c.col);
      strokeWeight(max(1, c.r * 0.14));
      circle(c.x, c.y, c.shown * 1.72);
    } else {
      noStroke();
      fill(c.col);
      circle(c.x, c.y, c.shown * 2);
    }
  }

  // 下の余白に、小さく番号を入れる
  noStroke();
  fill(pal.ink);
  textSize(12);
  text('CIRCLE PACKING', 40, height - 40);
  textAlign(RIGHT);
  text('No. ' + seed, width - 40, height - 40);
  textAlign(LEFT);

  // 最後に粒を重ねる
  image(grain, 0, 0);
}

function tryAdd() {
  // 候補の位置を、大きな円の内側から無作為に選ぶ
  let a = random(TWO_PI);
  let d = 175 * sqrt(random());
  let x = width / 2 + cos(a) * d;
  let y = 235 + sin(a) * d;

  // そこに置ける最大の半径を調べる
  let room = 175 - d;
  for (let c of circles) {
    room = min(room, dist(x, y, c.x, c.y) - c.r);
  }
  room -= 3;

  // 棄却: 狭すぎる場所は捨てて、次の候補に任せる
  if (room < 2.5) return;

  let col = random() < 0.1 ? pal.accent : random(pal.main);
  circles.push({ x: x, y: y, r: min(room, 58), shown: 0, col: col, ring: random() < 0.16 });
}

function mousePressed() {
  // クリックで別案へ。番号が同じなら、同じ絵になる
  seed++;
  restart();
}`;

const HUE_SKETCH = `let seed = 4;

function setup() {
  createCanvas(600, 330);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  textSize(13);
}

function draw() {
  background(230, 25, 11);
  // 基準の色相。ゆっくり一周させている
  let base = (200 + frameCount * 0.15) % 360;

  fill(0, 0, 80);
  text('色相を全部使う', 24, 26);
  text('色相を絞る', 324, 26);

  // 左: 色相を0〜360の全部から選び、彩度も明度も最大
  randomSeed(seed);
  for (let i = 0; i < 30; i++) {
    fill(random(360), 100, 100);
    rect(24 + (i % 6) * 43, 40 + floor(i / 6) * 55, 37, 49, 4);
  }

  // 右: 基準の前後25度だけを使い、彩度と明度に差をつける
  randomSeed(seed);
  for (let i = 0; i < 30; i++) {
    let h = base + random(-25, 25);
    let s = random(30, 80);
    let b = random(40, 100);
    // 10枚に1枚だけ、反対側の色相（補色）を差し色にする
    if (i % 10 === 3) {
      h = base + 180;
      s = 70;
      b = 95;
    }
    fill((h + 360) % 360, s, b);
    rect(324 + (i % 6) * 43, 40 + floor(i / 6) * 55, 37, 49, 4);
  }
}

function mousePressed() {
  // クリックで並びを変える
  seed++;
}`;

const PALETTE_SKETCH = `// パレットを配列で持つ。色を変えたいときは、ここだけ直せばよい
let paper = '#f1e9d8';
let colors = ['#1f3a5f', '#3d6b8c', '#a8c3c9', '#d1495b'];
// 選ばれやすさ。濃い主役を多く、赤の差し色は少なく
let weights = [5, 3, 3, 1];
let seed = 2;

function setup() {
  createCanvas(600, 300);
  noStroke();
}

function draw() {
  background(paper);
  randomSeed(seed);
  // 左右に余白を残して、幅の違う帯を並べる
  let x = 40;
  while (x < width - 40) {
    let w = min(random([4, 4, 8, 14, 26, 40]), width - 40 - x);
    let h = random(120, 220);
    // 帯の高さを、時間でわずかに揺らす
    h += sin(frameCount * 0.02 + x * 0.05) * 8;
    fill(pickColor());
    rect(x, height / 2 - h / 2, w, h);
    x += w + 3;
  }
}

// 重みに比例した確率で、パレットから1色を選ぶ
function pickColor() {
  let total = 0;
  for (let i = 0; i < weights.length; i++) total += weights[i];
  let r = random(total);
  for (let i = 0; i < weights.length; i++) {
    if (r < weights[i]) return colors[i];
    r -= weights[i];
  }
  return colors[0];
}

function mousePressed() {
  seed++;
}`;

const LAYOUT_SKETCH = `let colors = ['#1f3a5f', '#3d6b8c', '#a8c3c9', '#d1495b'];

function setup() {
  createCanvas(600, 330);
  textSize(13);
}

function draw() {
  background('#1b1d24');
  noStroke();
  fill('#c9c9d1');
  text('均等にばらまく', 20, 22);
  text('余白・大小・三分割', 320, 22);

  // 2枚の紙
  fill('#f1e9d8');
  rect(20, 32, 260, 280);
  rect(320, 32, 260, 280);

  // 左: 同じ大きさの円を、紙の端まで均等にばらまく
  randomSeed(7);
  for (let i = 0; i < 26; i++) {
    fill(random(colors));
    circle(20 + random(10, 250), 32 + random(10, 270), 30);
  }

  // 右: 外側30pxを余白にして、三分割の交点に主役を置く
  randomSeed(7);
  let mainX = 320 + 260 * 2 / 3;
  let mainY = 32 + 280 / 3;
  // 主役は1つだけ大きく。ゆっくり呼吸させる
  fill(colors[0]);
  circle(mainX, mainY, 128 + sin(frameCount * 0.03) * 6);
  // 脇役は中くらいを少し
  for (let i = 0; i < 4; i++) {
    fill(colors[1 + i % 2]);
    circle(320 + random(40, 120), 32 + random(170, 240), random(26, 44));
  }
  // 小さな粒をたくさん。主役の対角へ流れるように置く
  for (let i = 0; i < 26; i++) {
    let t = random();
    fill(random() < 0.2 ? colors[3] : colors[2]);
    circle(lerp(350, 455, t) + random(-16, 16), lerp(285, 180, t) + random(-16, 16), random(4, 10));
  }

  // マウスを押しているあいだ、三分割の線を出す
  if (mouseIsPressed) {
    stroke('#d1495b');
    strokeWeight(1);
    for (let k = 1; k <= 2; k++) {
      line(320 + 260 * k / 3, 32, 320 + 260 * k / 3, 312);
      line(320, 32 + 280 * k / 3, 580, 32 + 280 * k / 3);
    }
  }
}`;

const TEXTURE_SKETCH = `let grain;

function setup() {
  createCanvas(600, 330);
  textSize(13);
  // 粒は別の画像に1回だけ描いておき、毎フレーム重ねる
  grain = createGraphics(260, 280);
  grain.noStroke();
  for (let i = 0; i < 9000; i++) {
    grain.fill(random() < 0.5 ? 0 : 255, 28);
    grain.circle(random(260), random(280), random(0.6, 1.8));
  }
}

function draw() {
  background('#1b1d24');
  noStroke();
  fill('#c9c9d1');
  text('ベタ塗りと直線', 20, 22);
  text('重ね・ゆらぎ・粒', 320, 22);

  // 左: 不透明な円と、まっすぐな線
  fill('#ffffff');
  rect(20, 32, 260, 280);
  fill('#d1495b');
  circle(120, 150, 150);
  fill('#3d6b8c');
  circle(190, 200, 130);
  stroke('#1f3a5f');
  strokeWeight(2);
  for (let i = 0; i < 6; i++) {
    line(45, 262 + i * 7, 255, 262 + i * 7);
  }

  // 右: 紙の色の上に、半透明の円を少しずつずらして何枚も重ねる
  noStroke();
  fill('#f1e9d8');
  rect(320, 32, 260, 280);
  randomSeed(3);
  blendMode(MULTIPLY);
  for (let i = 0; i < 24; i++) {
    fill(209, 73, 91, 14);
    circle(420 + random(-5, 5), 150 + random(-5, 5), 150 + random(-10, 10));
    fill(61, 107, 140, 14);
    circle(490 + random(-5, 5), 200 + random(-5, 5), 130 + random(-10, 10));
  }
  blendMode(BLEND);

  // 線はnoiseで少しだけ揺らす
  noFill();
  stroke(31, 58, 95, 190);
  strokeWeight(1.4);
  for (let i = 0; i < 6; i++) {
    wobblyLine(345, 262 + i * 7, 555, 262 + i * 7, i);
  }

  // 最後に粒を重ねる
  image(grain, 320, 32);
}

function wobblyLine(x1, y1, x2, y2, id) {
  beginShape();
  for (let k = 0; k <= 30; k++) {
    let x = lerp(x1, x2, k / 30);
    let y = lerp(y1, y2, k / 30);
    // 線ごと・場所ごとに違う値を、noiseからもらう
    let dy = (noise(k * 0.2, id * 10, frameCount * 0.01) - 0.5) * 7;
    vertex(x, y + dy);
  }
  endShape();
}`;

const PACKING_SKETCH = `let circles = [];
let tried = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(13);
}

function draw() {
  background(225, 40, 9);

  // 1フレームに20回、候補を試す
  for (let i = 0; i < 20; i++) {
    if (circles.length >= 500) break;
    tried++;
    let x = random(30, width - 30);
    let y = random(46, height - 30);
    let r = random(4, 46);

    // ほかのどの円とも重ならないかを調べる
    let ok = true;
    for (let c of circles) {
      if (dist(x, y, c.x, c.y) < c.r + r + 2) {
        ok = false;
        break;
      }
    }
    // 棄却サンプリング: 重なる候補は捨て、重ならない候補だけ採用する
    if (ok) circles.push({ x: x, y: y, r: r });
  }

  noFill();
  strokeWeight(1.4);
  for (let c of circles) {
    stroke(map(c.r, 4, 46, 190, 330), 55, 100);
    circle(c.x, c.y, c.r * 2);
  }

  noStroke();
  fill(0, 0, 85);
  text('試した回数 ' + tried + '   置けた数 ' + circles.length, 30, 26);
}

function mousePressed() {
  // クリックでやり直す
  circles = [];
  tried = 0;
}`;

const SERIES_SKETCH = `let colors = ['#1f3a5f', '#3d6b8c', '#a8c3c9', '#d1495b'];
let first = 1;

function setup() {
  createCanvas(600, 320);
  textSize(13);
  render();
}

// 動かない絵なのでdraw()は書かず、必要なときだけrender()を呼ぶ
function render() {
  background('#1b1d24');
  for (let k = 0; k < 3; k++) {
    panel(20 + k * 190, 20, 180, 250, first + k);
  }
}

// 同じ手順を、seedだけ変えて描く
function panel(px, py, w, h, seed) {
  randomSeed(seed);
  noStroke();
  fill('#f1e9d8');
  rect(px, py, w, h);

  let placed = [];
  // 試す回数を決めておく。これが「いつ止めるか」になる
  for (let i = 0; i < 900; i++) {
    let x = random(px + 18, px + w - 18);
    let y = random(py + 18, py + h - 18);
    // 紙の端の余白と、いちばん近い円までの距離から、置ける半径を決める
    let room = min(x - px - 16, px + w - 16 - x, y - py - 16, py + h - 16 - y);
    for (let c of placed) {
      room = min(room, dist(x, y, c.x, c.y) - c.r);
    }
    room -= 2;
    if (room < 2) continue;
    let r = min(room, 34);
    placed.push({ x: x, y: y, r: r });
    fill(random() < 0.1 ? colors[3] : random([colors[0], colors[1], colors[2]]));
    circle(x, y, r * 2);
  }

  fill('#c9c9d1');
  text('seed ' + seed, px, py + h + 22);
}

function mousePressed() {
  // クリックで次の3枚へ
  first += 3;
  render();
}`;

export default function Composition() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 19</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          美しく仕上げる
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          このページでは新しい技法をほとんど足しません。扱うのは、同じアルゴリズムの絵を「作品」に見せるための判断です。
          色を絞る、余白を取る、質感を足す、密度を決める、そして止める。下の枠は、それらを1枚にまとめたポスターです。クリックするたびに別案が出ます。
        </p>

        <CodePreview
          title="円充填のポスター（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          使っている関数は、これまでのページに出てきたものだけです。違いを作っているのは、4色のパレット、紙の端の余白、円の大小の差、最後に重ねた粒です。
        </p>

        <WhyNowBox
          title="なぜここで学ぶのか"
          tags={["パレット", "余白", "質感", "円充填", "randomSeed()"]}
        >
          <p>
            ノイズも再帰もL-systemも、動かしただけでは「デモ」に見えます。絵の印象の大半は、アルゴリズムの外側にある色・余白・質感で決まります。
            ここで扱う項目はどれも数行で足せて、これまでに作ったどのスケッチにも後から当てはめられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>色相を絞る</h2>
            <p className={para}>
              <code className={code}>random(360)</code>
              で色相を全部使うと、どの色も同じ強さで主張し、まとまりがなくなります。
              <Link
                href="/p5js/basics/shapes-color"
                className="text-primary underline"
              >
                図形と色
              </Link>
              のページで扱ったHSBなら、色相の範囲を数で絞れます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>
                <strong className="text-foreground">類似色</strong>:
                色相環で隣り合う色。基準の色相の前後20〜30度に収めると、まとまって見える
              </li>
              <li>
                <strong className="text-foreground">補色</strong>:
                色相環で反対側（180度先）の色。並べると強い対比になるので、少量を差し色に使う
              </li>
              <li>
                <strong className="text-foreground">彩度と明度の差</strong>:
                色相を絞った分、彩度と明度に幅を持たせる。濃い色と淡い色が混ざると単調にならない
              </li>
            </ul>
            <CodePreview
              title="色相を全部使う（左）と絞る（右）"
              language="js"
              code={HUE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              右側は基準の色相をゆっくり一周させています。基準が何色であっても、前後25度と補色1つという決め方を守れば、まとまりは保たれます。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>random(-25, 25)</code>
                  を-90〜90にする（まとまりがゆるむ）、-5〜5にする（ほぼ単色になる）
                </li>
                <li>
                  <code className={code}>i % 10 === 3</code>を
                  <code className={code}>i % 2 === 0</code>
                  にする（差し色が多すぎて、差し色でなくなる）
                </li>
                <li>
                  <code className={code}>base + 180</code>を
                  <code className={code}>base + 120</code>
                  にする（対比が少し穏やかになる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>パレットを配列で持つ</h2>
            <p className={para}>
              色を数式で作る代わりに、使う色を先に決めて配列に入れておく方法もあります。色の数は地の色を含めて4〜5色あれば足ります。
              <code className={code}>random(colors)</code>
              で配列から1色を選べますが、全色を同じ割合で使うと平板になります。主役の色を多く、差し色を少なくするために、選ばれやすさ（重み）を別の配列で持ちます。
            </p>
            <CodePreview
              title="重みつきのパレット"
              language="js"
              code={PALETTE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>weights = [5, 3, 3, 1]</code>を
                  <code className={code}>[1, 1, 1, 1]</code>
                  にする（赤が増えて、落ち着きがなくなる）
                </li>
                <li>
                  <code className={code}>paper</code>を
                  <code className={code}>&apos;#16202e&apos;</code>
                  にする（同じ4色でも、地が暗いと印象が変わる）
                </li>
                <li>
                  <code className={code}>colors</code>
                  の4色を、手元の写真や好きな印刷物から拾った色に入れ替える
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>余白と構図</h2>
            <p className={para}>
              キャンバスの端まで均等に埋めると、どこを見ればよいかが決まりません。次の3つで、視線の行き先を作ります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>
                <strong className="text-foreground">余白（マージン）</strong>:
                端から一定の幅には何も置かない。
                <code className={code}>random(0, width)</code>を
                <code className={code}>random(margin, width - margin)</code>
                に替えるだけでよい
              </li>
              <li>
                <strong className="text-foreground">大小の対比</strong>:
                大きいものを1つ、中くらいを少し、小さいものをたくさん。同じ大きさを並べない
              </li>
              <li>
                <strong className="text-foreground">三分割</strong>:
                画面を縦横に3等分する線を考え、主役を線の上か交点に置く。中央に置くより動きが出る、という経験則
              </li>
            </ul>
            <CodePreview
              title="均等にばらまく（左）と、余白・大小・三分割（右）"
              language="js"
              code={LAYOUT_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              枠の中でマウスを押しているあいだ、右側に三分割の線が出ます。左右で使っている色は同じです。三分割は規則ではなく目安なので、中央に置いたほうが強い絵もあります。置き場所を変えて見比べてください。
            </p>
          </section>

          <section>
            <h2 className={h2}>重ねと質感</h2>
            <p className={para}>
              コンピュータの描く図形は、輪郭が鋭く、塗りが均一です。そのままだと硬く見えるので、わずかな不均一を足します。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>
                <strong className="text-foreground">紙の地</strong>:
                背景を真っ白（#ffffff）にせず、少し色のついた明るい色にする
              </li>
              <li>
                <strong className="text-foreground">重ね</strong>:
                不透明な図形を1回描く代わりに、半透明の図形を少しずつずらして何枚も重ねる。
                <code className={code}>blendMode(MULTIPLY)</code>
                にすると、重なった所が絵の具のように濃くなる
              </li>
              <li>
                <strong className="text-foreground">線のゆらぎ</strong>:
                直線をいくつかの点に分け、noise()で少しだけずらす
              </li>
              <li>
                <strong className="text-foreground">粒</strong>:
                明るい点と暗い点を、半透明で全体にまく。最後に重ねる
              </li>
            </ul>
            <CodePreview
              title="ベタ塗り（左）と、重ね・ゆらぎ・粒（右）"
              language="js"
              code={TEXTURE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  粒の<code className={code}>fill(..., 28)</code>
                  の28を80にする（粒が目立ちすぎる。質感は「気づかれない程度」が目安）
                </li>
                <li>
                  <code className={code}>blendMode(MULTIPLY)</code>
                  の行を消す（重なりが濁らず、平たくなる）
                </li>
                <li>
                  ゆらぎの<code className={code}>* 7</code>
                  を30にする（手描きではなく、波になる）
                </li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title="blendMode()は元に戻す">
              <p>
                blendMode()の設定は、変えたあとに描くものすべてに効き続けます。重ね終わったら
                <code className={code}>blendMode(BLEND)</code>
                で既定に戻します。戻し忘れると、次のフレームのbackground()まで乗算になり、画面が暗くなっていきます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>密度を決める: 円充填</h2>
            <p className={para}>
              乱数で置くだけだと、図形は重なったり偏ったりします。「重ならないように詰める」と、密度が整います。円を重ならないように詰める配置を円充填（circle
              packing）と呼びます。
            </p>
            <p className={para}>
              作り方は単純です。位置と半径を乱数で決めて候補を1つ作り、すでにある円のどれかと重なるなら捨て、重ならなければ採用します。条件に合わない候補を捨てて、合うものだけを残すこの方法を、棄却サンプリングと呼びます。
            </p>
            <CodePreview
              title="重なる候補を捨てる"
              language="js"
              code={PACKING_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              左上の数を見ると、進むほど「試した回数」ばかりが増え、「置けた数」が伸びなくなります。空きが減るほど候補が捨てられるためです。
              冒頭のポスターは半径を乱数で決めず、「その場所に置ける最大の半径」を計算して使っています。大きな空きには大きな円が、すき間には小さな円が入るので、大小の差が自然に付きます。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>c.r + r + 2</code>
                  の2を12にする（円どうしのすき間が広がり、軽い印象になる）
                </li>
                <li>
                  <code className={code}>random(4, 46)</code>を
                  <code className={code}>random(4, 12)</code>
                  にする（大小の差がなくなり、砂利のように均一になる）
                </li>
                <li>
                  <code className={code}>noFill()</code>
                  を消して<code className={code}>fill()</code>
                  で塗る（線の絵から面の絵に変わる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>シリーズを作る、止めどころを決める</h2>
            <p className={para}>
              <code className={code}>randomSeed(数)</code>
              を呼ぶと、そのあとのrandom()は数ごとに決まった並びを返します。同じ数なら同じ絵、違う数なら違う絵です。
              手順は1つのまま数だけを変えると、1枚ずつ違っていて全体として揃った「シリーズ」になります。気に入った絵の数を控えておけば、あとで同じ絵を出し直せます。
            </p>
            <CodePreview
              title="同じ手順、3つのseed"
              language="js"
              code={SERIES_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              もう1つ決めるのが、いつ止めるかです。描き足し続けると、ある所から先は密度が上がるだけで絵は良くなりません。止めどころは、コードの中の数として書けます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>
                回数で止める: 上のスケッチの
                <code className={code}>i &lt; 900</code>
              </li>
              <li>
                個数で止める: 冒頭のポスターの
                <code className={code}>circles.length &lt; 700</code>
              </li>
              <li>
                大きさで止める:
                「置ける半径が2.5より小さい場所は使わない」という下限
              </li>
            </ul>
            <InfoBox type="warning" title="randomSeed()の値と、ほかの環境の絵">
              <p>
                リファレンスはrandomSeed()について「makes these functions produce the same results each time a sketch is run」と書いています。同じ版のp5.jsで、乱数を呼ぶ順番が同じである限り、同じ絵になります。
                一方、乱数を呼ぶ回数が端末の速さに左右されるコード（1フレームに何個置けたかで分岐する等）は、同じ数でも絵が変わることがあります。
                シリーズを作るときは、上のスケッチのように回数を決めて一度に描き切る形にすると確実です。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>i &lt; 900</code>
                  を60にする（早く止めた、余白の多い絵になる）、5000にする（すき間まで埋まる）
                </li>
                <li>
                  <code className={code}>min(room, 34)</code>
                  の34を90にする（1つの大きな円が主役になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="色相を絞って、補色を1つ差す"
              description="___ を埋めて、色相・彩度・明度で色を指定できるようにし、差し色が基準の色相の反対側になるようにしてください。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  // 色相0〜360、彩度0〜100、明度0〜100で色を指定する
  colorMode(___, 360, 100, 100);
  noStroke();
}

function draw() {
  background(220, 30, 12);
  randomSeed(5);
  let base = 200;
  for (let i = 0; i < 48; i++) {
    let h = base + random(-25, 25);
    // 10枚に1枚ほどは、色相環の反対側の色にする
    if (random() < 0.1) h = (base + ___) % 360;
    fill(h, random(40, 80), random(50, 100));
    rect(20 + (i % 8) * 46, 20 + floor(i / 8) * 44, 38, 36, 4);
  }
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  // 色相0〜360、彩度0〜100、明度0〜100で色を指定する
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  background(220, 30, 12);
  randomSeed(5);
  let base = 200;
  for (let i = 0; i < 48; i++) {
    let h = base + random(-25, 25);
    // 10枚に1枚ほどは、色相環の反対側の色にする
    if (random() < 0.1) h = (base + 180) % 360;
    fill(h, random(40, 80), random(50, 100));
    rect(20 + (i % 8) * 46, 20 + floor(i / 8) * 44, 38, 36, 4);
  }
}`}
              keywords={["HSB", "180"]}
              hints={[
                "色相（Hue）・彩度（Saturation）・明度（Brightness）の頭文字を並べた定数HSBを、colorMode()の最初に渡します",
                "補色は色相環のちょうど反対側です。360度の半分、180を足します",
              ]}
            />
            <CodingChallenge
              title="重なる円を捨てる"
              description="___ を埋めて、ほかの円と重なる候補を捨て、重ならない候補だけを配列に足すようにしてください。"
              preview
              initialCode={`let circles = [];

function setup() {
  createCanvas(400, 300);
  noStroke();
}

function draw() {
  background('#f1e9d8');
  for (let i = 0; i < 10; i++) {
    let x = random(30, width - 30);
    let y = random(30, height - 30);
    let r = random(4, 30);
    let ok = true;
    for (let c of circles) {
      // 中心どうしの距離が半径の和より小さければ、重なっている
      if (dist(x, y, c.x, c.y) < c.r + r + 2) ok = ___;
    }
    // 重ならなかった候補だけを配列に足す
    if (ok) circles.___({ x: x, y: y, r: r });
  }
  fill('#1f3a5f');
  for (let c of circles) {
    circle(c.x, c.y, c.r * 2);
  }
}`}
              answer={`let circles = [];

function setup() {
  createCanvas(400, 300);
  noStroke();
}

function draw() {
  background('#f1e9d8');
  for (let i = 0; i < 10; i++) {
    let x = random(30, width - 30);
    let y = random(30, height - 30);
    let r = random(4, 30);
    let ok = true;
    for (let c of circles) {
      // 中心どうしの距離が半径の和より小さければ、重なっている
      if (dist(x, y, c.x, c.y) < c.r + r + 2) ok = false;
    }
    // 重ならなかった候補だけを配列に足す
    if (ok) circles.push({ x: x, y: y, r: r });
  }
  fill('#1f3a5f');
  for (let c of circles) {
    circle(c.x, c.y, c.r * 2);
  }
}`}
              keywords={["false", "push"]}
              hints={[
                "重なっていたら、その候補は使えません。okをfalseにします",
                "配列の末尾に要素を足すメソッドはpush()です",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              これまでのページで作ったスケッチを1つ選び、次の順に手を入れてみてください。1つ足すごとにPNGで保存しておくと、どの手が効いたかを後から見比べられます。
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                色を、地の色を含めて4〜5色のパレットに置き換える。差し色は全体の1割ほどにする
              </li>
              <li>
                端から40px前後を余白にする。位置を決めるrandom()の範囲を狭めるだけでよい
              </li>
              <li>
                大きさに差をつける。大きいものを1つか2つ、小さいものをたくさん
              </li>
              <li>
                背景を紙の色にし、最後に
                <code className={code}>image(grain, 0, 0)</code>
                で粒を重ねる
              </li>
              <li>
                <code className={code}>randomSeed()</code>
                の数を変えて20枚ほど出し、良い3枚を選ぶ。選んだ数をコメントに残す
              </li>
            </ol>
            <InfoBox type="success" title="選ぶことも制作">
              <p>
                seedを変えて出てくる絵の大半は、平凡です。たくさん出して、その中から選び、選んだ理由を考えて規則へ戻す。この往復で絵は良くなります。
                書き出しと公開の方法は
                <Link
                  href="/p5js/publish/export"
                  className="text-primary underline"
                >
                  書き出す
                </Link>
                のページで扱います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="HSBで色相を基準の前後25度に絞ったとき、絵が単調にならないようにする方法として適切なのは？"
              options={[
                { label: "色相の範囲を0〜360に戻す" },
                {
                  label: "彩度と明度に幅を持たせ、補色を少量だけ差し色にする",
                  correct: true,
                },
                { label: "すべての色の彩度と明度を最大にする" },
                { label: "図形の数を減らす" },
              ]}
              explanation="色相を絞るとまとまりが出ます。その分、彩度と明度に差をつけて濃淡を作り、色相環の反対側の色を少量だけ使うと、まとまりを保ったまま変化が付きます。"
            />
            <Quiz
              question="円充填のスケッチで、進むほど「置けた数」が伸びなくなるのはなぜ？"
              options={[
                { label: "random()が同じ値を返すようになるから" },
                { label: "配列に入れられる要素の数に上限があるから" },
                {
                  label:
                    "空きが減り、無作為に作った候補の多くが既存の円と重なって捨てられるから",
                  correct: true,
                },
                { label: "frameCountが大きくなると描画が遅くなるから" },
              ]}
              explanation="棄却サンプリングは、条件に合わない候補を捨てる方法です。円が増えて空きが減るほど、候補が重なる確率が上がり、採用される割合が下がります。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "色相は絞り、彩度と明度に差をつける。補色は少量を差し色にする",
                  "パレットは配列で持ち、重みで主役と差し色の割合を決める",
                  "余白を取り、大小の差をつけ、主役を三分割の線や交点に置く",
                  "紙の色・半透明の重ね・線のゆらぎ・粒で、均一さを崩す",
                  "円充填は、重なる候補を捨てる棄却サンプリングで作れる",
                  "randomSeed()でシリーズを作り、止めどころを回数や下限としてコードに書く",
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
              title="参考リンク"
              links={[
                {
                  title: "p5.js Reference: colorMode()",
                  url: "https://p5js.org/reference/p5/colorMode/",
                  description: "HSBで色を指定するための設定",
                },
                {
                  title: "p5.js Reference: blendMode()",
                  url: "https://p5js.org/reference/p5/blendMode/",
                  description: "MULTIPLYやADDなど、色の重なり方の一覧",
                },
                {
                  title: "p5.js Reference: randomSeed()",
                  url: "https://p5js.org/reference/p5/randomSeed/",
                  description: "乱数の並びを固定して、同じ絵を出し直す",
                },
                {
                  title: "p5.js Reference: createGraphics()",
                  url: "https://p5js.org/reference/p5/createGraphics/",
                  description:
                    "画面とは別の描画先を作る。粒を1回だけ描いておくのに使う",
                },
                {
                  title: "Wikipedia: Rule of thirds",
                  url: "https://en.wikipedia.org/wiki/Rule_of_thirds",
                  description: "三分割の考え方と、その使われ方",
                },
                {
                  title: "Wikipedia: Circle packing",
                  url: "https://en.wikipedia.org/wiki/Circle_packing",
                  description: "円を重ならないように詰める配置の数学",
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
