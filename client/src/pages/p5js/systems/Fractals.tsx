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

// このページの完成形。根元から順に枝が伸び、伸びきったあとも風で揺れ続ける
const HERO_SKETCH = `let grow = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(235, 45, 9);
  // 0から10まで少しずつ増やす。根元の枝から順に伸びていく
  grow = min(grow + 0.05, 10);

  // マウスが枠の中にあるあいだは、横位置で枝の開き方を変える
  let spread = 0.42;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    spread = map(mouseX, 0, width, 0.15, 0.9);
  }

  translate(width / 2, height - 14);
  branch(92, 0, spread);
}

function branch(len, depth, spread) {
  // この段の枝がどこまで伸びたか（0〜1）
  let t = constrain(grow - depth, 0, 1);
  if (t <= 0) return;

  // 風。先の枝ほど大きく揺れる
  let sway = sin(frameCount * 0.025 + depth * 0.7) * 0.012 * depth;

  stroke(map(depth, 0, 9, 28, 150), 42, map(depth, 0, 9, 48, 88));
  strokeWeight(map(depth, 0, 9, 8, 1));
  line(0, 0, 0, -len * t);
  translate(0, -len * t);

  // 終了条件: 10段目まで来たら、花を1つ置いて終わる
  if (depth >= 9) {
    noStroke();
    fill(335, 55, 100, 75);
    circle(0, 0, 5 * t);
    return;
  }

  // 自分自身を2回呼ぶ。右の枝と左の枝
  push();
  rotate(spread + sway);
  branch(len * 0.73, depth + 1, spread);
  pop();
  push();
  rotate(-spread * 0.85 + sway);
  branch(len * 0.68, depth + 1, spread);
  pop();
}

function mousePressed() {
  // クリックで最初から育て直す
  grow = 0;
}`;

const NEST_SKETCH = `function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
}

function draw() {
  background(235, 45, 9);
  // 円を描くのをやめる大きさ。時間で行き来させている
  let minSize = map(sin(frameCount * 0.015), -1, 1, 6, 150);
  nest(width / 2, height / 2, 280, minSize);
}

function nest(x, y, d, minSize) {
  stroke(map(d, 0, 280, 330, 185), 60, 100, 85);
  circle(x, y, d);
  // 終了条件: 十分小さくなったら、自分を呼ぶのをやめる
  if (d > minSize) {
    nest(x - d / 4, y, d / 2, minSize);
    nest(x + d / 4, y, d / 2, minSize);
  }
}`;

const TREE_SKETCH = `let angleSlider;
let ratioSlider;

function setup() {
  createCanvas(600, 360);
  colorMode(HSB, 360, 100, 100, 100);
  // createSlider(最小, 最大, 初期値, 刻み)
  angleSlider = createSlider(5, 90, 26, 1);
  angleSlider.attribute('aria-label', '枝の角度');
  ratioSlider = createSlider(0.5, 0.75, 0.69, 0.01);
  ratioSlider.attribute('aria-label', '枝の縮小率');
}

function draw() {
  background(42, 10, 95);
  let angle = radians(angleSlider.value());
  let ratio = ratioSlider.value();

  noStroke();
  fill(30, 30, 35);
  textSize(14);
  text('angle ' + angleSlider.value() + '   ratio ' + ratio, 14, 24);

  translate(width / 2, height - 8);
  stroke(140, 45, 32, 85);
  branch(84, angle, ratio);
}

function branch(len, angle, ratio) {
  strokeWeight(len * 0.07);
  line(0, 0, 0, -len);
  translate(0, -len);
  // 終了条件: 枝の長さが4より短くなったら終わる
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * ratio, angle, ratio);
    pop();
    push();
    rotate(-angle);
    branch(len * ratio, angle, ratio);
    pop();
  }
}`;

const KOCH_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

function draw() {
  background(215, 50, 10);
  // 90フレームごとに1段深くする（0〜5をくり返す）
  let depth = floor(frameCount / 90) % 6;

  // 正三角形の3つの頂点
  let cx = width / 2;
  let cy = height / 2 + 28;
  let r = 165;
  let a = createVector(cx, cy - r);
  let b = createVector(cx + r * cos(PI / 6), cy + r * sin(PI / 6));
  let c = createVector(cx - r * cos(PI / 6), cy + r * sin(PI / 6));

  noFill();
  stroke(190, 45, 100);
  strokeWeight(1.5);
  koch(a, b, depth);
  koch(b, c, depth);
  koch(c, a, depth);

  noStroke();
  fill(190, 20, 90);
  text('n = ' + depth + '    length x ' + nf(pow(4 / 3, depth), 1, 2), 14, 24);
}

function koch(p, q, n) {
  // 終了条件: 0段目はただの線分
  if (n === 0) {
    line(p.x, p.y, q.x, q.y);
    return;
  }
  // 線分を3等分する2点
  let s = p5.Vector.lerp(p, q, 1 / 3);
  let t = p5.Vector.lerp(p, q, 2 / 3);
  // 中央の3分の1を60度回して、山の頂点を作る
  let peak = p5.Vector.sub(t, s).rotate(-PI / 3).add(s);
  // 4本の短い線分それぞれに、同じ操作をくり返す
  koch(p, s, n - 1);
  koch(s, peak, n - 1);
  koch(peak, t, n - 1);
  koch(t, q, n - 1);
}`;

const SIERPINSKI_SKETCH = `let corners = [];
let p;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 45, 9);

  // 左: 再帰で描く。1つの三角形を、半分の大きさの3つに置き換える
  noStroke();
  fill(45, 65, 100);
  gasket(20, 280, 260, 6);

  // 右: カオスゲームで使う3つの頂点と、動かす点
  corners = [
    createVector(320, 280),
    createVector(580, 280),
    createVector(450, 55),
  ];
  p = createVector(450, 200);
}

function gasket(x, y, s, n) {
  let h = s * sqrt(3) / 2;
  if (n === 0) {
    triangle(x, y, x + s, y, x + s / 2, y - h);
    return;
  }
  gasket(x, y, s / 2, n - 1);
  gasket(x + s / 2, y, s / 2, n - 1);
  gasket(x + s / 4, y - h / 2, s / 2, n - 1);
}

function draw() {
  // 右: 頂点を1つ無作為に選び、そこまでの半分だけ進んで点を打つ
  strokeWeight(1);
  for (let i = 0; i < 150; i++) {
    let k = floor(random(3));
    p.lerp(corners[k], 0.5);
    stroke(180 + k * 60, 60, 100, 70);
    point(p.x, p.y);
  }
  if (frameCount > 400) noLoop();
}`;

const FERN_SKETCH = `let x = 0;
let y = 0;
let count = 0;

function setup() {
  createCanvas(400, 480);
  colorMode(HSB, 360, 100, 100, 100);
  background(165, 45, 7);
}

function draw() {
  strokeWeight(1);
  // 1フレームに300点ずつ打つ
  for (let i = 0; i < 300; i++) {
    let r = random(1);
    let nx;
    let ny;
    if (r < 0.01) {
      // f1: 茎（確率1%）
      nx = 0;
      ny = 0.16 * y;
    } else if (r < 0.86) {
      // f2: 少しずつ小さくなる葉（確率85%）
      nx = 0.85 * x + 0.04 * y;
      ny = -0.04 * x + 0.85 * y + 1.6;
    } else if (r < 0.93) {
      // f3: 左側のいちばん大きな葉（確率7%）
      nx = 0.2 * x - 0.26 * y;
      ny = 0.23 * x + 0.22 * y + 1.6;
    } else {
      // f4: 右側のいちばん大きな葉（確率7%）
      nx = -0.15 * x + 0.28 * y;
      ny = 0.26 * x + 0.24 * y + 0.44;
    }
    x = nx;
    y = ny;

    // 計算上の座標（xはおよそ-2.2〜2.7、yは0〜10）を画面に合わせる
    let px = width / 2 + (x - 0.24) * 44;
    let py = height - 20 - y * 44;
    stroke(map(y, 0, 10, 85, 165), 65, 95, 45);
    point(px, py);
  }
  // 十分に積もったら止める
  count++;
  if (count > 900) noLoop();
}

function mousePressed() {
  // クリックで最初から打ち直す
  background(165, 45, 7);
  x = 0;
  y = 0;
  count = 0;
  loop();
}`;

const MANDELBROT_SKETCH = `// 表示している範囲の中心(cx, cy)と横幅span
let cx = -0.6;
let cy = 0;
let span = 3.3;

function setup() {
  createCanvas(450, 300);
  pixelDensity(1);
  render();
}

// 動かない絵なのでdraw()は書かない。必要なときだけrender()を呼ぶ
function render() {
  let maxIter = 90;
  loadPixels();
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      // 画素1つを、複素数c（実部a、虚部b）に対応させる
      let a = cx + (px / width - 0.5) * span;
      let b = cy + (py / height - 0.5) * span * height / width;

      // zを0から始めて、zの2乗にcを足す計算をくり返す
      let zx = 0;
      let zy = 0;
      let n = 0;
      while (n < maxIter && zx * zx + zy * zy <= 4) {
        let next = zx * zx - zy * zy + a;
        zy = 2 * zx * zy + b;
        zx = next;
        n++;
      }

      let i = (px + py * width) * 4;
      // 回数ではなくzの大きさで見る。maxIter回目にちょうど飛び去った点も、外側の色にするため
      if (zx * zx + zy * zy <= 4) {
        // 最後まで飛び去らなかった点が、マンデルブロ集合
        pixels[i] = 10;
        pixels[i + 1] = 10;
        pixels[i + 2] = 24;
      } else {
        // 飛び去るまでの回数で色を決める
        pixels[i] = 128 + 127 * cos(3.2 + n * 0.16);
        pixels[i + 1] = 128 + 127 * cos(3.9 + n * 0.16);
        pixels[i + 2] = 128 + 127 * cos(4.8 + n * 0.16);
      }
      pixels[i + 3] = 255;
    }
  }
  updatePixels();
}

function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  // クリックした点を中心にして2倍に拡大する
  cx += (mouseX / width - 0.5) * span;
  cy += (mouseY / height - 0.5) * span * height / width;
  span /= 2;
  // 拡大しすぎたら最初の範囲に戻す
  if (span < 0.0002) {
    cx = -0.6;
    cy = 0;
    span = 3.3;
  }
  render();
}`;

const FERN_ROWS: [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
][] = [
  ["f1", "0", "0", "0", "0.16", "0", "0", "0.01", "茎"],
  [
    "f2",
    "0.85",
    "0.04",
    "−0.04",
    "0.85",
    "0",
    "1.60",
    "0.85",
    "先へ向かって小さくなっていく葉",
  ],
  [
    "f3",
    "0.20",
    "−0.26",
    "0.23",
    "0.22",
    "0",
    "1.60",
    "0.07",
    "左側のいちばん大きな葉",
  ],
  [
    "f4",
    "−0.15",
    "0.28",
    "0.26",
    "0.24",
    "0",
    "0.44",
    "0.07",
    "右側のいちばん大きな葉",
  ],
];

export default function Fractals() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 17</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          フラクタル
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          枝の先にまた小さな枝があり、その先にさらに小さな枝がある。部分が全体と同じ形をしている図形をフラクタルと呼びます。
          このページでは、自分自身を呼び出す関数（再帰）と、点を打ち続ける方法の2通りで、木・雪片・シダ・マンデルブロ集合を描きます。
          下の枠は完成形です。マウスを左右に動かすと枝の開き方が変わり、クリックで育て直せます。
        </p>

        <CodePreview
          title="風に揺れながら育つ木（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          枝を描く関数はbranch()の1つだけです。千本を超える枝は、この関数が自分自身を呼び出すことで描かれています。
        </p>

        <WhyNowBox
          title="なぜここで学ぶのか"
          tags={["再帰", "自己相似", "push() / pop()", "pixels"]}
        >
          <p>
            ここまでのページでは、for文で「同じことを横に並べる」描き方をしてきました。再帰は「同じことを内側へ入れ子にする」描き方です。
            座標変換・乱数・pixelsという既習の道具に再帰を足すだけで、短いコードから細部まで描き込まれた絵が出てきます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>自己相似と再帰</h2>
            <p className={para}>
              図形の一部を拡大すると全体と同じ形が現れる性質を、自己相似と呼びます。「フラクタル（fractal）」という語は、数学者ブノワ・マンデルブロが1975年に作りました。
              自己相似な図形は、
              <strong className="text-foreground">
                自分自身を呼び出す関数
              </strong>
              で素直に書けます。これを再帰関数と呼びます。
            </p>
            <p className={para}>
              下のnest()は、円を1つ描いたあと、半分の大きさの円を左右に描くために自分自身を2回呼びます。呼ばれた先でも同じことが起きるので、円の中に円が入れ子になります。
            </p>
            <CodePreview
              title="円の中に円（再帰の最小例）"
              language="js"
              code={NEST_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              再帰関数には、必ず
              <strong className="text-foreground">終了条件</strong>
              を書きます。ここでは
              <code className={code}>if (d &gt; minSize)</code>
              がそれで、円が十分小さくなったら自分を呼ぶのをやめます。スケッチではminSizeを時間で行き来させているので、どこで止めるかによって細かさが変わる様子が見えます。
            </p>
            <InfoBox type="warning" title="終了条件を忘れると止まらない">
              <p>
                終了条件が無い、または決して成り立たない再帰は、呼び出しが際限なく続き、ブラウザが「Maximum
                call stack size
                exceeded」というエラーを出して止めます。再帰を書くときは、先に終了条件から書くと安全です。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>再帰で木を描く</h2>
            <p className={para}>
              木は「枝を1本描き、その先端で向きを変えて、少し短い枝を2本描く」のくり返しです。先端への移動は
              <code className={code}>translate()</code>、向きは
              <code className={code}>rotate()</code>
              、分かれ道から戻るには
              <code className={code}>push()</code>と
              <code className={code}>pop()</code>
              を使います。絵の下のスライダーで、枝の角度（上）と縮小率（下）を変えられます。
            </p>
            <CodePreview
              title="角度と縮小率を変えられる木"
              language="js"
              code={TREE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  角度のスライダーを90にする（枝が直角に分かれ、格子のような形になる）
                </li>
                <li>
                  片方の
                  <code className={code}>rotate(-angle)</code>を
                  <code className={code}>rotate(-angle * 0.5)</code>
                  にする（左右が非対称になり、風に吹かれたような姿になる）
                </li>
                <li>
                  <code className={code}>if (len &gt; 4)</code>
                  の4を20にする（終了が早まり、枝先が粗くなる）
                </li>
              </ul>
            </InfoBox>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              枝は1段ごとに2倍に増えます。10段で約千本、20段で約100万本です。終了条件の値を小さくするほど描く量が急に増えるので、重くなったら終了条件を先に見直します。
              冒頭の木は、rotate()に渡す角度へsin()の値を足して揺らしています。
            </p>
          </section>

          <section>
            <h2 className={h2}>コッホ曲線と雪片</h2>
            <p className={para}>
              線分を3等分し、中央の3分の1を正三角形の2辺に置き換える。できた4本の線分それぞれに、同じ置き換えをくり返す。これがコッホ曲線です。
              スウェーデンの数学者ヘルゲ・フォン・コッホが1904年の論文で示しました。正三角形の3辺をこの曲線にすると、コッホ雪片と呼ばれる形になります。
            </p>
            <CodePreview
              title="コッホ雪片（段数が自動で進む）"
              language="js"
              code={KOCH_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              1回の置き換えで、1本の線分は長さ3分の1の線分4本になります。全体の長さは毎回3分の4倍です。左上の「length
              x」がその倍率で、段数を進めるほど増え続けます。置き換えを無限にくり返した図形は、囲む面積が有限なのに周の長さは無限になります。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>rotate(-PI / 3)</code>を
                  <code className={code}>rotate(PI / 3)</code>
                  にする（山が内側を向き、別の模様になる）
                </li>
                <li>
                  <code className={code}>% 6</code>を
                  <code className={code}>% 4</code>
                  にする（3段目までで折り返す）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>シェルピンスキーのギャスケット</h2>
            <p className={para}>
              三角形を、半分の大きさの三角形3つに置き換え続けた図形です。ポーランドの数学者ヴァツワフ・シェルピンスキが1915年に示しました。
              下の左側は再帰で描いたもの、右側は「カオスゲーム」と呼ばれる方法で描いたものです。
            </p>
            <p className={para}>
              カオスゲームの手順は3行で書けます。3つの頂点から1つを無作為に選ぶ。いまの点を、その頂点までの半分だけ進める。そこに点を打つ。
              行き先は毎回乱数で決まるのに、点が積もると左と同じ形が現れます。
            </p>
            <CodePreview
              title="再帰（左）とカオスゲーム（右）"
              language="js"
              code={SIERPINSKI_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>p.lerp(corners[k], 0.5)</code>
                  の0.5を0.6にする（3つのかたまりの間にすき間ができる）
                </li>
                <li>
                  <code className={code}>gasket(20, 280, 260, 6)</code>
                  の6を2にする（再帰の段数が減り、置き換えの様子が読み取れる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>バーンズリーのシダ</h2>
            <p className={para}>
              カオスゲームの「頂点へ半分進む」を、「4つの変換のどれかを確率で選んで点を移す」に替えると、シダの葉が現れます。
              イギリスの数学者マイケル・バーンズリーが著書『Fractals
              Everywhere』（1988年）で示した図形で、バーンズリーのシダと呼ばれます。
            </p>
            <p className={para}>
              どの変換も、点(x,
              y)を次の式で新しい点へ移します。こういう変換をアフィン変換と呼びます。
            </p>
            <pre className="bg-muted rounded-lg p-4 text-sm text-foreground overflow-x-auto mb-4">
              <code>{`x' = a * x + b * y + e
y' = c * x + d * y + f`}</code>
            </pre>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <caption className="text-left text-muted-foreground mb-2">
                  4つの変換の係数と、選ばれる確率p
                </caption>
                <thead>
                  <tr className="bg-muted text-foreground">
                    {[
                      "変換",
                      "a",
                      "b",
                      "c",
                      "d",
                      "e",
                      "f",
                      "p",
                      "描かれる部分",
                    ].map((head) => (
                      <th
                        key={head}
                        scope="col"
                        className="text-left p-3 font-semibold"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {FERN_ROWS.map(([name, ...cells]) => (
                    <tr key={name} className="border-t border-border">
                      <th
                        scope="row"
                        className="text-left p-3 font-mono font-normal"
                      >
                        {name}
                      </th>
                      {cells.map((cell, index) => (
                        <td
                          key={name + String(index)}
                          className={index < 7 ? "p-3 font-mono" : "p-3"}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CodePreview
              title="点が積もってシダになる"
              language="js"
              code={FERN_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              f2は全体を少し回して85%に縮め、上へずらす変換です。これが85%の確率で選ばれるので、葉は先へ向かって小さくなりながら並びます。
              f3とf4は全体を左右のいちばん下の葉へ写し、f1は茎を作ります。葉1枚が全体と同じ形をしているのは、この4つの変換がどれも「全体を縮めて写す」からです。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  f2の<code className={code}>0.04</code>と
                  <code className={code}>-0.04</code>
                  を0.1と-0.1にする（葉先が大きく巻く）
                </li>
                <li>
                  f3の<code className={code}>-0.26</code>
                  を-0.4にする（左の葉が長く伸びる）
                </li>
                <li>
                  <code className={code}>r &lt; 0.86</code>
                  を0.6にする（f2が選ばれにくくなり、葉先まで点が届きにくくなる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>マンデルブロ集合</h2>
            <p className={para}>
              最後は式1つから現れる図形です。複素数cを1つ決め、z = 0から始めて
              <code className={code}>z = z² + c</code>
              をくり返します。zがどこまでも大きくなっていくcと、そうならないcがあります。大きくならないcを集めたものがマンデルブロ集合です。
              名前はブノワ・マンデルブロにちなみます。
            </p>
            <p className={para}>
              描き方は
              <Link
                href="/p5js/media/image-pixels"
                className="text-primary underline"
              >
                画像とピクセル
              </Link>
              のページと同じです。画素1つをcの1つに対応させ、zの絶対値が2を超えるまでの回数を数えて色にします。2を超えたzは必ず飛び去ることが分かっているので、そこで計算を打ち切れます。
              複素数a + biの2乗は(a² − b²) +
              2abiなので、コードでは実部と虚部を2つの変数で持ちます。枠の中をクリックすると、その点を中心に2倍に拡大します。
            </p>
            <CodePreview
              title="マンデルブロ集合（クリックで拡大）"
              language="js"
              code={MANDELBROT_SKETCH}
            />
            <InfoBox type="warning" title="仕様の集合と、画面に出る絵のずれ">
              <p>
                定義では「無限にくり返しても飛び去らない点」が集合ですが、スケッチはmaxIter回（90回）で打ち切ります。そのため、90回より後で飛び去る点も集合の色で塗られます。
                拡大を続けると境界がのっぺりしてくるのはこのためで、maxIterを増やすと細部が戻ります。その分、計算は重くなります。
                さらに拡大を続けると、JavaScriptの数値の精度が足りなくなって絵が四角く崩れるので、このスケッチは一定の倍率で最初の範囲へ戻しています。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>maxIter = 90</code>
                  を20にする（境界が粗くなる）、300にする（細部が増える）
                </li>
                <li>
                  色の式の<code className={code}>n * 0.16</code>
                  を0.05にする（色の縞がゆるやかになる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>自然の中のフラクタル</h2>
            <p className={para}>
              数学のフラクタルはどこまで拡大しても同じ形が続きますが、自然の形は「ある範囲の大きさで、おおよそ」自己相似です。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                シダの葉や木の枝は、1本の小枝が全体を小さくしたような形をしている。まったく同じではなく、似ている
              </li>
              <li>
                ロマネスコ（カリフラワーの一品種）は、つぼみの集まりがフラクタルに近い形で並ぶ
              </li>
              <li>
                海岸線は、短い物差しで測るほど細かい入り組みを拾って長くなり、長さが1つに決まらない（海岸線のパラドックス）
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              再帰で描いた木が自然に見えるのは形が似ているからで、実際の木が同じ手順で育っているという意味ではありません。作品では、角度や長さに乱数を少し混ぜると、数学の整いすぎた形から離れられます。
            </p>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="再帰で木を描く"
              description="___ を埋めて、枝の先から次の枝が生える木を完成させてください。branch()の中で、もう一度branch()を呼びます。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 340);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(235, 45, 9);
  stroke(140, 40, 90);
  translate(width / 2, height - 10);
  branch(90);
}

function branch(len) {
  strokeWeight(len * 0.06);
  line(0, 0, 0, -len);
  translate(0, -len);
  // 終了条件: 枝が短くなったら終わる
  if (len > ___) {
    push();
    rotate(0.5);
    ___(len * 0.68);
    pop();
    push();
    rotate(-0.5);
    ___(len * 0.68);
    pop();
  }
}`}
              answer={`function setup() {
  createCanvas(400, 340);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(235, 45, 9);
  stroke(140, 40, 90);
  translate(width / 2, height - 10);
  branch(90);
}

function branch(len) {
  strokeWeight(len * 0.06);
  line(0, 0, 0, -len);
  translate(0, -len);
  // 終了条件: 枝が短くなったら終わる
  if (len > 6) {
    push();
    rotate(0.5);
    branch(len * 0.68);
    pop();
    push();
    rotate(-0.5);
    branch(len * 0.68);
    pop();
  }
}`}
              keywords={["> 6", "branch"]}
              hints={[
                "終了条件は「枝の長さが6より大きいあいだだけ続ける」です。比べる相手の数6を入れます",
                "次の枝を描くのも、いま書いている関数です。関数名branchを書いて自分自身を呼びます",
              ]}
            />
            <CodingChallenge
              title="カオスゲーム"
              description="___ を埋めて、点が積もるとシェルピンスキーのギャスケットが現れるようにしてください。"
              preview
              initialCode={`let corners = [];
let p;

function setup() {
  createCanvas(400, 360);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 45, 9);
  corners = [
    createVector(200, 20),
    createVector(20, 340),
    createVector(380, 340),
  ];
  p = createVector(200, 200);
}

function draw() {
  stroke(50, 60, 100, 70);
  for (let i = 0; i < 100; i++) {
    // 3つの頂点から1つを無作為に選ぶ
    let target = ___(corners);
    // その頂点までの半分だけ進む
    p.lerp(target, ___);
    point(p.x, p.y);
  }
}`}
              answer={`let corners = [];
let p;

function setup() {
  createCanvas(400, 360);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 45, 9);
  corners = [
    createVector(200, 20),
    createVector(20, 340),
    createVector(380, 340),
  ];
  p = createVector(200, 200);
}

function draw() {
  stroke(50, 60, 100, 70);
  for (let i = 0; i < 100; i++) {
    // 3つの頂点から1つを無作為に選ぶ
    let target = random(corners);
    // その頂点までの半分だけ進む
    p.lerp(target, 0.5);
    point(p.x, p.y);
  }
}`}
              keywords={["random", "0.5"]}
              hints={[
                "random()に配列を渡すと、要素を1つ無作為に返します",
                "lerp()の2つ目の引数は進む割合です。半分なので0.5を入れます",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              冒頭の木を、自分の1本に育てます。再帰の形は変えずに、数と色だけを動かします。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>len * 0.73</code>と
                <code className={code}>len * 0.68</code>に
                <code className={code}>random(0.9, 1.1)</code>
                を掛ける。setup()で
                <code className={code}>randomSeed()</code>
                を決め、draw()の先頭でも同じ値を渡す。あわせてbranch()の
                <code className={code}>if (t &lt;= 0) return;</code>
                の行を消すと、まだ伸びていない枝も長さ0でたどるので、乱数を引く順番が育つ途中でも変わらず、毎フレーム同じ「ゆらいだ木」になる
              </li>
              <li>
                branch()の呼び出しを3つにする。枝ぶりが密になる（描く量は3倍ずつ増えるので、段数を7ほどに減らす）
              </li>
              <li>
                花の<code className={code}>fill(335, 55, 100, 75)</code>
                の色相を変えて季節を変える。50前後で秋、140前後で夏の葉になる
              </li>
              <li>
                translate()の位置を変えながらbranch()を何度か呼び、大きさの違う木を並べて林にする
              </li>
              <li>
                シダの4つの変換の係数を少しずつ変えて、自分だけの植物を探す。気に入った係数はコメントに残しておく
              </li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="再帰関数に終了条件が必要なのはなぜ？"
              options={[
                { label: "終了条件が無いと、関数が1回も実行されないから" },
                {
                  label:
                    "終了条件が無いと、自分を呼ぶことが際限なく続いてエラーで止まるから",
                  correct: true,
                },
                { label: "終了条件が無いと、色を指定できないから" },
                { label: "終了条件はdraw()を止めるために必要だから" },
              ]}
              explanation="再帰関数は自分自身を呼び出します。どこかで呼ぶのをやめる条件が無いと呼び出しが積み重なり続け、ブラウザがエラーを出して止めます。"
            />
            <Quiz
              question="コッホ曲線で置き換えを1回行うと、曲線全体の長さは何倍になる？"
              options={[
                { label: "3分の1倍" },
                { label: "変わらない" },
                { label: "3分の4倍", correct: true },
                { label: "4倍" },
              ]}
              explanation="1本の線分が、長さ3分の1の線分4本に置き換わります。4 × 1/3 = 4/3なので、1回ごとに3分の4倍になり、くり返すほど長くなり続けます。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "部分が全体と同じ形をしている性質を自己相似と呼び、再帰関数で書ける",
                  "再帰関数には終了条件を書く。終了条件の値が描く量と細かさを決める",
                  "木はtranslate()・rotate()・push()・pop()と再帰の組み合わせで描ける",
                  "カオスゲームとバーンズリーのシダは、乱数で選んだ変換を点にくり返し適用して描く",
                  "マンデルブロ集合は、z = z² + cのくり返しで飛び去らない点の集まり。画素ごとに回数を数えて色にする",
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
                  title: "The Nature of Code: Chapter 8 Fractals",
                  url: "https://natureofcode.com/fractals/",
                  description:
                    "再帰・コッホ曲線・木・L-systemをp5.jsで順に実装する章",
                },
                {
                  title: "Wikipedia: Barnsley fern",
                  url: "https://en.wikipedia.org/wiki/Barnsley_fern",
                  description:
                    "4つのアフィン変換の係数と確率の表。このページの表の出典",
                },
                {
                  title: "Wikipedia: Koch snowflake",
                  url: "https://en.wikipedia.org/wiki/Koch_snowflake",
                  description: "1904年の論文と、周の長さ・面積の計算",
                },
                {
                  title: "Wikipedia: Chaos game",
                  url: "https://en.wikipedia.org/wiki/Chaos_game",
                  description:
                    "頂点へ向かって一定の割合だけ進む方法と、その変種",
                },
                {
                  title: "Wikipedia: Mandelbrot set",
                  url: "https://en.wikipedia.org/wiki/Mandelbrot_set",
                  description: "定義、歴史、回数で色を付ける描き方",
                },
                {
                  title: "p5.js Reference: push()",
                  url: "https://p5js.org/reference/p5/push/",
                  description:
                    "座標変換と描画設定を保存する関数。枝分かれから戻るために使う",
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
