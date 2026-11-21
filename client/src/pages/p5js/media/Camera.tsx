import { Link } from "wouter";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。小さく取り込んだ映像の1画素を、1つの光る点に置き換える
const HERO_SKETCH = `let cam;           // カメラ（ボタンを押すまでは空）
let ready = false; // 映像が届いたらtrue
let view;          // 入力になる小さな絵（64x48）
let sizes = [];    // 各マスの、いまの点の大きさ
let note = '「カメラを使う」を押すと、自分の映像に替わります';

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  view = createGraphics(64, 48);
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  updateView();
  view.loadPixels();
  background(8, 10, 30);
  noStroke();

  let cell = width / view.width;
  for (let y = 0; y < view.height; y++) {
    for (let x = 0; x < view.width; x++) {
      let n = y * view.width + x;
      let r = view.pixels[n * 4];
      let g = view.pixels[n * 4 + 1];
      let b = view.pixels[n * 4 + 2];
      // 明るい画素ほど大きい点にする（3色のうち一番強い値で決める）
      let target = max(r, g, b) / 255 * cell * 1.25;
      // 目標の大きさへ少しずつ近づけて、動きに余韻を残す
      sizes[n] = lerp(sizes[n] || 0, target, 0.2);
      fill(r + 30, g + 30, b + 30);
      circle(x * cell + cell / 2, y * cell + cell / 2, sizes[n]);
    }
  }
  drawNote();
}

// ボタンを押したときに、はじめてカメラの許可を求める
function startCamera() {
  if (cam) return;
  note = '映像を待っています。許可しないときは、この絵のまま試せます';
  try {
    // 映像が届くと、2つ目の引数の関数が呼ばれる
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    // 映像そのものは画面に出さず、素材としてだけ使う
    cam.hide();
  } catch (e) {
    note = 'この環境ではカメラを使えません。この絵のまま試せます';
  }
}

// 入力になる小さな絵viewを、1フレームぶん更新する
function updateView() {
  if (ready) {
    // カメラの映像を、鏡のように左右反転して縮めて写す
    view.push();
    view.translate(view.width, 0);
    view.scale(-1, 1);
    view.image(cam, 0, 0, view.width, view.height);
    view.pop();
    return;
  }
  // カメラが使えるまでの代わりの絵: 色のついた光の玉が動く
  let colors = [[255, 90, 140], [80, 180, 255], [255, 200, 80], [140, 255, 180]];
  view.background(8, 10, 30);
  view.noStroke();
  for (let i = 0; i < colors.length; i++) {
    let x = view.width * (0.5 + 0.38 * cos(frameCount * 0.008 * (i + 2) + i));
    let y = view.height * (0.5 + 0.34 * sin(frameCount * 0.011 * (i + 2) + i * 2));
    for (let r = 6; r > 0; r--) {
      view.fill(colors[i][0], colors[i][1], colors[i][2], 45);
      view.circle(x, y, r * view.height * 0.1);
    }
  }
}

// 案内文をキャンバスの下端に出す（映像が届いたら出さない）
function drawNote() {
  if (ready) return;
  noStroke();
  fill(8, 10, 30, 200);
  rect(0, height - 40, width, 40);
  fill(235);
  textSize(19);
  textAlign(CENTER, CENTER);
  text(note, width / 2, height - 20);
}`;

// そのままの映像と、左右反転した映像を並べる
const MIRROR_SKETCH = `let cam;
let ready = false;
let view; // カメラの代わりに使う絵
let note = '「カメラを使う」を押すと、自分の映像に替わります';

function setup() {
  createCanvas(640, 280);
  pixelDensity(1);
  view = createGraphics(320, 240);
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  background(8, 10, 30);
  // カメラが届いていればカメラを、まだなら代わりの絵を使う
  let source = view;
  if (ready) {
    source = cam;
  } else {
    drawStandIn();
  }

  // 左: そのまま置く
  image(source, 0, 0, 320, 240);

  // 右: 左右を反転して置く
  push();
  // 原点を右端へ移し、横方向を-1倍にすると、右から左へ描かれる
  translate(640, 0);
  scale(-1, 1);
  image(source, 0, 0, 320, 240);
  pop();

  fill(235);
  noStroke();
  textSize(19);
  textAlign(CENTER, CENTER);
  text('そのまま', 160, 260);
  text('鏡像（左右反転）', 480, 260);
  if (!ready) {
    fill(8, 10, 30, 200);
    rect(0, 200, width, 40);
    fill(235);
    text(note, width / 2, 220);
  }
}

// 代わりの絵: 向きが分かるように、文字と矢印を動かす
function drawStandIn() {
  view.background(30, 26, 70);
  view.noStroke();
  view.fill(255, 200, 80);
  view.textSize(110);
  view.textStyle(BOLD);
  view.textAlign(CENTER, CENTER);
  view.text('R', 110 + sin(frameCount * 0.03) * 40, 110);
  view.fill(255, 90, 140);
  view.triangle(250, 60, 250, 160, 305, 110);
}

function startCamera() {
  if (cam) return;
  note = '映像を待っています。許可しないときは、この絵のまま試せます';
  try {
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    cam.hide();
  } catch (e) {
    note = 'この環境ではカメラを使えません。この絵のまま試せます';
  }
}`;

// 明るさを四角の大きさに変える
const BLOCKS_SKETCH = `let cam;
let ready = false;
let view;
let note = '「カメラを使う」を押すと、自分の映像に替わります';

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  // 取り込む解像度。40x30なら、調べる画素は1200個で済む
  view = createGraphics(40, 30);
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  updateView();
  view.loadPixels();
  background(24, 18, 12);
  noStroke();
  fill(255, 190, 90);

  let cell = width / view.width;
  for (let y = 0; y < view.height; y++) {
    for (let x = 0; x < view.width; x++) {
      let i = (y * view.width + x) * 4;
      // 赤・緑・青の平均を明るさ（0〜255）とする
      let bright = (view.pixels[i] + view.pixels[i + 1] + view.pixels[i + 2]) / 3;
      // 差を広げて、明るい所と暗い所をはっきり分ける
      bright = constrain(bright * 1.6, 0, 255);
      // 明るさを四角の一辺の長さに変える
      let side = map(bright, 0, 255, 0, cell);
      // マスの中央に来るよう、余った分の半分だけずらして置く
      let gap = (cell - side) / 2;
      square(x * cell + gap, y * cell + gap, side);
    }
  }
  drawNote();
}

// ボタンを押したときに、はじめてカメラの許可を求める
function startCamera() {
  if (cam) return;
  note = '映像を待っています。許可しないときは、この絵のまま試せます';
  try {
    // 映像が届くと、2つ目の引数の関数が呼ばれる
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    // 映像そのものは画面に出さず、素材としてだけ使う
    cam.hide();
  } catch (e) {
    note = 'この環境ではカメラを使えません。この絵のまま試せます';
  }
}

// 入力になる小さな絵viewを、1フレームぶん更新する
function updateView() {
  if (ready) {
    // カメラの映像を、鏡のように左右反転して縮めて写す
    view.push();
    view.translate(view.width, 0);
    view.scale(-1, 1);
    view.image(cam, 0, 0, view.width, view.height);
    view.pop();
    return;
  }
  // カメラが使えるまでの代わりの絵: 色のついた光の玉が動く
  let colors = [[255, 90, 140], [80, 180, 255], [255, 200, 80], [140, 255, 180]];
  view.background(8, 10, 30);
  view.noStroke();
  for (let i = 0; i < colors.length; i++) {
    let x = view.width * (0.5 + 0.38 * cos(frameCount * 0.008 * (i + 2) + i));
    let y = view.height * (0.5 + 0.34 * sin(frameCount * 0.011 * (i + 2) + i * 2));
    for (let r = 6; r > 0; r--) {
      view.fill(colors[i][0], colors[i][1], colors[i][2], 45);
      view.circle(x, y, r * view.height * 0.1);
    }
  }
}

// 案内文をキャンバスの下端に出す（映像が届いたら出さない）
function drawNote() {
  if (ready) return;
  noStroke();
  fill(8, 10, 30, 200);
  rect(0, height - 40, width, 40);
  fill(235);
  textSize(19);
  textAlign(CENTER, CENTER);
  text(note, width / 2, height - 20);
}`;

// 明るさで文字を選ぶ
const ASCII_SKETCH = `let cam;
let ready = false;
let view;
let note = '「カメラを使う」を押すと、自分の映像に替わります';
// 暗い所に使う字から、明るい所に使う字へ
let ramp = ' .:-=+*#%@';

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  view = createGraphics(64, 48);
  textFont('monospace');
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  updateView();
  view.loadPixels();
  background(8, 10, 30);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  let cell = width / view.width;
  for (let y = 0; y < view.height; y++) {
    for (let x = 0; x < view.width; x++) {
      let i = (y * view.width + x) * 4;
      let r = view.pixels[i];
      let g = view.pixels[i + 1];
      let b = view.pixels[i + 2];
      // 3色のうち一番強い値を明るさ（0〜1）として、何番目の字を使うかに変える
      let bright = max(r, g, b) / 255;
      let ch = ramp[min(floor(bright * ramp.length), ramp.length - 1)];
      // 字の色は、元の色を少し明るくして使う
      fill(r + 70, g + 70, b + 70);
      text(ch, x * cell + cell / 2, y * cell + cell / 2);
    }
  }
  drawNote();
}

// ボタンを押したときに、はじめてカメラの許可を求める
function startCamera() {
  if (cam) return;
  note = '映像を待っています。許可しないときは、この絵のまま試せます';
  try {
    // 映像が届くと、2つ目の引数の関数が呼ばれる
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    // 映像そのものは画面に出さず、素材としてだけ使う
    cam.hide();
  } catch (e) {
    note = 'この環境ではカメラを使えません。この絵のまま試せます';
  }
}

// 入力になる小さな絵viewを、1フレームぶん更新する
function updateView() {
  if (ready) {
    // カメラの映像を、鏡のように左右反転して縮めて写す
    view.push();
    view.translate(view.width, 0);
    view.scale(-1, 1);
    view.image(cam, 0, 0, view.width, view.height);
    view.pop();
    return;
  }
  // カメラが使えるまでの代わりの絵: 色のついた光の玉が動く
  let colors = [[255, 90, 140], [80, 180, 255], [255, 200, 80], [140, 255, 180]];
  view.background(8, 10, 30);
  view.noStroke();
  for (let i = 0; i < colors.length; i++) {
    let x = view.width * (0.5 + 0.38 * cos(frameCount * 0.008 * (i + 2) + i));
    let y = view.height * (0.5 + 0.34 * sin(frameCount * 0.011 * (i + 2) + i * 2));
    for (let r = 6; r > 0; r--) {
      view.fill(colors[i][0], colors[i][1], colors[i][2], 45);
      view.circle(x, y, r * view.height * 0.1);
    }
  }
}

// 案内文をキャンバスの下端に出す（映像が届いたら出さない）
function drawNote() {
  if (ready) return;
  noStroke();
  fill(8, 10, 30, 200);
  rect(0, height - 40, width, 40);
  fill(235);
  textSize(19);
  textAlign(CENTER, CENTER);
  text(note, width / 2, height - 20);
}`;

// 前のフレームとの差から粒を出す
const MOTION_SKETCH = `let cam;
let ready = false;
let view;
let note = '「カメラを使う」を押すと、自分の映像に替わります';
let before = [];    // 前のフレームの各画素の明るさ
let particles = [];

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  view = createGraphics(64, 48);
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  updateView();
  view.loadPixels();
  background(8, 10, 30);
  // 元の映像は、薄くして下に敷く
  tint(255, 90);
  image(view, 0, 0, width, height);
  noTint();

  let cell = width / view.width;
  for (let y = 0; y < view.height; y++) {
    for (let x = 0; x < view.width; x++) {
      let n = y * view.width + x;
      let now = view.pixels[n * 4] + view.pixels[n * 4 + 1] + view.pixels[n * 4 + 2];
      // 前のフレームとの明るさの差が大きい所を「動いた」とみなす
      let change = abs(now - before[n]);
      if (change > 60 && particles.length < 1200 && random() < 0.5) {
        particles.push({
          x: x * cell + cell / 2,
          y: y * cell + cell / 2,
          vx: random(-1, 1),
          vy: random(-2.5, -0.5),
          life: 50
        });
      }
      before[n] = now;
    }
  }

  // 動いた所から出た粒を、上へ流しながら消していく
  noStroke();
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    // 出たばかりの粒は白っぽく、消えぎわは橙に
    fill(255, 120 + p.life * 2.7, 60 + p.life * 3.5, p.life * 5);
    circle(p.x, p.y, 2 + p.life * 0.12);
  }
  particles = particles.filter(function (p) {
    return p.life > 0;
  });
  drawNote();
}

// ボタンを押したときに、はじめてカメラの許可を求める
function startCamera() {
  if (cam) return;
  note = '映像を待っています。許可しないときは、この絵のまま試せます';
  try {
    // 映像が届くと、2つ目の引数の関数が呼ばれる
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    // 映像そのものは画面に出さず、素材としてだけ使う
    cam.hide();
  } catch (e) {
    note = 'この環境ではカメラを使えません。この絵のまま試せます';
  }
}

// 入力になる小さな絵viewを、1フレームぶん更新する
function updateView() {
  if (ready) {
    // カメラの映像を、鏡のように左右反転して縮めて写す
    view.push();
    view.translate(view.width, 0);
    view.scale(-1, 1);
    view.image(cam, 0, 0, view.width, view.height);
    view.pop();
    return;
  }
  // カメラが使えるまでの代わりの絵: 色のついた光の玉が動く
  let colors = [[255, 90, 140], [80, 180, 255], [255, 200, 80], [140, 255, 180]];
  view.background(8, 10, 30);
  view.noStroke();
  for (let i = 0; i < colors.length; i++) {
    let x = view.width * (0.5 + 0.38 * cos(frameCount * 0.008 * (i + 2) + i));
    let y = view.height * (0.5 + 0.34 * sin(frameCount * 0.011 * (i + 2) + i * 2));
    for (let r = 6; r > 0; r--) {
      view.fill(colors[i][0], colors[i][1], colors[i][2], 45);
      view.circle(x, y, r * view.height * 0.1);
    }
  }
}

// 案内文をキャンバスの下端に出す（映像が届いたら出さない）
function drawNote() {
  if (ready) return;
  noStroke();
  fill(8, 10, 30, 200);
  rect(0, height - 40, width, 40);
  fill(235);
  textSize(19);
  textAlign(CENTER, CENTER);
  text(note, width / 2, height - 20);
}`;

// 中央の縦1列を横へ並べていく
const SLIT_SKETCH = `let cam;
let ready = false;
let view;
let note = '「カメラを使う」を押すと、自分の映像に替わります';
let scanX = 0; // いま描き込んでいる横位置

function setup() {
  createCanvas(640, 400);
  pixelDensity(1);
  view = createGraphics(160, 100);
  background(8, 10, 30);
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  updateView();

  // 映像の中央の縦1列だけを切り取り、キャンバスのscanXの位置に貼る
  let slit = floor(view.width / 2);
  copy(view, slit, 0, 1, view.height, scanX, 0, 2, height);

  // 次に描く位置を示す線
  stroke(255, 200, 80);
  strokeWeight(2);
  line(scanX + 3, 0, scanX + 3, height);

  // 右へ進み、端まで来たら左へ戻る
  scanX = (scanX + 2) % width;
  drawNote();
}

// ボタンを押したときに、はじめてカメラの許可を求める
function startCamera() {
  if (cam) return;
  note = '映像を待っています。許可しないときは、この絵のまま試せます';
  try {
    // 映像が届くと、2つ目の引数の関数が呼ばれる
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    // 映像そのものは画面に出さず、素材としてだけ使う
    cam.hide();
  } catch (e) {
    note = 'この環境ではカメラを使えません。この絵のまま試せます';
  }
}

// 入力になる小さな絵viewを、1フレームぶん更新する
function updateView() {
  if (ready) {
    // カメラの映像を、鏡のように左右反転して縮めて写す
    view.push();
    view.translate(view.width, 0);
    view.scale(-1, 1);
    view.image(cam, 0, 0, view.width, view.height);
    view.pop();
    return;
  }
  // カメラが使えるまでの代わりの絵: 色のついた光の玉が動く
  let colors = [[255, 90, 140], [80, 180, 255], [255, 200, 80], [140, 255, 180]];
  view.background(8, 10, 30);
  view.noStroke();
  for (let i = 0; i < colors.length; i++) {
    let x = view.width * (0.5 + 0.38 * cos(frameCount * 0.008 * (i + 2) + i));
    let y = view.height * (0.5 + 0.34 * sin(frameCount * 0.011 * (i + 2) + i * 2));
    for (let r = 6; r > 0; r--) {
      view.fill(colors[i][0], colors[i][1], colors[i][2], 45);
      view.circle(x, y, r * view.height * 0.1);
    }
  }
}

// 案内文をキャンバスの下端に出す（映像が届いたら出さない）
function drawNote() {
  if (ready) return;
  noStroke();
  fill(8, 10, 30, 200);
  rect(0, height - 40, width, 40);
  fill(235);
  textSize(19);
  textAlign(CENTER, CENTER);
  text(note, width / 2, height - 20);
}`;

export default function Camera() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 15</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          カメラ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">カメラの映像は、次々に届く画像です。前のページまでの画素の読み方がそのまま使えます。このページでは、映像を点や文字に置き換え、動いた場所を見つけ、時間の流れを1枚の絵に並べます。下の枠は、映像を光る点の並びに置き換える完成形です。最初はコードで描いた光の玉が映っています。枠の下の「カメラを使う」を押すと、自分の映像に替わります。</p>

        <CodePreview title={"光る点の鏡（このページの完成形）"} language="js" code={HERO_SKETCH} />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">カメラを使ってよいかは、ボタンを押したときにブラウザが確認します。映像はこのページの中で図形に置き換えられるだけで、保存も送信もされません。許可しない場合やカメラが無い場合も、代わりの絵のまま、このページのスケッチを全部試せます。</p>

        <WhyNowBox title={"なぜカメラを素材にするのか"} tags={["createCapture()", "loadPixels()", "鏡像", "動きの検出"]}>
          <p>カメラを入力にすると、見る人の姿や動きが作品の一部になります。画面の前で手を振ると絵が応える、という体験は、マウスやキーボードとは違う種類の面白さです。必要な知識は前のページの画素の読み方で、新しく覚えるのはカメラの始め方だけです。</p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              カメラを始めて、鏡のように映す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed"><code className={code}>createCapture(VIDEO)</code>を呼ぶと、ブラウザがカメラを使ってよいかを利用者に尋ねます。ページを開いた途端に尋ねられると驚くので、このページでは<code className={code}>createButton()</code>で作ったボタンが押されたときに初めて呼びます。届いた映像は、画像と同じように<code className={code}>image()</code>で置けます。</p>
            <CodePreview title={"そのままと鏡像"} language="js" code={MIRROR_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">右側は左右を反転しています。<code className={code}>translate(640, 0)</code>で原点を右端へ移し、<code className={code}>scale(-1, 1)</code>で横方向を逆向きにしてから描くと、右から左へ描かれます。自分を映すときは、鏡と同じ向きになる右側の方が、動いた方向と映像の方向が合います。</p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">書いたもの</th>
                    <th scope="col" className="text-left p-3 font-semibold">意味</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">createCapture(VIDEO, 関数)</th>
                    <td className="p-3">カメラを始める。映像が届くと、渡した関数が呼ばれる</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">cam.hide()</th>
                    <td className="p-3">映像をページにそのまま表示せず、素材としてだけ使う</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">image(cam, x, y, 幅, 高さ)</th>
                    <td className="p-3">いまの映像を1枚の画像としてキャンバスに置く</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">translate(幅, 0)とscale(-1, 1)</th>
                    <td className="p-3">以降の描画を左右反転する</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title={"カメラが使える条件と、使えないとき"}>
              <p>カメラを使うには、ページがHTTPSで配信されていること（または自分のパソコンのlocalhostで開いていること）と、利用者が許可することの両方が要ります。MDNは「This feature is available only in secure contexts (HTTPS)」「user permission is always required to access the user's audio and video inputs」と書いています。</p>
              <p>許可されなかったときやカメラが無いとき、<code className={code}>createCapture()</code>は映像が届かないままになります。このページのスケッチは、映像が届くまで代わりの絵を使い続けるので、止まりません。HTTPSでないページでは<code className={code}>createCapture()</code>そのものがエラーになるため、<code className={code}>try</code>と<code className={code}>catch</code>で受けて案内文に切り替えています。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              小さく取り込んで、画素を図形に置き換える
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">カメラの映像は画素の数が多く、毎フレーム全部を調べるには重すぎます。そこで、映像を<code className={code}>createGraphics(40, 30)</code>の小さなキャンバスに縮めて写し、その1200個の画素だけを調べます。1画素を1つの四角に置き換え、明るい所ほど大きくします。</p>
            <CodePreview title={"明るさを大きさに"} language="js" code={BLOCKS_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">スケッチの後半にある<code className={code}>updateView()</code>が、小さなキャンバス<code className={code}>view</code>を毎フレーム更新しています。映像が届いていればカメラを鏡像で写し、まだなら代わりの絵を描きます。入力を<code className={code}>view</code>の1か所にまとめてあるので、その先の処理はカメラでも代わりの絵でも同じです。以降のスケッチも同じ関数を使います。</p>
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>createGraphics(40, 30)</code>を<code className={code}>createGraphics(80, 60)</code>にする（細かくなる。調べる画素は4倍）</li>
                <li><code className={code}>bright * 1.6</code>を<code className={code}>bright * 3</code>にする（明るい所と暗い所の差が強くなる）</li>
                <li><code className={code}>fill(255, 190, 90)</code>を、<code className={code}>fill(view.pixels[i], view.pixels[i + 1], view.pixels[i + 2])</code>にしてfor文の中へ移す（元の色がつく）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              文字で描く映像
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">四角の代わりに文字を置きます。明るさを「何番目の字を使うか」に変える考え方は、<Link href="/p5js/media/typography" className="text-primary underline">文字とタイポグラフィ</Link>の文字のグリッドと同じです。文字の並びだけで絵を作る表現は、アスキーアートと呼ばれます。</p>
            <CodePreview title={"文字の鏡"} language="js" code={ASCII_SKETCH} />
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>ramp</code>を<code className={code}>' ・一十木林森'</code>にする（漢字で描かれる）</li>
                <li><code className={code}>ramp</code>を<code className={code}>'@%#*+=-:. '</code>と逆の順にする（明るい所と暗い所が入れ替わる）</li>
                <li><code className={code}>fill(r + 70, g + 70, b + 70)</code>を<code className={code}>fill(120, 255, 160)</code>にする（1色の文字になる）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              前のフレームと比べて、動きを見つける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">映像の中の「動いた場所」は、前のフレームと明るさが大きく変わった画素として見つけられます。各画素の明るさを配列に覚えておき、次のフレームで差を取ります。差が大きい所から粒を出すと、動きに沿って火の粉が舞います。</p>
            <CodePreview title={"動いた所から粒が出る"} language="js" code={MOTION_SKETCH} />
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>change &gt; 60</code>を<code className={code}>change &gt; 20</code>にする（わずかな変化でも粒が出る。カメラでは映像のざらつきにも反応する）</li>
                <li><code className={code}>vy: random(-2.5, -0.5)</code>を<code className={code}>vy: random(0.5, 2.5)</code>にする（粒が下へ落ちる）</li>
                <li><code className={code}>life: 50</code>を<code className={code}>life: 150</code>にする（粒が長く残る）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              スリットスキャン: 時間を横に並べる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">映像の中央の縦1列だけを切り取り、少しずつ右へずらしながら貼っていきます。絵の横方向が時間になるので、止まっているものは横縞になり、中央を横切ったものは、通った速さに応じて伸び縮みして写ります。細いすき間（スリット）を通して撮る写真の技法にならって、スリットスキャンと呼ばれます。</p>
            <CodePreview title={"スリットスキャン"} language="js" code={SLIT_SKETCH} />
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>scanX + 2</code>と、<code className={code}>copy(...)</code>の中の幅の<code className={code}>2</code>を、どちらも<code className={code}>6</code>にする（速く進み、時間が粗くなる）</li>
                <li><code className={code}>floor(view.width / 2)</code>を<code className={code}>floor(view.width / 4)</code>にする（切り取る位置が左へ寄る）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title={"映像を鏡像にする"}
              description={"___ を埋めて、絵が左右反転して表示されるようにしてください。文字の「R」が裏返れば正解です。"}
              preview
              initialCode={`let cam;
let ready = false;
let view;

function setup() {
  createCanvas(480, 360);
  view = createGraphics(480, 360);
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  // 代わりの絵: 向きが分かるように文字を動かす
  view.background(30, 26, 70);
  view.noStroke();
  view.fill(255, 200, 80);
  view.textSize(160);
  view.textStyle(BOLD);
  view.textAlign(CENTER, CENTER);
  view.text('R', 170 + sin(frameCount * 0.03) * 60, 180);
  let source = ready ? cam : view;

  // 原点を右端へ移してから、横方向を逆向きにする
  translate(___, 0);
  scale(___, 1);
  image(source, 0, 0, 480, 360);
}

function startCamera() {
  if (cam) return;
  try {
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    cam.hide();
  } catch (e) {
    // カメラを使えない環境では、代わりの絵のまま続ける
  }
}`}
              answer={`let cam;
let ready = false;
let view;

function setup() {
  createCanvas(480, 360);
  view = createGraphics(480, 360);
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  // 代わりの絵: 向きが分かるように文字を動かす
  view.background(30, 26, 70);
  view.noStroke();
  view.fill(255, 200, 80);
  view.textSize(160);
  view.textStyle(BOLD);
  view.textAlign(CENTER, CENTER);
  view.text('R', 170 + sin(frameCount * 0.03) * 60, 180);
  let source = ready ? cam : view;

  // 原点を右端へ移してから、横方向を逆向きにする
  translate(width, 0);
  scale(-1, 1);
  image(source, 0, 0, 480, 360);
}

function startCamera() {
  if (cam) return;
  try {
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    cam.hide();
  } catch (e) {
    // カメラを使えない環境では、代わりの絵のまま続ける
  }
}`}
              keywords={["width", "-1"]}
              hints={[
                "原点を右端へ移します。キャンバスの幅が入った変数widthを書きます",
                "横方向を逆向きにします。scaleの1つ目に-1を渡すと左右が反転します",
              ]}
            />
            <CodingChallenge
              title={"動いた所を光らせる"}
              description={"___ を埋めて、前のフレームから明るさが変わった所にだけ点が出るようにしてください。"}
              preview
              initialCode={`let cam;
let ready = false;
let view;
let note = '「カメラを使う」を押すと、自分の映像に替わります';
let before = []; // 前のフレームの各画素の明るさ

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  view = createGraphics(64, 48);
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  updateView();
  view.loadPixels();
  // 薄く塗り重ねて、動いたあとを少し残す
  background(8, 10, 30, 40);
  noStroke();
  fill(120, 255, 220);

  let cell = width / view.width;
  for (let y = 0; y < view.height; y++) {
    for (let x = 0; x < view.width; x++) {
      let n = y * view.width + x;
      let now = view.pixels[n * 4] + view.pixels[n * 4 + 1] + view.pixels[n * 4 + 2];
      // 前のフレームとの差を、正の数として取り出す
      let change = ___(now - before[n]);
      // 大きく変わった所にだけ点を置く
      if (change > 60) {
        circle(x * cell + cell / 2, y * cell + cell / 2, cell);
      }
      // 次のフレームで比べるために、いまの明るさを覚えておく
      before[n] = ___;
    }
  }
  drawNote();
}

// ボタンを押したときに、はじめてカメラの許可を求める
function startCamera() {
  if (cam) return;
  note = '映像を待っています。許可しないときは、この絵のまま試せます';
  try {
    // 映像が届くと、2つ目の引数の関数が呼ばれる
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    // 映像そのものは画面に出さず、素材としてだけ使う
    cam.hide();
  } catch (e) {
    note = 'この環境ではカメラを使えません。この絵のまま試せます';
  }
}

// 入力になる小さな絵viewを、1フレームぶん更新する
function updateView() {
  if (ready) {
    // カメラの映像を、鏡のように左右反転して縮めて写す
    view.push();
    view.translate(view.width, 0);
    view.scale(-1, 1);
    view.image(cam, 0, 0, view.width, view.height);
    view.pop();
    return;
  }
  // カメラが使えるまでの代わりの絵: 色のついた光の玉が動く
  let colors = [[255, 90, 140], [80, 180, 255], [255, 200, 80], [140, 255, 180]];
  view.background(8, 10, 30);
  view.noStroke();
  for (let i = 0; i < colors.length; i++) {
    let x = view.width * (0.5 + 0.38 * cos(frameCount * 0.008 * (i + 2) + i));
    let y = view.height * (0.5 + 0.34 * sin(frameCount * 0.011 * (i + 2) + i * 2));
    for (let r = 6; r > 0; r--) {
      view.fill(colors[i][0], colors[i][1], colors[i][2], 45);
      view.circle(x, y, r * view.height * 0.1);
    }
  }
}

// 案内文をキャンバスの下端に出す（映像が届いたら出さない）
function drawNote() {
  if (ready) return;
  noStroke();
  fill(8, 10, 30, 200);
  rect(0, height - 40, width, 40);
  fill(235);
  textSize(19);
  textAlign(CENTER, CENTER);
  text(note, width / 2, height - 20);
}`}
              answer={`let cam;
let ready = false;
let view;
let note = '「カメラを使う」を押すと、自分の映像に替わります';
let before = []; // 前のフレームの各画素の明るさ

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  view = createGraphics(64, 48);
  let button = createButton('カメラを使う');
  button.mousePressed(startCamera);
}

function draw() {
  updateView();
  view.loadPixels();
  // 薄く塗り重ねて、動いたあとを少し残す
  background(8, 10, 30, 40);
  noStroke();
  fill(120, 255, 220);

  let cell = width / view.width;
  for (let y = 0; y < view.height; y++) {
    for (let x = 0; x < view.width; x++) {
      let n = y * view.width + x;
      let now = view.pixels[n * 4] + view.pixels[n * 4 + 1] + view.pixels[n * 4 + 2];
      // 前のフレームとの差を、正の数として取り出す
      let change = abs(now - before[n]);
      // 大きく変わった所にだけ点を置く
      if (change > 60) {
        circle(x * cell + cell / 2, y * cell + cell / 2, cell);
      }
      // 次のフレームで比べるために、いまの明るさを覚えておく
      before[n] = now;
    }
  }
  drawNote();
}

// ボタンを押したときに、はじめてカメラの許可を求める
function startCamera() {
  if (cam) return;
  note = '映像を待っています。許可しないときは、この絵のまま試せます';
  try {
    // 映像が届くと、2つ目の引数の関数が呼ばれる
    cam = createCapture(VIDEO, function () {
      ready = true;
    });
    // 映像そのものは画面に出さず、素材としてだけ使う
    cam.hide();
  } catch (e) {
    note = 'この環境ではカメラを使えません。この絵のまま試せます';
  }
}

// 入力になる小さな絵viewを、1フレームぶん更新する
function updateView() {
  if (ready) {
    // カメラの映像を、鏡のように左右反転して縮めて写す
    view.push();
    view.translate(view.width, 0);
    view.scale(-1, 1);
    view.image(cam, 0, 0, view.width, view.height);
    view.pop();
    return;
  }
  // カメラが使えるまでの代わりの絵: 色のついた光の玉が動く
  let colors = [[255, 90, 140], [80, 180, 255], [255, 200, 80], [140, 255, 180]];
  view.background(8, 10, 30);
  view.noStroke();
  for (let i = 0; i < colors.length; i++) {
    let x = view.width * (0.5 + 0.38 * cos(frameCount * 0.008 * (i + 2) + i));
    let y = view.height * (0.5 + 0.34 * sin(frameCount * 0.011 * (i + 2) + i * 2));
    for (let r = 6; r > 0; r--) {
      view.fill(colors[i][0], colors[i][1], colors[i][2], 45);
      view.circle(x, y, r * view.height * 0.1);
    }
  }
}

// 案内文をキャンバスの下端に出す（映像が届いたら出さない）
function drawNote() {
  if (ready) return;
  noStroke();
  fill(8, 10, 30, 200);
  rect(0, height - 40, width, 40);
  fill(235);
  textSize(19);
  textAlign(CENTER, CENTER);
  text(note, width / 2, height - 20);
}`}
              keywords={["abs", "now"]}
              hints={[
                "差が正でも負でも大きさだけを知りたいので、絶対値を返すabsを使います",
                "次のフレームで比べる相手は、いまの明るさです。変数nowを覚えておきます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">画面の前の自分の姿や動きを素材に、応える作品を作ります。</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>冒頭の<code className={code}>circle(...)</code>を<code className={code}>square(...)</code>や<code className={code}>text(...)</code>に替え、<code className={code}>fill(r + 30, g + 30, b + 30)</code>を好きな1色にする</li>
              <li>文字の鏡の<code className={code}>ramp</code>を、自分の名前の文字で作る</li>
              <li>動きの検出で出す粒を、<Link href="/p5js/random/particles" className="text-primary underline">パーティクルと群れ</Link>で作ったclassの粒に替える</li>
              <li>動きの検出の粒の色を、出た場所のx座標で変える（<code className={code}>map(p.x, 0, width, ...)</code>）</li>
              <li>スリットスキャンの前でゆっくり回ったり手を振ったりして、気に入った1枚を「PNG保存」する</li>
            </ul>
            <InfoBox type="success" title={"人が映る作品を公開するとき"}>
              <p>このページのスケッチは映像を保存しませんが、「PNG保存」した画像には写った人が残ります。自分以外の人が写った画像を公開するときは、先に本人の了解を得ます。展示などで不特定の人を映す場合は、カメラを使っていることを見える所に書いておくと親切です。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question={"映像を鏡と同じ向き（左右反転）で描くには、image()の前に何を書く？"}
              options={[
                { label: "rotate(PI)" },
                { label: "translate(width, 0)とscale(-1, 1)", correct: true },
                { label: "scale(1, -1)だけ" },
                { label: "tint(-1)" },
              ]}
              explanation={"scale(-1, 1)で横方向が逆向きになりますが、そのままでは絵がキャンバスの左外に出てしまいます。先にtranslate(width, 0)で原点を右端へ移しておくと、キャンバスの中に収まります。"}
            />
            <Quiz
              question={"カメラの映像を、まず小さなキャンバスに縮めて写すのはなぜ？"}
              options={[
                { label: "調べる画素の数を減らして、毎フレームの処理を軽くするため", correct: true },
                { label: "カメラの許可が要らなくなるから" },
                { label: "色が鮮やかになるから" },
                { label: "映像を保存できるようになるから" },
              ]}
              explanation={"毎フレーム全画素を調べるには映像は大きすぎます。40x30に縮めれば調べる画素は1200個で済み、その1画素を1つの図形に置き換えるのにちょうどよい粗さにもなります。"}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "createCapture(VIDEO)は、ボタンが押されたときに呼ぶ。許可はブラウザが利用者に確認する",
                  "カメラが使えるのはHTTPS（またはlocalhost）のページだけ。使えないときも止まらない作りにする",
                  "translate(width, 0)とscale(-1, 1)で鏡像になる",
                  "映像を小さなキャンバスに写して画素を読み、四角・点・文字に置き換える",
                  "前のフレームとの明るさの差で動きを見つけられる。中央の1列を並べるとスリットスキャンになる",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5" aria-hidden="true">
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
                  title: "p5.js Reference: createCapture()",
                  url: "https://p5js.org/reference/p5/createCapture/",
                  description: "カメラやマイクの映像・音を取り込む関数の仕様",
                },
                {
                  title: "MDN: MediaDevices.getUserMedia()",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia",
                  description: "ブラウザがカメラ・マイクを許可する条件と、失敗の種類（英語）",
                },
                {
                  title: "p5.js Reference: copy()",
                  url: "https://p5js.org/reference/p5/copy/",
                  description: "絵の一部を切り取って別の場所に貼る関数。スリットスキャンで使用",
                },
                {
                  title: "p5.js Reference: loadPixels()",
                  url: "https://p5js.org/reference/p5/loadPixels/",
                  description: "pixels配列を読む前に呼ぶ関数",
                },
                {
                  title: "Wikipedia: Slit-scan photography",
                  url: "https://en.wikipedia.org/wiki/Slit-scan_photography",
                  description: "スリットを使う撮影技法の解説（英語）",
                },
                {
                  title: "Wikipedia: ASCII art",
                  url: "https://en.wikipedia.org/wiki/ASCII_art",
                  description: "文字で絵を作る表現の解説（英語）",
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
